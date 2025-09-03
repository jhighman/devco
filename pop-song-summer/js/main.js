import { chapters, chapterAssets, chapterIcons, baseUrl, currentEnvironment, globalAssets } from './data.js';
import { loadImageWithFallback, debug, throwError, debounce } from './utils.js';
import { AssetManager } from './assetManager.js';
import { initCanvasScene, resizeCanvas } from './canvas.js';
import { setupChapterNavigation, showPanel } from './navigation.js';
import { setupAudioPlayer } from './audio.js';

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
    
    // Check localStorage for saved state with error handling
    try {
        const savedState = localStorage.getItem('debugPanelVisible');
        if (savedState === 'true') {
            debugPanel.classList.add('visible');
        }
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
        
        // Get the header image path from the assets
        const headerImage = AppState.assetManager.getAssetPath(assets.headerImage);
        
        // Generate additional fallback paths
        const fallbackPaths = [headerImage];
        
        // Add path without /pop-song-summer prefix if it exists
        if (headerImage.includes('/pop-song-summer/')) {
            fallbackPaths.push(headerImage.replace('/pop-song-summer/', '/'));
        }
        
        // Add path with leading slash removed if it exists
        if (headerImage.startsWith('/') && !headerImage.startsWith('//')) {
            fallbackPaths.push(headerImage.substring(1));
        }
        
        // Add a direct path to the assets directory
        fallbackPaths.push(`assets/images/pss/pss-${AppState.chapters[AppState.currentChapter]?.title.toLowerCase().replace(/\s+/g, '-')}-song-header-ar3x1-3k-rgb-v001-20250901-jh-final.png`);
        
        debug(`Trying image paths: ${fallbackPaths.join(', ')}`);
        
        // Use the loadImageWithFallback utility to handle image loading with proper fallbacks
        loadImageWithFallback(
            imgElement,
            fallbackPaths,
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
        
        debug('Added header image: ' + headerImage);
    }
    
    // Update SVG overlay with fallback
    const svgOverlay = document.querySelector('.svg-overlay object');
    if (svgOverlay) {
        const svgPath = AppState.assetManager.getAssetPath(assets.svg);
        svgOverlay.data = svgPath;
        
        // Generate fallback paths for SVG
        const svgFallbackPaths = [svgPath];
        
        if (svgPath.includes('/pop-song-summer/')) {
            const altPath = svgPath.replace('/pop-song-summer/', '/');
            debug(`Added alternative SVG path: ${altPath}`);
            
            // Create a fallback image element to try the alternative path
            const fallbackImg = new Image();
            fallbackImg.src = altPath;
            fallbackImg.onload = () => {
                debug(`Alternative SVG path successful: ${altPath}`);
                svgOverlay.data = altPath;
            };
        }
        
        svgOverlay.onerror = () => {
            debug('SVG loading failed: ' + svgPath);
            // Try without the prefix
            if (svgPath.startsWith('/')) {
                const altPath = svgPath.substring(1);
                debug(`Trying alternative SVG path: ${altPath}`);
                svgOverlay.data = altPath;
            } else {
                svgOverlay.style.display = 'none';
            }
        };
    }
    
    debug('Chapter card updated');
}, 100); // 100ms debounce delay