'use client'

import { useState } from 'react'
import { Circle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { COLOR } from '../constants/color'
import { hexToRgba } from '../lib/colorUtils'
import { SPACING } from '../constants/spacing'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { BORDER_WIDTH, BORDER } from '../constants/border'
import { Z_INDEX } from '../constants/zIndex'
import { POSITION, POSITION_TYPE } from '../constants/position'
import { TRANSITION } from '../constants/transition'
import { LAYOUT } from '../constants/layout'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, FLEX } from '../constants/flex'
import { OVERFLOW } from '../constants/overflow'
import { CURSOR } from '../constants/interaction'
import { TEXT_TRANSFORM, TEXT_OVERFLOW, WHITE_SPACE, LETTER_SPACING } from '../constants/text'
import { BACKGROUND } from '../constants/background'
import { ICON_SIZE } from '../constants/iconSize'
import { Text } from './Text'

export interface StatusItem {
  label: string
  value: string
  icon: React.ComponentType<any>
}

interface StatusFilterSidebarProps {
  statusItems?: StatusItem[]
  defaultStatus?: string
  selectedStatus?: string
  onStatusChange?: (status: string) => void
}

const defaultStatusItems: StatusItem[] = [
  { label: 'Tous', value: 'all', icon: Circle },
  { label: 'Statut 1', value: 'status1', icon: CheckCircle },
  { label: 'Statut 2', value: 'status2', icon: XCircle },
  { label: 'Statut 3', value: 'status3', icon: AlertCircle },
]

export const StatusFilterSidebar = ({ statusItems = defaultStatusItems, defaultStatus = 'all', selectedStatus: controlledStatus, onStatusChange }: StatusFilterSidebarProps) => {
  const [internalStatus, setInternalStatus] = useState<string>(defaultStatus)
  const selectedStatus = controlledStatus !== undefined ? controlledStatus : internalStatus

  const handleStatusChange = (status: string) => {
    if (onStatusChange) {
      onStatusChange(status)
    } else {
      setInternalStatus(status)
    }
  }

  const isActive = (value: string) => selectedStatus === value

  return (
    <aside
      style={{
        position: POSITION_TYPE.FIXED,
        left: LAYOUT.SIDEBAR_WIDTH,
        top: `calc(${SPACING.XXXL} + ${SPACING.M})`,
        bottom: POSITION.ZERO,
        width: `calc(${LAYOUT.SIDEBAR_WIDTH} * 0.9)`,
        backgroundColor: COLOR.WHITE,
        borderTop: BORDER.NONE,
        borderRight: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
        zIndex: Z_INDEX.NAVBAR - 1,
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        overflowY: OVERFLOW.AUTO,
        paddingTop: SPACING.XL,
        paddingBottom: SPACING.XL,
        paddingLeft: POSITION.ZERO,
        paddingRight: POSITION.ZERO,
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: SPACING.L, paddingLeft: SPACING.L, paddingRight: SPACING.L }}>
        <Text
          size="S"
          weight="S"
          color="GREY_DARK"
          style={{
            textTransform: TEXT_TRANSFORM.UPPERCASE,
            letterSpacing: LETTER_SPACING.TIGHT,
            fontSize: FONT_SIZE.S,
          }}
        >
          Trier par statut
        </Text>
      </div>

      {/* Status Items */}
      <div>
        {statusItems.map((item) => {
          const active = isActive(item.value)
          const IconComponent = item.icon
          return (
            <div
              key={item.value}
              onClick={() => handleStatusChange(item.value)}
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
                paddingTop: SPACING.S,
                paddingBottom: SPACING.S,
                paddingLeft: SPACING.L,
                paddingRight: SPACING.L,
                marginBottom: POSITION.ZERO,
                backgroundColor: active ? hexToRgba(COLOR.PURPLE, 0.15) : BACKGROUND.TRANSPARENT,
                cursor: CURSOR.POINTER,
                transition: `background-color ${TRANSITION.FAST_EASE}`,
                position: POSITION_TYPE.RELATIVE,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = hexToRgba(COLOR.GREY.MEDIUM, 0.3)
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = BACKGROUND.TRANSPARENT
                }
              }}
            >
              {active && (
                <div
                  style={{
                    position: POSITION_TYPE.ABSOLUTE,
                    left: POSITION.ZERO,
                    top: POSITION.ZERO,
                    bottom: POSITION.ZERO,
                    width: BORDER_WIDTH.MEDIUM,
                    backgroundColor: COLOR.PURPLE,
                  }}
                />
              )}
              <IconComponent
                size={ICON_SIZE.S}
                style={{
                  color: active ? COLOR.PURPLE : COLOR.BLACK,
                  flexShrink: FLEX.ZERO,
                }}
              />
              <Text
                size="M"
                weight={active ? 'L' : 'M'}
                color={active ? 'PURPLE' : 'BLACK'}
                style={{
                  overflow: OVERFLOW.HIDDEN,
                  textOverflow: TEXT_OVERFLOW.ELLIPSIS,
                  whiteSpace: WHITE_SPACE.NOWRAP,
                  flex: FLEX.ONE,
                }}
              >
                {item.label}
              </Text>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

