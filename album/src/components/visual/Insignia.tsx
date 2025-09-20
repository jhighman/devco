import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { globalAssets } from '../../data/chapters';

const Insignia: React.FC = () => {
  const { state } = useAppContext();
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  
  const { visible, large, position, rotate, pulse, opacity } = state.visualEffects.insignia;
  
  // Size classes based on large flag
  const sizeClass = large ? 'w-64 h-64' : 'w-32 h-32';
  
  // Position classes
  const positionClasses = {
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };
  
  // Rotation animation
  useEffect(() => {
    if (!rotate) return;
    
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % 360);
    }, 50);
    
    return () => clearInterval(rotationInterval);
  }, [rotate]);
  
  // Pulse animation
  useEffect(() => {
    if (!pulse) return;
    
    const pulseInterval = setInterval(() => {
      setScale(prev => 1 + 0.05 * Math.sin(Date.now() / 1000));
    }, 50);
    
    return () => clearInterval(pulseInterval);
  }, [pulse]);
  
  // Get the insignia SVG from global assets
  const insigniaSvg = globalAssets?.insignia_of_the_sun?.svg;
  
  if (!visible || !insigniaSvg) {
    return null;
  }
  
  return (
    <div
      className={`insignia absolute ${positionClasses[position]} ${sizeClass} pointer-events-none`}
      style={{
        opacity,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <img
        src={insigniaSvg}
        alt="Insignia of the Sun"
        className="w-full h-full"
      />
    </div>
  );
};

export default Insignia;