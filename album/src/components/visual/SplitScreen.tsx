import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const SplitScreen: React.FC = () => {
  const { state, getCurrentPanel } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [leftContent, setLeftContent] = useState<string | null>(null);
  const [rightContent, setRightContent] = useState<string | null>(null);

  useEffect(() => {
    const currentPanel = getCurrentPanel();
    if (currentPanel?.split_screen) {
      setIsVisible(true);
      
      // For a real implementation, we would parse the panel content
      // to determine what goes on each side of the split screen.
      // For now, we'll use a simple approach:
      
      const textParts = currentPanel.text.split('||');
      if (textParts.length >= 2) {
        setLeftContent(textParts[0].trim());
        setRightContent(textParts[1].trim());
      } else {
        // If no split marker is found, use the quote (if any) on the left
        // and the main text on the right
        setLeftContent(currentPanel.quote || null);
        setRightContent(currentPanel.text);
      }
    } else {
      setIsVisible(false);
    }
  }, [state.currentChapterIndex, state.currentPanelIndex, getCurrentPanel]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left side */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black bg-opacity-70 p-6 flex items-center justify-center">
          {leftContent && (
            <div className="prose prose-invert max-w-prose">
              <div dangerouslySetInnerHTML={{ __html: leftContent }} />
            </div>
          )}
        </div>
        
        {/* Right side */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-900 bg-opacity-70 p-6 flex items-center justify-center">
          {rightContent && (
            <div className="prose prose-invert max-w-prose">
              <div dangerouslySetInnerHTML={{ __html: rightContent }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitScreen;