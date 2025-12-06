import { ReactNode, CSSProperties } from 'react'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { LINE_HEIGHT } from '../constants/lineHeight'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  style?: CSSProperties
}

export const Heading = ({
  children,
  level = 1,
  className = '',
  style,
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const getFontSize = () => {
    if (level === 1) return FONT_SIZE.XXL
    if (level === 2) return FONT_SIZE.M
    return FONT_SIZE.L
  }

  const getLineHeight = () => {
    if (level === 1) return LINE_HEIGHT.TIGHT
    return LINE_HEIGHT.NORMAL
  }

  return (
    <Tag
      className={className}
      style={{
        fontSize: getFontSize(),
        fontWeight: FONT_THICKNESS.XL,
        color: COLOR.BLACK,
        marginBottom: SPACING.M,
        lineHeight: getLineHeight(),
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

