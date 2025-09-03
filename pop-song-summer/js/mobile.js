// Mobile-specific functionality for Pop Song Summer Experience

import { debug } from './utils.js';
import { AppState } from './main.js';

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
        const isMobileDevice = (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        debug('Is mobile device (from user agent):', isMobileDevice);
        return isMobileDevice;
    }
};

// Initialize mobile-specific functionality
function initMobile() {
    debug('Initializing mobile functionality');
    
    // Set up mobile toggle button
    debug('Setting up mobile toggle button');
    setupMobileToggle();
    
    // Check if we're on a mobile device
    const isMobileDevice = isMobile.any();
    debug('Is mobile device (from user agent): ' + isMobileDevice);
    
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
    
    if (isMobileDevice || isMobileModeForced) {
        debug('Mobile device detected or mobile mode forced');
        document.body.classList.add('mobile-device');
        document.body.classList.remove('desktop-device');
        
        debug('Body classes after applying mobile: ' + document.body.className);
        
        // Add touch-specific event handlers
        debug('Adding touch event handlers');
        addTouchHandlers();
        
        // Adjust layout for mobile
        debug('Adjusting layout for mobile');
        adjustMobileLayout();
        
        // Fix mobile-specific issues
        debug('Fixing mobile-specific issues');
        fixMobileIssues();
    } else {
        debug('Desktop device detected');
        document.body.classList.add('desktop-device');
        document.body.classList.remove('mobile-device');
        
        debug('Body classes after applying desktop: ' + document.body.className);
        
        // Ensure mobile-specific styles are not applied
        debug('Removing mobile-specific styles');
        document.querySelectorAll('.chapter-navigation, .play-button, .debug-toggle, .audio-controls').forEach(el => {
            el.removeAttribute('style');
        });
    }
    
    // Add orientation change handler
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', adjustResponsiveLayout);
    
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
        
        // Apply mobile fixes
        debug('Applying mobile layout adjustments during initialization');
        adjustMobileLayout();
        
        debug('Applying mobile-specific fixes during initialization');
        fixMobileIssues();
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
            document.querySelectorAll('.chapter-navigation, .play-button, .debug-toggle, .audio-controls').forEach(el => {
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
            
            // Apply mobile fixes
            debug('Applying mobile layout adjustments');
            adjustMobileLayout();
            
            debug('Applying mobile-specific fixes');
            fixMobileIssues();
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

// Handle orientation change
function handleOrientationChange() {
    debug('Orientation changed');
    
    // Add a small delay to ensure the orientation change is complete
    setTimeout(adjustResponsiveLayout, 300);
}

// Adjust layout based on screen size
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
    
    // Add orientation class
    if (width > height) {
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
    const isMobileDevice = isMobile.any();
    debug('Is mobile device (in adjustResponsiveLayout): ' + isMobileDevice);
    
    // Only adjust mobile layout if on a mobile device or mobile mode is forced
    if (isMobileDevice || isMobileModeForced) {
        debug('Adjusting mobile layout from adjustResponsiveLayout');
        // Adjust narrative panel position for mobile
        adjustMobileLayout();
    } else {
        debug('Not adjusting mobile layout - not a mobile device and mobile mode not forced');
    }
}

// Adjust layout specifically for mobile devices
function adjustMobileLayout() {
    const width = window.innerWidth;
    debug('Adjusting mobile layout, screen width: ' + width);
    
    // Check if mobile mode is forced via toggle
    let isMobileModeForced = false;
    try {
        const storedValue = localStorage.getItem('mobileModeActive');
        debug('Mobile mode in localStorage (in adjustMobileLayout): ' + storedValue);
        isMobileModeForced = storedValue === 'true';
        debug('Is mobile mode forced (in adjustMobileLayout): ' + isMobileModeForced);
    } catch (e) {
        debug('localStorage unavailable: ' + e.message);
    }
    
    // Check if we're on a mobile device
    const isMobileDevice = isMobile.any();
    debug('Is mobile device (in adjustMobileLayout): ' + isMobileDevice);
    debug('Current body classes (in adjustMobileLayout): ' + document.body.className);
    
    // Only apply these adjustments on small screens AND mobile devices (or if mobile mode is forced)
    if ((width <= 480 && isMobileDevice) || isMobileModeForced) {
        debug('Applying mobile-specific layout adjustments');
        
        // Ensure narrative panel is visible
        if (AppState && AppState.narrativePanel) {
            debug('Setting narrative panel display to block');
            AppState.narrativePanel.style.display = 'block';
        } else {
            debug('AppState or narrativePanel not available');
        }
        
        // Adjust SVG overlay position
        const svgOverlay = document.querySelector('.svg-overlay');
        if (svgOverlay) {
            debug('Adjusting SVG overlay position');
            svgOverlay.style.top = '10px';
            svgOverlay.style.right = '10px';
        } else {
            debug('SVG overlay not found');
        }
        
        // Ensure chapter navigation is visible
        const chapterNavigation = document.getElementById('chapter-navigation');
        if (chapterNavigation) {
            debug('Setting chapter navigation display to flex');
            chapterNavigation.style.display = 'flex';
        } else {
            debug('Chapter navigation not found');
        }
    } else {
        debug('Not applying mobile-specific layout adjustments - not a small screen mobile device and mobile mode not forced');
    }
}

// Fix mobile-specific issues
function fixMobileIssues() {
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
    const isMobileDevice = isMobile.any();
    debug('Is mobile device: ' + isMobileDevice);
    debug('Is mobile mode forced: ' + isMobileModeForced);
    debug('Mobile device class present: ' + document.body.classList.contains('mobile-device'));
    
    // Only apply fixes if on a mobile device or mobile mode is forced
    if (!isMobileDevice && !isMobileModeForced) {
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

// Export functions for use in main.js
export {
    initMobile,
    isMobile,
    adjustResponsiveLayout,
    fixMobileIssues
};