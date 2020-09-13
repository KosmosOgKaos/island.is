import React, { FC } from 'react'
import cn from 'classnames'
import * as styles from './StaticHtml.treat'

export interface HtmlProps {
  className?: string
}

export const StaticHtml: FC<HtmlProps> = ({ className, children }) => {
  return <div className={cn(styles.container, className)}>{children}</div>
}

export default StaticHtml
