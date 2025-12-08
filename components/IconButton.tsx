import { ReactNode, ButtonHTMLAttributes } from 'react'
import { COLOR } from '../constants/color'
import { BORDER } from '../constants/border'
import { BACKGROUND } from '../constants/background'
import { CURSOR } from '../constants/interaction'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { POSITION } from '../constants/position'

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
        background: BACKGROUND.NONE,
        border: BORDER.NONE,
        cursor: CURSOR.POINTER,
        padding: POSITION.ZERO,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.CENTER,
        ...style,
      }}
    >
      {icon}
    </button>
  )
}

