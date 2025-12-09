'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { EmptyState } from '../../components/EmptyState'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from '../../constants/flex'
import { TEXT_ALIGN } from '../../constants/text'
import { COLOR } from '../../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../constants/border'
import { ICON_SIZE } from '../../constants/iconSize'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'

export default function ProspectHunterPage() {
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('table')

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = viewOptions.find(option => option.value === viewType) || viewOptions[0]

  const entreprisesCount = 103937
  const decideursCount = entreprisesCount * 5

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        103 937 entreprises dans la base de données
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {decideursCount.toLocaleString('fr-FR')} décideurs
      </Text>
    </div>
  )

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: LAYOUT.SIDEBAR_WIDTH,
        paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * 0.8))`,
      }}
    >
      <NavbarSidebar />
      <TopBar 
        icon={Search} 
        title="Prospect Hunter" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher..."
        hideBorder={true}
      />
      <TopBar 
        icon={Search} 
        title=""
        variant="stickyPurple"
        additionalText={stickyPurpleTitle}
        dropdownOptions={viewOptions}
        dropdownValue={viewType}
        onDropdownChange={setViewType}
        dropdownWidth="120px"
        />
      <HelpButton />
      
      <EmptyState
        icon={Search}
        title="Sélectionnez vos critères"
        description="Utilisez les filtres ci-dessus pour sélectionner le type d'entreprises et de décideurs que vous recherchez"
      />
    </div>
  )
}

