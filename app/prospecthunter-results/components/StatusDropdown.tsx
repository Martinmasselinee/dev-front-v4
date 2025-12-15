'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { COLOR } from '../../../constants/color'
import { SPACING } from '../../../constants/spacing'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../constants/border'
import { ICON_SIZE } from '../../../constants/iconSize'
import { POSITION_TYPE, POSITION } from '../../../constants/position'
import { Z_INDEX } from '../../../constants/zIndex'
import { DISPLAY } from '../../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS } from '../../../constants/flex'
import { SHADOW } from '../../../constants/shadow'
import { OVERFLOW } from '../../../constants/overflow'
import { CURSOR } from '../../../constants/interaction'
import { TRANSITION } from '../../../constants/transition'
import { Text } from '../../../components/Text'

export interface StatusOption {
  value: string
  label: string
}

interface StatusDropdownProps {
  isOpen: boolean
  onClose: () => void
  options: StatusOption[]
  onSelect: (value: string) => void
  buttonRef: React.RefObject<HTMLButtonElement>
}

export const StatusDropdown = ({
  isOpen,
  onClose,
  options,
  onSelect,
  buttonRef,
}: StatusDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, buttonRef])

  if (!isOpen) return null

  const buttonRect = buttonRef.current?.getBoundingClientRect()
  if (!buttonRect) return null

  return (
    <>
      <div
        style={{
          position: POSITION_TYPE.FIXED,
          top: POSITION.ZERO,
          left: POSITION.ZERO,
          right: POSITION.ZERO,
          bottom: POSITION.ZERO,
          zIndex: Z_INDEX.POPUP_MINUS_ONE,
        }}
        onClick={onClose}
      />
      <div
        ref={dropdownRef}
        style={{
          position: POSITION_TYPE.ABSOLUTE,
          top: `calc(${buttonRect.height}px + ${SPACING.XS})`,
          left: POSITION.ZERO,
          right: POSITION.ZERO,
          backgroundColor: COLOR.WHITE,
          border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
          borderRadius: BORDER_RADIUS.M,
          boxShadow: SHADOW.POPUP,
          zIndex: Z_INDEX.POPUP,
          overflow: OVERFLOW.HIDDEN,
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
        }}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              onSelect(option.value)
              onClose()
            }}
            style={{
              paddingTop: SPACING.S,
              paddingBottom: SPACING.S,
              paddingLeft: SPACING.M,
              paddingRight: SPACING.M,
              cursor: CURSOR.POINTER,
              transition: `background-color ${TRANSITION.FAST_EASE}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLOR.GREY.LIGHT
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLOR.WHITE
            }}
          >
            <Text size="M" weight="M" color="BLACK">
              {option.label}
            </Text>
          </div>
        ))}
      </div>
    </>
  )
}

