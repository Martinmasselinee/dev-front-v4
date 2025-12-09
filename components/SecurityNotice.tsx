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
import { GoogleIcon } from './GoogleIcon'

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

