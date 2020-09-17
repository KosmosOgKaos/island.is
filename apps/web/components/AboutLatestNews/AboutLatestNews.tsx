import React, { FC } from 'react'
import { Typography, Box, Stack, Tiles } from '@island.is/island-ui/core'
import { useDateUtils } from '@island.is/web/i18n/useDateUtils'

import { Image } from '../../graphql/schema'
import * as styles from './AboutLatestNews.treat'

// This component is used to display latest news on the About page only.
// It's not how we display the latest news on the front page.
// We will probably merge the two later.

export interface LatestNewsItem {
  date: string | Date

  title: string
  intro: string
  image?: Image
}

export interface LatestNewsProps {
  title: string
  news: LatestNewsItem[]
}

export const AboutLatestNews: FC<LatestNewsProps> = ({ title, news }) => {
  const [first, ...rest] = news

  return (
    <>
      <div className={styles.indent}>
        {Boolean(title) && (
          <Box paddingBottom={8}>
            <Typography variant="h1" as="h2">
              {title}
            </Typography>
          </Box>
        )}
        {first && <BigNewsItem news={first} />}
      </div>
      {rest.length > 0 && (
        <Box paddingTop={15}>
          <Tiles space={3} columns={[1, 1, 2]}>
            {rest.map((news, i) => (
              <NewsItem key={i} news={news} />
            ))}
          </Tiles>
        </Box>
      )}
    </>
  )
}

const BigNewsItem = ({ news }: { news: LatestNewsItem }) => {
  const { format } = useDateUtils()

  return (
    <Stack space={3}>
      <Typography variant="eyebrow" color="purple400">
        {format(new Date(news.date), 'do MMMM yyyy')}
      </Typography>
      <Typography variant="h2" as="h3">
        {news.title}
      </Typography>
      <Typography variant="intro">{news.intro}</Typography>
      {news.image && (
        <Box paddingTop={4}>
          <img src={news.image.url} alt={news.image.title} />
        </Box>
      )}
    </Stack>
  )
}

const NewsItem = ({ news }: { news: LatestNewsItem }) => (
  <Box
    boxShadow="subtle"
    overflow="hidden"
    borderRadius="large"
    display="flex"
    flexDirection="column"
    height="full"
    background="white"
  >
    <img src={news.image.url} alt={news.image.title} />
    <Box paddingX={3} paddingY={4}>
      <Stack space={2}>
        {/* <Typography variant="eyebrow">TODO: category</Typography> */}
        <Typography variant="h3" as="h3">
          {news.title}
        </Typography>
        <Typography variant="p">{news.intro}</Typography>
      </Stack>
    </Box>
  </Box>
)
