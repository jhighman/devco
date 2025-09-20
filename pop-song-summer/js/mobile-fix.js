// mobile-fix.js - Dedicated fixes for mobile and desktop layout issues

import { debug } from './utils.js';
import { AppState } from './main.js';

// Execute fixes when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    debug('Mobile-fix.js: Applying fixes for layout issues');
    
    // Apply fixes immediately
    applyFixes();
    
    // Also apply fixes after a delay to ensure they take effect after other scripts
    setTimeout(applyFixes, 500);
    setTimeout(applyFixes, 1000);
    setTimeout(applyFixes, 2000);
});

// Apply all fixes
function applyFixes() {
    debug('Mobile-fix.js: Applying fixes');
    
    // Fix play button visibility
    fixPlayButtonVisibility();
    
    // Fix audio controls positioning
    fixAudioControlsPosition();
    
    // Fix narrative panel positioning
    fixNarrativePanelPosition();
}

// Fix play button visibility
function fixPlayButtonVisibility() {
    debug('Mobile-fix.js: Fixing play button visibility');
    
    const playButton = document.getElementById('play-button');
    if (playButton) {
        // Apply complete inline style with !important flags
        const buttonStyle = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            background: var(--horizon-orange) !important;
            border: none !important;
            color: white !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            margin-right: 15px !important;
            z-index: 201 !important;
            position: relative !important;
        `;
        
        playButton.setAttribute('style', buttonStyle);
        debug('Mobile-fix.js: Play button style applied');
        
        // Force a reflow to ensure styles are applied
        void playButton.offsetHeight;
        
        // Check actual position after applying styles
        setTimeout(() => {
            const rect = playButton.getBoundingClientRect();
            debug(`Mobile-fix.js: Play button actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
            debug(`Mobile-fix.js: Play button computed style: display=${window.getComputedStyle(playButton).display}, visibility=${window.getComputedStyle(playButton).visibility}, opacity=${window.getComputedStyle(playButton).opacity}`);
        }, 100);
    } else {
        debug('Mobile-fix.js: Play button not found');
    }
    
    // Also fix the navigation play button if it exists
    const navPlayButton = document.querySelector('.nav-play-button');
    if (navPlayButton) {
        // Apply complete inline style with !important flags
        const navButtonStyle = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 36px !important;
            height: 36px !important;
            border-radius: 50% !important;
            background: rgba(45, 10, 49, 0.95) !important;
            border: 2px solid var(--secondary-color) !important;
            z-index: 350 !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            color: white !important;
            position: relative !important;
            margin: 5px auto !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
        `;
        
        navPlayButton.setAttribute('style', navButtonStyle);
        debug('Mobile-fix.js: Navigation play button style applied');
    }
}

// Fix audio controls positioning
function fixAudioControlsPosition() {
    debug('Mobile-fix.js: Fixing audio controls position');
    
    const audioControls = document.querySelector('.audio-controls');
    if (audioControls) {
        // Check if we're in mobile mode
        const isMobileMode = document.body.classList.contains('mobile-device');
        
        if (isMobileMode) {
            // In mobile mode, hide the original audio controls
            audioControls.style.setProperty('display', 'none', 'important');
            audioControls.style.setProperty('visibility', 'hidden', 'important');
            debug('Mobile-fix.js: Hiding audio controls in mobile mode');
        } else {
            // In desktop mode, show the audio controls with proper positioning
            const narrativePanel = document.getElementById('narrative-panel');
            let topPosition = '300px';
            
            if (narrativePanel) {
                const narrativePanelRect = narrativePanel.getBoundingClientRect();
                const narrativePanelTop = narrativePanelRect.top;
                const narrativePanelHeight = narrativePanel.offsetHeight || 277;
                topPosition = `${narrativePanelTop + narrativePanelHeight + 40}px`;
            }
            
            // Apply complete inline style with !important flags
            const styleString = `
                position: absolute !important;
                left: 260px !important;
                right: 40px !important;
                top: ${topPosition} !important;
                max-width: calc(100% - 300px) !important;
                z-index: 200 !important;
                padding: 10px !important;
                background: rgba(45, 10, 49, 0.95) !important;
                border-radius: 25px !important;
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            `;
            
            audioControls.setAttribute('style', styleString);
            debug(`Mobile-fix.js: Audio controls positioned at top=${topPosition}`);
            
            // Force a reflow to ensure styles are applied
            void audioControls.offsetHeight;
            
            // Check actual position after applying styles
            setTimeout(() => {
                const rect = audioControls.getBoundingClientRect();
                debug(`Mobile-fix.js: Audio controls actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
            }, 100);
        }
    } else {
        debug('Mobile-fix.js: Audio controls not found');
    }
}

// Fix narrative panel positioning
function fixNarrativePanelPosition() {
    debug('Mobile-fix.js: Fixing narrative panel position');
    
    const narrativePanel = document.getElementById('narrative-panel');
    if (narrativePanel) {
        // Check if we're in mobile mode
        const isMobileMode = document.body.classList.contains('mobile-device');
        
        if (isMobileMode) {
            // In mobile mode, position the narrative panel appropriately
            const styleString = `
                position: fixed !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                left: 50px !important;
                right: 5px !important;
                width: calc(100% - 60px) !important;
                max-height: 70vh !important;
                overflow: auto !important;
                z-index: 100 !important;
                padding: 15px !important;
                background: rgba(0, 0, 0, 0.85) !important;
                border-radius: 10px !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            `;
            
            narrativePanel.setAttribute('style', styleString);
            debug('Mobile-fix.js: Narrative panel positioned for mobile');
        } else {
            // In desktop mode, position the narrative panel appropriately
            const styleString = `
                position: absolute !important;
                top: 240px !important;
                left: 260px !important;
                right: 40px !important;
                max-width: calc(100% - 300px) !important;
                max-height: 70vh !important;
                overflow: auto !important;
                z-index: 100 !important;
                padding: 15px !important;
                background: rgba(0, 0, 0, 0.85) !important;
                border-radius: 10px !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            `;
            
            narrativePanel.setAttribute('style', styleString);
            debug('Mobile-fix.js: Narrative panel positioned for desktop');
        }
        
        // Force a reflow to ensure styles are applied
        void narrativePanel.offsetHeight;
        
        // Check actual position after applying styles
        setTimeout(() => {
            const rect = narrativePanel.getBoundingClientRect();
            debug(`Mobile-fix.js: Narrative panel actual position: top=${rect.top}px, left=${rect.left}px, width=${rect.width}px, height=${rect.height}px`);
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
            
            debug('Mobile-fix.js: Panel navigation buttons styled');
        }
    } else {
        debug('Mobile-fix.js: Narrative panel not found');
    }
}

// Add window resize event listener to reapply fixes
window.addEventListener('resize', function() {
    debug('Mobile-fix.js: Window resized, reapplying fixes');
    applyFixes();
});

// Export functions for use in other modules
export {
    applyFixes,
    fixPlayButtonVisibility,
    fixAudioControlsPosition,
    fixNarrativePanelPosition
};