'use client'

import { useState } from 'react'
import { BarChart3, FileText, Search, Building2, Users, MapPin, Mail, Handshake, Activity, Inbox } from 'lucide-react'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { MULTIPLIER } from '../../constants/multiplier'
import { POSITION_TYPE } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { StatsBar } from '../../components/StatsBar'
import { HelpButton } from '../../components/HelpButton'
import { ActivityTable, type Activity } from './components/ActivityTable'
import { EmptyState } from '../../components/EmptyState'
import { DISPLAY } from '../../constants/display'
import { ALIGN_ITEMS, FLEX_DIRECTION } from '../../constants/flex'
import { STRING } from '../../constants/string'
import { FLEX } from '../../constants/flex'
import { TIME } from '../../constants/time'
import { TIME_RANGE } from '../../constants/filter'
import { parseDateString, millisecondsToHours, hoursToDays, resetDateToStartOfDay, getDateDaysAgo } from '../../lib/dateUtils'
import { findOptionOrDefault } from '../../lib/arrayUtils'

export default function DashboardPage() {
  const [searchValue, setSearchValue] = useState('')
  const [timeRange, setTimeRange] = useState(TIME_RANGE.ALL)
  const [selectedUserId, setSelectedUserId] = useState(TIME_RANGE.ALL)
  const [showTable, setShowTable] = useState(false)

  // Mock activities data - one for each stat icon
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      userId: '1',
      userFirstName: 'Martin',
      userLastName: 'Masseline',
      description: 'Article lu sur le sponsoring sportif',
      date: '15/01/2025',
      time: '14:30',
      type: 'article',
    },
    {
      id: '2',
      userId: '2',
      userFirstName: 'Jean',
      userLastName: 'Dupont',
      description: 'Recherche lancée pour entreprises tech',
      date: '15/01/2025',
      time: '13:45',
      type: 'recherche',
    },
    {
      id: '3',
      userId: '1',
      userFirstName: 'Martin',
      userLastName: 'Masseline',
      description: 'Entreprise identifiée : TechCorp',
      date: '15/01/2025',
      time: '12:20',
      type: 'entreprise',
    },
    {
      id: '4',
      userId: '3',
      userFirstName: 'Marie',
      userLastName: 'Martin',
      description: 'Décideur identifié : Directeur Marketing',
      date: '15/01/2025',
      time: '11:15',
      type: 'decideur',
    },
    {
      id: '5',
      userId: '2',
      userFirstName: 'Jean',
      userLastName: 'Dupont',
      description: 'Coordonnées trouvées pour 5 contacts',
      date: '15/01/2025',
      time: '10:00',
      type: 'coordonnee',
    },
    {
      id: '6',
      userId: '1',
      userFirstName: 'Martin',
      userLastName: 'Masseline',
      description: 'Email envoyé à TechCorp',
      date: '14/01/2025',
      time: '16:30',
      type: 'email',
    },
    {
      id: '7',
      userId: '3',
      userFirstName: 'Marie',
      userLastName: 'Martin',
      description: 'Partenariat signé avec SportBrand',
      date: '14/01/2025',
      time: '15:00',
      type: 'partenariat',
    },
  ])

  const handleRefresh = () => {
    setShowTable(true)
  }

  const handleViewActivity = (activityId: string) => {
    // TODO: Implement view activity logic
    console.log('View activity:', activityId)
  }

  // Filter activities based on time range and user
  const filteredActivities = activities.filter(activity => {
    // Filter by user
    if (selectedUserId !== TIME_RANGE.ALL && activity.userId !== selectedUserId) {
      return false
    }

    // Filter by time range
    if (timeRange === TIME_RANGE.ALL) {
      return true
    }

    const activityDate = parseDateString(activity.date, activity.time)
    const now = new Date()
    const diffMs = now.getTime() - activityDate.getTime()
    const diffHours = millisecondsToHours(diffMs)
    const diffDays = hoursToDays(diffHours)

    switch (timeRange) {
      case TIME_RANGE.HOURS_24:
        return diffHours <= TIME.HOURS_PER_DAY
      case TIME_RANGE.DAYS_7:
        return diffDays <= TIME.DAYS_PER_WEEK
      case TIME_RANGE.DAYS_30:
        return diffDays <= TIME.DAYS_PER_MONTH
      default:
        return true
    }
  })

  // Calculate activities for today and this week
  const today = resetDateToStartOfDay(new Date())
  const weekAgo = getDateDaysAgo(today, TIME.DAYS_PER_WEEK)

  const activitiesToday = activities.filter(activity => {
    const activityDate = parseDateString(activity.date, activity.time)
    return activityDate >= today
  }).length

  const activitiesThisWeek = activities.filter(activity => {
    const activityDate = parseDateString(activity.date, activity.time)
    return activityDate >= weekAgo
  }).length

  const dropdownOptions = [
    { value: TIME_RANGE.HOURS_24, label: 'Dernières 24h' },
    { value: TIME_RANGE.DAYS_7, label: '7 derniers jours' },
    { value: TIME_RANGE.DAYS_30, label: '30 derniers jours' },
    { value: TIME_RANGE.ALL, label: 'Toute l\'activité' },
  ]

  // Get unique users from activities
  const uniqueUsers = Array.from(
    new Map(
      activities.map(activity => [
        activity.userId,
        { id: activity.userId, firstName: activity.userFirstName, lastName: activity.userLastName }
      ])
    ).values()
  )

  const userDropdownOptions = [
    { value: TIME_RANGE.ALL, label: 'Tous les utilisateurs' },
    ...uniqueUsers.map(user => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`
    }))
  ]

  const selectedOption = findOptionOrDefault(dropdownOptions, timeRange)
  const selectedUserOption = findOptionOrDefault(userDropdownOptions, selectedUserId)

  // Get empty state content based on selected filters
  const getEmptyStateContent = () => {
    const timeRangeLabel = dropdownOptions.find(opt => opt.value === timeRange)?.label || 'cette période'
    const userLabel = selectedUserOption.label

    let title = 'Aucune activité trouvée'
    let description = `Aucune activité trouvée pour ${timeRangeLabel.toLowerCase()}`

    // Add user context if a specific user is selected
    if (selectedUserId !== TIME_RANGE.ALL) {
      description += ` pour ${userLabel.toLowerCase()}`
    }

    description += '.'

    return { icon: Inbox, title, description }
  }

  const emptyStateContent = getEmptyStateContent()

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        {activitiesToday} activités aujourd'hui
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {activitiesThisWeek} activités cette semaine
      </Text>
    </div>
  )

  const stats = [
    { icon: FileText, value: STRING.ZERO, label: 'articles lus' },
    { icon: Search, value: STRING.ZERO, label: 'recherches lancées' },
    { icon: Building2, value: STRING.ZERO, label: 'entreprises identifiées' },
    { icon: Users, value: STRING.ZERO, label: 'décideurs identifiés' },
    { icon: MapPin, value: STRING.ZERO, label: 'coordonnées trouvées' },
    { icon: Mail, value: STRING.ZERO, label: 'emails envoyés' },
    { icon: Handshake, value: STRING.ZERO, label: 'partenariats signés' },
  ]

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        marginLeft: LAYOUT.SIDEBAR_WIDTH,
        paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STATS_BAR_HEIGHT}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STICKY_BAR_HEIGHT}))`,
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
        title=""
        variant="stickyPurple"
        additionalText={stickyPurpleTitle}
        dropdownOptions={dropdownOptions}
        dropdownValue={timeRange}
        onDropdownChange={setTimeRange}
        secondDropdownOptions={userDropdownOptions}
        secondDropdownValue={selectedUserId}
        onSecondDropdownChange={setSelectedUserId}
        stickyTopOffset={`calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * ${MULTIPLIER.STATS_BAR_HEIGHT}))`}
      />
      <HelpButton />
      
      {showTable ? (
        filteredActivities.length > 0 ? (
          <ActivityTable
            activities={filteredActivities}
            onView={handleViewActivity}
          />
        ) : (
          <EmptyState
            icon={emptyStateContent.icon}
            title={emptyStateContent.title}
            description={emptyStateContent.description}
          />
        )
      ) : (
      <EmptyState
        icon={Inbox}
        title="Aucune activité récente"
        description="Vos activités récentes apparaîtront ici"
      />
      )}
    </div>
  )
}

