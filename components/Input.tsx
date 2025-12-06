'use client'

import { InputHTMLAttributes, ReactNode, useState, cloneElement, isValidElement } from 'react'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { SPACING } from '../constants/spacing'
import { INPUT_HEIGHT } from '../constants/inputHeight'
import { INPUT_PADDING } from '../constants/inputPadding'

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

  const iconColor = isFocused ? COLOR.PURPLE : COLOR.BLACK
  const borderColor = isFocused ? COLOR.PURPLE : COLOR.GREY.MEDIUM

  return (
    <div style={{ position: 'relative', width: '100%' }}>
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
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {isValidElement(icon)
            ? cloneElement(icon as React.ReactElement<any>, {
                color: iconColor,
                stroke: iconColor,
              })
            : icon}
        </div>
      )}
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
        style={{
          width: '100%',
          fontSize: FONT_SIZE.M,
          fontWeight: FONT_THICKNESS.M,
          color: COLOR.BLACK,
          backgroundColor: COLOR.WHITE,
          borderRadius: BORDER_RADIUS.M,
          height: INPUT_HEIGHT.MAIN,
          paddingTop: SPACING.M,
          paddingBottom: SPACING.M,
          paddingLeft: hasIcon ? INPUT_PADDING.HORIZONTAL.WITH_ICON : INPUT_PADDING.HORIZONTAL.WITHOUT_ICON,
          paddingRight: hasAction ? INPUT_PADDING.HORIZONTAL.WITH_ACTION : INPUT_PADDING.HORIZONTAL.WITHOUT_ICON,
          border: `1px solid ${borderColor}`,
          outline: 'none',
          transition: 'border-color 0.2s ease, color 0.2s ease',
          boxSizing: 'border-box',
          ...style,
        }}
      />
      {actionButton && (
        <div
          style={{
            position: 'absolute',
            right: SPACING.M,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            pointerEvents: 'auto',
            zIndex: 1,
          }}
        >
          {actionButton}
        </div>
      )}
    </div>
  )
}

