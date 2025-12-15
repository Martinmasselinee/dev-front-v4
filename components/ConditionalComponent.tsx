'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { HelpButtonWrapper } from './HelpButtonWrapper'
import { SiteWebNavigation } from './SiteWebNavigation'

interface ConditionalComponentProps {
  type: 'helpButton' | 'navbar'
}

export function ConditionalComponent({ type }: ConditionalComponentProps) {
  const pathname = usePathname()
  
  // Sidebar pages (pages with left-sticked navbar) - HelpButton is added directly to these pages
  const sidebarPages = [
    '/dashboard',
    '/decideurs',
    '/entreprises',
    '/marques',
    '/activations',
    '/prospect-hunter',
    '/prospecthunter-results',
    '/smartsearch',
    '/smartsearch-results',
    '/radar-ai',
    '/admin',
  ]
  
  const isSidebarPage = sidebarPages.includes(pathname)
  
  if (pathname === '/radar-ai') {
    return null
  }
  
  if (type === 'helpButton') {
    // Don't show HelpButton on sidebar pages - it's added directly to those pages
    if (isSidebarPage) {
      return null
    }
    return <HelpButtonWrapper />
  }
  
  // For navbar type: exclude root path (splash screen) and sidebar pages
  if (pathname === '/') {
    return null
  }
  
  // Sidebar pages already have NavbarSidebar imported directly, so return null
  if (isSidebarPage) {
    return null
  }
  
  return <SiteWebNavigation />
}

