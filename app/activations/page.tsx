'use client'

import { useState } from 'react'
import { 
  Zap, 
  Sparkles,
  PlayCircle, 
  CheckCircle2, 
  Archive,
  LucideIcon
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
import { EmptyState } from '../../components/EmptyState'

export default function ActivationsPage() {
  const [searchValue, setSearchValue] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

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
    { label: 'Activation à venir', value: 'activation_a_venir', icon: Zap },
    { label: 'Activation en cours', value: 'activation_en_cours', icon: PlayCircle },
    { label: 'Activation terminée', value: 'activation_terminee', icon: CheckCircle2 },
    { label: 'Archivés', value: 'archive', icon: Archive },
  ]

  const getEmptyStateContent = () => {
    const ownerLabel = ownerOptions.find(opt => opt.value === ownerFilter)?.label || 'Tous les membres'
    const ownerText = ownerFilter === 'all' ? '' : ` pour ${ownerLabel.toLowerCase()}`

    const statusMessages: Record<string, { title: string; description: string }> = {
      'all': {
        title: 'Aucune activation',
        description: `Aucune activation trouvée${ownerText}.`
      },
      'activation_proposee': {
        title: 'Aucune activation proposée',
        description: `Aucune activation proposée${ownerText}.`
      },
      'activation_a_venir': {
        title: 'Aucune activation à venir',
        description: `Aucune activation à venir${ownerText}.`
      },
      'activation_en_cours': {
        title: 'Aucune activation en cours',
        description: `Aucune activation en cours${ownerText}.`
      },
      'activation_terminee': {
        title: 'Aucune activation terminée',
        description: `Aucune activation terminée${ownerText}.`
      },
      'archive': {
        title: 'Aucune activation archivée',
        description: `Aucune activation archivée${ownerText}.`
      },
    }

    return statusMessages[selectedStatus] || statusMessages['all']
  }

  const emptyStateContent = getEmptyStateContent()
  const selectedStatusItem = statusItems.find(item => item.value === selectedStatus)
  const emptyStateIcon = (selectedStatusItem?.icon || Zap) as LucideIcon

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
      <StatusFilterSidebar 
        statusItems={statusItems}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
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
      <EmptyState
        icon={emptyStateIcon}
        title={emptyStateContent.title}
        description={emptyStateContent.description}
      />
      <HelpButton />
    </div>
  )
}

