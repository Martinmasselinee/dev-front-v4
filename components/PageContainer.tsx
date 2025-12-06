import { ReactNode } from 'react'
import { COLOR } from '../constants/color'
import { LAYOUT } from '../constants/layout'

interface PageContainerProps {
  children: ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
      }}
    >
      {children}
    </div>
  )
}

