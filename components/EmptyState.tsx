'use client'

import { LucideIcon } from 'lucide-react'
import { Container } from './Container'
import { Text } from './Text'
import { COLOR } from '../constants/color'
import { BORDER_RADIUS, BORDER_WIDTH } from '../constants/border'
import { ICON_SIZE } from '../constants/iconSize'
import { SPACING } from '../constants/spacing'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT } from '../constants/flex'
import { TEXT_ALIGN } from '../constants/text'
import { DIMENSION } from '../constants/dimension'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <Container variant="fullWidth">
      <div
        style={{
          paddingTop: SPACING.XL,
          paddingLeft: SPACING.XL,
          paddingRight: SPACING.XL,
          paddingBottom: SPACING.XXL,
          backgroundColor: COLOR.GREY.LIGHT,
          border: `${BORDER_WIDTH.MEDIUM} dashed ${COLOR.GREY.MEDIUM}`,
          borderRadius: BORDER_RADIUS.L,
          marginTop: SPACING.XL,
        }}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.M,
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.CENTER,
            }}
          >
            <Icon
              size={ICON_SIZE.XL * 2}
              strokeWidth={1.5}
              style={{
                color: COLOR.GREY.DARK,
              }}
            />
          </div>

          {/* Text content */}
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.XS,
            }}
          >
            <Text
              size="L"
              weight="XL"
              color="BLACK"
              style={{
                textAlign: TEXT_ALIGN.CENTER,
              }}
            >
              {title}
            </Text>
            <div
              style={{
                maxWidth: DIMENSION.EMPTY_STATE_SUBTITLE_MAX_WIDTH,
              }}
            >
              <Text
                size="M"
                weight="M"
                color="GREY_DARK"
                style={{
                  textAlign: TEXT_ALIGN.CENTER,
                }}
              >
                {description}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

