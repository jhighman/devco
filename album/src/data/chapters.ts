import { Chapter, ChapterAsset } from '../types';
import chapter1 from '../story/chapter1';
import chapter2 from '../story/chapter2';
import chapter3 from '../story/chapter3';
import chapter4 from '../story/chapter4';
import chapter5 from '../story/chapter5';
import chapter6 from '../story/chapter6';

// Environment detection
const currentEnvironment = (() => {
  // Check if we're running on localhost
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'development';
  }
  
  // Check if we're on the devco.band domain
  if (typeof window !== 'undefined' && window.location.hostname.includes('devco.band')) {
    return 'production';
  }
  
  // Default to production for any other domain
  return 'production';
})();

// Base URL configuration for different environments
const baseUrl = {
  development: '',  // Empty string for development since server.js handles parent directory paths
  production: 'https://devco.band'  // Full URL for production to ensure absolute paths
};

// Detect if we're in a subdirectory structure
const isSubdirectory = typeof window !== 'undefined' && window.location.pathname.includes('/album/');

// Asset path prefix for the current environment
const assetPathPrefix = (() => {
  if (currentEnvironment === 'development') {
    return '';
  } else if (isSubdirectory) {
    return '/album';
  } else {
    return '';
  }
})();

// Chapter data with full panel content
export const chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6
];

// Centralized chapter assets including images, SVGs, and audio
// Use the baseUrl and assetPathPrefix for asset paths
const getAssetPath = (path: string) => {
  return `${baseUrl[currentEnvironment]}${assetPathPrefix}${path}`;
};

export const chapterAssets: Record<number | string, ChapterAsset> = {
  0: {
    headerImage: getAssetPath(`/assets/images/pss/velvet-dancers-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch01_velvet-dancers.mp3`)
  },
  1: {
    headerImage: getAssetPath(`/assets/images/pss/insignia-of-the-sun-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch02_insignia-of-the-sun.mp3`)
  },
  2: {
    headerImage: getAssetPath(`/assets/images/pss/burning-houses-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch03_burning-houses-in-the-distance.mp3`)
  },
  3: {
    headerImage: getAssetPath(`/assets/images/pss/on-the-corner-reading-poetry-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch04_on-the-corner-reading-poetry.mp3`)
  },
  4: {
    headerImage: getAssetPath(`/assets/images/pss/a-blind-man-singing-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch05_a-blind-man-singing.mp3`)
  },
  5: {
    headerImage: getAssetPath(`/assets/images/pss/out-to-the-other-side-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch06_out-to-the-other-side.mp3`)
  },
  default: {
    headerImage: getAssetPath(`/assets/images/pss/velvet-dancers-header.png`),
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    audio: getAssetPath(`/music/pss_ch01_velvet-dancers.mp3`)
  }
};

// Global assets for reference
export const globalAssets = {
  insignia_of_the_sun: {
    title: "Insignia of the Sun (Primary Motif)",
    svg: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    png: getAssetPath(`/assets/images/pss/insignia-of-the-sun.svg`),
    used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  woman_in_red: {
    title: "Woman in Red (Archetype)",
    svg: getAssetPath(`/assets/images/pss/woman-in-red.svg`),
    png: getAssetPath(`/assets/images/pss/woman-in-red.svg`),
    used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
};