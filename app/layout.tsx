import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Dataxx',
  description: 'Plateforme de gestion de sponsoring pour l\'industrie du sport',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  )
}

