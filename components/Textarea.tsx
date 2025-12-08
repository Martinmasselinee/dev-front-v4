import { ReactNode, TextareaHTMLAttributes, forwardRef, useState } from 'react'
import { INPUT_PADDING } from '../constants/inputPadding'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { FONT_SIZE } from '../constants/fontSize'
import { SPACING } from '../constants/spacing'
import { ICON_SIZE } from '../constants/iconSize'
import { WIDTH } from '../constants/width'
import { POSITION } from '../constants/position'
import { TRANSFORM } from '../constants/transform'
import { Z_INDEX } from '../constants/zIndex'
import { TRANSITION } from '../constants/transition'
import { DIMENSION } from '../constants/dimension'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ReactNode
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ icon, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasIcon = !!icon

    const paddingLeft = hasIcon
      ? INPUT_PADDING.HORIZONTAL.WITH_ICON
      : INPUT_PADDING.HORIZONTAL.WITHOUT_ICON

    return (
      <div
        style={{
          position: 'relative',
          width: WIDTH.FULL,
        }}
      >
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: SPACING.M,
              top: SPACING.M,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isFocused ? COLOR.PURPLE : COLOR.GREY.DARK,
              zIndex: Z_INDEX.COMPONENT_OVERLAY,
              pointerEvents: 'none',
              transition: `color ${TRANSITION.FAST_EASE}`,
            }}
          >
            {icon}
          </div>
        )}

        <textarea
          ref={ref}
          {...props}
          style={{
            width: WIDTH.FULL,
            minHeight: DIMENSION.TEXTAREA_MIN_HEIGHT,
            paddingLeft: paddingLeft,
            paddingRight: INPUT_PADDING.HORIZONTAL.WITHOUT_ICON,
            paddingTop: INPUT_PADDING.VERTICAL,
            paddingBottom: INPUT_PADDING.VERTICAL,
            fontSize: FONT_SIZE.M,
            color: COLOR.BLACK,
            backgroundColor: COLOR.WHITE,
            border: `1px solid ${COLOR.GREY.MEDIUM}`,
            borderRadius: BORDER_RADIUS.M,
            outline: 'none',
            transition: `border-color ${TRANSITION.FAST_EASE}`,
            resize: 'vertical',
            fontFamily: 'inherit',
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
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

