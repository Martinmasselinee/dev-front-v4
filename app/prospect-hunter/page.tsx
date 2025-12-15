'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Building2, DollarSign, MapPin } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { Card } from '../../components/Card'
import { Container } from '../../components/Container'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT, FLEX_WRAP, FLEX } from '../../constants/flex'
import { TEXT_ALIGN } from '../../constants/text'
import { COLOR } from '../../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../constants/border'
import { ICON_SIZE } from '../../constants/iconSize'
import { ICON_STROKE_WIDTH } from '../../constants/icon'
import { DIMENSION } from '../../constants/dimension'
import { BUSINESS } from '../../constants/business'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { MULTIPLIER } from '../../constants/multiplier'
import { CURSOR } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { OUTLINE } from '../../constants/outline'
import { OVERFLOW } from '../../constants/overflow'
import { STRING } from '../../constants/string'
import { NUMBER } from '../../constants/number'
import { WIDTH } from '../../constants/width'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { Loading } from '../../components/Loading'
import { TIME } from '../../constants/time'

interface FilterOption {
  value: string
  label: string
  region?: string
  department?: string
}

export default function ProspectHunterPage() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('table')
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Filter state management
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['all'])
  const [selectedTurnovers, setSelectedTurnovers] = useState<string[]>(['all'])
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['all'])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(['all'])
  const [selectedCities, setSelectedCities] = useState<string[]>(['all'])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = findOptionOrDefault(viewOptions, viewType)

  // Filter data arrays
  const sectors: FilterOption[] = [
    { value: 'all', label: 'Tous Les Secteurs' },
    { value: 'agriculture', label: 'Agriculture & Agroalimentaire' },
    { value: 'automobile', label: 'Automobile' },
    { value: 'commerce', label: 'Commerce & Distribution' },
    { value: 'construction', label: 'Construction & Immobilier' },
    { value: 'culture', label: 'Culture & Médias' },
    { value: 'finance', label: 'Finance & Assurance' },
    { value: 'hotellerie', label: 'Hôtellerie & Restauration' },
  ]

  const turnovers: FilterOption[] = [
    { value: 'all', label: 'Tous les chiffres d\'affaires' },
    { value: '1-10', label: '1M€ - 10M€' },
    { value: '10-25', label: '10M€ - 25M€' },
    { value: '25-50', label: '25M€ - 50M€' },
    { value: '50-100', label: '50M€ - 100M€' },
    { value: '100-250', label: '100M€ - 250M€' },
    { value: '250-500', label: '250M€ - 500M€' },
    { value: '500-1000', label: '500M€ - 1Md€' },
    { value: '1000-2000', label: '1Md€ - 2Mds€' },
    { value: '2000+', label: '2+ Mds€' },
  ]

  const regions: FilterOption[] = [
    { value: 'all', label: 'Toutes Les Régions' },
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
  ]

  const departments: FilterOption[] = [
    { value: 'all', label: 'Tous Les Départements' },
    { value: 'ain', label: 'Ain', region: 'auvergne-rhone-alpes' },
    { value: 'aisne', label: 'Aisne', region: 'hauts-de-france' },
    { value: 'allier', label: 'Allier', region: 'auvergne-rhone-alpes' },
    { value: 'alpes-de-haute-provence', label: 'Alpes-de-Haute-Provence', region: 'provence-alpes-cote-azur' },
    { value: 'alpes-maritimes', label: 'Alpes-Maritimes', region: 'provence-alpes-cote-azur' },
    { value: 'ardennes', label: 'Ardennes', region: 'grand-est' },
    { value: 'ardeche', label: 'Ardèche', region: 'auvergne-rhone-alpes' },
    { value: 'ariege', label: 'Ariège', region: 'occitanie' },
    { value: 'aube', label: 'Aube', region: 'grand-est' },
    { value: 'aude', label: 'Aude', region: 'occitanie' },
    { value: 'aveyron', label: 'Aveyron', region: 'occitanie' },
    { value: 'bas-rhin', label: 'Bas-Rhin', region: 'grand-est' },
    { value: 'bouches-du-rhone', label: 'Bouches-du-Rhône', region: 'provence-alpes-cote-azur' },
    { value: 'calvados', label: 'Calvados', region: 'normandie' },
    { value: 'charente', label: 'Charente', region: 'nouvelle-aquitaine' },
    { value: 'charente-maritime', label: 'Charente-Maritime', region: 'nouvelle-aquitaine' },
  ]

  const allCities: FilterOption[] = [
    { value: 'all', label: 'Toutes Les Villes' },
    { value: 'lyon', label: 'Lyon', department: 'rhone', region: 'auvergne-rhone-alpes' },
    { value: 'paris', label: 'Paris', department: 'paris', region: 'ile-de-france' },
    { value: 'marseille', label: 'Marseille', department: 'bouches-du-rhone', region: 'provence-alpes-cote-azur' },
    { value: 'toulouse', label: 'Toulouse', department: 'haute-garonne', region: 'occitanie' },
    { value: 'nice', label: 'Nice', department: 'alpes-maritimes', region: 'provence-alpes-cote-azur' },
    { value: 'nantes', label: 'Nantes', department: 'loire-atlantique', region: 'pays-de-la-loire' },
    { value: 'strasbourg', label: 'Strasbourg', department: 'bas-rhin', region: 'grand-est' },
    { value: 'montpellier', label: 'Montpellier', department: 'herault', region: 'occitanie' },
    { value: 'bordeaux', label: 'Bordeaux', department: 'gironde', region: 'nouvelle-aquitaine' },
    { value: 'lille', label: 'Lille', department: 'nord', region: 'hauts-de-france' },
  ]

  const entreprisesCount = 103937
  const decideursCount = entreprisesCount * BUSINESS.DECIDEURS_PER_ENTREPRISE

  // Toggle handlers with "Tous" exclusive logic
  const handleSectorToggle = (value: string) => {
    if (value === 'all') {
      setSelectedSectors(['all'])
    } else {
      setSelectedSectors(prev => {
        const withoutAll = prev.filter(v => v !== 'all')
        if (withoutAll.includes(value)) {
          const newSelection = withoutAll.filter(v => v !== value)
          return newSelection.length === NUMBER.ZERO ? ['all'] : newSelection
        } else {
          return [...withoutAll, value]
        }
      })
    }
  }

  const handleTurnoverToggle = (value: string) => {
    if (value === 'all') {
      setSelectedTurnovers(['all'])
    } else {
      setSelectedTurnovers(prev => {
        const withoutAll = prev.filter(v => v !== 'all')
        if (withoutAll.includes(value)) {
          const newSelection = withoutAll.filter(v => v !== value)
          return newSelection.length === NUMBER.ZERO ? ['all'] : newSelection
        } else {
          return [...withoutAll, value]
        }
      })
    }
  }

  const handleRegionToggle = (value: string) => {
    if (value === 'all') {
      setSelectedRegions(['all'])
      setSelectedDepartments(['all'])
      setSelectedCities(['all'])
    } else {
      setSelectedRegions(prev => {
        const withoutAll = prev.filter(v => v !== 'all')
        if (withoutAll.includes(value)) {
          const newSelection = withoutAll.filter(v => v !== value)
          return newSelection.length === NUMBER.ZERO ? ['all'] : newSelection
        } else {
          return [...withoutAll, value]
        }
      })
    }
  }

  const handleDepartmentToggle = (value: string) => {
    if (value === 'all') {
      setSelectedDepartments(['all'])
      setSelectedCities(['all'])
    } else {
      setSelectedDepartments(prev => {
        const withoutAll = prev.filter(v => v !== 'all')
        if (withoutAll.includes(value)) {
          const newSelection = withoutAll.filter(v => v !== value)
          return newSelection.length === NUMBER.ZERO ? ['all'] : newSelection
        } else {
          return [...withoutAll, value]
        }
      })
    }
  }

  const handleCityToggle = (value: string) => {
    if (value === 'all') {
      setSelectedCities(['all'])
    } else {
      setSelectedCities(prev => {
        const withoutAll = prev.filter(v => v !== 'all')
        if (withoutAll.includes(value)) {
          const newSelection = withoutAll.filter(v => v !== value)
          return newSelection.length === NUMBER.ZERO ? ['all'] : newSelection
        } else {
          return [...withoutAll, value]
        }
      })
    }
  }

  // Cities filtering logic
  const filteredCities = useMemo(() => {
    const hasSpecificRegion = selectedRegions.some(r => r !== 'all')
    const hasSpecificDepartment = selectedDepartments.some(d => d !== 'all')
    
    if (!hasSpecificRegion && !hasSpecificDepartment) {
      return []
    }

    return allCities.filter(city => {
      if (city.value === 'all') return true
      
      if (hasSpecificDepartment) {
        const cityMatchesDepartment = selectedDepartments.some(dept => 
          city.department === dept
        )
        if (cityMatchesDepartment) return true
      }
      
      if (hasSpecificRegion) {
        const cityMatchesRegion = selectedRegions.some(reg => 
          city.region === reg
        )
        if (cityMatchesRegion) return true
      }
      
      return false
    })
  }, [selectedRegions, selectedDepartments])

  const showCitiesColumn = selectedRegions.some(r => r !== 'all') || selectedDepartments.some(d => d !== 'all')

  // Button should be enabled when all filters are 'all' (default state) OR when any filter has changed
  const isSearchEnabled = useMemo(() => {
    const allDefault = 
      selectedSectors.length === NUMBER.ONE && selectedSectors[0] === 'all' &&
      selectedTurnovers.length === NUMBER.ONE && selectedTurnovers[0] === 'all' &&
      selectedRegions.length === NUMBER.ONE && selectedRegions[0] === 'all' &&
      selectedDepartments.length === NUMBER.ONE && selectedDepartments[0] === 'all' &&
      selectedCities.length === NUMBER.ONE && selectedCities[0] === 'all'
    // Enabled when all are 'all' (default) OR when any have changed
    return true
  }, [selectedSectors, selectedTurnovers, selectedRegions, selectedDepartments, selectedCities])

  const handleLaunchSearch = () => {
    setIsLoading(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      router.push('/prospecthunter-results')
    }, TIME.DELAY.LOADING_REDIRECT)
  }

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
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher..."
        hideBorder={true}
        rightElement={
          <Button
            variant="PURPLE"
            disabled={!isSearchEnabled}
            onClick={handleLaunchSearch}
            style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
          >
            {searchValue.trim().length > NUMBER.ZERO ? (
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                }}
              >
                <Text size="M" weight="M" color="WHITE">
                  Lancer recherche
                </Text>
                <Dot marginLeft={SPACING.ZERO} marginRight={SPACING.ZERO} color={COLOR.WHITE} />
                <Text size="M" weight="M" color="WHITE">
                  {entreprisesCount.toLocaleString('fr-FR')} entreprises
                </Text>
              </div>
            ) : (
              'Lancer la recherche'
            )}
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
      
      <Container variant="fullWidth">
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.ROW,
            gap: SPACING.L,
            flexWrap: FLEX_WRAP.WRAP,
            marginTop: SPACING.XL,
            marginBottom: SPACING.XL,
          }}
        >
          {/* Filter Column 1: Secteurs d'activité */}
          <Card
            style={{
              flex: FLEX.ONE,
              minWidth: '200px',
              maxHeight: `calc((${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE} + ${SPACING.XXL}) * ${MULTIPLIER.ICON_SIZE_DOUBLE} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                gap: SPACING.M,
                height: WIDTH.FULL,
                overflow: OVERFLOW.HIDDEN,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                  flexShrink: FLEX.ZERO,
                }}
              >
                <Building2 size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
                <Text size="M" weight="L" color="BLACK">
                  Secteurs d'activité
                </Text>
              </div>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.COLUMN,
                  gap: SPACING.S,
                  overflowY: OVERFLOW.AUTO,
                  flex: FLEX.ONE,
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.ROW,
                    flexWrap: FLEX_WRAP.WRAP,
                    gap: SPACING.S,
                  }}
                >
                  {sectors.map((sector) => {
                    const isSelected = selectedSectors.includes(sector.value)
                    return (
                      <button
                        key={sector.value}
                        type="button"
                        onClick={() => handleSectorToggle(sector.value)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.PURPLE
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
                          }
                        }}
                        style={{
                          paddingLeft: SPACING.M,
                          paddingRight: SPACING.M,
                          paddingTop: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          paddingBottom: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          width: WIDTH.AUTO,
                        backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
                        border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
                        borderRadius: BORDER_RADIUS.M,
                        cursor: CURSOR.POINTER,
                        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
                        outline: OUTLINE.NONE,
                        textAlign: TEXT_ALIGN.LEFT,
                      }}
                    >
                      <Text
                        size="M"
                        weight={isSelected ? 'L' : 'M'}
                        style={{
                          color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                          transition: `color ${TRANSITION.FAST_EASE}`,
                        }}
                      >
                        {sector.label}
                      </Text>
                    </button>
                  )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Filter Column 2: Chiffre d'affaires */}
          <Card
            style={{
              flex: FLEX.ONE,
              minWidth: '200px',
              maxHeight: `calc((${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE} + ${SPACING.XXL}) * ${MULTIPLIER.ICON_SIZE_DOUBLE} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                gap: SPACING.M,
                height: WIDTH.FULL,
                overflow: OVERFLOW.HIDDEN,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                  flexShrink: FLEX.ZERO,
                }}
              >
                <DollarSign size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
                <Text size="M" weight="L" color="BLACK">
                  Chiffre d'affaires
                </Text>
              </div>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.COLUMN,
                  gap: SPACING.S,
                  overflowY: OVERFLOW.AUTO,
                  flex: FLEX.ONE,
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.ROW,
                    flexWrap: FLEX_WRAP.WRAP,
                    gap: SPACING.S,
                  }}
                >
                  {turnovers.map((turnover) => {
                    const isSelected = selectedTurnovers.includes(turnover.value)
                    return (
                      <button
                        key={turnover.value}
                        type="button"
                        onClick={() => handleTurnoverToggle(turnover.value)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.PURPLE
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
                          }
                        }}
                        style={{
                          paddingLeft: SPACING.M,
                          paddingRight: SPACING.M,
                          paddingTop: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          paddingBottom: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          width: WIDTH.AUTO,
                        backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
                        border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
                        borderRadius: BORDER_RADIUS.M,
                        cursor: CURSOR.POINTER,
                        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
                        outline: OUTLINE.NONE,
                        textAlign: TEXT_ALIGN.LEFT,
                      }}
                    >
                      <Text
                        size="M"
                        weight={isSelected ? 'L' : 'M'}
                        style={{
                          color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                          transition: `color ${TRANSITION.FAST_EASE}`,
                        }}
                      >
                        {turnover.label}
                      </Text>
                    </button>
                  )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Filter Column 3: Région */}
          <Card
            style={{
              flex: FLEX.ONE,
              minWidth: '200px',
              maxHeight: `calc((${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE} + ${SPACING.XXL}) * ${MULTIPLIER.ICON_SIZE_DOUBLE} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                gap: SPACING.M,
                height: WIDTH.FULL,
                overflow: OVERFLOW.HIDDEN,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                  flexShrink: FLEX.ZERO,
                }}
              >
                <MapPin size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
                <Text size="M" weight="L" color="BLACK">
                  Région
                </Text>
              </div>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.COLUMN,
                  gap: SPACING.S,
                  overflowY: OVERFLOW.AUTO,
                  flex: FLEX.ONE,
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.ROW,
                    flexWrap: FLEX_WRAP.WRAP,
                    gap: SPACING.S,
                  }}
                >
                  {regions.map((region) => {
                    const isSelected = selectedRegions.includes(region.value)
                    return (
                      <button
                        key={region.value}
                        type="button"
                        onClick={() => handleRegionToggle(region.value)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.PURPLE
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
                          }
                        }}
                        style={{
                          paddingLeft: SPACING.M,
                          paddingRight: SPACING.M,
                          paddingTop: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          paddingBottom: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          width: WIDTH.AUTO,
                        backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
                        border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
                        borderRadius: BORDER_RADIUS.M,
                        cursor: CURSOR.POINTER,
                        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
                        outline: OUTLINE.NONE,
                        textAlign: TEXT_ALIGN.LEFT,
                      }}
                    >
                      <Text
                        size="M"
                        weight={isSelected ? 'L' : 'M'}
                        style={{
                          color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                          transition: `color ${TRANSITION.FAST_EASE}`,
                        }}
                      >
                        {region.label}
                      </Text>
                    </button>
                  )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Filter Column 4: Département */}
          <Card
            style={{
              flex: FLEX.ONE,
              minWidth: '200px',
              maxHeight: `calc((${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE} + ${SPACING.XXL}) * ${MULTIPLIER.ICON_SIZE_DOUBLE} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                gap: SPACING.M,
                height: WIDTH.FULL,
                overflow: OVERFLOW.HIDDEN,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                  flexShrink: FLEX.ZERO,
                }}
              >
                <MapPin size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
                <Text size="M" weight="L" color="BLACK">
                  Département
                </Text>
              </div>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.COLUMN,
                  gap: SPACING.S,
                  overflowY: OVERFLOW.AUTO,
                  flex: FLEX.ONE,
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.ROW,
                    flexWrap: FLEX_WRAP.WRAP,
                    gap: SPACING.S,
                  }}
                >
                  {departments.map((department) => {
                    const isSelected = selectedDepartments.includes(department.value)
                    return (
                      <button
                        key={department.value}
                        type="button"
                        onClick={() => handleDepartmentToggle(department.value)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.PURPLE
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
                          }
                        }}
                        style={{
                          paddingLeft: SPACING.M,
                          paddingRight: SPACING.M,
                          paddingTop: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          paddingBottom: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
                          width: WIDTH.AUTO,
                        backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
                        border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
                        borderRadius: BORDER_RADIUS.M,
                        cursor: CURSOR.POINTER,
                        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
                        outline: OUTLINE.NONE,
                        textAlign: TEXT_ALIGN.LEFT,
                      }}
                    >
                      <Text
                        size="M"
                        weight={isSelected ? 'L' : 'M'}
                        style={{
                          color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                          transition: `color ${TRANSITION.FAST_EASE}`,
                        }}
                      >
                        {department.label}
                      </Text>
                    </button>
                  )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Filter Column 5: Cities (conditional) */}
          {showCitiesColumn && (
            <Card
              style={{
                flex: FLEX.ONE,
                minWidth: '200px',
                maxHeight: `calc((${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE} + ${SPACING.XXL}) * ${MULTIPLIER.ICON_SIZE_DOUBLE} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.COLUMN,
                  gap: SPACING.M,
                  height: WIDTH.FULL,
                  overflow: OVERFLOW.HIDDEN,
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    alignItems: ALIGN_ITEMS.CENTER,
                    gap: SPACING.S,
                    flexShrink: FLEX.ZERO,
                  }}
                >
                  <MapPin size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
                  <Text size="M" weight="L" color="BLACK">
                    Villes
                  </Text>
                </div>
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.COLUMN,
                    gap: SPACING.S,
                    overflowY: OVERFLOW.AUTO,
                    flex: FLEX.ONE,
                  }}
                >
                  <div
                    style={{
                      display: DISPLAY.FLEX,
                      flexDirection: FLEX_DIRECTION.ROW,
                      flexWrap: FLEX_WRAP.WRAP,
                      gap: SPACING.S,
                    }}
                  >
                    {filteredCities.map((city) => {
                      const isSelected = selectedCities.includes(city.value)
                      return (
                        <button
                          key={city.value}
                          type="button"
                          onClick={() => handleCityToggle(city.value)}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = COLOR.PURPLE
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
                            }
                          }}
                          style={{
                            paddingLeft: SPACING.M,
                            paddingRight: SPACING.M,
                            paddingTop: `calc(${SPACING.S} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
                            paddingBottom: `calc(${SPACING.S} * (${MULTIPLIER.HEIGHT_EIGHTY} + (${MULTIPLIER.SIDEBAR_WIDTH_NINETY} - ${MULTIPLIER.HEIGHT_EIGHTY}) / ${MULTIPLIER.ICON_SIZE_DOUBLE}))`,
                            width: WIDTH.AUTO,
                          backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
                          border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
                          borderRadius: BORDER_RADIUS.M,
                          cursor: CURSOR.POINTER,
                          transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
                          outline: OUTLINE.NONE,
                          textAlign: TEXT_ALIGN.LEFT,
                        }}
                      >
                        <Text
                          size="M"
                          weight={isSelected ? 'L' : 'M'}
                          style={{
                            color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                            transition: `color ${TRANSITION.FAST_EASE}`,
                          }}
                        >
                          {city.label}
                        </Text>
                      </button>
                    )
                    })}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Empty State - rendered directly without Container wrapper to remove extra padding */}
        <div
          style={{
            width: WIDTH.FULL,
            paddingTop: SPACING.XL,
            paddingLeft: SPACING.ZERO,
            paddingRight: SPACING.ZERO,
            paddingBottom: SPACING.XXL,
            backgroundColor: COLOR.GREY.LIGHT,
            border: `${BORDER_WIDTH.MEDIUM} dashed ${COLOR.GREY.MEDIUM}`,
            borderRadius: BORDER_RADIUS.L,
            marginTop: SPACING.XL,
          }}
        >
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.M,
            }}
          >
            {/* Icon */}
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.CENTER,
              }}
            >
              <Search
                size={ICON_SIZE.XXL}
                strokeWidth={ICON_STROKE_WIDTH.DEFAULT}
                style={{
                  color: COLOR.GREY.DARK,
                }}
              />
            </div>

            {/* Text content */}
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.XS,
              }}
            >
              <Text
                size="L"
                weight="XL"
                color="BLACK"
                style={{
                  textAlign: TEXT_ALIGN.CENTER,
                }}
              >
                Sélectionnez vos critères
              </Text>
              <div
                style={{
                  maxWidth: DIMENSION.EMPTY_STATE_SUBTITLE_MAX_WIDTH,
                }}
              >
                <Text
                  size="M"
                  weight="M"
                  color="GREY_DARK"
                  style={{
                    textAlign: TEXT_ALIGN.CENTER,
                  }}
                >
                  Utilisez les filtres ci-dessus pour sélectionner le type d'entreprises et de décideurs que vous recherchez
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Loading message="Recherche en cours..." isVisible={isLoading} />
    </div>
  )
}

