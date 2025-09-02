import { debug } from './utils.js';
import { AppState } from './main.js';
import { updatePlayButton } from './audio.js';
import { updateChapterCard, clearPanel } from './main.js';
import { updateCanvasScene } from './canvas.js';

// Navigation functions
export function setupChapterNavigation() {
    debug('Setting up chapter navigation with ' + AppState.chapters.length + ' chapters');
    
    // Clear existing navigation
    AppState.chapterNavigation.innerHTML = '';
    
    // Set the style directly on the element
    AppState.chapterNavigation.style.position = 'absolute';
    AppState.chapterNavigation.style.top = '50%';
    AppState.chapterNavigation.style.left = '20px';
    AppState.chapterNavigation.style.transform = 'translateY(-50%)';
    AppState.chapterNavigation.style.display = 'flex';
    AppState.chapterNavigation.style.flexDirection = 'column';
    AppState.chapterNavigation.style.gap = '10px';
    AppState.chapterNavigation.style.zIndex = '100';
    AppState.chapterNavigation.style.background = 'rgba(0, 0, 0, 0.5)';
    AppState.chapterNavigation.style.padding = '15px 10px';
    AppState.chapterNavigation.style.borderRadius = '20px';
    AppState.chapterNavigation.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    
    // Create chapter buttons with icons
    for (let i = 0; i < AppState.chapters.length; i++) {
        const chapterBtn = document.createElement('button');
        chapterBtn.className = `chapter-btn ${i === AppState.currentChapter ? 'active' : ''}`;
        chapterBtn.setAttribute('data-chapter', i);
        
        // Modify SVG content to include inline styles
        let iconContent = '';
        if (AppState.chapterIcons[i]) {
            // Extract SVG content and add inline styles
            const svgContent = AppState.chapterIcons[i].trim();
            const colorStyle = i === AppState.currentChapter ? 'var(--secondary-color)' : 'var(--text-color)';
            
            // Add inline style to SVG tag
            iconContent = svgContent.replace('<svg', `<svg style="color: ${colorStyle}; fill: currentColor;"`)
                                   .replace('fill="currentColor"', `fill="currentColor" style="fill: currentColor;"`);
        } else {
            iconContent = `<span style="color: white; font-size: 16px; font-weight: bold;">${i + 1}</span>`;
        }
        
        chapterBtn.innerHTML = iconContent;
        
        // Debug SVG icon rendering
        debug(`Setting icon for chapter ${i + 1}: ${iconContent.substring(0, 50)}...`);
        
        // Explicitly set SVG color immediately
        const svg = chapterBtn.querySelector('svg');
        if (svg) {
            if (i === AppState.currentChapter) {
                svg.style.color = 'var(--secondary-color)';
                svg.style.fill = 'currentColor';
                debug(`Initial active SVG color for chapter ${i + 1}`);
            } else {
                svg.style.color = 'var(--text-color)';
                svg.style.fill = 'currentColor';
                debug(`Initial inactive SVG color for chapter ${i + 1}`);
            }
            
            // Also set fill on all paths
            const paths = svg.querySelectorAll('path');
            paths.forEach(path => {
                path.setAttribute('fill', 'currentColor');
                path.style.fill = 'currentColor';
            });
        }
        
        chapterBtn.title = AppState.chapters[i].title || `Chapter ${i + 1}`;
        
        chapterBtn.addEventListener('click', () => {
            debug('Chapter button ' + i + ' clicked');
            changeChapter(i);
        });
        
        AppState.chapterNavigation.appendChild(chapterBtn);
    }
    
    // Add a small delay to check if SVG elements are properly rendered
    setTimeout(() => {
        debug('Checking SVG rendering in chapter navigation...');
        const chapterBtns = AppState.chapterNavigation.querySelectorAll('.chapter-btn');
        debug(`Found ${chapterBtns.length} chapter buttons`);
        
        // Check each button for SVG content
        chapterBtns.forEach((btn, index) => {
            const svg = btn.querySelector('svg');
            const btnHTML = btn.innerHTML.substring(0, 100);
            
            if (svg) {
                const svgHTML = svg.outerHTML.substring(0, 100);
                const computedStyle = window.getComputedStyle(svg);
                const fill = computedStyle.fill || computedStyle.color;
                const paths = svg.querySelectorAll('path');
                
                debug(`Button ${index + 1}: Has SVG, fill=${fill}, paths=${paths.length}`);
                debug(`SVG HTML: ${svgHTML}`);
                
                // Check each path in the SVG
                paths.forEach((path, pathIndex) => {
                    const pathFill = path.getAttribute('fill');
                    debug(`Path ${pathIndex + 1} fill: ${pathFill}`);
                    
                    // Force path to use currentColor
                    path.setAttribute('fill', 'currentColor');
                    debug(`Set path ${pathIndex + 1} fill to currentColor`);
                });
                
                // Set explicit color on SVG
                svg.style.color = index === AppState.currentChapter ? 'var(--secondary-color)' : 'var(--text-color)';
                svg.style.fill = 'currentColor';
            } else {
                debug(`Button ${index + 1}: No SVG found, HTML: ${btnHTML}`);
            }
        });
    }, 500);
    
    // Remove any existing event listeners by cloning and replacing the buttons
    const newPrevBtn = AppState.prevPanelBtn.cloneNode(true);
    const newNextBtn = AppState.nextPanelBtn.cloneNode(true);
    AppState.prevPanelBtn.parentNode.replaceChild(newPrevBtn, AppState.prevPanelBtn);
    AppState.nextPanelBtn.parentNode.replaceChild(newNextBtn, AppState.nextPanelBtn);
    
    // Update references to the new buttons
    AppState.prevPanelBtn = document.getElementById('prev-panel');
    AppState.nextPanelBtn = document.getElementById('next-panel');
    
    // Ensure panel navigation has proper z-index
    const panelNavigation = document.querySelector('.panel-navigation');
    if (panelNavigation) {
        panelNavigation.style.zIndex = '40';
        debug('Initialized panel navigation with z-index: 40');
    }
    
    // Set z-index on buttons directly
    if (AppState.prevPanelBtn && AppState.nextPanelBtn) {
        AppState.prevPanelBtn.style.zIndex = '40';
        AppState.nextPanelBtn.style.zIndex = '40';
        debug('Initialized panel navigation buttons with z-index: 40');
    }
    
    // Panel navigation with improved event handling
    AppState.prevPanelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        debug('Previous panel button clicked');
        
        if (AppState.currentPanel > 0) {
            showPanel(AppState.currentPanel - 1);
        } else {
            debug('Already at first panel');
            // Visual feedback
            AppState.prevPanelBtn.classList.add('button-flash');
            setTimeout(() => AppState.prevPanelBtn.classList.remove('button-flash'), 300);
        }
    });
    
    AppState.nextPanelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        debug('Next panel button clicked');
        
        const currentChapterPanels = AppState.chapters[AppState.currentChapter].panels;
        if (AppState.currentPanel < currentChapterPanels.length - 1) {
            showPanel(AppState.currentPanel + 1);
        } else {
            debug('Already at last panel');
            // Visual feedback
            AppState.nextPanelBtn.classList.add('button-flash');
            setTimeout(() => AppState.nextPanelBtn.classList.remove('button-flash'), 300);
        }
    });
}

export function changeChapter(chapterIndex) {
    if (chapterIndex === AppState.currentChapter) return;
    
    debug('Changing to chapter ' + chapterIndex + ': ' + AppState.chapters[chapterIndex].title);
    
    // Show loading indicator
    AppState.loadingIndicator.style.display = 'flex';
    
    // Pause current audio
    if (AppState.isPlaying) {
        AppState.audioPlayer.pause();
        AppState.isPlaying = false;
        updatePlayButton();
    }
    
    // Update current chapter
    AppState.currentChapter = chapterIndex;
    
    // Update chapter buttons
    const chapterBtns = AppState.chapterNavigation.querySelectorAll('.chapter-btn');
    chapterBtns.forEach((btn, i) => {
        btn.className = `chapter-btn ${i === AppState.currentChapter ? 'active' : ''}`;
        
        // Explicitly set SVG fill color
        const svg = btn.querySelector('svg');
        if (svg) {
            if (i === AppState.currentChapter) {
                // Active chapter - use secondary color
                svg.style.color = 'var(--secondary-color)';
                svg.style.fill = 'currentColor';
                debug(`Setting active SVG color for chapter ${i + 1}`);
            } else {
                // Inactive chapter - use text color
                svg.style.color = 'var(--text-color)';
                svg.style.fill = 'currentColor';
                debug(`Setting inactive SVG color for chapter ${i + 1}`);
            }
            
            // Also set fill on all paths
            const paths = svg.querySelectorAll('path');
            paths.forEach(path => {
                path.setAttribute('fill', 'currentColor');
                path.style.fill = 'currentColor';
            });
        }
        
        // If no SVG, recreate it with proper styling
        if (!svg && AppState.chapterIcons[i]) {
            const colorStyle = i === AppState.currentChapter ? 'var(--secondary-color)' : 'var(--text-color)';
            const svgContent = AppState.chapterIcons[i].trim();
            
            // Add inline style to SVG tag
            const iconContent = svgContent.replace('<svg', `<svg style="color: ${colorStyle}; fill: currentColor;"`)
                                         .replace('fill="currentColor"', `fill="currentColor" style="fill: currentColor;"`);
            
            btn.innerHTML = iconContent;
            debug(`Recreated SVG for chapter ${i + 1}`);
        }
    });
    
    // Update data-chapter attribute for theme styling
    document.body.setAttribute('data-chapter', AppState.currentChapter);
    
    // Update audio source from chapterAssets
    const assets = AppState.chapterAssets[AppState.currentChapter] || AppState.chapterAssets.default;
    AppState.audioPlayer.src = assets.audio;
    debug('Audio source updated to: ' + AppState.audioPlayer.src);
    
    // Preload assets for the new chapter
    AppState.assetManager.preloadChapterAssets(AppState.currentChapter)
        .then(() => {
            // Reset panel
            AppState.currentPanel = 0;
            
            // Update chapter card first
            updateChapterCard();
            
            // Then show the panel
            showPanel(AppState.currentPanel);
            
            // Hide loading indicator
            AppState.loadingIndicator.style.display = 'none';
            
            debug('Chapter change complete');
        })
        .catch(error => {
            debug('Error preloading assets for chapter: ' + error.message);
            // Continue with chapter change even if asset loading fails
            debug('Continuing with chapter change despite asset loading error');
            
            // Reset panel
            AppState.currentPanel = 0;
            
            // Update chapter card first
            updateChapterCard();
            
            // Then show the panel
            showPanel(AppState.currentPanel);
            
            // Hide loading indicator
            AppState.loadingIndicator.style.display = 'none';
            
            debug('Chapter change complete (with fallback)');
        });
}

export function showPanel(panelIndex) {
    debug('Showing panel ' + panelIndex);
    
    // Clear previous panel content first - only call clearPanel once
    clearPanel();
    
    const currentChapterPanels = AppState.chapters[AppState.currentChapter].panels;
    
    // Validate panel index
    if (panelIndex < 0 || panelIndex >= currentChapterPanels.length) {
        debug('Invalid panel index: ' + panelIndex);
        return;
    }
    
    // Force narrative panel to be visible immediately
    if (AppState.narrativePanel) {
        AppState.narrativePanel.style.display = 'block';
        debug('Forcing narrative panel display: block');
    }
    
    // Create a smooth transition effect with shorter fade time
    const fadeCanvas = document.createElement('canvas');
    fadeCanvas.width = AppState.sceneCanvas.width;
    fadeCanvas.height = AppState.sceneCanvas.height;
    fadeCanvas.style.position = 'absolute';
    fadeCanvas.style.top = '0';
    fadeCanvas.style.left = '0';
    fadeCanvas.style.zIndex = '15';
    fadeCanvas.style.opacity = '0';
    document.querySelector('.experience-container').appendChild(fadeCanvas);
    
    // Capture current scene
    const fadeCtx = fadeCanvas.getContext('2d');
    fadeCtx.drawImage(AppState.sceneCanvas, 0, 0);
    
    // Fade in the transition canvas with shorter transition
    fadeCanvas.style.transition = 'opacity 0.3s ease';
    fadeCanvas.style.opacity = '1';
    
    // Update current panel
    AppState.currentPanel = panelIndex;
    const panel = currentChapterPanels[panelIndex];
    
    // No need to call updateChapterCard here as it's already debounced and called elsewhere
    
    // Update panel content - ensure content is set properly
    if (AppState.panelTitle) {
        AppState.panelTitle.textContent = panel.title || '';
    }
    
    // Build content string
    let content = panel.text || '';
    if (panel.quote) {
        // Check if it's a "She comes" quote for special styling
        if (panel.quote.includes("She comes")) {
            content += `<div class="panel-quote she-comes-quote">${panel.quote}</div>`;
        } else {
            content += `<div class="panel-quote">${panel.quote}</div>`;
        }
    }
    if (panel.text_after) {
        content += panel.text_after;
    }
    
    // Set content with a slight delay to ensure it's not cleared by other operations
    if (AppState.panelText) {
        AppState.panelText.innerHTML = content;
        debug(`Set panel text: ${content.substring(0, 50)}...`);
    }
    
    // Apply neon title styling if specified
    if (panel.neon_title && AppState.panelTitle) {
        AppState.panelTitle.classList.add('neon-title');
        if (panel.neon_color) {
            AppState.panelTitle.classList.add(`neon-${panel.neon_color}`);
        }
    }
    
    // Ensure proper z-index and styling for panels with special effects
    if (AppState.narrativePanel) {
        // Make sure narrative panel is visible
        AppState.narrativePanel.style.display = 'block';
        
        // Reset any previously set top property to prevent positioning issues
        AppState.narrativePanel.style.top = '';
        debug('Reset narrative panel top property to inherit CSS defaults');
        
        // Apply only one effect with highest z-index
        let effectApplied = false;
        
        // Check for special panel titles
        if (panel.title?.toUpperCase().includes('SHE ARRIVES') || panel.title?.toUpperCase().includes('SHE COMES')) {
            AppState.narrativePanel.classList.add('light-rays');
            // Explicitly ensure top property is not set inline
            AppState.narrativePanel.style.top = '';
            effectApplied = true;
            debug('Applied light-rays for SHE ARRIVES, z-index set to: 35, top property reset');
        }
        
        if ((panel.has_burning || panel.title?.toUpperCase().includes('BURNING')) && !effectApplied) {
            AppState.narrativePanel.classList.add('burning-effect');
            // Explicitly ensure top property is not set inline
            AppState.narrativePanel.style.top = '';
            effectApplied = true;
            debug('Applied burning-effect, z-index set to: 35, top property reset');
        }
        
        if ((panel.has_light_rays || panel.has_light_burst) && !effectApplied) {
            AppState.narrativePanel.classList.add('light-rays');
            // Explicitly ensure top property is not set inline
            AppState.narrativePanel.style.top = '';
            effectApplied = true;
            debug('Applied light-rays, z-index set to: 35, top property reset');
        }
        
        if (panel.has_door && !effectApplied) {
            AppState.narrativePanel.classList.add('door-effect');
            // Explicitly ensure top property is not set inline
            AppState.narrativePanel.style.top = '';
            effectApplied = true;
            debug('Applied door-effect, z-index set to: 35, top property reset');
        }
        
        if (panel.epilogue && !effectApplied) {
            AppState.narrativePanel.classList.add('epilogue-panel');
            // Explicitly ensure top property is not set inline
            AppState.narrativePanel.style.top = '';
            effectApplied = true;
            debug('Applied epilogue-panel, z-index set to: 35, top property reset');
        }
        
        // Add a subtle animation to show the panel change
        AppState.narrativePanel.classList.remove('fade-in');
        void AppState.narrativePanel.offsetWidth; // Force reflow
        AppState.narrativePanel.classList.add('fade-in');
    }
    
    // Update navigation buttons
    if (AppState.prevPanelBtn && AppState.nextPanelBtn) {
        AppState.prevPanelBtn.disabled = AppState.currentPanel <= 0;
        AppState.nextPanelBtn.disabled = AppState.currentPanel >= currentChapterPanels.length - 1;
        
        // Add visual feedback for disabled buttons
        AppState.prevPanelBtn.style.opacity = AppState.prevPanelBtn.disabled ? '0.5' : '1';
        AppState.nextPanelBtn.style.opacity = AppState.nextPanelBtn.disabled ? '0.5' : '1';
        
        // Ensure navigation buttons have proper z-index
        const panelNavigation = document.querySelector('.panel-navigation');
        if (panelNavigation) {
            panelNavigation.style.zIndex = '40';
            debug('Set panel navigation z-index to 40 to ensure buttons are clickable');
        }
        
        // Explicitly set z-index on buttons as well
        AppState.prevPanelBtn.style.zIndex = '40';
        AppState.nextPanelBtn.style.zIndex = '40';
    }
    
    // Load and display assets for this panel
    loadPanelAssets(panel);
    
    // Fade out and remove the transition canvas after the new scene is ready
    // Shorter timeout to ensure the fade clears before the burning effect settles
    setTimeout(() => {
        fadeCanvas.style.opacity = '0';
        setTimeout(() => {
            fadeCanvas.remove();
        }, 300);
    }, 200);
    
    debug('Panel shown: ' + panel.title + ', Narrative panel display: ' + window.getComputedStyle(AppState.narrativePanel).display);
}

// Load and display assets for the current panel
export function loadPanelAssets(panel) {
    debug('Loading assets for panel: ' + panel.title);
    
    // Clear current panel assets
    AppState.currentPanelAssets = [];
    
    // Ensure panel is valid
    if (!panel || !panel.title) {
        debug('Invalid panel data');
        return;
    }
    
    try {
        // Add panel-specific attributes to the panel object based on title
        // This ensures we show the right visuals even if the YAML doesn't have these attributes
        if (panel.title === "SUN INSIGNIA" || panel.title.includes("INSIGNIA")) {
            panel.has_insignia = true;
            panel.large_insignia = true;
        }
        
        if (panel.title === "BURNING HOUSES" || panel.title.includes("BURNING")) {
            panel.has_burning = true;
        }
        
        if (panel.title === "THE DOOR" || panel.title.includes("DOOR")) {
            panel.has_door = true;
        }
        
        if (panel.title === "THRESHOLD" || panel.title.includes("LIGHT")) {
            panel.has_light_burst = true;
        }
        
        if (panel.title === "DESERT ROAD" || panel.title.includes("ROAD")) {
            panel.has_road = true;
        }
        
        // Determine which assets to show based on panel attributes
        if (panel.has_insignia) {
            const insigniaAsset = AppState.assetManager.getAssetByTitle(AppState.currentChapter, "Insignia of the Sun (Primary Motif)");
            if (insigniaAsset) {
                AppState.currentPanelAssets.push(insigniaAsset);
                // Update the SVG overlay with the insignia
                const insigniaObj = document.getElementById('insignia');
                if (insigniaObj) {
                    insigniaObj.data = insigniaAsset.svg;
                    document.querySelector('.svg-overlay').style.display = 'block';
                    document.querySelector('.svg-overlay').classList.add('glow');
                }
            } else {
                // Add a hardcoded insignia asset if not found in the asset manager
                const assets = AppState.chapterAssets[AppState.currentChapter] || AppState.chapterAssets.default;
                AppState.currentPanelAssets.push({
                    title: "Insignia of the Sun (Primary Motif)",
                    svg: assets.svg,
                    png: assets.svg.replace('.svg', '.png')
                });
                
                // Update the SVG overlay with the insignia
                const insigniaObj = document.getElementById('insignia');
                if (insigniaObj) {
                    insigniaObj.data = assets.svg;
                }
                
                document.querySelector('.svg-overlay').style.display = 'block';
                document.querySelector('.svg-overlay').classList.add('glow');
            }
        } else {
            // Hide insignia if not needed for this panel
            document.querySelector('.svg-overlay').style.display = 'none';
        }
        
        // Handle other special panel attributes
        if (panel.has_burning) {
            try {
                const burningAsset = AppState.assetManager.getAssetByTitle(AppState.currentChapter, "Burning Houses on the Horizon");
                if (burningAsset) {
                    AppState.currentPanelAssets.push(burningAsset);
                } else {
                    // Add a hardcoded burning houses asset if not found in the asset manager
                    debug("Using fallback for Burning Houses asset");
                    AppState.currentPanelAssets.push({
                        title: "Burning Houses on the Horizon",
                        type: "burning"
                    });
                }
            } catch (error) {
                debug(`Error loading burning asset: ${error.message}`);
                // Add a hardcoded burning houses asset as fallback
                AppState.currentPanelAssets.push({
                    title: "Burning Houses on the Horizon",
                    type: "burning"
                });
            }
        }
        
        if (panel.has_door) {
            // Add door-related assets or effects
            AppState.currentPanelAssets.push({
                title: "Door",
                type: "door"
            });
        }
        
        if (panel.has_light_rays || panel.has_light_burst) {
            // Add light ray effects
            AppState.currentPanelAssets.push({
                title: "Light Rays",
                type: "light"
            });
        }
        
        if (panel.has_road) {
            // Add road-related assets
            AppState.currentPanelAssets.push({
                title: "Desert Road",
                type: "road"
            });
        }
        
        // Match panel title with available assets
        const chapterAssets = AppState.assetManager.getChapterAssets(AppState.currentChapter);
        
        // Check if we have global assets to match with panel title
        if (AppState.globalAssets) {
            // Iterate through global assets
            Object.values(AppState.globalAssets).forEach(asset => {
                if (asset.title && panel.title &&
                    (asset.title.includes(panel.title) ||
                     panel.title.includes(asset.title.split(':')[0]) ||
                     asset.title.toLowerCase().includes(panel.title.toLowerCase()))) {
                    AppState.currentPanelAssets.push(asset);
                }
            });
        }
        
        // Add default assets based on panel title if no assets were found
        if (AppState.currentPanelAssets.length === 0) {
            if (panel.title === "VELVET CURTAIN") {
                AppState.currentPanelAssets.push({
                    title: "The Velvet Curtain",
                    type: "curtain"
                });
            } else if (panel.title === "CLUB INTERIOR") {
                AppState.currentPanelAssets.push({
                    title: "Club Interior",
                    type: "club"
                });
            } else if (panel.title === "VELVET DANCERS") {
                AppState.currentPanelAssets.push({
                    title: "Velvet Dancers",
                    type: "dancers"
                });
            }
        }
        
        // Update the canvas scene based on the current assets
        updateCanvasScene();
        
        debug(`Loaded ${AppState.currentPanelAssets.length} assets for panel`);
    } catch (error) {
        debug(`Error loading panel assets: ${error.message}`);
        
        // Hide insignia as fallback
        document.querySelector('.svg-overlay').style.display = 'none';
        
        // Trigger a redraw with a simple scene
        const drawSimpleScene = function() {
            // Clear canvas
            AppState.ctx.clearRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
            
            // Draw a simple gradient background
            const gradient = AppState.ctx.createLinearGradient(0, 0, 0, AppState.sceneCanvas.height);
            gradient.addColorStop(0, "#0b0b12");
            gradient.addColorStop(0.5, "#0a0910");
            gradient.addColorStop(1, "#05050a");
            AppState.ctx.fillStyle = gradient;
            AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
            
            // Add a simple vignette effect
            const r = Math.max(AppState.sceneCanvas.width, AppState.sceneCanvas.height) * 0.95;
            const vignetteGradient = AppState.ctx.createRadialGradient(
                AppState.sceneCanvas.width/2, AppState.sceneCanvas.height/2, r * 0.55,
                AppState.sceneCanvas.width/2, AppState.sceneCanvas.height/2, r
            );
            vignetteGradient.addColorStop(0, "rgba(0,0,0,0)");
            vignetteGradient.addColorStop(1, "rgba(0,0,0,0.75)");
            AppState.ctx.fillStyle = vignetteGradient;
            AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
        };
        
        drawSimpleScene();
    }
}