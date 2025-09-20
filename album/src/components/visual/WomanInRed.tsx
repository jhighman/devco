import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const WomanInRed: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const womanVisible = state.visualEffects.womanInRed.visible;
    if (womanVisible) {
      setIsVisible(true);
      
      // Start animation after a short delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.womanInRed.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
      data-testid="woman-in-red"
    >
      <div 
        className={`
          relative w-full h-full max-w-md max-h-[80vh] 
          transition-all duration-1000 ease-in-out
          ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <img
          src="/assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-4k-rgb-v001-20250831-jh-final.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default WomanInRed;