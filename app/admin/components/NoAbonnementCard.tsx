'use client'

import { Sparkles, Wand2 } from 'lucide-react'
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
        marginTop: SPACING.ZERO,
        marginLeft: SPACING.L,
        marginRight: SPACING.L,
        marginBottom: SPACING.XL,
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
            gap: SPACING.ZERO,
            flex: FLEX.ONE,
            paddingTop: SPACING.ZERO,
            marginTop: SPACING.ZERO,
          }}
        >
          <Text size="M" weight="XL" color="BLACK" style={{ marginTop: SPACING.ZERO, paddingTop: SPACING.ZERO }}>
            Aucun abonnement actif
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
            icon={<Wand2 size={ICON_SIZE.M} />}
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

