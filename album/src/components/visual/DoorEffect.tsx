import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const DoorEffect: React.FC = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [doorOpening, setDoorOpening] = useState(false);
  
  // Show the door effect when the panel has_door is true
  useEffect(() => {
    const currentPanel = state.visualEffects.door.visible;
    if (currentPanel) {
      setIsVisible(true);
      
      // Animate door opening after a delay
      const timer = setTimeout(() => {
        setDoorOpening(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setDoorOpening(false);
    }
  }, [state.visualEffects.door.visible]);
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="door-effect absolute inset-0 flex items-center justify-center pointer-events-none">
      <div 
        className={`door-frame w-1/3 h-2/3 border-8 border-amber-800 bg-black relative overflow-hidden transition-all duration-1000 ${
          doorOpening ? 'door-open' : ''
        }`}
      >
        {/* Door interior - golden light */}
        <div 
          className={`door-interior absolute inset-0 bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-300 transition-opacity duration-1000 ${
            doorOpening ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Light rays emanating from door */}
        <div 
          className={`light-rays absolute inset-0 transition-opacity duration-1000 ${
            doorOpening ? 'opacity-70' : 'opacity-0'
          }`}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 h-[200%] w-4 bg-yellow-100 opacity-50"
              style={{ 
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoorEffect;