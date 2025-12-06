import { ReactNode } from 'react'

interface FormGroupProps {
  children: ReactNode
  className?: string
}

export const FormGroup = ({ children, className = '' }: FormGroupProps) => {
  return <div className={className}>{children}</div>
}

