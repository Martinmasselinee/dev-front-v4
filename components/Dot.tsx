'use client'

import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS } from '../constants/border'

interface DotProps {
  size?: number
  color?: string
  marginLeft?: string
  marginRight?: string
}

export const Dot = ({ size = 4, color = COLOR.PURPLE, marginLeft = SPACING.M, marginRight = SPACING.M }: DotProps) => {
  return (
    <span
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: BORDER_RADIUS.CIRCLE,
        backgroundColor: color,
        marginLeft: marginLeft,
        marginRight: marginRight,
        verticalAlign: 'middle',
      }}
    />
  )
}

