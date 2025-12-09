import { ReactNode } from 'react'
import { FONT_SIZE, FONT_THICKNESS } from '../constants/font'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'

interface TextProps {
  children: ReactNode
  size?: 'XL' | 'L' | 'M' | 'S'
  weight?: 'XL' | 'L' | 'M' | 'S'
  color?: keyof typeof COLOR | 'GREY_LIGHT' | 'GREY_MEDIUM' | 'GREY_DARK'
  as?: 'p' | 'span' | 'div'
  className?: string
  style?: React.CSSProperties
}

export const Text = ({
  children,
  size = 'M',
  weight = 'M',
  color = 'BLACK',
  as = 'p',
  className = '',
  style,
}: TextProps) => {
  const getColor = () => {
    if (color.startsWith('GREY_')) {
      const greyKey = color.replace('GREY_', '') as 'LIGHT' | 'MEDIUM' | 'DARK'
      return COLOR.GREY[greyKey]
    }
    return COLOR[color as keyof typeof COLOR]
  }

  const Tag = as

  return (
    <Tag
      className={className}
      style={{
        fontSize: FONT_SIZE[size],
        fontWeight: FONT_THICKNESS[weight],
        color: getColor(),
        margin: SPACING.ZERO,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

