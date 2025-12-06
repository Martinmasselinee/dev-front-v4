import { InputHTMLAttributes, ReactNode, useState } from 'react'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { SPACING } from '../constants/spacing'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  actionButton?: ReactNode
}

export const Input = ({
  icon,
  actionButton,
  className = '',
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasIcon = !!icon
  const hasAction = !!actionButton

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className="relative">
      {icon && (
        <div
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          style={{ color: COLOR.BLACK }}
        >
          {icon}
        </div>
      )}
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full ${hasIcon ? 'pl-10' : 'pl-4'} ${
          hasAction ? 'pr-12' : 'pr-4'
        } border ${className}`}
        style={{
          fontSize: FONT_SIZE.M,
          fontWeight: FONT_THICKNESS.M,
          color: COLOR.BLACK,
          backgroundColor: COLOR.WHITE,
          borderRadius: BORDER_RADIUS.M,
          maxHeight: '40px',
          height: '40px',
          paddingTop: SPACING.M,
          paddingBottom: SPACING.M,
          outline: 'none',
          ...style,
          borderColor: isFocused ? COLOR.PURPLE : COLOR.GREY.MEDIUM,
        }}
      />
      {actionButton && (
        <div
          className="absolute"
          style={{
            right: SPACING.M,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            pointerEvents: 'auto',
          }}
        >
          {actionButton}
        </div>
      )}
    </div>
  )
}

