'use client'

import { Check, X } from 'lucide-react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, FLEX } from '../constants/flex'
import { MULTIPLIER } from '../constants/multiplier'
import { OPACITY } from '../constants/opacity'
import { BORDER_WIDTH } from '../constants/border'
import { ICON_SIZE } from '../constants/iconSize'
import { ICON_STROKE_WIDTH } from '../constants/icon'
import { hexToRgba } from '../lib/colorUtils'
import { Text } from './Text'

export interface StatusBubbleProps {
  label: string
  variant: 'green' | 'red'
  style?: React.CSSProperties
}

export const StatusBubble = ({ label, variant, style }: StatusBubbleProps) => {
  const backgroundColor = COLOR.WHITE
  
  const textColor = variant === 'green' ? COLOR.GOOGLE.GREEN : COLOR.RED
  const iconColor = variant === 'green' 
    ? hexToRgba(COLOR.GOOGLE.GREEN, OPACITY.FULL)
    : hexToRgba(COLOR.RED, OPACITY.FULL)
  const borderColor = variant === 'green' 
    ? hexToRgba(COLOR.GOOGLE.GREEN, OPACITY.STATUS_BUBBLE)
    : hexToRgba(COLOR.RED, OPACITY.STATUS_BUBBLE)
  
  const IconComponent = variant === 'green' ? Check : X
  
  // Capitalize first letter
  const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)

  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.XS,
        paddingLeft: SPACING.S,
        paddingRight: SPACING.S,
        paddingTop: SPACING.XS,
        paddingBottom: SPACING.XS,
        backgroundColor,
        border: `${BORDER_WIDTH.THIN} solid ${borderColor}`,
        borderRadius: SPACING.XL,
        flexShrink: FLEX.ZERO,
        ...style,
      }}
    >
      <IconComponent 
        size={ICON_SIZE.S} 
        strokeWidth={ICON_STROKE_WIDTH.DEFAULT}
        style={{ 
          color: iconColor, 
          flexShrink: FLEX.ZERO 
        }} 
      />
      <Text 
        size="S" 
        weight="M" 
        color="BLACK"
      >
        {capitalizedLabel}
      </Text>
    </div>
  )
}

