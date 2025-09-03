// Enhanced mobile fixes for Pop Song Summer Experience with graceful degradation
// This script ensures mobile devices have a good experience even if other scripts fail

/**
 * Helper function to get the correct asset path based on environment
 * Coordinates with the assetPathPrefix in data.js
 */
function getAssetPath(path) {
    // Check if we're in production (on devco.band)
    const isProduction = window.location.hostname.includes('devco.band');
    
    // Check if we're in a subdirectory
    const isSubdirectory = window.location.pathname.includes('/pop-song-summer/');
    
    // Determine asset path prefix
    let assetPathPrefix = '';
    if (isProduction && isSubdirectory) {
        assetPathPrefix = '/pop-song-summer';
    }
    
    // If path already starts with a slash, don't add another one
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Return the full path
    return `${assetPathPrefix}${normalizedPath}`;
}

/**
 * Enhanced function to detect if user is on a mobile device or if mobile mode is forced
 * Coordinates with the mobile detection in mobile.js
 */
function isMobileDevice() {
    // Check if mobile mode is forced via toggle
    let isMobileModeForced = false;
    try {
        isMobileModeForced = localStorage.getItem('mobileModeActive') === 'true';
        console.log('Mobile mode in localStorage:', localStorage.getItem('mobileModeActive'));
    } catch (e) {
        console.log('localStorage unavailable:', e.message);
    }
    
    // Check if we're on a mobile device based on user agent
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('Is mobile user agent:', isMobileUserAgent);
    console.log('Is mobile mode forced:', isMobileModeForced);
    
    // Also check if the body has the mobile-device class (set by mobile.js)
    const hasMobileClass = document.body.classList.contains('mobile-device');
    console.log('Body has mobile-device class:', hasMobileClass);
    
    // Also check screen size as a fallback
    const isSmallScreen = window.innerWidth <= 480;
    console.log('Is small screen:', isSmallScreen);
    
    // Return true if any of the conditions are met
    return isMobileUserAgent || isMobileModeForced || hasMobileClass || isSmallScreen;
}

/**
 * Apply mobile-specific styles based on orientation
 * Coordinates with the media queries in responsive.css
 */
function applyOrientationSpecificStyles() {
    // Force a reflow to ensure we get the correct dimensions
    document.body.offsetHeight;
    
    const isLandscape = window.innerWidth > window.innerHeight;
    const screenWidth = window.innerWidth;
    console.log('Is landscape orientation:', isLandscape);
    console.log('Screen width:', screenWidth);
    console.log('Window dimensions:', window.innerWidth + 'x' + window.innerHeight);
    
    // Get elements
    const chapterNavigation = document.getElementById('chapter-navigation');
    const narrativePanel = document.getElementById('narrative-panel');
    const audioControls = document.querySelector('.audio-controls');
    
    if (isLandscape) {
        // Apply landscape-specific styles
        console.log('Applying landscape orientation styles');
        
        if (chapterNavigation) {
            // Make chapter navigation horizontal at the top
            chapterNavigation.style.flexDirection = 'row';
            chapterNavigation.style.top = '5px';
            chapterNavigation.style.left = '50%';
            chapterNavigation.style.transform = 'translateX(-50%)';
            chapterNavigation.style.padding = '5px 10px';
            // Reset any left/right positioning that might be set in portrait mode
            chapterNavigation.style.right = 'auto';
            // Ensure the chapter navigation is visible in landscape mode
            chapterNavigation.style.display = 'flex';
            chapterNavigation.style.visibility = 'visible';
            chapterNavigation.style.opacity = '1';
            // Add a distinctive background in landscape mode
            chapterNavigation.style.background = 'rgba(0, 0, 0, 0.8)';
            
            // Adjust chapter buttons for horizontal layout
            const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
            chapterButtons.forEach(button => {
                button.style.margin = '0 5px';
            });
        }
        
        if (narrativePanel) {
            // Adjust narrative panel for landscape - position below the chapter navigation
            narrativePanel.style.position = 'fixed';
            narrativePanel.style.top = '60px';
            narrativePanel.style.left = '10px';
            narrativePanel.style.right = '10px';
            narrativePanel.style.width = 'calc(100% - 20px)';
            narrativePanel.style.maxHeight = 'calc(100vh - 120px)';
            narrativePanel.style.transform = 'none';
            // Ensure it doesn't overlap with chapter navigation
            narrativePanel.style.marginLeft = '0';
            narrativePanel.style.marginRight = '0';
        }
        
        if (audioControls) {
            // Adjust audio controls for landscape - position at the bottom
            audioControls.style.position = 'fixed';
            audioControls.style.bottom = '5px';
            audioControls.style.left = '10px';
            audioControls.style.right = '10px';
            audioControls.style.width = 'calc(100% - 20px)';
        }
        
        // Add a class to the body to indicate landscape mode
        document.body.classList.add('landscape-mode');
        document.body.classList.remove('portrait-mode');
    } else {
        // Apply portrait-specific styles
        console.log('Applying portrait orientation styles');
        
        // For very small screens, adjust the layout to prevent overlap
        if (screenWidth <= 320) {
            if (chapterNavigation) {
                // Make chapter navigation vertical on the left but smaller
                chapterNavigation.style.flexDirection = 'column';
                chapterNavigation.style.left = '2px';
                chapterNavigation.style.top = '50%';
                chapterNavigation.style.transform = 'translateY(-50%)';
                chapterNavigation.style.padding = '5px 2px';
                chapterNavigation.style.right = 'auto';
                // Ensure the chapter navigation is visible
                chapterNavigation.style.display = 'flex';
                chapterNavigation.style.visibility = 'visible';
                chapterNavigation.style.opacity = '1';
                // Add a distinctive background
                chapterNavigation.style.background = 'rgba(0, 0, 0, 0.7)';
                
                // Make chapter buttons smaller
                const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
                chapterButtons.forEach(button => {
                    button.style.width = '25px';
                    button.style.height = '25px';
                    button.style.margin = '5px 0';
                    
                    // Make SVG icons smaller
                    const svg = button.querySelector('svg');
                    if (svg) {
                        svg.style.width = '14px';
                        svg.style.height = '14px';
                    }
                });
            }
            
            if (narrativePanel) {
                // Adjust narrative panel for very small screens
                narrativePanel.style.position = 'fixed';
                narrativePanel.style.left = '35px'; // Less space from the left
                narrativePanel.style.right = '5px';
                narrativePanel.style.width = 'calc(100% - 40px)'; // Narrower width
                narrativePanel.style.top = '50%';
                narrativePanel.style.transform = 'translateY(-50%)';
                narrativePanel.style.maxHeight = '80vh';
                narrativePanel.style.padding = '10px'; // Smaller padding
            }
            
            if (audioControls) {
                // Adjust audio controls for very small screens
                audioControls.style.position = 'fixed';
                audioControls.style.left = '35px';
                audioControls.style.right = '5px';
                audioControls.style.width = 'calc(100% - 40px)';
                audioControls.style.bottom = '5px';
            }
        } else {
            // Standard portrait layout for normal-sized screens
            if (chapterNavigation) {
                // Make chapter navigation vertical on the left
                chapterNavigation.style.flexDirection = 'column';
                chapterNavigation.style.left = '5px';
                chapterNavigation.style.top = '50%';
                chapterNavigation.style.transform = 'translateY(-50%)';
                chapterNavigation.style.padding = '8px 5px';
                chapterNavigation.style.right = 'auto';
                // Ensure the chapter navigation is visible
                chapterNavigation.style.display = 'flex';
                chapterNavigation.style.visibility = 'visible';
                chapterNavigation.style.opacity = '1';
                // Add a distinctive background
                chapterNavigation.style.background = 'rgba(0, 0, 0, 0.7)';
                
                // Adjust chapter buttons for vertical layout
                const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
                chapterButtons.forEach(button => {
                    button.style.margin = '5px 0';
                });
            }
            
            if (narrativePanel) {
                // Adjust narrative panel for portrait
                narrativePanel.style.position = 'fixed';
                narrativePanel.style.left = '50px'; // Space for chapter navigation
                narrativePanel.style.right = '5px';
                narrativePanel.style.width = 'calc(100% - 60px)';
                narrativePanel.style.top = '50%';
                narrativePanel.style.transform = 'translateY(-50%)';
                narrativePanel.style.maxHeight = '80vh';
            }
            
            if (audioControls) {
                // Adjust audio controls for portrait
                audioControls.style.position = 'fixed';
                audioControls.style.left = '50px';
                audioControls.style.right = '5px';
                audioControls.style.width = 'calc(100% - 60px)';
                audioControls.style.bottom = '10px';
            }
        }
        
        // Add a class to the body to indicate portrait mode
        document.body.classList.add('portrait-mode');
        document.body.classList.remove('landscape-mode');
    }
}

/**
 * Safe event handler addition that avoids duplicates
 */
function addSafeEventListener(element, eventType, handler, options = {}) {
    if (!element) return;
    
    // Remove any existing handlers by cloning the element
    const clone = element.cloneNode(true);
    if (element.parentNode) {
        element.parentNode.replaceChild(clone, element);
    }
    
    // Add the new handler
    clone.addEventListener(eventType, handler, options);
    
    return clone;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile fix script loaded');
    
    // Log environment information
    console.log('Hostname:', window.location.hostname);
    console.log('Pathname:', window.location.pathname);
    console.log('Is production:', window.location.hostname.includes('devco.band'));
    console.log('Is subdirectory:', window.location.pathname.includes('/pop-song-summer/'));
    console.log('Is mobile device:', isMobileDevice());
    console.log('Screen size:', window.innerWidth + 'x' + window.innerHeight);
    
    // Only apply mobile fixes if on a mobile device or if mobile mode is forced
    if (!isMobileDevice()) {
        console.log('Not a mobile device, skipping mobile fixes');
        return;
    }
    
    console.log('Mobile device detected or mobile mode forced, applying mobile fixes');
    
    // Ensure the mobile-device class is added to the body
    if (!document.body.classList.contains('mobile-device')) {
        console.log('Adding mobile-device class to body');
        document.body.classList.add('mobile-device');
        document.body.classList.remove('desktop-device');
    }
    
    // Apply orientation-specific styles
    applyOrientationSpecificStyles();
    
    // Store current orientation to detect actual changes
    let currentOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    console.log('Initial orientation:', currentOrientation);
    
    // Add orientation change listener with improved handling
    window.addEventListener('orientationchange', function() {
        console.log('Orientation change event fired');
        // Use a longer delay to ensure the browser has fully updated dimensions
        setTimeout(function() {
            const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            console.log('New orientation after change:', newOrientation);
            console.log('New dimensions:', window.innerWidth + 'x' + window.innerHeight);
            
            if (newOrientation !== currentOrientation) {
                console.log('Orientation actually changed from', currentOrientation, 'to', newOrientation);
                currentOrientation = newOrientation;
                applyOrientationSpecificStyles();
            }
        }, 500); // Longer delay to ensure orientation change is complete
    });
    
    // Add resize listener with debounce to handle orientation changes on devices without orientation event
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            console.log('Window resized, checking orientation:', newOrientation);
            console.log('New dimensions after resize:', window.innerWidth + 'x' + window.innerHeight);
            
            if (newOrientation !== currentOrientation) {
                console.log('Orientation changed from', currentOrientation, 'to', newOrientation, 'due to resize');
                currentOrientation = newOrientation;
                applyOrientationSpecificStyles();
            }
        }, 250); // Debounce resize events
    });
    
    // Fix play button
    const playButton = document.getElementById('play-button');
    if (playButton) {
        console.log('Found play button, adding direct event listeners');
        
        // Add direct click handler
        const newPlayButton = addSafeEventListener(playButton, 'click', function(e) {
            console.log('Play button clicked via direct handler');
            
            // Get audio player
            const audioPlayer = document.getElementById('audio-player');
            if (audioPlayer) {
                if (audioPlayer.paused) {
                    console.log('Playing audio via direct handler');
                    audioPlayer.play().catch(err => {
                        console.error('Error playing audio:', err);
                    });
                    
                    // Update button to show pause icon
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                } else {
                    console.log('Pausing audio via direct handler');
                    audioPlayer.pause();
                    
                    // Update button to show play icon
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                }
            }
        });
        
        // Add touch handlers
        if (newPlayButton) {
            addSafeEventListener(newPlayButton, 'touchstart', function(e) {
                console.log('Play button touch start');
                e.preventDefault();
            }, { passive: false });
            
            addSafeEventListener(newPlayButton, 'touchend', function(e) {
                console.log('Play button touch end');
                e.preventDefault();
                
                // Simulate a click event
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                this.dispatchEvent(clickEvent);
            }, { passive: false });
            
            // Apply mobile-specific styles to play button
            newPlayButton.style.width = '30px';
            newPlayButton.style.height = '30px';
            newPlayButton.style.marginRight = '10px';
            newPlayButton.style.display = 'flex';
            newPlayButton.style.alignItems = 'center';
            newPlayButton.style.justifyContent = 'center';
            newPlayButton.style.opacity = '1';
            newPlayButton.style.visibility = 'visible';
            newPlayButton.style.zIndex = '31';
            newPlayButton.style.cursor = 'pointer';
            newPlayButton.style.pointerEvents = 'auto';
        }
    }
    
    // Fix debug button
    const debugToggle = document.getElementById('debug-toggle');
    const debugPanel = document.getElementById('debug-panel');
    
    if (debugToggle && debugPanel) {
        console.log('Found debug toggle, adding direct event listeners');
        
        // Add direct click handler
        const newDebugToggle = addSafeEventListener(debugToggle, 'click', function(e) {
            console.log('Debug toggle clicked via direct handler');
            
            // Toggle debug panel visibility
            if (debugPanel.classList.contains('visible')) {
                debugPanel.classList.remove('visible');
                console.log('Debug panel hidden');
            } else {
                debugPanel.classList.add('visible');
                console.log('Debug panel shown');
            }
        });
        
        // Add touch handlers
        if (newDebugToggle) {
            addSafeEventListener(newDebugToggle, 'touchstart', function(e) {
                console.log('Debug toggle touch start');
                e.preventDefault();
            }, { passive: false });
            
            addSafeEventListener(newDebugToggle, 'touchend', function(e) {
                console.log('Debug toggle touch end');
                e.preventDefault();
                
                // Simulate a click event
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                this.dispatchEvent(clickEvent);
            }, { passive: false });
            
            // Apply mobile-specific styles to debug toggle
            newDebugToggle.style.position = 'fixed';
            newDebugToggle.style.top = '10px';
            newDebugToggle.style.right = '60px';
            newDebugToggle.style.zIndex = '1001';
            newDebugToggle.style.fontSize = '10px';
            newDebugToggle.style.padding = '3px 6px';
            newDebugToggle.style.opacity = '1';
            newDebugToggle.style.visibility = 'visible';
            newDebugToggle.style.display = 'block';
        }
        
        // Apply mobile-specific styles to debug panel
        if (debugPanel) {
            debugPanel.style.width = '80%';
            debugPanel.style.maxHeight = '60vh';
            debugPanel.style.right = '-80%';
            debugPanel.style.fontSize = '10px';
        }
    }
    
    // Fix chapter navigation
    const chapterNavigation = document.getElementById('chapter-navigation');
    if (chapterNavigation) {
        console.log('Found chapter navigation, ensuring visibility');
        
        // Apply mobile-specific styles to chapter navigation
        // Ensure chapter navigation is visible and properly positioned
        chapterNavigation.style.display = 'flex';
        chapterNavigation.style.visibility = 'visible';
        chapterNavigation.style.opacity = '1';
        
        // Apply additional mobile-specific styles from responsive.css
        chapterNavigation.style.position = 'fixed';
        chapterNavigation.style.borderRadius = '15px';
        chapterNavigation.style.zIndex = '100';
        chapterNavigation.style.background = 'rgba(0, 0, 0, 0.7)';
        chapterNavigation.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.7)';
        
        // Force orientation-specific styles based on current orientation
        const isLandscape = window.innerWidth > window.innerHeight;
        console.log('Current orientation for chapter navigation:', isLandscape ? 'landscape' : 'portrait');
        
        if (isLandscape) {
            // Make chapter navigation horizontal at the top with !important styles
            chapterNavigation.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                flex-direction: row !important;
                top: 5px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                padding: 5px 10px !important;
                right: auto !important;
                z-index: 1000 !important;
                background: rgba(0, 0, 0, 0.8) !important;
                border-radius: 15px !important;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.7) !important;
            `;
            
            // Add a class to indicate landscape mode
            chapterNavigation.classList.add('landscape-mode');
            chapterNavigation.classList.remove('portrait-mode');
            
            // Adjust chapter buttons for horizontal layout
            const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
            chapterButtons.forEach(button => {
                button.style.margin = '0 5px';
                button.style.width = '30px';
                button.style.height = '30px';
            });
            
            console.log('Applied landscape styles to chapter navigation with !important');
        } else {
            // Make chapter navigation vertical on the left with !important styles
            chapterNavigation.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                flex-direction: column !important;
                left: 5px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                padding: 8px 5px !important;
                right: auto !important;
                z-index: 1000 !important;
                background: rgba(0, 0, 0, 0.7) !important;
                border-radius: 15px !important;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.7) !important;
            `;
            
            // Add a class to indicate portrait mode
            chapterNavigation.classList.add('portrait-mode');
            chapterNavigation.classList.remove('landscape-mode');
            
            // Adjust chapter buttons for vertical layout
            const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
            chapterButtons.forEach(button => {
                button.style.margin = '5px 0';
                button.style.width = '30px';
                button.style.height = '30px';
            });
            
            console.log('Applied portrait styles to chapter navigation with !important');
        }
        
        // Apply full orientation-specific styles to all elements
        applyOrientationSpecificStyles();
        
        // Add direct event listeners to chapter buttons
        setTimeout(function() {
            const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
            console.log(`Found ${chapterButtons.length} chapter buttons`);
            
            chapterButtons.forEach((button, index) => {
                console.log(`Adding direct event listeners to chapter button ${index + 1}`);
                
                // Apply mobile-specific styles to chapter buttons
                button.style.width = '30px';
                button.style.height = '30px';
                button.style.opacity = '1';
                button.style.visibility = 'visible';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                
                // Apply mobile-specific styles to SVG icons
                const svg = button.querySelector('svg');
                if (svg) {
                    svg.style.width = '16px';
                    svg.style.height = '16px';
                    svg.style.opacity = '1';
                    svg.style.visibility = 'visible';
                    svg.style.display = 'block';
                }
                
                // Add direct click handler using safe event listener
                const newButton = addSafeEventListener(button, 'click', function(e) {
                    console.log(`Chapter button ${index + 1} clicked via direct handler`);
                    
                    // Update active state
                    chapterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Change chapter
                    document.body.setAttribute('data-chapter', index);
                    
                    // Update audio source
                    const audioPlayer = document.getElementById('audio-player');
                    if (audioPlayer) {
                        try {
                            // Get chapter assets from data attributes
                            const chapterAssets = JSON.parse(document.body.getAttribute('data-chapter-assets') || '{}');
                            const asset = chapterAssets[index] || chapterAssets.default;
                            
                            if (asset && asset.audio) {
                                // Get the correct path for the current environment
                                const audioPath = getAssetPath(asset.audio);
                                audioPlayer.src = audioPath;
                                console.log(`Updated audio source to: ${audioPath} (original: ${asset.audio})`);
                                
                                // Play audio
                                audioPlayer.play().catch(err => {
                                    console.error('Error playing audio:', err);
                                });
                            } else {
                                console.error(`No audio found for chapter ${index + 1}`);
                            }
                        } catch (err) {
                            console.error('Error parsing chapter assets:', err);
                        }
                    }
                });
                
                // Add touch handlers
                if (newButton) {
                    addSafeEventListener(newButton, 'touchstart', function(e) {
                        console.log(`Chapter button ${index + 1} touch start`);
                        e.preventDefault();
                    }, { passive: false });
                    
                    addSafeEventListener(newButton, 'touchend', function(e) {
                        console.log(`Chapter button ${index + 1} touch end`);
                        e.preventDefault();
                        
                        // Simulate a click event
                        const clickEvent = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        this.dispatchEvent(clickEvent);
                    }, { passive: false });
                }
            });
        }, 1000); // Delay to ensure buttons are created
    }
    
    // Ensure audio controls are visible
    const audioControls = document.querySelector('.audio-controls');
    if (audioControls) {
        console.log('Found audio controls, ensuring visibility');
        
        // Apply mobile-specific styles to audio controls
        audioControls.style.display = 'flex';
        audioControls.style.visibility = 'visible';
        audioControls.style.opacity = '1';
        
        // Apply additional mobile-specific styles from responsive.css
        audioControls.style.position = 'fixed';
        audioControls.style.padding = '5px 10px';
        audioControls.style.borderRadius = '25px';
        audioControls.style.zIndex = '30';
        audioControls.style.background = 'rgba(45, 10, 49, 0.8)';
        
        // Force orientation-specific styles based on current orientation
        const isLandscape = window.innerWidth > window.innerHeight;
        console.log('Current orientation for audio controls:', isLandscape ? 'landscape' : 'portrait');
        
        if (isLandscape) {
            // Position at the bottom in landscape mode with !important styles
            audioControls.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                bottom: 5px !important;
                left: 10px !important;
                right: 10px !important;
                width: calc(100% - 20px) !important;
                padding: 5px 10px !important;
                border-radius: 25px !important;
                z-index: 30 !important;
                background: rgba(45, 10, 49, 0.8) !important;
            `;
            
            // Add a class to indicate landscape mode
            audioControls.classList.add('landscape-mode');
            audioControls.classList.remove('portrait-mode');
            
            console.log('Applied landscape styles to audio controls with !important');
        } else {
            // Position at the bottom in portrait mode with !important styles
            audioControls.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                bottom: 10px !important;
                left: 50px !important;
                right: 5px !important;
                width: calc(100% - 60px) !important;
                padding: 5px 10px !important;
                border-radius: 25px !important;
                z-index: 30 !important;
                background: rgba(45, 10, 49, 0.8) !important;
            `;
            
            // Add a class to indicate portrait mode
            audioControls.classList.add('portrait-mode');
            audioControls.classList.remove('landscape-mode');
            
            console.log('Applied portrait styles to audio controls with !important');
        }
        
        // Apply full orientation-specific styles to all elements
        applyOrientationSpecificStyles();
    }
    
    // Adjust narrative panel
    const narrativePanel = document.getElementById('narrative-panel');
    if (narrativePanel) {
        console.log('Found narrative panel, adjusting for mobile');
        
        // Apply mobile-specific styles to narrative panel
        narrativePanel.style.display = 'block';
        narrativePanel.style.marginLeft = '0';
        narrativePanel.style.marginRight = '0';
        narrativePanel.style.padding = '15px';
        narrativePanel.style.zIndex = '25';
        narrativePanel.style.position = 'fixed';
        
        // Force orientation-specific styles based on current orientation
        const isLandscape = window.innerWidth > window.innerHeight;
        console.log('Current orientation for narrative panel:', isLandscape ? 'landscape' : 'portrait');
        
        if (isLandscape) {
            // Position below the chapter navigation in landscape mode with !important styles
            narrativePanel.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                top: 60px !important;
                left: 10px !important;
                right: 10px !important;
                width: calc(100% - 20px) !important;
                max-height: calc(100vh - 120px) !important;
                transform: none !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                padding: 15px !important;
                z-index: 25 !important;
                background: rgba(0, 0, 0, 0.7) !important;
                border-radius: 10px !important;
            `;
            
            // Add a class to indicate landscape mode
            narrativePanel.classList.add('landscape-mode');
            narrativePanel.classList.remove('portrait-mode');
            
            console.log('Applied landscape styles to narrative panel with !important');
        } else {
            // Position to the right of chapter navigation in portrait mode with !important styles
            narrativePanel.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed !important;
                left: 50px !important;
                right: 5px !important;
                width: calc(100% - 60px) !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                max-height: 80vh !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                padding: 15px !important;
                z-index: 25 !important;
                background: rgba(0, 0, 0, 0.7) !important;
                border-radius: 10px !important;
            `;
            
            // Add a class to indicate portrait mode
            narrativePanel.classList.add('portrait-mode');
            narrativePanel.classList.remove('landscape-mode');
            
            console.log('Applied portrait styles to narrative panel with !important');
        }
        
        // Apply full orientation-specific styles to all elements
        applyOrientationSpecificStyles();
        
        // Add swipe handlers for panel navigation
        const prevPanelBtn = document.getElementById('prev-panel');
        const nextPanelBtn = document.getElementById('next-panel');
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        addSafeEventListener(narrativePanel, 'touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        addSafeEventListener(narrativePanel, 'touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            
            const swipeThreshold = 50; // Minimum distance for a swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next panel
                console.log('Swipe left detected - next panel');
                if (nextPanelBtn && !nextPanelBtn.disabled) {
                    nextPanelBtn.click();
                }
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous panel
                console.log('Swipe right detected - previous panel');
                if (prevPanelBtn && !prevPanelBtn.disabled) {
                    prevPanelBtn.click();
                }
            }
        });
    }
    
    // Add a mobile toggle button if it doesn't exist
    if (!document.getElementById('mobile-toggle')) {
        console.log('Creating mobile toggle button');
        const mobileToggle = document.createElement('button');
        mobileToggle.id = 'mobile-toggle';
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.textContent = 'Mobile Mode';
        mobileToggle.style.position = 'fixed';
        mobileToggle.style.top = '10px';
        mobileToggle.style.right = '10px';
        mobileToggle.style.zIndex = '1002';
        mobileToggle.style.padding = '3px 6px';
        mobileToggle.style.background = 'rgba(0, 0, 0, 0.7)';
        mobileToggle.style.color = '#eaeaea';
        mobileToggle.style.border = '1px solid #555';
        mobileToggle.style.borderRadius = '5px';
        mobileToggle.style.fontSize = '10px';
        
        // Add active class if mobile mode is forced
        try {
            if (localStorage.getItem('mobileModeActive') === 'true') {
                mobileToggle.classList.add('active');
            }
        } catch (e) {
            console.log('localStorage unavailable:', e.message);
        }
        
        // Add click handler
        addSafeEventListener(mobileToggle, 'click', function() {
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Disable mobile mode
                this.classList.remove('active');
                document.body.classList.remove('mobile-device');
                document.body.classList.add('desktop-device');
                
                // Save state to localStorage
                try {
                    localStorage.setItem('mobileModeActive', 'false');
                } catch (e) {
                    console.log('localStorage unavailable:', e.message);
                }
                
                // Reload page to reset all styles
                window.location.reload();
            } else {
                // Enable mobile mode
                this.classList.add('active');
                document.body.classList.add('mobile-device');
                document.body.classList.remove('desktop-device');
                
                // Save state to localStorage
                try {
                    localStorage.setItem('mobileModeActive', 'true');
                } catch (e) {
                    console.log('localStorage unavailable:', e.message);
                }
                
                // Apply mobile fixes
                applyOrientationSpecificStyles();
            }
        });
        
        // Add to body
        document.body.appendChild(mobileToggle);
    }
});