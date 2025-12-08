'use client'

import { usePathname } from 'next/navigation'
import { HelpButton } from './HelpButton'
import { SPACING } from '../constants/spacing'

export const HelpButtonWrapper = () => {
  const pathname = usePathname()
  
  // Pages that need the button 2rem (32px = SPACING.XXL) higher
  const authAndWorkspacePages = [
    '/auth-sign-in',
    '/auth-sign-up',
    '/auth-password-reset',
    '/workspace-selection-or-creation',
    '/create-workspace',
  ]
  
  const isAuthOrWorkspacePage = authAndWorkspacePages.some(path => pathname === path)
  
  // Calculate bottom position: if auth/workspace page, add 4rem (2 * SPACING.XXL) then move down 0.5rem (SPACING.S)
  // SPACING.L (16px) + SPACING.XXL (32px) + SPACING.XXL (32px) - SPACING.S (8px) = 72px from bottom
  const bottomOffset = isAuthOrWorkspacePage 
    ? `calc(${SPACING.L} + ${SPACING.XXL} + ${SPACING.XXL} - ${SPACING.S})`
    : SPACING.L
  
  return <HelpButton bottomOffset={bottomOffset} />
}

