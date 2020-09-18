import React from 'react'
import { is } from 'date-fns/locale'
import { format } from 'date-fns'

import {
  Table,
  Row,
  Head,
  HeadData,
  Body,
  Data,
} from '@island.is/air-discount-scheme-web/components/Table'
import { Typography, Box } from '@island.is/island-ui/core'
import { FlightLeg } from '@island.is/air-discount-scheme-web/graphql/schema'
import { FilterInput, financialStateOptions } from '../../consts'
import * as styles from './Panel.treat'

interface PropTypes {
  filters: FilterInput
  flightLegs: FlightLeg[]
}

function Panel({ filters, flightLegs }: PropTypes) {
  const translateGender = (gender: string): string => {
    if (gender === 'kk') {
      return 'karlmaður'
    } else if (gender === 'kvk') {
      return 'kvenmaður'
    }
    return 'manneskja'
  }

  return (
    <Box marginBottom={6}>
      <Table>
        <Head>
          <Row>
            <HeadData>Notandi</HeadData>
            <HeadData>Flug</HeadData>
            <HeadData>Staða</HeadData>
            <HeadData alignRight>Verð (kr.)</HeadData>
          </Row>
        </Head>
        <Body>
          {flightLegs.map((flightLeg) => (
            <Row key={flightLeg.id}>
              <Data>
                <Box display="flex" flexDirection="column">
                  <Typography>
                    {flightLeg.flight.userInfo.age} ára{' '}
                    {translateGender(flightLeg.flight.userInfo.gender)}
                  </Typography>
                  <Typography color="dark300" variant="pSmall">
                    með póstnúmer {flightLeg.flight.userInfo.postalCode}
                  </Typography>
                </Box>
              </Data>
              <Data>
                <Box display="flex" flexDirection="column">
                  {flightLeg.travel}
                  <Typography color="dark300" variant="pSmall">
                    {format(
                      new Date(flightLeg.flight.bookingDate),
                      'dd. MMMM - k:mm',
                      {
                        locale: is,
                      },
                    )}
                  </Typography>
                  <Typography color="dark300" variant="pSmall">
                    <span className={styles.capitalize}>
                      {flightLeg.airline}
                    </span>
                  </Typography>
                </Box>
              </Data>
              <Data>
                {
                  (
                    financialStateOptions.find(
                      (state) => state.value === flightLeg.financialState,
                    ) || { label: '-' }
                  ).label
                }
              </Data>
              <Data alignRight>
                <Box display="flex" flexDirection="column">
                  <Typography color="blue400" variant="h4">
                    {flightLeg.discountPrice.toLocaleString('de-DE')}.-
                  </Typography>
                  <Typography color="dark300" variant="pSmall">
                    {flightLeg.originalPrice.toLocaleString('de-DE')}.-
                  </Typography>
                </Box>
              </Data>
            </Row>
          ))}
        </Body>
      </Table>
    </Box>
  )
}

export default Panel
