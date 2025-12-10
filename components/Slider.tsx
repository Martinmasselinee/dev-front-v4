'use client'

import RcSlider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { WIDTH } from '../constants/width'
import { OPACITY } from '../constants/opacity'
import { SLIDER } from '../constants/slider'
import { SHADOW } from '../constants/shadow'

interface SliderProps {
  value: number | string
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export const Slider = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  disabled = false 
}: SliderProps) => {
  const numValue = typeof value === 'string' ? (parseInt(value) || 0) : value

  return (
    <div
      style={{
        width: WIDTH.FULL,
        paddingTop: SPACING.NEGATIVE_ONE_PX,
        paddingBottom: SPACING.XS,
      }}
    >
      <RcSlider
        value={numValue}
        onChange={(val) => onChange(typeof val === 'number' ? val : val[0])}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        styles={{
          track: {
            backgroundColor: COLOR.BLACK,
            height: SLIDER.TRACK_HEIGHT,
          },
          rail: {
            backgroundColor: COLOR.GREY.MEDIUM,
            height: SLIDER.TRACK_HEIGHT,
          },
          handle: {
            borderColor: COLOR.BLACK,
            backgroundColor: COLOR.BLACK,
            width: SLIDER.HANDLE_SIZE,
            height: SLIDER.HANDLE_SIZE,
            marginTop: SLIDER.HANDLE_MARGIN_TOP,
            marginLeft: SLIDER.HANDLE_MARGIN_LEFT,
            borderWidth: SLIDER.HANDLE_BORDER_WIDTH,
            opacity: OPACITY.FULL,
            boxShadow: SHADOW.SLIDER_HANDLE,
          },
        }}
      />
    </div>
  )
}

