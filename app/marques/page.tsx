'use client'

import { useState } from 'react'
import { 
  Tag, 
  UserPlus, 
  Mail, 
  CheckCircle, 
  Sparkles,
  RefreshCw, 
  MessageCircle, 
  Calendar, 
  CalendarCheck, 
  FileCheck, 
  Zap, 
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

export default function MarquesPage() {
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
    { label: 'Tous', value: 'all', icon: Tag },
    { label: 'Prospects', value: 'prospects', icon: UserPlus },
    { label: 'À contacter', value: 'a_contacter', icon: Mail },
    { label: 'Contacté', value: 'contacte', icon: CheckCircle },
    { label: 'Activation proposée', value: 'activation_proposee', icon: Sparkles },
    { label: 'À relancer', value: 'a_relancer', icon: RefreshCw },
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
        icon={Tag} 
        title="Marques" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher des marques..."
      />
      <StickyStatsBar
        icon={Tag}
        stats={[
          { label: 'marques au total', value: '67' },
          { label: 'nouvelles cette semaine', value: '9' },
          { label: 'à contacter', value: '4' },
        ]}
        ownerDropdownOptions={ownerOptions}
        ownerValue={ownerFilter}
        onOwnerChange={setOwnerFilter}
      />
      <HelpButton />
    </div>
  )
}

