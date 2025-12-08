import { ReactNode, SelectHTMLAttributes, forwardRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { INPUT_HEIGHT } from '../constants/inputHeight'
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
import { LINE_HEIGHT } from '../constants/lineHeight'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasIcon = !!icon

    const paddingLeft = hasIcon
      ? INPUT_PADDING.HORIZONTAL.WITH_ICON
      : INPUT_PADDING.HORIZONTAL.WITHOUT_ICON

    const paddingRight = INPUT_PADDING.HORIZONTAL.WITH_ICON

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
              top: POSITION.CENTER,
              transform: TRANSFORM.CENTER_VERTICAL,
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

        {/* Dropdown Arrow */}
        <div
          style={{
            position: 'absolute',
            right: SPACING.M,
            top: POSITION.CENTER,
            transform: TRANSFORM.CENTER_VERTICAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFocused ? COLOR.PURPLE : COLOR.GREY.DARK,
            zIndex: Z_INDEX.COMPONENT_OVERLAY,
            pointerEvents: 'none',
            transition: `color ${TRANSITION.FAST_EASE}`,
          }}
        >
          <ChevronDown size={ICON_SIZE.M} />
        </div>

        <select
          ref={ref}
          {...props}
          style={{
            width: WIDTH.FULL,
            height: INPUT_HEIGHT.MAIN,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: FONT_SIZE.M,
            lineHeight: INPUT_HEIGHT.MAIN,
            color: COLOR.BLACK,
            backgroundColor: COLOR.WHITE,
            border: `1px solid ${COLOR.GREY.MEDIUM}`,
            borderRadius: BORDER_RADIUS.M,
            outline: 'none',
            transition: `border-color ${TRANSITION.FAST_EASE}`,
            appearance: 'none',
            cursor: 'pointer',
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
        >
          {props.children}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'

