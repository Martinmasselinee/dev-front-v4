import { ICON_SIZE } from '../constants/iconSize'
import { COLOR } from '../constants/color'

interface GmailIconProps {
  size?: number
}

export const GmailIcon = ({ size = ICON_SIZE.M }: GmailIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 5.5v13c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 5.73-9-5.73V20.5H1.5C.65 20.5 0 19.85 0 19V5.5c0-.35.1-.7.3-1L12 12l11.7-7.5c.2.3.3.65.3 1z"
        fill={COLOR.GOOGLE.RED}
      />
      <path
        d="M23.7 4.5L12 12 0.3 4.5c.2-.3.5-.5.9-.5h21.6c.4 0 .7.2.9.5z"
        fill={COLOR.GOOGLE.GREEN}
      />
      <path
        d="M12 12L0.3 4.5c-.2-.3-.5-.5-.9-.5H1.2c-.4 0-.7.2-.9.5L12 12z"
        fill={COLOR.GOOGLE.BLUE}
      />
    </svg>
  )
}

