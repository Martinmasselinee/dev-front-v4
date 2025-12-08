'use client'

import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { Footer } from '../../components/Footer'

export default function WorkspaceSelectionOrCreationPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: LAYOUT.MIN_SCREEN_HEIGHT,
        position: 'relative',
        paddingTop: SPACING.XXL,
        paddingBottom: SPACING.XXL,
      }}
    >
      {/* Content will be added here */}
      <Footer />
    </div>
  )
}

