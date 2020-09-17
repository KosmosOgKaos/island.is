import React from 'react'
import cn from 'classnames'
import { resolveResponsiveProp } from '../../utils/responsiveProp'

import styles, {
  VariantTypes,
  colors,
  truncate as truncateStyle,
  links as linksStyle,
  spacing,
  fontWeight as fontWeightStyles,
  defaultFontWeights,
} from './Typography.treat'
import { Colors } from '@island.is/island-ui/theme'
import { ResponsiveSpace } from '../Box/useBoxStyles'

export interface TypographyProps {
  id?: string
  variant?: VariantTypes
  children?: React.ReactNode
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    | 'caption'
  color?: Colors
  truncate?: boolean
  links?: boolean
  paddingTop?: ResponsiveSpace
  paddingBottom?: ResponsiveSpace
  fontWeight?: keyof typeof fontWeightStyles
}

export const Typography = ({
  id,
  variant,
  as: Cmp = 'p',
  children,
  color,
  truncate,
  links,
  paddingTop,
  paddingBottom,
  fontWeight,
}: TypographyProps) => (
  <Cmp
    id={id}
    className={cn(
      variant ? styles[variant] : null,
      color ? colors[color] : null,
      fontWeight ? fontWeightStyles[fontWeight] : null,
      {
        [truncateStyle]: truncate,
        [linksStyle]: links,
        [defaultFontWeights[variant]]: variant && !fontWeight,
      },
      paddingBottom !== undefined &&
        resolveResponsiveProp(
          paddingBottom,
          spacing.paddingBottomXs,
          spacing.paddingBottomSm,
          spacing.paddingBottomMd,
          spacing.paddingBottomLg,
          spacing.paddingBottomXl,
        ),
      paddingTop !== undefined &&
        resolveResponsiveProp(
          paddingTop,
          spacing.paddingTopXs,
          spacing.paddingTopSm,
          spacing.paddingTopMd,
          spacing.paddingTopLg,
          spacing.paddingTopXl,
        ),
    )}
  >
    {children}
  </Cmp>
)

export default Typography
