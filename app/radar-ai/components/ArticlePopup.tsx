'use client'

import { LucideIcon } from 'lucide-react'
import { Popup } from '../../../components/Popup'
import { Text } from '../../../components/Text'
import { COLOR } from '../../../constants/color'
import { SPACING } from '../../../constants/spacing'
import { DISPLAY } from '../../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX, FLEX_WRAP } from '../../../constants/flex'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../constants/border'
import { ICON_SIZE } from '../../../constants/iconSize'
import { WIDTH } from '../../../constants/width'
import { LINE_HEIGHT } from '../../../constants/font'
import { WHITE_SPACE } from '../../../constants/text'

export interface ArticlePopupProps {
  isOpen: boolean
  onClose: () => void
  type: string
  typeLabel: string
  typeIcon: LucideIcon
  date: string
  title: string
  excerpt: string
  content: string
  tags: string[]
}

export const ArticlePopup = ({
  isOpen,
  onClose,
  type,
  typeLabel,
  typeIcon: Icon,
  date,
  title,
  excerpt,
  content,
  tags,
}: ArticlePopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={Icon}
    >
      <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.L }}>
        {/* Top container with article type and date */}
        <div
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
            paddingBottom: SPACING.S,
            borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
          }}
        >
          <Text size="S" weight="M" color="GREY_DARK">
            {typeLabel}
          </Text>
          <Text size="S" weight="M" color="GREY_DARK">
            {date}
          </Text>
        </div>

        {/* Image thumbnail */}
        <div
          style={{
            width: WIDTH.FULL,
            aspectRatio: '16/9',
            backgroundColor: COLOR.GREY.LIGHT,
            borderRadius: BORDER_RADIUS.M,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
          }}
        >
          <Icon size={ICON_SIZE.XL} style={{ color: COLOR.GREY.MEDIUM }} />
        </div>

        {/* Title */}
        <Text size="L" weight="XL" color="BLACK">
          {title}
        </Text>

        {/* Excerpt */}
        <Text size="M" weight="M" color="BLACK">
          {excerpt}
        </Text>

        {/* Full content */}
        <Text size="M" weight="M" color="BLACK" style={{ lineHeight: LINE_HEIGHT.TIGHT, whiteSpace: WHITE_SPACE.PRE_LINE }}>
          {content}
        </Text>

        {/* Tag bubbles */}
        {tags.length > 0 && (
          <div
            style={{
              display: DISPLAY.FLEX,
              flexWrap: FLEX_WRAP.WRAP,
              gap: SPACING.XS,
            }}
          >
            {tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  display: DISPLAY.INLINE_FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  paddingLeft: SPACING.S,
                  paddingRight: SPACING.S,
                  paddingTop: SPACING.XS,
                  paddingBottom: SPACING.XS,
                  backgroundColor: COLOR.PURPLE_LIGHT,
                  borderRadius: BORDER_RADIUS.M,
                }}
              >
                <Text size="S" weight="M" color="PURPLE">
                  {tag}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </Popup>
  )
}

