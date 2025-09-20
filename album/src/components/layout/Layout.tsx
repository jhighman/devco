import React from 'react';
import { useAppContext } from '../../context/AppContext';
import DebugToggle from '../common/DebugToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useAppContext();
  
  return (
    <div className="min-h-screen bg-black-void text-white">
      <div 
        className="relative max-w-7xl mx-auto"
        data-chapter={state.currentChapterIndex}
      >
        {/* Main content container */}
        <div className="experience-container relative p-0 md:p-5">
          {children}
        </div>
        
        {/* Debug panel */}
        {state.isDebugVisible && (
          <div className="debug-panel fixed top-5 right-0 w-72 max-h-[80vh] bg-black bg-opacity-80 text-gray-200 p-4 rounded-l-lg text-xs overflow-y-auto transition-all duration-300 ease-in-out z-[1000] shadow-lg">
            <h3 className="text-sm font-bold mb-2">Debug Information</h3>
            <div className="space-y-2">
              <p>Current Chapter: {state.currentChapterIndex + 1}</p>
              <p>Current Panel: {state.currentPanelIndex + 1}</p>
              <p>Is Playing: {state.isPlaying ? 'Yes' : 'No'}</p>
              <p>Environment: {state.currentEnvironment}</p>
            </div>
          </div>
        )}
        
        {/* Debug toggle button */}
        <DebugToggle />
      </div>
    </div>
  );
};

export default Layout;