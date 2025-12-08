'use client'

import { useState } from 'react'
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
import { TRANSFORM } from '../constants/transform'
import { TRANSITION } from '../constants/transition'
import { TIME } from '../constants/time'

export const NavbarSiteWeb = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  // Determine button text, icon, and action based on current page
  const getButtonConfig = () => {
    if (pathname === '/auth-sign-in') {
      return { text: 'Commencer', icon: <UserPlus size={ICON_SIZE.M} />, onClick: () => router.push('/auth-sign-up') }
    } else if (pathname === '/auth-sign-up') {
      return { text: 'Se connecter', icon: <LogIn size={ICON_SIZE.M} />, onClick: () => router.push('/auth-sign-in') }
    } else if (pathname === '/auth-password-reset') {
      return { text: 'Se connecter', icon: <LogIn size={ICON_SIZE.M} />, onClick: () => router.push('/auth-sign-in') }
    } else if (pathname === '/workspace-selection-or-creation') {
      return {
        text: 'Se déconnecter',
        icon: <LogOut size={ICON_SIZE.M} />,
        onClick: () => {
          setIsLoading(true)
          setTimeout(() => {
            router.push('/auth-sign-in')
          }, TIME.DELAY.LOADING_REDIRECT)
        },
      }
    } else if (pathname === '/create-workspace') {
      return {
        text: 'Se déconnecter',
        icon: <LogOut size={ICON_SIZE.M} />,
        onClick: () => {
          setIsLoading(true)
          setTimeout(() => {
            router.push('/auth-sign-in')
          }, TIME.DELAY.LOADING_REDIRECT)
        },
      }
    }
    return { text: 'Commencer', icon: null, onClick: () => router.push('/auth-sign-in') }
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
        position: 'fixed',
        top: POSITION.ZERO,
        left: POSITION.ZERO,
        right: POSITION.ZERO,
        width: WIDTH.FULL,
        backgroundColor: COLOR.WHITE,
        borderBottom: `1px solid ${COLOR.GREY.MEDIUM}`,
        zIndex: Z_INDEX.NAVBAR,
        paddingTop: SPACING.M,
        paddingBottom: SPACING.M,
        paddingLeft: SPACING.XL,
        paddingRight: SPACING.XL,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: WIDTH.FULL,
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.M,
            cursor: 'pointer',
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
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.XXL,
            position: 'absolute',
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.XS,
                    color: COLOR.BLACK,
                    fontSize: FONT_SIZE.M,
                  fontWeight: FONT_THICKNESS.M,
                  textDecoration: 'none',
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
            display: 'flex',
            alignItems: 'center',
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

