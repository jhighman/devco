import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const RollerRinkShelter: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [discoLights, setDiscoLights] = useState(0);

  useEffect(() => {
    // Show Roller Rink Shelter based on visual effects state
    if (state.visualEffects.rollerRinkShelter.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Rotate disco lights
      const discoInterval = setInterval(() => {
        setDiscoLights(prev => (prev + 1) % 5);
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(discoInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.rollerRinkShelter.visible]);

  if (!isVisible) return null;

  // Generate people in the shelter
  const people = Array.from({ length: 15 }).map((_, index) => {
    const left = 10 + Math.random() * 80;
    const bottom = 5 + Math.random() * 20;
    const height = 30 + Math.random() * 20;
    const width = height * 0.4;
    const hasSkates = Math.random() > 0.5;
    
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
          clipPath: 'polygon(30% 0%, 70% 0%, 60% 10%, 60% 20%, 80% 30%, 70% 40%, 70% 60%, 50% 100%, 30% 60%, 30% 40%, 20% 30%, 40% 20%, 40% 10%)'
        }}
      >
        {/* Roller skates */}
        {hasSkates && (
          <>
            <div 
              className="absolute"
              style={{
                left: '-20%',
                bottom: '-5%',
                width: '40%',
                height: '10%',
                background: '#444',
                borderRadius: '30% 30% 0 0'
              }}
            />
            <div 
              className="absolute"
              style={{
                right: '-20%',
                bottom: '-5%',
                width: '40%',
                height: '10%',
                background: '#444',
                borderRadius: '30% 30% 0 0'
              }}
            />
          </>
        )}
        
        {/* Sun insignia on some people */}
        {Math.random() > 0.7 && (
          <div 
            className="absolute w-[30%] h-[10%] rounded-full"
            style={{
              top: '20%',
              right: '-10%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
              animation: 'pulse 2s infinite alternate'
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Roller rink background */}
      <div 
        className={`
          absolute inset-0 
          transition-all duration-1500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)'
        }}
      />
      
      {/* Roller rink floor */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '30%',
          background: '#333',
          backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Rink boundary */}
      <div 
        className={`
          absolute bottom-[30%] left-[5%] right-[5%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '2%',
          background: '#fff',
          borderRadius: '5px'
        }}
      />
      
      {/* Disco ball */}
      <div 
        className={`
          absolute top-[20%] left-1/2 transform -translate-x-1/2
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100 rotate-[20deg]' : 'opacity-0 rotate-0'}
        `}
        style={{
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, #ccc 0%, #999 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
          animation: 'rotate 10s linear infinite'
        }}
      >
        {/* Disco ball mirror tiles */}
        {Array.from({ length: 20 }).map((_, index) => {
          const angle = (index * 18) * (Math.PI / 180);
          const top = 50 + Math.sin(angle) * 40;
          const left = 50 + Math.cos(angle) * 40;
          
          return (
            <div 
              key={index}
              className="absolute w-[10%] h-[10%]"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                background: '#fff',
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
              }}
            />
          );
        })}
      </div>
      
      {/* Disco lights */}
      {Array.from({ length: 5 }).map((_, index) => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        const isActive = index === discoLights;
        const angle = (index * 72) * (Math.PI / 180);
        const top = 10;
        const left = 50 + Math.cos(angle) * 40;
        
        return (
          <div 
            key={index}
            className={`
              absolute
              transition-all duration-500 ease-in-out
              ${isAnimating ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: '50px',
              height: '30px',
              background: '#222',
              borderRadius: '5px',
              transform: `rotate(${angle * (180 / Math.PI)}deg)`
            }}
          >
            {/* Light beam */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2"
              style={{
                width: '200px',
                height: '400px',
                background: `linear-gradient(to bottom, ${colors[index]} 0%, transparent 100%)`,
                opacity: isActive ? 0.7 : 0,
                transformOrigin: 'top center',
                transform: 'perspective(500px) rotateX(60deg)'
              }}
            />
          </div>
        );
      })}
      
      {/* Emergency shelter signs */}
      <div 
        className={`
          absolute top-[5%] left-[10%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          padding: '10px 20px',
          background: '#cc0000',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '24px',
          borderRadius: '5px'
        }}
      >
        EMERGENCY SHELTER
      </div>
      
      {/* Cots and supplies along the walls */}
      <div 
        className={`
          absolute bottom-[5%] left-[5%] right-[5%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '10%',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={index}
            className="relative"
            style={{
              width: '10%',
              height: '100%',
              background: '#666',
              borderTop: '5px solid #888',
              borderRadius: '5px'
            }}
          >
            {/* Blanket */}
            <div 
              className="absolute inset-0"
              style={{
                top: '20%',
                background: index % 3 === 0 ? '#cc0000' : index % 3 === 1 ? '#0000cc' : '#006600',
                borderRadius: '5px'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Supply boxes */}
      <div 
        className={`
          absolute bottom-[5%] right-[10%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          width: '15%',
          height: '15%'
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const top = Math.floor(index / 2) * 50;
          const left = (index % 2) * 50;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: '45%',
                height: '45%',
                background: '#cc0000',
                border: '2px solid #aa0000',
                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Red cross */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                +
              </div>
            </div>
          );
        })}
      </div>
      
      {/* People in the shelter */}
      {people}
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes rotate {
            0% { transform: translateX(-50%) rotate(0deg); }
            100% { transform: translateX(-50%) rotate(360deg); }
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

export default RollerRinkShelter;