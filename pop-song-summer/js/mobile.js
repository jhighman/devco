// Comprehensive mobile functionality for Pop Song Summer Experience

import { debug, debounce } from './utils.js';
import { AppState } from './main.js';

// Z-index hierarchy constants for consistent layering
const Z_INDICES = {
    BASE: 10,
    SVG_OVERLAY: 50,
    NARRATIVE_PANEL: 100,
    AUDIO_CONTROLS: 200,
    CHAPTER_NAVIGATION: 300,
    TOOLTIPS: 400,
    PLAY_BUTTON_NAV: 350
};

// Detect if we're on a mobile device
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        // User agent detection
        const isMobileUserAgent = (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        
        // Feature detection
        const hasTouchSupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        const hasPointerCoarse = window.matchMedia('(pointer: coarse)').matches;
        const hasHoverNone = window.matchMedia('(hover: none)').matches;
        
        // Screen size detection
        const isSmallScreen = window.innerWidth <= 480;
        
        // Combine all detection methods
        const isMobileDevice = isMobileUserAgent || hasTouchSupport || hasPointerCoarse || hasHoverNone || isSmallScreen;
        
        debug('Mobile detection details:', {
            userAgent: isMobileUserAgent,
            touchSupport: hasTouchSupport,
            pointerCoarse: hasPointerCoarse,
            hoverNone: hasHoverNone,
            smallScreen: isSmallScreen,
            combined: isMobileDevice
        });
        
        return isMobileDevice;
    }
};

/**
 * More reliable orientation detection using matchMedia
 */
function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}

/**
 * Enhanced function to detect if user is on a mobile device or if mobile mode is forced
 */
function isMobileDevice() {
    // Check if mobile mode is forced via toggle
    let isMobileModeForced = false;
    try {
        isMobileModeForced = localStorage.getItem('mobileModeActive') === 'true';
        debug('Mobile mode in localStorage: ' + localStorage.getItem('mobileModeActive'));
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
    
    // Check if we're on a mobile device based on user agent
    const isMobileUserAgent = isMobile.any();
    
    // Also check if the body has the mobile-device class
    const hasMobileClass = document.body.classList.contains('mobile-device');
    
    // Also check screen size as a fallback
    const isSmallScreen = window.innerWidth <= 480;
    
    // Return true if any of the conditions are met
    return isMobileUserAgent || isMobileModeForced || hasMobileClass || isSmallScreen;
}

// Track state to avoid redundant operations
let mobileLayoutApplied = false;
let tooltipsFixed = false;
let mobileIssuesFixed = false;
let orientationStylesApplied = false;

/**
 * Apply all mobile-specific layout and fixes in one place
 * This reduces redundant function calls throughout the codebase
 */
function applyMobileLayout(forceUpdate = false) {
    // Skip if already applied and not forced
    if (mobileLayoutApplied && !forceUpdate) {
        debug('Mobile layout already applied, skipping redundant call');
        return;
    }
    
    debug('Applying comprehensive mobile layout');
    
    // Reset tracking flags if forcing update
    if (forceUpdate) {
        orientationStylesApplied = false;
        tooltipsFixed = false;
        mobileIssuesFixed = false;
    }
    
    // Apply orientation-specific styles
    applyOrientationSpecificStyles();
    
    // Fix tooltips
    fixChapterTooltips();
    
    // Fix mobile-specific issues
    fixMobileIssues();
    
    // Hide original audio controls in mobile mode
    const audioControls = document.querySelector('.audio-controls');
    if (audioControls) {
        audioControls.style.setProperty('display', 'none', 'important');
        audioControls.style.setProperty('visibility', 'hidden', 'important');
        debug('Hiding original audio controls in mobile mode');
    }
    
    // Make sure the navigation play button is visible
    const navPlayButton = document.querySelector('.nav-play-button');
    if (navPlayButton) {
        navPlayButton.style.setProperty('display', 'flex', 'important');
        navPlayButton.style.setProperty('visibility', 'visible', 'important');
        navPlayButton.style.setProperty('opacity', '1', 'important');
        debug('Ensuring navigation play button is visible in mobile mode');
    }
    
    // Mark as applied
    mobileLayoutApplied = true;
    debug('Mobile layout applied successfully');
}

/**
 * Initialize mobile-specific functionality
 */
function initMobile() {
    debug('Initializing mobile functionality');
    
    // Add play button to navigation - this should always be present regardless of mode
    addPlayButtonToNavigation();
    
    // Set up mobile toggle button
    debug('Setting up mobile toggle button');
    setupMobileToggle();
    
    // Check if we're on a mobile device
    const isMobileUserAgent = isMobile.any();
    debug('Is mobile device (from user agent): ' + isMobileUserAgent);
    
    // Check if mobile mode is forced via toggle
    let isMobileModeForced = false;
    try {
        const storedValue = localStorage.getItem('mobileModeActive');
        debug('Mobile mode in localStorage: ' + storedValue);
        isMobileModeForced = storedValue === 'true';
        debug('Is mobile mode forced: ' + isMobileModeForced);
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
    
    debug('Current body classes before applying mobile/desktop: ' + document.body.className);
    
    if (isMobileUserAgent || isMobileModeForced) {
        debug('Mobile device detected or mobile mode forced');
        document.body.classList.add('mobile-device');
        document.body.classList.remove('desktop-device');
        
        debug('Body classes after applying mobile: ' + document.body.className);
        
        // Add touch-specific event handlers
        debug('Adding touch event handlers');
        addTouchHandlers();
        
        // Apply all mobile layout and fixes in one place
        debug('Applying mobile layout');
        applyMobileLayout(true);
    } else {
        debug('Desktop device detected');
        document.body.classList.add('desktop-device');
        document.body.classList.remove('mobile-device');
        
        debug('Body classes after applying desktop: ' + document.body.className);
        
        // Ensure mobile-specific styles are not applied
        debug('Removing mobile-specific styles');
        document.querySelectorAll('.chapter-navigation, .play-button, .debug-toggle, .audio-controls, .narrative-panel').forEach(el => {
            el.removeAttribute('style');
        });
    }
    
    // Use matchMedia for orientation changes
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    mediaQuery.addEventListener('change', () => {
        debug('Orientation changed via matchMedia');
        
        // Provide haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Check if we're in mobile mode
        if (isMobileDevice()) {
            // Force update on orientation change
            mobileLayoutApplied = false;
            applyMobileLayout(true);
        }
    });
    
    // Add debounced resize handler for responsive adjustments (100ms as requested)
    window.addEventListener('resize', debounce(adjustResponsiveLayout, 100));
    
    // Initial layout adjustment
    adjustResponsiveLayout();
}

// Setup mobile toggle button
function setupMobileToggle() {
    debug('Setting up mobile toggle button');
    
    const mobileToggle = document.getElementById('mobile-toggle');
    if (!mobileToggle) {
        debug('Mobile toggle button not found');
        return;
    }
    
    debug('Mobile toggle button found: ' + mobileToggle.outerHTML);
    
    // Check if mobile mode is saved in localStorage
    let isMobileModeActive = false;
    try {
        const storedValue = localStorage.getItem('mobileModeActive');
        debug('Mobile mode in localStorage: ' + storedValue);
        isMobileModeActive = storedValue === 'true';
        debug('Is mobile mode active: ' + isMobileModeActive);
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
    
    // Apply initial state
    if (isMobileModeActive) {
        debug('Applying initial mobile mode state (active)');
        document.body.classList.add('mobile-device');
        document.body.classList.remove('desktop-device');
        mobileToggle.classList.add('active');
        
        debug('Body classes after initialization: ' + document.body.className);
        debug('Mobile toggle classes after initialization: ' + mobileToggle.className);
        
        // Apply all mobile layout and fixes in one place
        debug('Applying mobile layout during initialization');
        applyMobileLayout(true);
    } else {
        debug('Mobile mode not active in localStorage, using default state');
        document.body.classList.remove('mobile-device');
        document.body.classList.add('desktop-device');
        mobileToggle.classList.remove('active');
    }
    
    // Add click event listener
    mobileToggle.addEventListener('click', toggleMobileMode);
    
    // Add touch event listeners for mobile
    mobileToggle.addEventListener('touchstart', function(e) {
        debug('Mobile toggle touch start');
        e.preventDefault();
    }, { passive: false });
    
    mobileToggle.addEventListener('touchend', function(e) {
        debug('Mobile toggle touch end');
        e.preventDefault();
        toggleMobileMode.call(this);
    }, { passive: false });
    
    // Function to toggle mobile mode
    function toggleMobileMode() {
        debug('Mobile toggle clicked');
        
        // Toggle mobile mode
        const isActive = this.classList.contains('active');
        debug('Toggle button is currently active: ' + isActive);
        
        if (isActive) {
            // Disable mobile mode
            debug('Disabling mobile mode');
            document.body.classList.remove('mobile-device');
            document.body.classList.add('desktop-device');
            this.classList.remove('active');
            
            // Save state to localStorage
            try {
                localStorage.setItem('mobileModeActive', 'false');
                debug('Saved mobile mode as false to localStorage');
            } catch (e) {
                debug('localStorage unavailable: ' + e.message);
            }
            
            // Remove mobile-specific styles
            debug('Removing mobile-specific styles');
            document.querySelectorAll('.chapter-navigation, .play-button, .debug-toggle, .audio-controls, .narrative-panel').forEach(el => {
                el.removeAttribute('style');
            });
            
            // Force a layout adjustment
            debug('Forcing layout adjustment for desktop');
            adjustResponsiveLayout();
        } else {
            // Enable mobile mode
            debug('Enabling mobile mode');
            document.body.classList.add('mobile-device');
            document.body.classList.remove('desktop-device');
            this.classList.add('active');
            
            // Save state to localStorage
            try {
                localStorage.setItem('mobileModeActive', 'true');
                debug('Saved mobile mode as true to localStorage');
                
                // Verify the value was set correctly
                const savedValue = localStorage.getItem('mobileModeActive');
                debug('Verified localStorage value: ' + savedValue);
            } catch (e) {
                debug('localStorage unavailable: ' + e.message);
            }
            
            // Apply all mobile layout and fixes in one place
            debug('Applying mobile layout after toggle');
            mobileLayoutApplied = false; // Force update after toggle
            applyMobileLayout(true);
        }
        
        debug('Mobile mode is now: ' + (isActive ? 'disabled' : 'enabled'));
        debug('Body classes after toggle: ' + document.body.className);
    }
}

// Add touch-specific event handlers
function addTouchHandlers() {
    debug('Adding touch event handlers');
    
    // Fix touch behavior on interactive elements
    const interactiveElements = document.querySelectorAll('.chapter-btn, .panel-nav-button, .play-button, .debug-toggle');
    
    interactiveElements.forEach(element => {
        // Remove any existing event listeners
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        
        // Add touchstart event listener
        newElement.addEventListener('touchstart', function(e) {
            debug(`Touch start on ${this.className}`);
            // Don't prevent default on form elements
            if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Add touchend event listener that triggers click
        newElement.addEventListener('touchend', function(e) {
            debug(`Touch end on ${this.className}`);
            e.preventDefault();
            
            // Simulate a click event
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            this.dispatchEvent(clickEvent);
        }, { passive: false });
    });
    
    // Add swipe handlers for panel navigation
    const narrativePanel = document.getElementById('narrative-panel');
    if (narrativePanel) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        narrativePanel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        narrativePanel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for a swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next panel
                debug('Swipe left detected - next panel');
                const nextPanelBtn = document.getElementById('next-panel');
                if (nextPanelBtn && !nextPanelBtn.disabled) {
                    nextPanelBtn.click();
                }
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous panel
                debug('Swipe right detected - previous panel');
                const prevPanelBtn = document.getElementById('prev-panel');
                if (prevPanelBtn && !prevPanelBtn.disabled) {
                    prevPanelBtn.click();
                }
            }
        }
    }
}

/**
 * Fix tooltips for chapter navigation
 */
function fixChapterTooltips(forceUpdate = false) {
    // Skip if already fixed and not forced to update
    if (tooltipsFixed && !forceUpdate) {
        debug('Chapter tooltips already fixed, skipping redundant call');
        return;
    }
    
    debug('Fixing chapter tooltips');
    
    const chapterNavigation = document.getElementById('chapter-navigation');
    if (!chapterNavigation) {
        debug('Chapter navigation not found');
        return;
    }
    
    // Get all chapter containers
    const chapterContainers = chapterNavigation.querySelectorAll('.chapter-container');
    debug(`Found ${chapterContainers.length} chapter containers`);
    
    if (chapterContainers.length === 0) {
        // Try to find chapter buttons directly
        const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
        debug(`Found ${chapterButtons.length} chapter buttons`);
        
        // For each button, find or create a tooltip
        chapterButtons.forEach((button, index) => {
            debug(`Processing chapter button ${index + 1}`);
            
            // Get the chapter title from data-title attribute or use a default
            const chapterTitle = button.getAttribute('data-title') || `Chapter ${index + 1}`;
            
            // Look for existing label first (from navigation.js)
            let label = button.parentNode.querySelector('.chapter-label');
            
            if (label) {
                debug(`Found existing label for chapter ${index + 1}`);
                
                // Position the label based on orientation
                const isLandscapeMode = isLandscape();
                if (isLandscapeMode) {
                    // Position below button in landscape mode
                    label.style.position = 'absolute';
                    label.style.top = '100%';
                    label.style.left = '50%';
                    label.style.transform = 'translateX(-50%)';
                    label.style.marginTop = '5px';
                    label.style.whiteSpace = 'nowrap';
                    label.style.textAlign = 'center';
                    label.style.pointerEvents = 'none';
                    label.style.zIndex = Z_INDICES.TOOLTIPS.toString();
                    label.style.background = 'rgba(0, 0, 0, 0.8)';
                    label.style.padding = '3px 6px';
                    label.style.borderRadius = '3px';
                    label.style.color = '#fff';
                    label.style.fontSize = '12px';
                } else {
                    // Position to the right of button in portrait mode
                    label.style.position = 'absolute';
                    label.style.left = '45px';
                    label.style.top = '50%';
                    label.style.transform = 'translateY(-50%)';
                    label.style.whiteSpace = 'nowrap';
                    label.style.textAlign = 'left';
                    label.style.pointerEvents = 'none';
                    label.style.zIndex = Z_INDICES.TOOLTIPS.toString();
                    label.style.background = 'rgba(0, 0, 0, 0.8)';
                    label.style.padding = '3px 6px';
                    label.style.borderRadius = '3px';
                    label.style.color = '#fff';
                    label.style.fontSize = '12px';
                }
                
                // Make sure the label is visible on hover
                button.addEventListener('mouseenter', () => {
                    debug(`Mouse entered chapter button ${index + 1}`);
                    label.style.opacity = '1';
                    label.style.visibility = 'visible';
                });
                
                button.addEventListener('mouseleave', () => {
                    debug(`Mouse left chapter button ${index + 1}`);
                    label.style.opacity = '0';
                    label.style.visibility = 'hidden';
                });
            } else {
                // Create a tooltip element if it doesn't exist
                let tooltip = button.querySelector('.tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = chapterTitle;
                    tooltip.style.position = 'absolute';
                    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
                    tooltip.style.color = '#fff';
                    tooltip.style.padding = '3px 6px';
                    tooltip.style.borderRadius = '3px';
                    tooltip.style.fontSize = '12px';
                    tooltip.style.whiteSpace = 'nowrap';
                    tooltip.style.pointerEvents = 'none';
                    tooltip.style.opacity = '0';
                    tooltip.style.transition = 'opacity 0.3s ease';
                    tooltip.style.zIndex = Z_INDICES.TOOLTIPS.toString();
                    button.appendChild(tooltip);
                    debug(`Created tooltip for chapter ${index + 1}: ${chapterTitle}`);
                }
                
                // Position the tooltip based on orientation
                const isLandscapeMode = isLandscape();
                if (isLandscapeMode) {
                    // Position below button in landscape mode
                    tooltip.style.top = '100%';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                    tooltip.style.marginTop = '5px';
                    tooltip.style.textAlign = 'center';
                } else {
                    // Position to the right of button in portrait mode
                    tooltip.style.left = '100%';
                    tooltip.style.top = '50%';
                    tooltip.style.transform = 'translateY(-50%)';
                    tooltip.style.marginLeft = '5px';
                    tooltip.style.textAlign = 'left';
                }
                
                // Add event listeners for showing/hiding the tooltip
                button.addEventListener('mouseenter', () => {
                    debug(`Mouse entered chapter button ${index + 1}`);
                    tooltip.style.opacity = '1';
                });
                
                button.addEventListener('mouseleave', () => {
                    debug(`Mouse left chapter button ${index + 1}`);
                    tooltip.style.opacity = '0';
                });
            }
        });
    } else {
        // Process chapter containers
        chapterContainers.forEach((container, index) => {
            debug(`Processing chapter container ${index + 1}`);
            
            const button = container.querySelector('.chapter-btn');
            const label = container.querySelector('.chapter-label');
            
            if (button && label) {
                debug(`Found button and label for chapter ${index + 1}`);
                
                // Make sure the label is visible on hover
                button.addEventListener('mouseenter', () => {
                    debug(`Mouse entered chapter button ${index + 1}`);
                    label.style.opacity = '1';
                    label.style.visibility = 'visible';
                });
                
                button.addEventListener('mouseleave', () => {
                    debug(`Mouse left chapter button ${index + 1}`);
                    label.style.opacity = '0';
                    label.style.visibility = 'hidden';
                });
                
                // Position the label based on orientation
                const isLandscapeMode = isLandscape();
                if (isLandscapeMode) {
                    // Position below button in landscape mode
                    label.style.position = 'absolute';
                    label.style.top = '100%';
                    label.style.left = '50%';
                    label.style.transform = 'translateX(-50%)';
                    label.style.marginTop = '5px';
                    label.style.whiteSpace = 'nowrap';
                    label.style.textAlign = 'center';
                    label.style.pointerEvents = 'none';
                    label.style.zIndex = Z_INDICES.TOOLTIPS.toString();
                    label.style.background = 'rgba(0, 0, 0, 0.8)';
                    label.style.padding = '3px 6px';
                    label.style.borderRadius = '3px';
                    label.style.color = '#fff';
                    label.style.fontSize = '12px';
                } else {
                    // Position to the right of button in portrait mode
                    label.style.position = 'absolute';
                    label.style.left = '45px';
                    label.style.top = '50%';
                    label.style.transform = 'translateY(-50%)';
                    label.style.whiteSpace = 'nowrap';
                    label.style.textAlign = 'left';
                    label.style.pointerEvents = 'none';
                    label.style.zIndex = Z_INDICES.TOOLTIPS.toString();
                    label.style.background = 'rgba(0, 0, 0, 0.8)';
                    label.style.padding = '3px 6px';
                    label.style.borderRadius = '3px';
                    label.style.color = '#fff';
                    label.style.fontSize = '12px';
                }
            } else {
                debug(`Missing button or label for chapter ${index + 1}`);
            }
        });
    }
    
    // Mark as fixed
    tooltipsFixed = true;
    debug('Chapter tooltips fixed');
}

/**
 * Apply mobile-specific styles based on orientation
 */
function applyOrientationSpecificStyles(forceUpdate = false) {
    // Get current orientation and dimensions
    const isLandscapeMode = isLandscape();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Skip if already applied with same orientation and not forced
    if (orientationStylesApplied && !forceUpdate) {
        debug('Orientation styles already applied, skipping redundant call');
        return;
    }
    
    debug('Is landscape (matchMedia): ' + isLandscapeMode);
    debug('Window dimensions: ' + screenWidth + 'x' + screenHeight);
    
    // Get elements
    const chapterNavigation = document.getElementById('chapter-navigation');
    const narrativePanel = document.getElementById('narrative-panel');
    const audioControls = document.querySelector('.audio-controls');
    
    // Determine screen size category for more specific styling
    const isExtraSmall = screenWidth <= 320;
    const isSmall = screenWidth > 320 && screenWidth <= 480;
    const isMedium = screenWidth > 480 && screenWidth <= 768;
    const isLarge = screenWidth > 768;
    
    debug(`Screen size category: ${isExtraSmall ? 'extra-small' : isSmall ? 'small' : isMedium ? 'medium' : 'large'}`);
    
    // Clear any existing styles to prevent conflicts
    if (chapterNavigation) {
        chapterNavigation.removeAttribute('style');
    }
    if (narrativePanel) {
        narrativePanel.removeAttribute('style');
    }
    if (audioControls) {
        audioControls.removeAttribute('style');
    }
    
    // Apply styles based on orientation
    if (isLandscapeMode) {
        // Landscape orientation
        
        // First, set up the chapter navigation
        if (chapterNavigation) {
            // Make chapter navigation vertical on the left side (original position)
            chapterNavigation.style.display = 'flex';
            chapterNavigation.style.visibility = 'visible';
            chapterNavigation.style.opacity = '1';
            chapterNavigation.style.position = 'fixed';
            chapterNavigation.style.flexDirection = 'column';
            chapterNavigation.style.left = '5px';
            chapterNavigation.style.right = 'auto';
            chapterNavigation.style.top = '50%';
            chapterNavigation.style.transform = 'translateY(-50%)';
            chapterNavigation.style.padding = '8px 5px';
            chapterNavigation.style.zIndex = Z_INDICES.CHAPTER_NAVIGATION.toString();
            chapterNavigation.style.background = 'rgba(0, 0, 0, 0.9)'; // More opaque background
            chapterNavigation.style.borderRadius = '15px';
            chapterNavigation.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.7)';
            
            // Ensure the navigation doesn't bleed above the page
            chapterNavigation.style.maxHeight = '90vh';
            chapterNavigation.style.overflow = 'auto';
            
            // Add a class to indicate landscape mode
            chapterNavigation.classList.add('landscape-mode');
            chapterNavigation.classList.remove('portrait-mode');
            
            // Adjust chapter buttons for vertical layout
            const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
            chapterButtons.forEach(button => {
                button.style.margin = '5px 0';
                button.style.width = '30px';
                button.style.height = '30px';
            });
        }
        
        // Next, set up the audio controls at the bottom
        if (audioControls) {
            // Position at the bottom in landscape mode
            audioControls.style.display = 'flex';
            audioControls.style.visibility = 'visible';
            audioControls.style.opacity = '1';
            audioControls.style.position = 'fixed';
            
            // Adjust bottom position based on screen size
            if (isExtraSmall) {
                audioControls.style.bottom = '20px';
            } else if (isSmall) {
                audioControls.style.bottom = '15px';
            } else {
                audioControls.style.bottom = '10px';
            }
            
            audioControls.style.left = '10px';
            audioControls.style.right = '10px';
            audioControls.style.width = 'calc(100% - 20px)';
            
            // Adjust padding based on screen size
            if (isExtraSmall || isSmall) {
                audioControls.style.padding = '6px 8px';
            } else {
                audioControls.style.padding = '8px 10px';
            }
            
            audioControls.style.borderRadius = '25px';
            audioControls.style.zIndex = Z_INDICES.AUDIO_CONTROLS.toString();
            audioControls.style.background = 'rgba(45, 10, 49, 0.95)';
            
            audioControls.classList.add('landscape-mode');
            audioControls.classList.remove('portrait-mode');
        }
        
        // Finally, set up the narrative panel in its original position
        if (narrativePanel) {
            // Position in the middle of the screen (original position)
            narrativePanel.style.display = 'block';
            narrativePanel.style.visibility = 'visible';
            narrativePanel.style.opacity = '1';
            narrativePanel.style.position = 'fixed';
            
            // Adjust top position based on screen size (original positioning)
            if (isExtraSmall || isSmall) {
                narrativePanel.style.top = '50px';
            } else {
                narrativePanel.style.top = '60px';
            }
            
            narrativePanel.style.left = '10px';
            narrativePanel.style.right = '10px';
            narrativePanel.style.width = 'calc(100% - 20px)';
            
            // Adjust maxHeight based on screen size to leave space for audio controls
            if (isExtraSmall) {
                narrativePanel.style.maxHeight = 'calc(100vh - 180px)';
                narrativePanel.style.paddingBottom = '80px';
            } else if (isSmall) {
                narrativePanel.style.maxHeight = 'calc(100vh - 160px)';
                narrativePanel.style.paddingBottom = '70px';
            } else {
                narrativePanel.style.maxHeight = 'calc(100vh - 150px)';
                narrativePanel.style.paddingBottom = '60px';
            }
            
            narrativePanel.style.overflow = 'auto'; // Add scrolling for overflow content
            narrativePanel.style.transform = 'none';
            narrativePanel.style.marginLeft = '0';
            narrativePanel.style.marginRight = '0';
            narrativePanel.style.padding = '15px';
            narrativePanel.style.zIndex = Z_INDICES.NARRATIVE_PANEL.toString();
            narrativePanel.style.background = 'rgba(0, 0, 0, 0.85)'; // More opaque background
            narrativePanel.style.borderRadius = '10px';
            narrativePanel.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
            
            narrativePanel.classList.add('landscape-mode');
            narrativePanel.classList.remove('portrait-mode');
        }
        
        // Add a class to the body to indicate landscape mode
        document.body.classList.add('landscape-mode');
        document.body.classList.remove('portrait-mode');
    } else {
        // Portrait orientation
        
        // First, set up the chapter navigation
        if (chapterNavigation) {
            // Make chapter navigation vertical on the left (original position)
            chapterNavigation.style.display = 'flex';
            chapterNavigation.style.visibility = 'visible';
            chapterNavigation.style.opacity = '1';
            chapterNavigation.style.position = 'fixed';
            chapterNavigation.style.flexDirection = 'column';
            chapterNavigation.style.left = '5px';
            chapterNavigation.style.right = 'auto';
            chapterNavigation.style.top = '50%';
            chapterNavigation.style.transform = 'translateY(-50%)';
            chapterNavigation.style.padding = '8px 5px';
            chapterNavigation.style.zIndex = Z_INDICES.CHAPTER_NAVIGATION.toString();
            chapterNavigation.style.background = 'rgba(0, 0, 0, 0.9)';
            chapterNavigation.style.borderRadius = '15px';
            chapterNavigation.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.7)';
            
            // Ensure the navigation doesn't bleed above the page
            chapterNavigation.style.maxHeight = '90vh';
            chapterNavigation.style.overflow = 'auto';
            
            chapterNavigation.classList.add('portrait-mode');
            chapterNavigation.classList.remove('landscape-mode');
            
            // Adjust chapter buttons for vertical layout
            const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
            chapterButtons.forEach(button => {
                button.style.margin = '5px 0';
                button.style.width = '30px';
                button.style.height = '30px';
            });
        }
        
        // Next, set up the narrative panel in its original position
        if (narrativePanel) {
            // Position to the right of chapter navigation (original position)
            narrativePanel.style.display = 'block';
            narrativePanel.style.visibility = 'visible';
            narrativePanel.style.opacity = '1';
            narrativePanel.style.position = 'fixed';
            
            // Adjust left position based on screen size
            if (isExtraSmall) {
                narrativePanel.style.left = '40px';
            } else {
                narrativePanel.style.left = '50px';
            }
            
            narrativePanel.style.right = '5px';
            
            // Adjust width based on screen size
            if (isExtraSmall) {
                narrativePanel.style.width = 'calc(100% - 50px)';
            } else {
                narrativePanel.style.width = 'calc(100% - 60px)';
            }
            
            narrativePanel.style.top = '50%';
            narrativePanel.style.transform = 'translateY(-50%)';
            
            // Adjust maxHeight based on screen size
            if (isExtraSmall) {
                narrativePanel.style.maxHeight = '60vh';
                narrativePanel.style.paddingBottom = '80px';
            } else if (isSmall) {
                narrativePanel.style.maxHeight = '65vh';
                narrativePanel.style.paddingBottom = '70px';
            } else {
                narrativePanel.style.maxHeight = '70vh';
                narrativePanel.style.paddingBottom = '60px';
            }
            
            narrativePanel.style.overflow = 'auto';
            narrativePanel.style.marginLeft = '0';
            narrativePanel.style.marginRight = '0';
            narrativePanel.style.padding = '15px';
            narrativePanel.style.zIndex = Z_INDICES.NARRATIVE_PANEL.toString();
            narrativePanel.style.background = 'rgba(0, 0, 0, 0.85)';
            narrativePanel.style.borderRadius = '10px';
            narrativePanel.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
            narrativePanel.style.transform = 'none';
            
            narrativePanel.classList.add('portrait-mode');
            narrativePanel.classList.remove('landscape-mode');
        }
        
        // Finally, set up the audio controls
        if (audioControls) {
            // Position at the bottom
            audioControls.style.display = 'flex';
            audioControls.style.visibility = 'visible';
            audioControls.style.opacity = '1';
            audioControls.style.position = 'fixed';
            
            // Adjust bottom position based on screen size
            if (isExtraSmall) {
                audioControls.style.bottom = '25px';
            } else if (isSmall) {
                audioControls.style.bottom = '20px';
            } else {
                audioControls.style.bottom = '15px';
            }
            
            // Adjust left position based on screen size
            if (isExtraSmall) {
                audioControls.style.left = '40px';
            } else {
                audioControls.style.left = '50px';
            }
            
            audioControls.style.right = '5px';
            
            // Adjust width based on screen size
            if (isExtraSmall) {
                audioControls.style.width = 'calc(100% - 50px)';
            } else {
                audioControls.style.width = 'calc(100% - 60px)';
            }
            
            // Adjust padding based on screen size
            if (isExtraSmall || isSmall) {
                audioControls.style.padding = '6px 8px';
            } else {
                audioControls.style.padding = '8px 10px';
            }
            
            audioControls.style.borderRadius = '25px';
            audioControls.style.zIndex = Z_INDICES.AUDIO_CONTROLS.toString();
            audioControls.style.background = 'rgba(45, 10, 49, 0.95)';
            
            audioControls.classList.add('portrait-mode');
            audioControls.classList.remove('landscape-mode');
            // Mark as applied
            orientationStylesApplied = true;
        }
        
        // Add a class to the body to indicate portrait mode
        document.body.classList.add('portrait-mode');
        document.body.classList.remove('landscape-mode');
    }
    
    // Ensure SVG overlay is visible
    const svgOverlay = document.querySelector('.svg-overlay');
    if (svgOverlay) {
        debug('Adjusting SVG overlay position');
        svgOverlay.style.top = '10px';
        svgOverlay.style.right = '10px';
        svgOverlay.style.zIndex = Z_INDICES.SVG_OVERLAY.toString();
    }
}

// Adjust layout based on screen size - maintained for compatibility with main.js
function adjustResponsiveLayout() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    debug(`Adjusting layout for screen size: ${width}x${height}`);
    
    // Remove existing screen size classes
    document.body.classList.remove('screen-xs', 'screen-sm', 'screen-md', 'screen-lg');
    
    // Add appropriate screen size class
    if (width <= 320) {
        document.body.classList.add('screen-xs');
    } else if (width <= 480) {
        document.body.classList.add('screen-sm');
    } else if (width <= 768) {
        document.body.classList.add('screen-md');
    } else {
        document.body.classList.add('screen-lg');
    }
    
    // Add orientation class based on matchMedia
    if (isLandscape()) {
        document.body.classList.add('landscape');
        document.body.classList.remove('portrait');
    } else {
        document.body.classList.add('portrait');
        document.body.classList.remove('landscape');
    }
    
    debug('Current body classes after screen size and orientation: ' + document.body.className);
    
    // Check if mobile mode is forced via toggle
    let isMobileModeForced = false;
    try {
        const storedValue = localStorage.getItem('mobileModeActive');
        debug('Mobile mode in localStorage (in adjustResponsiveLayout): ' + storedValue);
        isMobileModeForced = storedValue === 'true';
        debug('Is mobile mode forced (in adjustResponsiveLayout): ' + isMobileModeForced);
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
    
    // Check if we're on a mobile device
    const isMobileUserAgent = isMobile.any();
    debug('Is mobile device (in adjustResponsiveLayout): ' + isMobileUserAgent);
    
    // Only apply mobile-specific styles if on a mobile device or mobile mode is forced
    if (isMobileUserAgent || isMobileModeForced) {
        debug('Adjusting mobile layout from adjustResponsiveLayout');
        applyMobileLayout();
    } else {
        debug('Not in mobile mode - applying desktop layout');
        applyDesktopLayout();
    }
}

// Fix mobile-specific issues - maintained for compatibility with main.js
function fixMobileIssues(forceUpdate = false) {
    // Skip if already fixed and not forced to update
    if (mobileIssuesFixed && !forceUpdate) {
        debug('Mobile issues already fixed, skipping redundant call');
        return;
    }
    
    debug('Fixing mobile-specific issues');
    
    // Check if mobile mode is forced via toggle
    let isMobileModeForced = false;
    try {
        isMobileModeForced = localStorage.getItem('mobileModeActive') === 'true';
        debug('Mobile mode forced via localStorage: ' + isMobileModeForced);
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
    
    // Check if we're on a mobile device
    const isMobileUserAgent = isMobile.any();
    debug('Is mobile device: ' + isMobileUserAgent);
    debug('Is mobile mode forced: ' + isMobileModeForced);
    debug('Mobile device class present: ' + document.body.classList.contains('mobile-device'));
    
    // Only apply fixes if on a mobile device or mobile mode is forced
    if (!isMobileUserAgent && !isMobileModeForced) {
        debug('Not a mobile device and mobile mode not forced, skipping mobile fixes');
        return;
    }
    
    debug('Applying mobile fixes');
    
    // Fix play button
    const playButton = document.getElementById('play-button');
    if (playButton) {
        debug('Fixing play button');
        
        // Remove existing event listeners
        const newPlayButton = playButton.cloneNode(true);
        playButton.parentNode.replaceChild(newPlayButton, playButton);
        
        // Add new event listeners
        newPlayButton.addEventListener('click', function(e) {
            debug('Play button clicked');
            
            // Get the audio player
            const audioPlayer = document.getElementById('audio-player');
            if (audioPlayer) {
                if (audioPlayer.paused) {
                    debug('Starting audio playback');
                    audioPlayer.play().catch(error => {
                        debug(`Error playing audio: ${error.message}`);
                    });
                } else {
                    debug('Pausing audio playback');
                    audioPlayer.pause();
                }
                
                // Update play button state
                updatePlayButtonState();
            }
        });
        
        // Add touch event listeners
        newPlayButton.addEventListener('touchstart', function(e) {
            debug('Play button touch start');
            e.preventDefault();
        }, { passive: false });
        
        newPlayButton.addEventListener('touchend', function(e) {
            debug('Play button touch end');
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
    
    // Fix debug button
    const debugToggle = document.getElementById('debug-toggle');
    const debugPanel = document.getElementById('debug-panel');
    
    if (debugToggle && debugPanel) {
        debug('Fixing debug button');
        
        // Remove existing event listeners
        const newDebugToggle = debugToggle.cloneNode(true);
        debugToggle.parentNode.replaceChild(newDebugToggle, debugToggle);
        
        // Add new event listeners
        newDebugToggle.addEventListener('click', function(e) {
            debug('Debug toggle clicked');
            debugPanel.classList.toggle('visible');
            
            // Save state to localStorage with error handling
            const isVisible = debugPanel.classList.contains('visible');
            try {
                localStorage.setItem('debugPanelVisible', isVisible ? 'true' : 'false');
            } catch (e) {
                debug('localStorage unavailable: ' + e.message);
            }
        });
        
        // Add touch event listeners
        newDebugToggle.addEventListener('touchstart', function(e) {
            debug('Debug toggle touch start');
            e.preventDefault();
        }, { passive: false });
        
        newDebugToggle.addEventListener('touchend', function(e) {
            debug('Debug toggle touch end');
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
    
    // Fix chapter navigation
    const chapterNavigation = document.getElementById('chapter-navigation');
    if (chapterNavigation) {
        debug('Fixing chapter navigation');
        
        // Ensure chapter navigation is visible
        chapterNavigation.style.display = 'flex';
        chapterNavigation.style.visibility = 'visible';
        chapterNavigation.style.opacity = '1';
        
        // Fix chapter buttons
        const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
        chapterButtons.forEach((button, index) => {
            debug(`Fixing chapter button ${index + 1}`);
            
            // Remove existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new event listeners
            newButton.addEventListener('click', function(e) {
                debug(`Chapter button ${index + 1} clicked`);
                
                // Change chapter
                if (AppState && typeof AppState.currentChapter !== 'undefined') {
                    if (index !== AppState.currentChapter) {
                        debug(`Changing to chapter ${index + 1}`);
                        
                        // Import the changeChapter function dynamically
                        import('./navigation.js').then(module => {
                            if (module.changeChapter) {
                                module.changeChapter(index);
                            }
                        }).catch(error => {
                            debug(`Error importing navigation module: ${error.message}`);
                        });
                    }
                }
            });
            
            // Add touch event listeners
            newButton.addEventListener('touchstart', function(e) {
                debug(`Chapter button ${index + 1} touch start`);
                e.preventDefault();
            }, { passive: false });
            
            newButton.addEventListener('touchend', function(e) {
                debug(`Chapter button ${index + 1} touch end`);
                e.preventDefault();
                
                // Simulate a click event
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                this.dispatchEvent(clickEvent);
            }, { passive: false });
        });
        // Mark as fixed
        mobileIssuesFixed = true;
    }
}

// Update play button state
function updatePlayButtonState() {
    const playButton = document.getElementById('play-button');
    const audioPlayer = document.getElementById('audio-player');
    
    if (playButton && audioPlayer) {
        // Get the SVG inside the play button
        const svg = playButton.querySelector('svg');
        
        if (svg) {
            if (audioPlayer.paused) {
                // Show play icon
                svg.innerHTML = '<path d="M8 5v14l11-7z"/>';
            } else {
                // Show pause icon
                svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
            }
        }
    }
}

/**
 * Apply desktop-specific layout
 * This ensures proper element positioning in non-mobile mode
 * and aligns the narrative panel with the header
 */
function applyDesktopLayout() {
    debug('Applying desktop layout');
    
    // Get elements
    const chapterNavigation = document.getElementById('chapter-navigation');
    const narrativePanel = document.getElementById('narrative-panel');
    const audioControls = document.querySelector('.audio-controls');
    const header = document.querySelector('header') || document.querySelector('.header');
    const chapterCard = document.getElementById('chapter-card');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    debug(`Desktop layout for screen size: ${screenWidth}x${screenHeight}`);
    
    const isExtraSmall = screenWidth <= 320;
    const isSmall = screenWidth > 320 && screenWidth <= 480;
    const isMedium = screenWidth > 480 && screenWidth <= 768;
    const isLarge = screenWidth > 768;
    
    // Clean up unified panel
    if (window._unifiedPanelCleanup) {
        window._unifiedPanelCleanup();
        window._hasUnifiedPanelCleanup = false;
        window._hasUnifiedPanelResizeListener = false;
    }
    
    // Ensure the navigation play button is visible in desktop mode too
    const navPlayButton = document.querySelector('.nav-play-button');
    if (navPlayButton) {
        const buttonStyle = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 36px !important;
            height: 36px !important;
            border-radius: 50% !important;
            background: rgba(45, 10, 49, 0.95) !important;
            border: 2px solid var(--secondary-color) !important;
            z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            color: white !important;
            position: relative !important;
            margin: 5px auto !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
        `;
        navPlayButton.setAttribute('style', buttonStyle);
        debug('Ensuring navigation play button is visible in desktop mode');
    }
    
    // Show original audio controls in desktop mode with stronger styling
    if (audioControls) {
        // Remove any inline styles first to clear any previous mobile mode styles
        audioControls.removeAttribute('style');
        
        // Apply complete inline style with !important flags
        const audioControlsStyle = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: absolute !important;
            left: ${isMedium ? '190px' : '260px'} !important;
            right: ${isMedium ? '20px' : '40px'} !important;
            max-width: ${isMedium ? 'calc(100% - 210px)' : 'calc(100% - 300px)'} !important;
            z-index: ${Z_INDICES.AUDIO_CONTROLS} !important;
            padding: 10px !important;
            background: rgba(45, 10, 49, 0.95) !important;
            border-radius: 25px !important;
        `;
        
        audioControls.setAttribute('style', audioControlsStyle);
        debug('Showing original audio controls in desktop mode with enhanced styling');
        
        // Ensure the play button is visible and properly styled
        const playButton = audioControls.querySelector('.play-button');
        if (playButton) {
            playButton.style.setProperty('display', 'flex', 'important');
            playButton.style.setProperty('visibility', 'visible', 'important');
            playButton.style.setProperty('opacity', '1', 'important');
            debug('Ensuring play button is visible in desktop mode');
        }
    }
    
    // Position chapter navigation with complete inline style
    if (chapterNavigation) {
        debug('Positioning chapter navigation for desktop');
        
        const chapterNavStyle = `
            position: fixed !important;
            left: 20px !important;
            right: auto !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: ${Z_INDICES.CHAPTER_NAVIGATION} !important;
            width: ${isMedium ? '150px' : '200px'} !important;
            max-height: 90vh !important;
            overflow: auto !important;
            display: flex !important;
            flex-direction: column !important;
            visibility: visible !important;
            opacity: 1 !important;
            background: rgba(0, 0, 0, 0.5) !important;
            padding: 15px 10px !important;
            border-radius: 20px !important;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5) !important;
        `;
        
        chapterNavigation.setAttribute('style', chapterNavStyle);
        chapterNavigation.classList.remove('landscape-mode', 'portrait-mode');
        
        // Force a reflow
        void chapterNavigation.offsetHeight;
        
        // Check actual position after applying styles
        setTimeout(() => {
            const rect = chapterNavigation.getBoundingClientRect();
            debug(`Chapter navigation actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
        }, 100);
        
        const chapterButtons = chapterNavigation.querySelectorAll('.chapter-btn');
        chapterButtons.forEach(button => {
            button.setAttribute('style', 'margin: 5px 0 !important; position: relative !important; z-index: 310 !important; pointer-events: auto !important;');
        });
    }
    
    // Position narrative panel
if (narrativePanel) {
    debug('Positioning narrative panel for desktop');
    
    let headerRect = { top: 0, height: 0 };
    if (header) {
        headerRect = header.getBoundingClientRect();
        debug(`Header dimensions: top=${headerRect.top}, height=${headerRect.height}`);
    }
    
    const topPosition = header ? `${headerRect.top + headerRect.height + 20}px` : '220px';
    const leftPosition = isMedium ? '190px' : '260px';
    const rightPosition = isMedium ? '20px' : '40px';
    const maxWidth = isMedium ? 'calc(100% - 210px)' : 'calc(100% - 300px)';
    
    const narrativePanelStyle = `
        position: absolute !important;
        top: ${topPosition} !important;
        left: ${leftPosition} !important;
        right: ${rightPosition} !important;
        max-width: ${maxWidth} !important;
        max-height: 70vh !important;
        overflow: auto !important;
        z-index: ${Z_INDICES.NARRATIVE_PANEL} !important;
        padding: 15px !important;
        background: rgba(0, 0, 0, 0.85) !important;
        border-radius: 10px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) !important;
    `;
    
    narrativePanel.setAttribute('style', narrativePanelStyle);
    narrativePanel.classList.remove('landscape-mode', 'portrait-mode');
    
    // Force a reflow
    void narrativePanel.offsetHeight;
    
    debug(`Narrative panel positioned: left=${leftPosition}, top=${topPosition}, maxWidth=${maxWidth}`);
    
    // Check actual position after applying styles
    setTimeout(() => {
        const rect = narrativePanel.getBoundingClientRect();
        debug(`Narrative panel actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
    }, 100);
        
        // Ensure panel navigation is visible and clickable
        const panelNavigation = narrativePanel.querySelector('.panel-navigation');
        if (panelNavigation) {
            const navStyle = `
                position: relative !important;
                z-index: 150 !important;
                pointer-events: auto !important;
                display: flex !important;
                justify-content: space-between !important;
                margin-top: 15px !important;
            `;
            
            panelNavigation.setAttribute('style', navStyle);
            
            // Ensure buttons are clickable and consistently styled
            const buttons = panelNavigation.querySelectorAll('button');
            buttons.forEach(button => {
                const buttonStyle = `
                    position: relative !important;
                    z-index: 150 !important;
                    pointer-events: auto !important;
                    height: 36px !important;
                    min-width: 80px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    margin: 0 5px !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: none !important;
                    color: white !important;
                    padding: 8px 15px !important;
                    border-radius: 5px !important;
                    cursor: pointer !important;
                `;
                
                button.setAttribute('style', buttonStyle);
            });
            
            debug('Panel navigation buttons set to z-index 150 and pointer-events auto with consistent styling');
        }
    }
    
    // Position audio controls
    if (audioControls) {
        // Use the updated function that applies !important flags
        updateAudioControlsPosition(narrativePanel, audioControls, header, screenWidth, isLarge, isMedium);
    }
    
    // Position chapter card
    if (chapterCard) {
        chapterCard.style.setProperty('position', 'absolute', 'important');
        chapterCard.style.setProperty('top', '20px', 'important');
        chapterCard.style.setProperty('left', isMedium ? '190px' : '260px', 'important');
        chapterCard.style.setProperty('right', isMedium ? '20px' : '40px', 'important');
        chapterCard.style.setProperty('max-width', isMedium ? 'calc(100% - 210px)' : 'calc(100% - 300px)', 'important');
        chapterCard.style.setProperty('z-index', Z_INDICES.BASE.toString(), 'important');
        debug(`Chapter card positioned: left=${chapterCard.style.getPropertyValue('left')}, top=${chapterCard.style.getPropertyValue('top')}`);
    }
    
    // Set up MutationObserver for narrative panel
    if (narrativePanel && audioControls) {
        const observer = new MutationObserver(() => {
            debug('Narrative panel content changed, updating audio controls');
            updateAudioControlsPosition(narrativePanel, audioControls, header, screenWidth, isLarge, isMedium);
        });
        observer.observe(narrativePanel, { childList: true, subtree: true });
        debug('MutationObserver set up for narrative panel');
    }
    
    debug('Desktop layout applied');
}

/**
 * Update audio controls position based on narrative panel height
 * This function is called both during initial layout and when content changes
 */
function updateAudioControlsPosition(narrativePanel, audioControls, header, screenWidth, isLarge, isMedium) {
    if (!audioControls) return;

    debug('Updating audio controls position');

    // Completely replace the inline style with a new one
    const leftPosition = isMedium ? '190px' : '260px';
    const rightPosition = isMedium ? '20px' : '40px';
    const maxWidth = isMedium ? 'calc(100% - 210px)' : 'calc(100% - 300px)';
    
    // Calculate top position
    let topPosition = '300px';
    if (narrativePanel) {
        const narrativePanelRect = narrativePanel.getBoundingClientRect();
        const narrativePanelTop = narrativePanelRect.top;
        const narrativePanelHeight = narrativePanel.offsetHeight || 277;
        topPosition = `${narrativePanelTop + narrativePanelHeight + 40}px`;
        debug(`Audio controls positioned below narrative panel: top=${topPosition}, left=${leftPosition}, right=${rightPosition}, maxWidth=${maxWidth}`);
    } else if (header) {
        const headerRect = header.getBoundingClientRect();
        topPosition = `${headerRect.top + headerRect.height + 40}px`;
        debug(`Audio controls positioned below header: top=${topPosition}, left=${leftPosition}, right=${rightPosition}`);
    } else {
        debug(`Audio controls positioned with default: top=300px, left=${leftPosition}, right=${rightPosition}`);
    }
    
    // Create a complete inline style string with !important for all properties
    const styleString = `
        position: absolute !important;
        left: ${leftPosition} !important;
        right: ${rightPosition} !important;
        top: ${topPosition} !important;
        max-width: ${maxWidth} !important;
        z-index: ${Z_INDICES.AUDIO_CONTROLS} !important;
        padding: 10px !important;
        background: rgba(45, 10, 49, 0.95) !important;
        border-radius: 25px !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
    `;
    
    // Apply the complete style string
    audioControls.setAttribute('style', styleString);
    
    // Ensure the play button is visible and properly styled
    const playButton = audioControls.querySelector('.play-button');
    if (playButton) {
        const playButtonStyle = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            align-items: center !important;
            justify-content: center !important;
            width: 36px !important;
            height: 36px !important;
            border-radius: 50% !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border: none !important;
            cursor: pointer !important;
            margin-right: 10px !important;
            color: white !important;
        `;
        playButton.setAttribute('style', playButtonStyle);
        debug('Play button styled to ensure visibility');
    }
    
    // Force a reflow to ensure styles are applied
    void audioControls.offsetHeight;
    
    // Double-check position after applying styles
    setTimeout(() => {
        const rect = audioControls.getBoundingClientRect();
        debug(`Audio controls actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
        
        // Also check play button visibility
        if (playButton) {
            const playButtonRect = playButton.getBoundingClientRect();
            debug(`Play button actual position: top=${playButtonRect.top}px, left=${playButtonRect.left}px, width=${playButtonRect.width}px, height=${playButtonRect.height}px`);
        }
    }, 100);
}

/**
 * Add a play/pause button to the chapter navigation bar
 * This is a core functionality that should always be present regardless of mobile/desktop mode
 */
function addPlayButtonToNavigation() {
    debug('Adding play/pause button to chapter navigation');
    
    // Get the chapter navigation element
    const chapterNavigation = document.getElementById('chapter-navigation');
    if (!chapterNavigation) {
        debug('Chapter navigation not found, will retry in 100ms');
        // If chapter navigation isn't found, retry after a short delay
        setTimeout(addPlayButtonToNavigation, 100);
        return;
    }
    
    // Check if the play button already exists in the navigation
    let navPlayButton = chapterNavigation.querySelector('.nav-play-button');
    if (navPlayButton) {
        debug('Play button already exists in navigation');
        
        // Apply complete inline style with !important flags to ensure visibility
        const buttonStyle = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 36px !important;
            height: 36px !important;
            border-radius: 50% !important;
            background: rgba(45, 10, 49, 0.95) !important;
            border: 2px solid var(--secondary-color) !important;
            z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            color: white !important;
            position: relative !important;
            margin: 5px auto !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
        `;
        
        navPlayButton.setAttribute('style', buttonStyle);
        
        // Force a reflow to ensure styles are applied
        void navPlayButton.offsetHeight;
        
        // Check actual position after applying styles
        setTimeout(() => {
            const rect = navPlayButton.getBoundingClientRect();
            debug(`Navigation play button actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
        }, 100);
        
        return;
    }
    
    // Create a container for the play button
    const playButtonContainer = document.createElement('div');
    playButtonContainer.className = 'play-button-container';
    
    // Apply complete inline style with !important flags
    const containerStyle = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        align-items: center !important;
        justify-content: center !important;
        margin: 10px 0 !important;
        width: 100% !important;
        position: relative !important;
        z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
    `;
    
    playButtonContainer.setAttribute('style', containerStyle);
    
    // Create the play button
    navPlayButton = document.createElement('button');
    navPlayButton.className = 'nav-play-button';
    navPlayButton.setAttribute('aria-label', 'Play/Pause');
    
    // Apply complete inline style with !important flags to ensure visibility
    const buttonStyle = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        background: rgba(45, 10, 49, 0.95) !important;
        border: 2px solid var(--secondary-color) !important;
        z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        color: white !important;
        position: relative !important;
        margin: 5px auto !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
        transition: all 0.3s ease !important;
    `;
    
    navPlayButton.setAttribute('style', buttonStyle);
    
    // Set initial icon based on play state
    const audioPlayerElement = document.getElementById('audio-player');
    const isPlaying = audioPlayerElement ? !audioPlayerElement.paused : false;
    
    navPlayButton.innerHTML = isPlaying
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    
    // Add hover effect
    navPlayButton.addEventListener('mouseenter', () => {
        navPlayButton.style.transform = 'scale(1.1)';
        navPlayButton.style.borderColor = 'var(--accent-color)';
    });
    
    navPlayButton.addEventListener('mouseleave', () => {
        navPlayButton.style.transform = 'scale(1)';
        navPlayButton.style.borderColor = 'var(--secondary-color)';
    });
    
    // Add click event listener
    navPlayButton.addEventListener('click', () => {
        debug('Navigation play button clicked');
        
        // Import and call togglePlay from audio.js
        import('./audio.js').then(module => {
            if (module.togglePlay) {
                module.togglePlay();
                
                // Update button icon based on play state
                setTimeout(() => {
                    const updatedAudioPlayer = document.getElementById('audio-player');
                    const isPlaying = updatedAudioPlayer ? !updatedAudioPlayer.paused : false;
                    
                    navPlayButton.innerHTML = isPlaying
                        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
                        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                    
                    // Re-apply styles to ensure button remains visible after content change
                    setTimeout(() => {
                        const buttonStyle = `
                            display: flex !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            width: 36px !important;
                            height: 36px !important;
                            border-radius: 50% !important;
                            background: rgba(45, 10, 49, 0.95) !important;
                            border: 2px solid var(--secondary-color) !important;
                            z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
                            align-items: center !important;
                            justify-content: center !important;
                            cursor: pointer !important;
                            color: white !important;
                            position: relative !important;
                            margin: 5px auto !important;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
                            transition: all 0.3s ease !important;
                        `;
                        navPlayButton.setAttribute('style', buttonStyle);
                        debug('Re-applied styles to nav play button after click event');
                    }, 50);
                }, 100);
            }
        }).catch(error => {
            debug(`Error importing audio module: ${error.message}`);
        });
    });
    
    // Add touch event listeners for mobile
    navPlayButton.addEventListener('touchstart', function(e) {
        debug('Navigation play button touch start');
        e.preventDefault();
        navPlayButton.style.transform = 'scale(1.1)';
    }, { passive: false });
    
    navPlayButton.addEventListener('touchend', function(e) {
        debug('Navigation play button touch end');
        e.preventDefault();
        navPlayButton.style.transform = 'scale(1)';
        
        // Simulate a click event
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        navPlayButton.dispatchEvent(clickEvent);
    }, { passive: false });
    
    // Add the play button to the container
    playButtonContainer.appendChild(navPlayButton);
    
    // Add the container to the chapter navigation
    // Insert at the top of the navigation
    if (chapterNavigation.firstChild) {
        chapterNavigation.insertBefore(playButtonContainer, chapterNavigation.firstChild);
    } else {
        chapterNavigation.appendChild(playButtonContainer);
    }
    
    // Add a MutationObserver to update the play button when the audio player state changes
    const audioPlayerEvents = document.getElementById('audio-player');
    if (audioPlayerEvents) {
        audioPlayerEvents.addEventListener('play', () => {
            navPlayButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
            
            // Ensure button remains visible and properly styled after content change
            setTimeout(() => {
                // Re-apply the style to ensure it's maintained after content change
                const buttonStyle = `
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 36px !important;
                    height: 36px !important;
                    border-radius: 50% !important;
                    background: rgba(45, 10, 49, 0.95) !important;
                    border: 2px solid var(--secondary-color) !important;
                    z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    color: white !important;
                    position: relative !important;
                    margin: 5px auto !important;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
                    transition: all 0.3s ease !important;
                `;
                navPlayButton.setAttribute('style', buttonStyle);
                debug('Re-applied styles to nav play button after play event');
            }, 50);
        });
        
        audioPlayerEvents.addEventListener('pause', () => {
            navPlayButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            
            // Ensure button remains visible and properly styled after content change
            setTimeout(() => {
                // Re-apply the style to ensure it's maintained after content change
                const buttonStyle = `
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 36px !important;
                    height: 36px !important;
                    border-radius: 50% !important;
                    background: rgba(45, 10, 49, 0.95) !important;
                    border: 2px solid var(--secondary-color) !important;
                    z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    color: white !important;
                    position: relative !important;
                    margin: 5px auto !important;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
                    transition: all 0.3s ease !important;
                `;
                navPlayButton.setAttribute('style', buttonStyle);
                debug('Re-applied styles to nav play button after pause event');
            }, 50);
        });
        
        audioPlayerEvents.addEventListener('ended', () => {
            navPlayButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            
            // Ensure button remains visible and properly styled after content change
            setTimeout(() => {
                // Re-apply the style to ensure it's maintained after content change
                const buttonStyle = `
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 36px !important;
                    height: 36px !important;
                    border-radius: 50% !important;
                    background: rgba(45, 10, 49, 0.95) !important;
                    border: 2px solid var(--secondary-color) !important;
                    z-index: ${Z_INDICES.PLAY_BUTTON_NAV} !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    color: white !important;
                    position: relative !important;
                    margin: 5px auto !important;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
                    transition: all 0.3s ease !important;
                `;
                navPlayButton.setAttribute('style', buttonStyle);
                debug('Re-applied styles to nav play button after ended event');
            }, 50);
        });
    }
    
    debug('Play button added to chapter navigation');
}

// Export functions for use in main.js
export {
    initMobile,
    isMobile,
    adjustResponsiveLayout,
    fixMobileIssues,
    applyDesktopLayout
};