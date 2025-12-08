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
import { POSITION_TYPE } from '../constants/positionType'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/alignItems'
import { JUSTIFY_CONTENT } from '../constants/justifyContent'
import { POINTER_EVENTS } from '../constants/pointerEvents'
import { OUTLINE } from '../constants/outline'
import { BORDER_WIDTH } from '../constants/borderWidth'

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
          position: POSITION_TYPE.RELATIVE,
          width: WIDTH.FULL,
        }}
      >
        {icon && (
          <div
            style={{
              position: POSITION_TYPE.ABSOLUTE,
              left: SPACING.M,
              top: SPACING.M,
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.CENTER,
              color: isFocused ? COLOR.PURPLE : COLOR.GREY.DARK,
              zIndex: Z_INDEX.COMPONENT_OVERLAY,
              pointerEvents: POINTER_EVENTS.NONE,
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
            border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
            borderRadius: BORDER_RADIUS.M,
            outline: OUTLINE.NONE,
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

