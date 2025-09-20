import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const Epilogue: React.FC = () => {
  const { state, getCurrentPanel } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const currentPanel = getCurrentPanel();
    if (currentPanel?.epilogue) {
      setIsVisible(true);
      setContent(currentPanel.text || '');
      
      // Trigger fade-in animation after a short delay
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setFadeIn(false);
    }
  }, [state.currentChapterIndex, state.currentPanelIndex, getCurrentPanel]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black bg-opacity-90"
      aria-hidden="true"
    >
      <div 
        className={`
          max-w-2xl mx-auto p-8 text-center transition-opacity duration-2000
          ${fadeIn ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-8 text-gray-200">Epilogue</h2>
        
        <div 
          className="prose prose-lg prose-invert mx-auto font-serif leading-relaxed"
          style={{ 
            maxWidth: '65ch',
            letterSpacing: '0.03em',
            lineHeight: '1.8'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        
        <div className="mt-12 text-sm text-gray-400 italic">
          — The End —
        </div>
      </div>
    </div>
  );
};

export default Epilogue;