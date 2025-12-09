'use client'

import { useState } from 'react'
import { BarChart3, FileText, Search, Building2, Users, MapPin, Mail, Handshake, Activity, Inbox } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { StatsBar } from '../../components/StatsBar'
import { HelpButton } from '../../components/HelpButton'
import { Text } from '../../components/Text'
import { COLOR } from '../../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../constants/border'
import { ICON_SIZE } from '../../constants/iconSize'
import { TRANSITION } from '../../constants/transition'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT } from '../../constants/flex'
import { TEXT_ALIGN } from '../../constants/text'
import { Container } from '../../components/Container'

export default function DashboardPage() {
  const [searchValue, setSearchValue] = useState('')
  const [timeRange, setTimeRange] = useState('all')

  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log('Refresh clicked')
  }

  const dropdownOptions = [
    { value: '24h', label: 'Dernières 24h' },
    { value: '7d', label: '7 derniers jours' },
    { value: '30d', label: '30 derniers jours' },
    { value: 'all', label: 'Toute l\'activité' },
  ]

  const selectedOption = dropdownOptions.find(option => option.value === timeRange) || dropdownOptions[dropdownOptions.length - 1]

  const stats = [
    { icon: FileText, value: '0', label: 'articles lus' },
    { icon: Search, value: '0', label: 'recherches lancées' },
    { icon: Building2, value: '0', label: 'entreprises identifiées' },
    { icon: Users, value: '0', label: 'décideurs identifiés' },
    { icon: MapPin, value: '0', label: 'coordonnées trouvées' },
    { icon: Mail, value: '0', label: 'emails envoyés' },
    { icon: Handshake, value: '0', label: 'partenariats signés' },
  ]

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: LAYOUT.SIDEBAR_WIDTH,
        paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * 1.6) + ((${SPACING.XXXL} + ${SPACING.M}) * 0.8))`,
      }}
    >
      <NavbarSidebar />
      <TopBar 
        icon={BarChart3} 
        title="Dashboard" 
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Rechercher..."
        showRefresh={true}
        onRefresh={handleRefresh}
        hideBorder={true}
      />
      <StatsBar stats={stats} />
      <TopBar 
        icon={Activity} 
        title={`Activité récente : ${selectedOption.label}`}
        variant="stickyPurple"
        dropdownOptions={dropdownOptions}
        dropdownValue={timeRange}
        onDropdownChange={setTimeRange}
        stickyTopOffset={`calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * 1.6))`}
      />
      <HelpButton />
      
      {/* Empty State */}
      <Container variant="fullWidth">
        <div
          style={{
            paddingTop: SPACING.XL,
            paddingLeft: SPACING.XL,
            paddingRight: SPACING.XL,
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
              <Inbox
                size={ICON_SIZE.XL * 2}
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
                Aucune activité récente
              </Text>
              <Text
                size="M"
                weight="M"
                color="GREY_DARK"
                style={{
                  textAlign: TEXT_ALIGN.CENTER,
                }}
              >
                Vos activités récentes apparaîtront ici
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

