import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { TRANSITION } from '../constants/transition'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { TEXT_ALIGN } from '../constants/text'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { CURSOR } from '../constants/interaction'
import { Text } from './Text'

type WorkspaceType = 'club-sportif' | 'athlete' | 'evenement-sportif' | 'media-sportif' | ''

interface WorkspaceTypeSelectorProps {
  value: WorkspaceType
  onChange: (value: WorkspaceType) => void
}

const workspaceTypes = [
  { value: 'club-sportif' as const, label: 'Club sportif', emoji: '⚽' },
  { value: 'athlete' as const, label: 'Athlète', emoji: '🏃' },
  { value: 'evenement-sportif' as const, label: 'Événement sportif', emoji: '🎯' },
  { value: 'media-sportif' as const, label: 'Média sportif', emoji: '📺' },
]

export const WorkspaceTypeSelector = ({ value, onChange }: WorkspaceTypeSelectorProps) => {
  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        gap: SPACING.M,
      }}
    >
      {workspaceTypes.map((type) => {
        const isSelected = value === type.value
        return (
          <div
            key={type.value}
            onClick={() => onChange(type.value)}
            style={{
              cursor: CURSOR.POINTER,
              flex: FLEX.ONE,
              padding: SPACING.M,
              backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
              border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
              borderRadius: BORDER_RADIUS.M,
              transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.CENTER,
              gap: SPACING.S,
            }}
          >
            <span
              style={{
                fontSize: FONT_SIZE.L,
              }}
            >
              {type.emoji}
            </span>
            <Text
              size="M"
              weight={isSelected ? 'L' : 'M'}
              style={{
                color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                transition: `color ${TRANSITION.FAST_EASE}`,
              }}
            >
              {type.label}
            </Text>
          </div>
        )
      })}
    </div>
  )
}

