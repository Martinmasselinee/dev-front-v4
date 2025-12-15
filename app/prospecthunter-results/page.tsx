'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Building2 } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { Container } from '../../components/Container'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { DIMENSION } from '../../constants/dimension'
import { BUSINESS } from '../../constants/business'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { MULTIPLIER } from '../../constants/multiplier'
import { STRING } from '../../constants/string'
import { NUMBER } from '../../constants/number'
import { WIDTH } from '../../constants/width'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'

export default function ProspectHunterResultsPage() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('table')

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = findOptionOrDefault(viewOptions, viewType)

  const entreprisesCount = 103937
  const decideursCount = entreprisesCount * BUSINESS.DECIDEURS_PER_ENTREPRISE

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
        paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STICKY_BAR_HEIGHT}))`,
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
        rightElement={
          <Button
            variant="BLACK"
            onClick={() => router.push('/prospect-hunter')}
            style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
          >
            Nouvelle recherche
          </Button>
        }
      />
      <TopBar 
        icon={Building2} 
        title=""
        variant="stickyPurple"
        additionalText={stickyPurpleTitle}
        dropdownOptions={viewOptions}
        dropdownValue={viewType}
        onDropdownChange={setViewType}
        dropdownWidth={DIMENSION.DROPDOWN_WIDTH}
        />
      <HelpButton />
      
      <Container variant="fullWidth">
        {/* Results content will be added here in a later task */}
      </Container>
    </div>
  )
}

