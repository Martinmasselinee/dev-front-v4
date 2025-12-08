'use client'

import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { Sidebar } from '../../components/Sidebar'
import { TopBar } from '../../components/TopBar'

export default function AdminPage() {
  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: 'relative',
        marginLeft: '220px',
        paddingTop: `calc(${SPACING.XXXL} + ${SPACING.M})`,
      }}
    >
      <Sidebar />
      <TopBar />
    </div>
  )
}

