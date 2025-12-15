import { ReactNode, HTMLAttributes } from 'react'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { SPACING } from '../constants/spacing'
import { MULTIPLIER } from '../constants/multiplier'
import { OPACITY } from '../constants/opacity'
import { CURSOR } from '../constants/interaction'
import { TRANSITION } from '../constants/transition'
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
  const veryLightGrey = isInputContainer ? lightenColor(COLOR.GREY.LIGHT, MULTIPLIER.COLOR_LIGHTEN_FORTY) : undefined
  
  const getBackgroundColor = () => {
    if (isDashed) return lightPurple
    if (isInputContainer) return veryLightGrey
    return COLOR.GREY.LIGHT
  }

  const getBorder = () => {
    if (isDashed) return `${BORDER_WIDTH.THIN} dashed ${COLOR.PURPLE}`
    if (isInputContainer) return `calc(${BORDER_WIDTH.THIN} + ${SPACING.XS} / 8) solid ${COLOR.PURPLE}`
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
  
  const outerStrokeSpacing = `calc(${SPACING.XS} / 2)`
  const outerStrokeThickness = isInputContainer 
    ? `calc(${BORDER_WIDTH.THIN} + ${SPACING.XS} / 8)`
    : undefined
  const lighterPurple = isInputContainer 
    ? lightenColor(COLOR.PURPLE, MULTIPLIER.COLOR_LIGHTEN_PERCENT)
    : undefined
  const lighterPurpleRgba50 = isInputContainer 
    ? hexToRgba(lighterPurple!, OPACITY.OVERLAY)
    : undefined
  
  const isDefault = variant === 'default'
  
  return (
    <>
      {isInputContainer && (
        <style dangerouslySetInnerHTML={{
          __html: `
            div[data-input-container]:focus-within {
              outline: ${outerStrokeThickness} solid ${lighterPurpleRgba50} !important;
              outline-offset: ${outerStrokeSpacing} !important;
            }
          `
        }} />
      )}
      {isDefault && (
        <style dangerouslySetInnerHTML={{
          __html: `
            div[data-card-default]:hover {
              border-color: ${COLOR.PURPLE} !important;
            }
          `
        }} />
      )}
      <div
        data-input-container={isInputContainer ? true : undefined}
        data-card-default={isDefault ? true : undefined}
        className={className}
        style={{
          padding: defaultPadding,
          backgroundColor: getBackgroundColor(),
          border: getBorder(),
          borderRadius: getBorderRadius(),
          animation: getAnimation(),
          transition: isDefault ? `border-color ${TRANSITION.FAST_EASE}` : undefined,
          cursor: isDefault && props.onClick ? CURSOR.POINTER : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

