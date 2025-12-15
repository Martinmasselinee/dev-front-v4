'use client'

import { usePathname } from 'next/navigation'
import { HelpButton } from './HelpButton'
import { SPACING } from '../constants/spacing'

export const HelpButtonWrapper = () => {
  const pathname = usePathname()
  
  const authAndWorkspacePages = [
    '/auth-sign-in',
    '/auth-sign-up',
    '/auth-password-reset',
    '/workspace-selection-or-creation',
    '/create-workspace',
  ]
  
  const isAuthOrWorkspacePage = authAndWorkspacePages.some(path => pathname === path)
  const bottomOffset = isAuthOrWorkspacePage 
    ? `calc(${SPACING.L} + ${SPACING.XXL} + ${SPACING.XXL} - ${SPACING.S})`
    : SPACING.L
  
  return <HelpButton bottomOffset={bottomOffset} />
}

