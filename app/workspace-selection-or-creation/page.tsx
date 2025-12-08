'use client'

import { useState } from 'react'
import { Users, Building2, Sparkles, ArrowRight } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { Footer } from '../../components/Footer'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Card } from '../../components/Card'
import { ICON_SIZE } from '../../constants/iconSize'
import { COLOR } from '../../constants/color'
import { FONT_SIZE } from '../../constants/fontSize'
import { FONT_THICKNESS } from '../../constants/fontThickness'
import { TEXT_ALIGN } from '../../constants/textAlign'

export default function WorkspaceSelectionOrCreationPage() {
  const [hoverJoin, setHoverJoin] = useState(false)
  const [hoverCreate, setHoverCreate] = useState(false)
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
                // TODO: Add join team logic
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
    </div>
  )
}

