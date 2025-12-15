'use client'

import { useRouter } from 'next/navigation'
import { Building2, FileText } from 'lucide-react'
import { Popup } from '../../../components/Popup'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Text } from '../../../components/Text'
import { SPACING } from '../../../constants/spacing'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../../constants/flex'
import { DISPLAY } from '../../../constants/display'
import { COLOR } from '../../../constants/color'
import { BORDER_WIDTH, BORDER_RADIUS } from '../../../constants/border'
import { ICON_SIZE } from '../../../constants/iconSize'
import { CURSOR } from '../../../constants/interaction'
import { TRANSITION } from '../../../constants/transition'
import { MULTIPLIER } from '../../../constants/multiplier'
import { hexToRgba } from '../../../lib/colorUtils'
import { OVERFLOW } from '../../../constants/overflow'
import { TEXT_OVERFLOW, WHITE_SPACE } from '../../../constants/text'

interface Workspace {
  id: string
  name: string
  role: 'owner' | 'member'
}

interface WorkspaceSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  workspaces: Workspace[]
  currentWorkspaceName: string
}

export const WorkspaceSelectionPopup = ({ isOpen, onClose, workspaces, currentWorkspaceName }: WorkspaceSelectionPopupProps) => {
  const router = useRouter()

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
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
                onClose()
              }}
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                backgroundColor: workspace.name === currentWorkspaceName ? hexToRgba(COLOR.PURPLE, MULTIPLIER.OPACITY_PURPLE_BACKGROUND) : COLOR.WHITE,
                border: workspace.name === currentWorkspaceName 
                  ? `${BORDER_WIDTH.THIN} solid ${COLOR.PURPLE}` 
                  : `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
                cursor: CURSOR.POINTER,
                transition: `border-color ${TRANSITION.FAST_EASE}, background-color ${TRANSITION.FAST_EASE}`,
              }}
              onMouseEnter={(e) => {
                if (workspace.name !== currentWorkspaceName) {
                  e.currentTarget.style.borderColor = COLOR.PURPLE
                }
              }}
              onMouseLeave={(e) => {
                if (workspace.name !== currentWorkspaceName) {
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
                <FileText size={ICON_SIZE.M} style={{ color: workspace.name === currentWorkspaceName ? COLOR.PURPLE : COLOR.BLACK, flexShrink: FLEX.ZERO }} />
                <Text 
                  size="M" 
                  weight="L" 
                  color={workspace.name === currentWorkspaceName ? 'PURPLE' : 'BLACK'}
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
            onClose()
            router.push('/create-workspace')
          }}
        >
          Créer un nouveau workspace
        </Button>
      </div>
    </Popup>
  )
}

