import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const AiryRadioChorus: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [radioFrequency, setRadioFrequency] = useState(88.5);
  const [radioGlow, setRadioGlow] = useState(false);

  useEffect(() => {
    // Show Car Dashboard with Radio based on visual effects state
    if (state.visualEffects.airyRadioChorus.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Radio frequency changing effect
      const frequencyInterval = setInterval(() => {
        setRadioFrequency(88.5 + Math.random() * 20);
      }, 3000);
      
      // Radio glow pulsing effect
      const glowInterval = setInterval(() => {
        setRadioGlow(prev => !prev);
      }, 1500);
      
      return () => {
        clearTimeout(timer);
        clearInterval(frequencyInterval);
        clearInterval(glowInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.airyRadioChorus.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Car interior background - dark with slight gradient */}
      <div 
        className={`
          absolute inset-0 
          transition-all duration-1500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to bottom, #0a0a10 0%, #111122 100%)'
        }}
      />
      
      {/* Car dashboard */}
      <div 
        className={`
          absolute bottom-0 left-[10%] right-[10%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '40%',
          background: 'linear-gradient(to bottom, #222 0%, #111 100%)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Dashboard top ridge */}
        <div 
          className="absolute top-0 left-0 right-0"
          style={{
            height: '5%',
            background: '#333',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px'
          }}
        />
        
        {/* Steering wheel (partial view) */}
        <div 
          className="absolute bottom-0 left-[20%]"
          style={{
            width: '30%',
            height: '40%',
            borderTopLeftRadius: '100%',
            borderTopRightRadius: '100%',
            border: '10px solid #222',
            borderBottom: 'none'
          }}
        />
        
        {/* Dashboard gauges */}
        <div 
          className="absolute top-[20%] left-[25%]"
          style={{
            width: '20%',
            height: '30%',
            background: '#000',
            borderRadius: '10px',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* Speedometer */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              color: '#ccc',
              fontSize: '14px'
            }}
          >
            <div className="w-full h-full relative">
              <div 
                className="absolute top-[20%] left-[10%] right-[10%]"
                style={{
                  height: '5px',
                  background: 'linear-gradient(to right, #cc0000, #cccc00, #00cc00)',
                  borderRadius: '5px'
                }}
              />
              
              <div 
                className="absolute top-[40%] left-[50%] transform -translate-x-1/2"
                style={{
                  color: '#ccc',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}
              >
                65
              </div>
              
              <div 
                className="absolute bottom-[20%] left-0 right-0 text-center"
                style={{
                  color: '#999',
                  fontSize: '12px'
                }}
              >
                MPH
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Car radio */}
      <div 
        className={`
          absolute bottom-[25%] left-1/2 transform -translate-x-1/2
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '40%',
          height: '15%',
          background: '#000',
          borderRadius: '5px',
          boxShadow: `0 0 ${radioGlow ? '20px' : '10px'} rgba(0, 255, 255, ${radioGlow ? '0.5' : '0.2'})`,
          transition: 'box-shadow 0.5s ease-in-out'
        }}
      >
        {/* Radio display */}
        <div 
          className="absolute top-[20%] left-[10%] right-[10%]"
          style={{
            height: '30%',
            background: radioGlow ? '#00ffff' : '#00aaaa',
            boxShadow: `0 0 10px ${radioGlow ? '#00ffff' : '#00aaaa'}`,
            transition: 'all 0.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            style={{
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}
          >
            {radioFrequency.toFixed(1)} FM
          </div>
        </div>
        
        {/* Radio controls */}
        <div 
          className="absolute bottom-[20%] left-[10%] right-[10%]"
          style={{
            height: '30%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {/* Volume knob */}
          <div 
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
                transform: 'translate(-50%, -50%) rotate(45deg)',
                transformOrigin: 'center'
              }}
            />
          </div>
          
          {/* Preset buttons */}
          <div className="flex gap-1 h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div 
                key={index}
                className="h-full aspect-square"
                style={{
                  background: '#222',
                  border: '1px solid #333',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
          
          {/* Tuning knob */}
          <div 
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
                transform: 'translate(-50%, -50%) rotate(-30deg)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Windshield view with night road */}
      <div 
        className={`
          absolute top-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-80' : 'opacity-0'}
        `}
        style={{
          height: '60%',
          background: 'linear-gradient(to top, #000 0%, #111133 100%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
        }}
      >
        {/* Road */}
        <div 
          className="absolute bottom-0 left-[30%] right-[30%]"
          style={{
            height: '20%',
            background: '#333',
            perspective: '500px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Road markings */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-[5%]"
            style={{
              background: '#fff',
              opacity: 0.7
            }}
          />
        </div>
        
        {/* Ethereal radio waves/chorus visualization */}
        {Array.from({ length: 5 }).map((_, index) => {
          const top = 20 + index * 10;
          const opacity = 0.8 - (index * 0.15);
          const hue = (index * 30) % 360;
          
          return (
            <div 
              key={index}
              className={`
                absolute left-[20%] right-[20%]
                ${radioGlow ? 'opacity-100' : 'opacity-70'}
              `}
              style={{
                top: `${top}%`,
                height: '2px',
                background: `hsla(${hue}, 100%, 70%, ${opacity})`,
                boxShadow: `0 0 10px hsla(${hue}, 100%, 70%, ${opacity})`,
                animation: `wave${index + 1} ${3 + index * 0.5}s infinite alternate ease-in-out`
              }}
            />
          );
        })}
        
        {/* Sun insignia appearing in the windshield */}
        <div 
          className={`
            absolute top-[30%] left-1/2 transform -translate-x-1/2
            transition-all duration-3000 ease-in-out
            ${isAnimating && radioGlow ? 'opacity-70' : 'opacity-0'}
          `}
          style={{
            width: '100px',
            height: '100px'
          }}
        >
          {/* Sun center */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.7) 0%, rgba(255, 215, 0, 0.3) 50%, rgba(255, 215, 0, 0) 100%)',
              animation: 'pulse 3s infinite alternate'
            }}
          />
          
          {/* Sun rays */}
          {Array.from({ length: 12 }).map((_, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            const length = 50 + Math.random() * 20;
            
            return (
              <div 
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${length}px`,
                  height: '2px',
                  background: 'rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
                  transformOrigin: 'left center',
                  transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                  animation: `ray-pulse ${2 + Math.random()}s infinite alternate`
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes wave1 {
            0% { transform: scaleX(0.9) translateY(0); }
            100% { transform: scaleX(1.1) translateY(-5px); }
          }
          @keyframes wave2 {
            0% { transform: scaleX(1.1) translateY(0); }
            100% { transform: scaleX(0.9) translateY(-3px); }
          }
          @keyframes wave3 {
            0% { transform: scaleX(0.8) translateY(0); }
            100% { transform: scaleX(1.2) translateY(-7px); }
          }
          @keyframes wave4 {
            0% { transform: scaleX(1.2) translateY(0); }
            100% { transform: scaleX(0.8) translateY(-2px); }
          }
          @keyframes wave5 {
            0% { transform: scaleX(0.7) translateY(0); }
            100% { transform: scaleX(1.3) translateY(-4px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.95); }
            100% { opacity: 0.8; transform: scale(1.05); }
          }
          
          @keyframes ray-pulse {
            0% { opacity: 0.3; transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) scaleX(0.8); }
            100% { opacity: 0.7; transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) scaleX(1.2); }
          }
        `}
      </style>
    </div>
  );
};

export default AiryRadioChorus;