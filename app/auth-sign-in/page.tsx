'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Link } from '../../components/Link'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Form } from '../../components/Form'
import { FormGroup } from '../../components/FormGroup'
import { Spacer } from '../../components/Spacer'
import { IconButton } from '../../components/IconButton'
import { Footer } from '../../components/Footer'
import { GoogleIcon } from '../../components/GoogleIcon'
import { ICON_SIZE } from '../../constants/iconSize'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { TEXT_ALIGN } from '../../constants/text'
import { COLOR } from '../../constants/color'
import { FONT_SIZE, FONT_THICKNESS, LINE_HEIGHT, FONT_STYLE } from '../../constants/font'
import { TIME } from '../../constants/time'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { POSITION_TYPE } from '../../constants/position'
import { Loading } from '../../components/Loading'

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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, TIME.INTERVAL.ROTATING_TEXT)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push('/radar-ai')
    }, TIME.DELAY.LOADING_REDIRECT)
  }

  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        height: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        paddingTop: SPACING.XXL,
        paddingBottom: SPACING.XXL,
      }}
    >
      <div style={{ flex: FLEX.ONE, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, flexDirection: FLEX_DIRECTION.COLUMN }}>
        <Container variant="title">
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
                  fontStyle: FONT_STYLE.ITALIC,
                  paddingLeft: SPACING.XS,
                  paddingRight: SPACING.S,
                }}
              >
                {rotatingTexts[currentTextIndex]}
              </span>
            </Heading>
          </HeaderSection>
        </Container>
        
        <Container>

            <Form onSubmit={handleSubmit}>
              <div style={{ marginBottom: SPACING.M, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
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
                icon={<GoogleIcon size={ICON_SIZE.M} />}
                onClick={() => {
                  // TODO: Add Google authentication logic here
                  handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                }}
              >
                Se connecter avec Google
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
      {isLoading && <Loading message="Connexion en cours..." />}
    </div>
  )
}
