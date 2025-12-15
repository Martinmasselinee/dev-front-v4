'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Building2 } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { Container } from '../../components/Container'
import { LAYOUT, CALCULATION } from '../../constants/layout'
import { NUMBER } from '../../constants/number'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_WRAP, FLEX_DIRECTION, JUSTIFY_CONTENT } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { BORDER_WIDTH, BORDER_RADIUS } from '../../constants/border'
import { DIMENSION } from '../../constants/dimension'
import { BUSINESS } from '../../constants/business'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { MULTIPLIER } from '../../constants/multiplier'
import { WIDTH } from '../../constants/width'
import { CURSOR } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { OUTLINE } from '../../constants/outline'
import { TEXT_ALIGN } from '../../constants/text'
import { FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Bubble } from '../../components/Bubble'
import { CompanyCard } from './components/CompanyCard'

export default function ProspectHunterResultsPage() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('table')
  const [hasSearchResults, setHasSearchResults] = useState(true) // Show 29 cards by default when page loads
  const [displayedCount, setDisplayedCount] = useState(NUMBER.ZERO)

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

  // Mock companies data
  const mockCompanies = [
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
      
      <Container variant="fullWidth">
        <div style={{ marginTop: SPACING.XL }}>
          <div style={{ width: WIDTH.FULL }}>
            <div
              style={{
                display: DISPLAY.FLEX,
                gap: SPACING.L,
                flexWrap: FLEX_WRAP.WRAP,
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
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

