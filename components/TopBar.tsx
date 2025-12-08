'use client'

import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { Z_INDEX } from '../constants/zIndex'
import { POSITION } from '../constants/position'
import { WIDTH } from '../constants/width'
import { BORDER } from '../constants/border'
import { LAYOUT } from '../constants/layout'
import { POSITION_TYPE } from '../constants/positionType'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/alignItems'
import { BORDER_WIDTH } from '../constants/borderWidth'

export const TopBar = () => {
  return (
    <div
      style={{
        position: POSITION_TYPE.FIXED,
        top: POSITION.ZERO,
        left: LAYOUT.SIDEBAR_WIDTH,
        right: POSITION.ZERO,
        width: `calc(${WIDTH.FULL} - ${LAYOUT.SIDEBAR_WIDTH})`,
        height: `calc(${SPACING.XXXL} + ${SPACING.M})`,
        backgroundColor: COLOR.WHITE,
        borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
        zIndex: Z_INDEX.NAVBAR,
        paddingLeft: SPACING.L,
        paddingRight: SPACING.L,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
      }}
    />
  )
}

