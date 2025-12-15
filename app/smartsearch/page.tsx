'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Clock, Wand2, Filter } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_DIRECTION, FLEX_WRAP, JUSTIFY_CONTENT } from '../../constants/flex'
import { COLOR } from '../../constants/color'
import { BORDER, BORDER_WIDTH } from '../../constants/border'
import { NUMBER } from '../../constants/number'
import { TIME } from '../../constants/time'
import { ICON_SIZE } from '../../constants/iconSize'
import { DIMENSION } from '../../constants/dimension'
import { MULTIPLIER } from '../../constants/multiplier'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { WIDTH } from '../../constants/width'
import { STRING } from '../../constants/string'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Bubble } from '../../components/Bubble'
import { Container } from '../../components/Container'
import { Spacer } from '../../components/Spacer'
import { Popup } from '../../components/Popup'
import { Checkbox } from '../../components/Checkbox'
import { UserInitial } from '../../components/UserInitial'
import { INPUT_HEIGHT, INPUT_PADDING } from '../../constants/input'
import { BUTTON_HEIGHT } from '../../constants/button'
import { LINE_HEIGHT, FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { OUTLINE } from '../../constants/outline'
import { Z_INDEX } from '../../constants/zIndex'
import { POINTER_EVENTS } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { TEXT_TRANSFORM, LETTER_SPACING } from '../../constants/text'
import { lightenColor } from '../../lib/colorUtils'

interface SearchHistoryItem {
  date: Date
  prompt: string
  faviconUrls: string[]
  aiAnswer: string
  user: string
}

export default function SmartSearchPage() {
  const [viewType, setViewType] = useState('table')
  const [recherchesLancees, setRecherchesLancees] = useState(STRING.ZERO)
  const [searchValue, setSearchValue] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(NUMBER.ZERO)
  const [visibleCardsCount, setVisibleCardsCount] = useState(NUMBER.ONE * 5)
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
  const [excludeSponsors, setExcludeSponsors] = useState(false)
  const [initialExcludeSponsors, setInitialExcludeSponsors] = useState(false)
  
  // Reset initial values when popup opens
  useEffect(() => {
    if (isFilterPopupOpen) {
      setInitialExcludeSponsors(excludeSponsors)
    }
  }, [isFilterPopupOpen])
  
  // Check if anything has been changed
  const hasFilterChanges = excludeSponsors !== initialExcludeSponsors
  
  const handleConfirmFilters = () => {
    // Save the filter values
    setInitialExcludeSponsors(excludeSponsors)
    setIsFilterPopupOpen(false)
  }
  const veryLightGrey = lightenColor(COLOR.GREY.LIGHT, MULTIPLIER.COLOR_LIGHTEN_FORTY)
  const minSearchLength = NUMBER.ONE + NUMBER.ONE + NUMBER.ONE
  const isSearchValid = searchValue.trim().length > minSearchLength

  const placeholderExamples = [
    'Trouve moi des entreprises qui ont investit dans le Tour de France 2024',
    'Quels sponsors ont soutenu les équipes de football en Ligue 1 cette saison ?',
    'Entreprises partenaires du Paris 2024 et de ses événements',
    'Marques qui collaborent avec des athlètes français en tennis',
    'Sponsors des clubs de rugby en Top 14 pour la saison 2024-2025',
    'Entreprises qui ont signé des contrats de sponsoring avec des événements sportifs majeurs',
  ]

  const currentPlaceholder = placeholderExamples[placeholderIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + NUMBER.ONE) % placeholderExamples.length)
    }, TIME.INTERVAL.ROTATING_TEXT)

    return () => clearInterval(interval)
  }, [])

  const viewOptions = [
    { value: 'table', label: 'Table' },
    { value: 'cards', label: 'Cartes' },
  ]

  const selectedViewOption = findOptionOrDefault(viewOptions, viewType)

  const formatDateTime = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const searchHistoryItems: SearchHistoryItem[] = [
    {
      date: new Date(2024, 0, 15, 14, 30),
      prompt: 'Entreprises de technologie dans le secteur du sport',
      faviconUrls: [
        'https://www.google.com/favicon.ico',
        'https://www.apple.com/favicon.ico',
        'https://www.microsoft.com/favicon.ico',
        'https://www.amazon.com/favicon.ico',
        'https://www.facebook.com/favicon.ico',
        'https://www.twitter.com/favicon.ico',
        'https://www.linkedin.com/favicon.ico',
      ],
      aiAnswer: 'J\'ai trouvé plusieurs entreprises de technologie qui travaillent dans le secteur du sport. Ces entreprises proposent des solutions innovantes pour améliorer les performances sportives, la gestion des équipes et l\'expérience des fans.',
      user: 'Martin Masseline',
    },
    {
      date: new Date(2024, 0, 14, 10, 15),
      prompt: 'Décideurs dans les clubs de football en France',
      faviconUrls: [
        'https://www.psg.fr/favicon.ico',
        'https://www.ol.fr/favicon.ico',
        'https://www.om.net/favicon.ico',
      ],
      aiAnswer: 'Les principaux décideurs des clubs de football français se concentrent sur le développement stratégique, la gestion des joueurs et les partenariats commerciaux. Ces dirigeants cherchent constamment de nouveaux sponsors et opportunités de croissance.',
      user: 'Sophie Dubois',
    },
    {
      date: new Date(2024, 0, 13, 16, 45),
      prompt: 'Startups dans l\'esport et le gaming',
      faviconUrls: [
        'https://www.twitch.tv/favicon.ico',
        'https://www.discord.com/favicon.ico',
      ],
      aiAnswer: 'Le secteur de l\'esport connaît une croissance exponentielle avec de nombreuses startups innovantes. Ces entreprises développent des plateformes de streaming, des outils de gestion d\'équipes et des solutions de monétisation pour les joueurs professionnels.',
      user: 'Thomas Bernard',
    },
    {
      date: new Date(2024, 0, 12, 9, 20),
      prompt: 'Marques de sportswear partenaires des Jeux Olympiques',
      faviconUrls: [
        'https://www.nike.com/favicon.ico',
        'https://www.adidas.com/favicon.ico',
        'https://www.puma.com/favicon.ico',
      ],
      aiAnswer: 'Plusieurs grandes marques de sportswear sont partenaires officiels des Jeux Olympiques. Ces entreprises investissent massivement dans le sponsoring d\'athlètes et d\'événements sportifs majeurs pour renforcer leur image de marque.',
      user: 'Marie Leclerc',
    },
    {
      date: new Date(2024, 0, 11, 15, 10),
      prompt: 'Entreprises françaises sponsorisant le Tour de France',
      faviconUrls: [
        'https://www.carrefour.com/favicon.ico',
        'https://www.lcl.fr/favicon.ico',
      ],
      aiAnswer: 'De nombreuses entreprises françaises sont partenaires du Tour de France, l\'un des événements cyclistes les plus prestigieux au monde. Ces sponsors bénéficient d\'une visibilité exceptionnelle pendant la compétition.',
      user: 'Pierre Martin',
    },
    {
      date: new Date(2024, 0, 10, 11, 30),
      prompt: 'Décideurs dans les fédérations sportives internationales',
      faviconUrls: [
        'https://www.fifa.com/favicon.ico',
        'https://www.olympics.com/favicon.ico',
      ],
      aiAnswer: 'Les décideurs des fédérations sportives internationales jouent un rôle crucial dans la gouvernance du sport mondial. Ils sont responsables de la gestion des compétitions, des règles et des partenariats stratégiques.',
      user: 'Julie Rousseau',
    },
    {
      date: new Date(2024, 0, 9, 14, 45),
      prompt: 'Marques de boissons énergisantes dans le sport',
      faviconUrls: [
        'https://www.redbull.com/favicon.ico',
        'https://www.monsterenergy.com/favicon.ico',
      ],
      aiAnswer: 'Les marques de boissons énergisantes sont très actives dans le sponsoring sportif, notamment dans les sports extrêmes et les compétitions automobiles. Elles ciblent un public jeune et dynamique.',
      user: 'Antoine Moreau',
    },
    {
      date: new Date(2024, 0, 8, 16, 20),
      prompt: 'Entreprises technologiques partenaires des clubs de football européens',
      faviconUrls: [
        'https://www.samsung.com/favicon.ico',
        'https://www.sony.com/favicon.ico',
        'https://www.intel.com/favicon.ico',
      ],
      aiAnswer: 'Les entreprises technologiques investissent de plus en plus dans le sponsoring de clubs de football européens. Ces partenariats leur permettent d\'accéder à un public mondial et de promouvoir leurs innovations.',
      user: 'Camille Petit',
    },
  ]

  const visibleCards = searchHistoryItems.slice(NUMBER.ZERO, visibleCardsCount)
  const hasMoreCards = visibleCardsCount < searchHistoryItems.length
  const cardsToLoad = NUMBER.ONE * 10

  const handleLoadMore = () => {
    setVisibleCardsCount((prev) => Math.min(prev + cardsToLoad, searchHistoryItems.length))
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
        Des millions d'entreprises à portée de clic
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {recherchesLancees} recherches déjà lancées
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
        icon={Sparkles} 
        title="SmartSearch" 
        hideBorder={true}
        rightElement={
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.M,
            }}
          >
            <Button
              variant="WHITE"
              onClick={() => setIsFilterPopupOpen(true)}
              icon={<Filter size={ICON_SIZE.M} />}
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
            >
              Filtre
            </Button>
            <Button
              variant="PURPLE"
              disabled={!isSearchValid}
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
            >
              Lancer la recherche
            </Button>
          </div>
        }
      />
      <TopBar 
        icon={Sparkles} 
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
            paddingTop: SPACING.XL,
            paddingBottom: SPACING.XL,
            paddingLeft: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
            paddingRight: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
          }}
        >
          <Card 
            variant="inputContainer" 
            style={{ padding: SPACING.XL }}
            id="smartsearch-input-card"
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
                marginBottom: SPACING.S,
              }}
            >
              <Wand2 size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
              <Text
                size="S"
                weight="S"
                color="BLACK"
                style={{
                  textTransform: TEXT_TRANSFORM.UPPERCASE,
                  marginLeft: SPACING.ZERO,
                  letterSpacing: LETTER_SPACING.TIGHT,
                  fontSize: FONT_SIZE.S,
                }}
              >
                Entrez votre requête
              </Text>
            </div>
            <textarea
              placeholder={currentPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              rows={1}
              className="smartsearch-textarea"
              style={{
                width: WIDTH.FULL,
                height: INPUT_HEIGHT.MAIN,
                paddingLeft: SPACING.ZERO,
                paddingRight: INPUT_PADDING.HORIZONTAL.WITHOUT_ICON,
                paddingTop: `calc(${SPACING.S} - 1px)`,
                paddingBottom: SPACING.ZERO,
                fontSize: FONT_SIZE.M,
                fontWeight: FONT_THICKNESS.M,
                color: COLOR.BLACK,
                backgroundColor: veryLightGrey,
                border: BORDER.NONE,
                outline: OUTLINE.NONE,
                lineHeight: LINE_HEIGHT.SINGLE,
                fontFamily: 'inherit',
                resize: 'none',
                overflow: 'hidden',
              }}
            />
          </Card>

          <Spacer size="XL" />

          {/* Historique des recherches label - outside cards, similar to radar-ai time range labels */}
          <div
            style={{
              width: WIDTH.FULL,
              marginBottom: SPACING.S,
              paddingTop: SPACING.M,
              paddingBottom: SPACING.S,
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.S,
            }}
          >
            <Clock size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
            <Text size="M" weight="M" color="GREY_DARK">
              Historique des recherches
            </Text>
            <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} color={COLOR.GREY.DARK} />
            <Text size="M" weight="M" color="GREY_DARK">
              {searchHistoryItems.length} {searchHistoryItems.length <= NUMBER.ONE ? 'recherche effectuée' : 'recherches effectuées'}
            </Text>
          </div>

          {/* One card per search history item */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.L,
            }}
          >
            {visibleCards.map((item, index) => {
              const visibleFavicons = item.faviconUrls.slice(0, 6)
              const remainingCount = item.faviconUrls.length - 6

              return (
                <Card
                  key={index}
                  variant="default"
                  onClick={() => {
                    // Handle card click - could navigate to search results or fill the input
                    setSearchValue(item.prompt)
                  }}
                  style={{
                    backgroundColor: COLOR.WHITE,
                    position: POSITION_TYPE.RELATIVE,
                  }}
                >
                  <div
                    style={{
                      position: POSITION_TYPE.ABSOLUTE,
                      top: SPACING.M,
                      right: SPACING.M,
                      zIndex: Z_INDEX.COMPONENT_OVERLAY,
                    }}
                  >
                    <UserInitial name={item.user} size="L" />
                  </div>
                  <div
                    style={{
                      display: DISPLAY.FLEX,
                      flexDirection: FLEX_DIRECTION.COLUMN,
                      gap: SPACING.M,
                    }}
                  >
                    <Text size="S" weight="M" color="GREY_DARK">
                      {formatDateTime(item.date)}
                    </Text>

                    <Text size="L" weight="XL" color="BLACK">
                      {item.prompt}
                    </Text>

                    <div
                      style={{
                        display: DISPLAY.FLEX,
                        alignItems: ALIGN_ITEMS.CENTER,
                        gap: SPACING.XS,
                        flexWrap: FLEX_WRAP.WRAP,
                      }}
                    >
                      {visibleFavicons.map((url, faviconIndex) => (
                        <img
                          key={faviconIndex}
                          src={url}
                          alt=""
                          style={{
                            width: ICON_SIZE.M,
                            height: ICON_SIZE.M,
                            borderRadius: SPACING.ZERO,
                          }}
                        />
                      ))}
                      {remainingCount > 0 && (
                        <Bubble>
                          {remainingCount} résultat{remainingCount > 1 ? 's' : ''} supplémentaire{remainingCount > 1 ? 's' : ''}
                        </Bubble>
                      )}
                    </div>

                    <Text
                      size="M"
                      weight="M"
                      color="GREY_DARK"
                    >
                      {item.aiAnswer}
                    </Text>
                  </div>
                </Card>
              )
            })}
            
            {hasMoreCards && (
              <Button
                variant="WHITE"
                onClick={handleLoadMore}
                style={{ width: WIDTH.FULL }}
              >
                Voir plus
              </Button>
            )}
          </div>
        </div>
      </Container>

      <Popup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        title="Filtres"
        icon={Filter}
        size="small"
        rightElement={
          <Button
            variant="BLACK"
            disabled={!hasFilterChanges}
            onClick={handleConfirmFilters}
            style={{ 
              width: WIDTH.AUTO, 
              paddingLeft: SPACING.L, 
              paddingRight: SPACING.L,
              height: BUTTON_HEIGHT.OVERLAY,
            }}
          >
            Confirmer
          </Button>
        }
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <Checkbox
            checked={excludeSponsors}
            onChange={(e) => setExcludeSponsors(e.target.checked)}
            label={
              <Text size="M" weight="M" color="BLACK">
                Exclure sponsors actuels / anciens
              </Text>
            }
          />
        </div>
      </Popup>
    </div>
  )
}

