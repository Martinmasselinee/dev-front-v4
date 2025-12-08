'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, ArrowRight, RefreshCw, KeyRound, Send } from 'lucide-react'
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
import { Card } from '../../components/Card'
import { Footer } from '../../components/Footer'
import { ICON_SIZE } from '../../constants/iconSize'
import { SPACING } from '../../constants/spacing'
import { COLOR } from '../../constants/color'
import { LAYOUT } from '../../constants/layout'
import { FONT_THICKNESS } from '../../constants/fontThickness'
import { TEXT_ALIGN } from '../../constants/textAlign'
import { FONT_SIZE } from '../../constants/fontSize'
import { TIME } from '../../constants/time'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION } from '../../constants/flexDirection'
import { ALIGN_ITEMS } from '../../constants/alignItems'
import { JUSTIFY_CONTENT } from '../../constants/justifyContent'
import { POSITION_TYPE } from '../../constants/positionType'
import { FLEX } from '../../constants/flex'
import { Loading } from '../../components/Loading'

export default function AuthPasswordResetPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setIsLoading(true)
    setTimeout(() => {
      router.push('/auth-sign-in')
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
      <div style={{ flex: FLEX.ONE, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER }}>
        <Container>
            <HeaderSection>
              <Heading>Réinitialiser votre mot de passe</Heading>
            </HeaderSection>

            {!isSubmitted ? (
              <Form onSubmit={handleSubmit}>
                <div style={{ marginBottom: SPACING.M, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER, gap: SPACING.S }}>
                  <KeyRound size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                  <Text size="M" color="GREY_DARK" style={{ textAlign: TEXT_ALIGN.CENTER }}>
                    Entrez votre email pour recevoir un lien
                  </Text>
                </div>
                <FormGroup>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    icon={<Mail size={ICON_SIZE.M} />}
                  />
                </FormGroup>

                <Button variant="PURPLE" type="submit" icon={<Send size={ICON_SIZE.M} />}>
                  Envoyer le lien
                </Button>

                <div style={{ textAlign: TEXT_ALIGN.CENTER, marginTop: SPACING.L }}>
                  <Link
                    href="/auth-sign-in"
                    style={{ display: DISPLAY.INLINE_FLEX, alignItems: ALIGN_ITEMS.CENTER, fontSize: FONT_SIZE.M }}
                  >
                    <ArrowLeft size={ICON_SIZE.S} style={{ marginRight: SPACING.S }} />
                    Retour à la connexion
                  </Link>
                </div>
              </Form>
            ) : (
              <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.L, textAlign: TEXT_ALIGN.CENTER }}>
                <Card>
                  <Text
                    size="M"
                    style={{
                      marginBottom: SPACING.M,
                    }}
                  >
                    Un email a été envoyé à{' '}
                    <span style={{ color: COLOR.PURPLE, fontWeight: FONT_THICKNESS.XL }}>
                      {email}
                    </span>
                  </Text>
                  <Text size="S" color="GREY_DARK">
                    Cliquez sur le lien dans l'email pour réinitialiser votre mot de
                    passe. Si vous ne voyez pas l'email, vérifiez votre dossier
                    spam.
                  </Text>
                </Card>

                <Button
                  variant="WHITE"
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail('')
                  }}
                  icon={<RefreshCw size={ICON_SIZE.M} />}
                >
                  Renvoyer l'email
                </Button>

                <div>
                  <Link
                    href="/auth-sign-in"
                    style={{ display: DISPLAY.INLINE_FLEX, alignItems: ALIGN_ITEMS.CENTER, fontSize: FONT_SIZE.M }}
                  >
                    <ArrowLeft size={ICON_SIZE.S} style={{ marginRight: SPACING.S }} />
                    Retour à la connexion
                  </Link>
                </div>
              </div>
            )}
          </Container>
      </div>
      <Footer />
      {isLoading && <Loading message="Envoi du lien de réinitialisation..." />}
    </div>
  )
}
