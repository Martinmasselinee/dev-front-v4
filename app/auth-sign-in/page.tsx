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
import { POSITION_TYPE, POSITION, TRANSFORM } from '../../constants/position'
import { Loading } from '../../components/Loading'
import { Z_INDEX } from '../../constants/zIndex'
import { TRANSITION_DURATION, TRANSITION_EASING } from '../../constants/transition'
import { DIMENSION } from '../../constants/dimension'
import { WIDTH } from '../../constants/width'
import { OVERFLOW } from '../../constants/overflow'

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
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Hide splash screen after animation duration
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, TIME.SPLASH_SCREEN + TIME.DELAY.SHORT)

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, TIME.INTERVAL.ROTATING_TEXT)

    return () => {
      clearTimeout(splashTimer)
      clearInterval(interval)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push('/radar-ai')
    }, TIME.DELAY.LOADING_REDIRECT)
  }

  return (
    <>
      {showSplash && (
        <div style={{ position: POSITION_TYPE.FIXED, top: POSITION.ZERO, left: POSITION.ZERO, right: POSITION.ZERO, bottom: POSITION.ZERO, zIndex: Z_INDEX.POPUP }}>
          <SplashScreenWithoutRedirect onComplete={() => setShowSplash(false)} />
        </div>
      )}
      <div
        style={{
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          height: LAYOUT.MIN_SCREEN_HEIGHT,
          position: POSITION_TYPE.RELATIVE,
          paddingTop: SPACING.XXL,
          paddingBottom: SPACING.XXL,
          opacity: showSplash ? 0 : 1,
          transition: `opacity ${TIME.DELAY.MEDIUM}ms ease-in`,
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
    </>
  )
}

// SplashScreen component without redirect - just shows animation
const SplashScreenWithoutRedirect = ({ onComplete }: { onComplete: () => void }) => {
  const [animationStep, setAnimationStep] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const duration = TIME.SPLASH_SCREEN

    // Animation timeline - Logo Dataxx grows at center
    const timers = [
      setTimeout(() => setAnimationStep(1), TIME.DELAY.SHORT),
    ]

    // Percentage counter animation - very granular using requestAnimationFrame
    let animationFrameId: number
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 0.99)
      const newPercentage = Math.floor(progress * 100)
      setPercentage(newPercentage)

      if (progress >= 0.99 || newPercentage >= 99) {
        setPercentage(99)
        setTimeout(() => {
          onComplete()
        }, TIME.DELAY.SHORT)
      } else {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [onComplete])

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        width: WIDTH.FULL,
        position: POSITION_TYPE.RELATIVE,
        overflow: OVERFLOW.HIDDEN,
        backgroundImage: "url('/background_picture.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: Z_INDEX.POPUP,
      }}
    >
      <div
        style={{
          minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
          width: WIDTH.FULL,
          position: POSITION_TYPE.RELATIVE,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
        }}
      >
        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            top: POSITION.ZERO,
            left: POSITION.ZERO,
            right: POSITION.ZERO,
            bottom: POSITION.ZERO,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
          }}
        >
          <div
            style={{
              position: POSITION_TYPE.ABSOLUTE,
              left: POSITION.CENTER,
              top: POSITION.CENTER,
              transform: `${TRANSFORM.CENTER_HORIZONTAL} ${TRANSFORM.CENTER_VERTICAL}`,
            }}
          >
            <div
              style={{
                transformOrigin: 'center center',
                transition: `transform ${TRANSITION_DURATION.VERY_SLOW} ${TRANSITION_EASING.EASE_IN_OUT}`,
                transform: animationStep === 0 ? 'scale(0)' : 'scale(1)',
              }}
            >
              <img
                src="/dataxx_logo.png"
                alt="Dataxx Logo"
                style={{
                  display: DISPLAY.BLOCK,
                  width: DIMENSION.SPLASH_LOGO_SIZE,
                  height: DIMENSION.SPLASH_LOGO_SIZE,
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            bottom: SPACING.XXL,
            left: POSITION.ZERO,
            right: POSITION.ZERO,
            textAlign: TEXT_ALIGN.CENTER,
            zIndex: Z_INDEX.COMPONENT_CONTENT,
          }}
        >
          <div
            style={{
              fontSize: FONT_SIZE.XXXL,
              fontWeight: FONT_THICKNESS.XXXL,
              color: COLOR.GREY.MEDIUM,
            }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  )
}
