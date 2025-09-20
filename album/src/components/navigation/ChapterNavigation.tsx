import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActionType } from '../../types';

const ChapterNavigation: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const handleChapterClick = (index: number) => {
    dispatch({ type: ActionType.SET_CHAPTER, payload: index });
  };
  
  return (
    <div className="chapter-navigation fixed bottom-0 left-0 w-full md:w-auto md:h-full md:top-0 bg-black bg-opacity-80 z-50">
      <div className="flex flex-row md:flex-col items-center justify-center md:justify-start md:h-full p-2 md:p-4 overflow-x-auto md:overflow-y-auto">
        {state.chapters.map((chapter, index) => (
          <button
            key={chapter.id || index}
            className={`chapter-icon flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 m-1 md:m-2 rounded-full transition-all duration-300 ease-in-out ${
              state.currentChapterIndex === index 
                ? 'bg-white bg-opacity-20 scale-110 border-2 border-white' 
                : 'bg-black bg-opacity-50 hover:bg-opacity-70'
            }`}
            onClick={() => handleChapterClick(index)}
            aria-label={`Chapter ${index + 1}: ${chapter.title}`}
          >
            {chapter.icon ? (
              <img 
                src={chapter.icon} 
                alt={`Icon for ${chapter.title}`} 
                className="w-8 h-8 md:w-10 md:h-10"
              />
            ) : (
              <div 
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold"
                style={{ color: chapter.color || 'white' }}
              >
                {index + 1}
              </div>
            )}
            <span className="text-xs mt-1 text-white opacity-80">
              {chapter.title.length > 10 ? `${chapter.title.substring(0, 10)}...` : chapter.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChapterNavigation;