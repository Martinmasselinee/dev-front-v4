'use client'

import { Shield } from 'lucide-react'
import { Popup } from '../../../components/Popup'
import { Button } from '../../../components/Button'
import { Text } from '../../../components/Text'
import { SPACING } from '../../../constants/spacing'
import { FLEX_DIRECTION } from '../../../constants/flex'
import { DISPLAY } from '../../../constants/display'
import { FLEX } from '../../../constants/flex'

interface RoleChangeConfirmPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
  roleChangeText: string
}

export const RoleChangeConfirmPopup = ({ isOpen, onClose, onConfirm, userName, roleChangeText }: RoleChangeConfirmPopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmer le changement de rôle"
      icon={Shield}
      size="small"
    >
      <div
        style={{
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          gap: SPACING.L,
        }}
      >
        <Text size="M" weight="M" color="BLACK">
          Êtes-vous sûr de vouloir {roleChangeText} pour {userName} ?
        </Text>

        <div
          style={{
            display: DISPLAY.FLEX,
            gap: SPACING.M,
          }}
        >
          <Button
            variant="WHITE"
            onClick={onClose}
            type="button"
            style={{ flex: FLEX.ONE }}
          >
            Annuler
          </Button>
          <Button
            variant="BLACK"
            onClick={onConfirm}
            type="button"
            style={{ flex: FLEX.ONE }}
          >
            Confirmer
          </Button>
        </div>
      </div>
    </Popup>
  )
}

