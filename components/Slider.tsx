'use client'

import RcSlider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { WIDTH } from '../constants/width'
import { OPACITY } from '../constants/opacity'

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
            height: '3px',
          },
          rail: {
            backgroundColor: COLOR.GREY.MEDIUM,
            height: '3px',
          },
          handle: {
            borderColor: COLOR.BLACK,
            backgroundColor: COLOR.BLACK,
            width: '12px',
            height: '12px',
            marginTop: '-4.5px',
            marginLeft: '6px',
            borderWidth: '2px',
            opacity: OPACITY.FULL,
            boxShadow: `0 2px 4px rgba(0, 0, 0, ${OPACITY.OVERLAY})`,
          },
        }}
      />
    </div>
  )
}

