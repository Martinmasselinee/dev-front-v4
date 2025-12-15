'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { 
  Users, 
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
  LucideIcon,
  Eye,
  Phone,
  ExternalLink,
  Linkedin,
  User,
  Briefcase,
  Tag as TagIcon
} from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { MULTIPLIER } from '../../constants/multiplier'
import { POSITION_TYPE, POSITION } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { StatusFilterSidebar, StatusItem } from '../../components/StatusFilterSidebar'
import { StickyStatsBar } from '../../components/StickyStatsBar'
import { EmptyState } from '../../components/EmptyState'
import { Table } from '../../components/Table'
import { Text } from '../../components/Text'
import { Button } from '../../components/Button'
import { UserInitial } from '../../components/UserInitial'
import { COLOR } from '../../constants/color'
import { ICON_SIZE } from '../../constants/iconSize'
import { FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { BORDER_RADIUS, BORDER_WIDTH, BORDER } from '../../constants/border'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX, JUSTIFY_CONTENT, FLEX_WRAP } from '../../constants/flex'
import { CURSOR } from '../../constants/interaction'
import { OVERFLOW } from '../../constants/overflow'
import { TEXT_ALIGN, TEXT_OVERFLOW, WHITE_SPACE, TEXT_TRANSFORM, LETTER_SPACING } from '../../constants/text'
import { TABLE } from '../../constants/table'
import { INPUT_HEIGHT } from '../../constants/input'
import { WIDTH } from '../../constants/width'
import { NUMBER } from '../../constants/number'
import { getAlternatingRowColor } from '../../lib/tableUtils'
import { lightenColor, hexToRgba } from '../../lib/colorUtils'
import { OPACITY } from '../../constants/opacity'
import { BUTTON_HEIGHT, BUTTON_OVERLAY } from '../../constants/button'
import { INSET } from '../../constants/position'
import { Z_INDEX } from '../../constants/zIndex'
import { TRANSITION } from '../../constants/transition'
import { POINTER_EVENTS } from '../../constants/interaction'

type User = {
  id: string
  fullName: string
  fonction: string
  tags: string[]
  linkedin?: string
  email: string
  telephone: string
}

export default function DecideursPage() {
  const [searchValue, setSearchValue] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [contacteSubStatus, setContacteSubStatus] = useState<string>('all')
  const [meetingsSubStatus, setMeetingsSubStatus] = useState<string>('all')
  const [contratsSubStatus, setContratsSubStatus] = useState<string>('all')

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '1',
      fullName: 'Jean Dupont',
      fonction: 'Directeur Marketing',
      tags: ['Sport', 'Tech'],
      linkedin: 'https://linkedin.com/in/jeandupont',
      email: 'jean.dupont@example.com',
      telephone: '+33 6 12 34 56 78',
    },
    {
      id: '2',
      fullName: 'Marie Martin',
      fonction: 'CEO',
      tags: ['Finance'],
      linkedin: 'https://linkedin.com/in/mariemartin',
      email: 'marie.martin@example.com',
      telephone: '+33 6 23 45 67 89',
    },
    {
      id: '3',
      fullName: 'Pierre Bernard',
      fonction: 'Directeur Commercial',
      tags: ['Sport', 'Media'],
      email: 'pierre.bernard@example.com',
      telephone: '+33 6 34 56 78 90',
    },
  ]

  const filteredUsers = mockUsers.filter(user => {
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      return (
        user.fullName.toLowerCase().includes(searchLower) ||
        user.fonction.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  // Mock team members
  const ownerOptions = [
    { value: 'all', label: 'Tous les membres' },
    { value: 'martin', label: 'Martin Masseline' },
    { value: 'sarah', label: 'Sarah Dupont' },
    { value: 'pierre', label: 'Pierre Martin' },
  ]

  const statusItems: StatusItem[] = [
    { label: 'Tous', value: 'all', icon: Users },
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
    const statusLabel = statusItems.find(item => item.value === selectedStatus)?.label || 'Tous'
    const ownerLabel = ownerOptions.find(opt => opt.value === ownerFilter)?.label || 'Tous les membres'
    const ownerText = ownerFilter === 'all' ? '' : ` pour ${ownerLabel.toLowerCase()}`

    // Handle sub-status for "Contacté"
    if (selectedStatus === 'contacte' && contacteSubStatus !== 'all') {
      if (contacteSubStatus === 'a_relancer') {
        return {
          title: 'Aucun décideur à relancer',
          description: `Aucun décideur à relancer${ownerText}.`
        }
      }
      if (contacteSubStatus === '1x_relance') {
        return {
          title: 'Aucun décideur avec 1X relance',
          description: `Aucun décideur avec 1X relance${ownerText}.`
        }
      }
      if (contacteSubStatus === '2x_relances') {
        return {
          title: 'Aucun décideur avec 2X relances',
          description: `Aucun décideur avec 2X relances${ownerText}.`
        }
      }
      if (contacteSubStatus === '3x_relances') {
        return {
          title: 'Aucun décideur avec 3X relances',
          description: `Aucun décideur avec 3X relances${ownerText}.`
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
          title: 'Aucun décideur sans réponse',
          description: `Aucun décideur sans réponse${ownerText}.`
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
          title: 'Aucun décideur avec 1X meeting',
          description: `Aucun décideur avec 1X meeting${ownerText}.`
        }
      }
      if (meetingsSubStatus === '2x_meetings') {
        return {
          title: 'Aucun décideur avec 2X meetings',
          description: `Aucun décideur avec 2X meetings${ownerText}.`
        }
      }
      if (meetingsSubStatus === '3x_meetings') {
        return {
          title: 'Aucun décideur avec 3X meetings',
          description: `Aucun décideur avec 3X meetings${ownerText}.`
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
        title: 'Aucun décideur',
        description: `Aucun décideur trouvé${ownerText}.`
      },
      'prospects': {
        title: 'Aucun prospect',
        description: `Aucun prospect trouvé${ownerText}.`
      },
      'a_contacter': {
        title: 'Aucun décideur à contacter',
        description: `Aucun décideur à contacter${ownerText}.`
      },
      'contacte': {
        title: 'Aucun décideur contacté',
        description: `Aucun décideur contacté${ownerText}.`
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
        title: 'Aucun décideur archivé',
        description: `Aucun décideur archivé${ownerText}.`
      },
    }

    return statusMessages[selectedStatus] || statusMessages['all']
  }

  const emptyStateContent = getEmptyStateContent()
  const selectedStatusItem = statusItems.find(item => item.value === selectedStatus)
  const emptyStateIcon = (selectedStatusItem?.icon || Users) as LucideIcon

  // Table columns definition
  const tableColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'fullName',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <User size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Nom complet
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S, minWidth: NUMBER.ZERO, overflow: OVERFLOW.HIDDEN }}>
          <UserInitial name={row.original.fullName} size="M" />
          <Text size="M" weight="L" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, minWidth: NUMBER.ZERO, flex: FLEX.ONE }}>
            {row.original.fullName}
          </Text>
        </div>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE} * 0.9)`,
      },
    },
    {
      accessorKey: 'fonction',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Briefcase size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Fonction
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <div
          style={{
            display: DISPLAY.INLINE_FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            paddingLeft: SPACING.S,
            paddingRight: SPACING.S,
            paddingTop: SPACING.XS,
            paddingBottom: SPACING.XS,
            backgroundColor: lightenColor(COLOR.PURPLE, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE),
            borderRadius: BORDER_RADIUS.M,
            maxWidth: WIDTH.FULL,
            overflow: OVERFLOW.HIDDEN,
          }}
        >
          <Text size="S" weight="M" style={{ color: COLOR.PURPLE, overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
            {row.original.fonction}
          </Text>
        </div>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
      },
    },
    {
      accessorKey: 'linkedin',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Linkedin size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            LinkedIn
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        row.original.linkedin ? (
          <button
            onClick={() => window.open(row.original.linkedin, '_blank')}
            style={{
              backgroundColor: lightenColor(COLOR.GOOGLE.BLUE, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE),
              color: COLOR.GOOGLE.BLUE,
              borderRadius: BORDER_RADIUS.M,
              height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
              border: BORDER.NONE,
              cursor: CURSOR.POINTER,
              width: WIDTH.AUTO,
              paddingLeft: SPACING.M,
              paddingRight: SPACING.M,
              fontSize: FONT_SIZE.M,
              fontWeight: FONT_THICKNESS.L,
              transition: `background-color ${TRANSITION.FAST_EASE}`,
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.CENTER,
              position: POSITION_TYPE.RELATIVE,
              opacity: OPACITY.FULL,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = lightenColor(lightenColor(COLOR.GOOGLE.BLUE, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE), MULTIPLIER.COLOR_LIGHTEN_PERCENT)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = lightenColor(COLOR.GOOGLE.BLUE, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE)
            }}
          >
            <div
              style={{
                position: POSITION_TYPE.ABSOLUTE,
                inset: INSET.BUTTON_OVERLAY,
                borderRadius: BUTTON_OVERLAY.BORDER_RADIUS,
                background: `linear-gradient(to bottom, rgba(255, 255, 255, ${OPACITY.BUTTON_GRADIENT_START}), rgba(255, 255, 255, ${OPACITY.BUTTON_GRADIENT_END}))`,
                pointerEvents: POINTER_EVENTS.NONE,
                zIndex: Z_INDEX.COMPONENT_OVERLAY,
              }}
            >
              <div
                style={{
                  position: POSITION_TYPE.ABSOLUTE,
                  inset: INSET.BUTTON_OVERLAY,
                  borderRadius: BUTTON_OVERLAY.INNER_BORDER_RADIUS,
                  background: lightenColor(COLOR.GOOGLE.BLUE, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE),
                  transition: `background-color ${TRANSITION.FAST_EASE}`,
                }}
              />
            </div>
            <span
              style={{
                position: POSITION_TYPE.RELATIVE,
                zIndex: Z_INDEX.COMPONENT_CONTENT,
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
              }}
            >
              <span style={{ marginRight: SPACING.S, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER }}>
                <ExternalLink size={ICON_SIZE.M} style={{ color: COLOR.GOOGLE.BLUE }} />
              </span>
              LinkedIn
            </span>
          </button>
        ) : (
          <Text size="M" weight="M" color="BLACK">
            -
          </Text>
        )
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE})`,
      },
    },
    {
      accessorKey: 'tags',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <TagIcon size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Tag
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        row.original.tags.length > NUMBER.ZERO ? (
          <div
            style={{
              display: DISPLAY.INLINE_FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              paddingLeft: SPACING.S,
              paddingRight: SPACING.S,
              paddingTop: SPACING.XS,
              paddingBottom: SPACING.XS,
              backgroundColor: lightenColor(COLOR.GOOGLE.GREEN, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE),
              borderRadius: BORDER_RADIUS.M,
              overflow: OVERFLOW.HIDDEN,
              maxWidth: WIDTH.FULL,
            }}
          >
            <Text size="S" weight="M" style={{ color: COLOR.GOOGLE.GREEN, overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
              {row.original.tags[NUMBER.ZERO]}
            </Text>
          </div>
        ) : (
          <Text size="M" weight="M" color="BLACK">
            -
          </Text>
        )
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
      },
    },
    {
      accessorKey: 'email',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Mail size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Email
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
          {row.original.email}
        </Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
      },
    },
    {
      accessorKey: 'telephone',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Phone size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Téléphone
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
          {row.original.telephone}
        </Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
      },
    },
    {
      id: 'details',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
          <Eye size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.CENTER }}>
            Détails
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Button
          variant="WHITE"
          onClick={() => {}}
          icon={<Eye size={ICON_SIZE.M} />}
          style={{
            width: `calc(${WIDTH.FULL} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
            height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
          }}
        >
          Voir
        </Button>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
        align: 'center',
        sticky: true,
        stickyRight: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE} * 0.85)`,
        borderLeft: true,
      },
    },
    {
      id: 'action',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
          <Mail size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.CENTER }}>
            Contact
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Button
          variant="BLACK"
          onClick={() => {}}
          style={{
            width: `calc(${WIDTH.FULL} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE} * 0.85)`,
            height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
            paddingLeft: SPACING.ZERO,
            paddingRight: SPACING.ZERO,
          }}
        >
          <Mail size={ICON_SIZE.M} />
        </Button>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE} * 0.85)`,
        align: 'center',
        sticky: true,
        stickyRight: POSITION.ZERO,
        borderLeft: true,
      },
    },
  ]

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: `calc(${LAYOUT.SIDEBAR_WIDTH} + (${LAYOUT.SIDEBAR_WIDTH} * ${MULTIPLIER.SIDEBAR_WIDTH_NINETY}))`,
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
        icon={Users} 
        title="Décideurs" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher des décideurs..."
      />
      <StickyStatsBar
        icon={Users}
        stats={[
          { label: 'décideurs au total', value: '142' },
          { label: 'nouveaux cette semaine', value: '23' },
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
      {filteredUsers.length > NUMBER.ZERO ? (
        <Table
          data={filteredUsers}
          columns={tableColumns}
          getRowBackgroundColor={getAlternatingRowColor}
          showTopBorder={false}
          stickyTopOffset={`calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STICKY_BAR_HEIGHT}) - (${SPACING.L} * 7))`}
        />
      ) : (
        <EmptyState
          icon={emptyStateIcon}
          title={emptyStateContent.title}
          description={emptyStateContent.description}
        />
      )}
      <HelpButton />
    </div>
  )
}

