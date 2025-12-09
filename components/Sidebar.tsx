'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart3,
  ScanLine,
  Sparkles,
  Search,
  Users,
  Building2,
  Tag,
  Zap,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { COLOR, COLOR_RGBA } from '../constants/color'
import { lightenColor, hexToRgba } from '../lib/colorUtils'
import { SPACING } from '../constants/spacing'
import { FONT_SIZE, FONT_THICKNESS, LINE_HEIGHT } from '../constants/font'
import { ICON_SIZE } from '../constants/iconSize'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { BORDER } from '../constants/border'
import { Z_INDEX } from '../constants/zIndex'
import { WIDTH } from '../constants/width'
import { POSITION, POSITION_TYPE } from '../constants/position'
import { TRANSITION } from '../constants/transition'
import { TIME } from '../constants/time'
import { LAYOUT } from '../constants/layout'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { OVERFLOW } from '../constants/overflow'
import { CURSOR } from '../constants/interaction'
import { TEXT_TRANSFORM, TEXT_OVERFLOW, WHITE_SPACE, LETTER_SPACING } from '../constants/text'
import { BACKGROUND } from '../constants/background'
import { Text } from './Text'
import { Card } from './Card'
import { Popup } from './Popup'
import { IconButton } from './IconButton'
import { useState, useRef, useEffect } from 'react'
import { Loading } from './Loading'

interface NavItem {
  label: string
  path: string
  icon: React.ComponentType<any>
  beta?: boolean
}

interface NavSection {
  title?: string
  items: NavItem[]
}

export const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [showWorkspacePopup, setShowWorkspacePopup] = useState(false)
  const [hoverWorkspace, setHoverWorkspace] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Workspace and user data
  const workspaceName = 'SRFC'
  const userFullName = 'Martin Masseline'
  
  // Mock workspaces data (front-end only)
  const workspaces = [
    { id: '1', name: 'SRFC', role: 'owner' as const },
    { id: '2', name: 'Paris Saint-Germain', role: 'member' as const },
    { id: '3', name: 'Olympique de Marseille', role: 'member' as const },
    { id: '4', name: 'AS Monaco', role: 'owner' as const },
  ]

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleLogout = () => {
    setIsLoading(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/auth-sign-in'
    }, TIME.DELAY.LOADING_REDIRECT)
  }

  const navSections: NavSection[] = [
    {
      items: [{ label: 'Dashboard', path: '/dashboard', icon: BarChart3 }],
    },
    {
      title: 'IDENTIFICATION',
      items: [
        { label: 'Radar IA', path: '/radar-ai', icon: ScanLine, beta: true },
        { label: 'SmartSearch', path: '/smartsearch', icon: Sparkles, beta: true },
        { label: 'Prospect Hunter', path: '/prospect-hunter', icon: Search },
      ],
    },
    {
      title: 'PROSPECTION',
      items: [
        { label: 'Décideurs', path: '/decideurs', icon: Users },
        { label: 'Entreprises', path: '/entreprises', icon: Building2 },
        { label: 'Marques', path: '/marques', icon: Tag },
        { label: 'Activations', path: '/activations', icon: Zap },
      ],
    },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <>
      <aside
        style={{
          position: POSITION_TYPE.FIXED,
          left: POSITION.ZERO,
          top: POSITION.ZERO,
          bottom: POSITION.ZERO,
          width: LAYOUT.SIDEBAR_WIDTH,
          backgroundColor: lightenColor(COLOR.GREY.LIGHT, 40),
          borderRight: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
          zIndex: Z_INDEX.NAVBAR,
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          overflowY: OVERFLOW.AUTO,
          paddingTop: SPACING.XL,
          paddingBottom: SPACING.XL,
          paddingLeft: POSITION.ZERO,
          paddingRight: POSITION.ZERO,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.M,
            marginBottom: SPACING.XXL,
            marginLeft: SPACING.L,
            cursor: CURSOR.POINTER,
          }}
        >
          <img
            src="/dataxx_logo.png"
            alt="Dataxx Logo"
            style={{
              height: ICON_SIZE.L,
              width: WIDTH.AUTO,
            }}
          />
          <Text size="XL" weight="XL" color="BLACK">
            Dataxx
          </Text>
        </div>

        {/* Navigation Sections */}
        <div style={{ flex: FLEX.ONE }}>
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: SPACING.L }}>
              {section.title && (
                <Text
                  size="S"
                  weight="S"
                  color="GREY_DARK"
                  style={{
                    textTransform: TEXT_TRANSFORM.UPPERCASE,
                    marginTop: SPACING.XL,
                    marginBottom: SPACING.M,
                    marginLeft: SPACING.L,
                    letterSpacing: LETTER_SPACING.TIGHT,
                    fontSize: FONT_SIZE.S,
                  }}
                >
                  {section.title}
                </Text>
              )}
              {section.items.map((item) => {
                const active = isActive(item.path)
                const IconComponent = item.icon
                return (
                  <div
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    style={{
                      display: DISPLAY.FLEX,
                      alignItems: ALIGN_ITEMS.CENTER,
                      gap: SPACING.M,
                      paddingTop: SPACING.S,
                      paddingBottom: SPACING.S,
                      paddingLeft: SPACING.L,
                      paddingRight: SPACING.L,
                      marginBottom: POSITION.ZERO,
                      backgroundColor: active ? hexToRgba(COLOR.PURPLE, 0.15) : BACKGROUND.TRANSPARENT,
                      cursor: CURSOR.POINTER,
                      transition: `background-color ${TRANSITION.FAST_EASE}`,
                      position: POSITION_TYPE.RELATIVE,
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = hexToRgba(COLOR.GREY.MEDIUM, 0.3)
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = BACKGROUND.TRANSPARENT
                      }
                    }}
                  >
                    {active && (
                      <div
                        style={{
                          position: POSITION_TYPE.ABSOLUTE,
                          left: POSITION.ZERO,
                          top: POSITION.ZERO,
                          bottom: POSITION.ZERO,
                          width: BORDER_WIDTH.MEDIUM,
                          backgroundColor: COLOR.PURPLE,
                        }}
                      />
                    )}
                    <IconComponent
                      size={ICON_SIZE.S}
                      style={{
                        color: active ? COLOR.PURPLE : COLOR.BLACK,
                        flexShrink: FLEX.ZERO,
                      }}
                    />
                    <div style={{ display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, gap: SPACING.S, flex: FLEX.ONE }}>
                      <Text
                        size="M"
                        weight={active ? 'L' : 'M'}
                        color={active ? 'PURPLE' : 'BLACK'}
                      >
                        {item.label}
                      </Text>
                      {item.beta && (
                        <div
                          style={{
                            paddingLeft: SPACING.XS,
                            paddingRight: SPACING.XS,
                            paddingTop: `calc(${SPACING.XS} / 2)`,
                            paddingBottom: `calc(${SPACING.XS} / 2)`,
                            backgroundColor: active ? COLOR_RGBA.PURPLE_LIGHT : COLOR.GREY.LIGHT,
                            borderRadius: BORDER_RADIUS.S,
                            border: active 
                              ? `${BORDER_WIDTH.THIN} solid ${hexToRgba(COLOR.PURPLE, 0.6)}`
                              : `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
                            display: DISPLAY.FLEX,
                            alignItems: ALIGN_ITEMS.CENTER,
                            height: `calc(${FONT_SIZE.S} + ${SPACING.XS})`,
                          }}
                        >
                          <Text
                            size="S"
                            weight="M"
                            color={active ? 'PURPLE' : 'GREY_DARK'}
                            style={{ lineHeight: LINE_HEIGHT.SINGLE, fontSize: `calc(${FONT_SIZE.S} - ${SPACING.XS} / 4)` }}
                          >
                            BETA
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={{ marginTop: SPACING.XL, paddingLeft: SPACING.L, paddingRight: SPACING.L }}>
          {/* First Card */}
          <Card 
            onClick={() => router.push('/admin')}
            style={{ 
              marginBottom: SPACING.M, 
              backgroundColor: pathname === '/admin' ? hexToRgba(COLOR.PURPLE, 0.1) : COLOR.WHITE,
              cursor: CURSOR.POINTER,
              border: pathname === '/admin' ? `${BORDER_WIDTH.THIN} solid ${COLOR.PURPLE}` : `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
              transition: `border-color ${TRANSITION.FAST_EASE}, background-color ${TRANSITION.FAST_EASE}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLOR.PURPLE
            }}
            onMouseLeave={(e) => {
              if (pathname !== '/admin') {
                e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
              }
            }}
          >
            <div
              onMouseEnter={() => setHoverWorkspace(true)}
              onMouseLeave={() => setHoverWorkspace(false)}
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
                marginBottom: SPACING.S,
                justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                cursor: CURSOR.POINTER,
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setShowWorkspacePopup(true)
                }}
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.M,
                  flex: FLEX.ONE,
                }}
              >
                <FileText size={ICON_SIZE.M} style={{ color: hoverWorkspace ? COLOR.PURPLE : COLOR.BLACK, flexShrink: FLEX.ZERO, transition: `color ${TRANSITION.FAST_EASE}` }} />
                <Text 
                  size="M" 
                  weight="XL" 
                  color={hoverWorkspace ? 'PURPLE' : 'BLACK'}
                  style={{
                    overflow: OVERFLOW.HIDDEN,
                    textOverflow: TEXT_OVERFLOW.ELLIPSIS,
                    whiteSpace: WHITE_SPACE.NOWRAP,
                    minWidth: 0,
                    transition: `color ${TRANSITION.FAST_EASE}`,
                  }}
                >
                  {workspaceName}
                </Text>
              </div>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  setShowWorkspacePopup(true)
                }}
                icon={hoverWorkspace || showWorkspacePopup ? <ChevronUp size={ICON_SIZE.M} /> : <ChevronDown size={ICON_SIZE.M} />}
                style={{ 
                  color: hoverWorkspace ? COLOR.PURPLE : COLOR.GREY.DARK,
                  flexShrink: FLEX.ZERO,
                  transition: `color ${TRANSITION.FAST_EASE}`,
                }}
              />
            </div>
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
              }}
            >
              <Settings size={ICON_SIZE.M} style={{ color: pathname === '/admin' ? COLOR.PURPLE : COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text 
                size="M" 
                weight="M" 
                color={pathname === '/admin' ? 'PURPLE' : 'BLACK'}
                style={{
                  overflow: OVERFLOW.HIDDEN,
                  textOverflow: TEXT_OVERFLOW.ELLIPSIS,
                  whiteSpace: WHITE_SPACE.NOWRAP,
                  minWidth: 0,
                  flex: FLEX.ONE,
                }}
              >
                Administration
              </Text>
            </div>
          </Card>

          {/* Second Card - User */}
          <Card 
            onClick={handleLogout}
            style={{ 
              backgroundColor: COLOR.WHITE,
              cursor: CURSOR.POINTER,
              border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
              transition: `border-color ${TRANSITION.FAST_EASE}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLOR.PURPLE
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLOR.GREY.MEDIUM
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
                marginBottom: SPACING.S,
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
                  M
                </Text>
              </div>
              <Text 
                size="M" 
                weight="XL" 
                color="BLACK"
                style={{
                  overflow: OVERFLOW.HIDDEN,
                  textOverflow: TEXT_OVERFLOW.ELLIPSIS,
                  whiteSpace: WHITE_SPACE.NOWRAP,
                  minWidth: 0,
                  flex: FLEX.ONE,
                }}
              >
                {userFullName}
              </Text>
            </div>
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
              }}
            >
              <LogOut size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text 
                size="M" 
                weight="M" 
                color="BLACK"
                style={{
                  overflow: OVERFLOW.HIDDEN,
                  textOverflow: TEXT_OVERFLOW.ELLIPSIS,
                  whiteSpace: WHITE_SPACE.NOWRAP,
                  minWidth: 0,
                  flex: FLEX.ONE,
                }}
              >
                Deconnexion
              </Text>
            </div>
          </Card>
        </div>
      </aside>
      
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
            gap: SPACING.S,
          }}
        >
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              onClick={() => {
                // In a real app, this would switch the workspace context
                setShowWorkspacePopup(false)
                // For now, just close the popup
              }}
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                backgroundColor: workspace.name === workspaceName ? hexToRgba(COLOR.PURPLE, 0.1) : COLOR.WHITE,
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
      </Popup>

      {isLoading && <Loading message="Déconnexion en cours..." />}
    </>
  )
}

