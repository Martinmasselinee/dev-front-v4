import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { NavbarSiteWeb } from '../components/Navbar-site-web'
import { HelpButtonWrapper } from '../components/HelpButtonWrapper'

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
      <body className={spaceGrotesk.variable}>
        <NavbarSiteWeb />
        {children}
        <HelpButtonWrapper />
      </body>
    </html>
  )
}

