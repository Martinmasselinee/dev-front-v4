'use client'

import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { Sidebar } from '../../components/Sidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'

export default function AdminPage() {
  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: LAYOUT.SIDEBAR_WIDTH,
        paddingTop: `calc(${SPACING.XXXL} + ${SPACING.M})`,
      }}
    >
      <Sidebar />
      <TopBar />
      <HelpButton />
    </div>
  )
}

