import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const ChurchOfLight: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show Church of Light based on visual effects state
    const shouldShow = state.visualEffects.churchOfLight.visible;
    
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
  }, [state.visualEffects.churchOfLight.visible]);

  if (!isVisible) return null;

  // Generate light columns
  const columns = Array.from({ length: 8 }).map((_, index) => {
    const position = 10 + (index * 12); // Distribute columns across the screen
    const height = 90 + Math.random() * 20; // Vary the height slightly
    const width = 3 + Math.random() * 2; // Vary the width slightly
    const brightness = 0.7 + Math.random() * 0.3; // Random brightness
    const hue = index % 2 === 0 ? '60deg' : '30deg'; // Alternate between gold and amber
    
    return (
      <div 
        key={index}
        className={`
          absolute bottom-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          left: `${position}%`,
          height: `${height}%`,
          width: `${width}%`,
          background: `linear-gradient(to top, 
            hsla(${hue}, 100%, 70%, ${brightness}), 
            hsla(${hue}, 100%, 50%, ${brightness * 0.7}), 
            hsla(${hue}, 100%, 70%, ${brightness * 0.3}), 
            hsla(${hue}, 100%, 50%, 0))`,
          boxShadow: `0 0 30px hsla(${hue}, 100%, 70%, ${brightness * 0.5})`,
          animation: `pulse-column ${2 + Math.random() * 2}s infinite alternate ease-in-out`
        }}
      />
    );
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="church-of-light"
    >
      {/* Temple room background */}
      <div 
        className={`
          absolute inset-0 
          transition-all duration-1500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to bottom, #2D0A31 0%, #1A0E25 100%)',
          backgroundImage: 'url(/assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        }}
      />
      
      {/* Light columns */}
      {columns}
      
      {/* Water-ripple floor */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-70' : 'opacity-0'}
        `}
        style={{
          height: '30%',
          background: 'linear-gradient(to bottom, rgba(30, 30, 80, 0.3), rgba(30, 30, 80, 0.7))',
          animation: 'ripple 8s infinite linear'
        }}
      />
      
      {/* Glowing circle sigil */}
      <div 
        className={`
          absolute left-1/2 bottom-[25%] w-64 h-64
          rounded-full
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-90 transform -translate-x-1/2 scale-100' : 'opacity-0 transform -translate-x-1/2 scale-0'}
        `}
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 0, 0.3) 50%, rgba(255, 0, 0, 0) 100%)',
          boxShadow: '0 0 50px rgba(255, 0, 0, 0.5)',
          animation: 'pulse-sigil 4s infinite alternate'
        }}
      />
      
      {/* Silhouetted dancers */}
      {Array.from({ length: 6 }).map((_, index) => {
        const position = 20 + (index * 12);
        const delay = index * 0.5;
        
        return (
          <div 
            key={index}
            className={`
              absolute bottom-[28%]
              transition-all duration-2000 ease-in-out
              ${isAnimating ? 'opacity-80' : 'opacity-0'}
            `}
            style={{
              left: `${position}%`,
              width: '40px',
              height: '120px',
              background: 'black',
              clipPath: 'polygon(30% 0%, 70% 0%, 60% 10%, 80% 30%, 70% 40%, 70% 60%, 50% 100%, 30% 60%, 30% 40%, 20% 30%, 40% 10%)',
              animation: `dancer-move ${3 + Math.random() * 2}s infinite alternate ease-in-out ${delay}s`
            }}
          >
            {/* Sun insignia on dancer */}
            <div 
              className="absolute w-6 h-6 rounded-full"
              style={{
                top: '20%',
                right: '-10%',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
                animation: 'pulse 2s infinite alternate'
              }}
            />
          </div>
        );
      })}
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse-column {
            0% { opacity: 0.7; height: 90%; }
            100% { opacity: 0.9; height: 100%; }
          }
          
          @keyframes ripple {
            0% { background-position: 0 0; }
            100% { background-position: 100px 0; }
          }
          
          @keyframes pulse-sigil {
            0% { opacity: 0.7; transform: translateX(-50%) scale(0.95); }
            100% { opacity: 0.9; transform: translateX(-50%) scale(1.05); }
          }
          
          @keyframes dancer-move {
            0% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-10px) rotate(0deg); }
            100% { transform: translateY(0) rotate(5deg); }
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

export default ChurchOfLight;