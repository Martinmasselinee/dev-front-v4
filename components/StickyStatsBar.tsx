'use client'

import { ReactNode } from 'react'
import { Activity } from 'lucide-react'
import { TopBar } from './TopBar'
import { Text } from './Text'
import { Dot } from './Dot'
import { SPACING } from '../constants/spacing'
import { MULTIPLIER } from '../constants/multiplier'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/flex'
import { DIMENSION } from '../constants/dimension'
import { LAYOUT } from '../constants/layout'
import { WIDTH } from '../constants/width'

interface StatValue {
  label: string
  value: string | number
}

interface StickyStatsBarProps {
  stats: StatValue[]
  ownerDropdownOptions?: { value: string; label: string }[]
  ownerValue?: string
  onOwnerChange?: (value: string) => void
  icon?: React.ComponentType<any>
  rightButton?: ReactNode
}

export const StickyStatsBar = ({ 
  stats, 
  ownerDropdownOptions, 
  ownerValue, 
  onOwnerChange,
  icon,
  rightButton
}: StickyStatsBarProps) => {
  const IconComponent = icon || Activity
  const statsContent = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.S,
          }}
        >
          <Text size="M" weight="M" color="PURPLE">
            {stat.value} {stat.label}
          </Text>
          {index < stats.length - 1 && (
            <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
          )}
        </div>
      ))}
    </div>
  )

  const statusSidebarWidth = `calc(${LAYOUT.SIDEBAR_WIDTH} * 0.9)`
  const totalSidebarWidth = `calc(${LAYOUT.SIDEBAR_WIDTH} + ${statusSidebarWidth})`
  const customLeft = totalSidebarWidth
  const customWidth = `calc(${WIDTH.FULL} - ${totalSidebarWidth})`

  return (
    <TopBar
      icon={IconComponent}
      title=""
      variant="stickyPurple"
      additionalText={statsContent}
      secondDropdownOptions={ownerDropdownOptions}
      secondDropdownValue={ownerValue}
      onSecondDropdownChange={onOwnerChange}
      dropdownWidth={`calc(${DIMENSION.DROPDOWN_WIDTH} * 1.5)`}
      stickyTopOffset={`calc(${SPACING.XXXL} + ${SPACING.M} - 1px)`}
      customLeft={customLeft}
      customWidth={customWidth}
      rightElement={rightButton}
    />
  )
}

