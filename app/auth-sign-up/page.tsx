'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react'
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
import { ICON_SIZE } from '../../constants/iconSize'
import { SPACING } from '../../constants/spacing'
import { LAYOUT } from '../../constants/layout'
import { TEXT_ALIGN } from '../../constants/textAlign'

export default function AuthSignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
            <HeaderSection>
              <Heading>Inscription</Heading>
              <Text>Créez votre compte pour commencer</Text>
            </HeaderSection>

            <Form>
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

              <Button variant="PURPLE" type="submit" icon={<ArrowRight size={ICON_SIZE.M} />}>
                S'inscrire
              </Button>

              <div style={{ textAlign: TEXT_ALIGN.CENTER }}>
                <Spacer size="L" />
                <Text size="S" color="GREY_DARK">
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
