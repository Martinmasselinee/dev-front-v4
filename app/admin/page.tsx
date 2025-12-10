'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, ChevronDown, Building2, FileText, User, Mail, BookOpen, Search, Users, Phone, Award, Shield, Trash2, AlertTriangle } from 'lucide-react'
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
import { DropdownButton } from '../../components/DropdownButton'
import { Table } from '../../components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { INPUT_HEIGHT } from '../../constants/input'
import { UserInitial } from '../../components/UserInitial'
import { LINE_HEIGHT } from '../../constants/font'

export default function AdminPage() {
  const router = useRouter()
  const [showWorkspacePopup, setShowWorkspacePopup] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  
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
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole as 'admin' | 'user' }
        : user
    ))
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

  type User = typeof users[0]

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <User size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Prénom</Text>
        </div>
      ),
      cell: ({ row }) => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <UserInitial name={row.original.firstName} size="M" />
          <Text size="M" weight="L" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.firstName}</Text>
        </div>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
      },
    },
    {
      accessorKey: 'lastName',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <User size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Nom</Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.lastName}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L})`,
      },
    },
    {
      accessorKey: 'email',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <Mail size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Email</Text>
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="PURPLE" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.email}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE})`,
      },
    },
    {
      accessorKey: 'articlesLus',
      header: () => (
        <div title="Articles lus">
          <BookOpen size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.articlesLus}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'recherchesLancees',
      header: () => (
        <div title="Recherches lancées">
          <Search size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.recherchesLancees}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'entreprisesIdentifiees',
      header: () => (
        <div title="Entreprises identifiées">
          <Building2 size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.entreprisesIdentifiees}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'decideursIdentifies',
      header: () => (
        <div title="Décideurs identifiés">
          <Users size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.decideursIdentifies}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'coordonneesTrouvees',
      header: () => (
        <div title="Coordonnées trouvées">
          <Phone size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.coordonneesTrouvees}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'emailsEnvoyes',
      header: () => (
        <div title="Emails envoyés">
          <Mail size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.emailsEnvoyes}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'partenariatsSignes',
      header: () => (
        <div title="Partenariats signés">
          <Award size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
        </div>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.partenariatsSignes}</Text>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'role',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.FLEX_END, gap: SPACING.S }}>
          <Shield size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.RIGHT }}>Statut</Text>
        </div>
      ),
      cell: ({ row }) => (
        <DropdownButton
          value={row.original.role}
          onChange={(e) => handleRoleChange(row.original.id, e.target.value)}
          disabled={row.original.id === '1'}
          style={{ 
            width: WIDTH.FULL, 
            minWidth: DIMENSION.MIN_WIDTH_ZERO,
            height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
            lineHeight: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
          }}
        >
          <option value="admin">Admin</option>
          <option value="user">Utilisateur</option>
        </DropdownButton>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L})`,
        align: 'right',
        sticky: true,
        stickyRight: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
        borderLeft: true,
      },
    },
    {
      id: 'action',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.FLEX_END, gap: SPACING.S }}>
          <Trash2 size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.RIGHT }}>Action</Text>
        </div>
      ),
      cell: ({ row }) => (
        <Button
          variant="RED"
          onClick={() => handleRemoveUser(row.original.id)}
          disabled={row.original.id === '1'}
          style={{
            width: `calc(${WIDTH.FULL} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
            height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
          }}
        >
          Retirer
        </Button>
      ),
      meta: {
        width: `calc(10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
        align: 'right',
        sticky: true,
        stickyRight: POSITION.ZERO,
      },
    },
  ]

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

  return (
    <>
      <div
        style={{
          minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
          position: POSITION_TYPE.RELATIVE,
          marginLeft: LAYOUT.SIDEBAR_WIDTH,
          paddingTop: `calc(${SPACING.XXXL} + ${SPACING.M})`,
        }}
      >
        <NavbarSidebar />
        <TopBar icon={Settings} title="Administration" rightElement={workspaceButton} />
        <HelpButton />
        
        <div
          style={{
            paddingLeft: SPACING.L,
            paddingRight: SPACING.L,
            paddingTop: SPACING.XL,
            paddingBottom: SPACING.XL,
          }}
        >
          <Table
            data={users}
            columns={columns}
            getRowBackgroundColor={(row, index) => index % 2 === 0 ? COLOR.WHITE : COLOR.GREY.LIGHT}
          />
        </div>
      </div>

      <Popup
        isOpen={showWorkspacePopup}
        onClose={() => setShowWorkspacePopup(false)}
        title="Sélectionner un workspace"
        icon={Building2}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.S,
            }}
          >
            {workspaces.map((workspace) => (
              <Card
                key={workspace.id}
                onClick={() => {
                  setShowWorkspacePopup(false)
                }}
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  backgroundColor: workspace.name === workspaceName ? hexToRgba(COLOR.PURPLE, MULTIPLIER.OPACITY_PURPLE_BACKGROUND) : COLOR.WHITE,
                  border: workspace.name === workspaceName 
                    ? `${BORDER_WIDTH.THIN} solid ${COLOR.PURPLE}` 
                    : `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
                  cursor: CURSOR.POINTER,
                  transition: `border-color ${TRANSITION.FAST_EASE}, background-color ${TRANSITION.FAST_EASE}`,
                }}
                onMouseEnter={(e) => {
                  if (workspace.name !== workspaceName) {
                    e.currentTarget.style.borderColor = COLOR.PURPLE
                  }
                }}
                onMouseLeave={(e) => {
                  if (workspace.name !== workspaceName) {
                    e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
                  }
                }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    alignItems: ALIGN_ITEMS.CENTER,
                    gap: SPACING.S,
                    flex: FLEX.ONE,
                  }}
                >
                  <FileText size={ICON_SIZE.M} style={{ color: workspace.name === workspaceName ? COLOR.PURPLE : COLOR.BLACK, flexShrink: FLEX.ZERO }} />
                  <Text 
                    size="M" 
                    weight="L" 
                    color={workspace.name === workspaceName ? 'PURPLE' : 'BLACK'}
                    style={{
                      overflow: OVERFLOW.HIDDEN,
                      textOverflow: TEXT_OVERFLOW.ELLIPSIS,
                      whiteSpace: WHITE_SPACE.NOWRAP,
                      flex: FLEX.ONE,
                    }}
                  >
                    {workspace.name}
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
                      flexShrink: FLEX.ZERO,
                    }}
                  >
                    <Text size="S" weight="M" color="GREY_DARK">
                      {workspace.role === 'owner' ? 'admin' : 'membre'}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button
            variant="PURPLE"
            onClick={() => {
              setShowWorkspacePopup(false)
              router.push('/create-workspace')
            }}
          >
            Créer un nouveau workspace
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
            Êtes-vous sûr de vouloir retirer {getUserToDeleteName()} de ce workspace ?
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

