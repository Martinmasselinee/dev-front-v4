import { ReactNode, AnchorHTMLAttributes } from 'react'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { COLOR } from '../constants/color'

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
    fontSize: FONT_SIZE.S,
    fontWeight: variant === 'bold' ? FONT_THICKNESS.L : FONT_THICKNESS.M,
    color: COLOR.PURPLE,
    textDecoration: 'none',
  }

  // Handle inline-flex items-center from className
  const isFlex = className.includes('inline-flex') || className.includes('items-center')
  if (isFlex) {
    baseStyle.display = 'inline-flex'
    baseStyle.alignItems = 'center'
  }

  return (
    <a
      {...props}
      className={className.replace(/inline-flex|items-center/g, '').trim()}
      style={{
        ...baseStyle,
        ...style,
      }}
    >
      {children}
    </a>
  )
}

