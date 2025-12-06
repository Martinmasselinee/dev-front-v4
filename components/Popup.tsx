import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { ICON_SIZE } from '../constants/iconSize'
import { POPUP } from '../constants/popup'
import { OPACITY } from '../constants/opacity'
import { SHADOW } from '../constants/shadow'
import { Z_INDEX } from '../constants/zIndex'
import { IconButton } from './IconButton'
import { Heading } from './Heading'
import { Text } from './Text'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const Popup = ({ isOpen, onClose, title, children }: PopupProps) => {
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
        position: 'fixed',
        inset: 0,
        zIndex: Z_INDEX.POPUP,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.L,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(0, 0, 0, ${OPACITY.OVERLAY})`,
        }}
      />
      <div
        style={{
          position: 'relative',
          backgroundColor: COLOR.WHITE,
          borderRadius: BORDER_RADIUS.M,
          width: '100%',
          maxWidth: POPUP.MAX_WIDTH,
          maxHeight: POPUP.MAX_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: SPACING.L,
            paddingLeft: SPACING.L,
            paddingRight: SPACING.L,
            paddingBottom: SPACING.S,
            borderBottom: `1px solid ${COLOR.GREY.LIGHT}`,
          }}
        >
          <Heading level={1}>{title}</Heading>
          <IconButton
            onClick={onClose}
            icon={<X size={ICON_SIZE.M} />}
            style={{
              color: COLOR.GREY.DARK,
            }}
          />
        </div>
        <div
          style={{
            padding: SPACING.L,
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

