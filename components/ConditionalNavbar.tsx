'use client'

import { usePathname } from 'next/navigation'
import { NavbarSiteWeb } from './Navbar-site-web'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  if (pathname === '/radar-ai') {
    return null
  }
  
  return <NavbarSiteWeb />
}

