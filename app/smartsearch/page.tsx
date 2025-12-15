'use client'

import { useState } from 'react'
import { Sparkles, Search } from 'lucide-react'
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
import { DIMENSION } from '../../constants/dimension'
import { MULTIPLIER } from '../../constants/multiplier'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { WIDTH } from '../../constants/width'
import { STRING } from '../../constants/string'

export default function SmartSearchPage() {
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
          <Button
            variant="PURPLE"
            disabled={true}
            style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
          >
            Lancer la recherche
          </Button>
        }
      />
      <TopBar 
        icon={Sparkles} 
        title=""
        variant="stickyPurple"
        additionalText={stickyPurpleTitle}
        dropdownOptions={viewOptions}
        dropdownValue={viewType}
        onDropdownChange={setViewType}
        dropdownWidth={DIMENSION.DROPDOWN_WIDTH}
      />
      <HelpButton />
      
      <EmptyState
        icon={Search}
        title="Décrivez votre recherche"
        description="Utilisez le champ ci-dessus pour décrire en langage naturel le type d'entreprises et de décideurs que vous recherchez"
      />
    </div>
  )
}

