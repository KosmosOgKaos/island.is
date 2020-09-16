import React from 'react'
import { NextPageContext } from 'next'
import * as Sentry from '@sentry/node'

import ErrorScreen from '../screens/Error/Error'
import { getLocaleFromPath } from '../i18n/withLocale'
import Layout, { LayoutProps } from '../layouts/main'
import I18n, { Locale } from '../i18n/I18n'
import { withApollo } from '../graphql/withApollo'

type ErrorPageProps = {
  statusCode: number
  locale: Locale
  layoutProps: LayoutProps
}

class ErrorPage extends React.Component<ErrorPageProps> {
  state = { renderError: false }

  static getDerivedStateFromError(_error: Error) {
    // This means we had an error rendering the error page - We'll attempt to
    // render again with a simpler version
    return { renderError: true }
  }

  render() {
    const { layoutProps, locale, statusCode } = this.props
    const { renderError } = this.state

    if (layoutProps && !renderError) {
      // getDerivedStateFromError catches client-side render errors, but we need
      // try-catch for server-side rendering
      try {
        return (
          <I18n locale={locale} translations={layoutProps.namespace}>
            <Layout {...layoutProps}>
              <ErrorScreen statusCode={statusCode} />
            </Layout>
          </I18n>
        )
        // eslint-disable-next-line no-empty
      } catch {}
    }

    // fallback to simpler version if we're unable to use the Layout for any reason
    return <ErrorScreen statusCode={statusCode} />
  }

  static async getInitialProps(props: NextPageContext) {
    const { err, res, asPath } = props
    const statusCode = err?.statusCode ?? res?.statusCode ?? 500
    const locale = getLocaleFromPath(asPath)

    if (err) {
      Sentry.withScope((scope) => {
        Object.keys(err).forEach((key) => {
          scope.setExtra(key, err[key])
        })

        Sentry.captureException(err)
      })

      await Sentry.flush(2000)
    }

    // Set the actual http response code if rendering server-side
    if (res) {
      res.statusCode = statusCode
    }

    // we'll attempt to use the layout component, but if it goes wrong we'll
    // show a simplified error page without any header or footer
    let layoutProps: LayoutProps = null

    try {
      layoutProps = await Layout.getInitialProps({
        ...props,
        locale,
      } as any)
      // eslint-disable-next-line no-empty
    } catch {}

    Sentry.captureException(
      new Error(`_error.tsx getInitialProps missing data at path: ${asPath}`),
    )

    await Sentry.flush(2000)

    return { statusCode, locale, layoutProps }
  }
}

export default withApollo(ErrorPage)
