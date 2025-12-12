'use client'

import { useState } from 'react'
import { BarChart3, FileText, Search, Building2, Users, MapPin, Mail, Handshake, Activity, Inbox } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { MULTIPLIER } from '../../constants/multiplier'
import { POSITION_TYPE } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { StatsBar } from '../../components/StatsBar'
import { HelpButton } from '../../components/HelpButton'
import { EmptyState } from '../../components/EmptyState'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS } from '../../constants/flex'
import { STRING } from '../../constants/string'

export default function DashboardPage() {
  const [searchValue, setSearchValue] = useState('')
  const [timeRange, setTimeRange] = useState('all')
  const [activitesAujourdhui, setActivitesAujourdhui] = useState('14')
  const [activitesSemaine, setActivitesSemaine] = useState('200')

  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log('Refresh clicked')
  }

  const dropdownOptions = [
    { value: '24h', label: 'Dernières 24h' },
    { value: '7d', label: '7 derniers jours' },
    { value: '30d', label: '30 derniers jours' },
    { value: 'all', label: 'Toute l\'activité' },
  ]

  const selectedOption = dropdownOptions.find(option => option.value === timeRange) || dropdownOptions[dropdownOptions.length - 1]

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        {activitesAujourdhui} activités aujourd'hui
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {activitesSemaine} activités cette semaine
      </Text>
    </div>
  )

  const stats = [
    { icon: FileText, value: STRING.ZERO, label: 'articles lus' },
    { icon: Search, value: STRING.ZERO, label: 'recherches lancées' },
    { icon: Building2, value: STRING.ZERO, label: 'entreprises identifiées' },
    { icon: Users, value: STRING.ZERO, label: 'décideurs identifiés' },
    { icon: MapPin, value: STRING.ZERO, label: 'coordonnées trouvées' },
    { icon: Mail, value: STRING.ZERO, label: 'emails envoyés' },
    { icon: Handshake, value: STRING.ZERO, label: 'partenariats signés' },
  ]

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: LAYOUT.SIDEBAR_WIDTH,
        paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STATS_BAR_HEIGHT}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STICKY_BAR_HEIGHT}))`,
      }}
    >
      <NavbarSidebar />
      <TopBar 
        icon={BarChart3} 
        title="Dashboard" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher..."
        showRefresh={true}
        onRefresh={handleRefresh}
        hideBorder={true}
      />
      <StatsBar stats={stats} />
      <TopBar 
        icon={Activity} 
        title=""
        variant="stickyPurple"
        additionalText={stickyPurpleTitle}
        dropdownOptions={dropdownOptions}
        dropdownValue={timeRange}
        onDropdownChange={setTimeRange}
        stickyTopOffset={`calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STATS_BAR_HEIGHT}))`}
      />
      <HelpButton />
      
      <EmptyState
        icon={Inbox}
        title="Aucune activité récente"
        description="Vos activités récentes apparaîtront ici"
      />
    </div>
  )
}

