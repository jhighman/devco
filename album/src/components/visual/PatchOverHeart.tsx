import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const PatchOverHeart: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Show patch over heart based on visual effects state
    const shouldShow = state.visualEffects.patchOverHeart.visible;
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Start pulsing animation after a delay
      const timer = setTimeout(() => {
        setIsPulsing(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsPulsing(false);
    }
  }, [state.visualEffects.patchOverHeart.visible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-35 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div 
        className={`
          relative w-full max-w-md
          transition-all duration-1000 ease-in-out
          ${isPulsing ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="relative">
          {/* Fabric background */}
          <div 
            className="absolute inset-0 bg-red-900 rounded-full"
            style={{
              width: '200px',
              height: '200px',
              left: 'calc(50% - 100px)',
              top: 'calc(50% - 100px)',
              background: 'linear-gradient(135deg, #800020 0%, #4a0010 100%)',
              boxShadow: '0 0 20px rgba(0,0,0,0.5) inset'
            }}
          />
          
          {/* Sun insignia */}
          <div 
            className={`
              absolute
              ${isPulsing ? 'animate-pulse' : ''}
            `}
            style={{
              width: '180px',
              height: '180px',
              left: 'calc(50% - 90px)',
              top: 'calc(50% - 90px)',
            }}
          >
            {/* Sun center */}
            <div 
              className="absolute rounded-full bg-yellow-500"
              style={{
                width: '60px',
                height: '60px',
                left: 'calc(50% - 30px)',
                top: 'calc(50% - 30px)',
                boxShadow: '0 0 15px rgba(255,215,0,0.7)'
              }}
            />
            
            {/* Sun rays */}
            {Array.from({ length: 12 }).map((_, index) => {
              const angle = (index * 30) * (Math.PI / 180);
              return (
                <div 
                  key={index}
                  className="absolute bg-yellow-500"
                  style={{
                    width: '8px',
                    height: '60px',
                    left: 'calc(50% - 4px)',
                    top: 'calc(50% - 30px)',
                    transformOrigin: 'center bottom',
                    transform: `rotate(${angle}rad) translateY(-60px)`,
                    boxShadow: '0 0 10px rgba(255,215,0,0.5)'
                  }}
                />
              );
            })}
          </div>
          
          {/* Stitching effect */}
          <div 
            className="absolute rounded-full border-2 border-dashed border-yellow-700"
            style={{
              width: '210px',
              height: '210px',
              left: 'calc(50% - 105px)',
              top: 'calc(50% - 105px)',
              opacity: 0.7
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatchOverHeart;