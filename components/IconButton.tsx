import { ReactNode, ButtonHTMLAttributes } from 'react'
import { COLOR } from '../constants/color'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
}

export const IconButton = ({
  icon,
  className = '',
  style,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={className}
      type="button"
      style={{
        color: COLOR.GREY.MEDIUM,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {icon}
    </button>
  )
}

