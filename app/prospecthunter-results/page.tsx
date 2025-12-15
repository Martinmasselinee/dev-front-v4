'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { Search, Building2, Eye, ExternalLink, DollarSign, MapPin, Tag, Brain, Plus, ChevronDown, UserPlus, Mail, CheckCircle, Calendar, FileCheck, Archive, Globe, FileText } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { Container } from '../../components/Container'
import { LAYOUT, CALCULATION } from '../../constants/layout'
import { NUMBER } from '../../constants/number'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_WRAP, FLEX_DIRECTION, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { BORDER_WIDTH, BORDER_RADIUS, BORDER } from '../../constants/border'
import { DIMENSION } from '../../constants/dimension'
import { BUSINESS } from '../../constants/business'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { MULTIPLIER } from '../../constants/multiplier'
import { WIDTH } from '../../constants/width'
import { CURSOR } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { OUTLINE } from '../../constants/outline'
import { TEXT_ALIGN, TEXT_OVERFLOW, WHITE_SPACE, TEXT_TRANSFORM, LETTER_SPACING, TEXT_DECORATION } from '../../constants/text'
import { FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Bubble } from '../../components/Bubble'
import { CompanyCard } from './components/CompanyCard'
import { ICON_SIZE } from '../../constants/iconSize'
import { ICON_STROKE_WIDTH } from '../../constants/icon'
import { Table } from '../../components/Table'
import { TABLE } from '../../constants/table'
import { OVERFLOW } from '../../constants/overflow'
import { getAlternatingRowColor } from '../../lib/tableUtils'
import { Link } from '../../components/Link'
import { IconButton } from '../../components/IconButton'
import { UserInitial } from '../../components/UserInitial'
import { lightenColor } from '../../lib/colorUtils'
import { BUTTON_HEIGHT } from '../../constants/button'
import { INPUT_HEIGHT } from '../../constants/input'
import { POSITION } from '../../constants/position'
import { StatusDropdown } from './components/StatusDropdown'
import { useRef, useMemo } from 'react'

export default function ProspectHunterResultsPage() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('table')
  const [hasSearchResults, setHasSearchResults] = useState(true) // Show 29 cards by default when page loads
  const [displayedCount, setDisplayedCount] = useState<number>(NUMBER.ZERO)
  const [isLoadMoreHovered, setIsLoadMoreHovered] = useState(false)
  
  // Status/owner state per row (keyed by company index)
  const [rowStatuses, setRowStatuses] = useState<Record<number, string | null>>({})
  const [rowOwners, setRowOwners] = useState<Record<number, string | null>>({})
  const [openStatusDropdowns, setOpenStatusDropdowns] = useState<Record<number, boolean>>({})
  const [openOwnerDropdowns, setOpenOwnerDropdowns] = useState<Record<number, boolean>>({})
  
  // Refs for status and owner buttons per row
  const statusButtonRefs = useMemo(() => new Map<number, React.RefObject<HTMLButtonElement>>(), [])
  const ownerButtonRefs = useMemo(() => new Map<number, React.RefObject<HTMLButtonElement>>(), [])
  
  // Helper to get or create ref for a row
  const getStatusButtonRef = (rowIndex: number) => {
    if (!statusButtonRefs.has(rowIndex)) {
      statusButtonRefs.set(rowIndex, { current: null })
    }
    return statusButtonRefs.get(rowIndex)!
  }
  
  const getOwnerButtonRef = (rowIndex: number) => {
    if (!ownerButtonRefs.has(rowIndex)) {
      ownerButtonRefs.set(rowIndex, { current: null })
    }
    return ownerButtonRefs.get(rowIndex)!
  }

  // Status and owner options (same as CompanyCard)
  const statusOptions = [
    { value: 'prospects', label: 'Prospects', icon: UserPlus },
    { value: 'a_contacter', label: 'À contacter', icon: Mail },
    { value: 'contacte', label: 'Contacté', icon: CheckCircle },
    { value: 'meetings', label: 'Meetings', icon: Calendar },
    { value: 'contrats', label: 'Contrats', icon: FileCheck },
    { value: 'archive', label: 'Archivé', icon: Archive },
  ]

  const ownerOptions = [
    { value: 'martin', label: 'Martin Masseline', firstName: 'Martin' },
    { value: 'sarah', label: 'Sarah Dupont', firstName: 'Sarah' },
    { value: 'pierre', label: 'Pierre Martin', firstName: 'Pierre' },
  ]

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = findOptionOrDefault(viewOptions, viewType)

  const entreprisesCount = 103937
  const decideursCount = entreprisesCount * BUSINESS.DECIDEURS_PER_ENTREPRISE

  // Mock selected filters (excluding 'all' values)
  const mockSelectedFilters = {
    sectors: ['agriculture', 'automobile'],
    turnovers: ['25-50'],
    regions: ['ile-de-france'],
    departments: ['paris'],
    cities: ['paris'],
  }

  // Filter option arrays for label lookup
  const filterOptions = {
    sectors: [
      { value: 'agriculture', label: 'Agriculture & Agroalimentaire' },
      { value: 'automobile', label: 'Automobile' },
      { value: 'commerce', label: 'Commerce & Distribution' },
      { value: 'construction', label: 'Construction & Immobilier' },
      { value: 'culture', label: 'Culture & Médias' },
      { value: 'finance', label: 'Finance & Assurance' },
      { value: 'hotellerie', label: 'Hôtellerie & Restauration' },
    ],
    turnovers: [
      { value: '1-10', label: '1M€ - 10M€' },
      { value: '10-25', label: '10M€ - 25M€' },
      { value: '25-50', label: '25M€ - 50M€' },
      { value: '50-100', label: '50M€ - 100M€' },
      { value: '100-250', label: '100M€ - 250M€' },
      { value: '250-500', label: '250M€ - 500M€' },
      { value: '500-1000', label: '500M€ - 1Md€' },
      { value: '1000-2000', label: '1Md€ - 2Mds€' },
      { value: '2000+', label: '2+ Mds€' },
    ],
    regions: [
      { value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes' },
      { value: 'bourgogne-franche-comte', label: 'Bourgogne-Franche-Comté' },
      { value: 'bretagne', label: 'Bretagne' },
      { value: 'centre-val-de-loire', label: 'Centre-Val de Loire' },
      { value: 'corse', label: 'Corse' },
      { value: 'dom-tom', label: 'Dom-Tom' },
      { value: 'grand-est', label: 'Grand Est' },
      { value: 'hauts-de-france', label: 'Hauts-de-France' },
      { value: 'normandie', label: 'Normandie' },
      { value: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine' },
      { value: 'occitanie', label: 'Occitanie' },
      { value: 'pays-de-la-loire', label: 'Pays de la Loire' },
      { value: 'provence-alpes-cote-azur', label: 'Provence-Alpes-Côte d\'Azur' },
      { value: 'ile-de-france', label: 'Île-de-France' },
    ],
    departments: [
      { value: 'ain', label: 'Ain' },
      { value: 'aisne', label: 'Aisne' },
      { value: 'allier', label: 'Allier' },
      { value: 'alpes-de-haute-provence', label: 'Alpes-de-Haute-Provence' },
      { value: 'alpes-maritimes', label: 'Alpes-Maritimes' },
      { value: 'ardennes', label: 'Ardennes' },
      { value: 'ardeche', label: 'Ardèche' },
      { value: 'ariege', label: 'Ariège' },
      { value: 'aube', label: 'Aube' },
      { value: 'aude', label: 'Aude' },
      { value: 'aveyron', label: 'Aveyron' },
      { value: 'bas-rhin', label: 'Bas-Rhin' },
      { value: 'bouches-du-rhone', label: 'Bouches-du-Rhône' },
      { value: 'calvados', label: 'Calvados' },
      { value: 'charente', label: 'Charente' },
      { value: 'charente-maritime', label: 'Charente-Maritime' },
      { value: 'paris', label: 'Paris' },
      { value: 'rhone', label: 'Rhône' },
    ],
    cities: [
      { value: 'lyon', label: 'Lyon' },
      { value: 'paris', label: 'Paris' },
      { value: 'marseille', label: 'Marseille' },
      { value: 'toulouse', label: 'Toulouse' },
      { value: 'nice', label: 'Nice' },
      { value: 'nantes', label: 'Nantes' },
      { value: 'strasbourg', label: 'Strasbourg' },
      { value: 'montpellier', label: 'Montpellier' },
      { value: 'bordeaux', label: 'Bordeaux' },
      { value: 'lille', label: 'Lille' },
    ],
  }

  // Get filter labels for display
  const getFilterLabel = (type: keyof typeof filterOptions, value: string): string => {
    const option = filterOptions[type].find((opt) => opt.value === value)
    return option?.label || value
  }

  // Company type for table
  type Company = {
    logo?: string
    companyName: string
    description: string
    revenue: string
    location: string
    website?: string
    sector: string
  }

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

  // Generate search result cards (reuse mock data)
  const generateSearchResults = (count: number) => {
    return Array.from({ length: count }, () => mockCompanies[NUMBER.ZERO])
  }

  // Calculate displayed companies
  const getDisplayedCompanies = () => {
    if (!hasSearchResults) {
      return mockCompanies
    }
    
    // Initial display: 29 cards
    if (displayedCount === NUMBER.ZERO) {
      return generateSearchResults(NUMBER.THIRTY - NUMBER.ONE)
    }
    
    // After load more clicks: 29 initial + displayedCount additional cards
    // The load more card becomes the first of the new 30, so we add displayedCount cards
    return generateSearchResults((NUMBER.THIRTY - NUMBER.ONE) + displayedCount)
  }

  const displayCompanies = getDisplayedCompanies()
  const hasMoreResults = hasSearchResults // In real app, this would check if there are more results from API

  // Build array of selected filters with labels
  const selectedFiltersWithLabels = [
    ...mockSelectedFilters.sectors.map((value) => ({
      type: 'sectors' as const,
      value,
      label: getFilterLabel('sectors', value),
    })),
    ...mockSelectedFilters.turnovers.map((value) => ({
      type: 'turnovers' as const,
      value,
      label: getFilterLabel('turnovers', value),
    })),
    ...mockSelectedFilters.regions.map((value) => ({
      type: 'regions' as const,
      value,
      label: getFilterLabel('regions', value),
    })),
    ...mockSelectedFilters.departments.map((value) => ({
      type: 'departments' as const,
      value,
      label: getFilterLabel('departments', value),
    })),
    ...mockSelectedFilters.cities.map((value) => ({
      type: 'cities' as const,
      value,
      label: getFilterLabel('cities', value),
    })),
  ]

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        103 937 entreprises dans la base de données
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {decideursCount.toLocaleString('fr-FR')} décideurs
      </Text>
    </div>
  )

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
        icon={Search} 
        title="Prospect Hunter" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value)
          if (value.trim()) {
            setHasSearchResults(true)
            setDisplayedCount(NUMBER.ZERO) // Reset to show 29 cards initially
          } else {
            setHasSearchResults(false)
            setDisplayedCount(NUMBER.ZERO)
          }
        }}
        searchPlaceholder="Rechercher..."
        hideBorder={true}
        rightElement={
          <Button
            variant="BLACK"
            onClick={() => router.push('/prospect-hunter')}
            style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
          >
            Nouvelle recherche
          </Button>
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
      <div
        style={{
          width: WIDTH.FULL,
          backgroundColor: COLOR.WHITE,
          borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
          paddingLeft: SPACING.L,
          paddingRight: SPACING.L,
          paddingTop: SPACING.S,
          paddingBottom: SPACING.S,
        }}
      >
        <div
          className="filter-bubbles-container"
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            flexWrap: FLEX_WRAP.WRAP,
            gap: SPACING.S,
          }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              .filter-bubbles-container span[data-bubble] svg {
                display: none !important;
              }
              .filter-bubbles-container span[data-bubble] {
                cursor: default !important;
              }
              .filter-bubbles-container span[data-bubble]:hover {
                background-color: ${COLOR.WHITE} !important;
              }
              .filter-bubbles-container span[data-bubble] p,
              .filter-bubbles-container span[data-bubble] span {
                color: ${COLOR.BLACK} !important;
                font-size: ${FONT_SIZE.M} !important;
                font-weight: ${FONT_THICKNESS.M} !important;
              }
            `
          }} />
          {selectedFiltersWithLabels.map((filter, index) => (
            <Bubble
              key={`${filter.type}-${filter.value}-${index}`}
              style={{
                backgroundColor: COLOR.WHITE,
                border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
                paddingTop: SPACING.XS,
                paddingBottom: SPACING.XS,
              }}
            >
              {filter.label}
            </Bubble>
          ))}
        </div>
      </div>
      <HelpButton />
      
      {viewType === 'cards' ? (
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
                {hasSearchResults && hasMoreResults && (
                  <div
                    style={{
                      flex: `0 0 calc((100% - ${SPACING.L} * ${CALCULATION.GRID_GAP_MULTIPLIER}) / ${CALCULATION.GRID_COLUMN_COUNT})`,
                      width: `calc((100% - ${SPACING.L} * ${CALCULATION.GRID_GAP_MULTIPLIER}) / ${CALCULATION.GRID_COLUMN_COUNT})`,
                    }}
                  >
                    <Card
                      variant="default"
                      style={{
                        display: DISPLAY.FLEX,
                        flexDirection: FLEX_DIRECTION.COLUMN,
                        alignItems: ALIGN_ITEMS.CENTER,
                        justifyContent: JUSTIFY_CONTENT.CENTER,
                        height: WIDTH.FULL,
                        paddingTop: SPACING.XXL,
                        paddingBottom: SPACING.XXL,
                        paddingLeft: SPACING.L,
                        paddingRight: SPACING.L,
                        gap: SPACING.M,
                        cursor: CURSOR.POINTER,
                        transition: `border-color ${TRANSITION.FAST_EASE}`,
                      }}
                      onMouseEnter={() => setIsLoadMoreHovered(true)}
                      onMouseLeave={() => setIsLoadMoreHovered(false)}
                    >
                      <Eye 
                        size={ICON_SIZE.XL} 
                        style={{ 
                          color: isLoadMoreHovered ? COLOR.PURPLE : COLOR.GREY.MEDIUM,
                          strokeWidth: ICON_STROKE_WIDTH.DEFAULT,
                          transition: `color ${TRANSITION.FAST_EASE}`,
                        }} 
                      />
                      <Heading style={{ textAlign: TEXT_ALIGN.CENTER, marginTop: SPACING.ZERO, marginBottom: SPACING.ZERO }}>
                        Découvrir plus d'entreprises
                      </Heading>
                      <Text 
                        size="M" 
                        weight="M" 
                        color="GREY_DARK" 
                        style={{ textAlign: TEXT_ALIGN.CENTER, marginTop: SPACING.ZERO, marginBottom: SPACING.ZERO }}
                      >
                        Lancez une nouvelle recherche pour découvrir 30 entreprises supplémentaires
                      </Text>
                      <Button
                        variant="PURPLE"
                        onClick={() => {
                          setDisplayedCount(prev => prev + NUMBER.THIRTY)
                        }}
                        style={{
                          width: WIDTH.AUTO,
                          paddingLeft: SPACING.L,
                          paddingRight: SPACING.L,
                          marginTop: SPACING.M,
                        }}
                      >
                        Afficher 30 de plus
                      </Button>
                    </Card>
                  </div>
                )}
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
              />
          {hasSearchResults && hasMoreResults && (
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.CENTER,
                paddingTop: SPACING.XL,
                paddingBottom: SPACING.XL,
              }}
            >
              <Button
                variant="PURPLE"
                onClick={() => {
                  setDisplayedCount(prev => prev + NUMBER.THIRTY)
                }}
                style={{
                  width: WIDTH.AUTO,
                  paddingLeft: SPACING.L,
                  paddingRight: SPACING.L,
                }}
              >
                Afficher 30 de plus
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

