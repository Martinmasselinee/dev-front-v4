'use client'

import { useState, useEffect } from 'react'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, UserPlus } from 'lucide-react'
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
import { SecurityNotice } from '../../components/SecurityNotice'
import { GoogleIcon } from '../../components/GoogleIcon'
import { ICON_SIZE } from '../../constants/iconSize'
import { SPACING } from '../../constants/spacing'
import { LAYOUT } from '../../constants/layout'
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

export default function AuthSignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, 1500) // Switch every 1.5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add registration logic here
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
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
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
                <UserPlus size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                <Text size="M" color="GREY_DARK" style={{ textAlign: TEXT_ALIGN.CENTER }}>
                  Créez votre compte pour commencer
                </Text>
              </div>
              <SecurityNotice />
              <FormGroup>
                <div style={{ display: 'flex', gap: SPACING.M }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Prénom"
                      icon={<User size={ICON_SIZE.M} />}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
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
    </div>
  )
}
