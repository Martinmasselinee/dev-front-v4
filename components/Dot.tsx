'use client'

import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS } from '../constants/border'
import { DISPLAY } from '../constants/display'
import { DIMENSION } from '../constants/dimension'
import { VERTICAL_ALIGN } from '../constants/verticalAlign'

interface DotProps {
  size?: string
  color?: string
  marginLeft?: string
  marginRight?: string
}

export const Dot = ({ size = DIMENSION.DOT_SIZE, color = COLOR.PURPLE, marginLeft = SPACING.M, marginRight = SPACING.M }: DotProps) => {
  return (
    <span
      style={{
        display: DISPLAY.INLINE_BLOCK,
        width: size,
        height: size,
        borderRadius: BORDER_RADIUS.CIRCLE,
        backgroundColor: color,
        marginLeft: marginLeft,
        marginRight: marginRight,
        verticalAlign: VERTICAL_ALIGN.MIDDLE,
      }}
    />
  )
}

