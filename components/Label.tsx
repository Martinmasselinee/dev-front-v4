import { ReactNode } from 'react'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'

interface LabelProps {
  htmlFor: string
  children: ReactNode
  className?: string
}

export const Label = ({ htmlFor, children, className = '' }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={className}
      style={{
        display: DISPLAY.BLOCK,
        marginBottom: SPACING.S,
        fontSize: FONT_SIZE.M,
        fontWeight: FONT_THICKNESS.M,
        color: COLOR.GREY.MEDIUM,
      }}
    >
      {children}
    </label>
  )
}

