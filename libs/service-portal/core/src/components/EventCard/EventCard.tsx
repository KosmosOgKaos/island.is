import React from 'react'
import * as styles from './EventCard.treat'
import { Box, Typography, FocusableBox } from '@island.is/island-ui/core'

interface Props {
  title: string
  renderContent?: () => JSX.Element
  image: string
  url: string
}

export const EventCard: React.FC<Props> = ({
  title,
  renderContent,
  image,
  url,
}) => {
  return (
    <FocusableBox
      component="div"
      href={url}
      borderColor="blue200"
      borderWidth="standard"
      height="full"
    >
      <Box
        className={styles.card}
        alignItems="flexStart"
        background="white"
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent="spaceBetween"
        height="full"
        width="full"
        paddingX={[2, 2, 4]}
        paddingY={[1, 1, 3]}
        overflow="hidden"
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <Box
          display="flex"
          flexDirection="column"
          className={styles.content}
          marginRight={[2, 2, 2, 2, 1]}
        >
          <Typography variant="h3" as="h3" paddingBottom={1} color="blue400">
            {title}
          </Typography>
          {renderContent && renderContent()}
        </Box>

        <div
          className={styles.thumbnail}
          style={{ backgroundImage: `url(${image})` }}
        />
      </Box>
    </FocusableBox>
  )
}
