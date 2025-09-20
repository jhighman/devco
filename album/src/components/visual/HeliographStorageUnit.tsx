import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const HeliographStorageUnit: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [beamIntensity, setBeamIntensity] = useState(0);

  useEffect(() => {
    // Show Heliograph Storage Unit based on visual effects state
    if (state.visualEffects.heliographStorageUnit.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Gradually increase beam intensity
      if (isAnimating) {
        const intensityInterval = setInterval(() => {
          setBeamIntensity(prev => Math.min(prev + 0.05, 1));
        }, 500);
        
        return () => clearInterval(intensityInterval);
      }
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsAnimating(false);
      setBeamIntensity(0);
    }
  }, [state.visualEffects.heliographStorageUnit.visible, isAnimating]);

  if (!isVisible) return null;

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
          opacity: beamIntensity * 0.6
        }}
      />
      
      {/* Row of storage units */}
      <div 
        className={`
          absolute bottom-0 left-[5%] right-[5%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '40%',
          background: '#333',
          borderTop: '5px solid #444'
        }}
      >
        {/* Individual storage units */}
        {Array.from({ length: 6 }).map((_, index) => {
          const isOpen = index === 2; // The third unit is open with the ritual
          const left = (100 / 6) * index;
          const width = 100 / 6;
          
          return (
            <div 
              key={index}
              className="absolute bottom-0"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                height: '100%',
                background: '#222',
                border: '1px solid #444'
              }}
            >
              {/* Storage unit door */}
              <div 
                className="absolute inset-x-[5%] top-[10%] bottom-0"
                style={{
                  background: '#111',
                  borderTop: '3px solid #333',
                  transform: isOpen ? 'translateY(50%)' : 'none',
                  transformOrigin: 'top center'
                }}
              >
                {/* Door handle */}
                <div 
                  className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '30%',
                    height: '5%',
                    background: '#444',
                    borderRadius: '5px'
                  }}
                />
                
                {/* Unit number */}
                <div 
                  className="absolute top-[20%] left-1/2 transform -translate-x-1/2"
                  style={{
                    color: '#666',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </div>
              </div>
              
              {/* Padlock with insignia (only on the open unit) */}
              {isOpen && (
                <div 
                  className="absolute top-[60%] right-[10%]"
                  style={{
                    width: '20px',
                    height: '30px',
                    background: '#555',
                    borderRadius: '5px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Sun insignia on padlock */}
                  <div 
                    className="absolute inset-[20%] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.7) 0%, rgba(255, 215, 0, 0.3) 70%, rgba(255, 215, 0, 0) 100%)',
                      animation: 'pulse 2s infinite alternate',
                      opacity: beamIntensity
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Open storage unit with ritual setup */}
      <div 
        className={`
          absolute bottom-[20%] left-[38.3%] right-[55%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '20%',
          background: '#0a0a0a'
        }}
      >
        {/* Chalk sun and salt circle on floor */}
        <div 
          className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2"
          style={{
            width: '80%',
            height: '40%'
          }}
        >
          {/* Salt circle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.5)',
              opacity: beamIntensity * 0.8
            }}
          />
          
          {/* Chalk sun */}
          <div 
            className="absolute inset-[20%] rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              opacity: beamIntensity * 0.8
            }}
          />
          
          {/* Chalk sun rays */}
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = (index * 45) * (Math.PI / 180);
            
            return (
              <div 
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: '40%',
                  height: '2px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  transformOrigin: 'left center',
                  transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                  opacity: beamIntensity * 0.8
                }}
              />
            );
          })}
        </div>
        
        {/* Heliograph tripod */}
        <div 
          className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2"
          style={{
            width: '40%',
            height: '50%'
          }}
        >
          {/* Tripod legs */}
          <div 
            className="absolute bottom-0 left-0"
            style={{
              width: '2px',
              height: '100%',
              background: '#666',
              transformOrigin: 'bottom center',
              transform: 'rotate(-20deg)'
            }}
          />
          
          <div 
            className="absolute bottom-0 right-0"
            style={{
              width: '2px',
              height: '100%',
              background: '#666',
              transformOrigin: 'bottom center',
              transform: 'rotate(20deg)'
            }}
          />
          
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '2px',
              height: '100%',
              background: '#666'
            }}
          />
          
          {/* Mirror */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '30px',
              height: '30px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(200, 200, 255, 0.7) 100%)',
              borderRadius: '50%',
              boxShadow: `0 0 ${10 + beamIntensity * 20}px rgba(255, 255, 255, ${0.5 * beamIntensity})`,
              transform: 'rotate(45deg)'
            }}
          />
        </div>
        
        {/* Light beam from heliograph */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '5px',
            height: '200%',
            background: `linear-gradient(to top, rgba(255, 215, 0, ${beamIntensity}) 0%, rgba(255, 215, 0, 0) 100%)`,
            opacity: beamIntensity
          }}
        />
        
        {/* Projected sun insignia on wall */}
        <div 
          className="absolute top-[-150%] left-1/2 transform -translate-x-1/2"
          style={{
            width: '100px',
            height: '100px',
            opacity: beamIntensity
          }}
        >
          {/* Sun center */}
          <div 
            className="absolute inset-[30%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 70%, rgba(255, 215, 0, 0) 100%)',
              boxShadow: `0 0 ${20 * beamIntensity}px rgba(255, 215, 0, ${0.7 * beamIntensity})`
            }}
          />
          
          {/* Sun rays */}
          {Array.from({ length: 12 }).map((_, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            
            return (
              <div 
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: '50%',
                  height: '2px',
                  background: 'rgba(255, 215, 0, 0.7)',
                  transformOrigin: 'left center',
                  transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                  boxShadow: `0 0 ${5 * beamIntensity}px rgba(255, 215, 0, ${0.5 * beamIntensity})`
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Keypad */}
      <div 
        className={`
          absolute bottom-[45%] left-[42%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          width: '30px',
          height: '50px',
          background: '#222',
          borderRadius: '5px',
          border: '1px solid #333',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Keypad buttons */}
        <div className="absolute inset-[10%] grid grid-cols-3 grid-rows-4 gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div 
              key={index}
              className="bg-gray-700 rounded-sm"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Candles around the circle */}
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index * 45) * (Math.PI / 180);
        const radius = 50;
        const left = 50 + Math.cos(angle) * radius;
        const bottom = 50 + Math.sin(angle) * radius;
        
        return (
          <div 
            key={index}
            className={`
              absolute
              transition-all duration-2500 ease-in-out
              ${isAnimating ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              left: `${38.3 + left * 0.1}%`,
              bottom: `${10 + bottom * 0.1}%`,
              width: '5px',
              height: '15px',
              background: 'linear-gradient(to top, #cc9900, #ffcc00)',
              borderRadius: '2px'
            }}
          >
            {/* Candle flame */}
            <div 
              className="absolute bottom-full left-1/2 transform -translate-x-1/2"
              style={{
                width: '7px',
                height: '10px',
                background: 'radial-gradient(ellipse at bottom, #ffff00 0%, #ff9900 100%)',
                borderRadius: '50% 50% 20% 20%',
                animation: `flicker ${1 + Math.random()}s infinite alternate ease-in-out`,
                boxShadow: '0 0 10px rgba(255, 255, 0, 0.7)'
              }}
            />
          </div>
        );
      })}
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes flicker {
            0% { transform: translateX(-50%) scale(0.9, 1.1); opacity: 0.9; }
            100% { transform: translateX(-50%) scale(1.1, 0.9); opacity: 1; }
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

export default HeliographStorageUnit;