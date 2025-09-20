import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { AppProvider } from '../../../context/AppContext';
import { ActionType } from '../../../types';
import HallOfMirrors from '../HallOfMirrors';
import ChurchOfLight from '../ChurchOfLight';
import VelvetCurtain from '../VelvetCurtain';
import WomanInRed from '../WomanInRed';

// Mock the AppContext to control the state
// Mock the AppContext
jest.mock('../../../context/AppContext');

// Import the mocked module
const { useAppContext } = require('../../../context/AppContext');

// Create a mock state that we'll update for each test
const createMockState = (chapterIndex: number, panelIndex: number) => ({
  currentChapterIndex: chapterIndex,
  currentPanelIndex: panelIndex,
  isPlaying: false,
  isDebugMode: false,
  isDebugVisible: false,
  volume: 0.8,
  chapters: [],
  visualEffects: {
    insignia: { visible: false, large: false, position: 'center', rotate: false, pulse: false, opacity: 0.8 },
    burning: { visible: false, intensity: 0.5 },
    lightRays: { visible: false, intensity: 0.5, color: 'white' },
    lightBurst: { visible: false, intensity: 0.5 },
    door: { visible: false },
    road: { visible: false },
    sun: { visible: false },
    key: { visible: false },
    womanInRed: { visible: false },
  },
});

// Helper function to update the mock context state
const updateMockContextState = (chapterIndex: number, panelIndex: number) => {
  // Reset the mock before setting a new implementation
  useAppContext.mockReset();
  
  // Set the new mock implementation
  useAppContext.mockReturnValue({
    state: createMockState(chapterIndex, panelIndex),
    dispatch: jest.fn(),
    getCurrentChapter: jest.fn(),
    getCurrentPanel: jest.fn(),
    updateVisualEffectsForPanel: jest.fn(),
  });
};

describe('Chapter 1 Visual Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup(); // Clean up the DOM between tests
  });

  afterEach(() => {
    cleanup(); // Clean up the DOM after each test
  });

  describe('VelvetCurtain', () => {
    it('should be visible during chapter transitions', () => {
      // Set up the context for chapter 1
      updateMockContextState(0, 0);
      
      // Render the component
      render(<VelvetCurtain />);
      
      // The component should be visible (not returning null)
      // We can't directly test visibility since it's controlled by internal state and setTimeout
      // But we can check if the component renders its main div
      const curtainElement = screen.getByTestId('velvet-curtain');
      expect(curtainElement).toBeInTheDocument();
      
      // We can't directly test the style of child elements with Testing Library
      // This would require adding data-testid to the child elements
      // For now, we'll just check that the component is rendered
    });
  });

  describe('HallOfMirrors', () => {
    it('should be visible in chapter 1, panels 6-8', () => {
      // Test panel 6 (mirror hallway)
      updateMockContextState(0, 6);
      render(<HallOfMirrors />);
      
      // The component should be visible
      const mirrorsElement = screen.getByTestId('hall-of-mirrors');
      expect(mirrorsElement).toBeInTheDocument();
      
      // We can't directly test the style of child elements with Testing Library
      // This would require adding data-testid to the child elements
      // For now, we'll just check that the component is rendered
      
      // Clean up
      jest.clearAllMocks();
      
      // Clean up and render with new state
      jest.clearAllMocks();
      
      // Test panel outside the range
      updateMockContextState(0, 5);
      
      // Render with the new mock state
      const { container } = render(<HallOfMirrors />);
      
      // The component should not be visible (return null)
      expect(container).toBeEmptyDOMElement();
    });
    
    it('should not be visible in other chapters', () => {
      // Test chapter 2, panel 6
      updateMockContextState(1, 6);
      render(<HallOfMirrors />);
      
      // The component should not be visible
      expect(screen.queryByTestId('hall-of-mirrors')).not.toBeInTheDocument();
    });
  });

  describe('ChurchOfLight', () => {
    it('should be visible in chapter 1, panels 8-10', () => {
      // Test panel 9 (ritual chamber)
      updateMockContextState(0, 9);
      render(<ChurchOfLight />);
      
      // The component should be visible
      const churchElement = screen.getByTestId('church-of-light');
      expect(churchElement).toBeInTheDocument();
      
      // We can't directly test the style of child elements with Testing Library
      // This would require adding data-testid to the child elements
      // For now, we'll just check that the component is rendered
      
      // Clean up
      jest.clearAllMocks();
      
      // Clean up and render with new state
      jest.clearAllMocks();
      
      // Test panel outside the range
      updateMockContextState(0, 7);
      
      // Render with the new mock state
      const { container } = render(<ChurchOfLight />);
      
      // The component should not be visible
      expect(container).toBeEmptyDOMElement();
    });
    
    it('should not be visible in other chapters', () => {
      // Test chapter 2, panel 9
      updateMockContextState(1, 9);
      render(<ChurchOfLight />);
      
      // The component should not be visible
      expect(screen.queryByTestId('church-of-light')).not.toBeInTheDocument();
    });
  });

  describe('WomanInRed', () => {
    it('should be visible when triggered by the AppContext', () => {
      // Set up the context with womanInRed effect visible
      const { useAppContext } = require('../../../context/AppContext');
      const mockState = createMockState(0, 5); // Chapter 1, panel 5
      mockState.visualEffects.womanInRed.visible = true;
      
      useAppContext.mockReturnValue({
        state: mockState,
        dispatch: jest.fn(),
        getCurrentChapter: jest.fn(),
        getCurrentPanel: jest.fn(),
        updateVisualEffectsForPanel: jest.fn(),
      });
      
      render(<WomanInRed />);
      
      // The component should be visible
      const womanElement = screen.getByTestId('woman-in-red');
      expect(womanElement).toBeInTheDocument();
      
      // We can't directly test the attributes of child elements with Testing Library
      // This would require adding data-testid to the img element
      // For now, we'll just check that the component is rendered
      
      // Clean up
      jest.clearAllMocks();
      
      // Set up the context with womanInRed effect not visible
      const mockState2 = createMockState(0, 5); // Chapter 1, panel 5
      mockState2.visualEffects.womanInRed.visible = false;
      
      useAppContext.mockReturnValue({
        state: mockState2,
        dispatch: jest.fn(),
        getCurrentChapter: jest.fn(),
        getCurrentPanel: jest.fn(),
        updateVisualEffectsForPanel: jest.fn(),
      });
      
      // Render with the new mock state
      const { container } = render(<WomanInRed />);
      
      // The component should not be visible
      expect(container).toBeEmptyDOMElement();
    });
  });

  // Integration test for multiple components
  describe('Chapter 1 Scene Progression', () => {
    it('should show the correct visual components as the user progresses through panels', () => {
      // Panel 1: VelvetCurtain should be visible
      updateMockContextState(0, 0);
      
      // Test VelvetCurtain
      const { getByTestId: getVelvetTestId } = render(<VelvetCurtain />);
      expect(getVelvetTestId('velvet-curtain')).toBeInTheDocument();
      cleanup();
      
      // Test HallOfMirrors
      const { container: hallContainer } = render(<HallOfMirrors />);
      expect(hallContainer).toBeEmptyDOMElement();
      cleanup();
      
      // Test ChurchOfLight
      const { container: churchContainer } = render(<ChurchOfLight />);
      expect(churchContainer).toBeEmptyDOMElement();
      cleanup();
      
      // Panel 7: HallOfMirrors should be visible
      updateMockContextState(0, 7);
      
      // Test VelvetCurtain
      const { getByTestId: getVelvetTestId2 } = render(<VelvetCurtain />);
      expect(getVelvetTestId2('velvet-curtain')).toBeInTheDocument();
      cleanup();
      
      // Test HallOfMirrors
      const { getByTestId: getHallTestId } = render(<HallOfMirrors />);
      expect(getHallTestId('hall-of-mirrors')).toBeInTheDocument();
      cleanup();
      
      // Test ChurchOfLight
      const { container: churchContainer2 } = render(<ChurchOfLight />);
      expect(churchContainer2).toBeEmptyDOMElement();
      cleanup();
      
      // Panel 9: ChurchOfLight should be visible
      updateMockContextState(0, 9);
      
      // Test VelvetCurtain
      const { getByTestId: getVelvetTestId3 } = render(<VelvetCurtain />);
      expect(getVelvetTestId3('velvet-curtain')).toBeInTheDocument();
      cleanup();
      
      // Test HallOfMirrors
      const { container: hallContainer3 } = render(<HallOfMirrors />);
      expect(hallContainer3).toBeEmptyDOMElement();
      cleanup();
      
      // Test ChurchOfLight
      const { getByTestId: getChurchTestId } = render(<ChurchOfLight />);
      expect(getChurchTestId('church-of-light')).toBeInTheDocument();
      cleanup();
    });
  });
});