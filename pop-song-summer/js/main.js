import { chapters, chapterAssets, chapterIcons, baseUrl, currentEnvironment, globalAssets, assetPathPrefix, isSubdirectory } from './data.js';
import { loadImageWithFallback, debug, throwError, debounce } from './utils.js';
import { AssetManager } from './assetManager.js';
import { initCanvasScene, resizeCanvas } from './canvas.js';
import { setupChapterNavigation, showPanel } from './navigation.js';
import { setupAudioPlayer } from './audio.js';

// Log environment information for debugging
debug(`Initializing with environment: ${currentEnvironment}`);
debug(`Base URL: ${baseUrl[currentEnvironment]}`);
debug(`Asset Path Prefix: ${assetPathPrefix}`);
debug(`Is Subdirectory: ${isSubdirectory}`);

// Create AppState object to encapsulate all state variables
export const AppState = {
    // DOM elements
    assetManager: null,
    sceneCanvas: null,
    ctx: null,
    audioPlayer: null,
    playButton: null,
    progressBar: null,
    progressContainer: null,
    timeDisplay: null,
    narrativePanel: null,
    panelTitle: null,
    panelText: null,
    prevPanelBtn: null,
    nextPanelBtn: null,
    chapterNavigation: null,
    loadingIndicator: null,
    
    // State variables
    isPlaying: false,
    currentChapter: 0,
    currentPanel: 0,
    currentPanelAssets: [],
    chapters: chapters,
    chapterIcons: chapterIcons,
    
    // Environment settings
    currentEnvironment: currentEnvironment,
    baseUrl: baseUrl[currentEnvironment],
    
    // Chapter assets
    chapterAssets: chapterAssets,
    
    // Global assets
    globalAssets: globalAssets
};

// Initialize the experience
window.addEventListener('DOMContentLoaded', initExperience);

function initExperience() {
    debug('Initializing experience...');
    
    // Initialize DOM elements with null checks
    AppState.sceneCanvas = document.getElementById('scene-canvas') || throwError('Missing #scene-canvas');
    AppState.ctx = AppState.sceneCanvas.getContext('2d') || throwError('Canvas context not supported');
    AppState.audioPlayer = document.getElementById('audio-player') || throwError('Missing #audio-player');
    AppState.playButton = document.getElementById('play-button') || throwError('Missing #play-button');
    AppState.progressBar = document.getElementById('progress-bar') || throwError('Missing #progress-bar');
    AppState.progressContainer = document.getElementById('progress-container') || throwError('Missing #progress-container');
    AppState.timeDisplay = document.getElementById('time-display') || throwError('Missing #time-display');
    AppState.narrativePanel = document.getElementById('narrative-panel') || throwError('Missing #narrative-panel');
    AppState.panelTitle = document.getElementById('panel-title') || throwError('Missing #panel-title');
    AppState.panelText = document.getElementById('panel-text') || throwError('Missing #panel-text');
    AppState.prevPanelBtn = document.getElementById('prev-panel') || throwError('Missing #prev-panel');
    AppState.nextPanelBtn = document.getElementById('next-panel') || throwError('Missing #next-panel');
    AppState.chapterNavigation = document.getElementById('chapter-navigation') || throwError('Missing #chapter-navigation');
    AppState.loadingIndicator = document.getElementById('loading') || throwError('Missing #loading');
    
    debug('Narrative panel initial state: display=' + window.getComputedStyle(AppState.narrativePanel).display + ', z-index=' + window.getComputedStyle(AppState.narrativePanel).zIndex);

    AppState.loadingIndicator.style.display = 'flex';

    try {
        // Create asset manager
        AppState.assetManager = new AssetManager();
        
        // Initialize asset manager
        AppState.assetManager.loadAssetMapping()
            .then(() => {
                debug('Asset mapping loaded');
                return AppState.assetManager.preloadChapterAssets(AppState.currentChapter);
            })
            .then(() => {
                // Initialize canvas scene
                initCanvasScene();
                
                // Set canvas size
                resizeCanvas();
                window.addEventListener('resize', debounce(resizeCanvas, 100));
                
                // Setup audio player
                setupAudioPlayer();
                
                // Setup chapter navigation
                setupChapterNavigation();
                
                // Update chapter card
                updateChapterCard();
                
                // Show first panel
                showPanel(AppState.currentPanel);
                
                // Hide loading indicator
                AppState.loadingIndicator.style.display = 'none';
                
                debug('Experience initialization complete');
                
                // Setup debug panel toggle
                setupDebugToggle();
            })
            .catch(error => {
                debug('Error during asset loading: ' + error.message);
                // Continue with initialization even if asset loading fails
                debug('Continuing with initialization despite asset loading error');
                
                // Initialize canvas scene
                initCanvasScene();
                
                // Set canvas size
                resizeCanvas();
                window.addEventListener('resize', debounce(resizeCanvas, 100));
                
                // Setup audio player
                setupAudioPlayer();
                
                // Setup chapter navigation
                setupChapterNavigation();
                
                // Update chapter card
                updateChapterCard();
                
                // Show first panel
                showPanel(AppState.currentPanel);
                
                // Hide loading indicator
                AppState.loadingIndicator.style.display = 'none';
                
                debug('Experience initialization complete (with fallback)');
                
                // Setup debug panel toggle
                setupDebugToggle();
            });
        
    } catch (error) {
        debug('Error during experience initialization: ' + error.message);
        // Show error message to user
        AppState.loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Error loading experience: ${error.message}</p>
            <p>Please refresh the page to try again.</p>
        `;
        AppState.loadingIndicator.style.display = 'flex';
    }
}

// Set up debug panel toggle
function setupDebugToggle() {
    const debugPanel = document.getElementById('debug-panel') || throwError('Missing #debug-panel');
    const debugToggle = document.getElementById('debug-toggle') || throwError('Missing #debug-toggle');
    
    // Ensure debug panel is collapsed initially
    debugPanel.classList.remove('visible');
    
    debugToggle.addEventListener('click', () => {
        debugPanel.classList.toggle('visible');
        
        // Save state to localStorage with error handling
        const isVisible = debugPanel.classList.contains('visible');
        try {
            localStorage.setItem('debugPanelVisible', isVisible ? 'true' : 'false');
        } catch (e) {
            debug('localStorage unavailable: ' + e.message);
        }
    });
    
    // We're intentionally ignoring the saved state to ensure the debug panel
    // is always collapsed on initial load as requested
    try {
        // Clear any existing saved state
        localStorage.setItem('debugPanelVisible', 'false');
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
}

// Reset panel styling without clearing content
export function clearPanel() {
    debug('Clearing panel content');
    
    if (AppState.narrativePanel && AppState.panelTitle && AppState.panelText) {
        AppState.panelTitle.textContent = '';
        AppState.panelText.textContent = '';
        
        // Reset styling
        AppState.narrativePanel.style.zIndex = '25'; // Default, burning will override
        AppState.narrativePanel.style.background = 'rgba(0, 0, 0, 0.7)';
        AppState.narrativePanel.style.backdropFilter = 'blur(10px)';
        AppState.narrativePanel.style.display = 'block'; // Ensure panel is visible
        
        // Remove all special effect classes
        AppState.narrativePanel.classList.remove(
            'burning-effect',
            'light-rays',
            'door-effect',
            'epilogue-panel',
            'fade-in'
        );
        
        // Reset panel title styling
        AppState.panelTitle.classList.remove(
            'neon-title',
            'neon-red',
            'neon-gold',
            'neon-teal'
        );
    }
    
    debug('Panel styling reset');
}

// Update the chapter card with title and image
// Debounce to prevent rapid-fire calls that could cause stacking
export const updateChapterCard = debounce(function() {
    debug('Updating chapter card');
    
    // Don't clear panel content here - it will wipe out showPanel's work
    
    // Chapter card image is required, but title is now optional (removed from HTML)
    const chapterCardImage = document.getElementById('chapter-card-image') || throwError('Missing #chapter-card-image');
    
    // Get the assets for the current chapter
    const assets = AppState.chapterAssets[AppState.currentChapter] || AppState.chapterAssets.default;
    
    if (chapterCardImage) {
        // Clear any existing content
        chapterCardImage.innerHTML = '';
        
        // Create an actual image element
        const imgElement = document.createElement('img');
        imgElement.alt = `Chapter ${AppState.currentChapter + 1}: ${AppState.chapters[AppState.currentChapter]?.title || 'Unknown'}`;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        
        // Add a solid background color as fallback
        chapterCardImage.style.backgroundColor = '#1a2a44'; // Deep navy background
        
        // Add the image element to the container
        chapterCardImage.appendChild(imgElement);
        
        // Get all possible paths for the header image
        const headerImagePaths = AppState.assetManager.getAllPossiblePaths(assets.headerImage);
        
        // Add a direct path to the assets directory based on chapter title
        if (AppState.chapters[AppState.currentChapter]?.title) {
            const chapterTitle = AppState.chapters[AppState.currentChapter].title.toLowerCase().replace(/\s+/g, '-');
            headerImagePaths.push(`assets/images/pss/pss-${chapterTitle}-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`);
            headerImagePaths.push(`/assets/images/pss/pss-${chapterTitle}-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`);
            
            // Try with the full domain for production
            if (currentEnvironment === 'production') {
                headerImagePaths.push(`https://devco.band/assets/images/pss/pss-${chapterTitle}-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`);
                headerImagePaths.push(`https://devco.band/pop-song-summer/assets/images/pss/pss-${chapterTitle}-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`);
            }
        }
        
        debug(`Trying image paths: ${headerImagePaths.join(', ')}`);
        
        // Use the loadImageWithFallback utility to handle image loading with proper fallbacks
        loadImageWithFallback(
            imgElement,
            headerImagePaths,
            () => {
                // Fallback function if all image paths fail
                debug('Image loading failed, using minimal fallback');
                // Use a more subtle fallback that doesn't duplicate the title
                chapterCardImage.innerHTML = `<div style="color: white; text-align: center; padding: 40px 20px; font-size: 1rem;">
                    <div style="font-weight: bold; margin-bottom: 10px;">Chapter ${AppState.currentChapter + 1}: ${AppState.chapters[AppState.currentChapter]?.title || 'Unknown'}</div>
                    <div>Image not available</div>
                </div>`;
            }
        );
        
        debug('Added header image paths: ' + headerImagePaths.join(', '));
    }
    
    // Update SVG overlay with fallback
    const svgOverlay = document.querySelector('.svg-overlay object');
    if (svgOverlay) {
        // Get all possible paths for the SVG
        const svgPaths = AppState.assetManager.getAllPossiblePaths(assets.svg);
        debug(`Generated SVG paths: ${svgPaths.join(', ')}`);
        
        // Try each path in sequence
        let svgLoaded = false;
        
        // Function to try loading SVG from a path
        const trySvgPath = (index) => {
            if (index >= svgPaths.length || svgLoaded) {
                if (!svgLoaded) {
                    debug('All SVG paths failed, hiding SVG overlay');
                    svgOverlay.style.display = 'none';
                }
                return;
            }
            
            const path = svgPaths[index];
            debug(`Trying SVG path (${index + 1}/${svgPaths.length}): ${path}`);
            
            svgOverlay.data = path;
            svgOverlay.onerror = () => {
                debug(`SVG path failed: ${path}`);
                trySvgPath(index + 1);
            };
            
            svgOverlay.onload = () => {
                debug(`SVG loaded successfully from: ${path}`);
                svgLoaded = true;
                svgOverlay.style.display = 'block';
            };
        };
        
        // Start trying paths
        trySvgPath(0);
    }
    
    debug('Chapter card updated');
}, 100); // 100ms debounce delay