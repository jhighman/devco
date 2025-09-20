import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const CornerChalkSun: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [chalkGlow, setChalkGlow] = useState(false);

  useEffect(() => {
    // Show The Corner scene based on visual effects state
    if (state.visualEffects.cornerChalkSun.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Chalk glow pulsing effect
      const glowInterval = setInterval(() => {
        setChalkGlow(prev => !prev);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(glowInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.cornerChalkSun.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* City corner background - night urban scene */}
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
      
      {/* Street corner - sidewalk */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '30%',
          background: '#333',
          backgroundImage: 'linear-gradient(to right, #333 0%, #333 98%, #222 98%, #222 100%)',
          borderTop: '5px solid #444'
        }}
      >
        {/* Sidewalk cracks */}
        {Array.from({ length: 8 }).map((_, index) => {
          const left = 10 + Math.random() * 80;
          const width = 1 + Math.random() * 2;
          const length = 10 + Math.random() * 40;
          const angle = -10 + Math.random() * 20;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                bottom: '0',
                left: `${left}%`,
                width: `${width}px`,
                height: `${length}%`,
                background: '#222',
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'bottom center'
              }}
            />
          );
        })}
      </div>
      
      {/* Building wall */}
      <div 
        className={`
          absolute bottom-[30%] left-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '60%',
          height: '70%',
          background: '#222',
          backgroundImage: 'linear-gradient(to right, #222 0%, #222 98%, #111 98%, #111 100%)'
        }}
      >
        {/* Wall texture */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23333333\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        
        {/* Graffiti */}
        <div 
          className="absolute top-[40%] left-[30%]"
          style={{
            color: '#cc0000',
            fontSize: '24px',
            fontFamily: 'cursive',
            transform: 'rotate(-5deg)'
          }}
        >
          EXODUS
        </div>
      </div>
      
      {/* Chalk sun circle on sidewalk */}
      <div 
        className={`
          absolute bottom-[5%] left-[40%]
          transition-all duration-3000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: chalkGlow ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none',
          transition: 'box-shadow 1s ease-in-out'
        }}
      >
        {/* Chalk texture */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 100%)',
            opacity: chalkGlow ? 0.8 : 0.5,
            transition: 'opacity 1s ease-in-out'
          }}
        />
        
        {/* Chalk sun rays */}
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index * 30) * (Math.PI / 180);
          const length = 40 + Math.random() * 20;
          
          return (
            <div 
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                width: `${length}px`,
                height: '3px',
                background: 'rgba(255, 255, 255, 0.2)',
                transformOrigin: 'left center',
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                opacity: chalkGlow ? 0.8 : 0.5,
                transition: 'opacity 1s ease-in-out'
              }}
            />
          );
        })}
      </div>
      
      {/* Wooden crate */}
      <div 
        className={`
          absolute bottom-[5%] left-[20%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '100px',
          height: '100px',
          background: '#8B4513',
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Crate slats */}
        <div 
          className="absolute inset-x-0 top-0"
          style={{
            height: '20%',
            background: '#A0522D',
            borderBottom: '2px solid #6B3E26'
          }}
        />
        
        <div 
          className="absolute inset-x-0 top-[40%]"
          style={{
            height: '20%',
            background: '#A0522D',
            borderTop: '2px solid #6B3E26',
            borderBottom: '2px solid #6B3E26'
          }}
        />
        
        <div 
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '20%',
            background: '#A0522D',
            borderTop: '2px solid #6B3E26'
          }}
        />
        
        <div 
          className="absolute inset-y-0 left-0"
          style={{
            width: '20%',
            background: '#A0522D',
            borderRight: '2px solid #6B3E26'
          }}
        />
        
        <div 
          className="absolute inset-y-0 left-[40%]"
          style={{
            width: '20%',
            background: '#A0522D',
            borderLeft: '2px solid #6B3E26',
            borderRight: '2px solid #6B3E26'
          }}
        />
        
        <div 
          className="absolute inset-y-0 right-0"
          style={{
            width: '20%',
            background: '#A0522D',
            borderLeft: '2px solid #6B3E26'
          }}
        />
        
        {/* Sun insignia burned into crate */}
        <div 
          className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%)',
            opacity: chalkGlow ? 0.9 : 0.6,
            transition: 'opacity 1s ease-in-out'
          }}
        />
      </div>
      
      {/* Street lamp light */}
      <div 
        className={`
          absolute top-0 right-[20%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-70' : 'opacity-0'}
        `}
        style={{
          width: '5px',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255, 255, 200, 0) 0%, rgba(255, 255, 200, 0.1) 70%, rgba(255, 255, 200, 0.2) 100%)'
        }}
      >
        {/* Light cone */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '300px',
            height: '500px',
            background: 'radial-gradient(ellipse at top, rgba(255, 255, 200, 0.2) 0%, rgba(255, 255, 200, 0) 70%)',
            clipPath: 'polygon(0% 0%, 100% 0%, 150% 100%, -50% 100%)'
          }}
        />
      </div>
      
      {/* Distant city lights */}
      <div 
        className={`
          absolute top-[20%] right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          width: '40%',
          height: '10%'
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => {
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
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.3; }
            100% { opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default CornerChalkSun;