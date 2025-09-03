// Mobile-specific functionality for Pop Song Summer Experience

import { debug } from './utils.js';
import { AppState } from './main.js';

// Detect if we're on a mobile device
export const isMobile = {
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
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// Initialize mobile-specific functionality
export function initMobile() {
    debug('Initializing mobile functionality');
    
    // Check if we're on a mobile device
    if (isMobile.any()) {
        debug('Mobile device detected');
        document.body.classList.add('mobile-device');
        
        // Add touch-specific event handlers
        addTouchHandlers();
        
        // Adjust layout for mobile
        adjustMobileLayout();
        
        // Fix mobile-specific issues
        fixMobileIssues();
    } else {
        debug('Desktop device detected');
        document.body.classList.add('desktop-device');
    }
    
    // Add orientation change handler
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', adjustResponsiveLayout);
    
    // Initial layout adjustment
    adjustResponsiveLayout();
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
    
    // Adjust narrative panel position for mobile
    adjustMobileLayout();
}

// Adjust layout specifically for mobile devices
function adjustMobileLayout() {
    const width = window.innerWidth;
    
    // Only apply these adjustments on small screens
    if (width <= 480) {
        debug('Applying mobile-specific layout adjustments');
        
        // Ensure narrative panel is visible
        if (AppState && AppState.narrativePanel) {
            AppState.narrativePanel.style.display = 'block';
        }
        
        // Adjust SVG overlay position
        const svgOverlay = document.querySelector('.svg-overlay');
        if (svgOverlay) {
            svgOverlay.style.top = '10px';
            svgOverlay.style.right = '10px';
        }
        
        // Ensure chapter navigation is visible
        const chapterNavigation = document.getElementById('chapter-navigation');
        if (chapterNavigation) {
            chapterNavigation.style.display = 'flex';
        }
    }
}

// Fix mobile-specific issues
function fixMobileIssues() {
    debug('Fixing mobile-specific issues');
    
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
export default {
    initMobile,
    isMobile,
    adjustResponsiveLayout,
    fixMobileIssues
};