'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { 
  Building2, 
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
  ExternalLink,
  DollarSign,
  MapPin,
  Tag,
  Brain,
  Globe,
  FileText
} from 'lucide-react'
import { LAYOUT, CALCULATION } from '../../constants/layout'
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
import { Container } from '../../components/Container'
import { CompanyCard } from '../prospecthunter-results/components/CompanyCard'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Text } from '../../components/Text'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { NUMBER } from '../../constants/number'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_WRAP, FLEX_DIRECTION, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { BORDER_WIDTH, BORDER_RADIUS } from '../../constants/border'
import { lightenColor } from '../../lib/colorUtils'
import { Link } from '../../components/Link'
import { WIDTH } from '../../constants/width'
import { CURSOR } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { ICON_SIZE } from '../../constants/iconSize'
import { ICON_STROKE_WIDTH } from '../../constants/icon'
import { FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { TEXT_ALIGN } from '../../constants/text'
import { TABLE } from '../../constants/table'
import { OVERFLOW } from '../../constants/overflow'
import { TEXT_OVERFLOW, WHITE_SPACE, TEXT_TRANSFORM, LETTER_SPACING, TEXT_DECORATION } from '../../constants/text'
import { INPUT_HEIGHT } from '../../constants/input'
import { getAlternatingRowColor } from '../../lib/tableUtils'
import { DIMENSION } from '../../constants/dimension'

type Company = {
  logo?: string
  companyName: string
  description: string
  revenue: string
  location: string
  website?: string
  sector: string
}

export default function EntreprisesPage() {
  const [searchValue, setSearchValue] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [contacteSubStatus, setContacteSubStatus] = useState<string>('all')
  const [meetingsSubStatus, setMeetingsSubStatus] = useState<string>('all')
  const [contratsSubStatus, setContratsSubStatus] = useState<string>('all')
  const [viewType, setViewType] = useState('cards')
  const [hasResults, setHasResults] = useState(true)

  // Mock team members
  const ownerOptions = [
    { value: 'all', label: 'Tous les membres' },
    { value: 'martin', label: 'Martin Masseline' },
    { value: 'sarah', label: 'Sarah Dupont' },
    { value: 'pierre', label: 'Pierre Martin' },
  ]

  const statusItems: StatusItem[] = [
    { label: 'Tous', value: 'all', icon: Building2 },
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

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = findOptionOrDefault(viewOptions, viewType)

  // Mock companies data
  const mockCompanies: Company[] = [
    {
      logo: undefined,
      companyName: 'COOPERL ARC ATLANTIQUE',
      description: 'Transformation et conservation de la viande de boucherie',
      revenue: '2+ Mds€',
      location: 'Lamballe-armor, France',
      website: 'www.cooperl.com',
      sector: 'Agriculture & Agroalimentaire',
    },
  ]

  // Generate companies (reuse mock data) - hardcode 10 items
  const displayCompanies = Array.from({ length: NUMBER.TEN }, () => mockCompanies[NUMBER.ZERO])

  // Table columns definition
  const tableColumns: ColumnDef<Company>[] = [
    {
      accessorKey: 'companyName',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Building2 size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Entreprise
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S, minWidth: NUMBER.ZERO, overflow: OVERFLOW.HIDDEN }}>
          {row.original.logo ? (
            <img
              src={row.original.logo}
              alt={row.original.companyName}
              style={{
                width: ICON_SIZE.M,
                height: ICON_SIZE.M,
                borderRadius: BORDER_RADIUS.CIRCLE,
                objectFit: 'cover',
                flexShrink: FLEX.ZERO,
              }}
            />
          ) : (
            <Globe size={ICON_SIZE.M} style={{ color: COLOR.GREY.MEDIUM, flexShrink: FLEX.ZERO }} />
          )}
          <Text size="M" weight="L" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, minWidth: NUMBER.ZERO, flex: FLEX.ONE }}>
            {row.original.companyName}
          </Text>
        </div>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
      },
    },
    {
      accessorKey: 'revenue',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <DollarSign size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            CA
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
          {row.original.revenue}
        </Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
      },
    },
    {
      accessorKey: 'sector',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Tag size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Secteur
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
            backgroundColor: lightenColor(COLOR.GOOGLE.GREEN, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE),
            borderRadius: BORDER_RADIUS.M,
            maxWidth: WIDTH.FULL,
            overflow: OVERFLOW.HIDDEN,
          }}
        >
          <Text size="S" weight="M" style={{ color: COLOR.GOOGLE.GREEN, overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
            {row.original.sector}
          </Text>
        </div>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
      },
    },
    {
      accessorKey: 'website',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <ExternalLink size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Site web
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        row.original.website ? (
          <Link
            href={row.original.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: COLOR.GOOGLE.BLUE,
              textDecoration: TEXT_DECORATION.UNDERLINE,
              maxWidth: WIDTH.FULL,
              overflow: OVERFLOW.HIDDEN,
              minWidth: NUMBER.ZERO,
            }}
          >
            {row.original.website}
          </Link>
        ) : (
          <Text size="M" weight="M" color="BLACK">
            -
          </Text>
        )
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
      },
    },
    {
      accessorKey: 'description',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <FileText size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Description
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="GREY_DARK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
          {row.original.description}
        </Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
      },
    },
    {
      accessorKey: 'location',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <MapPin size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>
            Localisation
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
          {row.original.location}
        </Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
      },
    },
    {
      id: 'analyse',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
          <Brain size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.CENTER }}>
            Analyse
          </Text>
        </div>
      ),
      cell: ({ row }) => (
        <Button
          variant="BLACK"
          onClick={() => {}}
          icon={<Brain size={ICON_SIZE.M} />}
          style={{
            width: `calc(${WIDTH.FULL} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
            height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
          }}
        >
          Analyse
        </Button>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE})`,
        align: 'center',
        sticky: true,
        stickyRight: POSITION.ZERO,
        borderLeft: true,
      },
    },
  ]

  const getEmptyStateContent = () => {
    const ownerLabel = ownerOptions.find(opt => opt.value === ownerFilter)?.label || 'Tous les membres'
    const ownerText = ownerFilter === 'all' ? '' : ` pour ${ownerLabel.toLowerCase()}`

    // Handle sub-status for "Contacté"
    if (selectedStatus === 'contacte' && contacteSubStatus !== 'all') {
      if (contacteSubStatus === 'a_relancer') {
        return {
          title: 'Aucune entreprise à relancer',
          description: `Aucune entreprise à relancer${ownerText}.`
        }
      }
      if (contacteSubStatus === '1x_relance') {
        return {
          title: 'Aucune entreprise avec 1X relance',
          description: `Aucune entreprise avec 1X relance${ownerText}.`
        }
      }
      if (contacteSubStatus === '2x_relances') {
        return {
          title: 'Aucune entreprise avec 2X relances',
          description: `Aucune entreprise avec 2X relances${ownerText}.`
        }
      }
      if (contacteSubStatus === '3x_relances') {
        return {
          title: 'Aucune entreprise avec 3X relances',
          description: `Aucune entreprise avec 3X relances${ownerText}.`
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
          title: 'Aucune entreprise sans réponse',
          description: `Aucune entreprise sans réponse${ownerText}.`
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
          title: 'Aucune entreprise avec 1X meeting',
          description: `Aucune entreprise avec 1X meeting${ownerText}.`
        }
      }
      if (meetingsSubStatus === '2x_meetings') {
        return {
          title: 'Aucune entreprise avec 2X meetings',
          description: `Aucune entreprise avec 2X meetings${ownerText}.`
        }
      }
      if (meetingsSubStatus === '3x_meetings') {
        return {
          title: 'Aucune entreprise avec 3X meetings',
          description: `Aucune entreprise avec 3X meetings${ownerText}.`
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
        title: 'Aucune entreprise',
        description: `Aucune entreprise trouvée${ownerText}.`
      },
      'prospects': {
        title: 'Aucun prospect',
        description: `Aucun prospect trouvé${ownerText}.`
      },
      'a_contacter': {
        title: 'Aucune entreprise à contacter',
        description: `Aucune entreprise à contacter${ownerText}.`
      },
      'contacte': {
        title: 'Aucune entreprise contactée',
        description: `Aucune entreprise contactée${ownerText}.`
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
        title: 'Aucune entreprise archivée',
        description: `Aucune entreprise archivée${ownerText}.`
      },
    }

    return statusMessages[selectedStatus] || statusMessages['all']
  }

  const emptyStateContent = getEmptyStateContent()
  const selectedStatusItem = statusItems.find(item => item.value === selectedStatus)
  const emptyStateIcon = (selectedStatusItem?.icon || Building2) as LucideIcon

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
        icon={Building2} 
        title="Entreprises" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher des entreprises..."
      />
      <StickyStatsBar
        icon={Building2}
        stats={[
          { label: 'entreprises au total', value: '89' },
          { label: 'nouvelles cette semaine', value: '12' },
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
        viewDropdownOptions={viewOptions}
        viewDropdownValue={viewType}
        onViewDropdownChange={setViewType}
        viewDropdownWidth={DIMENSION.DROPDOWN_WIDTH}
      />
      {hasResults && displayCompanies.length > NUMBER.ZERO ? (
        viewType === 'cards' ? (
          <Container variant="fullWidth">
            <div style={{ marginTop: SPACING.XL }}>
              <div style={{ width: WIDTH.FULL }}>
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    gap: SPACING.L,
                    flexWrap: FLEX_WRAP.WRAP,
                    paddingBottom: SPACING.XL,
                  }}
                >
                  {displayCompanies.map((company, index) => (
                    <div
                      key={index}
                      style={{
                        flex: `0 0 calc((100% - ${SPACING.L} * ${CALCULATION.GRID_GAP_MULTIPLIER}) / ${CALCULATION.GRID_COLUMN_COUNT})`,
                        width: `calc((100% - ${SPACING.L} * ${CALCULATION.GRID_GAP_MULTIPLIER}) / ${CALCULATION.GRID_COLUMN_COUNT})`,
                      }}
                    >
                      <CompanyCard
                        logo={company.logo}
                        companyName={company.companyName}
                        description={company.description}
                        revenue={company.revenue}
                        location={company.location}
                        website={company.website}
                        sector={company.sector}
                        onAdd={() => {}}
                        onAnalyze={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <>
            <Table
              data={displayCompanies}
              columns={tableColumns}
              getRowBackgroundColor={getAlternatingRowColor}
              showTopBorder={false}
              stickyTopOffset={`calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STICKY_BAR_HEIGHT}) - (${SPACING.L} * 8))`}
            />
          </>
        )
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

