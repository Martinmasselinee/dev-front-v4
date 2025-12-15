'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Users, Mail, AlertTriangle, Sparkles, ScanLine, Inbox, FileText, TrendingUp, Building2, Tag, Zap, Award, DollarSign, Youtube, Shirt, Plus, Wand2, Clock } from 'lucide-react'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Container } from '../../components/Container'
import { ArticleCard } from './components/ArticleCard'
import { ArticlePopup, ContentBlock } from './components/ArticlePopup'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { LAYOUT, CALCULATION } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE, POSITION } from '../../constants/position'
import { ICON_SIZE } from '../../constants/iconSize'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Popup } from '../../components/Popup'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { UserInitial } from '../../components/UserInitial'
import { DropdownButton } from '../../components/DropdownButton'
import { RoleChangeConfirmPopup } from '../../app/admin/components/RoleChangeConfirmPopup'
import { COLOR } from '../../constants/color'
import { BORDER, BORDER_WIDTH } from '../../constants/border'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX, FLEX_WRAP } from '../../constants/flex'
import { TEXT_ALIGN } from '../../constants/text'
import { MULTIPLIER } from '../../constants/multiplier'
import { STRING } from '../../constants/string'
import { NUMBER } from '../../constants/number'
import { DATE_OFFSET } from '../../constants/date'
import { INPUT_HEIGHT } from '../../constants/input'
import { WIDTH } from '../../constants/width'
import { DIMENSION } from '../../constants/dimension'
import { TABLE } from '../../constants/table'
import { TIME_RANGE } from '../../constants/filter'
import { TIME } from '../../constants/time'
import { findOptionOrDefault } from '../../lib/arrayUtils'
import { parseDateString, millisecondsToHours, hoursToDays } from '../../lib/dateUtils'

export default function RadarAIPage() {
  const searchParams = useSearchParams()
  const [showAddUsersPopup, setShowAddUsersPopup] = useState(false)
  const [invitedUsers, setInvitedUsers] = useState<Array<{ email: string; role: 'admin' | 'user' }>>([])
  const [currentEmailInput, setCurrentEmailInput] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [showRoleChangeConfirm, setShowRoleChangeConfirm] = useState(false)
  const [userToChangeRole, setUserToChangeRole] = useState<{ email: string; newRole: string } | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [timeRange, setTimeRange] = useState<string>(TIME_RANGE.ALL)
  const [articleType, setArticleType] = useState<string>('all')
  const [showSummaryCard, setShowSummaryCard] = useState(false)

  // Helper function to format date as DD/MM/YYYY
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, STRING.ZERO)
    const month = String(date.getMonth() + 1).padStart(2, STRING.ZERO)
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Get dates for different time ranges
  const now = new Date()
  const today = new Date(now)
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - DATE_OFFSET.DAYS_ONE)
  const threeDaysAgo = new Date(now)
  threeDaysAgo.setDate(threeDaysAgo.getDate() - DATE_OFFSET.DAYS_THREE)
  const fiveDaysAgo = new Date(now)
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - DATE_OFFSET.DAYS_FIVE)
  const tenDaysAgo = new Date(now)
  tenDaysAgo.setDate(tenDaysAgo.getDate() - DATE_OFFSET.DAYS_TEN)
  const fifteenDaysAgo = new Date(now)
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - DATE_OFFSET.DAYS_FIFTEEN)
  const twentyDaysAgo = new Date(now)
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - DATE_OFFSET.DAYS_TWENTY)
  const fortyDaysAgo = new Date(now)
  fortyDaysAgo.setDate(fortyDaysAgo.getDate() - DATE_OFFSET.DAYS_FORTY)
  const fiftyDaysAgo = new Date(now)
  fiftyDaysAgo.setDate(fiftyDaysAgo.getDate() - DATE_OFFSET.DAYS_FIFTY)

  // Mock content for all articles (same content for all)
  const mockContent: ContentBlock[] = [
    {
      type: 'paragraph',
      content: 'Un nouveau partenariat majeur vient d\'être annoncé dans le monde du sponsoring sportif, marquant une étape importante pour les deux parties impliquées. Cette collaboration stratégique représente un investissement significatif dans le domaine du sport professionnel et ouvre de nouvelles perspectives pour les deux entités.',
    },
    {
      type: 'boldParagraph',
      content: 'Cette annonce marque une nouvelle ère pour le sponsoring sportif en France, avec des implications significatives pour l\'ensemble du secteur.',
    },
    {
      type: 'subtitle',
      content: 'Les détails du partenariat',
    },
    {
      type: 'paragraph',
      content: 'Les détails de ce partenariat incluent des engagements à long terme qui permettront de développer des initiatives communes dans le domaine du marketing sportif, de la communication et de l\'engagement communautaire.',
    },
    {
      type: 'citation',
      content: 'Cette collaboration représente un moment clé pour notre marque et démontre notre engagement envers le sport professionnel et la communauté sportive.',
    },
    {
      type: 'subtitle',
      content: 'Les points clés',
    },
    {
      type: 'bulletPoints',
      content: [
        'Engagement à long terme sur plusieurs saisons',
        'Initiatives communes en marketing sportif',
        'Communication renforcée avec la communauté',
        'Développement de programmes sociaux et environnementaux',
      ],
    },
    {
      type: 'paragraph',
      content: 'Ce type de partenariat démontre l\'importance croissante du sponsoring sportif dans les stratégies marketing modernes, où les marques cherchent à créer des connexions authentiques avec leur audience à travers le sport.',
    },
  ]

  // Mock articles data - move to state for filtering
  const [articles] = useState([
    // Last 24h (3 articles)
    {
      type: 'sponsoring',
      typeLabel: 'Sponsoring',
      typeIcon: TrendingUp,
      date: formatDate(today),
      title: 'Nouveau partenariat stratégique annoncé',
      excerpt: 'Un nouveau partenariat majeur vient d\'être annoncé dans le monde du sponsoring sportif, marquant une étape importante pour les deux parties impliquées.',
      content: mockContent,
      tags: ['Partenariat', 'Stratégie'],
      relatedArticles: [
        { title: 'Guide complet du sponsoring sportif en 2025', url: 'https://example.com/sponsoring-guide' },
        { title: 'Les meilleures pratiques de partenariat sportif', url: 'https://example.com/partenariat-practices' },
      ],
    },
    {
      type: 'marques',
      typeLabel: 'Marques',
      typeIcon: Tag,
      date: formatDate(yesterday),
      title: 'Tendances marketing sportif 2025',
      excerpt: 'Les tendances du marketing sportif évoluent rapidement, avec de nouvelles approches innovantes qui transforment le paysage du sponsoring.',
      content: mockContent,
      tags: ['Marketing', 'Tendances'],
      relatedArticles: [
        { title: 'L\'impact de l\'IA sur le marketing sportif', url: 'https://example.com/ia-marketing' },
        { title: 'Marketing digital dans le sport : nouvelles tendances', url: 'https://example.com/digital-sport' },
      ],
    },
    {
      type: 'activations',
      typeLabel: 'Activations',
      typeIcon: Zap,
      date: formatDate(yesterday),
      title: 'Campagne d\'activation réussie',
      excerpt: 'Une campagne d\'activation récente a démontré l\'efficacité des nouvelles stratégies de communication dans le domaine sportif.',
      content: mockContent,
      tags: ['Campagne', 'Succès'],
      relatedArticles: [
        { title: 'Comment créer une campagne d\'activation réussie', url: 'https://example.com/activation-campaign' },
        { title: 'Stratégies multi-canaux pour le marketing sportif', url: 'https://example.com/multi-channel' },
      ],
    },
    // Last 7 days (3 articles)
    {
      type: 'sponsoring',
      typeLabel: 'Sponsoring',
      typeIcon: TrendingUp,
      date: formatDate(threeDaysAgo),
      title: 'Innovation dans le sponsoring digital',
      excerpt: 'Les nouvelles technologies transforment la manière dont les marques s\'engagent dans le sponsoring sportif.',
      content: mockContent,
      tags: ['Digital', 'Innovation'],
      relatedArticles: [
        { title: 'L\'avenir du sponsoring digital', url: 'https://example.com/digital-sponsoring' },
      ],
    },
    {
      type: 'marques',
      typeLabel: 'Marques',
      typeIcon: Tag,
      date: formatDate(fiveDaysAgo),
      title: 'Stratégies de branding sportif',
      excerpt: 'Les marques développent de nouvelles approches pour renforcer leur présence dans le monde du sport.',
      content: mockContent,
      tags: ['Branding', 'Stratégie'],
      relatedArticles: [
        { title: 'Construire une marque dans le sport', url: 'https://example.com/branding-sport' },
      ],
    },
    {
      type: 'activations',
      typeLabel: 'Activations',
      typeIcon: Zap,
      date: formatDate(fiveDaysAgo),
      title: 'Événements sportifs et activation de marque',
      excerpt: 'Les événements sportifs représentent une opportunité unique pour les marques d\'activer leur présence.',
      content: mockContent,
      tags: ['Événements', 'Activation'],
      relatedArticles: [
        { title: 'Maximiser l\'impact des événements sportifs', url: 'https://example.com/events-activation' },
      ],
    },
    // Last 30 days (3 articles)
    {
      type: 'sponsoring',
      typeLabel: 'Sponsoring',
      typeIcon: TrendingUp,
      date: formatDate(tenDaysAgo),
      title: 'Partenariats durables dans le sport',
      excerpt: 'Les partenariats à long terme deviennent la norme dans le sponsoring sportif moderne.',
      content: mockContent,
      tags: ['Durabilité', 'Partenariat'],
      relatedArticles: [
        { title: 'Construire des partenariats durables', url: 'https://example.com/durable-partnerships' },
      ],
    },
    {
      type: 'marques',
      typeLabel: 'Marques',
      typeIcon: Tag,
      date: formatDate(fifteenDaysAgo),
      title: 'L\'impact social du sponsoring sportif',
      excerpt: 'Les marques utilisent le sponsoring sportif pour s\'engager dans des causes sociales importantes.',
      content: mockContent,
      tags: ['Social', 'Impact'],
      relatedArticles: [
        { title: 'Sponsoring sportif et responsabilité sociale', url: 'https://example.com/social-impact' },
      ],
    },
    {
      type: 'activations',
      typeLabel: 'Activations',
      typeIcon: Zap,
      date: formatDate(twentyDaysAgo),
      title: 'Mesure de performance des campagnes sportives',
      excerpt: 'Les marques développent de nouvelles méthodes pour mesurer l\'efficacité de leurs campagnes de sponsoring.',
      content: mockContent,
      tags: ['Performance', 'Métriques'],
      relatedArticles: [
        { title: 'Mesurer le ROI du sponsoring sportif', url: 'https://example.com/roi-measurement' },
      ],
    },
    // Older articles (2 articles)
    {
      type: 'sponsoring',
      typeLabel: 'Sponsoring',
      typeIcon: TrendingUp,
      date: formatDate(fortyDaysAgo),
      title: 'Histoire du sponsoring sportif',
      excerpt: 'Retour sur l\'évolution du sponsoring sportif au fil des décennies.',
      content: mockContent,
      tags: ['Histoire', 'Évolution'],
      relatedArticles: [
        { title: 'L\'évolution du sponsoring sportif', url: 'https://example.com/sponsoring-history' },
      ],
    },
    {
      type: 'marques',
      typeLabel: 'Marques',
      typeIcon: Tag,
      date: formatDate(fiftyDaysAgo),
      title: 'Fondamentaux du marketing sportif',
      excerpt: 'Les principes de base du marketing sportif restent pertinents malgré l\'évolution des technologies.',
      content: mockContent,
      tags: ['Fondamentaux', 'Marketing'],
      relatedArticles: [
        { title: 'Les bases du marketing sportif', url: 'https://example.com/sports-marketing-basics' },
      ],
    },
  ])

  const handleRefresh = () => {
    setShowSummaryCard(true)
    // TODO: Implement refresh logic
    console.log('Refresh radar data')
  }
  const [nouveauxArticles, setNouveauxArticles] = useState(STRING.ZERO)
  const [totalArticles, setTotalArticles] = useState(STRING.ZERO)
  const [selectedArticle, setSelectedArticle] = useState<{
    type: string
    typeLabel: string
    typeIcon: typeof TrendingUp
    date: string
    title: string
    excerpt: string
    content: ContentBlock[]
    tags: string[]
    relatedArticles?: Array<{ title: string; url: string }>
  } | null>(null)
  // Current user (admin) - in a real app, this would come from auth context
  const currentUserEmail = 'admin@dataxx.fr'

  useEffect(() => {
    // Check if coming from create-workspace page
    const from = searchParams.get('from')
    if (from === 'create-workspace') {
      setShowAddUsersPopup(true)
    }
  }, [searchParams])

  const handleInviteUser = () => {
    if (currentEmailInput.trim() && !invitedUsers.some(user => user.email === currentEmailInput.trim())) {
      setInvitedUsers([...invitedUsers, { email: currentEmailInput.trim(), role: 'user' }])
      setCurrentEmailInput('')
    }
  }

  const handleDeleteClick = (email: string) => {
    setUserToDelete(email)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setInvitedUsers(invitedUsers.filter((user) => user.email !== userToDelete))
      setUserToDelete(null)
      setShowDeleteConfirm(false)
    }
  }

  const handleRoleChange = (email: string, newRole: string) => {
    setUserToChangeRole({ email, newRole })
    setShowRoleChangeConfirm(true)
  }

  const handleConfirmRoleChange = () => {
    if (userToChangeRole) {
      setInvitedUsers(invitedUsers.map(user => 
        user.email === userToChangeRole.email 
          ? { ...user, role: userToChangeRole.newRole as 'admin' | 'user' }
          : user
      ))
      setUserToChangeRole(null)
      setShowRoleChangeConfirm(false)
    }
  }

  const handleCancelRoleChange = () => {
    setUserToChangeRole(null)
    setShowRoleChangeConfirm(false)
  }

  const getUserToChangeRoleName = () => {
    return userToChangeRole?.email || ''
  }

  const getRoleChangeText = () => {
    if (!userToChangeRole) return ''
    const currentUser = allUsers.find(u => u.email === userToChangeRole.email)
    if (!currentUser) return ''
    const currentRole = currentUser.role === 'admin' ? 'administrateur' : 'utilisateur'
    const newRole = userToChangeRole.newRole === 'admin' ? 'administrateur' : 'utilisateur'
    return `passer de ${currentRole} à ${newRole}`
  }

  const handleCancelDelete = () => {
    setUserToDelete(null)
    setShowDeleteConfirm(false)
  }

  // Combine current user and invited users for display
  const allUsers = [
    { email: currentUserEmail, role: 'admin' as const },
    ...invitedUsers
  ]

  const timeframeOptions = [
    { value: TIME_RANGE.HOURS_24, label: 'Dernières 24h' },
    { value: TIME_RANGE.DAYS_7, label: '7 derniers jours' },
    { value: TIME_RANGE.DAYS_30, label: '30 derniers jours' },
    { value: TIME_RANGE.ALL, label: 'Toute l\'activité' },
  ]

  const articleOptions = [
    { value: 'all', label: 'Tous les articles' },
    { value: 'sponsoring', label: 'Sponsoring' },
    { value: 'marques', label: 'Marques' },
    { value: 'activations', label: 'Activations' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'nominations', label: 'Nominations' },
    { value: 'levees', label: 'Levées de fonds' },
    { value: 'youtube', label: 'YouTube Sponsors' },
    { value: 'partenariat', label: 'Partenariat officiel maillot' },
  ]

  // Filter articles based on timeRange, articleType, and search
  const filteredArticles = articles.filter(article => {
    // Filter by article type
    if (articleType !== 'all' && article.type !== articleType) {
      return false
    }

    // Filter by search value (case-insensitive search in title and content)
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim()
      const titleLower = article.title.toLowerCase()
      
      // Check if search matches title
      const matchesTitle = titleLower.includes(searchLower)
      
      // Check if search matches any content block
      const matchesContent = article.content.some(block => {
        if (typeof block.content === 'string') {
          return block.content.toLowerCase().includes(searchLower)
        } else if (Array.isArray(block.content)) {
          return block.content.some(contentItem => 
            contentItem.toLowerCase().includes(searchLower)
          )
        }
        return false
      })
      
      if (!matchesTitle && !matchesContent) {
        return false
      }
    }

    // Filter by time range
    if (timeRange === TIME_RANGE.ALL) {
      return true
    }

    // Parse article date (format: DD/MM/YYYY)
    const [day, month, year] = article.date.split('/').map(Number)
    const articleDate = new Date(year, month - 1, day)
    const now = new Date()
    const diffMs = now.getTime() - articleDate.getTime()
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

  // Group articles by time range for separators
  const getArticleTimeGroup = (article: typeof articles[0]): string => {
    const [day, month, year] = article.date.split('/').map(Number)
    const articleDate = new Date(year, month - 1, day)
    const now = new Date()
    const diffMs = now.getTime() - articleDate.getTime()
    const diffHours = millisecondsToHours(diffMs)
    const diffDays = hoursToDays(diffHours)

    if (diffHours <= TIME.HOURS_PER_DAY) {
      return 'last24h'
    } else if (diffDays <= TIME.DAYS_PER_WEEK) {
      return 'last7d'
    } else if (diffDays <= TIME.DAYS_PER_MONTH) {
      return 'last30d'
    } else {
      return 'older'
    }
  }

  // Group filtered articles by time range
  const groupedArticles = filteredArticles.reduce((groups, article) => {
    const group = getArticleTimeGroup(article)
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(article)
    return groups
  }, {} as Record<string, typeof filteredArticles>)

  // Define group order and labels
  const groupOrder: readonly string[] = ['last24h', 'last7d', 'last30d', 'older'] as const
  const groupLabels: Record<string, { label: string; icon: typeof Clock }> = {
    last24h: { label: 'Dernières 24h', icon: Clock },
    last7d: { label: '7 derniers jours', icon: Clock },
    last30d: { label: '30 derniers jours', icon: Clock },
    older: { label: 'Articles plus anciens', icon: Clock },
  }

  const selectedTimeframeOption = findOptionOrDefault(timeframeOptions, timeRange)

  // Get icon and description based on article type and timeframe
  const getEmptyStateContent = () => {
    const articleTypeLabel = articleOptions.find(opt => opt.value === articleType)?.label || 'article'
    const timeframeLabel = timeframeOptions.find(opt => opt.value === timeRange)?.label || 'cette période'

    let icon = Inbox
    let title = 'Aucun article trouvé'
    let description = `Aucun article récupéré par les agents IA`

    // Add search context if searching
    if (searchValue.trim()) {
      description += ` pour "${searchValue}"`
    }

    // Add timeframe context
    if (timeRange !== TIME_RANGE.ALL) {
      description += ` pour ${timeframeLabel.toLowerCase()}`
    }

    // Add article type context
    if (articleType !== 'all') {
      description += ` pour ${articleTypeLabel.toLowerCase()}`
    }

    description += '.'

    // Set icon based on article type
    switch (articleType) {
      case 'sponsoring':
        icon = TrendingUp
        title = 'Aucun article Sponsoring trouvé'
        break
      case 'marques':
        icon = Tag
        title = 'Aucun article Marques trouvé'
        break
      case 'activations':
        icon = Zap
        title = 'Aucun article Activations trouvé'
        break
      case 'marketing':
        icon = Sparkles
        title = 'Aucun article Marketing trouvé'
        break
      case 'nominations':
        icon = Award
        title = 'Aucun article Nominations trouvé'
        break
      case 'levees':
        icon = DollarSign
        title = 'Aucun article Levées de fonds trouvé'
        break
      case 'youtube':
        icon = Youtube
        title = 'Aucun article YouTube Sponsors trouvé'
        break
      case 'partenariat':
        icon = Shirt
        title = 'Aucun article Partenariat officiel maillot trouvé'
        break
      default:
        icon = FileText
        title = 'Aucun article trouvé'
    }

    return { icon, title, description }
  }

  const emptyStateContent = getEmptyStateContent()
  const EmptyStateIcon = emptyStateContent.icon

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        {nouveauxArticles} nouveaux articles scannés
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {totalArticles} total
      </Text>
    </div>
  )

  return (
    <>
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
          icon={ScanLine} 
          title="Radar IA" 
          showSearch={true}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Rechercher des sponsors..."
          showRefresh={true}
          onRefresh={handleRefresh}
          hideBorder={true}
        />
        <TopBar 
          icon={FileText} 
          title=""
          variant="stickyPurple"
          additionalText={stickyPurpleTitle}
          dropdownOptions={articleOptions}
          dropdownValue={articleType}
          onDropdownChange={(value) => setArticleType(value)}
          secondDropdownOptions={timeframeOptions}
          secondDropdownValue={timeRange}
          onSecondDropdownChange={(value) => setTimeRange(value)}
        />
        <HelpButton />
        
        {showSummaryCard ? (
          filteredArticles.length > 0 ? (
            <Container variant="fullWidth">
              <Card style={{ marginTop: SPACING.XL, backgroundColor: COLOR.WHITE, paddingTop: SPACING.XL, paddingBottom: SPACING.XL, paddingRight: SPACING.XXL }}>
                <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.FLEX_START, gap: SPACING.M }}>
                  <Wand2 size={ICON_SIZE.L} style={{ color: COLOR.PURPLE, flexShrink: FLEX.ZERO, marginTop: SPACING.XS }} />
                  <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.S, flex: FLEX.ONE }}>
                    <Heading level={2} style={{ marginBottom: SPACING.ZERO }}>
                      Résumé IA des articles du jour
                    </Heading>
                    <Text size="M" weight="M" color="BLACK">
                      Aujourd'hui, {nouveauxArticles} nouveau article a été identifié par les agents Dataxx. Ces articles couvrent les dernières actualités du sponsoring sportif, les partenariats stratégiques, et les tendances du marketing sportif en France et à l'international.
                    </Text>
                  </div>
                </div>
              </Card>

              {/* 3-column article layout with time range separators */}
              <div style={{ marginTop: SPACING.XL }}>
                <div style={{ width: WIDTH.FULL }}>
                  {(() => {
                    const visibleGroups = groupOrder.filter(groupKey => {
                      const groupArticles = groupedArticles[groupKey]
                      return groupArticles && groupArticles.length > 0
                    })

                    return groupOrder.map((groupKey, groupIndex) => {
                      const groupArticles = groupedArticles[groupKey]
                      if (!groupArticles || groupArticles.length === 0) return null

                      const groupInfo = groupLabels[groupKey]
                      const GroupIcon = groupInfo.icon
                      const isLastGroup = visibleGroups[visibleGroups.length - 1] === groupKey
                      const visibleGroupIndex = visibleGroups.indexOf(groupKey)

                      return (
                        <div key={groupKey} style={{ paddingBottom: isLastGroup ? SPACING.XL : SPACING.ZERO }}>
                          {/* Time range separator */}
                          <div
                            style={{
                              width: WIDTH.FULL,
                              marginTop: visibleGroupIndex > 0 ? SPACING.XL : SPACING.ZERO,
                              marginBottom: SPACING.S,
                              paddingTop: SPACING.M,
                              paddingBottom: SPACING.S,
                              borderTop: visibleGroupIndex > 0 ? `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}` : BORDER.NONE,
                              display: DISPLAY.FLEX,
                              alignItems: ALIGN_ITEMS.CENTER,
                              gap: SPACING.S,
                            }}
                          >
                            <GroupIcon size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                            <Text size="M" weight="M" color="GREY_DARK">
                              {groupInfo.label}
                            </Text>
                            <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} color={COLOR.GREY.DARK} />
                            <Text size="M" weight="M" color="GREY_DARK">
                              {groupArticles.length} {groupArticles.length <= NUMBER.ONE ? 'article disponible' : 'articles disponibles'}
                            </Text>
                          </div>

                          {/* Article cards for this group */}
                          <div
                            style={{
                              display: DISPLAY.FLEX,
                              gap: SPACING.L,
                              flexWrap: FLEX_WRAP.WRAP,
                            }}
                          >
                            {groupArticles.map((article, index) => (
                              <div
                                key={index}
                                style={{
                                  flex: `0 0 calc((100% - ${SPACING.L} * ${CALCULATION.GRID_GAP_MULTIPLIER}) / ${CALCULATION.GRID_COLUMN_COUNT})`,
                                  width: `calc((100% - ${SPACING.L} * ${CALCULATION.GRID_GAP_MULTIPLIER}) / ${CALCULATION.GRID_COLUMN_COUNT})`,
                                }}
                              >
                                <ArticleCard
                                  type={article.type}
                                  typeLabel={article.typeLabel}
                                  typeIcon={article.typeIcon}
                                  date={article.date}
                                  title={article.title}
                                  excerpt={article.excerpt}
                                  tags={article.tags}
                                  onRead={() => setSelectedArticle(article)}
                                  onTypeClick={() => setArticleType(article.type)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </Container>
          ) : (
            <EmptyState
              icon={emptyStateContent.icon}
              title={emptyStateContent.title}
              description={emptyStateContent.description}
            />
          )
        ) : (
        <EmptyState
          icon={emptyStateContent.icon}
          title={emptyStateContent.title}
          description={emptyStateContent.description}
        />
        )}
      </div>

      <Popup
        isOpen={showAddUsersPopup}
        onClose={() => setShowAddUsersPopup(false)}
        title="Ajoutez des utilisateurs à votre workspace"
        icon={Users}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <Text size="M" weight="M" color="BLACK">
            Votre workspace a été créé avec succès ! Pour optimiser votre collaboration, vous pouvez maintenant ajouter des membres à votre équipe.
          </Text>
          
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.S,
            }}
          >
            <Input
              type="email"
              value={currentEmailInput}
              onChange={(e) => setCurrentEmailInput(e.target.value)}
              placeholder="Adresse email"
              icon={<Mail size={ICON_SIZE.M} />}
              style={{ flex: FLEX.ONE }}
            />
            <Button
              variant="WHITE"
              onClick={handleInviteUser}
              type="button"
              icon={<Plus size={ICON_SIZE.M} />}
              style={{ width: `calc(${POSITION.CENTER} * ${MULTIPLIER.BUTTON_WIDTH_HALF} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})` }}
            >
              Inviter
            </Button>
          </div>

          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.S,
            }}
          >
            {allUsers.map((user) => (
              <Card
                key={user.email}
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  backgroundColor: COLOR.WHITE,
                  border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    alignItems: ALIGN_ITEMS.CENTER,
                    gap: SPACING.M,
                    flex: FLEX.ONE,
                  }}
                >
                  <UserInitial name={user.email} size="L" />
                  <div
                    style={{
                      display: DISPLAY.FLEX,
                      alignItems: ALIGN_ITEMS.CENTER,
                      gap: SPACING.S,
                      flex: FLEX.ONE,
                    }}
                  >
                    <Text size="M" weight="M" color="BLACK">
                      {user.email}
                    </Text>
                    <DropdownButton
                      value={user.role === 'admin' ? 'admin' : 'user'}
                      disabled={user.email === currentUserEmail}
                      onChange={(e) => {
                        if (e.target.value !== user.role) {
                          handleRoleChange(user.email, e.target.value)
                        }
                      }}
                      style={{ 
                        width: WIDTH.AUTO, 
                        minWidth: DIMENSION.MIN_WIDTH_ZERO,
                        height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
                        lineHeight: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">Utilisateur</option>
                    </DropdownButton>
                  </div>
                </div>
                {user.email !== currentUserEmail && (
                  <Button
                    variant="WHITE"
                    onClick={() => handleDeleteClick(user.email)}
                    style={{
                      width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
                      height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
                    }}
                  >
                    Retirer
                  </Button>
                )}
              </Card>
            ))}
          </div>

          <Button
            variant="PURPLE"
            onClick={() => setShowAddUsersPopup(false)}
          >
            Trouver mes prochains sponsors
          </Button>
        </div>
      </Popup>

      <Popup
        isOpen={showDeleteConfirm}
        onClose={handleCancelDelete}
        title="Confirmer la suppression"
        icon={AlertTriangle}
        size="small"
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <Text size="M" weight="M" color="BLACK">
            Êtes-vous sûr de vouloir retirer {userToDelete} de ce workspace ?
          </Text>

          <div
            style={{
              display: DISPLAY.FLEX,
              gap: SPACING.M,
            }}
          >
            <Button
              variant="WHITE"
              onClick={handleCancelDelete}
              type="button"
              style={{ flex: FLEX.ONE }}
            >
              Annuler
            </Button>
            <Button
              variant="RED"
              onClick={handleConfirmDelete}
              type="button"
              style={{ flex: FLEX.ONE }}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </Popup>

      <RoleChangeConfirmPopup
        isOpen={showRoleChangeConfirm}
        onClose={handleCancelRoleChange}
        onConfirm={handleConfirmRoleChange}
        userName={getUserToChangeRoleName()}
        roleChangeText={getRoleChangeText()}
      />

      {selectedArticle && (
        <ArticlePopup
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          type={selectedArticle.type}
          typeLabel={selectedArticle.typeLabel}
          typeIcon={selectedArticle.typeIcon}
          date={selectedArticle.date}
          title={selectedArticle.title}
          excerpt={selectedArticle.excerpt}
          content={selectedArticle.content}
          tags={selectedArticle.tags}
          relatedArticles={selectedArticle.relatedArticles}
        />
      )}
    </>
  )
}

