import { ReactNode, FormHTMLAttributes } from 'react'
import { SPACING } from '../constants/spacing'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export const Form = ({ children, className = '', style, ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.L,
        ...style,
      }}
    >
      {children}
    </form>
  )
}

