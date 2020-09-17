import { shouldPolyfill as shouldPolyfillNumberFormat } from '@formatjs/intl-numberformat/should-polyfill'

import areIntlLocalesSupported from 'intl-locales-supported'
/**
 * Dynamically polyfill Intl API & its locale data
 * @param locale locale to polyfill
 */
export async function polyfill(locale: string) {
  const dataPolyfills = []

  // Polyfill Intl.NumberFormat if necessary
  if (!areIntlLocalesSupported(locale) || shouldPolyfillNumberFormat()) {
    await import(
      /* webpackChunkName: "intl-numberformat" */ '@formatjs/intl-numberformat/polyfill-force'
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((Intl.NumberFormat as any).polyfilled) {
    dataPolyfills.push(
      import(
        /* webpackChunkName: "intl-numberformat" */ `@formatjs/intl-numberformat/locale-data/${locale}`
      ),
    )
  }

  // Polyfill Intl.DateTimeFormat if necessary
  if (!areIntlLocalesSupported(locale)) {
    await import(
      /* webpackChunkName: "intl-datetimeformat" */ '@formatjs/intl-datetimeformat/polyfill-force'
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((Intl.DateTimeFormat as any).polyfilled) {
    dataPolyfills.push(import('@formatjs/intl-datetimeformat/add-all-tz'))
    dataPolyfills.push(
      import(
        /* webpackChunkName: "intl-datetimeformat" */ `@formatjs/intl-datetimeformat/locale-data/${locale}`
      ),
    )
  }

  await Promise.all(dataPolyfills)
}
