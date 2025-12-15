'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Users, Mail, AlertTriangle, Sparkles, ScanLine, Inbox, FileText, TrendingUp, Building2, Tag, Zap, Award, DollarSign, Youtube, Shirt, Plus } from 'lucide-react'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Container } from '../../components/Container'
import { ArticleCard } from './components/ArticleCard'
import { ArticlePopup } from './components/ArticlePopup'
import { Dot } from '../../components/Dot'
import { Text } from '../../components/Text'
import { LAYOUT } from '../../constants/layout'
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
import { BORDER_WIDTH } from '../../constants/border'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX, FLEX_WRAP } from '../../constants/flex'
import { TEXT_ALIGN } from '../../constants/text'
import { MULTIPLIER } from '../../constants/multiplier'
import { STRING } from '../../constants/string'
import { INPUT_HEIGHT } from '../../constants/input'
import { WIDTH } from '../../constants/width'
import { DIMENSION } from '../../constants/dimension'
import { TABLE } from '../../constants/table'
import { TIME_RANGE } from '../../constants/filter'
import { findOptionOrDefault } from '../../lib/arrayUtils'

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
    content: string
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
    { value: TIME_RANGE.ALL, label: 'Tous les articles' },
    { value: 'sponsoring', label: 'Sponsoring' },
    { value: 'marques', label: 'Marques' },
    { value: 'activations', label: 'Activations' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'nominations', label: 'Nominations' },
    { value: 'levees', label: 'Levées de fonds' },
    { value: 'youtube', label: 'YouTube Sponsors' },
    { value: 'partenariat', label: 'Partenariat officiel maillot' },
  ]

  const selectedTimeframeOption = findOptionOrDefault(timeframeOptions, timeRange)

  // Get icon and description based on article type and timeframe
  const getEmptyStateContent = () => {
    const articleTypeLabel = articleOptions.find(opt => opt.value === articleType)?.label || 'article'
    const timeframeLabel = timeframeOptions.find(opt => opt.value === timeRange)?.label || 'cette période'

    let icon = Inbox
    let title = 'Aucun article trouvé'
    let description = `Aucun article récupéré par les agents IA pour ${timeframeLabel.toLowerCase()}.`

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
          icon={ScanLine} 
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
          <Container variant="fullWidth">
            <Card style={{ marginTop: SPACING.XL, backgroundColor: COLOR.WHITE, paddingTop: SPACING.L, paddingRight: SPACING.XXL }}>
              <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.FLEX_START, gap: SPACING.M }}>
                <Sparkles size={ICON_SIZE.L} style={{ color: COLOR.PURPLE, flexShrink: FLEX.ZERO, marginTop: SPACING.XS }} />
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

            {/* 3-column article layout */}
            <div style={{ marginTop: SPACING.XL }}>
              <div style={{ width: WIDTH.FULL }}>
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    gap: SPACING.L,
                    flexWrap: FLEX_WRAP.WRAP,
                  }}
                >
                {/* Mock article data - replace with actual data later */}
                {[
                  {
                    type: 'sponsoring',
                    typeLabel: 'Sponsoring',
                    typeIcon: TrendingUp,
                    date: '15/01/2025',
                    title: 'Nouveau partenariat stratégique annoncé',
                    excerpt: 'Un nouveau partenariat majeur vient d\'être annoncé dans le monde du sponsoring sportif, marquant une étape importante pour les deux parties impliquées.',
                    content: 'Un nouveau partenariat majeur vient d\'être annoncé dans le monde du sponsoring sportif, marquant une étape importante pour les deux parties impliquées. Cette collaboration stratégique représente un investissement significatif dans le domaine du sport professionnel et ouvre de nouvelles perspectives pour les deux entités.\n\nLes détails de ce partenariat incluent des engagements à long terme qui permettront de développer des initiatives communes dans le domaine du marketing sportif, de la communication et de l\'engagement communautaire. Les deux parties ont exprimé leur enthousiasme quant aux opportunités que cette collaboration apportera.\n\nCe type de partenariat démontre l\'importance croissante du sponsoring sportif dans les stratégies marketing modernes, où les marques cherchent à créer des connexions authentiques avec leur audience à travers le sport.',
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
                    date: '14/01/2025',
                    title: 'Tendances marketing sportif 2025',
                    excerpt: 'Les tendances du marketing sportif évoluent rapidement, avec de nouvelles approches innovantes qui transforment le paysage du sponsoring.',
                    content: 'Les tendances du marketing sportif évoluent rapidement, avec de nouvelles approches innovantes qui transforment le paysage du sponsoring. L\'année 2025 marque un tournant dans la manière dont les marques interagissent avec le monde du sport.\n\nLes nouvelles technologies, notamment l\'intelligence artificielle et la réalité augmentée, ouvrent des possibilités inédites pour créer des expériences immersives pour les fans. Les marques investissent de plus en plus dans des campagnes digitales qui permettent une interaction directe avec leur audience.\n\nL\'authenticité et la transparence sont également devenues des valeurs centrales. Les consommateurs recherchent des partenariats qui reflètent leurs propres valeurs, poussant les marques à s\'engager dans des causes sociales et environnementales significatives.',
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
                    date: '13/01/2025',
                    title: 'Campagne d\'activation réussie',
                    excerpt: 'Une campagne d\'activation récente a démontré l\'efficacité des nouvelles stratégies de communication dans le domaine sportif.',
                    content: 'Une campagne d\'activation récente a démontré l\'efficacité des nouvelles stratégies de communication dans le domaine sportif. Cette initiative a permis d\'atteindre des résultats exceptionnels en termes d\'engagement et de visibilité.\n\nLa campagne a combiné plusieurs canaux de communication, incluant les réseaux sociaux, les événements en direct, et des partenariats avec des influenceurs du monde sportif. Cette approche multi-canal a permis de toucher une audience diversifiée et d\'amplifier le message de la marque.\n\nLes résultats quantitatifs montrent une augmentation significative de l\'engagement, avec des taux d\'interaction qui dépassent les moyennes du secteur. Cette réussite démontre l\'importance d\'une stratégie bien pensée et d\'une exécution soignée dans le domaine du marketing sportif.',
                    tags: ['Campagne', 'Succès'],
                    relatedArticles: [
                      { title: 'Comment créer une campagne d\'activation réussie', url: 'https://example.com/activation-campaign' },
                      { title: 'Stratégies multi-canaux pour le marketing sportif', url: 'https://example.com/multi-channel' },
                    ],
                  },
                ].map((article, index) => (
                  <div
                    key={index}
                    style={{
                      flex: `1 1 calc(33.333% - ${SPACING.L})`,
                      minWidth: DIMENSION.SEARCH_INPUT_WIDTH,
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
            </div>
          </Container>
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

