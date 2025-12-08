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
} from 'lucide-react'
import { COLOR, COLOR_RGBA } from '../constants/color'
import { lightenColor, hexToRgba } from '../lib/colorUtils'
import { SPACING } from '../constants/spacing'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { ICON_SIZE } from '../constants/iconSize'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { BORDER } from '../constants/border'
import { Z_INDEX } from '../constants/zIndex'
import { WIDTH } from '../constants/width'
import { POSITION } from '../constants/position'
import { TRANSITION } from '../constants/transition'
import { TIME } from '../constants/time'
import { Text } from './Text'
import { Card } from './Card'
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Workspace and user data
  const workspaceName = 'SRFC'
  const userFullName = 'Martin Masseline'

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
          position: 'fixed',
          left: POSITION.ZERO,
          top: POSITION.ZERO,
          bottom: POSITION.ZERO,
          width: '220px',
          backgroundColor: lightenColor(COLOR.GREY.LIGHT, 40),
          borderRight: `1px solid ${COLOR.GREY.MEDIUM}`,
          zIndex: Z_INDEX.NAVBAR,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
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
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.M,
            marginBottom: SPACING.XXL,
            marginLeft: SPACING.L,
            cursor: 'pointer',
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
        <div style={{ flex: 1 }}>
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: SPACING.L }}>
              {section.title && (
                <Text
                  size="S"
                  weight="S"
                  color="GREY_DARK"
                  style={{
                    textTransform: 'uppercase',
                    marginTop: SPACING.L,
                    marginBottom: SPACING.M,
                    marginLeft: SPACING.L,
                    letterSpacing: '0.5px',
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: SPACING.M,
                      paddingTop: SPACING.S,
                      paddingBottom: SPACING.S,
                      paddingLeft: SPACING.L,
                      paddingRight: SPACING.L,
                      marginBottom: POSITION.ZERO,
                      backgroundColor: active ? hexToRgba(COLOR.PURPLE, 0.15) : 'transparent',
                      cursor: 'pointer',
                      transition: `background-color ${TRANSITION.FAST_EASE}`,
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = hexToRgba(COLOR.GREY.MEDIUM, 0.3)
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {active && (
                      <div
                        style={{
                          position: 'absolute',
                          left: POSITION.ZERO,
                          top: POSITION.ZERO,
                          bottom: POSITION.ZERO,
                          width: '2px',
                          backgroundColor: COLOR.PURPLE,
                        }}
                      />
                    )}
                    <IconComponent
                      size={ICON_SIZE.S}
                      style={{
                        color: active ? COLOR.PURPLE : COLOR.BLACK,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.S, flex: 1 }}>
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
                              ? `1px solid ${hexToRgba(COLOR.PURPLE, 0.6)}`
                              : `1px solid ${COLOR.GREY.MEDIUM}`,
                            display: 'flex',
                            alignItems: 'center',
                            height: `calc(${FONT_SIZE.S} + ${SPACING.XS})`,
                          }}
                        >
                          <Text
                            size="S"
                            weight="M"
                            color={active ? 'PURPLE' : 'GREY_DARK'}
                            style={{ lineHeight: '1', fontSize: `calc(${FONT_SIZE.S} - ${SPACING.XS} / 4)` }}
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
              cursor: 'pointer',
              border: pathname === '/admin' ? `1px solid ${COLOR.PURPLE}` : `1px solid ${COLOR.GREY.MEDIUM}`,
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.M,
                marginBottom: SPACING.S,
              }}
            >
              <FileText size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: 0 }} />
              <Text 
                size="M" 
                weight="XL" 
                color="BLACK"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {workspaceName}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.M,
              }}
            >
              <Settings size={ICON_SIZE.M} style={{ color: pathname === '/admin' ? COLOR.PURPLE : COLOR.BLACK, flexShrink: 0 }} />
              <Text 
                size="M" 
                weight="M" 
                color={pathname === '/admin' ? 'PURPLE' : 'BLACK'}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  flex: 1,
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
              cursor: 'pointer',
              border: `1px solid ${COLOR.GREY.MEDIUM}`,
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
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.M,
                marginBottom: SPACING.S,
              }}
            >
              <div
                style={{
                  width: ICON_SIZE.L,
                  height: ICON_SIZE.L,
                  borderRadius: '50%',
                  backgroundColor: COLOR.BLACK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
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
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {userFullName}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.M,
              }}
            >
              <LogOut size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: 0 }} />
              <Text 
                size="M" 
                weight="M" 
                color="BLACK"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                Deconnexion
              </Text>
            </div>
          </Card>
        </div>
      </aside>
      {isLoading && <Loading message="Déconnexion en cours..." />}
    </>
  )
}

