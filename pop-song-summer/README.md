# Pop Song Summer - Immersive Album Experience

An immersive, narrative-driven web experience for the "Pop Song Summer" album, featuring 10 chapters with canvas visuals, audio-reactive effects, and an engaging storyline.

## Project Overview

Pop Song Summer is a multimedia experience that combines:
- Narrative storytelling across 10 chapters
- Canvas-based visual effects that react to audio
- Interactive elements that progress the story
- Thematic motifs like the "Insignia of the Sun" and the "Woman in Red"

## Running the Project

### Important: ES Modules and CORS

This project uses ES modules for better code organization and modularity. Due to browser security restrictions, ES modules cannot be loaded directly from the filesystem (using the `file://` protocol) as this will result in CORS errors.

To run the project properly, you need to serve the files using a local development server. Here are a few simple options:

#### Option 1: Using the included Node.js server (Recommended)

This project includes a simple Node.js server that you can use to serve the files:

```bash
# Navigate to the project directory
cd /path/to/pop-song-summer

# Start the server using npm
npm start

# Or run the server directly
node server.js
```

The server will automatically try port 3000 first, and if it's already in use, it will try alternative ports (3001, 3002, 3003, 8080, etc.) until it finds an available one. Just look for the URL in the console output:

```
========================================================
  Pop Song Summer server running at http://localhost:3001
  
  Open your browser and navigate to:
  http://localhost:3001
  
  Press Ctrl+C to stop the server
========================================================
```

The server is configured to serve files from both the pop-song-summer directory and its parent directory, allowing it to access assets and music files stored in the parent directory structure.

#### Option 2: Using Python's built-in HTTP server

If you have Python installed, you can run a simple HTTP server:

```bash
# For Python 3.x
cd /path/to/pop-song-summer
python -m http.server 8000

# For Python 2.x
cd /path/to/pop-song-summer
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 3: Using Node.js and http-server

If you have Node.js installed, you can use the http-server package:

```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Run the server
cd /path/to/pop-song-summer
http-server -p 8000
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 4: Using VS Code Live Server extension

If you're using Visual Studio Code, you can install the "Live Server" extension:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Live Server" and install it
4. Right-click on `index.html` and select "Open with Live Server"

This will automatically open your default browser with the project running on a local server.

## Project Structure

- `index.html` - Main entry point for the experience
- `js/` - JavaScript modules
  - `main.js` - Core application logic and state management
  - `data.js` - Chapter data, assets, and configuration
  - `assetManager.js` - Asset loading and caching
  - `utils.js` - Utility functions
  - `canvas.js` - Canvas rendering and effects
  - `audio.js` - Audio playback and visualization
  - `navigation.js` - Chapter and panel navigation
- `css/` - Styling
- `assets/` - Images, audio, and other media files

## Technical Notes

- The project uses ES modules for better code organization
- Assets are centralized in `data.js` for easier management
- The experience is designed to be responsive and work on various screen sizes
- Debug tools are available by clicking the "Debug" button in the top-right corner