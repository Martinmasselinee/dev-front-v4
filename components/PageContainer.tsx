import { ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { LAYOUT } from '../constants/layout'

interface PageContainerProps {
  children: ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
      }}
    >
      {children}
    </div>
  )
}

