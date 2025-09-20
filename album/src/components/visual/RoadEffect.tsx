import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const RoadEffect: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    const roadVisible = state.visualEffects.road.visible;
    if (roadVisible) {
      setIsVisible(true);
      
      // Start extending animation after a short delay
      const timer = setTimeout(() => {
        setIsExtending(true);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsExtending(false);
    }
  }, [state.visualEffects.road.visible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-end justify-center"
      aria-hidden="true"
    >
      <div 
        className={`
          relative w-full max-w-4xl
          transition-all duration-2000 ease-in-out
          ${isExtending ? 'h-[70vh]' : 'h-[10vh]'}
        `}
      >
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <img 
            src="/assets/images/road/road-main.png" 
            alt="" 
            className="w-full object-cover"
            style={{
              height: isExtending ? '70vh' : '10vh',
              transition: 'height 2s ease-in-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoadEffect;