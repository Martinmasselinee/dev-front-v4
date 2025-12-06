import { InputHTMLAttributes, ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
}

export const Checkbox = ({
  label,
  className = '',
  style,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        type="checkbox"
        {...props}
        style={{
          marginRight: SPACING.S,
          accentColor: COLOR.PURPLE,
          ...style,
        }}
      />
      {label && <span>{label}</span>}
    </label>
  )
}

