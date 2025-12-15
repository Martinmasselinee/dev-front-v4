'use client'

import { useState } from 'react'
import { DollarSign, MapPin, ExternalLink, Tag, Plus, Brain, Leaf, Globe, X, UserPlus, Mail, CheckCircle, Calendar, FileCheck, Archive, ChevronDown } from 'lucide-react'
import { Card } from '../../../components/Card'
import { Text } from '../../../components/Text'
import { Button } from '../../../components/Button'
import { Link } from '../../../components/Link'
import { COLOR } from '../../../constants/color'
import { SPACING } from '../../../constants/spacing'
import { DISPLAY } from '../../../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../../../constants/flex'
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../constants/border'
import { ICON_SIZE } from '../../../constants/iconSize'
import { WIDTH } from '../../../constants/width'
import { POSITION_TYPE, POSITION, TRANSFORM } from '../../../constants/position'
import { TEXT_TRANSFORM, TEXT_ALIGN, TEXT_DECORATION } from '../../../constants/text'
import { OVERFLOW } from '../../../constants/overflow'
import { Z_INDEX } from '../../../constants/zIndex'
import { MULTIPLIER } from '../../../constants/multiplier'
import { OPACITY } from '../../../constants/opacity'
import { BUTTON_HEIGHT } from '../../../constants/button'
import { hexToRgba, lightenColor } from '../../../lib/colorUtils'
import { IconButton } from '../../../components/IconButton'

export interface CompanyCardProps {
  logo?: string
  companyName: string
  description: string
  revenue: string
  location: string
  website?: string
  sector: string
  onAdd?: () => void
  onAnalyze?: () => void
}

export const CompanyCard = ({
  logo,
  companyName,
  description,
  revenue,
  location,
  website,
  sector,
  onAdd,
  onAnalyze,
}: CompanyCardProps) => {
  const [isStatusMode, setIsStatusMode] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const statusOptions = [
    { value: 'prospects', label: 'Prospects', icon: UserPlus },
    { value: 'a_contacter', label: 'À contacter', icon: Mail },
    { value: 'contacte', label: 'Contacté', icon: CheckCircle },
    { value: 'meetings', label: 'Meetings', icon: Calendar },
    { value: 'contrats', label: 'Contrats', icon: FileCheck },
    { value: 'archive', label: 'Archivé', icon: Archive },
  ]

  const handleAddClick = () => {
    setSelectedStatus('prospects')
  }

  const handleStatusButtonClick = () => {
    setIsStatusMode(true)
  }

  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value)
    setIsStatusMode(false)
    onAdd?.()
  }

  const handleCloseStatusMode = () => {
    setIsStatusMode(false)
  }

  return (
    <Card
      variant="default"
      style={{
        display: DISPLAY.FLEX,
        flexDirection: FLEX_DIRECTION.COLUMN,
        height: WIDTH.FULL,
        padding: SPACING.ZERO,
        overflow: OVERFLOW.HIDDEN,
      }}
    >
      {isStatusMode ? (
        <>
          {/* Status mode header with X button */}
          <div
            style={{
              paddingTop: SPACING.L,
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
              paddingBottom: SPACING.L,
              position: POSITION_TYPE.RELATIVE,
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
            }}
          >
            <Text size="L" weight="XL" color="BLACK">
              Sélectionner un statut
            </Text>
            <IconButton
              onClick={handleCloseStatusMode}
              icon={<X size={ICON_SIZE.M} />}
            />
          </div>

          {/* Status options */}
          <div
            style={{
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
              paddingBottom: SPACING.L,
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              alignItems: ALIGN_ITEMS.CENTER,
              gap: SPACING.S,
              flex: FLEX.ONE,
            }}
          >
            {statusOptions.map((option) => {
              const IconComponent = option.icon
              const isSelected = option.value === selectedStatus
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? "BLACK" : "WHITE"}
                  onClick={() => handleStatusSelect(option.value)}
                  icon={<IconComponent size={ICON_SIZE.M} />}
                  style={{ width: WIDTH.FULL, height: BUTTON_HEIGHT.MAIN }}
                >
                  {option.label}
                </Button>
              )
            })}
          </div>
        </>
      ) : (
        <>
          {/* Header with grey background */}
          <div
            style={{
              backgroundColor: COLOR.GREY.LIGHT,
              paddingTop: SPACING.L,
              paddingLeft: SPACING.L,
              paddingRight: SPACING.L,
              paddingBottom: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.BUTTON_WIDTH_HALF} + ${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
              position: POSITION_TYPE.RELATIVE,
            }}
          >
        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            top: POSITION.CENTER,
            left: POSITION.CENTER,
            transform: TRANSFORM.CENTER_BOTH,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
          }}
        >
          <Leaf size={ICON_SIZE.XL} style={{ color: COLOR.GREY.MEDIUM, width: `calc(${ICON_SIZE.XL}px + ${SPACING.S})`, height: `calc(${ICON_SIZE.XL}px + ${SPACING.S})` }} />
        </div>
        {/* Logo overlapping header and content */}
        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            bottom: POSITION.ZERO,
            left: SPACING.L,
            width: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
            height: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE})`,
            borderRadius: BORDER_RADIUS.CIRCLE,
            backgroundColor: COLOR.WHITE,
            border: `${BORDER_WIDTH.THIN} solid ${COLOR.GREY.MEDIUM}`,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            zIndex: Z_INDEX.COMPONENT_OVERLAY,
            transform: `translateY(calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.BUTTON_WIDTH_HALF}))`,
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt={companyName}
              style={{
                width: WIDTH.FULL,
                height: WIDTH.FULL,
                borderRadius: BORDER_RADIUS.CIRCLE,
                objectFit: 'cover',
              }}
            />
          ) : (
            <Globe size={ICON_SIZE.XL} style={{ color: COLOR.GREY.MEDIUM }} />
          )}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          paddingLeft: SPACING.L,
          paddingRight: SPACING.L,
          paddingTop: `calc(${SPACING.XXXL} * ${MULTIPLIER.ICON_SIZE_DOUBLE} * ${MULTIPLIER.BUTTON_WIDTH_HALF})`,
          paddingBottom: SPACING.M,
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          gap: SPACING.M,
          flex: FLEX.ONE,
          minHeight: SPACING.ZERO,
        }}
      >
        {/* Company name */}
        <Text
          size="L"
          weight="XL"
          color="BLACK"
          style={{
            textTransform: TEXT_TRANSFORM.UPPERCASE,
            marginTop: SPACING.L,
          }}
        >
          {companyName}
        </Text>

        {/* Description */}
        <Text size="M" weight="M" style={{ color: COLOR.GREY.DARK, marginBottom: SPACING.L }}>
          {description}
        </Text>

        {/* Information list */}
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.S,
          }}
        >
          {/* Revenue */}
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
              gap: SPACING.S,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <DollarSign size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="M" weight="M" color="BLACK">
                Chiffre d'affaires
              </Text>
            </div>
            <Text size="M" weight="M" color="BLACK">
              {revenue}
            </Text>
          </div>

          {/* Location */}
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
              gap: SPACING.S,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <MapPin size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="M" weight="M" color="BLACK">
                Localisation
              </Text>
            </div>
            <Text size="M" weight="M" color="BLACK">
              {location}
            </Text>
          </div>

          {/* Website */}
          {website && (
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                gap: SPACING.S,
              }}
            >
              <div
                style={{
                  display: DISPLAY.FLEX,
                  alignItems: ALIGN_ITEMS.CENTER,
                  gap: SPACING.S,
                }}
              >
                <ExternalLink size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
                <Text size="M" weight="M" color="BLACK">
                  Site web
                </Text>
              </div>
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: COLOR.GOOGLE.BLUE, textDecoration: TEXT_DECORATION.UNDERLINE }}
              >
                {website}
              </Link>
            </div>
          )}

          {/* Sector */}
          <div
            style={{
              display: DISPLAY.FLEX,
              alignItems: ALIGN_ITEMS.CENTER,
              justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
              gap: SPACING.S,
            }}
          >
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.S,
              }}
            >
              <Tag size={ICON_SIZE.M} style={{ color: COLOR.BLACK, flexShrink: FLEX.ZERO }} />
              <Text size="M" weight="M" color="BLACK">
                Secteur
              </Text>
            </div>
            <div
              style={{
                display: DISPLAY.INLINE_FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                paddingLeft: SPACING.S,
                paddingRight: SPACING.S,
                paddingTop: SPACING.XS,
                paddingBottom: SPACING.XS,
                backgroundColor: lightenColor(COLOR.GOOGLE.GREEN, MULTIPLIER.COLOR_LIGHTEN_NINETY_FIVE),
                borderRadius: BORDER_RADIUS.M,
              }}
            >
              <Text size="S" weight="M" style={{ color: COLOR.GOOGLE.GREEN }}>
                {sector}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div
        style={{
          paddingLeft: SPACING.L,
          paddingRight: SPACING.L,
          paddingTop: SPACING.L,
          paddingBottom: SPACING.L,
          display: DISPLAY.FLEX,
          flexDirection: FLEX_DIRECTION.COLUMN,
          gap: SPACING.S,
        }}
      >
        {!selectedStatus ? (
          <Button
            variant="PURPLE"
            onClick={handleAddClick}
            icon={<Plus size={ICON_SIZE.M} />}
            style={{ width: WIDTH.FULL, height: BUTTON_HEIGHT.SMALL }}
          >
            Ajouter
          </Button>
        ) : (
          (() => {
            const currentStatus = statusOptions.find(opt => opt.value === selectedStatus)
            const StatusIcon = currentStatus?.icon || UserPlus
            return (
              <Button
                variant="STATUS"
                onClick={handleStatusButtonClick}
                icon={<StatusIcon size={ICON_SIZE.M} />}
                style={{ width: WIDTH.FULL, height: BUTTON_HEIGHT.SMALL, position: POSITION_TYPE.RELATIVE }}
              >
                <div
                  style={{
                    display: DISPLAY.FLEX,
                    alignItems: ALIGN_ITEMS.CENTER,
                    justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                    width: WIDTH.FULL,
                  }}
                >
                  <span>{currentStatus?.label || 'Prospect'}</span>
                  <ChevronDown size={ICON_SIZE.M} />
                </div>
              </Button>
            )
          })()
        )}
        <Button
          variant="BLACK"
          onClick={onAnalyze}
          icon={<Brain size={ICON_SIZE.M} />}
          style={{ width: WIDTH.FULL, height: BUTTON_HEIGHT.SMALL }}
        >
          Analyse du sponsor
        </Button>
      </div>
        </>
      )}
    </Card>
  )
}

