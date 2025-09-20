import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import VisualEffectsBox from '../visual/VisualEffectsBox';

const NarrativePanel: React.FC = () => {
  const { state, getCurrentChapter, getCurrentPanel } = useAppContext();
  const panelRef = useRef<HTMLDivElement>(null);
  
  const currentChapter = getCurrentChapter();
  const currentPanel = getCurrentPanel();
  
  // We no longer need to call updateVisualEffectsForPanel here
  // as it's already being called in AppContext.tsx
  
  // Scroll to top when panel changes
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [state.currentChapterIndex, state.currentPanelIndex]);
  
  if (!currentChapter || !currentPanel) {
    return <div className="narrative-panel-empty p-4">No content available</div>;
  }
  
  // Determine if title should have neon effect
  const titleClasses = currentPanel.neon_title
    ? `text-2xl md:text-3xl font-bold mb-4 text-glow ${currentPanel.neon_color ? `text-${currentPanel.neon_color}-500` : 'text-white'}`
    : "text-2xl md:text-3xl font-bold mb-4 text-white";
  
  // Determine if panel should have split screen layout
  const contentClasses = currentPanel.split_screen
    ? "narrative-content grid grid-cols-1 md:grid-cols-2 gap-4 text-lg md:text-xl text-gray-200 leading-relaxed whitespace-pre-line"
    : "narrative-content text-lg md:text-xl text-gray-200 leading-relaxed whitespace-pre-line";
  
  return (
    <div
      ref={panelRef}
      className={`narrative-panel relative w-full max-w-6xl mx-auto p-4 md:p-8 overflow-y-auto ${
        currentPanel.epilogue ? 'epilogue-panel' : ''
      }`}
    >
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:items-stretch">
        {/* Left column: Narrative text */}
        <div className={`narrative-text p-4 md:p-6 rounded-lg h-full flex flex-col ${
          currentPanel.background || 'bg-gradient-to-b from-black-void to-navy'
        }`}>
          {/* Panel title */}
          <h2 className={titleClasses}>
            {currentPanel.title}
          </h2>
          
          {/* Panel content */}
          <div className={contentClasses} style={{ position: 'relative', zIndex: 2 }}>
            {currentPanel.text}
            
            {/* Quote if available */}
            {currentPanel.quote && (
              <blockquote className="my-4 pl-4 border-l-4 border-gray-400 italic">
                {currentPanel.quote}
              </blockquote>
            )}
            
            {/* Text after quote if available */}
            {currentPanel.text_after && (
              <div className="mt-4">
                {currentPanel.text_after}
              </div>
            )}
          </div>
        </div>
        
        {/* Right column: Visual effects box */}
        <div className="visual-effects-container h-full flex items-stretch">
          <VisualEffectsBox className="w-full h-full" />
        </div>
      </div>
      
      {/* Debug info - positioned below the two columns */}
      {state.isDebugMode && (
        <div className="debug-info bg-black bg-opacity-70 text-white p-2 mt-6 text-xs rounded">
          <p>Chapter: {currentChapter.number} - {currentChapter.title}</p>
          <p>Panel: {currentPanel.id} - {currentPanel.title}</p>
          <p>Panel Properties: {Object.keys(currentPanel).filter(key =>
            typeof currentPanel[key as keyof typeof currentPanel] === 'boolean' &&
            currentPanel[key as keyof typeof currentPanel] === true
          ).join(', ')}</p>
        </div>
      )}
      
      {/* Space for additional content if needed */}
      <div className="mt-8"></div>
    </div>
  );
};

export default NarrativePanel;