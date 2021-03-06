import React, { forwardRef } from 'react'
import { Box } from '../Box/Box'
import { Typography } from '../Typography/Typography'
import { Tag, TagVariant, TagProps } from '../Tag/Tag'
import * as styles from './LinkCard.treat'

export interface LinkCardProps {
  onClick?: () => void
  children: string
  tag?: string
  tagVariant?: TagVariant
  tagProps?: Omit<TagProps, 'children'>
}

export const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  (
    {
      onClick,
      children,
      tag,
      tagVariant = 'darkerBlue',
      tagProps = {
        label: true,
      },
    }: LinkCardProps,
    ref,
  ) => {
    return (
      <Box
        background="blue100"
        borderRadius="large"
        position="relative"
        display="flex"
        onClick={onClick}
        padding={[2, 2, 3]}
        ref={ref}
        width="full"
      >
        <Typography variant="h4" as="span" color="blue400">
          {children}
        </Typography>
        {tag && (
          <Box className={styles.tag} paddingLeft={2}>
            <Tag variant={tagVariant} {...tagProps}>
              {tag}
            </Tag>
          </Box>
        )}
      </Box>
    )
  },
)
