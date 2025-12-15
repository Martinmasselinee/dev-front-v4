'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, ChevronDown, Building2, FileText, Mail, BookOpen, Search, Users, Phone, Award, Shield, Trash2, AlertTriangle, Brain, Calendar } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { POSITION_TYPE, POSITION } from '../../constants/position'
import { NavbarSidebar } from '../../components/NavbarSidebar'
import { TopBar } from '../../components/TopBar'
import { HelpButton } from '../../components/HelpButton'
import { Button } from '../../components/Button'
import { Popup } from '../../components/Popup'
import { Card } from '../../components/Card'
import { Text } from '../../components/Text'
import { Dot } from '../../components/Dot'
import { COLOR } from '../../constants/color'
import { BORDER_WIDTH } from '../../constants/border'
import { ICON_SIZE } from '../../constants/iconSize'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { DISPLAY } from '../../constants/display'
import { CURSOR } from '../../constants/interaction'
import { TRANSITION } from '../../constants/transition'
import { MULTIPLIER } from '../../constants/multiplier'
import { hexToRgba } from '../../lib/colorUtils'
import { OVERFLOW } from '../../constants/overflow'
import { TEXT_OVERFLOW } from '../../constants/text'
import { WHITE_SPACE } from '../../constants/text'
import { TEXT_TRANSFORM, LETTER_SPACING, TEXT_ALIGN } from '../../constants/text'
import { BORDER_RADIUS } from '../../constants/border'
import { WIDTH } from '../../constants/width'
import { Heading } from '../../components/Heading'
import { IconButton } from '../../components/IconButton'
import { FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { Z_INDEX } from '../../constants/zIndex'
import { DIMENSION } from '../../constants/dimension'
import { INPUT_HEIGHT, INPUT_MAX, INPUT_STEP, TEXTAREA_ROWS } from '../../constants/input'
import { BUTTON_HEIGHT } from '../../constants/button'
import { UserInitial } from '../../components/UserInitial'
import { LINE_HEIGHT } from '../../constants/font'
import { Input } from '../../components/Input'
import { StatusBubble } from '../../components/StatusBubble'
import { TABLE } from '../../constants/table'
import { NUMBER } from '../../constants/number'
import { PERSONALISATION } from '../../constants/personalisation'
import { DeleteConfirmPopup } from './components/DeleteConfirmPopup'
import { RoleChangeConfirmPopup } from './components/RoleChangeConfirmPopup'
import { WorkspaceSelectionPopup } from './components/WorkspaceSelectionPopup'
import { UserTable } from './components/UserTable'
import { PersonnaliserPopup } from './components/PersonnaliserPopup'
import type { User } from './components/UserTable'

export default function AdminPage() {
  const router = useRouter()
  const [showWorkspacePopup, setShowWorkspacePopup] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [showRoleChangeConfirm, setShowRoleChangeConfirm] = useState(false)
  const [userToChangeRole, setUserToChangeRole] = useState<{ id: string; newRole: string } | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [showPersonnaliserPopup, setShowPersonnaliserPopup] = useState(false)
  const [personnalisationsCount, setPersonnalisationsCount] = useState<{ added: number; total: number }>({ added: NUMBER.ZERO, total: PERSONALISATION.BASE_COUNT })
  
  // Workspace data (should match NavbarSidebar)
  const workspaceName = 'SRFC'
  const workspaces = [
    { id: '1', name: 'SRFC', role: 'owner' as const },
    { id: '2', name: 'Paris Saint-Germain', role: 'member' as const },
    { id: '3', name: 'Olympique de Marseille', role: 'member' as const },
    { id: '4', name: 'AS Monaco', role: 'owner' as const },
  ]

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: '1',
      firstName: 'Martin',
      lastName: 'Masseline',
      email: 'martin@dataxx.fr',
      emailConnecte: true,
      articlesLus: 45,
      recherchesLancees: 12,
      entreprisesIdentifiees: 8,
      decideursIdentifies: 15,
      coordonneesTrouvees: 23,
      emailsEnvoyes: 18,
      partenariatsSignes: 3,
      role: 'admin' as const,
    },
    {
      id: '2',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@dataxx.fr',
      emailConnecte: false,
      articlesLus: 32,
      recherchesLancees: 9,
      entreprisesIdentifiees: 5,
      decideursIdentifies: 11,
      coordonneesTrouvees: 16,
      emailsEnvoyes: 12,
      partenariatsSignes: 2,
      role: 'user' as const,
    },
    {
      id: '3',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie@dataxx.fr',
      emailConnecte: true,
      articlesLus: 28,
      recherchesLancees: 7,
      entreprisesIdentifiees: 4,
      decideursIdentifies: 9,
      coordonneesTrouvees: 14,
      emailsEnvoyes: 10,
      partenariatsSignes: 1,
      role: 'user' as const,
    },
  ])

  const handleRoleChange = (userId: string, newRole: string) => {
    setUserToChangeRole({ id: userId, newRole })
    setShowRoleChangeConfirm(true)
  }

  const handleConfirmRoleChange = () => {
    if (userToChangeRole) {
      setUsers(users.map(user => 
        user.id === userToChangeRole.id 
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
    const user = users.find(u => u.id === userToChangeRole?.id)
    return user ? `${user.firstName} ${user.lastName}` : ''
  }

  const getRoleChangeText = () => {
    if (!userToChangeRole) return ''
    const currentUser = users.find(u => u.id === userToChangeRole.id)
    if (!currentUser) return ''
    const currentRole = currentUser.role === 'admin' ? 'administrateur' : 'utilisateur'
    const newRole = userToChangeRole.newRole === 'admin' ? 'administrateur' : 'utilisateur'
    return `passer de ${currentRole} à ${newRole}`
  }

  const handleRemoveUser = (userId: string) => {
    setUserToDelete(userId)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete))
      setUserToDelete(null)
      setShowDeleteConfirm(false)
    }
  }

  const handleCancelDelete = () => {
    setUserToDelete(null)
    setShowDeleteConfirm(false)
  }

  const getUserToDeleteName = () => {
    const user = users.find(u => u.id === userToDelete)
    return user ? `${user.firstName} ${user.lastName}` : ''
  }

  // Filter users based on search value (firstName and lastName)
  const filteredUsers = users.filter(user => {
    if (!searchValue.trim()) {
      return true
    }
    const searchLower = searchValue.toLowerCase().trim()
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const firstName = user.firstName.toLowerCase()
    const lastName = user.lastName.toLowerCase()
    
    return fullName.includes(searchLower) || 
           firstName.includes(searchLower) || 
           lastName.includes(searchLower)
  })


  const workspaceButton = (
    <Button
      variant="WHITE"
      onClick={() => setShowWorkspacePopup(true)}
      style={{
        width: WIDTH.AUTO,
        paddingLeft: SPACING.M,
        paddingRight: SPACING.M,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="L" color="BLACK">
        {workspaceName}
      </Text>
      <ChevronDown size={ICON_SIZE.M} style={{ color: COLOR.BLACK }} />
    </Button>
  )

  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        Personnalisez la mémoire IA
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {personnalisationsCount.added}/{personnalisationsCount.total} personnalisations ajoutées
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
        <TopBar icon={Settings} title="Administration" rightElement={workspaceButton} hideBorder={true} />
        <TopBar 
          icon={Brain} 
          title=""
          variant="stickyPurple"
          additionalText={stickyPurpleTitle}
          rightElement={
            <Button
              variant="BLACK"
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
              onClick={() => setShowPersonnaliserPopup(true)}
            >
              Personnaliser
            </Button>
          }
        />
        <HelpButton />
        
        <div
          style={{
            paddingTop: SPACING.XL,
            paddingBottom: SPACING.XL,
          }}
        >
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
              gap: SPACING.S,
              marginBottom: SPACING.L,
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Users size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO, transition: `color ${TRANSITION.FAST_EASE}` }} />
              <Text size="M" weight="L" style={{ color: COLOR.BLACK, transition: `color ${TRANSITION.FAST_EASE}` }}>
                Utilisateurs
              </Text>
            </div>
            <div
              style={{
                width: DIMENSION.SEARCH_INPUT_WIDTH,
                flexShrink: FLEX.ZERO,
              }}
            >
              <Input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                icon={<Search size={ICON_SIZE.M} />}
                variant="search"
              />
            </div>
          </div>
          <UserTable
            users={filteredUsers}
            onRoleChange={handleRoleChange}
            onRemoveUser={handleRemoveUser}
          />
        </div>
      </div>

      <WorkspaceSelectionPopup
        isOpen={showWorkspacePopup}
        onClose={() => setShowWorkspacePopup(false)}
        workspaces={workspaces}
        currentWorkspaceName={workspaceName}
      />

      <DeleteConfirmPopup
        isOpen={showDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        userName={getUserToDeleteName()}
      />

      <Popup
        isOpen={showRoleChangeConfirm}
        onClose={handleCancelRoleChange}
        title="Confirmer le changement de rôle"
        icon={Shield}
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
            Êtes-vous sûr de vouloir {getRoleChangeText()} pour {getUserToChangeRoleName()} ?
          </Text>

          <div
            style={{
              display: DISPLAY.FLEX,
              gap: SPACING.M,
            }}
          >
            <Button
              variant="WHITE"
              onClick={handleCancelRoleChange}
              type="button"
              style={{ flex: FLEX.ONE }}
            >
              Annuler
            </Button>
            <Button
              variant="BLACK"
              onClick={handleConfirmRoleChange}
              type="button"
              style={{ flex: FLEX.ONE }}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </Popup>

      <PersonnaliserPopup
        isOpen={showPersonnaliserPopup}
        onClose={() => setShowPersonnaliserPopup(false)}
        onPersonnalisationsCountChange={setPersonnalisationsCount}
      />
    </>
  )
}


