import React from 'react'
import {
  GridContainer,
  GridColumn,
  GridRow,
  Typography,
  ArrowLink,
  Box,
  Swiper,
  Hidden,
} from '@island.is/island-ui/core'
import { NewsCard } from '../NewsCard'
import routeNames from '@island.is/web/i18n/routeNames'
import { useI18n } from '@island.is/web/i18n'
import { GetNewsListQuery } from '../../graphql/schema'

// LatestNewsSection on desktop displays latest 3 news cards in grid.
// On mobile it displays 3 news cards in a Swiper.

interface LatestNewsProps {
  label: string
  items: GetNewsListQuery['getNewsList']['news']
}

const LatestNewsSection: React.FC<LatestNewsProps> = ({
  items = [],
  label,
}) => {
  const newsItems = items.slice(0, 3)
  const { activeLocale } = useI18n()
  const { makePath } = routeNames(activeLocale)

  return (
    <GridContainer>
      <GridRow>
        <GridColumn span={['12/12', '12/12', '6/12']}>
          <Typography variant="h3" as="h2" paddingBottom={4}>
            {label}
          </Typography>
        </GridColumn>
        <GridColumn span="6/12" hideBelow="md">
          <Box display="flex" justifyContent="flexEnd" paddingBottom={4}>
            <Typography variant="h3" as="p" paddingBottom={4}>
              <ArrowLink href="/frett" arrowHeight={16}>
                Sjá fleiri
              </ArrowLink>
            </Typography>
          </Box>
        </GridColumn>
      </GridRow>
      <Hidden below="md">
        <GridRow>
          {newsItems.map((newsItem) => (
            <GridColumn
              span={['12/12', '12/12', '12/12', '4/12']}
              key={newsItem.slug}
            >
              <NewsCard
                title={newsItem.title}
                subtitle={newsItem.subtitle}
                introduction={newsItem.intro}
                slug={newsItem.slug}
                image={newsItem.image}
                as={makePath('news', newsItem.slug)}
                url={makePath('news', '[slug]')}
              />
            </GridColumn>
          ))}
        </GridRow>
      </Hidden>
      <Hidden above="md">
        <Swiper>
          {newsItems.map((newsItem) => (
            <NewsCard
              key={newsItem.slug}
              title={newsItem.title}
              subtitle={newsItem.subtitle}
              introduction={newsItem.intro}
              slug={newsItem.slug}
              image={newsItem.image}
              as={makePath('news', newsItem.slug)}
              url={makePath('news', '[slug]')}
            />
          ))}
        </Swiper>
      </Hidden>
    </GridContainer>
  )
}

export default LatestNewsSection
