import { ReactNode } from 'react'
import { BUTTON_MAIN } from '../constants/buttonMain'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { lightenColor, darkenColor } from '../lib/colorUtils'

type ButtonVariant = 'BLACK' | 'PURPLE' | 'WHITE'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: ReactNode
}

export const Button = ({
  children,
  variant = 'BLACK',
  onClick,
  type = 'button',
  className = '',
  icon,
}: ButtonProps) => {
  const buttonStyle = BUTTON_MAIN[variant]
  const buttonHeight = '35px'
  const overlayHeight = '34px'
  const borderRadius = BORDER_RADIUS.M
  const overlayBorderRadius = '7px'
  const innerBorderRadius = '6px'

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
        className={`flex items-center justify-center relative ${className}`}
        style={{
          backgroundColor: buttonStyle.backgroundColor,
          color: buttonStyle.color,
          borderRadius: borderRadius,
          height: buttonHeight,
          border: variant === 'WHITE' ? `1px solid ${COLOR.GREY.MEDIUM}` : 'none',
          cursor: 'pointer',
          width: '100%',
          fontSize: FONT_SIZE.M,
          fontWeight: FONT_THICKNESS.L,
          transition: 'background-color 0.2s ease',
        }}
      >
      <div
        style={{
          position: 'absolute',
          inset: '1px',
          borderRadius: overlayBorderRadius,
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div
          className="button-overlay-inner"
          style={{
            position: 'absolute',
            inset: '1px',
            borderRadius: innerBorderRadius,
            background: buttonStyle.backgroundColor,
            transition: 'background-color 0.2s ease',
          }}
        />
      </div>
      <span
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
        {icon && (
          <span style={{ marginLeft: SPACING.S, display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}
      </span>
    </button>
    </>
  )
}
