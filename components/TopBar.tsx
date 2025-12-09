'use client'

import { useState, ReactNode } from 'react'
import { LucideIcon, Search, RefreshCw } from 'lucide-react'
import { COLOR } from '../constants/color'
import { hexToRgba } from '../lib/colorUtils'
import { OPACITY } from '../constants/opacity'
import { SPACING } from '../constants/spacing'
import { Z_INDEX } from '../constants/zIndex'
import { POSITION } from '../constants/position'
import { WIDTH } from '../constants/width'
import { LAYOUT } from '../constants/layout'
import { POSITION_TYPE } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { BORDER, BORDER_WIDTH } from '../constants/border'
import { ICON_SIZE } from '../constants/iconSize'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { DIMENSION } from '../constants/dimension'
import { Heading } from './Heading'
import { Text } from './Text'
import { Input } from './Input'
import { IconButton } from './IconButton'
import { DropdownButton } from './DropdownButton'

interface TopBarProps {
  icon: LucideIcon
  title: string
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  variant?: 'default' | 'stickyPurple'
  additionalText?: string | ReactNode
  showRefresh?: boolean
  onRefresh?: () => void
  dropdownOptions?: { value: string; label: string }[]
  dropdownValue?: string
  onDropdownChange?: (value: string) => void
  secondDropdownOptions?: { value: string; label: string }[]
  secondDropdownValue?: string
  onSecondDropdownChange?: (value: string) => void
  hideBorder?: boolean
  stickyTopOffset?: string
  dropdownWidth?: string
}

export const TopBar = ({ icon: Icon, title, showSearch = false, searchValue, onSearchChange, searchPlaceholder = 'Rechercher...', variant = 'default', additionalText, showRefresh = false, onRefresh, dropdownOptions, dropdownValue, onDropdownChange, secondDropdownOptions, secondDropdownValue, onSecondDropdownChange, hideBorder = false, stickyTopOffset, dropdownWidth }: TopBarProps) => {
  const [localSearchValue, setLocalSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (onSearchChange) {
      onSearchChange(value)
    } else {
      setLocalSearchValue(value)
    }
  }

  const currentSearchValue = searchValue !== undefined ? searchValue : localSearchValue

  const backgroundColor = variant === 'stickyPurple' ? '#E8DEFF' : COLOR.WHITE
  const topPosition = variant === 'stickyPurple' 
    ? (stickyTopOffset || `calc(${SPACING.XXXL} + ${SPACING.M})`)
    : POSITION.ZERO
  const purpleBorderColor = variant === 'stickyPurple' 
    ? hexToRgba(COLOR.PURPLE, 0.25)
    : undefined
  const height = variant === 'stickyPurple'
    ? `calc((${SPACING.XXXL} + ${SPACING.M}) * 0.8)`
    : `calc(${SPACING.XXXL} + ${SPACING.M})`
  const iconSize = variant === 'stickyPurple' ? ICON_SIZE.M : ICON_SIZE.L
  const iconColor = variant === 'stickyPurple' ? COLOR.PURPLE : COLOR.BLACK
  const titleFontSize = variant === 'stickyPurple' ? FONT_SIZE.M : FONT_SIZE.XL
  const titleColor = variant === 'stickyPurple' ? COLOR.PURPLE : COLOR.BLACK

  return (
    <div
      style={{
        position: POSITION_TYPE.FIXED,
        top: topPosition,
        left: LAYOUT.SIDEBAR_WIDTH,
        right: POSITION.ZERO,
        width: `calc(${WIDTH.FULL} - ${LAYOUT.SIDEBAR_WIDTH})`,
        height: height,
        backgroundColor: backgroundColor,
        borderTop: variant === 'stickyPurple' && purpleBorderColor 
          ? `${BORDER_WIDTH.THIN} solid ${purpleBorderColor}` 
          : undefined,
        borderBottom: variant === 'stickyPurple' && purpleBorderColor
          ? `${BORDER_WIDTH.THIN} solid ${purpleBorderColor}`
          : hideBorder 
            ? BORDER.NONE 
            : `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
        zIndex: Z_INDEX.NAVBAR,
        paddingLeft: SPACING.L,
        paddingRight: SPACING.L,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
      }}
    >
      <div
        style={{
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          gap: SPACING.M,
        }}
      >
        <Icon size={iconSize} style={{ color: iconColor, flexShrink: 0 }} />
        {title && (
          <Heading
            level={1}
            style={{
              fontSize: titleFontSize,
              fontWeight: FONT_THICKNESS.XL,
              marginBottom: POSITION.ZERO,
              color: titleColor,
            }}
          >
            {title}
          </Heading>
        )}
        {additionalText && (
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              marginLeft: title ? SPACING.M : POSITION.ZERO,
            }}
          >
            {typeof additionalText === 'string' ? (
              <Text
                size="M"
                weight="M"
                color="PURPLE"
                style={{
                  fontSize: FONT_SIZE.M,
                }}
              >
                {additionalText}
              </Text>
            ) : (
              additionalText
            )}
          </div>
        )}
      </div>
      {(showRefresh || showSearch || dropdownOptions || secondDropdownOptions) && (
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.M,
          }}
        >
          {showSearch && (
            <div
              style={{
                width: DIMENSION.SEARCH_INPUT_WIDTH,
                flexShrink: 0,
              }}
            >
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={currentSearchValue}
                onChange={handleSearchChange}
                icon={<Search size={ICON_SIZE.M} />}
              />
            </div>
          )}
          {showRefresh && (
            <IconButton
              onClick={onRefresh || (() => {})}
              icon={<RefreshCw size={ICON_SIZE.M} />}
              style={{
                color: COLOR.BLACK,
              }}
            />
          )}
          {dropdownOptions && (
            <DropdownButton
              value={dropdownValue}
              onChange={(e) => onDropdownChange?.(e.target.value)}
              style={dropdownWidth ? { width: dropdownWidth, minWidth: dropdownWidth } : undefined}
            >
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </DropdownButton>
          )}
          {secondDropdownOptions && (
            <DropdownButton
              value={secondDropdownValue}
              onChange={(e) => onSecondDropdownChange?.(e.target.value)}
              style={dropdownWidth ? { width: dropdownWidth, minWidth: dropdownWidth } : undefined}
            >
              {secondDropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </DropdownButton>
          )}
        </div>
      )}
    </div>
  )
}

