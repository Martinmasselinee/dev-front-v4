import { ReactNode } from 'react'

interface FormGroupProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const FormGroup = ({ children, className = '', style }: FormGroupProps) => {
  return <div className={className} style={style}>{children}</div>
}

