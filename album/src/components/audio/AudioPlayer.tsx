import React, { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActionType } from '../../types';

const AudioPlayer: React.FC = () => {
  const { state, dispatch, getCurrentChapter } = useAppContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const currentChapter = getCurrentChapter();
  
  // Handle play/pause
  const togglePlayPause = () => {
    dispatch({ type: ActionType.TOGGLE_PLAY });
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    dispatch({ type: ActionType.SET_VOLUME, payload: volume });
  };
  
  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    audioRef.current.currentTime = newTime;
  };
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Update audio element when chapter changes or play state changes
  // State to track if audio is available
  const [audioAvailable, setAudioAvailable] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Reset audio availability when chapter changes
    if (currentChapter?.audioUrl) {
      setAudioAvailable(true);
    }
    
    if (state.isPlaying) {
      if (audioAvailable) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setAudioAvailable(false);
          dispatch({ type: ActionType.TOGGLE_PLAY });
        });
      } else {
        // If audio is not available, just toggle the play state back to paused
        dispatch({ type: ActionType.TOGGLE_PLAY });
      }
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying, state.currentChapterIndex, dispatch, currentChapter, audioAvailable]);
  
  // Update volume when it changes in state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.volume;
  }, [state.volume]);
  
  // Update progress bar as audio plays
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Capture the current audio element reference
    const audioElement = audioRef.current;
    
    const updateProgress = () => {
      if (!audioElement) return;
      
      const currentTime = audioElement.currentTime;
      const duration = audioElement.duration || 0;
      
      setCurrentTime(currentTime);
      setDuration(duration);
      setProgress(duration ? (currentTime / duration) * 100 : 0);
    };
    
    const handleEnded = () => {
      dispatch({ type: ActionType.TOGGLE_PLAY });
      if (audioElement) {
        audioElement.currentTime = 0;
      }
    };
    
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('loadedmetadata', updateProgress);
    
    return () => {
      // Use the captured reference in the cleanup function
      audioElement.removeEventListener('timeupdate', updateProgress);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [dispatch]);
  
  return (
    <div className="audio-player fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-2 md:p-4 z-40">
      <div className="max-w-7xl mx-auto">
        {/* Audio element */}
        <audio
          ref={audioRef}
          src={currentChapter?.audioUrl}
          preload="metadata"
          onError={(e) => {
            console.error('Audio element error:', e);
            setAudioAvailable(false);
            // This will catch errors during loading
            if (state.isPlaying) {
              dispatch({ type: ActionType.TOGGLE_PLAY });
            }
          }}
        />
        
        {/* Audio availability message */}
        {!audioAvailable && currentChapter?.audioUrl && (
          <div className="audio-unavailable text-yellow-400 text-xs text-center mb-2">
            Audio file not available. This is expected in development mode.
          </div>
        )}
        
        {/* Progress bar */}
        <div 
          className="progress-bar w-full h-2 bg-gray-700 rounded-full cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
          <div 
            className="progress-fill h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Play/Pause button */}
          <button
            className={`play-pause-btn w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              audioAvailable
                ? 'bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer'
                : 'bg-gray-500 bg-opacity-10 cursor-not-allowed'
            }`}
            onClick={audioAvailable ? togglePlayPause : undefined}
            disabled={!audioAvailable}
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
            title={audioAvailable ? (state.isPlaying ? 'Pause' : 'Play') : 'Audio not available'}
          >
            {state.isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          {/* Time display */}
          <div className="time-display text-xs md:text-sm text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          {/* Chapter title */}
          <div className="chapter-title text-sm md:text-base font-medium truncate mx-2 flex-grow text-center">
            {currentChapter?.title || 'No chapter selected'}
          </div>
          
          {/* Volume control */}
          <div className="volume-control flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={state.volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;