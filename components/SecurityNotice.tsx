import { useState } from 'react'
import { X } from 'lucide-react'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { ICON_SIZE } from '../constants/iconSize'
import { Z_INDEX } from '../constants/zIndex'
import { POSITION, POSITION_TYPE } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX_DIRECTION, FLEX } from '../constants/flex'
import { Text } from './Text'
import { Card } from './Card'
import { IconButton } from './IconButton'

const GoogleIcon = ({ size }: { size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export const SecurityNotice = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card
      style={{
        backgroundColor: COLOR.WHITE,
        marginBottom: SPACING.L,
        position: POSITION_TYPE.RELATIVE,
      }}
    >
      <IconButton
        onClick={() => setIsVisible(false)}
        style={{
          position: POSITION_TYPE.ABSOLUTE,
          top: SPACING.S,
          right: SPACING.S,
          color: COLOR.GREY.DARK,
          zIndex: Z_INDEX.COMPONENT_CONTENT,
        }}
        icon={<X size={ICON_SIZE.M} />}
      />
      <div
        style={{
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          gap: SPACING.M,
        }}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            flexShrink: FLEX.ZERO,
          }}
        >
          <GoogleIcon size={ICON_SIZE.XL} />
        </div>
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.XS,
          }}
        >
          <Text
            size="M"
            weight="XL"
            color="BLACK"
            as="div"
          >
            Connexion sécurisée
          </Text>
          <Text
            size="S"
            color="GREY_DARK"
            as="div"
          >
            Vos données sont protégées par Google Identity Platform avec un chiffrement de bout en bout.
          </Text>
        </div>
      </div>
    </Card>
  )
}

