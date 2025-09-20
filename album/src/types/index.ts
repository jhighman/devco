// Define the structure of a panel within a chapter
export interface Panel {
  id: string | number;
  title: string;
  background?: string;
  text: string;
  quote?: string;
  text_after?: string;
  imageUrl?: string;
  transition?: string;
  
  // Visual effect flags
  has_insignia?: boolean;
  large_insignia?: boolean;
  has_burning?: boolean;
  has_light_rays?: boolean;
  has_light_burst?: boolean;
  has_door?: boolean;
  has_road?: boolean;
  has_sun?: boolean;
  has_key?: boolean;
  has_woman_in_red?: boolean;
  has_blind_man_singing?: boolean;
  has_hall_of_mirrors?: boolean;
  has_church_of_light?: boolean;
  has_patch_over_heart?: boolean;
  has_motel_neon_exodus?: boolean;
  has_bridges_exodus_chorus?: boolean;
  has_oranges_perimeter?: boolean;
  has_heliograph_storage_unit?: boolean;
  has_corner_chalk_sun?: boolean;
  has_roller_rink_shelter?: boolean;
  has_diner_flo_refrain?: boolean;
  has_twelve_doors?: boolean;
  has_sunroom_radio?: boolean;
  has_airy_radio_chorus?: boolean;
  
  // Display style flags
  neon_title?: boolean;
  neon_color?: string;
  split_screen?: boolean;
  epilogue?: boolean;
}

// Define the structure of a chapter
export interface Chapter {
  id?: string;
  number?: number;
  title: string;
  subtitle?: string;
  audioUrl?: string;
  backgroundImageUrl?: string;
  panels: Panel[];
  color?: string;
  icon?: string;
}

// Define the structure of chapter assets
export interface ChapterAsset {
  headerImage?: string;
  svg?: string;
  audio?: string;
  png?: string;
  used_in_chapters?: number[];
  type?: string;
}

// Define visual effect states
export interface VisualEffectState {
  insignia: {
    visible: boolean;
    large: boolean;
    position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    rotate: boolean;
    pulse: boolean;
    opacity: number;
  };
  burning: {
    visible: boolean;
    intensity: number;
  };
  lightRays: {
    visible: boolean;
    intensity: number;
    color: string;
  };
  lightBurst: {
    visible: boolean;
    intensity: number;
  };
  door: {
    visible: boolean;
  };
  road: {
    visible: boolean;
  };
  sun: {
    visible: boolean;
  };
  key: {
    visible: boolean;
  };
  womanInRed: {
    visible: boolean;
  };
  blindManSinging: {
    visible: boolean;
  };
  hallOfMirrors: {
    visible: boolean;
  };
  churchOfLight: {
    visible: boolean;
  };
  patchOverHeart: {
    visible: boolean;
  };
  motelNeonExodus: {
    visible: boolean;
  };
  bridgesExodusChorus: {
    visible: boolean;
  };
  orangesPerimeter: {
    visible: boolean;
  };
  heliographStorageUnit: {
    visible: boolean;
  };
  cornerChalkSun: {
    visible: boolean;
  };
  rollerRinkShelter: {
    visible: boolean;
  };
  dinerFloRefrain: {
    visible: boolean;
  };
  twelveDoorsEffect: {
    visible: boolean;
  };
  sunroomRadio: {
    visible: boolean;
  };
  airyRadioChorus: {
    visible: boolean;
  };
}

// Define the application state
export interface AppState {
  currentChapterIndex: number;
  currentPanelIndex: number;
  isPlaying: boolean;
  isDebugMode: boolean;
  isDebugVisible: boolean;
  volume: number;
  chapters: Chapter[];
  currentEnvironment?: string;
  visualEffects: VisualEffectState;
}

// Define the action types for the reducer
export enum ActionType {
  SET_CHAPTER = 'SET_CHAPTER',
  SET_PANEL = 'SET_PANEL',
  TOGGLE_PLAY = 'TOGGLE_PLAY',
  TOGGLE_DEBUG = 'TOGGLE_DEBUG',
  SET_VOLUME = 'SET_VOLUME',
  UPDATE_VISUAL_EFFECTS = 'UPDATE_VISUAL_EFFECTS',
}

// Define the structure of actions
export interface Action {
  type: ActionType;
  payload?: any;
}

// Define event types for component communication
export enum EventType {
  CHAPTER_CHANGED = 'CHAPTER_CHANGED',
  PANEL_CHANGED = 'PANEL_CHANGED',
  AUDIO_STATE_CHANGED = 'AUDIO_STATE_CHANGED',
  VISUAL_EFFECT_CHANGED = 'VISUAL_EFFECT_CHANGED',
}

// Define the structure of events
export interface AppEvent {
  type: EventType;
  payload: any;
}