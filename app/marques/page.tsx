'use client'

import { useState } from 'react'
import { Tag } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { StatusFilterSidebar } from '../../components/StatusFilterSidebar'

export default function MarquesPage() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: `calc(${LAYOUT.SIDEBAR_WIDTH} + (${LAYOUT.SIDEBAR_WIDTH} * 0.9))`,
        paddingTop: `calc(${SPACING.XXXL} + ${SPACING.M})`,
      }}
    >
      <NavbarSidebar />
      <StatusFilterSidebar />
      <TopBar 
        icon={Tag} 
        title="Marques" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher des marques..."
      />
      <HelpButton />
    </div>
  )
}

