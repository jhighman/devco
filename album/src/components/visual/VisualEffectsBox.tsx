import React from 'react';
import { useAppContext } from '../../context/AppContext';
import SceneImage from './SceneImage';
import Insignia from './Insignia';
import BurningHousesEffect from './BurningHousesEffect';
import DoorEffect from './DoorEffect';
import KeyEffect from './KeyEffect';
import SunEffect from './SunEffect';
import RoadEffect from './RoadEffect';
import WomanInRed from './WomanInRed';
import HallOfMirrors from './HallOfMirrors';
import BlindManSinging from './BlindManSinging';
import VelvetCurtain from './VelvetCurtain';
import NeonTitle from './NeonTitle';
import BackgroundScene from './BackgroundScene';
import SplitScreen from './SplitScreen';
import Epilogue from './Epilogue';
import TwelveDoorsEffect from './TwelveDoorsEffect';
import PatchOverHeart from './PatchOverHeart';
import ChurchOfLight from './ChurchOfLight';
import MotelNeonExodus from './MotelNeonExodus';
import DinerFloRefrain from './DinerFloRefrain';
import RollerRinkShelter from './RollerRinkShelter';
import AiryRadioChorus from './AiryRadioChorus';
import CornerChalkSun from './CornerChalkSun';
import OrangesPerimeter from './OrangesPerimeter';
import BridgesExodusChorus from './BridgesExodusChorus';
import SunroomRadio from './SunroomRadio';
import HeliographStorageUnit from './HeliographStorageUnit';

// This empty export ensures TypeScript treats this file as a module
export {};

interface VisualEffectsBoxProps {
  className?: string;
}

const VisualEffectsBox: React.FC<VisualEffectsBoxProps> = ({ className = '' }) => {
  const { state, getCurrentPanel } = useAppContext();
  
  const currentPanel = getCurrentPanel();
  
  return (
    <div
      className={`visual-effects-box relative ${className} bg-black rounded-lg overflow-hidden border-2 border-gray-800 shadow-lg h-full`}
      style={{
        minHeight: '300px',
      }}
    >
      {/* Background scene - positioned at the very back */}
      <div className="absolute inset-0 z-0">
        <BackgroundScene />
      </div>
      
      {/* TV-like frame effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-transparent to-black opacity-20"></div>
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-black via-transparent to-black opacity-20"></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-10"></div>
      
      {/* Debug information - only visible in debug mode */}
      {state.isDebugMode && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-70 text-white p-2 text-xs z-20">
          Panel: {currentPanel?.id} - {currentPanel?.title}
        </div>
      )}
      
      {/* Visual effects container - all visual effects are contained here */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Scene image */}
        <div className="absolute inset-0 flex items-center justify-center z-1">
          <SceneImage className="w-full h-full object-contain" />
        </div>
        
        {/* Insignia effect */}
        <div className="absolute inset-0 z-2">
          <Insignia />
        </div>
        
        {/* Burning houses effect */}
        <div className="absolute inset-0 z-3">
          <BurningHousesEffect />
        </div>
        
        {/* Door effect */}
        <div className="absolute inset-0 z-4">
          <DoorEffect />
        </div>
        
        {/* Key effect */}
        <div className="absolute inset-0 z-5">
          <KeyEffect />
        </div>
        
        {/* Sun effect */}
        <div className="absolute inset-0 z-6">
          <SunEffect />
        </div>
        
        {/* Road effect */}
        <div className="absolute inset-0 z-7">
          <RoadEffect />
        </div>
        
        {/* Woman in red */}
        <div className="absolute inset-0 z-8">
          <WomanInRed />
        </div>
        
        {/* Hall of mirrors */}
        <div className="absolute inset-0 z-9">
          <HallOfMirrors />
        </div>
        
        {/* Blind man singing */}
        <div className="absolute inset-0 z-10">
          <BlindManSinging />
        </div>
        
        {/* Velvet curtain */}
        <div className="absolute inset-0 z-11">
          <VelvetCurtain />
        </div>
        
        {/* Neon title */}
        <div className="absolute inset-0 z-12">
          <NeonTitle />
        </div>
        
        {/* Split Screen */}
        <div className="absolute inset-0 z-13">
          <SplitScreen />
        </div>
        
        {/* Epilogue */}
        <div className="absolute inset-0 z-14">
          <Epilogue />
        </div>
        
        {/* Twelve Doors Effect */}
        <div className="absolute inset-0 z-15">
          <TwelveDoorsEffect />
        </div>
        
        {/* Patch Over Heart */}
        <div className="absolute inset-0 z-16">
          <PatchOverHeart />
        </div>
        
        {/* Church Of Light */}
        <div className="absolute inset-0 z-17">
          <ChurchOfLight />
        </div>
        
        {/* Motel Neon Exodus */}
        <div className="absolute inset-0 z-18">
          <MotelNeonExodus />
        </div>
        
        {/* Diner Flo Refrain */}
        <div className="absolute inset-0 z-19">
          <DinerFloRefrain />
        </div>
        
        {/* Roller Rink Shelter */}
        <div className="absolute inset-0 z-20">
          <RollerRinkShelter />
        </div>
        
        {/* Airy Radio Chorus */}
        <div className="absolute inset-0 z-21">
          <AiryRadioChorus />
        </div>
        
        {/* Corner Chalk Sun */}
        <div className="absolute inset-0 z-22">
          <CornerChalkSun />
        </div>
        
        {/* Oranges Perimeter */}
        <div className="absolute inset-0 z-23">
          <OrangesPerimeter />
        </div>
        
        {/* Bridges Exodus Chorus */}
        <div className="absolute inset-0 z-24">
          <BridgesExodusChorus />
        </div>
        
        {/* Sunroom Radio */}
        <div className="absolute inset-0 z-25">
          <SunroomRadio />
        </div>
        
        {/* Heliograph Storage Unit */}
        <div className="absolute inset-0 z-26">
          <HeliographStorageUnit />
        </div>
      </div>
    </div>
  );
};

export default VisualEffectsBox;