import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const NeonTitle: React.FC = () => {
  const { state, getCurrentPanel } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ff00ff');

  useEffect(() => {
    const currentPanel = getCurrentPanel();
    if (currentPanel?.neon_title) {
      setIsVisible(true);
      setTitle(currentPanel.title || '');
      setColor(currentPanel.neon_color || '#ff00ff');
    } else {
      setIsVisible(false);
    }
  }, [state.currentChapterIndex, state.currentPanelIndex, getCurrentPanel]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute top-0 right-0 z-40 pointer-events-none"
      aria-hidden="true"
    >
      <h2
        className="text-lg md:text-xl lg:text-2xl font-bold text-right px-4 py-1 mt-4 mr-4 animate-pulse opacity-70"
        style={{
          color: color,
          textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
          fontFamily: "'Monoton', cursive",
          backdropFilter: 'blur(2px)',
          borderRadius: '8px',
          padding: '0.25rem 0.75rem',
          background: 'rgba(0, 0, 0, 0.5)',
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default NeonTitle;