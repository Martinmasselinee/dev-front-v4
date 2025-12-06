'use client'

import { useState } from 'react'
import { Text } from './Text'
import { Popup } from './Popup'
import { COLOR } from '../constants/color'
import { SPACING } from '../constants/spacing'
import { BORDER_RADIUS } from '../constants/borderRadius'
import { LAYOUT } from '../constants/layout'
import { FONT_SIZE } from '../constants/fontSize'
import { Z_INDEX } from '../constants/zIndex'
import { ConditionsUtilisation } from '../content/conditionsUtilisation'
import { MentionsLegales } from '../content/mentionsLegales'

export const Footer = () => {
  const [showConditionsPopup, setShowConditionsPopup] = useState(false)
  const [showMentionsPopup, setShowMentionsPopup] = useState(false)

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: COLOR.WHITE,
          borderTop: `1px solid ${COLOR.GREY.MEDIUM}`,
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: SPACING.M,
          }}
        >
          <button
            type="button"
            onClick={() => setShowMentionsPopup(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
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
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
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
      >
        <ConditionsUtilisation />
      </Popup>

      <Popup
        isOpen={showMentionsPopup}
        onClose={() => setShowMentionsPopup(false)}
        title="Mentions Légales"
      >
        <MentionsLegales />
      </Popup>
    </>
  )
}

