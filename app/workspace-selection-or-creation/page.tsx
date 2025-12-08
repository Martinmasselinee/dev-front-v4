'use client'

import { useState } from 'react'
import { Users, Building2, Sparkles, ArrowRight, Mail, Phone, HelpCircle } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { Footer } from '../../components/Footer'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Card } from '../../components/Card'
import { DashedCard } from '../../components/DashedCard'
import { Popup } from '../../components/Popup'
import { Button } from '../../components/Button'
import { ICON_SIZE } from '../../constants/iconSize'
import { COLOR } from '../../constants/color'
import { FONT_SIZE } from '../../constants/fontSize'
import { FONT_THICKNESS } from '../../constants/fontThickness'
import { TEXT_ALIGN } from '../../constants/textAlign'
import { BORDER_RADIUS } from '../../constants/borderRadius'
import { OPACITY } from '../../constants/opacity'

export default function WorkspaceSelectionOrCreationPage() {
  const [hoverJoin, setHoverJoin] = useState(false)
  const [hoverCreate, setHoverCreate] = useState(false)
  const [showJoinPopup, setShowJoinPopup] = useState(false)
  const [hoverEmail, setHoverEmail] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Hardcoded email for now
  const userEmail = 'user@example.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userEmail)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
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
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
          <HeaderSection>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: SPACING.M,
                marginBottom: SPACING.M,
              }}
            >
              <Sparkles size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
              <Heading>Bienvenue sur Dataxx</Heading>
            </div>
            <Text size="M" weight="M" color="GREY_DARK" style={{ textAlign: TEXT_ALIGN.CENTER, marginBottom: SPACING.XXL }}>
              Comment souhaitez-vous commencer ? Vous n'êtes associé à aucun workspace pour le moment.
            </Text>
          </HeaderSection>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING.L,
            }}
          >
            <div
              onClick={() => {
                setShowJoinPopup(true)
              }}
              onMouseEnter={() => setHoverJoin(true)}
              onMouseLeave={() => setHoverJoin(false)}
              style={{
                cursor: 'pointer',
              }}
            >
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: SPACING.M,
                  backgroundColor: COLOR.WHITE,
                  border: `1px solid ${hoverJoin ? COLOR.PURPLE : COLOR.GREY.MEDIUM}`,
                  transition: 'border-color 0.2s ease',
                  position: 'relative',
                }}
              >
                <Users size={ICON_SIZE.M} style={{ color: hoverJoin ? COLOR.PURPLE : COLOR.GREY.DARK, transition: 'color 0.2s ease' }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SPACING.XS,
                    flex: 1,
                  }}
                >
                  <Text size="M" weight="L" style={{ color: hoverJoin ? COLOR.PURPLE : COLOR.BLACK, transition: 'color 0.2s ease' }}>
                    Je rejoins mon équipe
                  </Text>
                </div>
                <ArrowRight size={ICON_SIZE.M} style={{ color: hoverJoin ? COLOR.PURPLE : COLOR.GREY.DARK, transition: 'color 0.2s ease' }} />
              </Card>
            </div>

            <div
              onClick={() => {
                // TODO: Add create workspace logic
              }}
              onMouseEnter={() => setHoverCreate(true)}
              onMouseLeave={() => setHoverCreate(false)}
              style={{
                cursor: 'pointer',
              }}
            >
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: SPACING.M,
                  backgroundColor: COLOR.WHITE,
                  border: `1px solid ${hoverCreate ? COLOR.PURPLE : COLOR.GREY.MEDIUM}`,
                  transition: 'border-color 0.2s ease',
                  position: 'relative',
                }}
              >
                <Building2 size={ICON_SIZE.M} style={{ color: hoverCreate ? COLOR.PURPLE : COLOR.GREY.DARK, transition: 'color 0.2s ease' }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SPACING.XS,
                    flex: 1,
                  }}
                >
                  <Text size="M" weight="L" style={{ color: hoverCreate ? COLOR.PURPLE : COLOR.BLACK, transition: 'color 0.2s ease' }}>
                    Je crée un nouveau workspace
                  </Text>
                </div>
                <ArrowRight size={ICON_SIZE.M} style={{ color: hoverCreate ? COLOR.PURPLE : COLOR.GREY.DARK, transition: 'color 0.2s ease' }} />
              </Card>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
      
      <Popup
        isOpen={showJoinPopup}
        onClose={() => setShowJoinPopup(false)}
        title="Demandez à votre admin de vous ajouter"
        icon={Users}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.L,
          }}
        >
          <Text size="M" weight="M" color="BLACK">
            L'administrateur du workspace de votre organisation peut vous ajouter à l'équipe depuis son interface d'administration.
          </Text>
          
          <DashedCard>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text size="M" weight="L" color="BLACK">
                Communiquez-lui votre adresse email :
              </Text>
              <div
                onClick={handleCopyEmail}
                onMouseEnter={() => setHoverEmail(true)}
                onMouseLeave={() => setHoverEmail(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.S,
                  backgroundColor: COLOR.WHITE,
                  border: `1px solid rgba(82, 24, 249, 0.25)`,
                  paddingLeft: SPACING.M,
                  paddingRight: SPACING.M,
                  paddingTop: SPACING.S,
                  paddingBottom: SPACING.S,
                  borderRadius: BORDER_RADIUS.M,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Mail size={ICON_SIZE.S} style={{ color: COLOR.PURPLE }} />
                {copied ? (
                  <Text size="M" weight="L" style={{ color: COLOR.PURPLE }}>
                    Copié dans le presse-papiers !
                  </Text>
                ) : (
                  <Text size="M" weight={hoverEmail ? 'L' : 'M'} style={{ color: COLOR.PURPLE }}>
                    {userEmail}
                  </Text>
                )}
              </div>
            </div>
          </DashedCard>

          <Card>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.M,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.M,
                }}
              >
                <HelpCircle size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                <Text size="M" weight="XL" color="BLACK" as="div">
                  Besoin d'aide ? Contactez-nous
                </Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.M,
                }}
              >
                <Mail size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                <Text size="M" color="GREY_DARK" as="div">
                  louis@dataxx.fr
                </Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.M,
                }}
              >
                <Phone size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
                <Text size="M" color="GREY_DARK" as="div">
                  06 95 42 08 38
                </Text>
              </div>
            </div>
          </Card>

          <Button
            variant="BLACK"
            onClick={() => setShowJoinPopup(false)}
          >
            Compris !
          </Button>
        </div>
      </Popup>
    </div>
  )
}

