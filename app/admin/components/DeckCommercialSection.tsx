'use client'

import { Presentation } from 'lucide-react'
import { FileUpload } from '../../../components/FileUpload'
import { Text } from '../../../components/Text'
import { SPACING } from '../../../constants/spacing'
import { FLEX_DIRECTION, ALIGN_ITEMS, FLEX } from '../../../constants/flex'
import { DISPLAY } from '../../../constants/display'
import { COLOR } from '../../../constants/color'
import { ICON_SIZE } from '../../../constants/iconSize'

interface DeckCommercialSectionProps {
  onFileSelect: (file: File | null) => void
}

export const DeckCommercialSection = ({ onFileSelect }: DeckCommercialSectionProps) => {
  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        gap: SPACING.M,
      }}
    >
      <div
        style={{
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          gap: SPACING.S,
        }}
      >
        <Presentation size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
        <Text size="L" weight="XL" color="BLACK">
          Deck commercial
        </Text>
      </div>
      <FileUpload onFileSelect={onFileSelect} />
    </div>
  )
}

