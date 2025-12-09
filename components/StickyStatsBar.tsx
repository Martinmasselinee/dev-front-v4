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
  contacteSubStatusOptions?: { value: string; label: string }[]
  contacteSubStatusValue?: string
  onContacteSubStatusChange?: (value: string) => void
  activationSubStatusOptions?: { value: string; label: string }[]
  activationSubStatusValue?: string
  onActivationSubStatusChange?: (value: string) => void
  meetingsSubStatusOptions?: { value: string; label: string }[]
  meetingsSubStatusValue?: string
  onMeetingsSubStatusChange?: (value: string) => void
  contratsSubStatusOptions?: { value: string; label: string }[]
  contratsSubStatusValue?: string
  onContratsSubStatusChange?: (value: string) => void
  selectedStatus?: string
}

export const StickyStatsBar = ({ 
  stats, 
  ownerDropdownOptions, 
  ownerValue, 
  onOwnerChange,
  icon,
  rightButton,
  contacteSubStatusOptions,
  contacteSubStatusValue,
  onContacteSubStatusChange,
  activationSubStatusOptions,
  activationSubStatusValue,
  onActivationSubStatusChange,
  meetingsSubStatusOptions,
  meetingsSubStatusValue,
  onMeetingsSubStatusChange,
  contratsSubStatusOptions,
  contratsSubStatusValue,
  onContratsSubStatusChange,
  selectedStatus
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

  const statusSidebarWidth = `calc(${LAYOUT.SIDEBAR_WIDTH} * ${MULTIPLIER.SIDEBAR_WIDTH_NINETY})`
  const totalSidebarWidth = `calc(${LAYOUT.SIDEBAR_WIDTH} + ${statusSidebarWidth})`
  const customLeft = totalSidebarWidth
  const customWidth = `calc(${WIDTH.FULL} - ${totalSidebarWidth})`

  const showContacteSubStatus = selectedStatus === 'contacte' && contacteSubStatusOptions && contacteSubStatusOptions.length > 0
  const showActivationSubStatus = selectedStatus === 'activation' && activationSubStatusOptions && activationSubStatusOptions.length > 0
  const showMeetingsSubStatus = selectedStatus === 'meetings' && meetingsSubStatusOptions && meetingsSubStatusOptions.length > 0
  const showContratsSubStatus = selectedStatus === 'contrats' && contratsSubStatusOptions && contratsSubStatusOptions.length > 0

  const firstDropdownOptions = showContacteSubStatus 
    ? contacteSubStatusOptions 
    : showActivationSubStatus 
    ? activationSubStatusOptions 
    : showMeetingsSubStatus 
    ? meetingsSubStatusOptions 
    : showContratsSubStatus
    ? contratsSubStatusOptions
    : undefined

  const firstDropdownValue = showContacteSubStatus 
    ? contacteSubStatusValue 
    : showActivationSubStatus 
    ? activationSubStatusValue 
    : showMeetingsSubStatus 
    ? meetingsSubStatusValue 
    : showContratsSubStatus
    ? contratsSubStatusValue
    : undefined

  const onFirstDropdownChange = showContacteSubStatus 
    ? onContacteSubStatusChange 
    : showActivationSubStatus 
    ? onActivationSubStatusChange 
    : showMeetingsSubStatus 
    ? onMeetingsSubStatusChange 
    : showContratsSubStatus
    ? onContratsSubStatusChange
    : undefined

  return (
    <TopBar
      icon={IconComponent}
      title=""
      variant="stickyPurple"
      additionalText={statsContent}
      dropdownOptions={firstDropdownOptions}
      dropdownValue={firstDropdownValue}
      onDropdownChange={onFirstDropdownChange}
      secondDropdownOptions={ownerDropdownOptions}
      secondDropdownValue={ownerValue}
      onSecondDropdownChange={onOwnerChange}
      dropdownWidth={`calc(${DIMENSION.DROPDOWN_WIDTH} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE})`}
      stickyTopOffset={`calc(${SPACING.XXXL} + ${SPACING.M} + ${SPACING.NEGATIVE_ONE_PX})`}
      customLeft={customLeft}
      customWidth={customWidth}
      rightElement={rightButton}
    />
  )
}

