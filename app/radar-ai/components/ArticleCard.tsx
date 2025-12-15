'use client'

import { ReactNode } from 'react'
import { LucideIcon, ExternalLink } from 'lucide-react'
import { Card } from '../../../components/Card'
import { Text } from '../../../components/Text'
import { Button } from '../../../components/Button'
import { IconButton } from '../../../components/IconButton'
import { COLOR } from '../../../constants/color'
import { SPACING } from '../../../constants/spacing'
import { DISPLAY } from '../../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX, FLEX_WRAP } from '../../../constants/flex'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../constants/border'
import { ICON_SIZE } from '../../../constants/iconSize'
import { WIDTH } from '../../../constants/width'
import { DIMENSION } from '../../../constants/dimension'
import { CURSOR } from '../../../constants/interaction'
import { TRANSITION } from '../../../constants/transition'

export interface ArticleCardProps {
  type: string
  typeLabel: string
  typeIcon: LucideIcon
  date: string
  title: string
  excerpt: string
  tags: string[]
  onRead?: () => void
  onTypeClick?: () => void
}

export const ArticleCard = ({
  type,
  typeLabel,
  typeIcon: Icon,
  date,
  title,
  excerpt,
  tags,
  onRead,
  onTypeClick,
}: ArticleCardProps) => {
  return (
    <Card style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.M, height: WIDTH.FULL }}>
      {/* Top container with article type */}
      <div
        style={{
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
          paddingBottom: SPACING.S,
          borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
        }}
      >
        <div
          onClick={onTypeClick}
          style={{
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            gap: SPACING.XS,
            cursor: onTypeClick ? CURSOR.POINTER : CURSOR.DEFAULT,
          }}
        >
          <Text size="S" weight="M" color="GREY_DARK">
            {typeLabel}
          </Text>
        </div>
        <IconButton
          icon={<ExternalLink size={ICON_SIZE.M} />}
          onClick={onRead}
          style={{
            transition: `color ${TRANSITION.FAST_EASE}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = COLOR.PURPLE
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = COLOR.GREY.MEDIUM
          }}
        />
      </div>

      {/* Image thumbnail */}
      <div
        style={{
          width: WIDTH.FULL,
          aspectRatio: DIMENSION.ASPECT_RATIO_VIDEO,
          backgroundColor: COLOR.GREY.LIGHT,
          borderRadius: BORDER_RADIUS.M,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
        }}
      >
        <Icon size={ICON_SIZE.XL} style={{ color: COLOR.GREY.MEDIUM }} />
      </div>

      {/* Date */}
      <Text size="S" weight="M" color="GREY_DARK">
        {date}
      </Text>

      {/* Title */}
      <Text size="L" weight="XL" color="BLACK">
        {title}
      </Text>

      {/* Excerpt */}
      <Text size="M" weight="M" color="BLACK" style={{ flex: FLEX.ONE }}>
        {excerpt}
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

      {/* Read button */}
      <Button variant="WHITE" onClick={onRead} style={{ width: WIDTH.FULL }}>
        Lire
      </Button>
    </Card>
  )
}

