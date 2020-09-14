import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const thumbnail = style({
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: 137,
  height: 156,
  flex: 'none',
  display: 'block',
})

export const card = style({
  position: 'relative',
  borderRadius: theme.border.radius.large,
  boxShadow: `0px 4px 30px ${theme.color.blue100}`,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      boxShadow: 'none',
    },
  },
})

export const content = style({
  flex: 1,
})
