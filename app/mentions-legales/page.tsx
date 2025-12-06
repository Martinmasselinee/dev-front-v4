'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageContainer } from '../../components/PageContainer'
import { Container } from '../../components/Container'
import { HeaderSection } from '../../components/HeaderSection'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { ButtonRetour } from '../../components/ButtonRetour'
import { Spacer } from '../../components/Spacer'
import { SPACING } from '../../constants/spacing'
import { ICON_SIZE } from '../../constants/iconSize'
import { TEXT_ALIGN } from '../../constants/textAlign'

export default function MentionsLegalesPage() {
  const router = useRouter()

  return (
    <PageContainer>
      <Container>
        <div style={{ paddingTop: `${parseFloat(SPACING.XXL) * 2}px`, paddingBottom: `${parseFloat(SPACING.XXL) * 2}px`, textAlign: TEXT_ALIGN.LEFT }}>
          <div style={{ marginBottom: SPACING.L, display: 'flex', justifyContent: 'flex-start' }}>
            <ButtonRetour
              variant="WHITE"
              type="button"
              onClick={() => {
                router.back()
              }}
              icon={<ArrowLeft size={ICON_SIZE.M} />}
            >
              Retour
            </ButtonRetour>
          </div>

          <div style={{ marginBottom: SPACING.XXL, textAlign: TEXT_ALIGN.LEFT }}>
            <Heading>Mentions Légales</Heading>
            <Text>Informations légales concernant la plateforme Dataxx</Text>
          </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.L,
              }}
            >
              <div>
                <Heading level={2}>Éditeur du site</Heading>
                <Text>
                  Le site web Dataxx est édité par Dataxx SAS, société par actions simplifiée au capital de 100 000 euros,
                  immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
                </Text>
                <Spacer size="M" />
                <Text>
                  Siège social : 123 Rue de la République, 75001 Paris, France
                </Text>
                <Spacer size="M" />
                <Text>
                  Directeur de la publication : Jean Dupont
                </Text>
              </div>

              <div>
                <Heading level={2}>Hébergement</Heading>
                <Text>
                  Le site est hébergé par Vercel Inc., situé au 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                </Text>
              </div>

              <div>
                <Heading level={2}>Contact</Heading>
                <Text>
                  Pour toute question concernant le site ou ces mentions légales, vous pouvez nous contacter à l'adresse suivante :
                  contact@dataxx.fr
                </Text>
              </div>

              <div>
                <Heading level={2}>Propriété intellectuelle</Heading>
                <Text>
                  L'ensemble du contenu de ce site (textes, images, logos, icônes, etc.) est la propriété exclusive de Dataxx
                  ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété
                  intellectuelle.
                </Text>
              </div>

              <div>
                <Heading level={2}>Protection des données personnelles</Heading>
                <Text>
                  Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la
                  Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et
                  d'opposition aux données personnelles vous concernant.
                </Text>
              </div>
            </div>
        </div>
      </Container>
    </PageContainer>
  )
}

