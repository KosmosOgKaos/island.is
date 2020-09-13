/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { groupBy, range, capitalize } from 'lodash'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Screen } from '@island.is/adgerdir/types'
import { withApollo } from '@island.is/adgerdir/graphql'
import NativeSelect from '@island.is/adgerdir/components/Select/Select'
import Bullet from '@island.is/adgerdir/components/Bullet/Bullet'
import { Locale } from '@island.is/adgerdir/i18n/I18n'
import { useI18n } from '@island.is/adgerdir/i18n'
import { useDateUtils } from '@island.is/adgerdir/i18n/useDateUtils'
import useRouteNames from '@island.is/adgerdir/i18n/useRouteNames'
import {
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Pagination,
  Hidden,
  Select,
  Option,
  Tiles,
  Link,
  GridContainer,
  GridRow,
  GridColumn,
  Button,
} from '@island.is/island-ui/core'
import { GET_NEWS_LIST_QUERY } from './queries'
import { NewsListLayout } from './Layouts/Layouts'
import {
  Query,
  ContentLanguage,
  QueryGetAdgerdirNewsListArgs,
} from '@island.is/api/schema'
import { CustomNextError } from '@island.is/adgerdir/units'
import { ArticleSidebar, BackgroundImage } from '../components'

interface NewsListProps {
  newsList: Query['getAdgerdirNewsList']['news']
  page: Query['getAdgerdirNewsList']['page']
  dateRange: string[]
  selectedYear: number
  selectedMonth: number
}

const NewsList: Screen<NewsListProps> = ({
  newsList,
  page,
  dateRange,
  selectedYear,
  selectedMonth,
}) => {
  const Router = useRouter()
  const { activeLocale } = useI18n()
  const { makePath } = useRouteNames(activeLocale as Locale)
  const { format } = useDateUtils()

  const dates = dateRange.map((s) => new Date(s))
  const datesByYear = groupBy(dates, (d: Date) => d.getFullYear())

  const years = Object.keys(datesByYear)
  const months = datesByYear[selectedYear] ?? []

  const yearOptions = years.map((year) => ({
    label: year,
    value: year,
  }))

  const monthOptions = [
    {
      label: 'Allt árið',
      value: undefined,
    },
  ].concat(
    months.map((date) => ({
      label: capitalize(format(date, 'MMMM')),
      value: date.getMonth(),
    })),
  )

  const makeHref = (y: string | number, m?: string | number) => {
    const query: { [k: string]: number | string } = { y }
    if (m != null) {
      query.m = m
    }

    return {
      pathname: makePath('news'),
      query,
    }
  }

  const sidebar = (
    <ArticleSidebar title="Fréttir og tilkynningar">
      <Stack space={3}>
        <NativeSelect
          name="year"
          value={selectedYear.toString()}
          options={yearOptions}
          onChange={(e) => Router.push(makeHref(e.target.value))}
        />
        <Typography variant="p" as="p">
          <Link href={makeHref(selectedYear)}>Allt árið</Link>
          {selectedMonth === undefined && <Bullet align="right" />}
        </Typography>
        {months.map((date: Date) => (
          <Typography key={date.toISOString()} variant="p" as="p">
            <Link href={makeHref(date.getFullYear(), date.getMonth())}>
              {capitalize(format(date, 'MMMM'))}
            </Link>
            {selectedMonth === date.getMonth() && <Bullet align="right" />}
          </Typography>
        ))}
      </Stack>
    </ArticleSidebar>
  )

  return (
    <>
      <Head>
        <title>Fréttir og tilkynningar | Viðspyrna fyrir Ísland</title>
      </Head>
      <NewsListLayout sidebar={sidebar}>
        <Stack space={[3, 3, 4]}>
          <Breadcrumbs color="blue400">
            <Link href={makePath()}>Viðspyrna</Link>
            <Link href={makePath('news')}>Fréttir og tilkynningar</Link>
          </Breadcrumbs>
          <Hidden below="lg">
            <Typography variant="h1" as="h1">
              {selectedYear}
            </Typography>
          </Hidden>

          <Hidden above="md">
            <Tiles space={3} columns={[1, 2]}>
              <Select
                label="Ár"
                placeholder="Ár"
                value={yearOptions.find(
                  (o) => o.value === selectedYear.toString(),
                )}
                options={yearOptions}
                onChange={({ value }: Option) => Router.push(makeHref(value))}
                name="year"
              />
              <Select
                label="Mánuður"
                placeholder="Allt árið"
                value={monthOptions.find((o) => o.value === selectedMonth)}
                options={monthOptions}
                onChange={({ value }: Option) =>
                  Router.push(makeHref(selectedYear, value))
                }
                name="month"
              />
            </Tiles>
          </Hidden>

          {newsList.map((newsItem) => (
            <NewsListItem key={newsItem.id} newsItem={newsItem} />
          ))}

          <Box paddingTop={8}>
            <Pagination
              {...page}
              renderLink={(page, className, children) => (
                <Link
                  href={{
                    pathname: makePath('news'),
                    query: { ...Router.query, page },
                  }}
                >
                  <span className={className}>{children}</span>
                </Link>
              )}
            />
          </Box>
        </Stack>
      </NewsListLayout>
    </>
  )
}

const NewsListItem = ({ newsItem }) => {
  const { activeLocale } = useI18n()
  const { makePath } = useRouteNames(activeLocale as Locale)
  const { format } = useDateUtils()

  return (
    <Box
      key={newsItem.id}
      boxShadow="subtle"
      borderRadius="large"
      padding={3}
      paddingBottom={[3, 3, 6]}
    >
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '6/12', '12/12', '7/12']}>
            <Box padding={[0, 0, 3]}>
              <Stack space={2}>
                <Typography variant="eyebrow" as="p" color="purple400">
                  {format(new Date(newsItem.date), 'do MMMM yyyy')}
                </Typography>
                <Typography variant="h3" as="h3" color="blue400">
                  <Link
                    href={makePath('news', '[slug]')}
                    as={makePath('news', newsItem.slug)}
                  >
                    {newsItem.title}
                  </Link>
                </Typography>
                <Typography variant="p" as="p">
                  {newsItem.intro}
                </Typography>
                <Typography variant="p" as="p">
                  <Link
                    href={makePath('news', '[slug]')}
                    as={makePath('news', newsItem.slug)}
                  >
                    <Button variant="text" icon="arrowRight">
                      Lesa nánar
                    </Button>
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </GridColumn>
          <GridColumn span={['12/12', '12/12', '6/12', '12/12', '5/12']}>
            <Box paddingX={[0, 0, 0, 3, 0]} paddingTop={3}>
              {newsItem.image && (
                <BackgroundImage image={newsItem.image} width={600} />
              )}
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

NewsList.getInitialProps = async ({ apolloClient, locale, query }) => {
  let year = getIntParam(query.y)
  const month = year && getIntParam(query.m)
  const selectedPage = getIntParam(query.page) ?? 1

  const [
    {
      data: {
        getAdgerdirNewsList: { news: oldest },
      },
    },
    {
      data: {
        getAdgerdirNewsList: { news: latest },
      },
    },
    {
      data: {
        getAdgerdirNewsList: { news: newsList, page },
      },
    },
  ] = await Promise.all([
    apolloClient.query<Query, QueryGetAdgerdirNewsListArgs>({
      query: GET_NEWS_LIST_QUERY,
      variables: {
        input: {
          perPage: 1,
          ascending: true,
        },
      },
    }),
    apolloClient.query<Query, QueryGetAdgerdirNewsListArgs>({
      query: GET_NEWS_LIST_QUERY,
      variables: {
        input: {
          perPage: 1,
        },
      },
    }),
    apolloClient.query<Query, QueryGetAdgerdirNewsListArgs>({
      query: GET_NEWS_LIST_QUERY,
      variables: {
        input: {
          lang: locale as ContentLanguage,
          perPage: 10,
          page: selectedPage,
          year,
          month,
        },
      },
    }),
  ])

  if ((year || page.page > 1) && newsList.length === 0) {
    throw new CustomNextError(404)
  }

  // default to year of first result if no year is selected
  if (!year && newsList.length > 0) {
    year = new Date(newsList[0].date).getFullYear()
  }

  return {
    newsList,
    page,
    selectedYear: year,
    selectedMonth: month,
    dateRange: createDateRange(
      oldest[0] && new Date(oldest[0].date),
      latest[0] && new Date(latest[0].date),
    ),
  }
}

const getIntParam = (s: string | string[]) => {
  const i = parseInt(Array.isArray(s) ? s[0] : s, 10)
  if (!isNaN(i)) return i
}

const createDateRange = (min: Date, max: Date): string[] => {
  if (!min || !max) return []

  return range(
    max.getFullYear() * 12 + max.getMonth(),
    min.getFullYear() * 12 + min.getMonth() - 1,
    -1,
  ).map((i: number) => new Date(Math.floor(i / 12), i % 12).toISOString())
}

export default withApollo(NewsList)
