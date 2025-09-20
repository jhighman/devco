import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActionType } from '../../types';

const DebugToggle: React.FC = () => {
  const { dispatch } = useAppContext();
  
  return (
    <button 
      className="debug-toggle fixed top-5 right-5 bg-black bg-opacity-70 text-gray-200 border border-gray-500 rounded px-2 py-1 text-xs cursor-pointer z-[1001] transition-all duration-300 hover:bg-opacity-80"
      onClick={() => dispatch({ type: ActionType.TOGGLE_DEBUG })}
    >
      Debug
    </button>
  );
};

export default DebugToggle;