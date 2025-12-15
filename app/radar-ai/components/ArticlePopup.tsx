'use client'

import { LucideIcon, ExternalLink } from 'lucide-react'
import { Popup } from '../../../components/Popup'
import { Text } from '../../../components/Text'
import { Heading } from '../../../components/Heading'
import { Link } from '../../../components/Link'
import { IconButton } from '../../../components/IconButton'
import { COLOR } from '../../../constants/color'
import { SPACING } from '../../../constants/spacing'
import { DISPLAY } from '../../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX, FLEX_WRAP } from '../../../constants/flex'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../constants/border'
import { ICON_SIZE } from '../../../constants/iconSize'
import { WIDTH } from '../../../constants/width'
import { DIMENSION } from '../../../constants/dimension'
import { LINE_HEIGHT, FONT_STYLE, FONT_SIZE } from '../../../constants/font'
import { WHITE_SPACE, LIST_STYLE } from '../../../constants/text'
import { TRANSITION } from '../../../constants/transition'
import { POSITION } from '../../../constants/position'
import { POPUP } from '../../../constants/popup'

export interface RelatedArticle {
  title: string
  url: string
}

export interface ContentBlock {
  type: 'paragraph' | 'subtitle' | 'citation' | 'bulletPoints' | 'boldParagraph'
  content: string | string[]
}

export interface ArticlePopupProps {
  isOpen: boolean
  onClose: () => void
  type: string
  typeLabel: string
  typeIcon: LucideIcon
  date: string
  title: string
  excerpt: string
  content: ContentBlock[]
  tags: string[]
  relatedArticles?: RelatedArticle[]
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
  relatedArticles = [],
}: ArticlePopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={Icon}
      maxHeight={POPUP.MAX_HEIGHT_LARGE}
    >
      <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN }}>
        {/* Type container - full width with white bg, positioned right after header */}
        <div
          style={{
            width: `calc(100% + ${SPACING.L} + ${SPACING.L})`,
            marginLeft: `-${SPACING.L}`,
            marginRight: `-${SPACING.L}`,
            marginTop: `-${SPACING.L}`,
            backgroundColor: COLOR.WHITE,
            paddingTop: SPACING.M,
            paddingBottom: SPACING.S,
            paddingLeft: SPACING.L,
            paddingRight: SPACING.M,
            borderBottom: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
          }}
        >
          <Text size="S" weight="M" color="GREY_DARK">
            {typeLabel}
          </Text>
          <IconButton
            icon={<ExternalLink size={ICON_SIZE.M} />}
            onClick={() => console.log('Redirect article')}
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

        <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.L, marginTop: SPACING.ZERO }}>
          {/* Image thumbnail - with padding like text content */}
          <div
            style={{
              width: WIDTH.FULL,
              aspectRatio: DIMENSION.ASPECT_RATIO_VIDEO,
              backgroundColor: COLOR.GREY.LIGHT,
              borderRadius: BORDER_RADIUS.M,
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.CENTER,
              marginTop: SPACING.L,
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

          {/* Structured content */}
          <div style={{ display: DISPLAY.FLEX, flexDirection: FLEX_DIRECTION.COLUMN, gap: SPACING.M }}>
            {content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <Text key={index} size="M" weight="M" color="BLACK" style={{ lineHeight: LINE_HEIGHT.TIGHT }}>
                    {typeof block.content === 'string' ? block.content : block.content.join(' ')}
                  </Text>
                )
              }

              if (block.type === 'boldParagraph') {
                return (
                  <Text key={index} size="M" weight="XL" color="BLACK" style={{ lineHeight: LINE_HEIGHT.TIGHT }}>
                    {typeof block.content === 'string' ? block.content : block.content.join(' ')}
                  </Text>
                )
              }

              if (block.type === 'subtitle') {
                return (
                  <Heading key={index} level={3} style={{ marginBottom: SPACING.ZERO, marginTop: SPACING.M }}>
                    {typeof block.content === 'string' ? block.content : block.content.join(' ')}
                  </Heading>
                )
              }

              if (block.type === 'citation') {
                return (
                  <div
                    key={index}
                    style={{
                      display: DISPLAY.FLEX,
                      paddingLeft: SPACING.L,
                      borderLeft: `${BORDER_WIDTH.MEDIUM} solid ${COLOR.PURPLE}`,
                    }}
                  >
                    <Text
                      size="M"
                      weight="M"
                      color="GREY_DARK"
                      style={{
                        fontStyle: FONT_STYLE.ITALIC,
                        lineHeight: LINE_HEIGHT.TIGHT,
                      }}
                    >
                      {typeof block.content === 'string' ? block.content : block.content.join(' ')}
                    </Text>
                  </div>
                )
              }

              if (block.type === 'bulletPoints') {
                const points = Array.isArray(block.content) ? block.content : [block.content]
                return (
                  <ul
                    key={index}
                    style={{
                      margin: SPACING.ZERO,
                      paddingLeft: SPACING.XL,
                      listStyle: LIST_STYLE.DISC,
                      display: DISPLAY.FLEX,
                      flexDirection: FLEX_DIRECTION.COLUMN,
                      gap: SPACING.ZERO,
                    }}
                  >
                    {points.map((point, pointIndex) => (
                      <li key={pointIndex}>
                        <Text size="M" weight="M" color="BLACK" style={{ lineHeight: LINE_HEIGHT.TIGHT }}>
                          {point}
                        </Text>
                      </li>
                    ))}
                  </ul>
                )
              }

              return null
            })}
          </div>

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

          {/* Related articles section */}
          {relatedArticles.length > 0 && (
            <div
              style={{
                display: DISPLAY.FLEX,
                flexDirection: FLEX_DIRECTION.COLUMN,
                gap: SPACING.S,
                paddingTop: SPACING.L,
                borderTop: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.LIGHT_MEDIUM}`,
              }}
            >
              <Heading level={3} style={{ marginBottom: SPACING.ZERO }}>
                À lire également
              </Heading>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexDirection: FLEX_DIRECTION.COLUMN,
                  gap: SPACING.XS,
                }}
              >
                {relatedArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: DISPLAY.FLEX,
                      alignItems: ALIGN_ITEMS.CENTER,
                      gap: SPACING.XS,
                    }}
                  >
                    <ExternalLink size={ICON_SIZE.S} />
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Popup>
  )
}

