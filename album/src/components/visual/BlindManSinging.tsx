import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const BlindManSinging: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundWaves, setSoundWaves] = useState(false);

  useEffect(() => {
    // Show Blind Man Singing based on visual effects state
    const shouldShow = state.visualEffects.blindManSinging.visible;
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Sound wave animation
      const soundInterval = setInterval(() => {
        setSoundWaves(prev => !prev);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(soundInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.blindManSinging.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      aria-hidden="true"
    >
      {/* Street scene background */}
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
      
      {/* Street/sidewalk */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '30%',
          background: '#333',
          borderTop: '5px solid #444'
        }}
      >
        {/* Sidewalk texture */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, #333 0%, #333 98%, #222 98%, #222 100%)',
            backgroundSize: '100px 100%'
          }}
        />
      </div>
      
      {/* Building wall */}
      <div 
        className={`
          absolute bottom-[30%] left-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '100%',
          height: '70%',
          background: '#222',
          backgroundImage: 'linear-gradient(to right, #222 0%, #222 98%, #111 98%, #111 100%)'
        }}
      />
      
      {/* Blind man silhouette */}
      <div 
        className={`
          absolute bottom-[30%] left-[40%]
          transition-all duration-3000 ease-in-out
          ${isAnimating ? 'opacity-90 transform translate-x-0' : 'opacity-0 transform -translate-x-20'}
        `}
        style={{
          width: '120px',
          height: '300px'
        }}
      >
        {/* Body */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '70%',
            background: '#000',
            clipPath: 'polygon(30% 0%, 70% 0%, 90% 20%, 70% 30%, 80% 60%, 90% 100%, 60% 100%, 50% 70%, 40% 100%, 10% 100%, 20% 60%, 30% 30%, 10% 20%)'
          }}
        />
        
        {/* Head */}
        <div 
          className="absolute top-0 left-[25%]"
          style={{
            width: '50%',
            height: '20%',
            background: '#000',
            borderRadius: '50% 50% 0 0'
          }}
        />
        
        {/* Sunglasses */}
        <div 
          className="absolute top-[10%] left-[30%]"
          style={{
            width: '40%',
            height: '5%',
            background: '#333'
          }}
        />
        
        {/* Cane */}
        <div 
          className="absolute bottom-0 right-[20%]"
          style={{
            width: '5px',
            height: '80%',
            background: '#fff',
            transform: 'rotate(10deg)',
            transformOrigin: 'bottom center'
          }}
        />
        
        {/* Mouth (singing) */}
        <div 
          className="absolute top-[15%] left-[40%]"
          style={{
            width: '20%',
            height: '5%',
            background: '#333',
            borderRadius: '0 0 50% 50%',
            animation: soundWaves ? 'mouth-sing 1s infinite alternate' : 'none'
          }}
        />
        
        {/* Sound waves */}
        {soundWaves && (
          <>
            <div 
              className="absolute top-[12%] left-[20%]"
              style={{
                width: '60%',
                height: '60%',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: 'sound-wave 2s infinite',
                animationDelay: '0s'
              }}
            />
            
            <div 
              className="absolute top-[7%] left-[15%]"
              style={{
                width: '70%',
                height: '70%',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: 'sound-wave 2s infinite',
                animationDelay: '0.5s'
              }}
            />
            
            <div 
              className="absolute top-[2%] left-[10%]"
              style={{
                width: '80%',
                height: '80%',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: 'sound-wave 2s infinite',
                animationDelay: '1s'
              }}
            />
          </>
        )}
        
        {/* Sun insignia pin */}
        <div 
          className="absolute top-[30%] left-[10%] w-[20%] h-[10%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
            animation: 'pulse 2s infinite alternate'
          }}
        />
      </div>
      
      {/* Lyrics/prophecy appearing as text */}
      <div 
        className={`
          absolute top-[30%] right-[20%]
          transition-all duration-3000 ease-in-out
          ${isAnimating && soundWaves ? 'opacity-70' : 'opacity-0'}
        `}
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontStyle: 'italic',
          fontSize: '18px',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          maxWidth: '300px',
          textAlign: 'center'
        }}
      >
        "She comes, she comes…<br />
        burning houses in the distance.<br />
        Lights up the night.<br />
        She comes."
      </div>
      
      {/* Street lamp light */}
      <div 
        className={`
          absolute top-0 right-[10%]
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
          
          @keyframes sound-wave {
            0% { opacity: 0.8; transform: scale(0.5); }
            100% { opacity: 0; transform: scale(1.5); }
          }
          
          @keyframes mouth-sing {
            0% { height: 3%; }
            100% { height: 8%; }
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

export default BlindManSinging;