import { ReactNode } from 'react'
import { WIDTH } from '../constants/width'
import { SPACING } from '../constants/spacing'
import { TEXT_ALIGN } from '../constants/textAlign'

interface TitleContainerProps {
  children: ReactNode
  className?: string
}

export const TitleContainer = ({ children, className = '' }: TitleContainerProps) => {
  return (
    <div
      className={className}
      style={{
        width: WIDTH.FULL,
        paddingLeft: SPACING.XL,
        paddingRight: SPACING.XL,
        marginBottom: SPACING.XXL,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: WIDTH.FULL,
          maxWidth: '1000px',
          textAlign: TEXT_ALIGN.CENTER,
        }}
      >
        {children}
      </div>
    </div>
  )
}

