'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FileText, Search, Building2, Users, MapPin, Mail, Handshake, Eye } from 'lucide-react'
import { Table } from '../../../components/Table'
import { Text } from '../../../components/Text'
import { UserInitial } from '../../../components/UserInitial'
import { Button } from '../../../components/Button'
import { Bubble } from '../../../components/Bubble'
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

export interface Activity {
  id: string
  userId: string
  userFirstName: string
  userLastName: string
  description: string
  date: string
  time: string
  type: 'article' | 'recherche' | 'entreprise' | 'decideur' | 'coordonnee' | 'email' | 'partenariat'
}

interface ActivityTableProps {
  activities: Activity[]
  onView?: (activityId: string) => void
}

export const ActivityTable = ({ activities, onView }: ActivityTableProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'article':
        return FileText
      case 'recherche':
        return Search
      case 'entreprise':
        return Building2
      case 'decideur':
        return Users
      case 'coordonnee':
        return MapPin
      case 'email':
        return Mail
      case 'partenariat':
        return Handshake
      default:
        return FileText
    }
  }

  const parseDescription = (description: string, activityId: string) => {
    // List of company names to replace with bubbles
    const companyNames = ['TechCorp', 'SportBrand']
    
    // Create a regex pattern that matches any of the company names
    const pattern = new RegExp(`(${companyNames.join('|')})`, 'g')
    
    // Split the description by company names
    const parts = description.split(pattern)
    
    return parts.map((part, index) => {
      // If this part is a company name, wrap it in a Bubble with onClick
      if (companyNames.includes(part)) {
        return (
          <Bubble 
            key={index}
            onClick={() => onView?.(activityId)}
          >
            {part}
          </Bubble>
        )
      }
      // Otherwise, return as plain text
      return <span key={index}>{part}</span>
    })
  }

  const columns: ColumnDef<Activity>[] = [
    {
      accessorKey: 'userFullName',
      header: () => (
        <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Utilisateur</Text>
      ),
      cell: ({ row }) => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
          <UserInitial name={row.original.userFirstName} size="M" />
          <Text size="M" weight="L" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
            {row.original.userFirstName} {row.original.userLastName}
          </Text>
        </div>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE})`,
        align: 'left',
      },
    },
    {
      accessorKey: 'description',
      header: () => (
        <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Activité</Text>
      ),
      cell: ({ row }) => {
        const Icon = getActivityIcon(row.original.type)
        return (
          <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S }}>
            <Icon size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK, flexShrink: FLEX.ZERO }} />
            <Text size="M" weight="M" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>
              {parseDescription(row.original.description, row.original.id)}
            </Text>
          </div>
        )
      },
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.DROPDOWN_WIDTH_ONE_FIVE} * 2 + ${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L})`,
      },
    },
    {
      accessorKey: 'time',
      header: () => (
        <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Heure</Text>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ color: COLOR.BLACK, overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.time}</Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
      },
    },
    {
      accessorKey: 'date',
      header: () => (
        <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT }}>Date</Text>
      ),
      cell: ({ row }) => (
        <Text size="M" weight="M" color="BLACK" style={{ color: COLOR.BLACK, overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP }}>{row.original.date}</Text>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
      },
    },
    {
      id: 'action',
      header: () => (
        <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.FLEX_END, gap: SPACING.S }}>
          <Text size="S" weight="XL" color="BLACK" style={{ overflow: OVERFLOW.HIDDEN, textOverflow: TEXT_OVERFLOW.ELLIPSIS, whiteSpace: WHITE_SPACE.NOWRAP, textTransform: TEXT_TRANSFORM.UPPERCASE, letterSpacing: LETTER_SPACING.TIGHT, textAlign: TEXT_ALIGN.RIGHT }}>Action</Text>
        </div>
      ),
      cell: ({ row }) => (
        <Button
          variant="WHITE"
          onClick={() => onView?.(row.original.id)}
          icon={<Eye size={ICON_SIZE.M} />}
          style={{
            width: `calc(${WIDTH.FULL} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
            height: `calc(${INPUT_HEIGHT.SMALL} * ${MULTIPLIER.HEIGHT_EIGHTY})`,
          }}
        >
          Voir
        </Button>
      ),
      meta: {
        width: `calc(${TABLE.COLUMN_WIDTH_BASE} * ${SPACING.L} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY_FIVE})`,
        align: 'right',
        sticky: true,
        stickyRight: POSITION.ZERO,
        borderLeft: true,
      },
    },
  ]

  return (
    <Table
      data={activities}
      columns={columns}
      getRowBackgroundColor={getAlternatingRowColor}
    />
  )
}

