import React, { useState, useEffect } from 'react';
import { LoadingCounter } from './components';
import { useMobile } from './contexts/MobileContext';
import { Navigate } from 'react-router-dom';
import { LAYOUT } from './constants/layout';
import { WIDTH } from './constants/width';
import { POSITION_TYPE } from './constants/position';
import { OVERFLOW } from './constants/overflow';
import { Z_INDEX } from './constants/zIndex';
import { DISPLAY } from './constants/display';
import { ALIGN_ITEMS } from './constants/flex';
import { JUSTIFY_CONTENT } from './constants/flex';
import { POSITION } from './constants/position';
import { TRANSFORM } from './constants/position';
import { DIMENSION } from './constants/dimension';
import { SPACING } from './constants/spacing';
import { TEXT_ALIGN } from './constants/text';
import { TIME } from './constants/time';
import { TRANSITION_DURATION, TRANSITION_EASING } from './constants/transition';

const SplashScreen: React.FC = () => {
  const { isMobile } = useMobile();
  if (isMobile) {
    return <Navigate to="/mobile-restriction" replace />;
  }
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Animation timeline - Logo Dataxx uniquement
    const timers = [
      // Step 1: Dataxx logo grows at center (start immediately)
      setTimeout(() => setAnimationStep(1), TIME.DELAY.SHORT),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div 
      style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        width: WIDTH.FULL,
        position: POSITION_TYPE.RELATIVE,
        overflow: OVERFLOW.HIDDEN,
        backgroundImage: 'url(/background_picture.png)',
        backgroundSize: 'cover',
        backgroundPosition: POSITION.CENTER,
        backgroundRepeat: 'no-repeat',
        zIndex: Z_INDEX.POPUP
      }}
    >
      <div style={{
        minHeight: LAYOUT.MIN_SCREEN_HEIGHT,
        width: WIDTH.FULL,
        position: POSITION_TYPE.RELATIVE,
        display: DISPLAY.FLEX,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.CENTER
      }}>
        {/* Animation Container - Full Screen Positioned */}
        <div style={{
          position: POSITION_TYPE.ABSOLUTE,
          top: POSITION.ZERO,
          left: POSITION.ZERO,
          right: POSITION.ZERO,
          bottom: POSITION.ZERO,
          display: DISPLAY.FLEX,
          alignItems: ALIGN_ITEMS.CENTER,
          justifyContent: JUSTIFY_CONTENT.CENTER
        }}>
          
          {/* Dataxx Logo at Center */}
          <div 
            style={{
              position: POSITION_TYPE.ABSOLUTE,
              left: POSITION.CENTER,
              top: POSITION.CENTER,
              transform: TRANSFORM.CENTER_BOTH,
            }}
          >
            <div
              style={{
                transformOrigin: `${POSITION.CENTER} ${POSITION.CENTER}`,
                transition: `all ${TIME.ANIMATION_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                transform: animationStep === 0 ? TRANSFORM.SCALE_ZERO : TRANSFORM.SCALE_ONE
              }}
            >
              <img 
                src="/dataxx_logo.png" 
                alt="Dataxx Logo" 
                style={{
                  display: DISPLAY.BLOCK,
                  height: DIMENSION.SPLASH_LOGO_HEIGHT_VH,
                  width: WIDTH.AUTO
                }}
              />
            </div>
          </div>

        </div>
        
        {/* Loading Counter at Bottom Center */}
        <div style={{
          position: POSITION_TYPE.ABSOLUTE,
          bottom: SPACING.XXL,
          left: POSITION.ZERO,
          right: POSITION.ZERO,
          textAlign: TEXT_ALIGN.CENTER
        }}>
          <LoadingCounter
            duration={4.5}
            fontSize={`${SPACING.XXL}`}
            color="var(--color-gray-light)"
            position="bottom"
            showPercentage={true}
          />
        </div>


      </div>
    </div>
  );
};

export default SplashScreen;
