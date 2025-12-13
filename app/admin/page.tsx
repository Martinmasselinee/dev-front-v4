'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, ChevronDown, Building2, FileText, User, Mail, BookOpen, Search, Users, Phone, Award, Shield, Trash2, AlertTriangle, Brain, Presentation, Info, Share2, Globe, Linkedin, Instagram, Facebook, Plus, BarChart3, Users2, GraduationCap, DollarSign, Heart, Star, Calendar } from 'lucide-react'
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
import { DropdownButton } from '../../components/DropdownButton'
import { Table } from '../../components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { INPUT_HEIGHT } from '../../constants/input'
import { BUTTON_HEIGHT } from '../../constants/button'
import { UserInitial } from '../../components/UserInitial'
import { LINE_HEIGHT } from '../../constants/font'
import { Input } from '../../components/Input'
import { StatusBubble } from '../../components/StatusBubble'
import { FileUpload } from '../../components/FileUpload'
import { FormGroup } from '../../components/FormGroup'
import { Textarea } from '../../components/Textarea'
import { Select } from '../../components/Select'
import { Slider } from '../../components/Slider'
import { SLIDER } from '../../constants/slider'
import { NUMBER } from '../../constants/number'
import { STRING } from '../../constants/string'
import { TABLE } from '../../constants/table'
import { PERSONALISATION } from '../../constants/personalisation'

export default function AdminPage() {
  const router = useRouter()
  const [showWorkspacePopup, setShowWorkspacePopup] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [showRoleChangeConfirm, setShowRoleChangeConfirm] = useState(false)
  const [userToChangeRole, setUserToChangeRole] = useState<{ id: string; newRole: string } | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [showPersonaliserPopup, setShowPersonaliserPopup] = useState(false)
  
  // Personaliser form states
  const [workspaceNom, setWorkspaceNom] = useState('')
  const [workspaceTypeNom, setWorkspaceTypeNom] = useState('')
  const [nomAbrege, setNomAbrege] = useState('')
  const [workspaceType, setWorkspaceType] = useState('')
  const [description, setDescription] = useState('')
  const [siteWeb, setSiteWeb] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [socialUrls, setSocialUrls] = useState<Array<{ id: string; url: string }>>([])
  const [deckFile, setDeckFile] = useState<File | null>(null)
  
  // Analytics fanbase states
  const [abonnesStade, setAbonnesStade] = useState('')
  const [abonnesLoges, setAbonnesLoges] = useState('')
  const [visiteursSiteWeb, setVisiteursSiteWeb] = useState('')
  const [abonnesLinkedin, setAbonnesLinkedin] = useState('')
  const [abonnesInstagram, setAbonnesInstagram] = useState('')
  const [abonnesFacebook, setAbonnesFacebook] = useState('')
  const [abonnesTiktok, setAbonnesTiktok] = useState('')
  
  // Répartition genre fanbase states
  const [homme, setHomme] = useState('')
  const [femme, setFemme] = useState('')
  const [famille, setFamille] = useState('')
  
  // Répartition socio-démographique fanbase states
  const [etudiants, setEtudiants] = useState('')
  const [sansEmploi, setSansEmploi] = useState('')
  const [salaries, setSalaries] = useState('')
  const [ouvriers, setOuvriers] = useState('')
  const [cadres, setCadres] = useState('')
  const [cadresSuperieurs, setCadresSuperieurs] = useState('')
  const [retraites, setRetraites] = useState('')
  
  // Répartition revenus fanbase states
  const [moins10k, setMoins10k] = useState('')
  const [dixTrenteK, setDixTrenteK] = useState('')
  const [trenteCinquanteK, setTrenteCinquanteK] = useState('')
  const [cinquanteQuatreVingtK, setCinquanteQuatreVingtK] = useState('')
  const [plusQuatreVingtK, setPlusQuatreVingtK] = useState('')
  
  // Répartition age fanbase states
  const [enfants, setEnfants] = useState('')
  const [dixSeptVingtCinq, setDixSeptVingtCinq] = useState('')
  const [vingtCinqTrente, setVingtCinqTrente] = useState('')
  const [trenteQuarante, setTrenteQuarante] = useState('')
  const [quaranteSoixante, setQuaranteSoixante] = useState('')
  const [plusSoixante, setPlusSoixante] = useState('')
  
  // Centres d'intérêts fanbase states
  const [centresInterets, setCentresInterets] = useState<Array<{ id: string; value: string }>>([{ id: Date.now().toString(), value: '' }])
  
  // Valeurs de la marque states
  const [valeursMarque, setValeursMarque] = useState<Array<{ id: string; value: string }>>([{ id: Date.now().toString(), value: '' }])
  
  // Track initial values to detect changes
  const [initialValues] = useState({
    deckFile: null as File | null,
    workspaceNom: '',
    workspaceTypeNom: '',
    nomAbrege: '',
    workspaceType: '',
    description: '',
    siteWeb: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    socialUrls: [] as Array<{ id: string; url: string }>,
    abonnesStade: '',
    abonnesLoges: '',
    visiteursSiteWeb: '',
    abonnesLinkedin: '',
    abonnesInstagram: '',
    abonnesFacebook: '',
    abonnesTiktok: '',
    homme: '',
    femme: '',
    famille: '',
    etudiants: '',
    sansEmploi: '',
    salaries: '',
    ouvriers: '',
    cadres: '',
    cadresSuperieurs: '',
    retraites: '',
    moins10k: '',
    dixTrenteK: '',
    trenteCinquanteK: '',
    cinquanteQuatreVingtK: '',
    plusQuatreVingtK: '',
    enfants: '',
    dixSeptVingtCinq: '',
    vingtCinqTrente: '',
    trenteQuarante: '',
    quaranteSoixante: '',
    plusSoixante: '',
    centresInterets: [] as Array<{ id: string; value: string }>,
    valeursMarque: [] as Array<{ id: string; value: string }>,
  })
  
  // Check if anything has been edited
  const hasChanges = 
    deckFile !== initialValues.deckFile ||
    workspaceNom !== initialValues.workspaceNom ||
    workspaceTypeNom !== initialValues.workspaceTypeNom ||
    nomAbrege !== initialValues.nomAbrege ||
    workspaceType !== initialValues.workspaceType ||
    description !== initialValues.description ||
    siteWeb !== initialValues.siteWeb ||
    linkedin !== initialValues.linkedin ||
    instagram !== initialValues.instagram ||
    facebook !== initialValues.facebook ||
    tiktok !== initialValues.tiktok ||
    JSON.stringify(socialUrls) !== JSON.stringify(initialValues.socialUrls) ||
    abonnesStade !== initialValues.abonnesStade ||
    abonnesLoges !== initialValues.abonnesLoges ||
    visiteursSiteWeb !== initialValues.visiteursSiteWeb ||
    abonnesLinkedin !== initialValues.abonnesLinkedin ||
    abonnesInstagram !== initialValues.abonnesInstagram ||
    abonnesFacebook !== initialValues.abonnesFacebook ||
    abonnesTiktok !== initialValues.abonnesTiktok ||
    homme !== initialValues.homme ||
    femme !== initialValues.femme ||
    famille !== initialValues.famille ||
    etudiants !== initialValues.etudiants ||
    sansEmploi !== initialValues.sansEmploi ||
    salaries !== initialValues.salaries ||
    ouvriers !== initialValues.ouvriers ||
    cadres !== initialValues.cadres ||
    cadresSuperieurs !== initialValues.cadresSuperieurs ||
    retraites !== initialValues.retraites ||
    moins10k !== initialValues.moins10k ||
    dixTrenteK !== initialValues.dixTrenteK ||
    trenteCinquanteK !== initialValues.trenteCinquanteK ||
    cinquanteQuatreVingtK !== initialValues.cinquanteQuatreVingtK ||
    plusQuatreVingtK !== initialValues.plusQuatreVingtK ||
    enfants !== initialValues.enfants ||
    dixSeptVingtCinq !== initialValues.dixSeptVingtCinq ||
    vingtCinqTrente !== initialValues.vingtCinqTrente ||
    trenteQuarante !== initialValues.trenteQuarante ||
    quaranteSoixante !== initialValues.quaranteSoixante ||
    plusSoixante !== initialValues.plusSoixante ||
    JSON.stringify(centresInterets) !== JSON.stringify(initialValues.centresInterets) ||
    JSON.stringify(valeursMarque) !== JSON.stringify(initialValues.valeursMarque)
  
  const handleSave = () => {
    // TODO: Save logic
    console.log('Saving personalisations...')
    // Reset initial values after save
    setShowPersonaliserPopup(false)
  }
  
  // Handle homme/femme interaction - they must sum to 100
  const handleHommeChange = (value: number) => {
    if (value >= NUMBER.ZERO && value <= NUMBER.PERCENTAGE_MAX) {
      setHomme(value.toString())
      const newFemme = Math.max(NUMBER.ZERO, NUMBER.PERCENTAGE_MAX - value)
      setFemme(newFemme.toString())
    }
  }
  
  const handleFemmeChange = (value: number) => {
    if (value >= NUMBER.ZERO && value <= NUMBER.PERCENTAGE_MAX) {
      setFemme(value.toString())
      const newHomme = Math.max(NUMBER.ZERO, NUMBER.PERCENTAGE_MAX - value)
      setHomme(newHomme.toString())
    }
  }
  
  // Calculate personalisations count
  // Base fields: deck, workspaceNom, workspaceTypeNom, nomAbrege, workspaceType, description, siteWeb, linkedin, instagram, facebook, tiktok
  const basePersonalisations = PERSONALISATION.BASE_COUNT
  const dynamicUrlsCount = socialUrls.length
  const totalPersonalisations = basePersonalisations + dynamicUrlsCount
  
  const addedPersonalisations = [
    deckFile,
    workspaceNom.trim(),
    workspaceTypeNom.trim(),
    nomAbrege.trim(),
    workspaceType,
    description.trim(),
    siteWeb.trim(),
    linkedin.trim(),
    instagram.trim(),
    facebook.trim(),
    tiktok.trim(),
    ...socialUrls.map(url => url.url.trim()),
  ].filter(value => value !== null && value !== '' && value !== undefined).length
  
  const stickyPurpleTitle = (
    <div
      style={{
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        gap: SPACING.S,
      }}
    >
      <Text size="M" weight="M" color="PURPLE">
        Personalisez la mémoire IA
      </Text>
      <Dot marginLeft={SPACING.XS} marginRight={SPACING.XS} />
      <Text size="M" weight="M" color="PURPLE">
        {addedPersonalisations}/{totalPersonalisations} personalisations ajoutées
      </Text>
    </div>
  )
  
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

  type User = typeof users[0]

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      header: () => (
        <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Prénom</Text>
      ),
      cell: ({ row }) => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <UserInitial name={row.original.firstName} size="M" />
          <Text size="M" weight="L" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.firstName}</Text>
        </div>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
      },
    },
    {
      accessorKey: 'lastName',
      header: () => (
        <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Nom</Text>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.lastName}</Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
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
        <Text size="M" weight="M" color="GREY_DARK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.email}</Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE})`,
      },
    },
    {
      accessorKey: 'emailConnecte',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.FLEX_START, gap: SPACING.S }}>
          <Mail size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.LEFT }}>Intégration</Text>
        </div>
      ),
      cell: ({ row }) => {
        const isConnecte = row.original.emailConnecte
        return (
          <StatusBubble
            label={isConnecte ? 'connecté' : 'non connecté'}
            variant={isConnecte ? 'green' : 'red'}
            style={{
              textAlign: TEXT_ALIGN.LEFT,
            }}
          />
        )
      },
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
        align: 'left',
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
        align: 'center',
      },
    },
    {
      accessorKey: 'role',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
          <Shield size={ICON_SIZE.S} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.CENTER }}>Statut</Text>
        </div>
      ),
      cell: ({ row }) => (
        <DropdownButton
          value={row.original.role}
          onChange={(e) => {
            if (e.target.value !== row.original.role) {
              handleRoleChange(row.original.id, e.target.value)
            }
          }}
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
        align: 'center',
        sticky: true,
        stickyRight: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
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
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
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
              icon={<Brain size={ICON_SIZE.M} />}
              onClick={() => setShowPersonaliserPopup(true)}
            >
              Personaliser
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
          <Table
            data={filteredUsers}
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

      <Popup
        isOpen={showPersonaliserPopup}
        onClose={() => setShowPersonaliserPopup(false)}
        title="Personaliser la mémoire IA"
        icon={Brain}
        rightElement={
          <Button
            variant="BLACK"
            disabled={!hasChanges}
            onClick={handleSave}
            style={{ 
              width: WIDTH.AUTO, 
              paddingLeft: SPACING.L, 
              paddingRight: SPACING.L,
              height: BUTTON_HEIGHT.OVERLAY,
            }}
          >
            Enregistrer
          </Button>
        }
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.XXL,
          }}
        >
          {/* Deck commercial subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Presentation size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Deck commercial
              </Text>
            </div>
            <FileUpload
              onFileSelect={(file) => {
                setDeckFile(file)
              }}
            />
          </div>

          {/* Informations workspace subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Info size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Informations workspace
              </Text>
            </div>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Nom du workspace
              </Text>
              <Input
                type="text"
                value={workspaceNom}
                onChange={(e) => setWorkspaceNom(e.target.value)}
                placeholder="Nom du workspace"
                icon={<Building2 size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                {workspaceType === 'club-sportif' 
                  ? 'Nom du club sportif'
                  : workspaceType === 'athlete'
                  ? "Nom de l'athlète"
                  : workspaceType === 'evenement-sportif'
                  ? "Nom de l'événement sportif"
                  : workspaceType === 'media-sportif'
                  ? 'Nom du média sportif'
                  : 'Nom du "type de workspace"'}
              </Text>
              <Input
                type="text"
                value={workspaceTypeNom}
                onChange={(e) => setWorkspaceTypeNom(e.target.value)}
                placeholder={
                  workspaceType === 'club-sportif' 
                    ? 'Nom du club sportif'
                    : workspaceType === 'athlete'
                    ? "Nom de l'athlète"
                    : workspaceType === 'evenement-sportif'
                    ? "Nom de l'événement sportif"
                    : workspaceType === 'media-sportif'
                    ? 'Nom du média sportif'
                    : 'Nom du "type de workspace"'
                }
                icon={<Building2 size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Nom abrégé (optionnel)
              </Text>
              <Input
                type="text"
                value={nomAbrege}
                onChange={(e) => setNomAbrege(e.target.value)}
                placeholder="Nom abrégé"
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Type de workspace
              </Text>
              <Select
                value={workspaceType}
                onChange={(e) => setWorkspaceType(e.target.value)}
                icon={<Building2 size={ICON_SIZE.M} />}
              >
                <option value="">Sélectionnez un type</option>
                <option value="club-sportif">Club sportif</option>
                <option value="athlete">Athlète</option>
                <option value="evenement-sportif">Événement sportif</option>
                <option value="media-sportif">Média sportif</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Description (optionnel)
              </Text>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
              />
            </FormGroup>
          </div>

          {/* Socials subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Share2 size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Socials
              </Text>
            </div>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Url du site web
              </Text>
              <Input
                type="url"
                value={siteWeb}
                onChange={(e) => setSiteWeb(e.target.value)}
                placeholder="https://example.com"
                icon={<Globe size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Url du compte linkedin
              </Text>
              <Input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/company/..."
                icon={<Linkedin size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Url du compte instagram
              </Text>
              <Input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..."
                icon={<Instagram size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Url du compte facebook
              </Text>
              <Input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
                icon={<Facebook size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Url du compte tiktok
              </Text>
              <Input
                type="url"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/@..."
                icon={<Globe size={ICON_SIZE.M} />}
              />
            </FormGroup>
            {socialUrls.map((socialUrl, index) => (
              <FormGroup key={socialUrl.id}>
                {index === 0 && (
                  <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                    Url supplémentaire
                  </Text>
                )}
                <Input
                  type="url"
                  value={socialUrl.url}
                  onChange={(e) => {
                    setSocialUrls(
                      socialUrls.map((url) =>
                        url.id === socialUrl.id ? { ...url, url: e.target.value } : url
                      )
                    )
                  }}
                  placeholder="https://..."
                  icon={<Globe size={ICON_SIZE.M} />}
                  actionButton={
                    <Button
                      variant="RED"
                      onClick={() => {
                        setSocialUrls(socialUrls.filter((url) => url.id !== socialUrl.id))
                      }}
                      style={{
                        width: `calc((10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY}) * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
                        height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
                        flexShrink: FLEX.ZERO,
                      }}
                    >
                      Retirer
                    </Button>
                  }
                />
              </FormGroup>
            ))}
            <Button
              variant="BLACK"
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
              icon={<Plus size={ICON_SIZE.M} />}
              onClick={() => {
                const newId = Date.now().toString()
                setSocialUrls([...socialUrls, { id: newId, url: '' }])
              }}
            >
              Ajouter un url
            </Button>
          </div>

          {/* Valeurs de la marque subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Star size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Valeurs de la marque
              </Text>
            </div>
            {valeursMarque.map((valeurMarque, index) => (
              <FormGroup key={valeurMarque.id}>
                {index === 0 && (
                  <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                    Valeur
                  </Text>
                )}
                <Input
                  type="text"
                  value={valeurMarque.value}
                  onChange={(e) => {
                    setValeursMarque(
                      valeursMarque.map((item) =>
                        item.id === valeurMarque.id ? { ...item, value: e.target.value } : item
                      )
                    )
                  }}
                  placeholder="Ex: Innovation, Durabilité, Excellence..."
                  actionButton={
                    valeursMarque.length > 1 ? (
                      <Button
                        variant="RED"
                        onClick={() => {
                          setValeursMarque(valeursMarque.filter((item) => item.id !== valeurMarque.id))
                        }}
                        style={{
                          width: `calc((10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY}) * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
                          height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
                          flexShrink: FLEX.ZERO,
                        }}
                      >
                        Retirer
                      </Button>
                    ) : undefined
                  }
                />
              </FormGroup>
            ))}
            <Button
              variant="BLACK"
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
              icon={<Plus size={ICON_SIZE.M} />}
              onClick={() => {
                const newId = Date.now().toString()
                setValeursMarque([...valeursMarque, { id: newId, value: '' }])
              }}
            >
              Ajouter plus
            </Button>
          </div>

          {/* Analytics fanbase subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <BarChart3 size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Analytics fanbase
              </Text>
            </div>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Abonnés stade
              </Text>
              <Input
                type="number"
                value={abonnesStade}
                onChange={(e) => setAbonnesStade(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="100000"
                step="1000"
                icon={<Users size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Abonnés loges & hospitalité
              </Text>
              <Input
                type="number"
                value={abonnesLoges}
                onChange={(e) => setAbonnesLoges(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="100000"
                step="1000"
                icon={<Users size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Visiteurs mensuels site web
              </Text>
              <Input
                type="number"
                value={visiteursSiteWeb}
                onChange={(e) => setVisiteursSiteWeb(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="10000000"
                step="1000"
                icon={<Globe size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Abonnés linkedin
              </Text>
              <Input
                type="number"
                value={abonnesLinkedin}
                onChange={(e) => setAbonnesLinkedin(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="10000000"
                step="10000"
                icon={<Linkedin size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Abonnés instagram
              </Text>
              <Input
                type="number"
                value={abonnesInstagram}
                onChange={(e) => setAbonnesInstagram(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="10000000"
                step="10000"
                icon={<Instagram size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Abonnés facebook
              </Text>
              <Input
                type="number"
                value={abonnesFacebook}
                onChange={(e) => setAbonnesFacebook(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="10000000"
                step="10000"
                icon={<Facebook size={ICON_SIZE.M} />}
              />
            </FormGroup>
            <FormGroup>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Abonnés tiktok
              </Text>
              <Input
                type="number"
                value={abonnesTiktok}
                onChange={(e) => setAbonnesTiktok(e.target.value)}
                placeholder={STRING.ZERO}
                min={STRING.ZERO}
                max="10000000"
                step="10000"
                icon={<Globe size={ICON_SIZE.M} />}
              />
            </FormGroup>
          </div>

          {/* Répartition genre fanbase subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Users2 size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Répartition genre fanbase
              </Text>
            </div>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Homme
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {homme || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={homme}
                onChange={handleHommeChange}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Femme
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {femme || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={femme}
                onChange={handleFemmeChange}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Famille
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {famille || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={famille}
                onChange={(value) => setFamille(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
          </div>

          {/* Répartition socio-démographique fanbase subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <GraduationCap size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Répartition socio-démographique fanbase
              </Text>
            </div>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Étudiants
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {etudiants || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={etudiants}
                onChange={(value) => setEtudiants(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Sans emploi
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {sansEmploi || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={sansEmploi}
                onChange={(value) => setSansEmploi(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Salariés
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {salaries || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={salaries}
                onChange={(value) => setSalaries(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Ouvriers
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {ouvriers || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={ouvriers}
                onChange={(value) => setOuvriers(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Cadres
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {cadres || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={cadres}
                onChange={(value) => setCadres(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Cadres supérieurs
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {cadresSuperieurs || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={cadresSuperieurs}
                onChange={(value) => setCadresSuperieurs(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Retraités
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {retraites || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={retraites}
                onChange={(value) => setRetraites(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
          </div>

          {/* Répartition revenus fanbase subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <DollarSign size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Répartition revenus fanbase
              </Text>
            </div>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  &lt; 10k€
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {moins10k || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={moins10k}
                onChange={(value) => setMoins10k(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  10k-30k€
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {dixTrenteK || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={dixTrenteK}
                onChange={(value) => setDixTrenteK(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  30k-50k€
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {trenteCinquanteK || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={trenteCinquanteK}
                onChange={(value) => setTrenteCinquanteK(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  50k-80k€
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {cinquanteQuatreVingtK || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={cinquanteQuatreVingtK}
                onChange={(value) => setCinquanteQuatreVingtK(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  &gt; 80k€
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {plusQuatreVingtK || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={plusQuatreVingtK}
                onChange={(value) => setPlusQuatreVingtK(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
          </div>

          {/* Répartition age fanbase subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Calendar size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Répartition age fanbase
              </Text>
            </div>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  Enfants
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {enfants || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={enfants}
                onChange={(value) => setEnfants(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  17-25 ans
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {dixSeptVingtCinq || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={dixSeptVingtCinq}
                onChange={(value) => setDixSeptVingtCinq(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  25-30 ans
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {vingtCinqTrente || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={vingtCinqTrente}
                onChange={(value) => setVingtCinqTrente(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  30-40 ans
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {trenteQuarante || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={trenteQuarante}
                onChange={(value) => setTrenteQuarante(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  40-60 ans
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {quaranteSoixante || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={quaranteSoixante}
                onChange={(value) => setQuaranteSoixante(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                  marginBottom: SPACING.NEGATIVE_ONE_PX,
                }}
              >
                <Text size="M" weight="M" color="BLACK" as="div">
                  &gt; 60 ans
                </Text>
                <Text size="M" weight="M" color="BLACK" as="div">
                  {plusSoixante || STRING.ZERO}%
                </Text>
              </div>
              <Slider
                value={plusSoixante}
                onChange={(value) => setPlusSoixante(value.toString())}
                min={SLIDER.MIN}
                max={SLIDER.MAX}
                step={SLIDER.STEP}
              />
            </FormGroup>
          </div>

          {/* Centres d'intérêts fanbase subsection */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Heart size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="L" weight="XL" color="BLACK">
                Centres d'intérêts fanbase
              </Text>
            </div>
            {centresInterets.map((centreInteret, index) => (
              <FormGroup key={centreInteret.id}>
                {index === 0 && (
                  <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                    Centre d'intérêt
                  </Text>
                )}
                <Input
                  type="text"
                  value={centreInteret.value}
                  onChange={(e) => {
                    setCentresInterets(
                      centresInterets.map((item) =>
                        item.id === centreInteret.id ? { ...item, value: e.target.value } : item
                      )
                    )
                  }}
                  placeholder="Ex: Sport, Musique, Voyage..."
                  actionButton={
                    centresInterets.length > 1 ? (
                      <Button
                        variant="RED"
                        onClick={() => {
                          setCentresInterets(centresInterets.filter((item) => item.id !== centreInteret.id))
                        }}
                        style={{
                          width: `calc((10 * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY}) * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
                          height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
                          flexShrink: FLEX.ZERO,
                        }}
                      >
                        Retirer
                      </Button>
                    ) : undefined
                  }
                />
              </FormGroup>
            ))}
            <Button
              variant="BLACK"
              style={{ width: WIDTH.AUTO, paddingLeft: SPACING.L, paddingRight: SPACING.L }}
              icon={<Plus size={ICON_SIZE.M} />}
              onClick={() => {
                const newId = Date.now().toString()
                setCentresInterets([...centresInterets, { id: newId, value: '' }])
              }}
            >
              Ajouter plus
            </Button>
          </div>
        </div>
      </Popup>
    </>
  )
}


