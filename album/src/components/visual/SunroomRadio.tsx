import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const SunroomRadio: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [radioActive, setRadioActive] = useState(false);
  const [vuMeter, setVuMeter] = useState(0);

  useEffect(() => {
    // Show Sunroom Radio based on visual effects state
    if (state.visualEffects.sunroomRadio.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Radio active state
      const radioInterval = setInterval(() => {
        setRadioActive(prev => !prev);
      }, 5000);
      
      // VU meter animation
      const vuInterval = setInterval(() => {
        setVuMeter(Math.random());
      }, 200);
      
      return () => {
        clearTimeout(timer);
        clearInterval(radioInterval);
        clearInterval(vuInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.sunroomRadio.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Sunroom background */}
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
      
      {/* Sunlight streaming through window */}
      <div 
        className={`
          absolute top-[10%] left-[20%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-70' : 'opacity-0'}
        `}
        style={{
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0) 70%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)'
        }}
      >
        {/* Dust particles in sunlight */}
        {Array.from({ length: 30 }).map((_, index) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const size = 1 + Math.random() * 2;
          const opacity = 0.3 + Math.random() * 0.5;
          
          return (
            <div 
              key={index}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: '#fff',
                opacity: opacity,
                animation: `float ${5 + Math.random() * 10}s infinite alternate ease-in-out`
              }}
            />
          );
        })}
      </div>
      
      {/* Studio desk/table */}
      <div 
        className={`
          absolute bottom-[20%] left-[15%] right-[15%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '10%',
          background: '#8B4513',
          borderTop: '5px solid #A0522D',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
      />
      
      {/* Radio broadcasting equipment */}
      <div 
        className={`
          absolute bottom-[30%] left-1/2 transform -translate-x-1/2
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '50%',
          height: '20%',
          background: '#222',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.7)',
          border: '2px solid #333'
        }}
      >
        {/* Radio display */}
        <div 
          className="absolute top-[20%] left-[10%] right-[60%]"
          style={{
            height: '30%',
            background: radioActive ? '#00ff00' : '#006600',
            boxShadow: `0 0 10px ${radioActive ? '#00ff00' : '#006600'}`,
            transition: 'all 0.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            color: '#000',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {radioActive ? "BROADCASTING" : "STANDBY"}
        </div>
        
        {/* VU meter */}
        <div 
          className="absolute top-[20%] left-[45%] right-[10%]"
          style={{
            height: '30%',
            background: '#111',
            border: '1px solid #333',
            overflow: 'hidden'
          }}
        >
          <div 
            className="absolute inset-y-0 left-0"
            style={{
              width: `${vuMeter * 100}%`,
              background: 'linear-gradient(to right, #00ff00 0%, #ffff00 70%, #ff0000 100%)',
              transition: 'width 0.1s ease-in-out'
            }}
          />
          
          {/* VU meter markings */}
          {Array.from({ length: 10 }).map((_, index) => {
            const left = index * 10;
            
            return (
              <div 
                key={index}
                className="absolute top-0 bottom-0 w-[1px]"
                style={{
                  left: `${left}%`,
                  background: 'rgba(255, 255, 255, 0.3)'
                }}
              />
            );
          })}
        </div>
        
        {/* Control knobs */}
        <div 
          className="absolute bottom-[20%] left-[10%] right-[10%]"
          style={{
            height: '30%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index}
              className="h-full aspect-square rounded-full"
              style={{
                background: '#333',
                border: '2px solid #444',
                boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.8)'
              }}
            >
              <div 
                className="absolute top-[50%] left-[50%] w-[60%] h-[5px]"
                style={{
                  background: '#666',
                  transform: `translate(-50%, -50%) rotate(${-45 + (index * 30)}deg)`,
                  transformOrigin: 'center'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Microphone */}
      <div 
        className={`
          absolute bottom-[50%] left-[40%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '5%',
          height: '20%'
        }}
      >
        {/* Mic stand */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '5px',
            height: '100%',
            background: '#888'
          }}
        />
        
        {/* Microphone head */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '30px',
            height: '50px',
            background: '#333',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Mic grille */}
          <div 
            className="absolute inset-x-[20%] top-[20%] bottom-[20%]"
            style={{
              background: '#222',
              borderRadius: '5px',
              backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)',
              backgroundSize: '3px 3px'
            }}
          />
        </div>
      </div>
      
      {/* Radio waves/transmission visualization */}
      {radioActive && (
        <div 
          className="absolute top-0 left-0 right-0 bottom-[50%]"
          style={{
            overflow: 'hidden'
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const delay = index * 0.5;
            
            return (
              <div 
                key={index}
                className="absolute left-1/2 w-[300px] h-[300px] rounded-full"
                style={{
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  transform: 'translateX(-50%)',
                  animation: `radio-wave 4s infinite`,
                  animationDelay: `${delay}s`,
                  opacity: 0
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Person silhouette */}
      <div 
        className={`
          absolute bottom-[30%] right-[30%]
          transition-all duration-3000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          width: '80px',
          height: '200px',
          background: '#000',
          clipPath: 'polygon(30% 0%, 70% 0%, 60% 10%, 60% 20%, 80% 30%, 70% 40%, 70% 60%, 50% 100%, 30% 60%, 30% 40%, 20% 30%, 40% 20%, 40% 10%)'
        }}
      >
        {/* Sun insignia pin */}
        <div 
          className="absolute top-[20%] left-[10%] w-[30%] h-[10%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
            animation: 'pulse 2s infinite alternate'
          }}
        />
      </div>
      
      {/* Window frame */}
      <div 
        className={`
          absolute top-[10%] left-[20%] right-[20%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '40%',
          border: '10px solid #8B4513',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Window panes */}
        <div 
          className="absolute inset-0"
          style={{
            borderRight: '5px solid #8B4513',
            borderBottom: '5px solid #8B4513',
            backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #8B4513 50%, #8B4513 calc(50% + 5px), transparent calc(50% + 5px), transparent 100%), linear-gradient(to bottom, transparent 0%, transparent 50%, #8B4513 50%, #8B4513 calc(50% + 5px), transparent calc(50% + 5px), transparent 100%)',
            backgroundSize: '100% 100%'
          }}
        />
      </div>
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(360deg); }
          }
          
          @keyframes radio-wave {
            0% { transform: translateX(-50%) scale(0); opacity: 0.7; }
            100% { transform: translateX(-50%) scale(3); opacity: 0; }
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

export default SunroomRadio;