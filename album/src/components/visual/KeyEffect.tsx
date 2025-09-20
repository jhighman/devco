import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const KeyEffect: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const keyVisible = state.visualEffects.key.visible;
    if (keyVisible) {
      setIsVisible(true);
      
      // Start glow effect after a short delay
      const timer = setTimeout(() => {
        setIsGlowing(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsGlowing(false);
    }
  }, [state.visualEffects.key.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className={`
          relative w-40 h-40
          transition-all duration-1000 ease-in-out
          ${isGlowing ? 'animate-pulse' : ''}
        `}
      >
        {/* CSS-based key */}
        <div
          className={`
            relative w-full h-full
            ${isGlowing ? 'drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]' : ''}
          `}
          style={{
            position: 'relative'
          }}
        >
          {/* Key handle */}
          <div
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-16 h-16 rounded-full border-4 border-amber-600"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f9d423 50%, #d4af37 100%)'
            }}
          />
          
          {/* Key shaft */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-8 h-24 rounded-b-lg"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f9d423 50%, #d4af37 100%)'
            }}
          />
          
          {/* Key teeth */}
          <div className="absolute top-[60%] left-[62%] w-12 h-12">
            <div className="absolute top-0 left-0 w-4 h-4 bg-amber-600"></div>
            <div className="absolute top-4 left-0 w-6 h-4 bg-amber-600"></div>
            <div className="absolute top-8 left-0 w-3 h-4 bg-amber-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyEffect;