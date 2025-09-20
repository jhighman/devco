/**
 * Debug Alignment Tool for Pop Song Summer Experience
 * This script helps debug layout issues by logging element positions
 */

import { debug } from './utils.js';

/**
 * Check alignment of key elements and log their positions
 * @param {boolean} verbose - Whether to log detailed information
 */
export function checkAlignment(verbose = false, showVisualFeedback = true) {
    debug('Checking element alignment...');
    
    // Create or update visual feedback panel if requested
    let feedbackPanel;
    if (showVisualFeedback) {
        feedbackPanel = document.getElementById('alignment-feedback-panel');
        if (!feedbackPanel) {
            feedbackPanel = document.createElement('div');
            feedbackPanel.id = 'alignment-feedback-panel';
            feedbackPanel.style.position = 'fixed';
            feedbackPanel.style.top = '100px';
            feedbackPanel.style.right = '20px';
            feedbackPanel.style.width = '300px';
            feedbackPanel.style.maxHeight = '70vh';
            feedbackPanel.style.overflow = 'auto';
            feedbackPanel.style.background = 'rgba(0, 0, 0, 0.85)';
            feedbackPanel.style.color = '#fff';
            feedbackPanel.style.padding = '15px';
            feedbackPanel.style.borderRadius = '8px';
            feedbackPanel.style.zIndex = '2000';
            feedbackPanel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
            feedbackPanel.style.fontSize = '12px';
            feedbackPanel.style.fontFamily = 'monospace';
            
            // Add close button
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '10px';
            closeButton.style.padding = '3px 8px';
            closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '3px';
            closeButton.style.color = '#fff';
            closeButton.style.cursor = 'pointer';
            closeButton.addEventListener('click', () => feedbackPanel.remove());
            
            feedbackPanel.appendChild(closeButton);
            document.body.appendChild(feedbackPanel);
        }
        
        // Clear previous content
        feedbackPanel.innerHTML = '<h3 style="margin-top: 0;">Alignment Check Results</h3><button id="close-alignment-panel" style="position: absolute; top: 10px; right: 10px; padding: 3px 8px; background: rgba(255, 255, 255, 0.2); border: none; border-radius: 3px; color: #fff; cursor: pointer;">Close</button>';
        document.getElementById('close-alignment-panel').addEventListener('click', () => feedbackPanel.remove());
    }
    
    // Function to add feedback to panel
    const addFeedback = (text, isWarning = false) => {
        if (showVisualFeedback && feedbackPanel) {
            const p = document.createElement('p');
            p.style.margin = '5px 0';
            p.style.color = isWarning ? '#ff6b6b' : '#fff';
            p.textContent = text;
            feedbackPanel.appendChild(p);
        }
        debug(text);
    };
    
    // Get key elements
    const header = document.querySelector('header') || document.querySelector('.header');
    const narrativePanel = document.getElementById('narrative-panel');
    const audioControls = document.querySelector('.audio-controls');
    const chapterNavigation = document.getElementById('chapter-navigation');
    const chapterCard = document.getElementById('chapter-card');
    const experienceContainer = document.querySelector('.experience-container');
    
    // Log viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    addFeedback(`Viewport dimensions: ${viewportWidth}x${viewportHeight}`);
    
    // Log experience container dimensions
    if (experienceContainer) {
        const containerRect = experienceContainer.getBoundingClientRect();
        addFeedback(`Experience container: left=${Math.round(containerRect.left)}, right=${Math.round(containerRect.right)}, width=${Math.round(containerRect.width)}, maxWidth=${getComputedStyle(experienceContainer).maxWidth}`);
    }
    
    // Log header position if it exists
    if (header) {
        const headerRect = header.getBoundingClientRect();
        addFeedback(`Header: top=${Math.round(headerRect.top)}, left=${Math.round(headerRect.left)}, width=${Math.round(headerRect.width)}, height=${Math.round(headerRect.height)}`);
    }
    
    // Log narrative panel position
    if (narrativePanel) {
        const narrativePanelRect = narrativePanel.getBoundingClientRect();
        const narrativePanelStyle = getComputedStyle(narrativePanel);
        addFeedback(`Narrative panel: top=${Math.round(narrativePanelRect.top)}, left=${Math.round(narrativePanelRect.left)}, right=${Math.round(narrativePanelRect.right)}, width=${Math.round(narrativePanelRect.width)}, height=${Math.round(narrativePanelRect.height)}`);
        addFeedback(`Narrative panel style: left=${narrativePanelStyle.left}, right=${narrativePanelStyle.right}, maxWidth=${narrativePanelStyle.maxWidth}, zIndex=${narrativePanelStyle.zIndex}`);
    }
    
    // Log audio controls position
    if (audioControls) {
        const audioControlsRect = audioControls.getBoundingClientRect();
        const audioControlsStyle = getComputedStyle(audioControls);
        addFeedback(`Audio controls: top=${Math.round(audioControlsRect.top)}, left=${Math.round(audioControlsRect.left)}, right=${Math.round(audioControlsRect.right)}, width=${Math.round(audioControlsRect.width)}, height=${Math.round(audioControlsRect.height)}`);
        addFeedback(`Audio controls style: left=${audioControlsStyle.left}, right=${audioControlsStyle.right}, maxWidth=${audioControlsStyle.maxWidth}, zIndex=${audioControlsStyle.zIndex}`);
    }
    
    // Log chapter navigation position
    if (chapterNavigation) {
        const chapterNavigationRect = chapterNavigation.getBoundingClientRect();
        const chapterNavigationStyle = getComputedStyle(chapterNavigation);
        addFeedback(`Chapter navigation: top=${Math.round(chapterNavigationRect.top)}, left=${Math.round(chapterNavigationRect.left)}, width=${Math.round(chapterNavigationRect.width)}, height=${Math.round(chapterNavigationRect.height)}`);
        addFeedback(`Chapter navigation style: left=${chapterNavigationStyle.left}, width=${chapterNavigationStyle.width}, zIndex=${chapterNavigationStyle.zIndex}`);
    }
    
    // Log chapter card position
    if (chapterCard) {
        const chapterCardRect = chapterCard.getBoundingClientRect();
        addFeedback(`Chapter card: top=${Math.round(chapterCardRect.top)}, left=${Math.round(chapterCardRect.left)}, width=${Math.round(chapterCardRect.width)}, height=${Math.round(chapterCardRect.height)}`);
    }
    
    // Check for alignment issues
    if (narrativePanel && chapterNavigation) {
        const narrativePanelRect = narrativePanel.getBoundingClientRect();
        const chapterNavigationRect = chapterNavigation.getBoundingClientRect();
        
        // Check if narrative panel overlaps with chapter navigation
        if (narrativePanelRect.left < chapterNavigationRect.right) {
            addFeedback('WARNING: Narrative panel overlaps with chapter navigation!', true);
            addFeedback(`Narrative panel left: ${Math.round(narrativePanelRect.left)}, Chapter navigation right: ${Math.round(chapterNavigationRect.right)}`, true);
        } else {
            addFeedback(`Spacing between chapter navigation and narrative panel: ${Math.round(narrativePanelRect.left - chapterNavigationRect.right)}px`);
        }
    }
    
    if (narrativePanel && audioControls) {
        const narrativePanelRect = narrativePanel.getBoundingClientRect();
        const audioControlsRect = audioControls.getBoundingClientRect();
        
        // Check if audio controls are properly positioned below narrative panel
        if (audioControlsRect.top < narrativePanelRect.bottom) {
            addFeedback('WARNING: Audio controls overlap with narrative panel!', true);
            addFeedback(`Audio controls top: ${Math.round(audioControlsRect.top)}, Narrative panel bottom: ${Math.round(narrativePanelRect.bottom)}`, true);
        } else {
            addFeedback(`Spacing between narrative panel and audio controls: ${Math.round(audioControlsRect.top - narrativePanelRect.bottom)}px`);
        }
        
        // Check if audio controls and narrative panel have the same left alignment
        if (Math.abs(audioControlsRect.left - narrativePanelRect.left) > 1) {
            addFeedback('WARNING: Audio controls and narrative panel have different left alignment!', true);
            addFeedback(`Audio controls left: ${Math.round(audioControlsRect.left)}, Narrative panel left: ${Math.round(narrativePanelRect.left)}`, true);
        }
    }
    
    // Log additional details if verbose mode is enabled
    if (verbose) {
        // Log all z-indices
        addFeedback('Z-index hierarchy:');
        if (chapterNavigation) addFeedback(`Chapter navigation z-index: ${getComputedStyle(chapterNavigation).zIndex}`);
        if (audioControls) addFeedback(`Audio controls z-index: ${getComputedStyle(audioControls).zIndex}`);
        if (narrativePanel) addFeedback(`Narrative panel z-index: ${getComputedStyle(narrativePanel).zIndex}`);
        if (chapterCard) addFeedback(`Chapter card z-index: ${getComputedStyle(chapterCard).zIndex}`);
        
        // Log all computed styles for key elements
        if (narrativePanel) {
            const style = getComputedStyle(narrativePanel);
            debug('Narrative panel computed styles:');
            debug(`position: ${style.position}, display: ${style.display}, visibility: ${style.visibility}`);
            debug(`top: ${style.top}, left: ${style.left}, right: ${style.right}, bottom: ${style.bottom}`);
            debug(`width: ${style.width}, max-width: ${style.maxWidth}, height: ${style.height}, max-height: ${style.maxHeight}`);
            debug(`padding: ${style.padding}, margin: ${style.margin}, box-sizing: ${style.boxSizing}`);
            debug(`background: ${style.background}, border-radius: ${style.borderRadius}`);
        }
        
        if (audioControls) {
            const style = getComputedStyle(audioControls);
            debug('Audio controls computed styles:');
            debug(`position: ${style.position}, display: ${style.display}, visibility: ${style.visibility}`);
            debug(`top: ${style.top}, left: ${style.left}, right: ${style.right}, bottom: ${style.bottom}`);
            debug(`width: ${style.width}, max-width: ${style.maxWidth}, height: ${style.height}`);
            debug(`padding: ${style.padding}, margin: ${style.margin}, box-sizing: ${style.boxSizing}`);
            debug(`background: ${style.background}, border-radius: ${style.borderRadius}`);
        }
    }
    
    addFeedback('Alignment check complete');
    
    // Add visual indicators if requested
    if (showVisualFeedback) {
        // Add temporary visual indicators for key elements
        const addIndicator = (element, color) => {
            if (!element) return;
            
            const rect = element.getBoundingClientRect();
            const indicator = document.createElement('div');
            indicator.className = 'alignment-indicator';
            indicator.style.position = 'fixed';
            indicator.style.top = rect.top + 'px';
            indicator.style.left = rect.left + 'px';
            indicator.style.width = rect.width + 'px';
            indicator.style.height = rect.height + 'px';
            indicator.style.border = `2px solid ${color}`;
            indicator.style.backgroundColor = 'transparent';
            indicator.style.zIndex = '1999';
            indicator.style.pointerEvents = 'none';
            indicator.style.opacity = '0.7';
            document.body.appendChild(indicator);
            
            // Remove after 3 seconds
            setTimeout(() => {
                indicator.remove();
            }, 3000);
        };
        
        // Add indicators for key elements
        if (narrativePanel) addIndicator(narrativePanel, '#ff5722');
        if (audioControls) addIndicator(audioControls, '#2196f3');
        if (chapterNavigation) addIndicator(chapterNavigation, '#4caf50');
    }
}

/**
 * Add a button to trigger alignment check
 */
export function addAlignmentDebugButton() {
    // Create button if it doesn't exist
    if (!document.getElementById('check-alignment-btn')) {
        const button = document.createElement('button');
        button.id = 'check-alignment-btn';
        button.textContent = 'Check Alignment';
        button.style.position = 'fixed';
        button.style.bottom = '10px';
        button.style.right = '10px';
        button.style.zIndex = '1000';
        button.style.padding = '5px 10px';
        button.style.background = 'rgba(0, 0, 0, 0.7)';
        button.style.color = '#fff';
        button.style.border = '1px solid #555';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '12px';
        
        // Add click event
        button.addEventListener('click', () => {
            checkAlignment(true, true);
        });
        
        // Add to document
        document.body.appendChild(button);
        debug('Alignment debug button added');
    }
}

// Initialize when imported
export function initDebugAlignment() {
    // Add button to check alignment
    addAlignmentDebugButton();
    
    // Check alignment on load and resize
    window.addEventListener('load', () => checkAlignment());
    window.addEventListener('resize', () => {
        setTimeout(() => checkAlignment(), 500); // Check after resize completes
    });
    
    // Initial check
    setTimeout(() => checkAlignment(), 1000);
    
    debug('Debug alignment initialized');
}