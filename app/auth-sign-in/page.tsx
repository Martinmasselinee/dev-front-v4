'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Link } from '../../components/Link'
import { Container } from '../../components/Container'
import { TitleContainer } from '../../components/TitleContainer'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Form } from '../../components/Form'
import { FormGroup } from '../../components/FormGroup'
import { Spacer } from '../../components/Spacer'
import { IconButton } from '../../components/IconButton'
import { Footer } from '../../components/Footer'
import { ICON_SIZE } from '../../constants/iconSize'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { TEXT_ALIGN } from '../../constants/textAlign'
import { COLOR } from '../../constants/color'
import { FONT_SIZE } from '../../constants/fontSize'
import { FONT_THICKNESS } from '../../constants/fontThickness'
import { LINE_HEIGHT } from '../../constants/lineHeight'

const rotatingTexts = [
  'Clubs de football',
  'Athlètes',
  'Événements sportifs',
  'Clubs de rugby',
]

export default function AuthSignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, 1500) // Switch every 1.5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add authentication logic here
    // For now, prevent default form submission
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: LAYOUT.MIN_SCREEN_HEIGHT,
        position: 'relative',
        paddingTop: SPACING.XXL,
        paddingBottom: SPACING.XXL,
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <TitleContainer>
          <HeaderSection>
            <Heading
              style={{
                fontSize: FONT_SIZE.XXXL,
                fontWeight: FONT_THICKNESS.XXXL,
                lineHeight: LINE_HEIGHT.TIGHTER,
              }}
            >
              La plateforme IA qui réinvente
              <br />
              le sponsoring sportif pour
              <br />
              les{' '}
              <span
                style={{
                  color: COLOR.PURPLE,
                  fontStyle: 'italic',
                  paddingLeft: SPACING.XS, // 4px
                  paddingRight: SPACING.S, // 0.5rem = 8px
                }}
              >
                {rotatingTexts[currentTextIndex]}
              </span>
            </Heading>
          </HeaderSection>
        </TitleContainer>
        
        <Container>

            <Form onSubmit={handleSubmit}>
              <div style={{ marginBottom: SPACING.M, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: SPACING.S }}>
                <LogIn size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                <Text size="M" color="GREY_DARK" style={{ textAlign: TEXT_ALIGN.CENTER }}>
                  Connectez-vous à votre compte
                </Text>
              </div>
              <FormGroup>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  icon={<Mail size={ICON_SIZE.M} />}
                />
              </FormGroup>

              <FormGroup>
                <div style={{ paddingBottom: SPACING.L }}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    icon={<Lock size={ICON_SIZE.M} />}
                    actionButton={
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        icon={
                          showPassword ? (
                            <EyeOff size={ICON_SIZE.M} />
                          ) : (
                            <Eye size={ICON_SIZE.M} />
                          )
                        }
                      />
                    }
                  />
                </div>
              </FormGroup>

              <Button variant="PURPLE" type="submit" icon={<LogIn size={ICON_SIZE.M} />}>
                Se connecter
              </Button>

              <Button
                variant="WHITE"
                type="button"
                onClick={() => router.push('/auth-password-reset')}
                style={{ marginBottom: SPACING.S }}
              >
                Mot de passe oublié ?
              </Button>

              <div style={{ textAlign: TEXT_ALIGN.CENTER }}>
                <Text size="M" color="GREY_DARK">
                  Pas encore de compte ?{' '}
                  <Link href="/auth-sign-up" variant="bold">
                    S'inscrire
                  </Link>
                </Text>
              </div>
            </Form>
          </Container>
      </div>
      <Footer />
    </div>
  )
}
