import { ReactNode, InputHTMLAttributes, forwardRef, useState } from 'react'
import { INPUT_HEIGHT } from '../constants/inputHeight'
import { INPUT_PADDING } from '../constants/inputPadding'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { FONT_SIZE } from '../constants/fontSize'
import { SPACING } from '../constants/spacing'
import { ICON_SIZE } from '../constants/iconSize'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  actionButton?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, actionButton, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasIcon = !!icon
    const hasActionButton = !!actionButton

    const paddingLeft = hasIcon
      ? INPUT_PADDING.HORIZONTAL.WITH_ICON
      : INPUT_PADDING.HORIZONTAL.WITHOUT_ICON

    const paddingRight = hasActionButton
      ? INPUT_PADDING.HORIZONTAL.WITH_ACTION
      : INPUT_PADDING.HORIZONTAL.WITHOUT_ICON

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: SPACING.M,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isFocused ? COLOR.PURPLE : COLOR.GREY.DARK,
              zIndex: 1,
              pointerEvents: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            {icon}
          </div>
        )}

        <input
          ref={ref}
          {...props}
          style={{
            width: '100%',
            height: INPUT_HEIGHT.MAIN,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            paddingTop: INPUT_PADDING.VERTICAL,
            paddingBottom: INPUT_PADDING.VERTICAL,
            fontSize: FONT_SIZE.M,
            color: COLOR.BLACK,
            backgroundColor: COLOR.WHITE,
            border: `1px solid ${COLOR.GREY.MEDIUM}`,
            borderRadius: BORDER_RADIUS.M,
            outline: 'none',
            transition: 'border-color 0.2s ease',
            ...style,
          }}
          onFocus={(e) => {
            setIsFocused(true)
            e.target.style.borderColor = COLOR.PURPLE
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            e.target.style.borderColor = COLOR.GREY.MEDIUM
            props.onBlur?.(e)
          }}
        />

        {actionButton && (
          <div
            style={{
              position: 'absolute',
              right: SPACING.S,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {actionButton}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

