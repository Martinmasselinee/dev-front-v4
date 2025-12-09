import { ReactNode, useEffect } from 'react'
import { X, FileText, LucideIcon } from 'lucide-react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { ICON_SIZE } from '../constants/iconSize'
import { POPUP } from '../constants/popup'
import { OPACITY } from '../constants/opacity'
import { SHADOW } from '../constants/shadow'
import { Z_INDEX } from '../constants/zIndex'
import { WIDTH } from '../constants/width'
import { POSITION, POSITION_TYPE } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX_DIRECTION, FLEX } from '../constants/flex'
import { OVERFLOW } from '../constants/overflow'
import { IconButton } from './IconButton'
import { Heading } from './Heading'
import { Text } from './Text'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  icon?: LucideIcon
  size?: 'default' | 'small'
}

export const Popup = ({ isOpen, onClose, title, children, icon: Icon = FileText, size = 'default' }: PopupProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: POSITION_TYPE.FIXED,
        inset: POSITION.ZERO,
        zIndex: Z_INDEX.POPUP,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.CENTER,
        padding: SPACING.L,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: POSITION_TYPE.ABSOLUTE,
          inset: POSITION.ZERO,
          backgroundColor: `rgba(0, 0, 0, ${OPACITY.OVERLAY})`,
        }}
      />
      <div
        style={{
          position: POSITION_TYPE.RELATIVE,
          backgroundColor: COLOR.WHITE,
          borderRadius: BORDER_RADIUS.M,
          width: WIDTH.FULL,
          maxWidth: size === 'small' ? POPUP.MAX_WIDTH_SMALL : POPUP.MAX_WIDTH,
          maxHeight: POPUP.MAX_HEIGHT,
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
            paddingTop: SPACING.M,
            paddingLeft: SPACING.L,
            paddingRight: SPACING.M,
            paddingBottom: SPACING.M,
            borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT}`,
          }}
        >
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              flex: FLEX.ONE,
            }}
          >
            <Icon
              size={ICON_SIZE.M}
              style={{
                color: COLOR.GREY.DARK,
                marginRight: SPACING.M,
              }}
            />
            <Heading
              level={1}
              style={{
                marginBottom: POSITION.ZERO,
                fontSize: FONT_SIZE.L,
              }}
            >
              {title}
            </Heading>
          </div>
          <IconButton
            onClick={onClose}
            icon={<X size={ICON_SIZE.M} />}
            style={{
              color: COLOR.GREY.DARK,
              marginLeft: SPACING.M,
            }}
          />
        </div>
        <div
          style={{
            padding: SPACING.L,
            overflowY: OVERFLOW.AUTO,
            flex: FLEX.ONE,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

