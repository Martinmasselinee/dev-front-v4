'use client'

import { ReactNode } from 'react'
import { Globe } from 'lucide-react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, FLEX } from '../constants/flex'
import { BORDER_RADIUS } from '../constants/border'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { CURSOR } from '../constants/interaction'
import { TRANSITION } from '../constants/transition'
import { MULTIPLIER } from '../constants/multiplier'
import { OPACITY } from '../constants/opacity'
import { ICON_SIZE } from '../constants/iconSize'
import { darkenColor, hexToRgba } from '../lib/colorUtils'
import { Text } from './Text'

export interface BubbleProps {
  children: ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

export const Bubble = ({ children, onClick, style }: BubbleProps) => {
  // Darken the purple color itself, then lighten it for the background
  const darkerPurple = darkenColor(COLOR.PURPLE, MULTIPLIER.COLOR_DARKEN_PERCENT)
  const hoverBackgroundColor = hexToRgba(darkerPurple, OPACITY.PURPLE_LIGHT)

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          span[data-bubble]:hover {
            background-color: ${hoverBackgroundColor} !important;
          }
        `
      }} />
      <span
        data-bubble
        onClick={onClick}
        style={{
          display: DISPLAY.INLINE_FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          gap: SPACING.XS,
          paddingLeft: SPACING.S,
          paddingRight: SPACING.S,
          paddingTop: SPACING.XS,
          paddingBottom: SPACING.XS,
          backgroundColor: COLOR.PURPLE_LIGHT,
          borderRadius: BORDER_RADIUS.M,
          flexShrink: FLEX.ZERO,
          cursor: onClick ? CURSOR.POINTER : CURSOR.DEFAULT,
          transition: `background-color ${TRANSITION.FAST_EASE}`,
          ...style,
        }}
      >
        <Globe 
          size={ICON_SIZE.S} 
          style={{ 
            color: COLOR.PURPLE,
            flexShrink: FLEX.ZERO,
          }} 
        />
        <Text 
          size="M" 
          weight="XL" 
          color="PURPLE"
          style={{
            fontSize: FONT_SIZE.M,
            fontWeight: FONT_THICKNESS.XL,
          }}
        >
          {children}
        </Text>
      </span>
    </>
  )
}

