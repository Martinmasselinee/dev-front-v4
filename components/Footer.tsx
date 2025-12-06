import { Link } from './Link'
import { Text } from './Text'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { LAYOUT } from '../constants/layout'
import { FONT_SIZE } from '../constants/fontSize'

export const Footer = () => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: COLOR.WHITE,
        borderTop: `1px solid ${COLOR.GREY.LIGHT}`,
        borderBottomLeftRadius: BORDER_RADIUS.L,
        borderBottomRightRadius: BORDER_RADIUS.L,
        paddingTop: SPACING.L,
        paddingBottom: SPACING.L,
        paddingLeft: LAYOUT.CONTAINER_PADDING_X,
        paddingRight: LAYOUT.CONTAINER_PADDING_X,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: SPACING.M,
        }}
      >
        <Link href="/mentions-legales" style={{ color: COLOR.GREY.DARK }}>
          <Text size="M" color="GREY_DARK" as="span">
            Mentions Légales
          </Text>
        </Link>
        <Text size="M" color="GREY_DARK" as="span" style={{ fontSize: FONT_SIZE.L }}>
          •
        </Text>
        <Link href="/conditions-utilisation" style={{ color: COLOR.GREY.DARK }}>
          <Text size="M" color="GREY_DARK" as="span">
            Conditions Générales d'Utilisation
          </Text>
        </Link>
        <Text size="M" color="GREY_DARK" as="span" style={{ fontSize: FONT_SIZE.L }}>
          •
        </Text>
        <Text size="M" color="GREY_DARK" as="span">
          © 2025 Dataxx - Tous droits réservés
        </Text>
      </div>
    </div>
  )
}

