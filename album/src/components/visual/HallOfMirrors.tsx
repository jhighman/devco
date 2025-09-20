import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const HallOfMirrors: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show Hall of Mirrors based on visual effects state
    const shouldShow = state.visualEffects.hallOfMirrors.visible;
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.hallOfMirrors.visible]);

  if (!isVisible) return null;

  // Generate mirror panels
  const mirrors = Array.from({ length: 6 }).map((_, index) => {
    const isLeft = index % 2 === 0;
    const distortion = 0.5 + Math.random() * 0.5; // Random distortion effect
    
    return (
      <div 
        key={index}
        className={`
          absolute top-0 bottom-0 
          ${isLeft ? 'left-0' : 'right-0'} 
          w-1/4 
          transition-all duration-1000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          transform: `perspective(800px) rotateY(${isLeft ? '-' : ''}${10 + (index * 5)}deg)`,
          background: 'linear-gradient(135deg, rgba(120, 120, 180, 0.4) 0%, rgba(200, 200, 255, 0.6) 50%, rgba(120, 120, 180, 0.4) 100%)',
          boxShadow: `0 0 20px rgba(100, 100, 255, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2)`,
          borderLeft: isLeft ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
          borderRight: isLeft ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
          left: isLeft ? `${index * 8}%` : 'auto',
          right: !isLeft ? `${index * 8}%` : 'auto',
          animation: `warp${index + 1} ${3 + index * 0.5}s infinite alternate ease-in-out`
        }}
      >
        {/* Reflection content - different ages/selves */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: index === 0
              ? `url(/assets/images/pss/pss-ch01-hall-of-mirrors-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png)`
              : `url(/assets/images/pss/pss-ch01-hall-of-mirrors-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png)`,
            filter: `hue-rotate(${index * 30}deg) saturate(${distortion + 0.5}) contrast(${distortion + 0.8})`,
            animation: `chromatic-shift ${2 + index * 0.3}s infinite alternate ease-in-out`
          }}
        />
      </div>
    );
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="hall-of-mirrors"
    >
      {/* Corridor effect */}
      <div 
        className={`
          absolute inset-0 
          transition-all duration-1500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to bottom, #1A2A44 0%, #000000 50%, #1A2A44 100%)',
          perspective: '800px'
        }}
      />
      
      {/* Mirror panels */}
      {mirrors}
      
      {/* Woman in red silhouette */}
      <div 
        className={`
          absolute top-1/2 left-1/2 w-32 h-64
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90 transform -translate-y-1/2 -translate-x-1/2' : 'opacity-0 transform -translate-y-1/2 -translate-x-1/2 scale-0'}
        `}
        style={{
          background: 'linear-gradient(to bottom, rgba(200, 0, 0, 0.7), rgba(120, 0, 0, 0.9))',
          boxShadow: '0 0 30px rgba(255, 0, 0, 0.3)',
          clipPath: 'polygon(30% 0%, 70% 0%, 60% 10%, 60% 20%, 80% 30%, 70% 40%, 70% 60%, 50% 100%, 30% 60%, 30% 40%, 20% 30%, 40% 20%, 40% 10%)'
        }}
      >
        {/* Sun insignia on cuff */}
        <div 
          className="absolute w-8 h-8 rounded-full"
          style={{
            bottom: '40%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
            animation: 'pulse 2s infinite alternate'
          }}
        />
      </div>
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes warp1 {
            0% { transform: perspective(800px) rotateY(-10deg) skewX(2deg); }
            100% { transform: perspective(800px) rotateY(-15deg) skewX(-2deg); }
          }
          @keyframes warp2 {
            0% { transform: perspective(800px) rotateY(15deg) skewX(-1deg); }
            100% { transform: perspective(800px) rotateY(10deg) skewX(3deg); }
          }
          @keyframes warp3 {
            0% { transform: perspective(800px) rotateY(-20deg) skewX(-2deg); }
            100% { transform: perspective(800px) rotateY(-12deg) skewX(1deg); }
          }
          @keyframes warp4 {
            0% { transform: perspective(800px) rotateY(12deg) skewX(2deg); }
            100% { transform: perspective(800px) rotateY(20deg) skewX(-1deg); }
          }
          @keyframes warp5 {
            0% { transform: perspective(800px) rotateY(-15deg) skewX(0deg); }
            100% { transform: perspective(800px) rotateY(-25deg) skewX(3deg); }
          }
          @keyframes warp6 {
            0% { transform: perspective(800px) rotateY(25deg) skewX(-3deg); }
            100% { transform: perspective(800px) rotateY(15deg) skewX(0deg); }
          }
          @keyframes chromatic-shift {
            0% { filter: hue-rotate(0deg) saturate(1.5) contrast(1.3); }
            50% { filter: hue-rotate(15deg) saturate(1.8) contrast(1.5); }
            100% { filter: hue-rotate(30deg) saturate(1.6) contrast(1.4); }
          }
          @keyframes pulse {
            0% { opacity: 0.7; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
};

export default HallOfMirrors;