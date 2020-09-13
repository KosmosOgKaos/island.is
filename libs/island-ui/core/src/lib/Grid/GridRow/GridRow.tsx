import React, { FC } from 'react'
import cn from 'classnames'
import { Box } from '../../Box'
import * as styles from './GridRow.treat'

interface Props {
  className?: string
}

export const GridRow: FC<Props> = ({ children, className }) => {
  return <Box className={cn(className, styles.gridRow)}>{children}</Box>
}
