'use client'

import { useState, useEffect } from 'react'
import { HelpCircle, Check } from 'lucide-react'
import { Button } from './Button'
import { Popup } from './Popup'
import { Textarea } from './Textarea'
import { Form } from './Form'
import { FormGroup } from './FormGroup'
import { Text } from './Text'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { ICON_SIZE } from '../constants/iconSize'
import { Z_INDEX } from '../constants/zIndex'
import { WIDTH } from '../constants/width'
import { TIME } from '../constants/time'
import { TRANSITION } from '../constants/transition'
import { POSITION_TYPE } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT, FLEX } from '../constants/flex'
import { CURSOR } from '../constants/interaction'
import { BORDER_WIDTH, BORDER_RADIUS } from '../constants/border'
import { OUTLINE } from '../constants/outline'
import { MULTIPLIER } from '../constants/multiplier'
import { Mail, Phone } from 'lucide-react'

interface HelpButtonProps {
  bottomOffset?: string
}

export const HelpButton = ({ bottomOffset = SPACING.L }: HelpButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [bugDescription, setBugDescription] = useState('')
  const [selectedBugTypes, setSelectedBugTypes] = useState<string[]>([])
  const [isSuccess, setIsSuccess] = useState(false)

  const bugTypes = [
    { value: 'interface', label: 'Interface' },
    { value: 'performance', label: 'Performance' },
    { value: 'crash', label: 'Crash' },
    { value: 'latence', label: 'Latence' },
  ]

  const toggleBugType = (value: string) => {
    setSelectedBugTypes(prev =>
      prev.includes(value)
        ? prev.filter(type => type !== value)
        : [...prev, value]
    )
  }

  useEffect(() => {
      if (isSuccess) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        setIsSuccess(false)
        setBugDescription('')
        setSelectedBugTypes([])
      }, TIME.INTERVAL.SUCCESS_MESSAGE)

      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add bug report submission logic here
    console.log('Bug report:', { bugDescription, bugTypes: selectedBugTypes })
    setIsSuccess(true)
  }

  return (
    <>
      <div
        style={{
          position: POSITION_TYPE.FIXED,
          bottom: bottomOffset,
          right: SPACING.L,
          zIndex: Z_INDEX.NAVBAR,
        }}
      >
        <Button
          variant="WHITE"
          onClick={() => setIsOpen(true)}
          style={{
            width: WIDTH.AUTO,
            paddingLeft: SPACING.L,
            paddingRight: SPACING.L,
          }}
          icon={<HelpCircle size={ICON_SIZE.M} />}
        >
          Aide
        </Button>
      </div>

      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Besoin d'aide ?"
        icon={HelpCircle}
      >
        <div
          style={{
            display: DISPLAY.FLEX,
            flexDirection: FLEX_DIRECTION.COLUMN,
            gap: SPACING.L,
          }}
        >
          <div
            style={{
              display: DISPLAY.FLEX,
              flexDirection: FLEX_DIRECTION.COLUMN,
              gap: SPACING.M,
            }}
          >
            <Text size="M" weight="XL" color="BLACK" as="div">
              Contactez-nous
            </Text>
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
              }}
            >
              <Mail size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
              <Text size="M" color="GREY_DARK" as="div">
                louis@dataxx.fr
              </Text>
            </div>
            <div
              style={{
                display: DISPLAY.FLEX,
                alignItems: ALIGN_ITEMS.CENTER,
                gap: SPACING.M,
              }}
            >
              <Phone size={ICON_SIZE.M} style={{ color: COLOR.GREY.DARK }} />
              <Text size="M" color="GREY_DARK" as="div">
                06 95 42 08 38
              </Text>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Text size="M" weight="XL" color="BLACK" as="div" style={{ marginBottom: SPACING.S }}>
                Signaler un bug
              </Text>
              <Textarea
                id="bugDescription"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                placeholder="Décrivez le problème rencontré..."
                required
                rows={4}
              />
              <Text size="M" weight="XL" color="BLACK" as="div" style={{ marginTop: SPACING.M, marginBottom: SPACING.S }}>
                Type de bug
              </Text>
              <div
                style={{
                  display: DISPLAY.FLEX,
                  flexWrap: 'wrap',
                  gap: SPACING.S,
                }}
              >
                {bugTypes.map((type) => {
                  const isSelected = selectedBugTypes.includes(type.value)
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => toggleBugType(type.value)}
                      style={{
                        paddingLeft: SPACING.M,
                        paddingRight: SPACING.M,
                        paddingTop: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
                        paddingBottom: `calc(${SPACING.S} * ${MULTIPLIER.BUTTON_WIDTH_SEVENTY})`,
                        backgroundColor: isSelected ? COLOR.BLACK : COLOR.WHITE,
                        border: `${BORDER_WIDTH.THIN} solid ${isSelected ? COLOR.BLACK : COLOR.GREY.MEDIUM}`,
                        borderRadius: BORDER_RADIUS.M,
                        cursor: CURSOR.POINTER,
                        transition: `background-color ${TRANSITION.FAST_EASE}, border-color ${TRANSITION.FAST_EASE}, color ${TRANSITION.FAST_EASE}`,
                        outline: OUTLINE.NONE,
                      }}
                    >
                      <Text
                        size="M"
                        weight={isSelected ? 'L' : 'M'}
                        style={{
                          color: isSelected ? COLOR.WHITE : COLOR.BLACK,
                          transition: `color ${TRANSITION.FAST_EASE}`,
                        }}
                      >
                        {type.label}
                      </Text>
                    </button>
                  )
                })}
              </div>
            </FormGroup>

            <Button
              variant="BLACK"
              type="submit"
              disabled={isSuccess}
            >
              {isSuccess ? (
                <span
                  style={{
                    display: DISPLAY.FLEX,
                    alignItems: ALIGN_ITEMS.CENTER,
                    gap: SPACING.S,
                  }}
                >
                  <Check
                    size={ICON_SIZE.M}
                    style={{
                      animation: `checkmarkAnimation ${TRANSITION.NORMAL_EASE_OUT}`,
                    }}
                  />
                  Signalement envoyé. Merci !
                </span>
              ) : (
                'Envoyer le rapport'
              )}
            </Button>
          </Form>
        </div>
      </Popup>
    </>
  )
}

