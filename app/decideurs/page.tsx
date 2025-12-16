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
    { label: 'Expiré', value: 'expire', icon: XCircle },
    { label: 'Archivé', value: 'archive', icon: Archive },
  ]

  const getEmptyStateContent = () => {
    const statusLabel = statusItems.find(item => item.value === selectedStatus)?.label || 'Tous'
    const ownerLabel = ownerOptions.find(opt => opt.value === ownerFilter)?.label || 'Tous les membres'
    const ownerText = ownerFilter === 'all' ? '' : ` pour ${ownerLabel.toLowerCase()}`

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
      'expire': {
        title: 'Aucun décideur expiré',
        description: `Aucun décideur expiré${ownerText}.`
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

