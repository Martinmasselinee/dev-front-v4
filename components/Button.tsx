import { ReactNode } from 'react'
import { BUTTON_MAIN, BUTTON_HEIGHT, BUTTON_OVERLAY } from '../constants/button'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { OPACITY } from '../constants/opacity'
import { Z_INDEX } from '../constants/zIndex'
import { BORDER } from '../constants/border'
import { WIDTH } from '../constants/width'
import { INSET, POSITION_TYPE, TRANSFORM } from '../constants/position'
import { TRANSITION } from '../constants/transition'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { CURSOR, POINTER_EVENTS } from '../constants/interaction'
import { lightenColor, darkenColor } from '../lib/colorUtils'
import { MULTIPLIER } from '../constants/multiplier'

type ButtonVariant = 'BLACK' | 'PURPLE' | 'WHITE' | 'RED' | 'ORANGE'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: ReactNode
  style?: React.CSSProperties
  disabled?: boolean
}

export const Button = ({
  children,
  variant = 'BLACK',
  onClick,
  type = 'button',
  className = '',
  icon,
  style,
  disabled = false,
}: ButtonProps) => {
  const buttonStyle = BUTTON_MAIN[variant]
  const buttonHeight = BUTTON_HEIGHT.MAIN
  const borderRadius = BORDER_RADIUS.M
  const overlayBorderRadius = BUTTON_OVERLAY.BORDER_RADIUS
  const innerBorderRadius = BUTTON_OVERLAY.INNER_BORDER_RADIUS

  const hoverBackgroundColor =
    variant === 'WHITE'
      ? darkenColor(buttonStyle.backgroundColor, MULTIPLIER.COLOR_DARKEN_PERCENT)
      : lightenColor(buttonStyle.backgroundColor, MULTIPLIER.COLOR_LIGHTEN_PERCENT)

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          button[data-button-variant="${variant}"]:hover {
            background-color: ${hoverBackgroundColor} !important;
          }
          button[data-button-variant="${variant}"]:hover .button-overlay-inner {
            background-color: ${hoverBackgroundColor} !important;
          }
        `
      }} />
      <button
        data-button-variant={variant}
        type={type}
        onClick={onClick}
        className={className}
        disabled={disabled}
        style={{
          backgroundColor: buttonStyle.backgroundColor,
          color: buttonStyle.color,
          borderRadius: borderRadius,
          height: buttonHeight,
          border: variant === 'WHITE' ? `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}` : BORDER.NONE,
          cursor: disabled ? CURSOR.NOT_ALLOWED : CURSOR.POINTER,
          width: WIDTH.FULL,
          fontSize: FONT_SIZE.M,
          fontWeight: FONT_THICKNESS.L,
          transition: `background-color ${TRANSITION.FAST_EASE}`,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
          position: POSITION_TYPE.RELATIVE,
          opacity: disabled ? OPACITY.DISABLED : OPACITY.FULL,
          ...style,
        }}
      >
      <div
        style={{
          position: POSITION_TYPE.ABSOLUTE,
          inset: INSET.BUTTON_OVERLAY,
          borderRadius: overlayBorderRadius,
          background: `linear-gradient(to bottom, rgba(255, 255, 255, ${OPACITY.BUTTON_GRADIENT_START}), rgba(255, 255, 255, ${OPACITY.BUTTON_GRADIENT_END}))`,
          pointerEvents: POINTER_EVENTS.NONE,
          zIndex: Z_INDEX.COMPONENT_OVERLAY,
        }}
      >
        <div
          className="button-overlay-inner"
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            inset: INSET.BUTTON_OVERLAY,
            borderRadius: innerBorderRadius,
            background: buttonStyle.backgroundColor,
            transition: `background-color ${TRANSITION.FAST_EASE}`,
          }}
        />
      </div>
      <span
        style={{
          position: POSITION_TYPE.RELATIVE,
          zIndex: Z_INDEX.COMPONENT_CONTENT,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
        }}
      >
        {icon && (
          <span style={{ marginRight: SPACING.S, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER }}>
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
    </>
  )
}
