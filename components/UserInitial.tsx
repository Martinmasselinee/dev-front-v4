'use client'

import { COLOR } from '../constants/color'
import { BORDER_RADIUS } from '../constants/border'
import { ICON_SIZE } from '../constants/iconSize'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { Text } from './Text'

interface UserInitialProps {
  name: string
  size?: keyof typeof ICON_SIZE
}

export const UserInitial = ({ name, size = 'L' }: UserInitialProps) => {
  const firstLetter = name.charAt(0).toUpperCase()

  return (
    <div
      style={{
        width: ICON_SIZE[size],
        height: ICON_SIZE[size],
        borderRadius: BORDER_RADIUS.CIRCLE,
        backgroundColor: COLOR.BLACK,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.CENTER,
        flexShrink: FLEX.ZERO,
      }}
    >
      <Text size="S" weight="XL" color="WHITE">
        {firstLetter}
      </Text>
    </div>
  )
}

