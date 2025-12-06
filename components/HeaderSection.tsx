import { ReactNode, CSSProperties } from 'react'
import { SPACING } from '../constants/spacing'
import { TEXT_ALIGN } from '../constants/textAlign'

interface HeaderSectionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export const HeaderSection = ({
  children,
  className = '',
  style,
}: HeaderSectionProps) => {
  return (
    <div
      className={className}
      style={{
        marginBottom: SPACING.XXL,
        textAlign: TEXT_ALIGN.CENTER,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

