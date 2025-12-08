'use client'

import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { Z_INDEX } from '../constants/zIndex'
import { POSITION } from '../constants/position'
import { WIDTH } from '../constants/width'
import { BORDER } from '../constants/border'

export const TopBar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: POSITION.ZERO,
        left: '220px',
        right: POSITION.ZERO,
        width: `calc(${WIDTH.FULL} - 220px)`,
        height: `calc(${SPACING.XXXL} + ${SPACING.M})`,
        backgroundColor: COLOR.WHITE,
        borderBottom: `1px solid ${COLOR.GREY.MEDIUM}`,
        zIndex: Z_INDEX.NAVBAR,
        paddingLeft: SPACING.L,
        paddingRight: SPACING.L,
        display: 'flex',
        alignItems: 'center',
      }}
    />
  )
}

