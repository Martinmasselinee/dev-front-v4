import React, { useState, useEffect } from 'react';
import { LoadingCounter } from '../components';
import { useMobile } from '../contexts/MobileContext';
import { Navigate } from 'react-router-dom';

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
      setTimeout(() => setAnimationStep(1), 100),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/background_picture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1000
      }}
    >
      <div style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Animation Container - Full Screen Positioned */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          {/* Dataxx Logo at Center */}
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                transformOrigin: 'center center',
                transition: 'all 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: animationStep === 0 ? 'scale(0)' : 'scale(1)'
              }}
            >
              <img 
                src="/dataxx_logo.png" 
                alt="Dataxx Logo" 
                style={{
                  display: 'block',
                  height: '15.6vh',
                  width: 'auto'
                }}
              />
            </div>
          </div>

        </div>
        
        {/* Loading Counter at Bottom Center */}
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: 0,
          right: 0,
          textAlign: 'center'
        }}>
          <LoadingCounter
            duration={4.5}
            fontSize="2rem"
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