'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TIME } from '../constants/time'
import { SPACING } from '../constants/spacing'
import { COLOR } from '../constants/color'
import { POSITION } from '../constants/position'
import { POSITION_TYPE } from '../constants/position'
import { TRANSFORM } from '../constants/position'
import { DISPLAY } from '../constants/display'
import { FLEX_DIRECTION } from '../constants/flex'
import { ALIGN_ITEMS } from '../constants/flex'
import { JUSTIFY_CONTENT } from '../constants/flex'
import { WIDTH } from '../constants/width'
import { Z_INDEX } from '../constants/zIndex'
import { OVERFLOW } from '../constants/overflow'
import { DIMENSION } from '../constants/dimension'
import { FONT_SIZE } from '../constants/font'
import { FONT_THICKNESS } from '../constants/font'
import { TEXT_ALIGN } from '../constants/text'
import { TRANSITION_DURATION, TRANSITION_EASING } from '../constants/transition'
import { MULTIPLIER } from '../constants/multiplier'
import { LAYOUT } from '../constants/layout'

export const SplashScreen = () => {
  const router = useRouter()
  const [animationStep, setAnimationStep] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const duration = TIME.SPLASH_SCREEN
    const timers = [
      setTimeout(() => setAnimationStep(1), TIME.DELAY.SHORT),
    ]

    // Percentage counter animation - very granular using requestAnimationFrame
    let animationFrameId: number
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, MULTIPLIER.PROGRESS_CAP)
      const newPercentage = Math.floor(progress * MULTIPLIER.PERCENTAGE_BASE)
      setPercentage(newPercentage)

      if (progress >= MULTIPLIER.PROGRESS_CAP || newPercentage >= MULTIPLIER.PERCENTAGE_MAX) {
        setPercentage(MULTIPLIER.PERCENTAGE_MAX)
        // Redirect to sign-in after animation completes
        setTimeout(() => {
          router.push('/auth-sign-in')
        }, TIME.DELAY.SHORT)
      } else {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [router])

  return (
    <div
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        width: WIDTH.FULL,
        position: POSITION_TYPE.RELATIVE,
        overflow: OVERFLOW.HIDDEN,
        backgroundImage: "url('/background_picture.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: Z_INDEX.POPUP,
      }}
    >
      <div
        style={{
          minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
          width: WIDTH.FULL,
          position: POSITION_TYPE.RELATIVE,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER,
        }}
      >
        {/* Animation Container - Full Screen Positioned */}
        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            top: POSITION.ZERO,
            left: POSITION.ZERO,
            right: POSITION.ZERO,
            bottom: POSITION.ZERO,
            display: DISPLAY.FLEX,
            alignItems: ALIGN_ITEMS.CENTER,
            justifyContent: JUSTIFY_CONTENT.CENTER,
          }}
        >
          {/* Dataxx Logo at Center */}
          <div
            style={{
              position: POSITION_TYPE.ABSOLUTE,
              left: POSITION.CENTER,
              top: POSITION.CENTER,
              transform: `${TRANSFORM.CENTER_HORIZONTAL} ${TRANSFORM.CENTER_VERTICAL}`,
            }}
          >
            <div
              style={{
                transformOrigin: `${POSITION.CENTER} ${POSITION.CENTER}`,
                transition: `transform ${TRANSITION_DURATION.VERY_SLOW} ${TRANSITION_EASING.EASE_IN_OUT}`,
                transform: animationStep === 0 ? TRANSFORM.SCALE_ZERO : TRANSFORM.SCALE_ONE,
              }}
            >
              <img
                src="/dataxx_logo.png"
                alt="Dataxx Logo"
                style={{
                  display: DISPLAY.BLOCK,
                  width: DIMENSION.SPLASH_LOGO_SIZE,
                  height: DIMENSION.SPLASH_LOGO_SIZE,
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Counter at Bottom Center */}
        <div
          style={{
            position: POSITION_TYPE.ABSOLUTE,
            bottom: SPACING.XXL,
            left: POSITION.ZERO,
            right: POSITION.ZERO,
            textAlign: TEXT_ALIGN.CENTER,
            zIndex: Z_INDEX.COMPONENT_CONTENT,
          }}
        >
          <div
            style={{
              fontSize: FONT_SIZE.XXXL,
              fontWeight: FONT_THICKNESS.XXXL,
              color: COLOR.GREY.MEDIUM,
            }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  )
}

