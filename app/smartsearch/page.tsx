'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Clock } from 'lucide-react'
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
import { INPUT_HEIGHT, INPUT_PADDING } from '../../constants/input'
import { LINE_HEIGHT, FONT_SIZE } from '../../constants/font'
import { OUTLINE } from '../../constants/outline'
import { Z_INDEX } from '../../constants/zIndex'
import { POINTER_EVENTS } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { TEXT_TRANSFORM, LETTER_SPACING } from '../../constants/text'

interface SearchHistoryItem {
  date: Date
  prompt: string
  faviconUrls: string[]
  aiAnswer: string
}

export default function SmartSearchPage() {
  const [viewType, setViewType] = useState('table')
  const [recherchesLancees, setRecherchesLancees] = useState(STRING.ZERO)
  const [searchValue, setSearchValue] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(NUMBER.ZERO)

  const placeholderExamples = [
    'TROUVE MOI DES ENTREPRISES QUI ONT INVESTIT DANS LE TOUR DE FRANCE 2024',
    'QUELS SPONSORS ONT SOUTENU LES ÉQUIPES DE FOOTBALL EN LIGUE 1 CETTE SAISON ?',
    'ENTREPRISES PARTENAIRES DU PARIS 2024 ET DE SES ÉVÉNEMENTS',
    'MARQUES QUI COLLABORENT AVEC DES ATHLÈTES FRANÇAIS EN TENNIS',
    'SPONSORS DES CLUBS DE RUGBY EN TOP 14 POUR LA SAISON 2024-2025',
    'ENTREPRISES QUI ONT SIGNÉ DES CONTRATS DE SPONSORING AVEC DES ÉVÉNEMENTS SPORTIFS MAJEURS',
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
    },
    {
      date: new Date(2024, 0, 13, 16, 45),
      prompt: 'Startups dans l\'esport et le gaming',
      faviconUrls: [
        'https://www.twitch.tv/favicon.ico',
        'https://www.discord.com/favicon.ico',
      ],
      aiAnswer: 'Le secteur de l\'esport connaît une croissance exponentielle avec de nombreuses startups innovantes. Ces entreprises développent des plateformes de streaming, des outils de gestion d\'équipes et des solutions de monétisation pour les joueurs professionnels.',
    },
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
          <Button
            variant="PURPLE"
            disabled={true}
            style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
          >
            Lancer la recherche
          </Button>
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
            <Text
              size="S"
              weight="S"
              color="GREY_DARK"
              style={{
                textTransform: TEXT_TRANSFORM.UPPERCASE,
                marginBottom: SPACING.M,
                marginLeft: SPACING.ZERO,
                letterSpacing: LETTER_SPACING.TIGHT,
                fontSize: FONT_SIZE.S,
              }}
            >
              Entrez votre requête
            </Text>
            <textarea
              placeholder={currentPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={(e) => {
                const card = document.getElementById('smartsearch-input-card')
                if (card) card.style.borderColor = COLOR.PURPLE
              }}
              onBlur={(e) => {
                const card = document.getElementById('smartsearch-input-card')
                if (card) card.style.borderColor = COLOR.GREY.MEDIUM
              }}
              rows={1}
              style={{
                width: WIDTH.FULL,
                height: INPUT_HEIGHT.MAIN,
                paddingLeft: SPACING.ZERO,
                paddingRight: INPUT_PADDING.HORIZONTAL.WITHOUT_ICON,
                paddingTop: `calc(${SPACING.S} - 1px)`,
                paddingBottom: SPACING.ZERO,
                fontSize: FONT_SIZE.M,
                color: COLOR.BLACK,
                backgroundColor: COLOR.WHITE,
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
            {searchHistoryItems.map((item, index) => {
              const visibleFavicons = item.faviconUrls.slice(0, 6)
              const remainingCount = item.faviconUrls.length - 6

              return (
                <Card
                  key={index}
                  variant="default"
                  style={{
                    backgroundColor: COLOR.WHITE,
                  }}
                >
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
          </div>
        </div>
      </Container>
    </div>
  )
}

