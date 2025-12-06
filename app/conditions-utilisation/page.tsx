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

export default function ConditionsUtilisationPage() {
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
            <Heading>Conditions Générales d'Utilisation</Heading>
            <Text>Règles et conditions d'utilisation de la plateforme Dataxx</Text>
          </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.L,
              }}
            >
              <div>
                <Heading level={2}>1. Objet</Heading>
                <Text>
                  Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions
                  d'utilisation de la plateforme Dataxx, ainsi que les droits et obligations des parties dans ce cadre.
                </Text>
                <Spacer size="M" />
                <Text>
                  Elles constituent un contrat entre Dataxx et l'utilisateur. L'accès et l'utilisation de la plateforme
                  impliquent l'acceptation pleine et entière des présentes CGU.
                </Text>
              </div>

              <div>
                <Heading level={2}>2. Acceptation des conditions</Heading>
                <Text>
                  En accédant à la plateforme Dataxx, vous reconnaissez avoir lu, compris et accepté les présentes Conditions
                  Générales d'Utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser la plateforme.
                </Text>
              </div>

              <div>
                <Heading level={2}>3. Inscription et compte utilisateur</Heading>
                <Text>
                  Pour utiliser certains services de la plateforme, vous devez créer un compte en fournissant des informations
                  exactes, complètes et à jour. Vous êtes responsable de la confidentialité de vos identifiants de connexion.
                </Text>
                <Spacer size="M" />
                <Text>
                  Vous vous engagez à ne pas partager vos identifiants avec des tiers et à nous informer immédiatement de toute
                  utilisation non autorisée de votre compte.
                </Text>
              </div>

              <div>
                <Heading level={2}>4. Utilisation de la plateforme</Heading>
                <Text>
                  Vous vous engagez à utiliser la plateforme de manière conforme à sa destination et dans le respect des lois
                  et règlements en vigueur. Il est strictement interdit d'utiliser la plateforme à des fins illégales ou
                  frauduleuses.
                </Text>
              </div>

              <div>
                <Heading level={2}>5. Propriété intellectuelle</Heading>
                <Text>
                  Tous les éléments de la plateforme Dataxx, qu'ils soient visuels, sonores ou textuels, sont protégés par le
                  droit d'auteur, des marques ou tout autre droit de propriété intellectuelle. Toute reproduction, même
                  partielle, est interdite sans autorisation préalable.
                </Text>
              </div>

              <div>
                <Heading level={2}>6. Limitation de responsabilité</Heading>
                <Text>
                  Dataxx s'efforce d'assurer l'accès et le fonctionnement de la plateforme 24h/24 et 7j/7. Cependant, Dataxx
                  ne saurait être tenu responsable en cas d'indisponibilité temporaire ou définitive de la plateforme, quelle
                  qu'en soit la cause.
                </Text>
              </div>

              <div>
                <Heading level={2}>7. Modification des CGU</Heading>
                <Text>
                  Dataxx se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur
                  dès leur publication sur la plateforme. Il est recommandé de consulter régulièrement cette page.
                </Text>
              </div>

              <div>
                <Heading level={2}>8. Droit applicable et juridiction</Heading>
                <Text>
                  Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative de résolution
                  amiable, les tribunaux français seront seuls compétents.
                </Text>
              </div>
            </div>
        </div>
      </Container>
    </PageContainer>
  )
}

