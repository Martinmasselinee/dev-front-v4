'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Building2, Sparkles, ArrowRight, Mail, Phone, HelpCircle, Copy } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { Footer } from '../../components/Footer'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Card } from '../../components/Card'
import { Popup } from '../../components/Popup'
import { Button } from '../../components/Button'
import { ICON_SIZE } from '../../constants/iconSize'
import { COLOR } from '../../constants/color'
import { FONT_SIZE, FONT_THICKNESS } from '../../constants/font'
import { TEXT_ALIGN } from '../../constants/text'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../constants/border'
import { OPACITY } from '../../constants/opacity'
import { TRANSITION } from '../../constants/transition'
import { TIME } from '../../constants/time'
import { COLOR_RGBA } from '../../constants/color'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { POSITION_TYPE } from '../../constants/position'
import { CURSOR } from '../../constants/interaction'
import { Loading } from '../../components/Loading'

export default function WorkspaceSelectionOrCreationPage() {
  const router = useRouter()
  const [hoverJoin, setHoverJoin] = useState(false)
  const [hoverCreate, setHoverCreate] = useState(false)
  const [showJoinPopup, setShowJoinPopup] = useState(false)
  const [hoverEmail, setHoverEmail] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Hardcoded email for now
  const userEmail = 'user@example.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userEmail)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, TIME.INTERVAL.ROTATING_TEXT)
    } catch (err) {
      console.error('Failed to copy email:', err)
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
      <div style={{ flex: FLEX.ONE, display: DISPLAY.FLEX, alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER }}>
        <Container>
          <HeaderSection>
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                alignItems: ALIGN_ITEMS.CENTER,
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
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
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
                cursor: CURSOR.POINTER,
              }}
            >
              <Card
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.ROW,
                  alignItems: ALIGN_ITEMS.FLEX_START,
                  gap: SPACING.M,
                  backgroundColor: COLOR.WHITE,
                  border: `${BORDER_WIDTH.THIN} solid ${hoverJoin ? COLOR.PURPLE : COLOR.GREY.MEDIUM}`,
                  transition: `border-color ${TRANSITION.FAST_EASE}`,
                  position: POSITION_TYPE.RELATIVE,
                }}
              >
                <Users size={ICON_SIZE.M} style={{ color: hoverJoin ? COLOR.PURPLE : COLOR.GREY.DARK, transition: `color ${TRANSITION.FAST_EASE}` }} />
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.COLUMN,
                    gap: SPACING.XS,
                    flex: FLEX.ONE,
                  }}
                >
                  <Text size="M" weight="L" style={{ color: hoverJoin ? COLOR.PURPLE : COLOR.BLACK, transition: `color ${TRANSITION.FAST_EASE}` }}>
                    Je rejoins mon équipe
                  </Text>
                </div>
                <ArrowRight size={ICON_SIZE.M} style={{ color: hoverJoin ? COLOR.PURPLE : COLOR.GREY.DARK, transition: `color ${TRANSITION.FAST_EASE}` }} />
              </Card>
            </div>

            <div
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => {
                  router.push('/create-workspace')
                }, TIME.DELAY.LOADING_REDIRECT)
              }}
              onMouseEnter={() => setHoverCreate(true)}
              onMouseLeave={() => setHoverCreate(false)}
              style={{
                cursor: CURSOR.POINTER,
              }}
            >
              <Card
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.ROW,
                  alignItems: ALIGN_ITEMS.FLEX_START,
                  gap: SPACING.M,
                  backgroundColor: COLOR.WHITE,
                  border: `${BORDER_WIDTH.THIN} solid ${hoverCreate ? COLOR.PURPLE : COLOR.GREY.MEDIUM}`,
                  transition: `border-color ${TRANSITION.FAST_EASE}`,
                  position: POSITION_TYPE.RELATIVE,
                }}
              >
                <Building2 size={ICON_SIZE.M} style={{ color: hoverCreate ? COLOR.PURPLE : COLOR.GREY.DARK, transition: `color ${TRANSITION.FAST_EASE}` }} />
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    flexDirection: FLEX_DIRECTION.COLUMN,
                    gap: SPACING.XS,
                    flex: FLEX.ONE,
                  }}
                >
                  <Text size="M" weight="L" style={{ color: hoverCreate ? COLOR.PURPLE : COLOR.BLACK, transition: `color ${TRANSITION.FAST_EASE}` }}>
                    Je crée un nouveau workspace
                  </Text>
                </div>
                <ArrowRight size={ICON_SIZE.M} style={{ color: hoverCreate ? COLOR.PURPLE : COLOR.GREY.DARK, transition: `color ${TRANSITION.FAST_EASE}` }} />
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
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <Text size="M" weight="M" color="BLACK">
            L'administrateur du workspace de votre organisation peut vous ajouter à l'équipe depuis son interface d'administration.
          </Text>
          
          <Card variant="dashed">
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
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
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                  backgroundColor: COLOR.WHITE,
                  border: `${BORDER_WIDTH.THIN} solid ${COLOR_RGBA.PURPLE_LIGHT}`,
                  paddingLeft: SPACING.M,
                  paddingRight: SPACING.M,
                  paddingTop: SPACING.S,
                  paddingBottom: SPACING.S,
                  borderRadius: BORDER_RADIUS.M,
                  cursor: CURSOR.POINTER,
                  transition: `all ${TRANSITION.FAST_EASE}`,
                }}
              >
                <Copy size={ICON_SIZE.S} style={{ color: COLOR.PURPLE }} />
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
          </Card>

          <Card>
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                gap: SPACING.M,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
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
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
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
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
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

      {isLoading && <Loading message="Préparation de votre workspace..." />}
    </div>
  )
}

