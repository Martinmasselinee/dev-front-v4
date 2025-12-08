'use client'

import { useState } from 'react'
import { Scale } from 'lucide-react'
import { Text } from './Text'
import { Popup } from './Popup'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { LAYOUT } from '../constants/layout'
import { FONT_SIZE } from '../constants/font'
import { Z_INDEX } from '../constants/zIndex'
import { WIDTH } from '../constants/width'
import { BORDER } from '../constants/border'
import { ICON_SIZE } from '../constants/iconSize'
import { POSITION_TYPE, POSITION } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { CURSOR } from '../constants/interaction'
import { BACKGROUND } from '../constants/background'
import { ConditionsUtilisation } from '../content/conditionsUtilisation'
import { MentionsLegales } from '../content/mentionsLegales'

export const Footer = () => {
  const [showConditionsPopup, setShowConditionsPopup] = useState(false)
  const [showMentionsPopup, setShowMentionsPopup] = useState(false)

  return (
    <>
      <div
        style={{
          position: POSITION_TYPE.FIXED,
          bottom: POSITION.ZERO,
          left: POSITION.ZERO,
          right: POSITION.ZERO,
          width: WIDTH.FULL,
          backgroundColor: COLOR.WHITE,
          borderTop: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
          borderBottomLeftRadius: BORDER_RADIUS.L,
          borderBottomRightRadius: BORDER_RADIUS.L,
          paddingTop: SPACING.L,
          paddingBottom: SPACING.L,
          paddingLeft: LAYOUT.CONTAINER_PADDING_X,
          paddingRight: LAYOUT.CONTAINER_PADDING_X,
          zIndex: Z_INDEX.NAVBAR,
        }}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            width: WIDTH.FULL,
            gap: SPACING.M,
          }}
        >
          <button
            type="button"
            onClick={() => setShowMentionsPopup(true)}
            style={{
              background: BACKGROUND.NONE,
              border: BORDER.NONE,
              padding: POSITION.ZERO,
              cursor: CURSOR.POINTER,
              color: COLOR.GREY.DARK,
            }}
          >
            <Text size="M" color="GREY_DARK" as="span">
              Mentions Légales
            </Text>
          </button>
          <Text size="M" color="GREY_DARK" as="span" style={{ fontSize: FONT_SIZE.L }}>
            •
          </Text>
          <button
            type="button"
            onClick={() => setShowConditionsPopup(true)}
            style={{
              background: BACKGROUND.NONE,
              border: BORDER.NONE,
              padding: POSITION.ZERO,
              cursor: CURSOR.POINTER,
              color: COLOR.GREY.DARK,
            }}
          >
            <Text size="M" color="GREY_DARK" as="span">
              Conditions Générales d'Utilisation
            </Text>
          </button>
          <Text size="M" color="GREY_DARK" as="span" style={{ fontSize: FONT_SIZE.L }}>
            •
          </Text>
          <Text size="M" color="GREY_DARK" as="span">
            © 2025 Dataxx - Tous droits réservés
          </Text>
        </div>
      </div>

      <Popup
        isOpen={showConditionsPopup}
        onClose={() => setShowConditionsPopup(false)}
        title="Conditions Générales d'Utilisation"
        icon={Scale}
      >
        <ConditionsUtilisation />
      </Popup>

      <Popup
        isOpen={showMentionsPopup}
        onClose={() => setShowMentionsPopup(false)}
        title="Mentions Légales"
        icon={Scale}
      >
        <MentionsLegales />
      </Popup>
    </>
  )
}

