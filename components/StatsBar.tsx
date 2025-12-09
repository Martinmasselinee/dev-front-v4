'use client'

import { LucideIcon } from 'lucide-react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { Z_INDEX } from '../constants/zIndex'
import { POSITION } from '../constants/position'
import { WIDTH } from '../constants/width'
import { LAYOUT } from '../constants/layout'
import { POSITION_TYPE } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { BORDER, BORDER_WIDTH } from '../constants/border'
import { ICON_SIZE } from '../constants/iconSize'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { TEXT_ALIGN } from '../constants/text'
import { MULTIPLIER } from '../constants/multiplier'
import { Text } from './Text'

interface StatItem {
  icon: LucideIcon
  value: string | number
  label: string
}

interface StatsBarProps {
  stats: StatItem[]
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  return (
    <div
      style={{
        position: POSITION_TYPE.FIXED,
        top: `calc(${SPACING.XXXL} + ${SPACING.M})`,
        left: LAYOUT.SIDEBAR_WIDTH,
        right: POSITION.ZERO,
        width: `calc(${WIDTH.FULL} - ${LAYOUT.SIDEBAR_WIDTH})`,
        height: `calc((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STATS_BAR_HEIGHT})`,
        backgroundColor: COLOR.WHITE,
        borderBottom: BORDER.NONE,
        zIndex: Z_INDEX.NAVBAR - 1,
        paddingLeft: SPACING.L,
        paddingRight: SPACING.L,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
      }}
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <div
            key={index}
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.XS,
              flex: FLEX.ONE,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <IconComponent size={ICON_SIZE.L} style={{ color: COLOR.PURPLE }} />
              <Text
                size="L"
                weight="XL"
                color="BLACK"
                style={{
                  fontSize: FONT_SIZE.L,
                  fontWeight: FONT_THICKNESS.XL,
                }}
              >
                {stat.value}
              </Text>
            </div>
            <Text
              size="S"
              weight="M"
              color="GREY_DARK"
              style={{
                fontSize: FONT_SIZE.S,
                textAlign: TEXT_ALIGN.CENTER,
              }}
            >
              {stat.label}
            </Text>
          </div>
        )
      })}
    </div>
  )
}

