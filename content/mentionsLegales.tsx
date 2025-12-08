import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { Spacer } from '../components/Spacer'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION } from '../constants/flexDirection'

export const MentionsLegales = () => {
  return (
    <div
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        gap: SPACING.L,
      }}
    >
      <div>
        <Heading level={2}>Éditeur du site / de la plateforme</Heading>
        <Text>
          Dénomination sociale : DATAXX
        </Text>
        <Spacer size="M" />
        <Text>
          Forme juridique : SAS
        </Text>
        <Spacer size="M" />
        <Text>
          Capital social : 900 €
        </Text>
        <Spacer size="M" />
        <Text>
          Siège social : 4 impasse Reille, 75014 Paris, France
        </Text>
        <Spacer size="M" />
        <Text>
          Numéro RCS / SIREN : 989 277 108
        </Text>
        <Spacer size="M" />
        <Text>
          Numéro de TVA intracommunautaire : FR33989277108
        </Text>
        <Spacer size="M" />
        <Text>
          Directeur de la publication : Clément Authier
        </Text>
        <Spacer size="M" />
        <Text>
          Contact : contact@dataxx.fr
        </Text>
      </div>

      <div>
        <Heading level={2}>Hébergement</Heading>
        <Text>
          Le site et la plateforme Dataxx sont hébergés par :
        </Text>
        <Spacer size="M" />
        <Text>
          Google Cloud France
        </Text>
        <Spacer size="M" />
        <Text>
          8 rue de Londres, 75009 Paris, France
        </Text>
      </div>

      <div>
        <Heading level={2}>Droit applicable</Heading>
        <Text>
          Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN), il est porté à la connaissance des utilisateurs du site et de la plateforme Dataxx les présentes mentions légales. Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux français.
        </Text>
      </div>

      <div>
        <Text>
          Dernière mise à jour : 06/12/2025
        </Text>
      </div>
    </div>
  )
}

