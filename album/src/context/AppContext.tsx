import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { Chapter, Panel, AppState, Action, ActionType, VisualEffectState } from '../types';
import { chapters } from '../data/chapters';

// Default visual effects state
const defaultVisualEffects: VisualEffectState = {
  insignia: {
    visible: false,
    large: false,
    position: 'center',
    rotate: false,
    pulse: false,
    opacity: 0.8,
  },
  burning: {
    visible: false,
    intensity: 0.5,
  },
  lightRays: {
    visible: false,
    intensity: 0.5,
    color: 'white',
  },
  lightBurst: {
    visible: false,
    intensity: 0.5,
  },
  door: {
    visible: false,
  },
  road: {
    visible: false,
  },
  sun: {
    visible: false,
  },
  key: {
    visible: false,
  },
  womanInRed: {
    visible: false,
  },
  blindManSinging: {
    visible: false,
  },
  hallOfMirrors: {
    visible: false,
  },
  churchOfLight: {
    visible: false,
  },
  patchOverHeart: {
    visible: false,
  },
  motelNeonExodus: {
    visible: false,
  },
  bridgesExodusChorus: {
    visible: false,
  },
  orangesPerimeter: {
    visible: false,
  },
  heliographStorageUnit: {
    visible: false,
  },
  cornerChalkSun: {
    visible: false,
  },
  rollerRinkShelter: {
    visible: false,
  },
  dinerFloRefrain: {
    visible: false,
  },
  twelveDoorsEffect: {
    visible: false,
  },
  sunroomRadio: {
    visible: false,
  },
  airyRadioChorus: {
    visible: false,
  },
};

// Default state
const defaultState: AppState = {
  currentChapterIndex: 0,
  currentPanelIndex: 0,
  isPlaying: false,
  isDebugMode: false,
  isDebugVisible: false,
  volume: 0.8,
  chapters: chapters,
  currentEnvironment: typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'development' : 'production',
  visualEffects: defaultVisualEffects,
};

// Reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionType.SET_CHAPTER:
      return {
        ...state,
        currentChapterIndex: action.payload,
        currentPanelIndex: 0, // Reset panel index when changing chapters
        isPlaying: false, // Pause audio when changing chapters
      };
    case ActionType.SET_PANEL:
      return {
        ...state,
        currentPanelIndex: action.payload,
      };
    case ActionType.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case ActionType.TOGGLE_DEBUG:
      return {
        ...state,
        isDebugVisible: !state.isDebugVisible,
      };
    case ActionType.SET_VOLUME:
      return {
        ...state,
        volume: Math.max(0, Math.min(1, action.payload)), // Ensure volume is between 0 and 1
      };
    case ActionType.UPDATE_VISUAL_EFFECTS:
      return {
        ...state,
        visualEffects: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getCurrentChapter: () => Chapter | undefined;
  getCurrentPanel: () => Panel | undefined;
  updateVisualEffectsForPanel: (panel: Panel) => void;
}>({
  state: defaultState,
  dispatch: () => {},
  getCurrentChapter: () => undefined,
  getCurrentPanel: () => undefined,
  updateVisualEffectsForPanel: () => {},
});

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  // Helper functions to get current chapter and panel
  const getCurrentChapter = useCallback((): Chapter | undefined => {
    return state.chapters[state.currentChapterIndex];
  }, [state.chapters, state.currentChapterIndex]);

  const getCurrentPanel = useCallback((): Panel | undefined => {
    const chapter = getCurrentChapter();
    return chapter?.panels[state.currentPanelIndex];
  }, [getCurrentChapter, state.currentPanelIndex]);

  // Function to update visual effects based on panel properties
  const updateVisualEffectsForPanel = useCallback((panel: Panel) => {
    if (!panel) return;

    const newVisualEffects: VisualEffectState = {
      ...defaultVisualEffects,
      insignia: {
        ...defaultVisualEffects.insignia,
        visible: !!panel.has_insignia,
        large: !!panel.large_insignia,
        pulse: !!panel.has_insignia && !!panel.large_insignia,
      },
      burning: {
        ...defaultVisualEffects.burning,
        visible: !!panel.has_burning,
        intensity: panel.has_burning ? 0.7 : 0,
      },
      lightRays: {
        ...defaultVisualEffects.lightRays,
        visible: !!panel.has_light_rays,
        intensity: panel.has_light_rays ? 0.7 : 0,
        color: panel.neon_color || 'white',
      },
      lightBurst: {
        ...defaultVisualEffects.lightBurst,
        visible: !!panel.has_light_burst,
        intensity: panel.has_light_burst ? 0.9 : 0,
      },
      door: {
        ...defaultVisualEffects.door,
        visible: !!panel.has_door,
      },
      road: {
        ...defaultVisualEffects.road,
        visible: !!panel.has_road,
      },
      sun: {
        ...defaultVisualEffects.sun,
        visible: !!panel.has_sun,
      },
      key: {
        ...defaultVisualEffects.key,
        visible: !!panel.has_key,
      },
      womanInRed: {
        ...defaultVisualEffects.womanInRed,
        visible: !!panel.has_woman_in_red,
      },
      blindManSinging: {
        ...defaultVisualEffects.blindManSinging,
        visible: !!panel.has_blind_man_singing,
      },
      hallOfMirrors: {
        ...defaultVisualEffects.hallOfMirrors,
        visible: !!panel.has_hall_of_mirrors,
      },
      churchOfLight: {
        ...defaultVisualEffects.churchOfLight,
        visible: !!panel.has_church_of_light,
      },
      patchOverHeart: {
        ...defaultVisualEffects.patchOverHeart,
        visible: !!panel.has_patch_over_heart,
      },
      motelNeonExodus: {
        ...defaultVisualEffects.motelNeonExodus,
        visible: !!panel.has_motel_neon_exodus,
      },
      bridgesExodusChorus: {
        ...defaultVisualEffects.bridgesExodusChorus,
        visible: !!panel.has_bridges_exodus_chorus,
      },
      orangesPerimeter: {
        ...defaultVisualEffects.orangesPerimeter,
        visible: !!panel.has_oranges_perimeter,
      },
      heliographStorageUnit: {
        ...defaultVisualEffects.heliographStorageUnit,
        visible: !!panel.has_heliograph_storage_unit,
      },
      cornerChalkSun: {
        ...defaultVisualEffects.cornerChalkSun,
        visible: !!panel.has_corner_chalk_sun,
      },
      rollerRinkShelter: {
        ...defaultVisualEffects.rollerRinkShelter,
        visible: !!panel.has_roller_rink_shelter,
      },
      dinerFloRefrain: {
        ...defaultVisualEffects.dinerFloRefrain,
        visible: !!panel.has_diner_flo_refrain,
      },
      twelveDoorsEffect: {
        ...defaultVisualEffects.twelveDoorsEffect,
        visible: !!panel.has_twelve_doors,
      },
      sunroomRadio: {
        ...defaultVisualEffects.sunroomRadio,
        visible: !!panel.has_sunroom_radio,
      },
      airyRadioChorus: {
        ...defaultVisualEffects.airyRadioChorus,
        visible: !!panel.has_airy_radio_chorus,
      },
    };

    dispatch({ type: ActionType.UPDATE_VISUAL_EFFECTS, payload: newVisualEffects });
  }, [dispatch]);

  // Update visual effects when chapter or panel changes
  useEffect(() => {
    const currentPanel = getCurrentPanel();
    if (currentPanel) {
      updateVisualEffectsForPanel(currentPanel);
    }
  }, [state.currentChapterIndex, state.currentPanelIndex, getCurrentPanel, updateVisualEffectsForPanel]);

  // Effect to handle audio playback (placeholder for now)
  useEffect(() => {
    // Audio playback logic will go here
    // This will be implemented when we create the AudioPlayer component
  }, [state.isPlaying, state.currentChapterIndex, state.volume]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        getCurrentChapter,
        getCurrentPanel,
        updateVisualEffectsForPanel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);