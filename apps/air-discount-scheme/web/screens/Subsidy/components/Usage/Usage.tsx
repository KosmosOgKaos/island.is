import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { Box, Typography } from '@island.is/island-ui/core'
import {
  Table,
  Row,
  Head,
  HeadData,
  Body,
  Data,
} from '@island.is/air-discount-scheme-web/components/Table'
import { format } from 'date-fns'
import { is, enGB } from 'date-fns/locale'
import { useI18n } from '@island.is/air-discount-scheme-web/i18n'

const THIRTY_SECONDS = 30000 // milli-seconds

const FlightsQuery = gql`
  query FlightsQuery {
    user {
      nationalId
      flights {
        id
        bookingDate
        travel
        user {
          nationalId
          name
        }
      }
    }
  }
`

interface PropTypes {
  misc: string
}

function Usage({ misc }: PropTypes) {
  const { data } = useQuery(FlightsQuery, {
    ssr: false,
    pollInterval: THIRTY_SECONDS,
  })
  const { user } = data || {}
  const flights = user?.flights || []
  const { currentUsage, user: userTitle, path, date } = JSON.parse(misc)
  const { activeLocale } = useI18n()

  if (flights.length <= 0) {
    return null
  }

  return (
    <Box marginBottom={6} paddingTop={6}>
      <Box marginBottom={3}>
        <Typography variant="h3">{currentUsage}</Typography>
      </Box>
      <Table>
        <Head>
          <Row>
            <HeadData>{userTitle}</HeadData>
            <HeadData>{path}</HeadData>
            <HeadData>{date}</HeadData>
          </Row>
        </Head>
        <Body>
          {flights.map((flight) => (
            <Row key={flight.id}>
              <Data>{flight.user.name}</Data>
              <Data>{flight.travel}</Data>
              <Data>
                {format(new Date(flight.bookingDate), 'dd. MMMM - k:mm', {
                  locale: activeLocale === 'is' ? is : enGB,
                })}
              </Data>
            </Row>
          ))}
        </Body>
      </Table>
    </Box>
  )
}

export default Usage
