'use client'

import { useState } from 'react'
import { 
  Zap, 
  Sparkles,
  MessageCircle, 
  Calendar, 
  CalendarCheck, 
  FileCheck, 
  PlayCircle, 
  CheckCircle2, 
  Archive, 
  XCircle 
} from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { MULTIPLIER } from '../../constants/multiplier'
import { POSITION_TYPE } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { StatusFilterSidebar, StatusItem } from '../../components/StatusFilterSidebar'
import { StickyStatsBar } from '../../components/StickyStatsBar'
import { Button } from '../../components/Button'
import { INPUT_HEIGHT } from '../../constants/input'

export default function ActivationsPage() {
  const [searchValue, setSearchValue] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('all')

  // Mock team members
  const ownerOptions = [
    { value: 'all', label: 'Tous les membres' },
    { value: 'martin', label: 'Martin Masseline' },
    { value: 'sarah', label: 'Sarah Dupont' },
    { value: 'pierre', label: 'Pierre Martin' },
  ]

  const statusItems: StatusItem[] = [
    { label: 'Tous', value: 'all', icon: Zap },
    { label: 'Activation proposée', value: 'activation_proposee', icon: Sparkles },
    { label: 'Discussion en cours', value: 'discussion_en_cours', icon: MessageCircle },
    { label: 'Meeting à venir', value: 'meeting_a_venir', icon: Calendar },
    { label: 'Meetings effectués', value: 'meetings_effectues', icon: CalendarCheck },
    { label: 'Contrat signé', value: 'contrat_signe', icon: FileCheck },
    { label: 'Activation à venir', value: 'activation_a_venir', icon: Zap },
    { label: 'Activation en cours', value: 'activation_en_cours', icon: PlayCircle },
    { label: 'Contrat terminé', value: 'contrat_termine', icon: CheckCircle2 },
    { label: 'Archivé', value: 'archive', icon: Archive },
    { label: 'Expirés', value: 'expires', icon: XCircle },
  ]

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: `calc(${LAYOUT.SIDEBAR_WIDTH} + (${LAYOUT.SIDEBAR_WIDTH} * 0.9))`,
        paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STICKY_BAR_HEIGHT}))`,
      }}
    >
      <NavbarSidebar />
      <StatusFilterSidebar statusItems={statusItems} />
      <TopBar 
        icon={Zap} 
        title="Activations" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher des activations..."
      />
      <StickyStatsBar
        icon={Zap}
        stats={[
          { label: 'activations au total', value: '34' },
          { label: 'nouvelles cette semaine', value: '7' },
          { label: 'en cours', value: '12' },
        ]}
        ownerDropdownOptions={ownerOptions}
        ownerValue={ownerFilter}
        onOwnerChange={setOwnerFilter}
        rightButton={
          <Button variant="BLACK" onClick={() => {}} style={{ width: 'auto', height: INPUT_HEIGHT.SMALL, paddingLeft: SPACING.L, paddingRight: SPACING.L }}>
            Nouvelle activation
          </Button>
        }
      />
      <HelpButton />
    </div>
  )
}

