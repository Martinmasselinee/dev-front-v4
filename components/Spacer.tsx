import { SPACING } from '../constants/spacing'

interface SpacerProps {
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  className?: string
}

export const Spacer = ({ size = 'M', className = '' }: SpacerProps) => {
  return (
    <div
      className={className}
      style={{
        marginTop: SPACING[size],
      }}
    />
  )
}

