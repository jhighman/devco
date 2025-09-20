import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

interface SceneImageProps {
  className?: string;
}

const SceneImage: React.FC<SceneImageProps> = ({ className = '' }) => {
  const { state, getCurrentChapter, getCurrentPanel } = useAppContext();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const currentChapter = getCurrentChapter();
  const currentPanel = getCurrentPanel();
  
  // Determine the appropriate image to display based on the current panel
  useEffect(() => {
    if (!currentChapter || !currentPanel) {
      setImageSrc(null);
      return;
    }
    
    // Reset image loaded state when changing images
    setImageLoaded(false);
    
    // Map panel properties to specific scene images
    let sceneImage = null;
    let altText = '';
    
    // Chapter 1: Velvet Dancers
    if (currentChapter.number === 1) {
      if (currentPanel.title === "VELVET CURTAIN") {
        sceneImage = '/assets/images/pss/pss-ch01-velvet-curtain-scene-ar16x9-svg-v001-20250831-jh-final.svg';
        altText = 'A blood-red velvet curtain between shuttered bodegas, with neon light spilling out';
      } else if (currentPanel.title === "RITUAL CHAMBER" || currentPanel.title === "CLUB INTERIOR") {
        sceneImage = '/assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-svg-v001-20250831-jh-final.svg';
        altText = 'A disco-temple back room with light columns and a glowing circle sigil';
      } else if (currentPanel.title === "MIRROR HALLWAY") {
        sceneImage = '/assets/images/pss/pss-ch01-hall-of-mirrors-scene-ar16x9-svg-v001-20250831-jh-final.svg';
        altText = 'A hallway lined with mirrors that show distorted reflections';
      } else if (currentPanel.title === "VELVET DANCERS") {
        sceneImage = '/assets/images/pss/pss-velvet-dancers-song-header-ar3x1-svg-v001-20250831-jh-final.svg';
        altText = 'Dancers in velvet with the sun insignia, moving in hypnotic patterns';
      }
    }
    
    // Chapter 3: Burning Houses in the Distance
    if (currentPanel.has_burning) {
      sceneImage = '/assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-svg-v001-20250831-jh-final.svg';
      altText = 'Distant suburban roofline on fire, orange emberline across horizon';
    }
    
    // Blind Man Singing
    if (currentPanel.title === "BLIND SINGER" || currentPanel.title === "BLIND PROPHET") {
      sceneImage = '/assets/images/pss/pss-ch05-blind-man-singing-scene-ar16x9-svg-v001-20250831-jh-final.svg';
      altText = 'A blind man singing, no mic, just raw voice against the bass';
    }
    
    // Woman in Red
    if (currentPanel.title === "WOMAN IN RED") {
      sceneImage = '/assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-svg-v001-20250831-jh-final.svg';
      altText = 'A woman in a deep red velvet dress with the sun insignia';
    }
    
    // Insignia of the Sun
    if (currentPanel.has_insignia && currentPanel.large_insignia) {
      sceneImage = '/assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg';
      altText = 'The Insignia of the Sun, a gold-thread sunburst with 12 rays';
    }
    
    // Door
    if (currentPanel.has_door) {
      sceneImage = '/assets/images/pss/pss-twelve-doors-diagram-receipt-scene-ar16x9-svg-v001-20250831-jh-final.svg';
      altText = 'A door-shaped hole cut into reality, showing something golden and endless';
    }
    
    // Road
    if (currentPanel.has_road) {
      sceneImage = '/assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-svg-v001-20250831-jh-final.svg';
      altText = 'A desert highway under a sun that never sets';
    }
    
    setImageSrc(sceneImage);
    setImageAlt(altText);
  }, [currentChapter, currentPanel]);
  
  if (!imageSrc) {
    return null;
  }
  
  // Special handling for specific panels to ensure text visibility
  const isMirrorHallway = currentPanel?.title === "MIRROR HALLWAY";
  const isBlindProphet = currentPanel?.title === "BLIND PROPHET";
  const needsSpecialHandling = isMirrorHallway || isBlindProphet;
  
  return (
    <div
      className={`scene-image-container relative overflow-hidden ${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${needsSpecialHandling ? 'mt-8 pt-4 border-t border-gray-700' : ''}`}
      style={{ zIndex: 1 }} // Ensure image stays below text content
    >
      {/* Debug information - only visible in debug mode */}
      {state.isDebugMode && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-70 text-white p-2 text-xs z-10">
          Panel: {currentPanel?.id} - {currentPanel?.title}
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`w-full h-auto object-contain ${needsSpecialHandling ? 'max-h-[400px]' : ''}`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default SceneImage;