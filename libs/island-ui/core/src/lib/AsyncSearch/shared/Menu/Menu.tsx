import React, { forwardRef } from 'react'
import cn from 'classnames'

import * as styles from './Menu.treat'

export interface MenuProps {
  comp?: React.ElementType
  isOpen: boolean
  shouldShowItems?: boolean
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(
  (
    { comp: Comp = 'ul', isOpen, shouldShowItems = isOpen, children, ...props },
    ref,
  ) => {
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(styles.menu, {
          [styles.hidden]: !shouldShowItems,
          [styles.open]: isOpen,
        })}
      >
        {children}
      </Comp>
    )
  },
)

export default Menu
