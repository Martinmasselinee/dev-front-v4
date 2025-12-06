import { ReactNode } from 'react'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export const Heading = ({
  children,
  level = 1,
  className = '',
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      className={className}
      style={{
        fontSize: FONT_SIZE.XL,
        fontWeight: FONT_THICKNESS.XL,
        color: COLOR.BLACK,
        marginBottom: SPACING.S,
      }}
    >
      {children}
    </Tag>
  )
}

