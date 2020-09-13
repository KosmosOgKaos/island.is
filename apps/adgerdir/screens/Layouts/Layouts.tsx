import React, { FC, ReactNode } from 'react'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Hidden,
} from '@island.is/island-ui/core'

import { Sticky } from '@island.is/adgerdir/components'

interface ArticleProps {
  sidebar?: ReactNode
}

export const ArticleLayout: FC<ArticleProps> = ({ sidebar, children }) => (
  <Box paddingY={[3, 3, 6]}>
    <GridContainer>
      <GridRow>
        <GridColumn
          span={['12/12', '12/12', '12/12', '7/12']}
          offset={[null, null, null, null, '1/12']}
        >
          {children}
        </GridColumn>
        <GridColumn
          span={['12/12', '12/12', '12/12', '4/12', '3/12']}
          offset={[null, null, null, '1/12']}
        >
          {sidebar}
        </GridColumn>
      </GridRow>
    </GridContainer>
  </Box>
)

interface NewsListProps {
  sidebar: ReactNode
}

export const NewsListLayout: FC<NewsListProps> = ({ sidebar, children }) => (
  <Box paddingY={[3, 3, 6]}>
    <GridContainer>
      <GridRow>
        <GridColumn span={['12/12', '12/12', '12/12', '4/12', '3/12']}>
          <Sticky>
            <Hidden below="lg">{sidebar}</Hidden>
          </Sticky>
        </GridColumn>
        <GridColumn
          span={['12/12', '12/12', '12/12', '7/12']}
          offset={[null, null, null, '1/12']}
        >
          {children}
        </GridColumn>
      </GridRow>
    </GridContainer>
  </Box>
)
