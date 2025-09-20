import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const TwelveDoorsEffect: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    // Check if we should show the twelve doors diagram based on visual effects state
    if (state.visualEffects.twelveDoorsEffect.visible) {
      setIsVisible(true);
      
      // Start animation sequence
      const timer = setTimeout(() => {
        setIsAnimating(true);
        
        // Animate through the 12 doors
        let doorIndex = 0;
        const doorInterval = setInterval(() => {
          setActiveIndex(doorIndex);
          doorIndex = (doorIndex + 1) % 12;
          
          if (doorIndex === 0) {
            // Complete one full cycle
            clearInterval(doorInterval);
          }
        }, 500);
        
        return () => clearInterval(doorInterval);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsAnimating(false);
      setActiveIndex(-1);
    }
  }, [state.visualEffects.twelveDoorsEffect.visible]);

  if (!isVisible) return null;

  // Generate the 12 door markers
  const doors = Array.from({ length: 12 }).map((_, index) => {
    const angle = (index * 30) * (Math.PI / 180);
    const isActive = activeIndex === index;
    
    return (
      <div 
        key={index}
        className={`
          absolute w-4 h-4 rounded-full 
          transition-all duration-300 ease-in-out
          ${isActive ? 'bg-yellow-400 scale-150' : 'bg-gray-400 scale-100'}
        `}
        style={{
          left: `calc(50% + ${Math.cos(angle) * 120}px)`,
          top: `calc(50% + ${Math.sin(angle) * 120}px)`,
          transform: `translate(-50%, -50%) ${isActive ? 'scale(1.5)' : 'scale(1)'}`,
          boxShadow: isActive ? '0 0 15px rgba(255, 215, 0, 0.7)' : 'none'
        }}
      />
    );
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div 
        className={`
          relative w-80 h-80 
          transition-all duration-1000 ease-in-out
          ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        `}
      >
        {/* Circle container */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
        
        {/* The 12 doors */}
        {doors}
        
        {/* Center insignia */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default TwelveDoorsEffect;