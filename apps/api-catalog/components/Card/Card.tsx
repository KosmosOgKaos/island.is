import React from 'react'
import { Box, Link } from '@island.is/island-ui/core'
import cn from 'classnames'

//import './service-card.scss'

export interface CardInformation {
    title: string;
    slug: string;
}

export interface CardProps {
  card: CardInformation
}

function Card(props: CardProps) {
  return (
    <Link href={props.card.slug}>
      <Box
      display="flex"
      boxShadow="large"
      borderRadius="large"
      height="touchable"
      justifyContent="center"
      alignItems="center"
      >
        {props.card.title}
      </Box>
    </Link>
  )
}

export default Card