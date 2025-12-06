'use client'

import { useState } from 'react'
import { Mail, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Link } from '../../components/Link'
import { PageContainer } from '../../components/PageContainer'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Form } from '../../components/Form'
import { FormGroup } from '../../components/FormGroup'
import { Spacer } from '../../components/Spacer'
import { Card } from '../../components/Card'
import { ICON_SIZE } from '../../constants/iconSize'
import { SPACING } from '../../constants/spacing'
import { COLOR } from '../../constants/color'

export default function AuthPasswordResetPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <PageContainer>
      <Container>
        <HeaderSection>
          <Heading>Réinitialisation du mot de passe</Heading>
          <Text>
            {isSubmitted
              ? 'Vérifiez votre boîte mail'
              : 'Entrez votre email pour recevoir un lien de réinitialisation'}
          </Text>
        </HeaderSection>

        {!isSubmitted ? (
          <Form onSubmit={handleSubmit}>
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

            <Button variant="PURPLE" type="submit" icon={<ArrowRight size={ICON_SIZE.M} />}>
              Envoyer le lien
            </Button>

            <div style={{ textAlign: 'center' }}>
              <Link href="/auth-sign-in" className="inline-flex items-center">
                <ArrowLeft size={ICON_SIZE.S} style={{ marginRight: SPACING.S }} />
                Retour à la connexion
              </Link>
            </div>
          </Form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.L, textAlign: 'center' }}>
            <Card>
              <Text
                size="M"
                style={{
                  marginBottom: SPACING.M,
                }}
              >
                Un email a été envoyé à{' '}
                <span style={{ color: COLOR.PURPLE, fontWeight: 600 }}>
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
              <Link href="/auth-sign-in" className="inline-flex items-center">
                <ArrowLeft size={ICON_SIZE.S} style={{ marginRight: SPACING.S }} />
                Retour à la connexion
              </Link>
            </div>
          </div>
        )}
      </Container>
    </PageContainer>
  )
}
