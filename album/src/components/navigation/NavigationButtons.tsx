import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActionType } from '../../types';

const NavigationButtons: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { currentChapterIndex, currentPanelIndex, chapters } = state;
  const [audioAvailable, setAudioAvailable] = useState(true);
  
  // Get the current chapter
  const currentChapter = chapters[currentChapterIndex];
  
  // Check if audio is available for the current chapter
  useEffect(() => {
    if (!currentChapter?.audioUrl) {
      setAudioAvailable(false);
      return;
    }
    
    // Check if the audio file exists
    fetch(currentChapter.audioUrl)
      .then(response => {
        setAudioAvailable(response.ok);
      })
      .catch(() => {
        setAudioAvailable(false);
      });
  }, [currentChapter]);
  
  // Calculate if we can go to previous or next panel/chapter
  const hasPrevious = currentPanelIndex > 0 || currentChapterIndex > 0;
  const hasNext = (currentChapter && currentPanelIndex < currentChapter.panels.length - 1) ||
                  currentChapterIndex < chapters.length - 1;
  
  // Handle navigation to previous panel or chapter
  const handlePreviousPanel = () => {
    if (currentPanelIndex > 0) {
      // Go to previous panel in current chapter
      dispatch({ type: ActionType.SET_PANEL, payload: currentPanelIndex - 1 });
    } else if (currentChapterIndex > 0) {
      // Go to last panel of previous chapter
      const previousChapter = chapters[currentChapterIndex - 1];
      dispatch({ type: ActionType.SET_CHAPTER, payload: currentChapterIndex - 1 });
      dispatch({ type: ActionType.SET_PANEL, payload: previousChapter.panels.length - 1 });
    }
  };
  
  // Handle navigation to next panel or chapter
  const handleNextPanel = () => {
    if (currentChapter && currentPanelIndex < currentChapter.panels.length - 1) {
      // Go to next panel in current chapter
      dispatch({ type: ActionType.SET_PANEL, payload: currentPanelIndex + 1 });
    } else if (currentChapterIndex < chapters.length - 1) {
      // Go to first panel of next chapter
      dispatch({ type: ActionType.SET_CHAPTER, payload: currentChapterIndex + 1 });
      dispatch({ type: ActionType.SET_PANEL, payload: 0 });
    }
  };
  
  // Handle play/pause toggle
  const togglePlayPause = () => {
    dispatch({ type: ActionType.TOGGLE_PLAY });
  };
  
  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-4 z-[500]">
      <button
        onClick={handlePreviousPanel}
        disabled={!hasPrevious}
        className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          hasPrevious
            ? 'bg-navy text-white hover:bg-opacity-90 active:transform active:scale-95'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
        aria-label="Previous panel"
      >
        ← Previous
      </button>
      
      {/* Play/Pause toggle button */}
      <button
        onClick={audioAvailable ? togglePlayPause : undefined}
        disabled={!audioAvailable}
        className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          audioAvailable
            ? 'bg-navy text-white hover:bg-opacity-90 active:transform active:scale-95'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
        aria-label={state.isPlaying ? 'Pause' : 'Play'}
        title={audioAvailable ? (state.isPlaying ? 'Pause' : 'Play') : 'Audio not available'}
      >
        {state.isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      <button
        onClick={handleNextPanel}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
          hasNext
            ? 'bg-navy text-white hover:bg-opacity-90 active:transform active:scale-95'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
        aria-label="Next panel"
      >
        Next →
      </button>
    </div>
  );
};

export default NavigationButtons;