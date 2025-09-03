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
    
    // Prevent default touch behavior on certain elements
    const interactiveElements = document.querySelectorAll('.chapter-btn, .panel-nav-button, .play-button');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            // Don't prevent default on form elements
            if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
            }
        });
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

// Export functions for use in main.js
export default {
    initMobile,
    isMobile,
    adjustResponsiveLayout
};