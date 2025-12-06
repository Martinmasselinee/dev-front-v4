'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, LogIn, HelpCircle } from 'lucide-react'
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
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { TEXT_ALIGN } from '../../constants/textAlign'

export default function AuthSignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
              <Heading>Connexion</Heading>
              <Text>Connectez-vous à votre compte</Text>
            </HeaderSection>

            <Form>
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
                icon={<HelpCircle size={ICON_SIZE.M} />}
              >
                Mot de passe oublié ?
              </Button>

              <div style={{ textAlign: TEXT_ALIGN.CENTER }}>
                <Spacer size="L" />
                <Text size="S" color="GREY_DARK">
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
