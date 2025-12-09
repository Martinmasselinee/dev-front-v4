'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Users, Mail, X, UserPlus, AlertTriangle, Sparkles, ScanLine, Inbox, FileText, TrendingUp, Building2, Tag, Zap, Award, DollarSign, Youtube, Shirt } from 'lucide-react'
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
import { Card } from '../../components/Card'
import { IconButton } from '../../components/IconButton'
import { Container } from '../../components/Container'
import { COLOR } from '../../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../constants/border'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { TEXT_ALIGN } from '../../constants/text'

export default function RadarAIPage() {
  const searchParams = useSearchParams()
  const [showAddUsersPopup, setShowAddUsersPopup] = useState(false)
  const [invitedUsers, setInvitedUsers] = useState<string[]>([])
  const [currentEmailInput, setCurrentEmailInput] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [timeRange, setTimeRange] = useState('all')
  const [articleType, setArticleType] = useState('all')
  const [nouveauxArticles, setNouveauxArticles] = useState('0')
  const [totalArticles, setTotalArticles] = useState('0')
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
    if (currentEmailInput.trim() && !invitedUsers.includes(currentEmailInput.trim())) {
      setInvitedUsers([...invitedUsers, currentEmailInput.trim()])
      setCurrentEmailInput('')
    }
  }

  const handleDeleteClick = (email: string) => {
    setUserToDelete(email)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setInvitedUsers(invitedUsers.filter((userEmail) => userEmail !== userToDelete))
      setUserToDelete(null)
      setShowDeleteConfirm(false)
    }
  }

  const handleCancelDelete = () => {
    setUserToDelete(null)
    setShowDeleteConfirm(false)
  }

  const getFirstLetter = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  // Combine current user and invited users for display
  const allUsers = [
    { email: currentUserEmail, role: 'admin' as const },
    ...invitedUsers.map((email) => ({ email, role: 'utilisateur' as const }))
  ]

  const timeframeOptions = [
    { value: '24h', label: 'Dernières 24h' },
    { value: '7d', label: '7 derniers jours' },
    { value: '30d', label: '30 derniers jours' },
    { value: 'all', label: 'Toute l\'activité' },
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

  const selectedTimeframeOption = timeframeOptions.find(option => option.value === timeRange) || timeframeOptions[timeframeOptions.length - 1]

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
        {nouveauxArticles} nouveaux articles
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
          paddingTop: `calc((${SPACING.XXXL} + ${SPACING.M}) + ((${SPACING.XXXL} + ${SPACING.M}) * 0.8))`,
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
          hideBorder={true}
        />
        <TopBar 
          icon={ScanLine} 
          title="Radar IA"
          variant="stickyPurple"
          additionalText={stickyPurpleTitle}
          dropdownOptions={articleOptions}
          dropdownValue={articleType}
          onDropdownChange={setArticleType}
          secondDropdownOptions={timeframeOptions}
          secondDropdownValue={timeRange}
          onSecondDropdownChange={setTimeRange}
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
                <EmptyStateIcon
                  size={ICON_SIZE.XL * 2}
                  strokeWidth={1.5}
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
                  {emptyStateContent.title}
                </Text>
                <Text
                  size="M"
                  weight="M"
                  color="GREY_DARK"
                  style={{
                    textAlign: TEXT_ALIGN.CENTER,
                  }}
                >
                  {emptyStateContent.description}
                </Text>
              </div>
            </div>
          </div>
        </Container>
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
              variant="BLACK"
              onClick={handleInviteUser}
              type="button"
              icon={<UserPlus size={ICON_SIZE.M} />}
              style={{ width: `calc(${POSITION.CENTER} * 0.5)` }}
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
                  <div
                    style={{
                      width: ICON_SIZE.L,
                      height: ICON_SIZE.L,
                      borderRadius: BORDER_RADIUS.CIRCLE,
                      backgroundColor: COLOR.BLACK,
                      display: DISPLAY.FLEX,
                      alignItems: ALIGN_ITEMS.CENTER,
                      justifyContent: JUSTIFY_CONTENT.CENTER,
                      flexShrink: FLEX.ZERO,
                    }}
                  >
                    <Text size="S" weight="XL" color="WHITE">
                      {getFirstLetter(user.email)}
                    </Text>
                  </div>
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
                    <div
                      style={{
                        paddingLeft: SPACING.XS,
                        paddingRight: SPACING.XS,
                        paddingTop: SPACING.XS,
                        paddingBottom: SPACING.XS,
                        backgroundColor: COLOR.WHITE,
                        border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
                        borderRadius: BORDER_RADIUS.S,
                      }}
                    >
                      <Text size="S" weight="M" color="GREY_DARK">
                        {user.role === 'admin' ? 'admin' : 'utilisateur'}
                      </Text>
                    </div>
                  </div>
                </div>
                {user.role === 'utilisateur' && (
                  <IconButton
                    onClick={() => handleDeleteClick(user.email)}
                    icon={<X size={ICON_SIZE.M} />}
                    style={{ color: COLOR.GREY.DARK }}
                  />
                )}
              </Card>
            ))}
          </div>

          <Button
            variant="PURPLE"
            onClick={() => setShowAddUsersPopup(false)}
            icon={<Sparkles size={ICON_SIZE.M} />}
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
    </>
  )
}

