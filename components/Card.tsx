import { ReactNode, HTMLAttributes } from 'react'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { SPACING } from '../constants/spacing'
import { MULTIPLIER } from '../constants/multiplier'
import { OPACITY } from '../constants/opacity'
import { TRANSITION_DURATION } from '../constants/transition'
import { hexToRgba, lightenColor } from '../lib/colorUtils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: 'default' | 'dashed' | 'inputContainer'
}

export const Card = ({ children, className = '', style, variant = 'default', ...props }: CardProps) => {
  const isDashed = variant === 'dashed'
  const isInputContainer = variant === 'inputContainer'
  const lightPurple = isDashed ? lightenColor(COLOR.PURPLE, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE) : undefined
  
  const getBackgroundColor = () => {
    if (isDashed) return lightPurple
    if (isInputContainer) return COLOR.WHITE
    return COLOR.GREY.LIGHT
  }

  const getBorder = () => {
    if (isDashed) return `${BORDER_WIDTH.THIN} dashed ${COLOR.PURPLE}`
    if (isInputContainer) return `${BORDER_WIDTH.MEDIUM} solid ${COLOR.GREY.MEDIUM}`
    return `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`
  }

  const getAnimation = () => {
    return undefined
  }

  const getBorderRadius = () => {
    if (isInputContainer) return BORDER_RADIUS.L
    return BORDER_RADIUS.M
  }

  const defaultPadding = isInputContainer ? undefined : SPACING.L
  
  return (
    <div
      className={className}
      style={{
        padding: defaultPadding,
        backgroundColor: getBackgroundColor(),
        border: getBorder(),
        borderRadius: getBorderRadius(),
        animation: getAnimation(),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

