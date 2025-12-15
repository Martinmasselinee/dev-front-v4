'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Mail, BookOpen, Search, Building2, Users, Phone, Award, Shield, Trash2 } from 'lucide-react'
import { Table } from '../../../components/Table'
import { Text } from '../../../components/Text'
import { UserInitial } from '../../../components/UserInitial'
import { StatusBubble } from '../../../components/StatusBubble'
import { DropdownButton } from '../../../components/DropdownButton'
import { Button } from '../../../components/Button'
import { SPACING } from '../../../constants/spacing'
import { DISPLAY } from '../../../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../../constants/flex'
import { COLOR } from '../../../constants/color'
import { ICON_SIZE } from '../../../constants/iconSize'
import { OVERFLOW } from '../../../constants/overflow'
import { TEXT_OVERFLOW, WHITE_SPACE, TEXT_TRANSFORM, LETTER_SPACING, TEXT_ALIGN } from '../../../constants/text'
import { TABLE } from '../../../constants/table'
import { MULTIPLIER } from '../../../constants/multiplier'
import { INPUT_HEIGHT } from '../../../constants/input'
import { WIDTH } from '../../../constants/width'
import { DIMENSION } from '../../../constants/dimension'
import { POSITION } from '../../../constants/position'
import { getAlternatingRowColor } from '../../../lib/tableUtils'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  emailConnecte: boolean
  articlesLus: number
  recherchesLancees: number
  entreprisesIdentifiees: number
  decideursIdentifies: number
  coordonneesTrouvees: number
  emailsEnvoyes: number
  partenariatsSignes: number
  role: 'admin' | 'user'
}

interface UserTableProps {
  users: User[]
  onRoleChange: (userId: string, newRole: string) => void
  onRemoveUser: (userId: string) => void
}

export const UserTable = ({ users, onRoleChange, onRemoveUser }: UserTableProps) => {
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
              onRoleChange(row.original.id, e.target.value)
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
          variant="WHITE"
          onClick={() => onRemoveUser(row.original.id)}
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

  return (
    <Table
      data={users}
      columns={columns}
      getRowBackgroundColor={getAlternatingRowColor}
      showTopBorder={true}
    />
  )
}

