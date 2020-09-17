import React from 'react'
import { Box, Typography, Link, FocusableBox } from '@island.is/island-ui/core'
import * as styles from './LifeEventCard.treat'

interface Props {
  title: string
  intro: string
  image: string
  href: string
  as: string
}

const LifeEventCard: React.FC<Props> = ({ title, intro, image, href, as }) => {
  return (
    <FocusableBox
      component={Link}
      href={href}
      as={as}
      borderColor="blue200"
      borderWidth="standard"
      height="full"
      borderRadius="large"
    >
      <Box
        className={styles.card}
        alignItems="flexStart"
        background="white"
        display="flex"
        height="full"
        paddingX={[3, 3, 4]}
        paddingY={[1, 1, 3]}
        overflow="hidden"
      >
        <Box
          display="flex"
          flexDirection="column"
          className={styles.content}
          marginRight={[2, 2, 2, 2, 1]}
          marginTop={[3, 3, 0]}
        >
          <Typography variant="h3" as="h3" paddingBottom={1} color="blue400">
            {title}
          </Typography>
          <Typography variant="p">{intro}</Typography>
        </Box>

        <div
          className={styles.thumbnail}
          style={{ backgroundImage: `url(${image})` }}
        />
      </Box>
    </FocusableBox>
  )
}

export default LifeEventCard
