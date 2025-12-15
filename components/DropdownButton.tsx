'use client'

import { SelectHTMLAttributes, forwardRef, useState, useEffect, useRef } from 'react'
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
import { DISPLAY, VISIBILITY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { POINTER_EVENTS, CURSOR } from '../constants/interaction'
import { OUTLINE, APPEARANCE } from '../constants/outline'
import { WIDTH } from '../constants/width'
import { DIMENSION } from '../constants/dimension'
import { OPACITY } from '../constants/opacity'
import { TEXT_OVERFLOW, WHITE_SPACE } from '../constants/text'
import { OVERFLOW } from '../constants/overflow'
import { extractPixelValue } from '../lib/dimensionUtils'

interface DropdownButtonProps extends SelectHTMLAttributes<HTMLSelectElement> {
  maxWidth?: string
}

export const DropdownButton = forwardRef<HTMLSelectElement, DropdownButtonProps>(
  ({ style, maxWidth, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [selectWidth, setSelectWidth] = useState<string>(DIMENSION.DROPDOWN_BUTTON_MIN_WIDTH)
    const measureRef = useRef<HTMLSpanElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)

    const paddingLeft = INPUT_PADDING.HORIZONTAL.WITHOUT_ICON
    const paddingRight = INPUT_PADDING.HORIZONTAL.WITH_ICON

    // Use the ref from props or our internal ref
    const actualRef = (ref as React.RefObject<HTMLSelectElement>) || selectRef

    useEffect(() => {
      const select = actualRef.current
      if (!select || !measureRef.current) return

      const selectedOption = select.options[select.selectedIndex]
      if (!selectedOption) return

      const selectedText = selectedOption.text
      measureRef.current.textContent = selectedText

      // Measure the text width
      const textWidth = measureRef.current.offsetWidth
      const arrowWidth = ICON_SIZE.M
      const paddingLeftValue = extractPixelValue(paddingLeft)
      const paddingRightValue = extractPixelValue(paddingRight)
      const spacingMValue = extractPixelValue(SPACING.M)
      const totalPadding = paddingLeftValue + paddingRightValue + spacingMValue + arrowWidth
      const calculatedWidth = textWidth + totalPadding

      // Apply max width if provided
      let maxWidthValue: number | undefined
      if (maxWidth) {
        maxWidthValue = extractPixelValue(maxWidth)
      }
      
      const minWidthValue = extractPixelValue(DIMENSION.DROPDOWN_BUTTON_MIN_WIDTH)
      const finalWidth = maxWidthValue && calculatedWidth > maxWidthValue 
        ? maxWidthValue 
        : Math.max(calculatedWidth, minWidthValue)

      setSelectWidth(`${finalWidth}px`)
    }, [props.value, props.children, maxWidth, paddingLeft, paddingRight])

    return (
      <div
        style={{
          position: POSITION_TYPE.RELATIVE,
          width: WIDTH.AUTO,
        }}
      >
        {/* Hidden span for measuring text width */}
        <span
          ref={measureRef}
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            visibility: VISIBILITY.HIDDEN,
            whiteSpace: WHITE_SPACE.NOWRAP,
            fontSize: FONT_SIZE.M,
            padding: SPACING.ZERO,
            margin: SPACING.ZERO,
            height: DIMENSION.AUTO,
            width: WIDTH.AUTO,
          }}
        />

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
          ref={actualRef}
          {...props}
          style={{
            width: selectWidth,
            minWidth: DIMENSION.DROPDOWN_BUTTON_MIN_WIDTH,
            maxWidth: maxWidth || DIMENSION.NONE,
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
            transition: `border-color ${TRANSITION.FAST_EASE}, width ${TRANSITION.FAST_EASE}`,
            appearance: APPEARANCE.NONE,
            cursor: props.disabled ? CURSOR.NOT_ALLOWED : CURSOR.POINTER,
            opacity: props.disabled ? OPACITY.DISABLED : OPACITY.FULL,
            overflow: OVERFLOW.HIDDEN,
            textOverflow: TEXT_OVERFLOW.ELLIPSIS,
            whiteSpace: WHITE_SPACE.NOWRAP,
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
