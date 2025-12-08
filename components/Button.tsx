import { ReactNode } from 'react'
import { BUTTON_MAIN } from '../constants/buttonMain'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { BUTTON_HEIGHT } from '../constants/buttonHeight'
import { BUTTON_OVERLAY } from '../constants/buttonOverlay'
import { OPACITY } from '../constants/opacity'
import { Z_INDEX } from '../constants/zIndex'
import { BORDER } from '../constants/border'
import { WIDTH } from '../constants/width'
import { INSET } from '../constants/inset'
import { TRANSITION } from '../constants/transition'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/alignItems'
import { JUSTIFY_CONTENT } from '../constants/justifyContent'
import { POSITION_TYPE } from '../constants/positionType'
import { CURSOR } from '../constants/cursor'
import { POINTER_EVENTS } from '../constants/pointerEvents'
import { BORDER_WIDTH } from '../constants/borderWidth'
import { lightenColor, darkenColor } from '../lib/colorUtils'

type ButtonVariant = 'BLACK' | 'PURPLE' | 'WHITE'

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
      ? darkenColor(buttonStyle.backgroundColor, 10)
      : lightenColor(buttonStyle.backgroundColor, 10)

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
          opacity: disabled ? OPACITY.DISABLED : 1,
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
        {children}
        {icon && (
          <span style={{ marginLeft: SPACING.S, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER }}>
            {icon}
          </span>
        )}
      </span>
    </button>
    </>
  )
}
