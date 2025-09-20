/**
 * Test script for verifying layout at specific resolutions
 * This script helps test the layout at 1407x685 and 500x685 resolutions
 */

import { debug } from './utils.js';
import { checkAlignment } from './debug-alignment.js';

/**
 * Test layout at specific resolutions
 */
export function testResolutions() {
    debug('Starting resolution tests...');
    
    // Create test button
    const button = document.createElement('button');
    button.id = 'test-resolutions-btn';
    button.textContent = 'Test Resolutions';
    button.style.position = 'fixed';
    button.style.bottom = '50px';
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
        runResolutionTests();
    });
    
    // Add to document
    document.body.appendChild(button);
    debug('Resolution test button added');
    
    // Add resolution indicator
    const indicator = document.createElement('div');
    indicator.id = 'resolution-indicator';
    indicator.style.position = 'fixed';
    indicator.style.top = '10px';
    indicator.style.left = '10px';
    indicator.style.zIndex = '1000';
    indicator.style.padding = '5px 10px';
    indicator.style.background = 'rgba(0, 0, 0, 0.7)';
    indicator.style.color = '#fff';
    indicator.style.border = '1px solid #555';
    indicator.style.borderRadius = '5px';
    indicator.style.fontSize = '12px';
    indicator.textContent = `Current: ${window.innerWidth}x${window.innerHeight}`;
    
    // Add to document
    document.body.appendChild(indicator);
    
    // Update indicator on resize
    window.addEventListener('resize', () => {
        indicator.textContent = `Current: ${window.innerWidth}x${window.innerHeight}`;
    });
}

/**
 * Run tests at specified resolutions
 */
function runResolutionTests() {
    debug('Running resolution tests...');
    
    // Store original window size
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;
    
    // Create test panel
    const testPanel = document.createElement('div');
    testPanel.id = 'resolution-test-panel';
    testPanel.style.position = 'fixed';
    testPanel.style.top = '50%';
    testPanel.style.left = '50%';
    testPanel.style.transform = 'translate(-50%, -50%)';
    testPanel.style.zIndex = '2000';
    testPanel.style.padding = '20px';
    testPanel.style.background = 'rgba(0, 0, 0, 0.9)';
    testPanel.style.color = '#fff';
    testPanel.style.border = '1px solid #555';
    testPanel.style.borderRadius = '10px';
    testPanel.style.width = '400px';
    testPanel.style.maxHeight = '80vh';
    testPanel.style.overflow = 'auto';
    testPanel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    
    // Add content
    testPanel.innerHTML = `
        <h2 style="margin-top: 0; color: #fff;">Resolution Tests</h2>
        <p>Click a button to resize the window for testing:</p>
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button id="test-1407x685" style="padding: 5px 10px; cursor: pointer;">Test 1407x685</button>
            <button id="test-500x685" style="padding: 5px 10px; cursor: pointer;">Test 500x685</button>
            <button id="restore-size" style="padding: 5px 10px; cursor: pointer;">Restore Original Size</button>
        </div>
        <div id="test-results" style="margin-top: 15px; border-top: 1px solid #555; padding-top: 15px;">
            <p>Results will appear here after testing...</p>
        </div>
        <button id="close-test-panel" style="margin-top: 15px; padding: 5px 10px; cursor: pointer;">Close</button>
    `;
    
    // Add to document
    document.body.appendChild(testPanel);
    
    // Add event listeners
    document.getElementById('test-1407x685').addEventListener('click', () => {
        resizeWindow(1407, 685);
        setTimeout(() => {
            testResolution('1407x685');
        }, 500);
    });
    
    document.getElementById('test-500x685').addEventListener('click', () => {
        resizeWindow(500, 685);
        setTimeout(() => {
            testResolution('500x685');
        }, 500);
    });
    
    document.getElementById('restore-size').addEventListener('click', () => {
        try {
            // Restore original viewport
            let viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0';
            }
            
            // Reset body dimensions
            document.body.style.width = '';
            document.body.style.height = '';
            
            // Update the resolution indicator
            const indicator = document.getElementById('resolution-indicator');
            if (indicator) {
                indicator.textContent = `Current: ${window.innerWidth}x${window.innerHeight}`;
                indicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
            
            // Dispatch a custom resize event
            window.dispatchEvent(new Event('resize'));
            
            document.getElementById('test-results').innerHTML = '<p>Original size restored.</p>';
            debug('Original size restored');
        } catch (error) {
            debug(`Error restoring size: ${error.message}`);
            document.getElementById('test-results').innerHTML = '<p>Error restoring size: ' + error.message + '</p>';
        }
    });
    
    document.getElementById('close-test-panel').addEventListener('click', () => {
        testPanel.remove();
    });
}

/**
 * Resize window to specified dimensions
 * @param {number} width - Target width
 * @param {number} height - Target height
 */
function resizeWindow(width, height) {
    try {
        // Modern browsers restrict window.resizeTo for security reasons
        // Instead, we'll simulate the resize by updating viewport meta tag
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        
        // Set the viewport width
        viewport.content = `width=${width}, height=${height}`;
        
        // Update window inner dimensions for testing purposes
        window._testWidth = width;
        window._testHeight = height;
        
        // Update the resolution indicator
        const indicator = document.getElementById('resolution-indicator');
        if (indicator) {
            indicator.textContent = `Test: ${width}x${height} (Simulated)`;
            indicator.style.backgroundColor = 'rgba(255, 87, 34, 0.7)';
        }
        
        // Force layout recalculation
        document.body.style.width = width + 'px';
        document.body.style.height = height + 'px';
        
        // Dispatch a custom resize event
        window.dispatchEvent(new Event('resize'));
        
        debug(`Window simulated resize to ${width}x${height}`);
    } catch (error) {
        debug(`Error resizing window: ${error.message}`);
    }
}

/**
 * Test layout at current resolution
 * @param {string} resolutionName - Name of the resolution being tested
 */
function testResolution(resolutionName) {
    debug(`Testing layout at ${resolutionName}...`);
    
    // Get key elements
    const narrativePanel = document.getElementById('narrative-panel');
    const audioControls = document.querySelector('.audio-controls');
    const chapterNavigation = document.getElementById('chapter-navigation');
    const panelNavigation = document.querySelector('.panel-navigation');
    const panelNavButtons = document.querySelectorAll('.panel-nav-button');
    
    // Run alignment check
    checkAlignment(true);
    
    // Get results
    let results = `<h3>Test Results for ${resolutionName}</h3>`;
    
    // Check if elements exist
    if (!narrativePanel || !audioControls || !chapterNavigation) {
        results += '<p style="color: red;">ERROR: One or more required elements not found!</p>';
        document.getElementById('test-results').innerHTML = results;
        return;
    }
    
    // Get element positions
    const narrativePanelRect = narrativePanel.getBoundingClientRect();
    const audioControlsRect = audioControls.getBoundingClientRect();
    const chapterNavigationRect = chapterNavigation.getBoundingClientRect();
    
    // Check narrative panel position
    results += '<h4>Narrative Panel</h4>';
    results += `<p>Position: left=${Math.round(narrativePanelRect.left)}px, right=${Math.round(window.innerWidth - narrativePanelRect.right)}px</p>`;
    results += `<p>Width: ${Math.round(narrativePanelRect.width)}px</p>`;
    
    // Check if narrative panel is correctly positioned
    const correctNarrativePanelLeft = chapterNavigationRect.right + 20; // Should be 20px to the right of chapter navigation
    const isNarrativePanelLeftCorrect = Math.abs(narrativePanelRect.left - correctNarrativePanelLeft) <= 5; // Allow 5px tolerance
    
    if (isNarrativePanelLeftCorrect) {
        results += '<p style="color: green;">✓ Narrative panel is correctly positioned horizontally</p>';
    } else {
        results += `<p style="color: red;">✗ Narrative panel is incorrectly positioned horizontally (expected left: ~${Math.round(correctNarrativePanelLeft)}px)</p>`;
    }
    
    // Check audio controls position
    results += '<h4>Audio Controls</h4>';
    results += `<p>Position: left=${Math.round(audioControlsRect.left)}px, right=${Math.round(window.innerWidth - audioControlsRect.right)}px</p>`;
    results += `<p>Width: ${Math.round(audioControlsRect.width)}px</p>`;
    
    // Check if audio controls align with narrative panel
    const isAudioControlsAligned = Math.abs(audioControlsRect.left - narrativePanelRect.left) <= 5; // Allow 5px tolerance
    
    if (isAudioControlsAligned) {
        results += '<p style="color: green;">✓ Audio controls align with narrative panel</p>';
    } else {
        results += `<p style="color: red;">✗ Audio controls do not align with narrative panel (difference: ${Math.round(audioControlsRect.left - narrativePanelRect.left)}px)</p>`;
    }
    
    // Check if audio controls are below narrative panel
    const isAudioControlsBelow = audioControlsRect.top >= narrativePanelRect.bottom;
    
    if (isAudioControlsBelow) {
        results += '<p style="color: green;">✓ Audio controls are positioned below narrative panel</p>';
    } else {
        results += '<p style="color: red;">✗ Audio controls overlap with narrative panel</p>';
    }
    
    // Check z-index values
    const narrativePanelZIndex = parseInt(getComputedStyle(narrativePanel).zIndex);
    const audioControlsZIndex = parseInt(getComputedStyle(audioControls).zIndex);
    const chapterNavigationZIndex = parseInt(getComputedStyle(chapterNavigation).zIndex);
    
    results += '<h4>Z-Index Values</h4>';
    results += `<p>Chapter Navigation: ${chapterNavigationZIndex}</p>`;
    results += `<p>Audio Controls: ${audioControlsZIndex}</p>`;
    results += `<p>Narrative Panel: ${narrativePanelZIndex}</p>`;
    
    // Check if z-index hierarchy is correct
    const isZIndexCorrect = chapterNavigationZIndex > audioControlsZIndex && audioControlsZIndex > narrativePanelZIndex;
    
    if (isZIndexCorrect) {
        results += '<p style="color: green;">✓ Z-index hierarchy is correct</p>';
    } else {
        results += '<p style="color: red;">✗ Z-index hierarchy is incorrect</p>';
    }
    
    // Check navigation panel buttons alignment
    results += '<h4>Navigation Panel Buttons</h4>';
    
    let isNavButtonsAligned = true;
    let buttonAlignmentDetails = '';
    
    if (panelNavigation && panelNavButtons.length >= 2) {
        // Check if buttons have consistent styling
        const firstButton = panelNavButtons[0];
        const secondButton = panelNavButtons[1];
        
        // Get computed styles
        const firstButtonStyle = window.getComputedStyle(firstButton);
        const secondButtonStyle = window.getComputedStyle(secondButton);
        
        // Check if buttons have the same height
        const sameHeight = firstButtonStyle.height === secondButtonStyle.height;
        buttonAlignmentDetails += `<p>Same height: ${sameHeight ? '✓' : '✗'} (${firstButtonStyle.height} vs ${secondButtonStyle.height})</p>`;
        
        // Check if buttons have the same padding
        const samePadding = firstButtonStyle.padding === secondButtonStyle.padding;
        buttonAlignmentDetails += `<p>Same padding: ${samePadding ? '✓' : '✗'} (${firstButtonStyle.padding} vs ${secondButtonStyle.padding})</p>`;
        
        // Check if buttons are aligned vertically (same top position)
        const firstRect = firstButton.getBoundingClientRect();
        const secondRect = secondButton.getBoundingClientRect();
        const sameVerticalAlignment = Math.abs(firstRect.top - secondRect.top) <= 1;
        buttonAlignmentDetails += `<p>Same vertical alignment: ${sameVerticalAlignment ? '✓' : '✗'} (${Math.round(firstRect.top)}px vs ${Math.round(secondRect.top)}px)</p>`;
        
        // Check if buttons have the same z-index
        const sameZIndex = firstButtonStyle.zIndex === secondButtonStyle.zIndex;
        buttonAlignmentDetails += `<p>Same z-index: ${sameZIndex ? '✓' : '✗'} (${firstButtonStyle.zIndex} vs ${secondButtonStyle.zIndex})</p>`;
        
        // Overall button alignment check
        isNavButtonsAligned = sameHeight && samePadding && sameVerticalAlignment && sameZIndex;
        
        if (isNavButtonsAligned) {
            results += '<p style="color: green;">✓ Navigation panel buttons are aligned and consistent</p>';
        } else {
            results += '<p style="color: red;">✗ Navigation panel buttons are not aligned or inconsistent</p>';
            results += buttonAlignmentDetails;
        }
    } else {
        results += '<p style="color: orange;">⚠ Could not check navigation panel buttons (not found or insufficient buttons)</p>';
        isNavButtonsAligned = true; // Don't fail the test if buttons aren't found
    }
    
    // Overall result
    const isOverallCorrect = isNarrativePanelLeftCorrect && isAudioControlsAligned && isAudioControlsBelow && isZIndexCorrect && isNavButtonsAligned;
    
    results += '<h4>Overall Result</h4>';
    if (isOverallCorrect) {
        results += '<p style="color: green; font-weight: bold;">✓ All tests passed for ' + resolutionName + '</p>';
    } else {
        results += '<p style="color: red; font-weight: bold;">✗ Some tests failed for ' + resolutionName + '</p>';
    }
    
    // Update results
    document.getElementById('test-results').innerHTML = results;
    
    debug(`Test completed for ${resolutionName}`);
}

// Initialize when imported
export function initResolutionTests() {
    // Add test button when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', testResolutions);
    } else {
        testResolutions();
    }
    
    debug('Resolution tests initialized');
}