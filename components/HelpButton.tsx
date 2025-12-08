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
import { Mail, Phone } from 'lucide-react'

export const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [bugDescription, setBugDescription] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        setIsSuccess(false)
        setBugDescription('')
      }, TIME.INTERVAL.SUCCESS_MESSAGE)

      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add bug report submission logic here
    console.log('Bug report:', bugDescription)
    setIsSuccess(true)
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: `calc(${SPACING.XL} + ${SPACING.L} + ${SPACING.XXL})`,
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
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.L,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING.M,
            }}
          >
            <Text size="M" weight="XL" color="BLACK" as="div">
              Contactez-nous
            </Text>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
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
                display: 'flex',
                alignItems: 'center',
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
            </FormGroup>

            <Button
              variant="BLACK"
              type="submit"
              disabled={isSuccess}
            >
              {isSuccess ? (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
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

