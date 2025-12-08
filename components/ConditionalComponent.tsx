'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { HelpButtonWrapper } from './HelpButtonWrapper'
import { NavbarSiteWeb } from './Navbar-site-web'

interface ConditionalComponentProps {
  type: 'helpButton' | 'navbar'
}

export function ConditionalComponent({ type }: ConditionalComponentProps) {
  const pathname = usePathname()
  
  if (pathname === '/radar-ai') {
    return null
  }
  
  if (type === 'helpButton') {
    return <HelpButtonWrapper />
  }
  
  return <NavbarSiteWeb />
}

