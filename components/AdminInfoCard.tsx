import { useState } from 'react'
import { X, Info } from 'lucide-react'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { ICON_SIZE } from '../constants/iconSize'
import { Z_INDEX } from '../constants/zIndex'
import { Text } from './Text'
import { Card } from './Card'
import { IconButton } from './IconButton'

export const AdminInfoCard = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card
      style={{
        backgroundColor: COLOR.WHITE,
        border: `1px solid ${COLOR.GREY.MEDIUM}`,
        marginTop: SPACING.L,
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          top: SPACING.S,
          right: SPACING.S,
          color: COLOR.GREY.DARK,
          zIndex: Z_INDEX.COMPONENT_CONTENT,
        }}
        icon={<X size={ICON_SIZE.M} />}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: SPACING.M,
        }}
      >
        <Info size={ICON_SIZE.M} style={{ color: COLOR.PURPLE, marginTop: SPACING.XS }} />
        <Text size="M" weight="M" color="BLACK" as="div">
          Vous serez automatiquement défini comme administrateur de ce workspace et pourrez inviter d'autres membres.
        </Text>
      </div>
    </Card>
  )
}

