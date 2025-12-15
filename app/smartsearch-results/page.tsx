'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Filter, Building2 } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { NUMBER } from '../../constants/number'
import { ICON_SIZE } from '../../constants/iconSize'
import { DIMENSION } from '../../constants/dimension'
import { MULTIPLIER } from '../../constants/multiplier'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { WIDTH } from '../../constants/width'
import { STRING } from '../../constants/string'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { Container } from '../../components/Container'

export default function SmartSearchResultsPage() {
  const router = useRouter()
  const [viewType, setViewType] = useState('table')
  const [recherchesLancees, setRecherchesLancees] = useState(STRING.ZERO)

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = findOptionOrDefault(viewOptions, viewType)

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        Des millions d'entreprises à portée de clic
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {recherchesLancees} recherches déjà lancées
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
        icon={Sparkles} 
        title="SmartSearch" 
        hideBorder={true}
        rightElement={
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.M,
            }}
          >
            <Button
              variant="WHITE"
              icon={<Filter size={ICON_SIZE.M} />}
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
            >
              Filtre
            </Button>
            <Button
              variant="BLACK"
              onClick={() => router.push('/smartsearch')}
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
            >
              Nouvelle recherche
            </Button>
          </div>
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
        <div
          style={{
            paddingTop: SPACING.XL,
            paddingBottom: SPACING.XL,
            paddingLeft: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
            paddingRight: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
          }}
        >
          {/* Results content will be added here in a later task */}
        </div>
      </Container>
    </div>
  )
}

