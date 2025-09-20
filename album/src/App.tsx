import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import ChapterNavigation from './components/navigation/ChapterNavigation';
import NavigationButtons from './components/navigation/NavigationButtons';
import NarrativePanel from './components/narrative/NarrativePanel';
import AudioPlayer from './components/audio/AudioPlayer';
import Insignia from './components/visual/Insignia';
import ChapterHeader from './components/chapter/ChapterHeader';
import './App.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading assets
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AppProvider>
      <Layout>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Insignia />
            <h1 className="text-4xl font-bold mb-4 mt-8">Pop Song Summer</h1>
            <p className="text-xl mb-8">Immersive Album Experience</p>
            <p className="text-lg animate-pulse">Loading...</p>
          </div>
        ) : (
          <>
            {/* Chapter header */}
            <ChapterHeader />
            
            {/* Main content */}
            <div className="flex flex-col md:flex-row min-h-screen">
              {/* Chapter navigation */}
              <ChapterNavigation />
              
              {/* Narrative content */}
              <div className="flex-grow flex items-center justify-center p-4 md:p-8">
                <NarrativePanel />
              </div>
            </div>
            
            {/* Navigation buttons */}
            <NavigationButtons />
            
            {/* Audio player */}
            <AudioPlayer />
          </>
        )}
      </Layout>
    </AppProvider>
  );
};

export default App;
