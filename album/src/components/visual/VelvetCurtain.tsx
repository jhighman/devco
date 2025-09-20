import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

interface VelvetCurtainProps {
  // Optional override to force visibility
  forceVisible?: boolean;
}

const VelvetCurtain: React.FC<VelvetCurtainProps> = ({ forceVisible = false }) => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  // Track chapter changes to trigger curtain animations
  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }

    // Show curtain on chapter change
    setIsVisible(true);
    setIsClosed(true);
    setIsOpen(false);
    
    // Open curtain after a delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      setIsClosed(false);
      
      // Hide curtain after it's fully open
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      
      return () => clearTimeout(hideTimer);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [state.currentChapterIndex, forceVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 z-[100] pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="velvet-curtain"
    >
      {/* Left curtain */}
      <div 
        className={`
          absolute top-0 bottom-0 left-0 w-1/2 bg-red-900
          transition-transform duration-2000 ease-in-out
          ${isOpen ? '-translate-x-full' : 'translate-x-0'}
          ${isClosed ? 'translate-x-0' : ''}
        `}
        style={{
          backgroundImage: 'url(/assets/images/pss/pss-ch01-velvet-curtain-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.8)'
        }}
      />
      
      {/* Right curtain */}
      <div 
        className={`
          absolute top-0 bottom-0 right-0 w-1/2 bg-red-900
          transition-transform duration-2000 ease-in-out
          ${isOpen ? 'translate-x-full' : 'translate-x-0'}
          ${isClosed ? 'translate-x-0' : ''}
        `}
        style={{
          backgroundImage: 'url(/assets/images/pss/pss-ch01-velvet-curtain-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.8)'
        }}
      />
    </div>
  );
};

export default VelvetCurtain;