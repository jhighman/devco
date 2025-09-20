import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const MotelNeonExodus: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [neonFlicker, setNeonFlicker] = useState(false);

  useEffect(() => {
    // Show Motel Neon Exodus based on visual effects state
    const shouldShow = state.visualEffects.motelNeonExodus.visible;
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Set up neon flickering effect
      const flickerInterval = setInterval(() => {
        setNeonFlicker(prev => !prev);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(flickerInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.motelNeonExodus.visible]);

  if (!isVisible) return null;

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
      
      {/* Motel building */}
      <div 
        className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '80%',
          height: '60%',
          background: '#222',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Motel roof */}
        <div 
          className="absolute top-0 left-0 right-0"
          style={{
            height: '10%',
            background: '#111',
            transform: 'translateY(-100%)'
          }}
        />
        
        {/* Motel windows */}
        {Array.from({ length: 8 }).map((_, index) => {
          const left = 10 + (index % 4) * 22;
          const top = Math.floor(index / 4) * 40 + 20;
          const isLit = Math.random() > 0.3;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: '18%',
                height: '25%',
                background: isLit ? 'rgba(255, 255, 200, 0.7)' : '#111',
                boxShadow: isLit ? '0 0 20px rgba(255, 255, 200, 0.5)' : 'none',
                border: '2px solid #333'
              }}
            >
              {/* Window curtains */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.8) 100%)'
                }}
              />
            </div>
          );
        })}
        
        {/* Motel doors */}
        {Array.from({ length: 4 }).map((_, index) => {
          const left = 10 + index * 22;
          
          return (
            <div 
              key={index}
              className="absolute bottom-0"
              style={{
                left: `${left}%`,
                width: '18%',
                height: '30%',
                background: '#0a0a0a',
                border: '2px solid #333'
              }}
            >
              {/* Door number */}
              <div 
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
                style={{
                  color: '#aaa',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}
              >
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Neon MOTEL sign */}
      <div 
        className={`
          absolute top-[15%] left-1/2 transform -translate-x-1/2
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '40%',
          height: '15%'
        }}
      >
        <div 
          className={`
            absolute inset-0 flex items-center justify-center
            ${neonFlicker ? 'opacity-80' : 'opacity-100'}
            transition-opacity duration-100
          `}
          style={{
            color: '#ff00ff',
            fontSize: '48px',
            fontWeight: 'bold',
            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
            letterSpacing: '10px'
          }}
        >
          MOTEL
        </div>
      </div>
      
      {/* Neon OPEN sign */}
      <div 
        className={`
          absolute top-[35%] left-1/2 transform -translate-x-1/2
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '20%',
          height: '10%',
          border: '2px solid #00ff00',
          boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff00',
          animation: neonFlicker ? 'none' : 'neon-pulse 2s infinite alternate'
        }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: '#00ff00',
            fontSize: '32px',
            fontWeight: 'bold',
            textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00',
            opacity: neonFlicker ? 0.5 : 1
          }}
        >
          OPEN
        </div>
      </div>
      
      {/* Road in front of motel */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '10%',
          background: '#222',
          borderTop: '2px solid #444'
        }}
      >
        {/* Road markings */}
        <div 
          className="absolute top-1/2 left-0 right-0 h-[10%]"
          style={{
            background: '#fff',
            opacity: 0.7
          }}
        />
      </div>
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes neon-pulse {
            0% { opacity: 0.8; box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; }
            100% { opacity: 1; box-shadow: 0 0 15px #00ff00, 0 0 30px #00ff00; }
          }
        `}
      </style>
    </div>
  );
};

export default MotelNeonExodus;