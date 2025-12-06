import { ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { SPACING } from '../constants/spacing'

interface CardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Card = ({ children, className = '', style }: CardProps) => {
  return (
    <div
      className={className}
      style={{
        padding: SPACING.L,
        backgroundColor: COLOR.GREY.LIGHT,
        border: `1px solid ${COLOR.GREY.MEDIUM}`,
        borderRadius: BORDER_RADIUS.M,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

