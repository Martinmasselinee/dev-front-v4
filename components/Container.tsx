import { ReactNode } from 'react'
import { LAYOUT } from '../constants/layout'
import { WIDTH } from '../constants/width'
import { SPACING } from '../constants/spacing'
import { TEXT_ALIGN } from '../constants/text'
import { DIMENSION } from '../constants/dimension'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { COLOR } from '../constants/color'

interface ContainerProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'page' | 'title'
}

export const Container = ({ children, className = '', variant = 'default' }: ContainerProps) => {
  if (variant === 'page') {
    return (
      <div
        className={className}
        style={{
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
          minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        }}
      >
        {children}
      </div>
    )
  }

  if (variant === 'title') {
    return (
      <div
        className={className}
        style={{
          width: WIDTH.FULL,
          paddingLeft: SPACING.XL,
          paddingRight: SPACING.XL,
          marginBottom: SPACING.XXL,
          display: DISPLAY.FLEX,
          justifyContent: JUSTIFY_CONTENT.CENTER,
          alignItems: ALIGN_ITEMS.CENTER,
        }}
      >
        <div
          style={{
            width: WIDTH.FULL,
            maxWidth: DIMENSION.TITLE_CONTAINER_MAX_WIDTH,
            textAlign: TEXT_ALIGN.CENTER,
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        width: WIDTH.FULL,
        maxWidth: LAYOUT.CONTAINER_MAX_WIDTH,
        paddingLeft: LAYOUT.CONTAINER_PADDING_X,
        paddingRight: LAYOUT.CONTAINER_PADDING_X,
      }}
    >
      {children}
    </div>
  )
}

