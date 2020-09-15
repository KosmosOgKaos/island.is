import React, { CSSProperties, FC, useRef, useState, useEffect } from 'react'
import useComponentSize from '@rehooks/component-size'

import * as styles from './Slider.treat'
import { Box, Typography } from '@island.is/island-ui/core'
import { theme } from '@island.is/island-ui/theme'

interface TooltipProps {
  style?: CSSProperties
  atEnd?: boolean
}

const Tooltip: FC<TooltipProps> = ({ style, atEnd = false, children }) => (
  <Box
    data-test="slider-tooltip"
    className={styles.TooltipContainer}
    style={style}
  >
    <Box
      className={styles.TooltipBox}
      style={{
        transform: `translateX(${atEnd ? -85 : -50}%)`,
      }}
    >
      {children}
    </Box>
  </Box>
)

const useLatest = <T extends number>(value: T) => {
  const ref = useRef<T>()
  ref.current = value
  return ref
}

interface UseDragOptions {
  onDragStart?: () => void
  onDragEnd?: (delta: number) => void
  onDragMove?: (delta: number) => void
}

const roundByNum = (num: number, rounder: number) => {
  const multiplier = 1 / (rounder || 0.5)
  return Math.round(num * multiplier) / multiplier
}

const isMouseEvent = <T extends HTMLElement>(
  event: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>,
): event is React.MouseEvent<T, MouseEvent> => {
  return event.nativeEvent instanceof MouseEvent
}

const useDrag = ({ onDragStart, onDragEnd, onDragMove }: UseDragOptions) => {
  const start = useRef(0)

  const handleDragMove = (event: MouseEvent | TouchEvent) => {
    const x =
      event instanceof MouseEvent ? event.clientX : event.targetTouches[0].pageX
    const deltaX = x - start.current

    if (onDragMove) {
      onDragMove(deltaX)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent) => {
    document.removeEventListener('mouseup', handleDragEnd)
    document.removeEventListener('touchend', handleDragEnd)
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('touchmove', handleDragMove)

    const x =
      event instanceof MouseEvent ? event.clientX : event.targetTouches[0].pageX
    const deltaX = x - start.current

    if (onDragEnd) {
      onDragEnd(deltaX)
    }
  }

  const handleDragStart = (
    event:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.TouchEvent<HTMLElement>,
  ) => {
    start.current = isMouseEvent(event)
      ? event.clientX
      : event.targetTouches[0].pageX
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)

    if (onDragStart) {
      onDragStart()
    }
  }

  return {
    onMouseDown: handleDragStart,
    onTouchStart: handleDragStart,
  }
}

interface TrackProps {
  currentIndex: number
  onChange?: (index: number) => void
  snap?: boolean
  min?: number
  max?: number
  step?: number
  label: {
    singular: string
    plural: string
  }
}

const Slider = ({
  currentIndex,
  onChange,
  snap = true,
  min = 0,
  max = 12,
  step = 0.5,
  label,
}: TrackProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const ref = useRef(null)
  const size = useComponentSize(ref)
  const dragX = useRef<number>()
  const indexRef = useLatest(currentIndex)
  const sizePerCell = size.width / max
  const x = sizePerCell * currentIndex

  useEffect(() => {
    if (thumbRef.current != null && !isDragging) {
      thumbRef.current.style.transform = `translateX(${x}px)`
    }

    if (remainderRef.current != null) {
      remainderRef.current.style.left = `${x}px`
    }
  }, [isDragging, x])

  const tooltipStyle = { transform: `translateX(${x}px)` }
  const thumbStyle = {
    transform: `translateX(${dragX.current == null ? x : dragX.current}px)`,
    transition: isDragging ? 'none' : '',
  }

  const remainderStyle = {
    left: `${dragX.current == null ? x : dragX.current}px`,
    transition: isDragging ? 'none' : '',
  }

  const thumbRef = React.useRef<HTMLDivElement>(null)
  const remainderRef = React.useRef<HTMLDivElement>(null)

  const dragBind = useDrag({
    onDragMove(deltaX) {
      const currentX = x + deltaX
      dragX.current = Math.max(
        min * sizePerCell,
        Math.min(size.width, currentX),
      )
      const index = roundByNum(dragX.current / sizePerCell, step)

      if (onChange && index !== indexRef.current) {
        onChange(index)
      }

      if (thumbRef.current && dragX.current != null) {
        thumbRef.current.style.transform = `translateX(${dragX.current}px)`
      }

      if (remainderRef.current && dragX.current != null) {
        if (!snap) remainderRef.current.style.left = `${dragX.current}px`
      }
    },
    onDragStart() {
      setIsDragging(true)
    },
    onDragEnd() {
      dragX.current = undefined
      setIsDragging(false)
    },
  })

  const formatTooltip = (count: number) =>
    count <= 1
      ? `${currentIndex} ${label.singular}`
      : `${count} ${label.plural}`

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (onChange == null) {
      return
    }
    switch (event.key) {
      case 'ArrowLeft':
        if (currentIndex > min) {
          onChange(currentIndex - step)
        }
        break
      case 'ArrowRight':
        if (currentIndex < max) {
          onChange(currentIndex + step)
        }
        break
    }
  }

  const onCellClick = (
    index: number,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const percentClicked = event.nativeEvent.offsetX / rect.width
    const newIndex = Math.max(min, index + roundByNum(percentClicked, step))
    onChange && onChange(newIndex)
  }

  return (
    <Box>
      <Box display="flex" justifyContent="spaceBetween" width="full">
        <Typography color="blue400" variant="eyebrow">
          {min}
        </Typography>
        <Typography color="blue400" variant="eyebrow">
          {max}
        </Typography>
      </Box>
      <Box
        className={styles.TrackGrid}
        marginTop={1}
        style={{ gridTemplateColumns: `repeat(${max}, 1fr)` }}
        ref={ref}
      >
        {Array.from({ length: max }).map((_, index) => {
          const isActive = index < currentIndex
          return (
            <Box
              className={styles.TrackCell}
              key={index}
              style={{
                background: isActive
                  ? theme.color.mint400
                  : theme.color.dark200,
                opacity: 1,
              }}
              onClick={(e) => onCellClick(index, e)}
            />
          )
        })}

        <Tooltip style={tooltipStyle} atEnd={currentIndex === max}>
          {formatTooltip(currentIndex)}
        </Tooltip>

        <Box
          className={styles.Thumb}
          data-test="slider-thumb"
          style={thumbStyle}
          ref={thumbRef}
          {...dragBind}
          onKeyDown={onKeyDown}
          tabIndex={0}
        />

        <Box
          className={styles.remainderBar}
          style={remainderStyle}
          ref={remainderRef}
        />
      </Box>
    </Box>
  )
}

export default Slider
