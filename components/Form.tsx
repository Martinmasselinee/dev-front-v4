import { ReactNode, FormHTMLAttributes } from 'react'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION } from '../constants/flex'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export const Form = ({ children, className = '', style, ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={className}
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        gap: SPACING.M,
        ...style,
      }}
    >
      {children}
    </form>
  )
}

