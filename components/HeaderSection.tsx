import { ReactNode } from 'react'
import { SPACING } from '../constants/spacing'

interface HeaderSectionProps {
  children: ReactNode
  className?: string
}

export const HeaderSection = ({
  children,
  className = '',
}: HeaderSectionProps) => {
  return (
    <div
      className={`text-center ${className}`}
      style={{
        marginBottom: SPACING.XXL,
      }}
    >
      {children}
    </div>
  )
}

