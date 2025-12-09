'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, UserPlus, CheckCircle, FileCheck, Scale } from 'lucide-react'
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
import { SecurityNotice } from '../../components/SecurityNotice'
import { GoogleIcon } from '../../components/GoogleIcon'
import { Popup } from '../../components/Popup'
import { Checkbox } from '../../components/Checkbox'
import { ConditionsUtilisation } from '../../content/conditionsUtilisation'
import { MentionsLegales } from '../../content/mentionsLegales'
import { ICON_SIZE } from '../../constants/iconSize'
import { SPACING } from '../../constants/spacing'
import { LAYOUT } from '../../constants/layout'
import { TEXT_ALIGN } from '../../constants/text'
import { COLOR } from '../../constants/color'
import { FONT_SIZE, FONT_THICKNESS, LINE_HEIGHT, FONT_STYLE } from '../../constants/font'
import { TIME } from '../../constants/time'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { POSITION_TYPE } from '../../constants/position'
import { TEXT_DECORATION } from '../../constants/text'
import { BACKGROUND } from '../../constants/background'
import { BORDER } from '../../constants/border'
import { CURSOR } from '../../constants/interaction'
import { POSITION } from '../../constants/position'
import { Loading } from '../../components/Loading'
import { Z_INDEX } from '../../constants/zIndex'
import { DIMENSION } from '../../constants/dimension'
import { TRANSITION_DURATION, TRANSITION_EASING } from '../../constants/transition'

const rotatingTexts = [
  'Clubs de football',
  'Athlètes',
  'Événements sportifs',
  'Clubs de rugby',
]

export default function AuthSignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [showSignUpPopup, setShowSignUpPopup] = useState(false)
  const [showConditionsPopup, setShowConditionsPopup] = useState(false)
  const [showMentionsPopup, setShowMentionsPopup] = useState(false)
  const [acceptedCGU, setAcceptedCGU] = useState(false)
  const [acceptedMentions, setAcceptedMentions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSecurityNotice, setShowSecurityNotice] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, TIME.INTERVAL.ROTATING_TEXT)

    // Trigger pop-in animation for security notice
    setTimeout(() => {
      setShowSecurityNotice(true)
    }, TIME.DELAY.SHORT)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSignUpPopup(true)
  }

  const handleConfirmSignUp = () => {
    if (acceptedCGU && acceptedMentions) {
      setShowSignUpPopup(false)
      setIsLoading(true)
      setTimeout(() => {
      router.push('/workspace-selection-or-creation')
      }, TIME.DELAY.LOADING_REDIRECT)
    }
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
      {/* Security Notice - Top Right, Fixed (stays visible while scrolling) */}
      <div
        style={{
          position: POSITION_TYPE.FIXED,
          top: `calc(${SPACING.AUTH_PAGE_HORIZONTAL} + ${SPACING.L})`,
          right: SPACING.L,
          zIndex: Z_INDEX.COMPONENT_CONTENT,
          width: DIMENSION.SECURITY_NOTICE_WIDTH,
          transform: showSecurityNotice ? 'scale(1)' : 'scale(0.8)',
          opacity: showSecurityNotice ? 1 : 0,
          transition: `transform ${TRANSITION_DURATION.NORMAL} ${TRANSITION_EASING.EASE_OUT}, opacity ${TRANSITION_DURATION.NORMAL} ${TRANSITION_EASING.EASE_OUT}`,
        }}
      >
        <SecurityNotice />
      </div>
      <div
        style={{
          flex: FLEX.ONE,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
          flexDirection: FLEX_DIRECTION.COLUMN,
        }}
      >
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
              <Text
                as="span"
                style={{
                  color: COLOR.PURPLE,
                  fontStyle: FONT_STYLE.ITALIC,
                  paddingLeft: SPACING.XS,
                  paddingRight: SPACING.S,
                }}
              >
                {rotatingTexts[currentTextIndex]}
              </Text>
            </Heading>
          </HeaderSection>
        </Container>
        
        <Container>

            <Form onSubmit={handleSubmit}>
              <div style={{ marginBottom: SPACING.M, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
                <UserPlus size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                <Text size="M" color="GREY_DARK" style={{ textAlign: TEXT_ALIGN.CENTER }}>
                  Créez votre compte pour commencer
                </Text>
              </div>
              <FormGroup>
                <div style={{ display: DISPLAY.FLEX, gap: SPACING.M }}>
                  <div style={{ flex: FLEX.ONE }}>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Prénom"
                      icon={<User size={ICON_SIZE.M} />}
                    />
                  </div>
                  <div style={{ flex: FLEX.ONE }}>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Nom"
                      icon={<User size={ICON_SIZE.M} />}
                    />
                  </div>
                </div>
              </FormGroup>

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
              </FormGroup>

              <FormGroup>
                <div style={{ paddingBottom: SPACING.L }}>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmer le mot de passe"
                    icon={<Lock size={ICON_SIZE.M} />}
                    actionButton={
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        icon={
                          showConfirmPassword ? (
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

              <Button 
                variant="PURPLE" 
                type="submit" 
                icon={<ArrowRight size={ICON_SIZE.M} />}
              >
                S'inscrire
              </Button>

              <Button
                variant="WHITE"
                type="button"
                icon={<GoogleIcon size={ICON_SIZE.M} />}
                onClick={() => setShowSignUpPopup(true)}
                style={{ marginBottom: SPACING.S }}
              >
                Se connecter avec Google
              </Button>

              <div style={{ textAlign: TEXT_ALIGN.CENTER }}>
                <Text size="M" color="GREY_DARK">
                  Déjà un compte ?{' '}
                  <Link href="/auth-sign-in" variant="bold">
                    Se connecter
                  </Link>
                </Text>
              </div>
            </Form>
          </Container>
      </div>
      <Footer />

      {/* Sign Up Confirmation Popup */}
      <Popup
        isOpen={showSignUpPopup}
        onClose={() => setShowSignUpPopup(false)}
        title="Confirmer l'inscription"
        icon={CheckCircle}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <Checkbox
              checked={acceptedCGU}
              onChange={(e) => setAcceptedCGU(e.target.checked)}
              label={
                <span style={{
                  fontSize: FONT_SIZE.M,
                  fontWeight: FONT_THICKNESS.M,
                }}>
                  J'accepte les{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowConditionsPopup(true)
                    }}
                    style={{
                      background: BACKGROUND.NONE,
                      border: BORDER.NONE,
                      padding: POSITION.ZERO,
                      cursor: CURSOR.POINTER,
                      color: COLOR.PURPLE,
                      fontSize: FONT_SIZE.M,
                      fontWeight: FONT_THICKNESS.M,
                      textDecoration: TEXT_DECORATION.UNDERLINE,
                    }}
                  >
                    Conditions Générales d'Utilisation
                  </button>
                </span>
              }
            />
            
            <Checkbox
              checked={acceptedMentions}
              onChange={(e) => setAcceptedMentions(e.target.checked)}
              label={
                <span style={{
                  fontSize: FONT_SIZE.M,
                  fontWeight: FONT_THICKNESS.M,
                }}>
                  J'accepte les{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowMentionsPopup(true)
                    }}
                    style={{
                      background: BACKGROUND.NONE,
                      border: BORDER.NONE,
                      padding: POSITION.ZERO,
                      cursor: CURSOR.POINTER,
                      color: COLOR.PURPLE,
                      fontSize: FONT_SIZE.M,
                      fontWeight: FONT_THICKNESS.M,
                      textDecoration: TEXT_DECORATION.UNDERLINE,
                    }}
                  >
                    Mentions Légales
                  </button>
                </span>
              }
            />
          </div>

          <div
            style={{
              display: DISPLAY.FLEX,
              gap: SPACING.M,
              justifyContent: JUSTIFY_CONTENT.FLEX_END,
              marginTop: SPACING.L,
            }}
          >
            <Button
              variant="PURPLE"
              type="button"
              onClick={handleConfirmSignUp}
              disabled={!acceptedCGU || !acceptedMentions}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </Popup>

      {/* CGU Popup */}
      <Popup
        isOpen={showConditionsPopup}
        onClose={() => setShowConditionsPopup(false)}
        title="Conditions Générales d'Utilisation"
        icon={FileCheck}
      >
        <ConditionsUtilisation />
      </Popup>

      {/* Mentions Légales Popup */}
      <Popup
        isOpen={showMentionsPopup}
        onClose={() => setShowMentionsPopup(false)}
        title="Mentions Légales"
        icon={Scale}
      >
        <MentionsLegales />
      </Popup>

      {isLoading && <Loading message="Création de votre compte..." />}
    </div>
  )
}
