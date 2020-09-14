import React from 'react'
import cn from 'classnames'

import * as styles from './Item.treat'

import { AsyncSearchOption } from '../../AsyncSearch'

interface Props {
  isSelected: boolean
  isActive: boolean
  highlightedIndex: number
  index: number
  colored: boolean
  size: 'medium' | 'large'
  item: {
    component: AsyncSearchOption['component']
    label: string
  }
}

export const Item: React.FC<Props> = ({
  children,
  isSelected,
  isActive,
  highlightedIndex,
  index,
  colored,
  size,
  item,
  ...props
}) => {
  const selectedClass = colored ? styles.selectedColored : styles.selected
  const colorClass = colored ? styles.colored : styles.plain
  const isPrev = index === highlightedIndex - 1

  if (item.component) {
    const Cmp = item.component

    return (
      <li className={styles.customItem} {...props}>
        <Cmp active={isActive} selected={isSelected} colored={colored} />
        <span
          className={cn(styles.divider, {
            [styles.dividerVisible]: !isPrev && !isActive,
          })}
        />
      </li>
    )
  }

  return (
    <li
      {...props}
      className={cn(styles.item, colorClass, styles.sizes[size], {
        [selectedClass]: isActive,
      })}
    >
      {item.label}
      <span
        className={cn(styles.divider, {
          [styles.dividerVisible]: !isPrev && !isActive,
        })}
      />
    </li>
  )
}

export default Item
