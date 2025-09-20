import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const SunEffect: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isRising, setIsRising] = useState(false);

  useEffect(() => {
    const sunVisible = state.visualEffects.sun.visible;
    if (sunVisible) {
      setIsVisible(true);
      
      // Start rising animation after a short delay
      const timer = setTimeout(() => {
        setIsRising(true);
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsRising(false);
    }
  }, [state.visualEffects.sun.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div 
        className={`
          absolute
          transition-all duration-3000 ease-out
          ${isRising ? 'bottom-1/3' : '-bottom-1/4'}
          w-64 h-64 md:w-96 md:h-96 rounded-full
          bg-gradient-radial from-yellow-200 via-yellow-400 to-orange-500
          shadow-[0_0_100px_50px_rgba(255,165,0,0.7)]
        `}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-white via-transparent to-transparent opacity-70"></div>
        
        {/* Light rays */}
        <div className={`
          absolute inset-0 rounded-full
          ${isRising ? 'animate-pulse' : ''}
        `}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-48 md:h-64 bg-yellow-300 opacity-40"
              style={{ 
                transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
                transformOrigin: 'top center'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SunEffect;