'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { Sparkles, Building2, Eye, ExternalLink, DollarSign, MapPin, Tag, Brain, Plus, ChevronDown, UserPlus, Mail, CheckCircle, Calendar, FileCheck, Archive, Globe, FileText, Wand2 } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { Container } from '../../components/Container'
import { LAYOUT, CALCULATION } from '../../constants/layout'
import { NUMBER } from '../../constants/number'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE, POSITION } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_WRAP, FLEX_DIRECTION, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { BORDER_WIDTH, BORDER_RADIUS, BORDER } from '../../constants/border'
import { DIMENSION } from '../../constants/dimension'
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
import { CompanyCard } from '../prospecthunter-results/components/CompanyCard'
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
import { StatusDropdown } from '../prospecthunter-results/components/StatusDropdown'

export default function SmartSearchResultsPage() {
  const router = useRouter()
  const [viewType, setViewType] = useState('cards')
  const [hasSearchResults, setHasSearchResults] = useState(true) // Show 5 cards by default when page loads
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
    
    // Initial display: 5 cards
    if (displayedCount === NUMBER.ZERO) {
      return generateSearchResults(NUMBER.FIVE)
    }
    
    // After load more clicks: 5 initial + displayedCount additional cards
    // Each load more adds 5 cards, so we add displayedCount cards
    return generateSearchResults(NUMBER.FIVE + displayedCount)
  }

  const displayCompanies = getDisplayedCompanies()
  const hasMoreResults = hasSearchResults // In real app, this would check if there are more results from API
  const resultCount = displayCompanies.length

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
        {displayCompanies.length} résultats trouvés
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
            variant="BLACK"
            onClick={() => router.push('/smartsearch')}
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
      <HelpButton />
      
      {hasSearchResults && displayCompanies.length > NUMBER.ZERO && (
        <Container variant="fullWidth">
          <Card style={{ marginTop: SPACING.XL, marginBottom: SPACING.XL, backgroundColor: COLOR.WHITE, paddingTop: SPACING.XL, paddingBottom: SPACING.XL, paddingRight: SPACING.XXL }}>
            <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.FLEX_START, gap: SPACING.M }}>
              <Wand2 size={ICON_SIZE.L} style={{ color: COLOR.PURPLE, flexShrink: FLEX.ZERO, marginTop: SPACING.XS }} />
              <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.S, flex: FLEX.ONE }}>
                <Heading level={2} style={{ marginBottom: SPACING.ZERO }}>
                  Récapitulatif IA des résultats de recherche
                </Heading>
                <Text size="M" weight="M" color="BLACK">
                  Aujourd'hui, {resultCount} résultat{resultCount <= NUMBER.ONE ? '' : 's'} {resultCount <= NUMBER.ONE ? 'a été' : 'ont été'} identifié{resultCount <= NUMBER.ONE ? '' : 's'} par les agents Dataxx. Ces résultats couvrent les entreprises correspondant à votre recherche, leurs secteurs d'activité, et leurs opportunités de sponsoring sportif en France et à l'international.
                </Text>
              </div>
            </div>
          </Card>
        </Container>
      )}
      
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
                      showJustification={true}
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
                        Lancez une nouvelle recherche pour découvrir 5 entreprises supplémentaires
                      </Text>
                      <Button
                        variant="PURPLE"
                        onClick={() => {
                          setDisplayedCount(prev => prev + NUMBER.FIVE)
                        }}
                        style={{
                          width: WIDTH.AUTO,
                          paddingLeft: SPACING.L,
                          paddingRight: SPACING.L,
                          marginTop: SPACING.M,
                        }}
                      >
                        Afficher 5 de plus
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
                  setDisplayedCount(prev => prev + NUMBER.FIVE)
                }}
                style={{
                  width: WIDTH.AUTO,
                  paddingLeft: SPACING.L,
                  paddingRight: SPACING.L,
          }}
        >
                Afficher 5 de plus
              </Button>
        </div>
          )}
        </>
      )}
    </div>
  )
}

