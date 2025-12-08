import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { Spacer } from '../components/Spacer'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION } from '../constants/flex'

export const ConditionsUtilisation = () => {
  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        gap: SPACING.L,
      }}
    >
      <div>
        <Heading level={2}>Préambule</Heading>
        <Text>
          Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'utilisation de la plateforme Dataxx, éditée par la société DATAXX SAS. L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU par tout Utilisateur.
        </Text>
      </div>

      <div>
        <Heading level={2}>Définitions</Heading>
        <Text>
          « Plateforme » : la solution logicielle Dataxx accessible en ligne.
        </Text>
        <Spacer size="M" />
        <Text>
          « Utilisateur » : toute personne physique ou morale utilisant la plateforme Dataxx.
        </Text>
        <Spacer size="M" />
        <Text>
          « Services » : l'ensemble des fonctionnalités proposées par la plateforme (cartographie d'entreprises, scoring sponsoring, identification des contacts décisionnaires, génération d'emails, etc.).
        </Text>
        <Spacer size="M" />
        <Text>
          « Crédits » : unités de mesure pour l'utilisation de certains Services premium de la plateforme.
        </Text>
        <Spacer size="M" />
        <Text>
          « Données » : informations collectées et traitées par la plateforme, incluant les données utilisateurs (clubs abonnés) et les données de contacts B2B mises à disposition.
        </Text>
      </div>

      <div>
        <Heading level={2}>Objet</Heading>
        <Text>
          Dataxx est une plateforme SaaS qui automatise la détection de prospects, l'évaluation de leur pertinence, l'identification de contacts décisionnaires et la génération d'emails personnalisés afin d'aider les clubs sportifs à développer leurs revenus sponsoring.
        </Text>
      </div>

      <div>
        <Heading level={2}>Accès aux services</Heading>
        <Text>
          L'accès à la plateforme nécessite la création d'un compte utilisateur.
        </Text>
        <Spacer size="M" />
        <Text>
          L'Utilisateur s'engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants.
        </Text>
        <Spacer size="M" />
        <Text>
          Différents niveaux d'accès sont disponibles selon l'abonnement souscrit.
        </Text>
      </div>

      <div>
        <Heading level={2}>Système de crédits</Heading>
        <Text>
          Chaque action sur la plateforme consomme un nombre de crédits défini et indiqué dans l'interface utilisateur.
        </Text>
        <Spacer size="M" />
        <Text>
          DATAXX SAS se réserve la possibilité d'adapter cette grille, les Utilisateurs en étant informés sur la plateforme.
        </Text>
        <Spacer size="M" />
        <Text>
          Les crédits sont attribués mensuellement selon la formule d'abonnement choisie.
        </Text>
        <Spacer size="M" />
        <Text>
          Les crédits non utilisés ne sont pas reportés au mois suivant, sauf mention contraire expresse dans l'offre.
        </Text>
      </div>

      <div>
        <Heading level={2}>Modalités financières</Heading>
        <Text>
          Les abonnements sont proposés sous forme mensuelle, avec renouvellement tacite automatique.
        </Text>
        <Spacer size="M" />
        <Text>
          Le paiement s'effectue par prélèvement, carte bancaire ou virement.
        </Text>
        <Spacer size="M" />
        <Text>
          Les prix s'entendent hors taxes (HT).
        </Text>
        <Spacer size="M" />
        <Text>
          En cas de retard de paiement, des pénalités légales s'appliquent ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement (art. L441-10 Code de commerce).
        </Text>
      </div>

      <div>
        <Heading level={2}>Obligations de l'Utilisateur</Heading>
        <Text>
          Utiliser la plateforme uniquement dans le cadre de son activité professionnelle.
        </Text>
        <Spacer size="M" />
        <Text>
          Ne pas porter atteinte aux droits de tiers ni utiliser les données fournies à des fins illégales.
        </Text>
        <Spacer size="M" />
        <Text>
          Ne pas extraire massivement les Données, les revendre ou les redistribuer.
        </Text>
        <Spacer size="M" />
        <Text>
          Ne pas tenter de contourner les mesures de sécurité ou d'accéder au code source.
        </Text>
        <Spacer size="M" />
        <Text>
          Ne pas utiliser la plateforme pour développer un service concurrent.
        </Text>
      </div>

      <div>
        <Heading level={2}>Propriété intellectuelle</Heading>
        <Text>
          La plateforme Dataxx, ses bases de données, algorithmes, contenus, logos et éléments graphiques sont la propriété exclusive de DATAXX SAS.
        </Text>
        <Spacer size="M" />
        <Text>
          L'Utilisateur bénéficie d'un droit d'usage personnel, non exclusif, non cessible et non transférable, limité à son abonnement.
        </Text>
      </div>

      <div>
        <Heading level={2}>Protection des données personnelles (RGPD)</Heading>
        <Text>
          DATAXX SAS collecte et traite des données personnelles nécessaires au fonctionnement du service (comptes utilisateurs) et met à disposition des Utilisateurs des données de contacts professionnels (B2B).
        </Text>
        <Spacer size="M" />
        <Text>
          Les traitements ont pour finalité : gestion des abonnements, accès aux Services, fourniture des Données, génération d'emails personnalisés.
        </Text>
        <Spacer size="M" />
        <Text>
          Les Données sont hébergées par Google Cloud dans l'Union Européenne.
        </Text>
        <Spacer size="M" />
        <Text>
          L'Utilisateur (client) est seul responsable de l'utilisation des contacts fournis via la plateforme dans le respect de la réglementation (prospection B2B).
        </Text>
        <Spacer size="M" />
        <Text>
          Toute personne concernée dispose d'un droit d'accès, de rectification, d'opposition, de limitation et de suppression de ses données, qu'elle peut exercer via : contact@dataxx.fr.
        </Text>
      </div>

      <div>
        <Heading level={2}>Limitation de responsabilité</Heading>
        <Text>
          DATAXX SAS met en œuvre tous les moyens raisonnables pour maintenir l'accessibilité de la plateforme mais ne garantit pas une disponibilité permanente.
        </Text>
        <Spacer size="M" />
        <Text>
          La société ne garantit pas l'exactitude ou l'exhaustivité des Données externes (CA des entreprises, investissements sponsoring, etc.).
        </Text>
        <Spacer size="M" />
        <Text>
          DATAXX SAS ne peut être tenue responsable si les emails envoyés via la plateforme sont rejetés ou qualifiés de spam.
        </Text>
        <Spacer size="M" />
        <Text>
          Aucune garantie n'est donnée quant à la conclusion effective de contrats de sponsoring.
        </Text>
      </div>

      <div>
        <Heading level={2}>Résiliation et suspension</Heading>
        <Text>
          DATAXX SAS peut suspendre ou résilier l'accès d'un Utilisateur en cas de manquement aux présentes CGU, sans préavis ni indemnité.
        </Text>
        <Spacer size="M" />
        <Text>
          L'Utilisateur peut résilier son abonnement depuis son espace client. La résiliation prend effet à la fin de la période en cours.
        </Text>
        <Spacer size="M" />
        <Text>
          Toute somme due reste acquise à DATAXX SAS.
        </Text>
      </div>

      <div>
        <Heading level={2}>Évolutions du service</Heading>
        <Text>
          DATAXX SAS se réserve le droit de faire évoluer la plateforme (ajout, suppression ou modification de fonctionnalités) et d'adapter ses offres commerciales. Les Utilisateurs seront informés en cas de modification significative.
        </Text>
      </div>

      <div>
        <Heading level={2}>Force majeure</Heading>
        <Text>
          La responsabilité de DATAXX SAS ne pourra être engagée en cas d'événement imprévisible et irrésistible empêchant l'exécution des CGU (panne internet, cyberattaque, catastrophe naturelle, guerre, etc.).
        </Text>
      </div>

      <div>
        <Heading level={2}>Modification des CGU</Heading>
        <Text>
          DATAXX SAS se réserve le droit de modifier les présentes CGU à tout moment. Les Utilisateurs seront notifiés de toute modification importante. La poursuite de l'utilisation de la plateforme vaut acceptation des nouvelles conditions.
        </Text>
      </div>

      <div>
        <Heading level={2}>Droit applicable et juridiction compétente</Heading>
        <Text>
          Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux de Paris.
        </Text>
      </div>

      <div>
        <Text>
          Dernière mise à jour : 06/12/2025
        </Text>
        <Spacer size="M" />
        <Text>
          Version : 1.0
        </Text>
      </div>
    </div>
  )
}

