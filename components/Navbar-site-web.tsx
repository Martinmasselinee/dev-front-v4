'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Handshake, HelpCircle, TrendingUp, Users, LogIn, UserPlus, KeyRound, LogOut } from 'lucide-react'
import { Button } from './Button'
import { Loading } from './Loading'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { Z_INDEX } from '../constants/zIndex'
import { FONT_SIZE } from '../constants/fontSize'
import { FONT_THICKNESS } from '../constants/fontThickness'
import { WIDTH } from '../constants/width'
import { ICON_SIZE } from '../constants/iconSize'
import { POSITION } from '../constants/position'
import { POSITION_TYPE } from '../constants/positionType'
import { TRANSFORM } from '../constants/transform'
import { TRANSITION } from '../constants/transition'
import { TIME } from '../constants/time'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS } from '../constants/alignItems'
import { JUSTIFY_CONTENT } from '../constants/justifyContent'
import { CURSOR } from '../constants/cursor'
import { TEXT_DECORATION } from '../constants/textDecoration'
import { BORDER_WIDTH } from '../constants/borderWidth'

export const NavbarSiteWeb = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Determine button text, icon, and action based on current page
  const getButtonConfig = () => {
    if (pathname === '/auth-sign-in') {
      return { text: 'Commencer', icon: <UserPlus size={ICON_SIZE.M} />, onClick: () => router.push('/auth-sign-up') }
    } else if (pathname === '/auth-sign-up') {
      return { text: 'Se connecter', icon: <LogIn size={ICON_SIZE.M} />, onClick: () => router.push('/auth-sign-in') }
    } else if (pathname === '/auth-password-reset') {
      return { text: 'Se connecter', icon: <LogIn size={ICON_SIZE.M} />, onClick: () => router.push('/auth-sign-in') }
    } else {
      // Se déconnecter button for all other pages
      return {
        text: 'Se déconnecter',
        icon: <LogOut size={ICON_SIZE.M} />,
        onClick: () => {
          setIsLoading(true)
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          // Set new timeout and store reference
          timeoutRef.current = setTimeout(() => {
            setIsLoading(false)
            // Use window.location for a hard redirect to ensure it always works
            window.location.href = '/auth-sign-in'
          }, TIME.DELAY.LOADING_REDIRECT)
        },
      }
    }
  }

  const buttonConfig = getButtonConfig()

  const navItems = [
    { label: 'Nos partenaires', href: '#partenaires', icon: Handshake },
    { label: 'Comment ça marche', href: '#comment-ca-marche', icon: HelpCircle },
    { label: 'Bénéfices', href: '#benefices', icon: TrendingUp },
    { label: 'Équipe', href: '#equipe', icon: Users },
  ]

  return (
    <nav
      style={{
        position: POSITION_TYPE.FIXED,
        top: POSITION.ZERO,
        left: POSITION.ZERO,
        right: POSITION.ZERO,
        width: WIDTH.FULL,
        backgroundColor: COLOR.WHITE,
        borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
        zIndex: Z_INDEX.NAVBAR,
        paddingTop: SPACING.M,
        paddingBottom: SPACING.M,
        paddingLeft: SPACING.XL,
        paddingRight: SPACING.XL,
      }}
    >
      <div
        style={{
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
          width: WIDTH.FULL,
          marginLeft: 'auto',
          marginRight: 'auto',
          position: POSITION_TYPE.RELATIVE,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.M,
            cursor: CURSOR.POINTER,
          }}
        >
          <img
            src="/dataxx_logo.png"
            alt="Dataxx Logo"
            style={{
              height: ICON_SIZE.XL,
              width: WIDTH.AUTO,
            }}
          />
          <span
            style={{
              color: COLOR.BLACK,
              fontSize: FONT_SIZE.XL,
              fontWeight: FONT_THICKNESS.XL,
            }}
          >
          Dataxx
          </span>
        </div>

        {/* Navigation Links - Center */}
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.XXL,
            position: POSITION_TYPE.ABSOLUTE,
            left: POSITION.CENTER,
            transform: TRANSFORM.CENTER_HORIZONTAL,
          }}
        >
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <a
                key={item.href}
                  href={item.href}
                  style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.XS,
                    color: COLOR.BLACK,
                    fontSize: FONT_SIZE.M,
                  fontWeight: FONT_THICKNESS.M,
                  textDecoration: TEXT_DECORATION.NONE,
                    transition: `color ${TRANSITION.FAST_EASE}, fontWeight ${TRANSITION.FAST_EASE}`,
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = COLOR.PURPLE
                  e.currentTarget.style.fontWeight = String(FONT_THICKNESS.L)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = COLOR.BLACK
                  e.currentTarget.style.fontWeight = String(FONT_THICKNESS.M)
                }}
              >
                <IconComponent size={ICON_SIZE.M} />
                  {item.label}
              </a>
            )
          })}
        </div>

        {/* Right Side - Button */}
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
          }}
        >
          <Button
            variant="BLACK"
            type="button"
            onClick={buttonConfig.onClick}
            icon={buttonConfig.icon}
            style={{
              width: WIDTH.AUTO,
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
            }}
          >
            {buttonConfig.text}
          </Button>
        </div>
      </div>
      {isLoading && <Loading message="Déconnexion en cours..." />}
    </nav>
  )
}

