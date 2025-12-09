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
  XCircle,
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
import { EmptyState } from '../../components/EmptyState'

export default function MarquesPage() {
  const [searchValue, setSearchValue] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [contacteSubStatus, setContacteSubStatus] = useState<string>('all')
  const [meetingsSubStatus, setMeetingsSubStatus] = useState<string>('all')
  const [contratsSubStatus, setContratsSubStatus] = useState<string>('all')

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
    { label: 'Meetings', value: 'meetings', icon: Calendar },
    { label: 'Contrats', value: 'contrats', icon: FileCheck },
    { label: 'Archivé', value: 'archive', icon: Archive },
  ]

  const contacteSubStatusOptions = [
    { value: 'all', label: 'Contactés' },
    { value: 'a_relancer', label: 'À relancer' },
    { value: '1x_relance', label: '1X relance' },
    { value: '2x_relances', label: '2X relances' },
    { value: '3x_relances', label: '3X relances' },
    { value: 'discussion_en_cours', label: 'Discussion en cours' },
    { value: 'aucune_reponse', label: 'Aucune réponse' },
  ]

  const meetingsSubStatusOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'meeting_a_venir', label: 'Meeting à venir' },
    { value: '1x_meeting', label: '1X meeting' },
    { value: '2x_meetings', label: '2X meetings' },
    { value: '3x_meetings', label: '3X meetings' },
    { value: 'meetings_effectues', label: 'Meetings effectués' },
  ]

  const contratsSubStatusOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'contrat_signe', label: 'Contrat signé' },
    { value: 'contrat_a_venir', label: 'Contrat à venir' },
    { value: 'contrat_termine', label: 'Contrat terminé' },
  ]

  const getEmptyStateContent = () => {
    const ownerLabel = ownerOptions.find(opt => opt.value === ownerFilter)?.label || 'Tous les membres'
    const ownerText = ownerFilter === 'all' ? '' : ` pour ${ownerLabel.toLowerCase()}`

    // Handle sub-status for "Contacté"
    if (selectedStatus === 'contacte' && contacteSubStatus !== 'all') {
      if (contacteSubStatus === 'a_relancer') {
        return {
          title: 'Aucune marque à relancer',
          description: `Aucune marque à relancer${ownerText}.`
        }
      }
      if (contacteSubStatus === '1x_relance') {
        return {
          title: 'Aucune marque avec 1X relance',
          description: `Aucune marque avec 1X relance${ownerText}.`
        }
      }
      if (contacteSubStatus === '2x_relances') {
        return {
          title: 'Aucune marque avec 2X relances',
          description: `Aucune marque avec 2X relances${ownerText}.`
        }
      }
      if (contacteSubStatus === '3x_relances') {
        return {
          title: 'Aucune marque avec 3X relances',
          description: `Aucune marque avec 3X relances${ownerText}.`
        }
      }
      if (contacteSubStatus === 'discussion_en_cours') {
        return {
          title: 'Aucune discussion en cours',
          description: `Aucune discussion en cours${ownerText}.`
        }
      }
      if (contacteSubStatus === 'aucune_reponse') {
        return {
          title: 'Aucune marque sans réponse',
          description: `Aucune marque sans réponse${ownerText}.`
        }
      }
    }

    // Handle sub-status for "Meetings"
    if (selectedStatus === 'meetings' && meetingsSubStatus !== 'all') {
      if (meetingsSubStatus === 'meeting_a_venir') {
        return {
          title: 'Aucun meeting à venir',
          description: `Aucun meeting à venir${ownerText}.`
        }
      }
      if (meetingsSubStatus === '1x_meeting') {
        return {
          title: 'Aucune marque avec 1X meeting',
          description: `Aucune marque avec 1X meeting${ownerText}.`
        }
      }
      if (meetingsSubStatus === '2x_meetings') {
        return {
          title: 'Aucune marque avec 2X meetings',
          description: `Aucune marque avec 2X meetings${ownerText}.`
        }
      }
      if (meetingsSubStatus === '3x_meetings') {
        return {
          title: 'Aucune marque avec 3X meetings',
          description: `Aucune marque avec 3X meetings${ownerText}.`
        }
      }
      if (meetingsSubStatus === 'meetings_effectues') {
        return {
          title: 'Aucun meeting effectué',
          description: `Aucun meeting effectué${ownerText}.`
        }
      }
    }

    // Handle sub-status for "Contrats"
    if (selectedStatus === 'contrats' && contratsSubStatus !== 'all') {
      if (contratsSubStatus === 'contrat_signe') {
        return {
          title: 'Aucun contrat signé',
          description: `Aucun contrat signé${ownerText}.`
        }
      }
      if (contratsSubStatus === 'contrat_a_venir') {
        return {
          title: 'Aucun contrat à venir',
          description: `Aucun contrat à venir${ownerText}.`
        }
      }
      if (contratsSubStatus === 'contrat_termine') {
        return {
          title: 'Aucun contrat terminé',
          description: `Aucun contrat terminé${ownerText}.`
        }
      }
    }

    const statusMessages: Record<string, { title: string; description: string }> = {
      'all': {
        title: 'Aucune marque',
        description: `Aucune marque trouvée${ownerText}.`
      },
      'prospects': {
        title: 'Aucun prospect',
        description: `Aucun prospect trouvé${ownerText}.`
      },
      'a_contacter': {
        title: 'Aucune marque à contacter',
        description: `Aucune marque à contacter${ownerText}.`
      },
      'contacte': {
        title: 'Aucune marque contactée',
        description: `Aucune marque contactée${ownerText}.`
      },
      'meetings': {
        title: 'Aucun meeting',
        description: `Aucun meeting trouvé${ownerText}.`
      },
      'contrats': {
        title: 'Aucun contrat',
        description: `Aucun contrat trouvé${ownerText}.`
      },
      'archive': {
        title: 'Aucune marque archivée',
        description: `Aucune marque archivée${ownerText}.`
      },
    }

    return statusMessages[selectedStatus] || statusMessages['all']
  }

  const emptyStateContent = getEmptyStateContent()
  const selectedStatusItem = statusItems.find(item => item.value === selectedStatus)
  const emptyStateIcon = (selectedStatusItem?.icon || Tag) as LucideIcon

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
        ]}
        ownerDropdownOptions={ownerOptions}
        ownerValue={ownerFilter}
        onOwnerChange={setOwnerFilter}
        contacteSubStatusOptions={contacteSubStatusOptions}
        contacteSubStatusValue={contacteSubStatus}
        onContacteSubStatusChange={setContacteSubStatus}
        meetingsSubStatusOptions={meetingsSubStatusOptions}
        meetingsSubStatusValue={meetingsSubStatus}
        onMeetingsSubStatusChange={setMeetingsSubStatus}
        contratsSubStatusOptions={contratsSubStatusOptions}
        contratsSubStatusValue={contratsSubStatus}
        onContratsSubStatusChange={setContratsSubStatus}
        selectedStatus={selectedStatus}
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

