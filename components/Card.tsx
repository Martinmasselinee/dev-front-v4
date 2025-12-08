import { ReactNode, HTMLAttributes } from 'react'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { SPACING } from '../constants/spacing'
import { lightenColor } from '../lib/colorUtils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: 'default' | 'dashed'
}

export const Card = ({ children, className = '', style, variant = 'default', ...props }: CardProps) => {
  const isDashed = variant === 'dashed'
  const lightPurple = isDashed ? lightenColor(COLOR.PURPLE, 95) : undefined
  
  return (
    <div
      className={className}
      style={{
        padding: SPACING.L,
        backgroundColor: isDashed ? lightPurple : COLOR.GREY.LIGHT,
        border: isDashed 
          ? `${BORDER_WIDTH.THIN} dashed ${COLOR.PURPLE}`
          : `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
        borderRadius: BORDER_RADIUS.M,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

