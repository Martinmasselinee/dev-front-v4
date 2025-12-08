import { ReactNode, AnchorHTMLAttributes } from 'react'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { COLOR } from '../constants/color'
import { TEXT_DECORATION } from '../constants/text'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'default' | 'bold'
}

export const Link = ({
  children,
  variant = 'default',
  className = '',
  style,
  ...props
}: LinkProps) => {
  const baseStyle: React.CSSProperties = {
    fontSize: FONT_SIZE.M,
    fontWeight: variant === 'bold' ? FONT_THICKNESS.L : FONT_THICKNESS.M,
    color: COLOR.PURPLE,
    textDecoration: TEXT_DECORATION.NONE,
  }

  return (
    <a
      {...props}
      className={className}
      style={{
        ...baseStyle,
        ...style,
      }}
    >
      {children}
    </a>
  )
}

