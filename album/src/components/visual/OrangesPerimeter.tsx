import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const OrangesPerimeter: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [orangeGlow, setOrangeGlow] = useState(false);

  useEffect(() => {
    // Show Oranges at the Perimeter based on visual effects state
    if (state.visualEffects.orangesPerimeter.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Orange glow pulsing effect
      const glowInterval = setInterval(() => {
        setOrangeGlow(prev => !prev);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(glowInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.orangesPerimeter.visible]);

  if (!isVisible) return null;

  // Generate oranges along the perimeter
  const oranges = Array.from({ length: 12 }).map((_, index) => {
    const left = 5 + (index * 8);
    const isHalved = index % 3 === 0;
    const hasInsignia = index === 5; // One special orange with the insignia
    const size = 30 + Math.random() * 10;
    const rotation = Math.random() * 360;
    
    return (
      <div 
        key={index}
        className={`
          absolute
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          bottom: '5%',
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: isHalved 
            ? 'radial-gradient(circle, #ff9500 0%, #ff7800 60%, #ff5500 100%)' 
            : 'radial-gradient(circle, #ff9500 0%, #ff7800 100%)',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          transform: `rotate(${rotation}deg)`
        }}
      >
        {/* Orange texture */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)'
          }}
        />
        
        {/* Orange segments for halved oranges */}
        {isHalved && (
          <div className="absolute inset-0 rounded-full">
            {Array.from({ length: 8 }).map((_, segIndex) => {
              const segAngle = (segIndex * 45) * (Math.PI / 180);
              
              return (
                <div 
                  key={segIndex}
                  className="absolute top-1/2 left-1/2 rounded-full"
                  style={{
                    width: '1px',
                    height: '50%',
                    background: 'rgba(255, 255, 255, 0.3)',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotate(${segAngle}rad)`
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Sun insignia on special orange */}
        {hasInsignia && (
          <div 
            className={`
              absolute inset-0 rounded-full
              ${orangeGlow ? 'opacity-100' : 'opacity-70'}
              transition-opacity duration-1000
            `}
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.7) 0%, rgba(255, 215, 0, 0.3) 50%, rgba(255, 215, 0, 0) 100%)',
              animation: 'pulse 3s infinite alternate'
            }}
          >
            {/* Sun rays */}
            {Array.from({ length: 8 }).map((_, rayIndex) => {
              const rayAngle = (rayIndex * 45) * (Math.PI / 180);
              
              return (
                <div 
                  key={rayIndex}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '40%',
                    height: '2px',
                    background: 'rgba(255, 215, 0, 0.7)',
                    transformOrigin: 'left center',
                    transform: `translate(-50%, -50%) rotate(${rayAngle}rad)`,
                    boxShadow: orangeGlow ? '0 0 5px rgba(255, 215, 0, 0.7)' : 'none',
                    transition: 'box-shadow 1s ease-in-out'
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Night scene background */}
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
      
      {/* Chain-link fence */}
      <div 
        className={`
          absolute top-[20%] bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,10 L10,0 L20,10 L10,20 Z\' fill=\'none\' stroke=\'%23666666\' stroke-width=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '20px 20px',
          opacity: 0.7
        }}
      />
      
      {/* Fence posts */}
      {Array.from({ length: 5 }).map((_, index) => {
        const left = 20 + index * 15;
        
        return (
          <div 
            key={index}
            className={`
              absolute top-[20%] bottom-0
              transition-all duration-2000 ease-in-out
              ${isAnimating ? 'opacity-90' : 'opacity-0'}
            `}
            style={{
              left: `${left}%`,
              width: '10px',
              background: '#555'
            }}
          />
        );
      })}
      
      {/* Warm floodlight cone */}
      <div 
        className={`
          absolute top-[30%] left-[40%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-60' : 'opacity-0'}
        `}
        style={{
          width: '300px',
          height: '500px',
          background: 'radial-gradient(ellipse at top, rgba(255, 200, 100, 0.3) 0%, rgba(255, 200, 100, 0) 70%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 150% 100%, -50% 100%)',
          transform: 'rotate(20deg)'
        }}
      />
      
      {/* Curb */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '3%',
          background: '#555',
          borderTop: '2px solid #666'
        }}
      />
      
      {/* Oranges along the curb */}
      {oranges}
      
      {/* Mesh bag */}
      <div 
        className={`
          absolute bottom-[5%] right-[20%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          width: '100px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0 0 50% 50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)',
          backgroundSize: '10px 10px'
        }}
      >
        {/* Bag contents - orange glimpses */}
        <div 
          className="absolute bottom-[10%] left-[20%] w-[20px] h-[20px] rounded-full"
          style={{
            background: '#ff9500'
          }}
        />
        
        <div 
          className="absolute bottom-[20%] right-[30%] w-[25px] h-[25px] rounded-full"
          style={{
            background: '#ff9500'
          }}
        />
      </div>
      
      {/* Amber horizon */}
      <div 
        className={`
          absolute top-[60%] left-0 right-0
          transition-all duration-3000 ease-in-out
          ${isAnimating ? 'opacity-40' : 'opacity-0'}
        `}
        style={{
          height: '1px',
          background: '#ff9500',
          boxShadow: '0 0 20px #ff9500',
          opacity: orangeGlow ? 0.6 : 0.3,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.95); }
            100% { opacity: 0.8; transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
};

export default OrangesPerimeter;