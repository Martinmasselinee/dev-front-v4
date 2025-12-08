'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, FolderPlus, Users, User, Calendar, Video } from 'lucide-react'
import { LAYOUT } from '../../constants/layout'
import { SPACING } from '../../constants/spacing'
import { ICON_SIZE } from '../../constants/iconSize'
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
import { Select } from '../../components/Select'
import { Form } from '../../components/Form'
import { FormGroup } from '../../components/FormGroup'
import { AdminInfoCard } from '../../components/AdminInfoCard'
import { FileUpload } from '../../components/FileUpload'
import { Loading } from '../../components/Loading'
import { COLOR } from '../../constants/color'
import { Z_INDEX } from '../../constants/zIndex'
import { TIME } from '../../constants/time'
import { DISPLAY } from '../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../constants/flex'
import { POSITION_TYPE } from '../../constants/position'
import { WIDTH } from '../../constants/width'

type WorkspaceType = 'club-sportif' | 'athlete' | 'evenement-sportif' | 'media-sportif' | ''

const workspaceTypes = [
  { value: 'club-sportif' as const, label: 'Club sportif', icon: Users },
  { value: 'athlete' as const, label: 'Athlète', icon: User },
  { value: 'evenement-sportif' as const, label: 'Événement sportif', icon: Calendar },
  { value: 'media-sportif' as const, label: 'Média sportif', icon: Video },
]

export default function CreateWorkspacePage() {
  const router = useRouter()
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push('/radar-ai')
    }, TIME.DELAY.LOADING_REDIRECT)
  }

  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        position: POSITION_TYPE.RELATIVE,
        paddingTop: SPACING.XXXL,
        paddingBottom: SPACING.XXXL,
      }}
    >
      {/* Retour Button - Sticky Left */}
      <div
        style={{
          position: POSITION_TYPE.FIXED,
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
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
          width: WIDTH.FULL,
          paddingTop: SPACING.XXXL,
          paddingBottom: SPACING.XXXL,
        }}
      >
        <Container>
          <HeaderSection>
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.CENTER,
                gap: SPACING.M,
              }}
            >
              <FolderPlus size={ICON_SIZE.L} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Heading style={{ marginBottom: 0 }}>Créer un nouveau workspace</Heading>
            </div>
          </HeaderSection>

          <Form onSubmit={handleSubmit}>
            {/* File Upload at Top */}
            <FormGroup style={{ marginTop: SPACING.M }}>
              <FileUpload
                onFileSelect={(file) => {
                  // TODO: Handle file selection
                  console.log('File selected:', file.name)
                }}
              />
            </FormGroup>

            {/* Nom du workspace */}
            <FormGroup style={{ marginTop: SPACING.M }}>
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

            {/* Type de workspace - Dropdown */}
            <FormGroup style={{ marginTop: SPACING.M }}>
              <Text size="M" weight="M" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Type de workspace *
              </Text>
              <Select
                value={workspaceType}
                onChange={(e) => setWorkspaceType(e.target.value as WorkspaceType)}
                required
                icon={
                  workspaceType
                    ? (() => {
                        const selectedType = workspaceTypes.find((type) => type.value === workspaceType)
                        return selectedType ? (
                          <selectedType.icon size={ICON_SIZE.M} />
                        ) : undefined
                      })()
                    : undefined
                }
              >
                <option value="">Sélectionnez un type</option>
                {workspaceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {/* Description */}
            <FormGroup style={{ marginTop: SPACING.M }}>
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

            <div style={{ marginTop: SPACING.XS }}>
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
      {isLoading && <Loading message="Création de votre workspace..." />}
    </div>
  )
}
