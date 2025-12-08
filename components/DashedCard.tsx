import { ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { SPACING } from '../constants/spacing'
import { lightenColor } from '../lib/colorUtils'

interface DashedCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const DashedCard = ({ children, className = '', style }: DashedCardProps) => {
  const lightPurple = lightenColor(COLOR.PURPLE, 95)
  
  return (
    <div
      className={className}
      style={{
        padding: SPACING.L,
        backgroundColor: lightPurple,
        border: `1px dashed ${COLOR.PURPLE}`,
        borderRadius: BORDER_RADIUS.M,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

