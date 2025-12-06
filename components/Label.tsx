import { ReactNode } from 'react'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'

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
        display: 'block',
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

