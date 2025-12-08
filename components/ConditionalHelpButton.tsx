'use client'

import { usePathname } from 'next/navigation'
import { HelpButtonWrapper } from './HelpButtonWrapper'

export function ConditionalHelpButton() {
  const pathname = usePathname()
  
  if (pathname === '/radar-ai') {
    return null
  }
  
  return <HelpButtonWrapper />
}

