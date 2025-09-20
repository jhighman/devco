# Pop Song Summer - React Implementation

A React-based implementation of the Pop Song Summer interactive album experience.

## Project Overview

This project is a reimagining of the Pop Song Summer interactive storytelling experience using React, TypeScript, and Tailwind CSS. It features a mobile-first, component-based approach with responsive design and immersive visual and audio elements.

## Features

- **Interactive Storytelling**: Navigate through chapters and panels of narrative content
- **Audio Integration**: Synchronized audio playback with controls
- **Visual Effects**: Canvas-based effects that respond to chapter and panel content
- **Scene Imagery**: Dynamic scene images based on metadata from the original assets
- **Responsive Design**: Works on mobile and desktop with different layouts
- **Accessibility**: Screen reader support and keyboard navigation
- **Event-Driven Architecture**: Components respond to state changes for a more dynamic experience

## Project Structure

```
album/
├── public/                  # Static assets
│   ├── assets/              # Images and other assets
│   │   └── images/
│   │       └── pss/         # Project-specific images from metadata
│   └── music/               # Audio files for each chapter
├── scripts/                 # Utility scripts
│   └── copy-assets.sh       # Script to copy assets from original location
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── audio/           # Audio-related components
│   │   ├── common/          # Shared/utility components
│   │   ├── layout/          # Layout components
│   │   ├── narrative/       # Narrative content components
│   │   ├── navigation/      # Navigation components
│   │   └── visual/          # Visual effects components
│   ├── context/             # React Context API
│   ├── data/                # Data files (chapters, assets)
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.css              # Global styles
│   ├── App.tsx              # Main App component
│   ├── index.css            # Entry point styles
│   └── index.tsx            # Entry point
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the album directory:
   ```
   cd album
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
4. Copy the necessary assets:
   ```
   chmod +x scripts/copy-assets.sh
   ./scripts/copy-assets.sh
   ```
   This script will copy all the required image and audio assets from the original location to the album/public directory.

### Running the Application

Start the development server:
```
npm start
```
or
```
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Asset Placeholders

This project includes placeholder assets in the following locations:

- `/public/assets/images/pss/` - Image assets
- `/public/music/` - Audio files

In a production environment, these placeholders should be replaced with actual assets.

## Key Components

- **Layout**: Main layout component with debug panel
- **ChapterNavigation**: Navigation between chapters
- **ChapterHeader**: Displays chapter header images at the beginning of each chapter
- **NarrativePanel**: Displays chapter content with navigation controls and triggers visual effects
- **SceneImage**: Shows scene images based on the current panel's content
- **BackgroundScene**: Provides full-screen background imagery based on panel context
- **AudioPlayer**: Handles audio playback with progress bar and controls
- **Canvas**: Creates dynamic visual effects using HTML5 Canvas based on current panel
- **Insignia**: Displays the "Insignia of the Sun" motif with animation options
- **VelvetCurtain**: Animated curtain effect that transitions between chapters
- **TwelveDoorsEffect**: Visual representation of the twelve doors diagram
- **BurningHousesEffect**: Animated effect of houses burning on the horizon
- **PatchOverHeart**: Displays the sun patch pinned over the heart
- **HallOfMirrors**: A corridor of warped mirrors showing different ages/selves
- **ChurchOfLight**: Disco-temple mood with columns of light
- **MotelNeonExodus**: Roadside motel with neon OPEN sign
- **DinerFloRefrain**: Retro diner interior with Flo character
- **RollerRinkShelter**: Roller rink used as a shelter with disco elements
- **AiryRadioChorus**: Car dashboard with glowing radio
- **CornerChalkSun**: City corner with chalk circle and crate
- **OrangesPerimeter**: Spilled oranges like small suns along a perimeter
- **BlindManSinging**: Street scene with blind singer and sound wave effects
- **BridgesExodusChorus**: Night bridge full of pedestrians
- **SunroomRadio**: Tiny upstairs pirate radio studio with sunlight
- **HeliographStorageUnit**: Storage unit with ritual setup and light beam

## State Management and Event-Driven Architecture

The application uses React's Context API for state management with an event-driven approach:

- **Central State**: Includes current chapter, panel, audio playback, and visual effects
- **Event-Based Updates**: Components respond to state changes rather than being directly controlled
- **Visual Effect States**: Each panel defines its visual effects (insignia, burning, light rays, etc.)
- **Dynamic Rendering**: Visual components automatically update based on the current panel's properties

This approach offers several advantages:
1. **Decoupled Components**: Visual effects respond to state changes without direct dependencies
2. **Consistent State**: Single source of truth for the application state
3. **Declarative Effects**: Panel data declares what effects should be shown rather than how
4. **Easier Maintenance**: Adding new effects or modifying existing ones requires minimal changes

## Responsive Design

The application is built with a mobile-first approach:

- Bottom navigation on mobile, side navigation on desktop
- Adjusted font sizes and spacing for different screen sizes
- Optimized layout for both portrait and landscape orientations

## Accessibility

Accessibility features include:

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## Development Notes

- The debug mode can be toggled using the "Debug" button in the top-right corner
- Components respond to state changes rather than relying on fixed z-index layering
- Visual effects are defined in the chapter data and automatically applied when panels change
- Each panel can specify multiple visual effects that work together to create the desired atmosphere
- Scene images are dynamically selected based on panel content and metadata
- Chapter header images provide visual context at the beginning of each chapter
- The visual components are designed to be responsive to the current chapter and panel context
- Many visual effects include animations that are triggered based on state changes
- Components use CSS animations, transitions, and dynamic styling for visual effects
- Each visual component is isolated and focused on a specific scene or effect

## Asset Integration

The application integrates visual assets from the original project using metadata to determine the appropriate images for each chapter and panel:

1. **Metadata-Driven Selection**: Scene images are selected based on panel content and metadata
2. **Dynamic Rendering**: Images are loaded and displayed based on the current context
3. **Layered Approach**:
   - Background scenes provide atmospheric context
   - Scene images illustrate specific narrative moments
   - Visual effects enhance the storytelling experience
   - Chapter headers set the tone for each chapter

The assets are organized in the following structure:
- Chapter-specific scene images (e.g., velvet curtain, burning houses)
- Chapter header images for each of the 10 chapters
- Global assets used across multiple chapters (e.g., insignia of the sun)

The `copy-assets.sh` script ensures all necessary assets are available in the correct location.

## Visual Components

The application includes a rich set of visual components that bring the narrative to life:

### Core Visual Elements
- **Insignia**: The central "Insignia of the Sun" motif that appears throughout the experience
- **BackgroundScene**: Dynamic backgrounds that change based on the current panel
- **Canvas**: Base component for dynamic visual effects using HTML5 Canvas

### Chapter-Specific Scenes
- **VelvetCurtain**: Animated curtain transition effect between chapters
- **HallOfMirrors**: Corridor of warped mirrors showing different ages/selves
- **ChurchOfLight**: Disco-temple mood with columns of light and ritual elements
- **BurningHousesEffect**: Houses burning on the horizon with animated flames
- **MotelNeonExodus**: Roadside motel with flickering neon OPEN sign
- **DinerFloRefrain**: Retro diner interior with waitress character and jukebox
- **RollerRinkShelter**: Roller rink used as emergency shelter with disco elements
- **CornerChalkSun**: City corner with chalk sun circle and wooden crate
- **OrangesPerimeter**: Oranges arranged along a perimeter fence as wards
- **BlindManSinging**: Street scene with blind singer and visualized sound waves
- **BridgesExodusChorus**: Night bridge filled with pedestrians in exodus
- **SunroomRadio**: Upstairs pirate radio studio with streaming sunlight
- **HeliographStorageUnit**: Storage unit with ritual setup and projected light beam

### Interactive Elements
- **DoorEffect**: Animated door that appears in specific narrative moments
- **KeyEffect**: Key visual that appears when mentioned in the narrative
- **RoadEffect**: Desert highway visualization
- **SunEffect**: Sun and light ray effects
- **PatchOverHeart**: The sun patch insignia worn by characters

### Display Elements
- **NeonTitle**: Stylized neon text for titles
- **SplitScreen**: Split-screen effect for decision points
- **Epilogue**: Special visual treatment for epilogue content
- **TwelveDoorsEffect**: Visual representation of the twelve doors diagram

Each visual component is designed to appear at specific points in the narrative, triggered by the current chapter and panel context. The components use a combination of CSS animations, transitions, and dynamic styling to create immersive visual effects that enhance the storytelling experience.
