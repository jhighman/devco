import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const BridgesExodusChorus: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(0);

  useEffect(() => {
    // Show Bridges Exodus Chorus in chapter 9
    const shouldShow = state.currentChapterIndex === 8; // 0-indexed, so chapter 9 is index 8
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Gradually increase light intensity
      if (isAnimating) {
        const intensityInterval = setInterval(() => {
          setLightIntensity(prev => Math.min(prev + 0.05, 1));
        }, 500);
        
        return () => clearInterval(intensityInterval);
      }
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsAnimating(false);
      setLightIntensity(0);
    }
  }, [state.currentChapterIndex, isAnimating]);

  if (!isVisible) return null;

  // Generate pedestrians on the bridge
  const pedestrians = Array.from({ length: 30 }).map((_, index) => {
    const left = 5 + Math.random() * 90;
    const bottom = 35 + Math.random() * 10;
    const height = 20 + Math.random() * 15;
    const width = height * 0.4;
    const hasInsignia = Math.random() > 0.7;
    const walking = Math.random() > 0.5;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const speed = 1 + Math.random() * 2;
    
    return (
      <div 
        key={index}
        className={`
          absolute
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          left: `${left}%`,
          bottom: `${bottom}%`,
          width: `${width}px`,
          height: `${height}px`,
          background: '#000',
          clipPath: 'polygon(30% 0%, 70% 0%, 60% 10%, 60% 20%, 80% 30%, 70% 40%, 70% 60%, 50% 100%, 30% 60%, 30% 40%, 20% 30%, 40% 20%, 40% 10%)',
          animation: walking ? `walk ${speed}s infinite alternate ease-in-out` : 'none',
          animationDirection: direction > 0 ? 'normal' : 'reverse'
        }}
      >
        {/* Sun insignia on some pedestrians */}
        {hasInsignia && (
          <div 
            className="absolute w-[30%] h-[10%] rounded-full"
            style={{
              top: '20%',
              right: '-10%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
              animation: 'pulse 2s infinite alternate',
              opacity: lightIntensity
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div 
      className="fixed inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Night sky background */}
      <div 
        className={`
          absolute inset-0 
          transition-all duration-1500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to bottom, #0a0a20 0%, #1a1a30 100%)'
        }}
      />
      
      {/* City skyline silhouette */}
      <div 
        className={`
          absolute bottom-[45%] left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '20%',
          background: '#000',
          clipPath: 'polygon(0% 100%, 5% 80%, 10% 90%, 15% 70%, 20% 100%, 25% 60%, 30% 80%, 35% 50%, 40% 70%, 45% 40%, 50% 90%, 55% 50%, 60% 70%, 65% 40%, 70% 60%, 75% 30%, 80% 50%, 85% 70%, 90% 40%, 95% 80%, 100% 60%, 100% 100%)'
        }}
      />
      
      {/* Bridge structure */}
      <div 
        className={`
          absolute bottom-[30%] left-[5%] right-[5%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '15%',
          background: '#222',
          borderTop: '5px solid #333',
          borderBottom: '5px solid #333'
        }}
      >
        {/* Bridge cables */}
        {Array.from({ length: 10 }).map((_, index) => {
          const left = 5 + index * 10;
          
          return (
            <div 
              key={index}
              className="absolute bottom-full"
              style={{
                left: `${left}%`,
                width: '2px',
                height: '100px',
                background: '#444',
                transformOrigin: 'bottom center',
                transform: index % 2 === 0 ? 'rotate(-5deg)' : 'rotate(5deg)'
              }}
            />
          );
        })}
        
        {/* Bridge deck markings */}
        <div 
          className="absolute inset-x-0 top-1/2 transform -translate-y-1/2"
          style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.3)'
          }}
        />
      </div>
      
      {/* Water beneath bridge */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          height: '30%',
          background: 'linear-gradient(to bottom, #0a1a30 0%, #0a0a20 100%)'
        }}
      >
        {/* Water reflections */}
        {Array.from({ length: 20 }).map((_, index) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const width = 2 + Math.random() * 5;
          const height = 1 + Math.random() * 2;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}px`,
                height: `${height}px`,
                background: 'rgba(255, 255, 255, 0.2)',
                animation: `water-shimmer ${2 + Math.random() * 3}s infinite alternate ease-in-out`
              }}
            />
          );
        })}
      </div>
      
      {/* Bridge lights */}
      {Array.from({ length: 8 }).map((_, index) => {
        const left = 10 + index * 12;
        
        return (
          <div 
            key={index}
            className={`
              absolute bottom-[45%]
              transition-all duration-2000 ease-in-out
              ${isAnimating ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              left: `${left}%`,
              width: '5px',
              height: '30px',
              background: '#333'
            }}
          >
            {/* Light */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#ffff99',
                boxShadow: `0 0 ${10 + lightIntensity * 20}px rgba(255, 255, 153, ${0.5 * lightIntensity})`,
                opacity: 0.5 + (lightIntensity * 0.5)
              }}
            />
            
            {/* Light cone */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              style={{
                width: '50px',
                height: '100px',
                background: 'radial-gradient(ellipse at top, rgba(255, 255, 153, 0.3) 0%, rgba(255, 255, 153, 0) 70%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 150% 100%, -50% 100%)',
                opacity: lightIntensity
              }}
            />
          </div>
        );
      })}
      
      {/* Pedestrians on the bridge */}
      {pedestrians}
      
      {/* Distant city lights */}
      <div 
        className={`
          absolute top-[10%] left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          height: '20%'
        }}
      >
        {Array.from({ length: 50 }).map((_, index) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const size = 1 + Math.random() * 3;
          const opacity = 0.3 + Math.random() * 0.7;
          const color = Math.random() > 0.7 ? '#ffff00' : Math.random() > 0.5 ? '#ffffff' : '#ff9900';
          
          return (
            <div 
              key={index}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
                opacity: opacity,
                animation: `twinkle ${2 + Math.random() * 3}s infinite alternate ease-in-out`
              }}
            />
          );
        })}
      </div>
      
      {/* Moon */}
      <div 
        className={`
          absolute top-[15%] right-[20%]
          transition-all duration-3000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 70%, rgba(255, 255, 255, 0) 100%)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
        }}
      />
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.3; }
            100% { opacity: 0.8; }
          }
          
          @keyframes water-shimmer {
            0% { opacity: 0.1; transform: scaleX(1); }
            100% { opacity: 0.3; transform: scaleX(2); }
          }
          
          @keyframes walk {
            0% { transform: translateX(-10px); }
            100% { transform: translateX(10px); }
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

export default BridgesExodusChorus;