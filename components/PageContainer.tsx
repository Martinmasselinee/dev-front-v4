import { ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { LAYOUT } from '../constants/layout'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/alignItems'
import { JUSTIFY_CONTENT } from '../constants/justifyContent'

interface PageContainerProps {
  children: ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div
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

