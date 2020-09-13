import React, { FC } from 'react'
import { format } from 'date-fns'
import { is } from 'date-fns/locale'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Stack,
  Button,
} from '@island.is/island-ui/core'
import { AdgerdirNews } from '@island.is/api/schema'
import { Heading, BackgroundImage } from '@island.is/adgerdir/components'

import * as styles from './FeaturedNews.treat'
import Link from 'next/link'

interface FeaturedNewsProps {
  items: Array<AdgerdirNews>
}

export const FeaturedNews: FC<FeaturedNewsProps> = ({ items }) => {
  if (!items.length) {
    return null
  }

  const parsed = items.map((x, index) => {
    return {
      ...x,
      dateFormatted: format(new Date(x.date), 'd. LLLL, uuuu', {
        locale: is,
      }).toLowerCase(),
    }
  })

  const first = parsed[0]
  const second = parsed[1]
  const third = parsed[2]

  return (
    <>
      {first ? (
        <GridContainer>
          <GridRow>
            <GridColumn
              span={['12/12', '12/12', '12/12', '12/12', '10/12']}
              offset={[null, null, null, null, '1/12']}
            >
              <Box marginBottom={[3, 3, 5]}>
                {first.image ? (
                  <Box marginBottom={6}>
                    <BackgroundImage ratio="20:10" image={first.image} />
                  </Box>
                ) : null}
                <Stack space={2}>
                  <Heading
                    subtitle={first.dateFormatted}
                    title={first.title}
                    intro={first.intro}
                  />
                  <Link
                    href="/frettir/[slug]"
                    as={`/frettir/${first.slug}`}
                    passHref
                  >
                    <Button variant="text" icon="arrowRight">
                      Lesa meira
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </GridColumn>
          </GridRow>
        </GridContainer>
      ) : null}
      {second || third ? (
        <>
          <Box className={styles.centeredBorder} marginBottom={[3, 3, 5]}>
            <GridContainer>
              <GridRow>
                <GridColumn
                  span={['12/12', '12/12', '12/12', '12/12', '10/12']}
                  offset={[null, null, null, null, '1/12']}
                >
                  <Box className={styles.topBorder}></Box>
                </GridColumn>
                {second ? (
                  <GridColumn
                    span={['12/12', '12/12', '12/12', '5/12', '4/12']}
                    offset={[null, null, null, null, '1/12']}
                  >
                    <Box marginY={[3, 3, 5]}>
                      <Stack space={2}>
                        <Heading
                          main={false}
                          subtitle={second.dateFormatted}
                          title={second.title}
                          intro={second.intro}
                          variant="h3"
                          as="h3"
                        />
                        <Link
                          href="/frettir/[slug]"
                          as={`/frettir/${second.slug}`}
                          passHref
                        >
                          <Button variant="text" icon="arrowRight">
                            Lesa meira
                          </Button>
                        </Link>
                      </Stack>
                    </Box>
                  </GridColumn>
                ) : null}
                {third ? (
                  <GridColumn
                    span={['12/12', '12/12', '12/12', '5/12', '4/12']}
                    offset={[null, null, null, '2/12', '2/12']}
                  >
                    <Box marginY={[3, 3, 5]}>
                      <Stack space={2}>
                        <Heading
                          main={false}
                          subtitle={third.dateFormatted}
                          title={third.title}
                          intro={third.intro}
                          variant="h3"
                          as="h3"
                        />
                        <Link
                          href="/frettir/[slug]"
                          as={`/frettir/${third.slug}`}
                          passHref
                        >
                          <Button variant="text" icon="arrowRight">
                            Lesa meira
                          </Button>
                        </Link>
                      </Stack>
                    </Box>
                  </GridColumn>
                ) : null}
              </GridRow>
            </GridContainer>
          </Box>
          <Box
            marginTop={3}
            display="flex"
            width="full"
            alignItems="center"
            justifyContent="center"
          >
            <Link href="/frettir" as="/frettir" passHref>
              <Button width="fixed" variant="ghost" icon="arrowRight">
                Sjá allar fréttir
              </Button>
            </Link>
          </Box>
        </>
      ) : null}
    </>
  )
}

export default FeaturedNews
