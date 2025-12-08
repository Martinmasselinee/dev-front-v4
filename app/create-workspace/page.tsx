'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, Users, Shield, Settings, Database, Check, FolderPlus } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { Footer } from '../../components/Footer'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { ButtonRetour } from '../../components/ButtonRetour'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { Form } from '../../components/Form'
import { FormGroup } from '../../components/FormGroup'
import { AdminInfoCard } from '../../components/AdminInfoCard'
import { FileUpload } from '../../components/FileUpload'
import { ICON_SIZE } from '../../constants/iconSize'
import { COLOR } from '../../constants/color'
import { Z_INDEX } from '../../constants/zIndex'
import { TRANSITION } from '../../constants/transition'

type WorkspaceType = 'club-sportif' | 'athlete' | 'evenement-sportif' | 'media-sportif' | ''

const workspaceTypes = [
  { value: 'club-sportif' as const, label: 'Club sportif', emoji: '⚽' },
  { value: 'athlete' as const, label: 'Athlète', emoji: '🏃' },
  { value: 'evenement-sportif' as const, label: 'Événement sportif', emoji: '🎯' },
  { value: 'media-sportif' as const, label: 'Média sportif', emoji: '📺' },
]

export default function CreateWorkspacePage() {
  const router = useRouter()
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>('')
  const [description, setDescription] = useState('')
  const [hoveredType, setHoveredType] = useState<WorkspaceType | ''>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add workspace creation logic here
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: 'relative',
        paddingTop: SPACING.XXXL,
        paddingBottom: SPACING.XXXL,
      }}
    >
      {/* Retour Button - Sticky Left */}
      <div
        style={{
          position: 'fixed',
          left: SPACING.L,
          top: `calc(${SPACING.M} + ${SPACING.M} + ${SPACING.L} + ${SPACING.XXL})`,
          zIndex: Z_INDEX.NAVBAR,
        }}
      >
        <ButtonRetour
          variant="WHITE"
          onClick={() => router.push('/workspace-selection-or-creation')}
          icon={<ArrowLeft size={ICON_SIZE.M} />}
        >
          Retour
        </ButtonRetour>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: SPACING.XXXL,
          paddingBottom: SPACING.XXXL,
        }}
      >
        <Container>
          <HeaderSection>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: SPACING.M,
              }}
            >
              <FolderPlus size={ICON_SIZE.L} style={{ color: COLOR.BLACK, flexShrink: 0 }} />
              <Heading style={{ marginBottom: 0 }}>Créer un nouveau workspace</Heading>
            </div>
          </HeaderSection>

          <Form onSubmit={handleSubmit}>
            {/* File Upload at Top */}
            <FormGroup>
              <FileUpload
                onFileSelect={(file) => {
                  // TODO: Handle file selection
                  console.log('File selected:', file.name)
                }}
              />
            </FormGroup>

            {/* Nom du workspace */}
            <FormGroup style={{ marginTop: SPACING.XL }}>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Nom du workspace *
              </Text>
              <Input
                id="workspaceName"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Nom du workspace"
                required
                icon={<Building2 size={ICON_SIZE.M} />}
              />
            </FormGroup>

            {/* Type de workspace - Card buttons */}
            <FormGroup style={{ marginTop: SPACING.XL }}>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Type de workspace *
              </Text>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: SPACING.M,
                }}
              >
                {workspaceTypes.map((type) => {
                  const isSelected = workspaceType === type.value
                  const isHovered = hoveredType === type.value
                  return (
                    <div
                      key={type.value}
                      onClick={() => setWorkspaceType(type.value)}
                      onMouseEnter={() => setHoveredType(type.value)}
                      onMouseLeave={() => setHoveredType('')}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <Card
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: SPACING.M,
                          backgroundColor: COLOR.WHITE,
                          border: `1px solid ${isSelected || isHovered ? COLOR.PURPLE : COLOR.GREY.MEDIUM}`,
                          transition: `border-color ${TRANSITION.FAST_EASE}`,
                          paddingTop: SPACING.S,
                          paddingBottom: SPACING.S,
                        }}
                      >
                        <span style={{ fontSize: ICON_SIZE.M }}>{type.emoji}</span>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: SPACING.XS,
                            flex: 1,
                          }}
                        >
                          <Text
                            size="M"
                            weight="L"
                            style={{
                              color: isSelected || isHovered ? COLOR.PURPLE : COLOR.BLACK,
                              transition: `color ${TRANSITION.FAST_EASE}`,
                            }}
                          >
                            {type.label}
                          </Text>
                        </div>
                        {isSelected && (
                          <Check size={ICON_SIZE.M} style={{ color: COLOR.PURPLE }} />
                        )}
                      </Card>
                    </div>
                  )
                })}
              </div>
            </FormGroup>

            {/* Description */}
            <FormGroup style={{ marginTop: SPACING.XL }}>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Description (optionnel)
              </Text>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre workspace et vos objectifs sponsoring pour réussir votre mission"
                rows={4}
              />
            </FormGroup>

            <div style={{ marginTop: SPACING.L }}>
              <Button variant="PURPLE" type="submit">
                Créer le workspace
              </Button>
            </div>
          </Form>

          {/* Admin Info Card with Privileges - At Bottom */}
          <AdminInfoCard />
        </Container>
      </div>
      <Footer />
    </div>
  )
}
