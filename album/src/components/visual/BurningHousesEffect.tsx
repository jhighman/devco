import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const BurningHousesEffect: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    // Show burning houses based on visual effects state
    const shouldShow = state.visualEffects.burning.visible;
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Gradually increase the intensity of the burning effect
      let currentIntensity = 0;
      const intensityInterval = setInterval(() => {
        currentIntensity += 0.05;
        setIntensity(Math.min(currentIntensity, 1));
        
        if (currentIntensity >= 1) {
          clearInterval(intensityInterval);
        }
      }, 200);
      
      return () => clearInterval(intensityInterval);
    } else {
      setIsVisible(false);
      setIntensity(0);
    }
  }, [state.visualEffects.burning.visible]);

  if (!isVisible) return null;

  // Generate random flickering houses
  const houses = Array.from({ length: 15 }).map((_, index) => {
    const width = 20 + Math.random() * 40; // Random width between 20-60px
    const height = 30 + Math.random() * 30; // Random height between 30-60px
    const left = 5 + (index * 6) + Math.random() * 3; // Distribute across the horizon
    const flicker = 0.7 + Math.random() * 0.3; // Random flicker intensity
    
    return (
      <div 
        key={index}
        className="absolute bottom-0"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}%`,
          opacity: intensity * flicker,
          background: 'linear-gradient(to top, #ff4500, #ff8700, #ffcc00)',
          clipPath: 'polygon(0% 100%, 0% 60%, 20% 40%, 30% 60%, 40% 30%, 50% 50%, 60% 20%, 70% 40%, 80% 30%, 100% 60%, 100% 100%)',
          animation: `flicker${Math.floor(Math.random() * 3) + 1} ${1 + Math.random()}s infinite alternate`
        }}
      >
        {/* Smoke effect */}
        <div 
          className="absolute w-full"
          style={{
            bottom: '100%',
            height: `${height * 2}px`,
            background: 'linear-gradient(to top, rgba(80, 80, 80, 0.8), rgba(80, 80, 80, 0))',
            opacity: intensity * 0.7
          }}
        />
      </div>
    );
  });

  return (
    <div
      className="absolute inset-x-0 bottom-0 pointer-events-none"
      aria-hidden="true"
      style={{ height: '100%' }}
    >
      {/* Orange sky gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, #ff5722, #ff9800, #1a2a44)',
          opacity: intensity * 0.8
        }}
      />
      
      {/* Horizon silhouette */}
      <div 
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '15%',
          background: '#000',
          opacity: 0.7
        }}
      />
      
      {/* Burning houses */}
      {houses}
      
      {/* Add some CSS animations for the flickering effect */}
      <style>
        {`
          @keyframes flicker1 {
            0%, 100% { opacity: ${intensity}; }
            50% { opacity: ${intensity * 0.7}; }
          }
          @keyframes flicker2 {
            0%, 100% { opacity: ${intensity * 0.8}; }
            50% { opacity: ${intensity}; }
          }
          @keyframes flicker3 {
            0%, 100% { opacity: ${intensity * 0.9}; }
            25%, 75% { opacity: ${intensity * 0.7}; }
          }
        `}
      </style>
    </div>
  );
};

export default BurningHousesEffect;