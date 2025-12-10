'use client'

import { SelectHTMLAttributes, forwardRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { INPUT_HEIGHT, INPUT_PADDING } from '../constants/input'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { FONT_SIZE } from '../constants/font'
import { SPACING } from '../constants/spacing'
import { ICON_SIZE } from '../constants/iconSize'
import { POSITION, POSITION_TYPE, TRANSFORM } from '../constants/position'
import { Z_INDEX } from '../constants/zIndex'
import { TRANSITION } from '../constants/transition'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { POINTER_EVENTS, CURSOR } from '../constants/interaction'
import { OUTLINE } from '../constants/outline'
import { WIDTH } from '../constants/width'
import { DIMENSION } from '../constants/dimension'
import { OPACITY } from '../constants/opacity'

interface DropdownButtonProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const DropdownButton = forwardRef<HTMLSelectElement, DropdownButtonProps>(
  ({ style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const paddingLeft = INPUT_PADDING.HORIZONTAL.WITHOUT_ICON
    const paddingRight = INPUT_PADDING.HORIZONTAL.WITH_ICON

    return (
      <div
        style={{
          position: POSITION_TYPE.RELATIVE,
          width: WIDTH.AUTO,
        }}
      >
        {/* Dropdown Arrow */}
        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            right: SPACING.M,
            top: POSITION.CENTER,
            transform: TRANSFORM.CENTER_VERTICAL,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            color: isFocused ? COLOR.PURPLE : COLOR.GREY.DARK,
            zIndex: Z_INDEX.COMPONENT_OVERLAY,
            pointerEvents: POINTER_EVENTS.NONE,
            transition: `color ${TRANSITION.FAST_EASE}`,
          }}
        >
          <ChevronDown size={ICON_SIZE.M} />
        </div>

        <select
          ref={ref}
          {...props}
          style={{
            width: WIDTH.AUTO,
            minWidth: DIMENSION.DROPDOWN_BUTTON_MIN_WIDTH,
            height: INPUT_HEIGHT.SMALL,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            paddingTop: SPACING.ZERO,
            paddingBottom: SPACING.ZERO,
            fontSize: FONT_SIZE.M,
            lineHeight: INPUT_HEIGHT.SMALL,
            color: COLOR.BLACK,
            backgroundColor: COLOR.WHITE,
            border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
            borderRadius: BORDER_RADIUS.M,
            outline: OUTLINE.NONE,
            transition: `border-color ${TRANSITION.FAST_EASE}`,
            appearance: 'none',
            cursor: props.disabled ? CURSOR.NOT_ALLOWED : CURSOR.POINTER,
            opacity: props.disabled ? OPACITY.DISABLED : OPACITY.FULL,
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

DropdownButton.displayName = 'DropdownButton'

