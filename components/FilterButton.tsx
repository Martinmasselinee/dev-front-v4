import { ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_WIDTH, BORDER_RADIUS } from '../constants/border'
import { CURSOR } from '../constants/interaction'
import { TRANSITION } from '../constants/transition'
import { OUTLINE } from '../constants/outline'
import { TEXT_ALIGN } from '../constants/text'
import { WIDTH } from '../constants/width'
import { MULTIPLIER } from '../constants/multiplier'
import { Text } from './Text'

interface FilterButtonProps {
  isSelected: boolean
  onClick: () => void
  children: ReactNode
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const FilterButton = ({ isSelected, onClick, children, onMouseEnter, onMouseLeave }: FilterButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        paddingLeft: SPACING.M,
        paddingRight: SPACING.M,
        paddingTop: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
        paddingBottom: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
        width: WIDTH.AUTO,
        backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
        border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
        borderRadius: BORDER_RADIUS.M,
        cursor: CURSOR.POINTER,
        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
        outline: OUTLINE.NONE,
        textAlign: TEXT_ALIGN.LEFT,
      }}
    >
      <Text
        size="M"
        weight={isSelected ? 'L' : 'M'}
        style={{
          color: isSelected ? COLOR.WHITE : COLOR.BLACK,
          transition: `color ${TRANSITION.FAST_EASE}`,
        }}
      >
        {children}
      </Text>
    </button>
  )
}

