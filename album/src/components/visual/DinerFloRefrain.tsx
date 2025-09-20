import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const DinerFloRefrain: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [jukebox, setJukebox] = useState(false);

  useEffect(() => {
    // Show Diner based on visual effects state
    if (state.visualEffects.dinerFloRefrain.visible) {
      setIsVisible(true);
      
      // Start animation after a delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
      
      // Jukebox light animation
      const jukeboxInterval = setInterval(() => {
        setJukebox(prev => !prev);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(jukeboxInterval);
      };
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [state.visualEffects.dinerFloRefrain.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Diner interior background */}
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
      
      {/* Diner floor */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '30%',
          background: '#111',
          backgroundImage: 'linear-gradient(90deg, #111 0%, #111 49%, #333 49%, #333 51%, #111 51%, #111 100%)',
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Diner counter */}
      <div 
        className={`
          absolute bottom-[30%] left-[10%] right-[10%]
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          height: '15%',
          background: '#c0c0c0',
          borderTop: '5px solid #e0e0e0',
          borderBottom: '5px solid #a0a0a0',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Counter top details */}
        <div className="absolute inset-x-0 top-0 h-[10%]" style={{ background: '#e0e0e0' }} />
        
        {/* Counter stools */}
        {Array.from({ length: 5 }).map((_, index) => {
          const left = 10 + index * 20;
          
          return (
            <div 
              key={index}
              className="absolute bottom-0"
              style={{
                left: `${left}%`,
                width: '8%',
                height: '20%',
                transform: 'translateY(100%)'
              }}
            >
              {/* Stool seat */}
              <div 
                className="absolute top-0 left-0 right-0"
                style={{
                  height: '30%',
                  background: '#cc0000',
                  borderRadius: '50%',
                  border: '2px solid #a00000'
                }}
              />
              
              {/* Stool pole */}
              <div 
                className="absolute top-[30%] left-[45%] bottom-0"
                style={{
                  width: '10%',
                  background: '#c0c0c0'
                }}
              />
              
              {/* Stool base */}
              <div 
                className="absolute bottom-0 left-[35%]"
                style={{
                  width: '30%',
                  height: '5%',
                  background: '#a0a0a0',
                  borderRadius: '50%'
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Diner booths */}
      {Array.from({ length: 3 }).map((_, index) => {
        const left = 15 + index * 30;
        
        return (
          <div 
            key={index}
            className={`
              absolute bottom-[30%]
              transition-all duration-2000 ease-in-out
              ${isAnimating ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              left: `${left}%`,
              width: '25%',
              height: '25%'
            }}
          >
            {/* Booth table */}
            <div 
              className="absolute bottom-0 left-[10%] right-[10%]"
              style={{
                height: '30%',
                background: '#e0e0e0',
                borderTop: '3px solid #f0f0f0',
                borderLeft: '3px solid #f0f0f0',
                borderRight: '3px solid #c0c0c0',
                borderBottom: '3px solid #c0c0c0'
              }}
            >
              {/* Table items */}
              <div 
                className="absolute top-[20%] left-[20%]"
                style={{
                  width: '15%',
                  height: '40%',
                  background: '#fff',
                  borderRadius: '5px',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
                }}
              />
              
              <div 
                className="absolute top-[30%] left-[50%]"
                style={{
                  width: '20%',
                  height: '30%',
                  background: '#cc0000',
                  borderRadius: '50%',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
                }}
              />
            </div>
            
            {/* Booth seats */}
            <div 
              className="absolute bottom-0 left-0"
              style={{
                width: '40%',
                height: '70%',
                background: '#cc0000',
                borderTop: '10px solid #dd0000',
                boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.3)'
              }}
            />
            
            <div 
              className="absolute bottom-0 right-0"
              style={{
                width: '40%',
                height: '70%',
                background: '#cc0000',
                borderTop: '10px solid #dd0000',
                boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        );
      })}
      
      {/* Jukebox */}
      <div 
        className={`
          absolute bottom-[30%] right-[5%]
          transition-all duration-2500 ease-in-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: '10%',
          height: '30%',
          background: '#222',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Jukebox top */}
        <div 
          className="absolute top-0 left-0 right-0"
          style={{
            height: '30%',
            background: '#333',
            borderRadius: '10px 10px 0 0',
            borderBottom: '2px solid #444'
          }}
        />
        
        {/* Jukebox display */}
        <div 
          className={`
            absolute top-[10%] left-[10%] right-[10%]
            ${jukebox ? 'opacity-100' : 'opacity-70'}
          `}
          style={{
            height: '15%',
            background: jukebox ? '#ff00ff' : '#00ffff',
            boxShadow: `0 0 10px ${jukebox ? '#ff00ff' : '#00ffff'}`,
            transition: 'all 0.5s ease-in-out'
          }}
        />
        
        {/* Jukebox buttons */}
        {Array.from({ length: 8 }).map((_, index) => {
          const top = 40 + Math.floor(index / 2) * 15;
          const left = index % 2 === 0 ? 20 : 60;
          
          return (
            <div 
              key={index}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: '20%',
                height: '10%',
                background: '#ccc',
                border: '2px solid #aaa'
              }}
            />
          );
        })}
      </div>
      
      {/* Diner windows with neon */}
      <div 
        className={`
          absolute top-[10%] left-0 right-0
          transition-all duration-2000 ease-in-out
          ${isAnimating ? 'opacity-90' : 'opacity-0'}
        `}
        style={{
          height: '20%',
          background: '#000',
          borderTop: '5px solid #333',
          borderBottom: '5px solid #333'
        }}
      >
        {/* Neon sign in window */}
        <div 
          className="absolute top-[20%] left-[30%]"
          style={{
            color: '#ff00ff',
            fontSize: '36px',
            fontWeight: 'bold',
            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff',
            fontFamily: 'cursive'
          }}
        >
          Flo's Diner
        </div>
      </div>
      
      {/* Waitress silhouette (Flo) */}
      <div 
        className={`
          absolute bottom-[45%] left-[40%]
          transition-all duration-3000 ease-in-out
          ${isAnimating ? 'opacity-90 transform translate-x-0' : 'opacity-0 transform -translate-x-20'}
        `}
        style={{
          width: '8%',
          height: '20%',
          background: '#000',
          clipPath: 'polygon(30% 0%, 70% 0%, 90% 20%, 70% 30%, 80% 60%, 90% 100%, 60% 100%, 50% 70%, 40% 100%, 10% 100%, 20% 60%, 30% 30%, 10% 20%)'
        }}
      >
        {/* Apron */}
        <div 
          className="absolute top-[40%] left-[20%] right-[20%] bottom-[30%]"
          style={{
            background: '#fff',
            clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)'
          }}
        />
        
        {/* Sun insignia pin */}
        <div 
          className="absolute top-[20%] left-[60%] w-[20%] h-[10%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 215, 0, 0.5) 50%, rgba(255, 215, 0, 0) 100%)',
            animation: 'pulse 2s infinite alternate'
          }}
        />
      </div>
      
      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.7; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
};

export default DinerFloRefrain;