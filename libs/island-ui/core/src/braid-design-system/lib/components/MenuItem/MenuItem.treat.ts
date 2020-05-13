import { style } from 'treat';

export const menuItem = style({
  whiteSpace: 'nowrap',
  selectors: {
    [`&::-moz-focus-inner`]: {
      border: 0,
    },
  },
});
