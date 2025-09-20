import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const BackgroundScene: React.FC = () => {
  const { getCurrentChapter, getCurrentPanel } = useAppContext();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(0);
  
  const currentChapter = getCurrentChapter();
  const currentPanel = getCurrentPanel();
  
  // Determine the appropriate background image based on the current panel
  useEffect(() => {
    if (!currentChapter || !currentPanel) {
      setBackgroundImage(null);
      return;
    }
    
    // Reset opacity when changing images
    setOpacity(0);
    
    // Map panel properties to specific background images
    let bgImage = null;
    
    // Burning Houses
    if (currentPanel.has_burning) {
      bgImage = '/assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-svg-v001-20250831-jh-final.svg';
    }
    
    // Light Rays
    if (currentPanel.has_light_rays) {
      bgImage = '/assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-svg-v001-20250831-jh-final.svg';
    }
    
    // Light Burst
    if (currentPanel.has_light_burst) {
      bgImage = '/assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-svg-v001-20250831-jh-final.svg';
    }
    
    // Door
    if (currentPanel.has_door) {
      bgImage = '/assets/images/pss/pss-twelve-doors-diagram-receipt-scene-ar16x9-svg-v001-20250831-jh-final.svg';
    }
    
    // Road
    if (currentPanel.has_road) {
      bgImage = '/assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-svg-v001-20250831-jh-final.svg';
    }
    
    // Set the background image
    setBackgroundImage(bgImage);
    
    // Fade in the background image
    if (bgImage) {
      const timer = setTimeout(() => {
        setOpacity(0.3); // Semi-transparent to not distract from content
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentChapter, currentPanel]);
  
  if (!backgroundImage) {
    return null;
  }
  
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity,
        transition: 'opacity 1s ease-in-out',
      }}
      aria-hidden="true"
    />
  );
};

export default BackgroundScene;