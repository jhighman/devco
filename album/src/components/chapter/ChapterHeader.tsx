import React, { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActionType } from '../../types';

const ChapterHeader: React.FC = () => {
  const { state, dispatch, getCurrentChapter } = useAppContext();
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const currentChapter = getCurrentChapter();
  
  // Determine the appropriate header image based on the current chapter
  useEffect(() => {
    if (!currentChapter) {
      setHeaderImage(null);
      return;
    }
    
    // Reset visibility when changing chapters
    setIsVisible(false);
    
    // Map chapter number to header image
    let headerSrc = null;
    
    switch (currentChapter.number) {
      case 1:
        headerSrc = '/assets/images/pss/pss-velvet-dancers-song-header-ar3x1-svg-v001-20250831-jh-final.svg';
        break;
      case 2:
        headerSrc = '/assets/images/pss/pss-insignia-of-the-sun-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 3:
        headerSrc = '/assets/images/pss/pss-burning-houses-in-the-distance-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 4:
        headerSrc = '/assets/images/pss/pss-on-the-corner-reading-poetry-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 5:
        headerSrc = '/assets/images/pss/pss-a-blind-man-singing-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 6:
        headerSrc = '/assets/images/pss/pss-out-to-the-other-side-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 7:
        headerSrc = '/assets/images/pss/pss-second-lover-over-and-under-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 8:
        headerSrc = '/assets/images/pss/pss-1985-disco-time-machine-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 9:
        headerSrc = '/assets/images/pss/pss-shadow-drifter-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      case 10:
        headerSrc = '/assets/images/pss/pss-the-end-of-everything-song-header-ar3x1-svg-v001-20250901-jh-final.svg';
        break;
      default:
        headerSrc = null;
    }
    
    setHeaderImage(headerSrc);
    
    // Show the header image when the chapter changes and we're at the first panel
    if (headerSrc && state.currentPanelIndex === 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentChapter, state.currentPanelIndex]);
  
  // Hide the header when navigating past the first panel
  useEffect(() => {
    if (state.currentPanelIndex > 0) {
      setIsVisible(false);
    }
  }, [state.currentPanelIndex]);
  
  // Handle click to dismiss header and go to first panel
  const handleDismiss = useCallback(() => {
    if (isVisible) {
      setIsVisible(false);
      // Advance to the next panel if we're at the first panel
      if (state.currentPanelIndex === 0) {
        setTimeout(() => {
          dispatch({ type: ActionType.SET_PANEL, payload: 1 });
        }, 500); // Wait for fade out animation
      }
    }
  }, [isVisible, state.currentPanelIndex, dispatch]);
  
  // Add keyboard event listener to dismiss header
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisible) {
        handleDismiss();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleDismiss]);
  
  if (!headerImage || !isVisible) {
    return null;
  }
  
  return (
    <div
      className="chapter-header fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50 transition-opacity duration-1000 cursor-pointer"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={handleDismiss}
    >
      <div className="max-w-4xl w-full p-4">
        <img 
          src={headerImage}
          alt={`Chapter ${currentChapter?.number}: ${currentChapter?.title}`}
          className="w-full h-auto"
        />
        
        <div className="text-center mt-8 text-white">
          <h2 className="text-3xl md:text-4xl font-bold">{currentChapter?.title}</h2>
          {currentChapter?.subtitle && (
            <p className="text-xl md:text-2xl mt-2 text-gray-300">{currentChapter.subtitle}</p>
          )}
          <p className="mt-8 text-gray-400">Press any key or click to continue</p>
        </div>
      </div>
    </div>
  );
};

export default ChapterHeader;