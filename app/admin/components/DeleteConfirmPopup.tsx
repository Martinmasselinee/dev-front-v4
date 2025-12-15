'use client'

import { AlertTriangle } from 'lucide-react'
import { Popup } from '../../../components/Popup'
import { Button } from '../../../components/Button'
import { Text } from '../../../components/Text'
import { SPACING } from '../../../constants/spacing'
import { FLEX_DIRECTION } from '../../../constants/flex'
import { DISPLAY } from '../../../constants/display'
import { FLEX } from '../../../constants/flex'

interface DeleteConfirmPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

export const DeleteConfirmPopup = ({ isOpen, onClose, onConfirm, userName }: DeleteConfirmPopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmer la suppression"
      icon={AlertTriangle}
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
          Êtes-vous sûr de vouloir retirer {userName} de ce workspace ?
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
            variant="RED"
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

