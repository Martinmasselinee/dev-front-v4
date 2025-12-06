import { ReactNode } from 'react'
import { LAYOUT } from '../constants/layout'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: LAYOUT.CONTAINER_MAX_WIDTH,
        paddingLeft: LAYOUT.CONTAINER_PADDING_X,
        paddingRight: LAYOUT.CONTAINER_PADDING_X,
      }}
    >
      {children}
    </div>
  )
}

