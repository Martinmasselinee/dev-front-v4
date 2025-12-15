import { ICON_SIZE } from '../constants/iconSize'
import { COLOR } from '../constants/color'

interface GoogleCalendarIconProps {
  size?: number
}

export const GoogleCalendarIcon = ({ size = ICON_SIZE.M }: GoogleCalendarIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z"
        fill={COLOR.GOOGLE.BLUE}
      />
      <path
        d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"
        fill={COLOR.GOOGLE.BLUE}
      />
    </svg>
  )
}

