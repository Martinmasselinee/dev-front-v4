'use client'

import { Sparkles } from 'lucide-react'
import { Card } from '../../../components/Card'
import { Text } from '../../../components/Text'
import { Button } from '../../../components/Button'
import { SPACING } from '../../../constants/spacing'
import { DISPLAY } from '../../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../../constants/flex'
import { COLOR } from '../../../constants/color'
import { ICON_SIZE } from '../../../constants/iconSize'
import { WIDTH } from '../../../constants/width'

interface NoAbonnementCardProps {
  onSubscribe?: () => void
}

export const NoAbonnementCard = ({ onSubscribe }: NoAbonnementCardProps) => {
  return (
    <Card
      style={{
        marginTop: SPACING.L,
        marginLeft: SPACING.L,
        marginRight: SPACING.L,
        marginBottom: SPACING.L,
        backgroundColor: COLOR.WHITE,
      }}
    >
      <div
        style={{
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.ROW,
          alignItems: ALIGN_ITEMS.CENTER,
          gap: SPACING.M,
        }}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            flexShrink: FLEX.ZERO,
            marginRight: SPACING.M,
          }}
        >
          <Sparkles size={ICON_SIZE.L} style={{ color: COLOR.GREY.DARK }} />
        </div>
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.XS,
            flex: FLEX.ONE,
          }}
        >
          <Text size="L" weight="XL" color="BLACK">
            Aucun abonnement actif
          </Text>
          <Text size="M" weight="M" color="GREY_DARK">
            Vous devez souscrire à un abonnement pour effectuer des recherches de sponsors.
          </Text>
        </div>
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            flexShrink: FLEX.ZERO,
          }}
        >
          <Button
            variant="BLACK"
            onClick={onSubscribe}
            style={{
              width: WIDTH.AUTO,
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
            }}
          >
            Souscrire maintenant
          </Button>
        </div>
      </div>
    </Card>
  )
}

