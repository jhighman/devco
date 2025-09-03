import { debug } from './utils.js';
import { AppState } from './main.js';
import { isMobile } from './mobile.js';

// Audio player functions
export function setupAudioPlayer() {
    debug('Setting up audio player...');
    
    // Set initial audio source from chapterAssets
    const assets = AppState.chapterAssets[AppState.currentChapter] || AppState.chapterAssets.default;
    AppState.audioPlayer.src = assets.audio;
    debug('Audio source set to: ' + AppState.audioPlayer.src);
    
    // Remove any existing event listeners by cloning and replacing
    const newPlayButton = AppState.playButton.cloneNode(true);
    AppState.playButton.parentNode.replaceChild(newPlayButton, AppState.playButton);
    AppState.playButton = newPlayButton;
    
    // Play/pause button
    AppState.playButton.addEventListener('click', togglePlay);
    
    // Add touch-specific event listeners for mobile
    AppState.playButton.addEventListener('touchstart', function(e) {
        debug('Play button touch start');
        e.preventDefault();
    }, { passive: false });
    
    AppState.playButton.addEventListener('touchend', function(e) {
        debug('Play button touch end');
        e.preventDefault();
        togglePlay();
    }, { passive: false });
    
    // Progress bar
    AppState.progressContainer.addEventListener('click', seek);
    
    // Update progress
    AppState.audioPlayer.addEventListener('timeupdate', updateProgress);
    
    // When audio ends
    AppState.audioPlayer.addEventListener('ended', () => {
        debug('Audio ended');
        AppState.isPlaying = false;
        updatePlayButton();
    });
    
    // Handle errors
    AppState.audioPlayer.addEventListener('error', (e) => {
        debug('Audio error: ' + (e.message || 'Unknown error'));
        AppState.isPlaying = false;
        updatePlayButton();
    });
    
    // TEMPORARILY DISABLE AUDIO VISUALIZATION
    debug('Audio visualization temporarily disabled to fix playback issues');
    
    // Ensure audio can play directly
    AppState.audioPlayer.crossOrigin = "anonymous";
    AppState.audioPlayer.volume = 1.0;
    
    // Log the audio source for debugging
    debug('Audio source: ' + AppState.audioPlayer.src);
    debug('Audio source from chapterAssets: ' + assets.audio);
    
    // Check if the audio file exists
    const audioRequest = new XMLHttpRequest();
    audioRequest.open('HEAD', AppState.audioPlayer.src, true);
    audioRequest.onload = function() {
        debug('Audio file exists: ' + (audioRequest.status === 200));
    };
    audioRequest.onerror = function() {
        debug('Error checking audio file: ' + audioRequest.statusText);
    };
    audioRequest.send();
    
    debug('Audio player setup complete');
}

// Helper function to get visualization mode for a chapter
export function getVisualizationModeForChapter(chapter) {
    switch(chapter) {
        case 0:
        case 1:
            return 'velvet';
        case 2:
            return 'burning';
        case 3:
            return 'poetry';
        case 4:
            return 'blind';
        case 7:
            return 'disco';
        case 8:
            return 'shadow';
        case 11:
            return 'ending';
        default:
            return 'default';
    }
}

export function togglePlay() {
    debug('Toggle play button clicked');
    
    try {
        if (!AppState.audioPlayer) {
            debug('Audio player not found');
            return;
        }
        
        debug('Audio player current source: ' + AppState.audioPlayer.src);
        debug('Audio player ready state: ' + AppState.audioPlayer.readyState);
        
        if (AppState.isPlaying) {
            debug('Pausing audio');
            AppState.audioPlayer.pause();
            AppState.isPlaying = false;
            
            // Add visual feedback for pause
            AppState.playButton.classList.add('button-flash');
            setTimeout(() => AppState.playButton.classList.remove('button-flash'), 300);
        } else {
            debug('Playing audio');
            
            // Make sure the audio element has a valid source
            if (!AppState.audioPlayer.src || AppState.audioPlayer.src === '') {
                debug('Setting audio source');
                const assets = AppState.chapterAssets[AppState.currentChapter] || AppState.chapterAssets.default;
                AppState.audioPlayer.src = assets.audio;
            }
            
            debug('Attempting to play audio from: ' + AppState.audioPlayer.src);
            
            // Add visual feedback for play
            AppState.playButton.classList.add('button-flash');
            setTimeout(() => AppState.playButton.classList.remove('button-flash'), 300);
            
            // TEMPORARILY DISABLE AUDIO CONTEXT RESUME
            // We're bypassing the Web Audio API completely
            
            // Simple play
            AppState.audioPlayer.play()
                .then(() => {
                    debug('Audio playback started successfully');
                    AppState.isPlaying = true;
                    updatePlayButton();
                    
                    // Trigger a redraw to update any audio-reactive visuals
                    if (window.drawScene) {
                        drawScene();
                    }
                    
                    // Log audio element state for debugging
                    debug('Audio element currentTime: ' + AppState.audioPlayer.currentTime);
                    debug('Audio element duration: ' + AppState.audioPlayer.duration);
                    debug('Audio element paused: ' + AppState.audioPlayer.paused);
                    debug('Audio element ended: ' + AppState.audioPlayer.ended);
                    debug('Audio element muted: ' + AppState.audioPlayer.muted);
                    debug('Audio element volume: ' + AppState.audioPlayer.volume);
                })
                .catch(error => {
                    debug('Error playing audio: ' + error.message);
                    // Show error message to user
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'audio-error';
                    errorMsg.textContent = 'Could not play audio. Please try again.';
                    errorMsg.style.position = 'absolute';
                    errorMsg.style.bottom = '80px';
                    errorMsg.style.left = '50%';
                    errorMsg.style.transform = 'translateX(-50%)';
                    errorMsg.style.background = 'rgba(255, 0, 0, 0.7)';
                    errorMsg.style.color = 'white';
                    errorMsg.style.padding = '10px 20px';
                    errorMsg.style.borderRadius = '5px';
                    errorMsg.style.zIndex = '100';
                    document.querySelector('.experience-container').appendChild(errorMsg);
                    
                    // Remove error message after 3 seconds
                    setTimeout(() => {
                        errorMsg.remove();
                    }, 3000);
                });
            
            return; // Return early to avoid updating button before promise resolves
        }
        
        // Update the button appearance
        updatePlayButton();
        
    } catch (error) {
        debug('Error in togglePlay: ' + error.message);
    }
}

export function updatePlayButton() {
    AppState.playButton.innerHTML = AppState.isPlaying
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
}

export function seek(e) {
    const percent = e.offsetX / AppState.progressContainer.offsetWidth;
    AppState.audioPlayer.currentTime = percent * AppState.audioPlayer.duration;
    AppState.progressBar.style.width = `${percent * 100}%`;
}

export function updateProgress() {
    const percent = (AppState.audioPlayer.currentTime / AppState.audioPlayer.duration) * 100;
    AppState.progressBar.style.width = `${percent}%`;
    
    // Update time display
    const currentMinutes = Math.floor(AppState.audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(AppState.audioPlayer.currentTime % 60);
    const durationMinutes = Math.floor(AppState.audioPlayer.duration / 60) || 0;
    const durationSeconds = Math.floor(AppState.audioPlayer.duration % 60) || 0;
    
    AppState.timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

// Audio visualization functions
// These variables are now part of AppState and initialized in main.js
// AppState.visualizationMode = 'default';
// AppState.audioContext = null;
// AppState.analyser = null;
// AppState.dataArray = null;
// AppState.sourceNode = null;

// Initialize audio visualization
export function initializeAudioVisualization() {
    // If we've already tried to initialize, don't try again
    if (window.audioVisualizationInitialized) {
        debug('Audio visualization already initialized, skipping');
        return;
    }
    
    try {
        // Create audio context
        AppState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create analyser node
        AppState.analyser = AppState.audioContext.createAnalyser();
        AppState.analyser.fftSize = 256;
        
        try {
            // Connect audio element to analyser
            AppState.sourceNode = AppState.audioContext.createMediaElementSource(AppState.audioPlayer);
            AppState.sourceNode.connect(AppState.analyser);
            AppState.analyser.connect(AppState.audioContext.destination);
            
            // Create data array for frequency data
            AppState.dataArray = new Uint8Array(AppState.analyser.frequencyBinCount);
            
            // Mark as initialized
            window.audioVisualizationInitialized = true;
            
            debug('Audio visualization initialized with analyser');
        } catch (innerError) {
            // If we can't connect the audio element to the analyser,
            // just use the audio context without visualization
            debug('Error connecting audio to analyser: ' + innerError.message);
            debug('Falling back to basic audio playback without visualization');
            
            // Reset variables to prevent visualization attempts
            AppState.analyser = null;
            AppState.sourceNode = null;
            AppState.dataArray = null;
            
            // Resume the audio context to ensure it's active
            if (AppState.audioContext && AppState.audioContext.state === 'suspended') {
                AppState.audioContext.resume().then(() => {
                    debug('Audio context resumed');
                });
            }
            
            // Mark as failed
            window.audioVisualizationInitialized = false;
        }
    } catch (error) {
        debug('Error initializing audio visualization: ' + error.message);
        // Make sure audio can still play even without visualization
        AppState.audioContext = null;
        AppState.analyser = null;
        AppState.sourceNode = null;
        AppState.dataArray = null;
        
        // Mark as failed
        window.audioVisualizationInitialized = false;
    }
}

// Set visualization mode based on chapter theme
export function setVisualizationMode(mode) {
    AppState.visualizationMode = mode;
    debug('Visualization mode set to: ' + mode);
}

// Draw audio visualization based on current mode - TEMPORARILY DISABLED
export function drawAudioVisualization(ctx, canvas) {
    // TEMPORARILY DISABLED
    // Just draw a simple background
    if (ctx && canvas) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Default visualization - simple bars
export function drawDefaultVisualization(ctx, canvas, dataArray) {
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        
        ctx.fillStyle = `rgba(234, 234, 234, ${barHeight / 100})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
    }
}

// Velvet visualization - flowing curtain effect
export function drawVelvetVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(128, 0, 32, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < dataArray.length; i++) {
        const amplitude = dataArray[i] / 2;
        const angle = (i / dataArray.length) * Math.PI * 2;
        
        const x = centerX + Math.cos(angle) * amplitude;
        const y = centerY + Math.sin(angle) * amplitude;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 193, 7, 0.7)';
        ctx.fill();
    }
}

// Burning visualization - flame-like effect
export function drawBurningVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        const height = dataArray[i] * 1.5;
        
        // Create gradient for flame effect
        const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 87, 34, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 152, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 193, 7, 0.4)');
        
        ctx.fillStyle = gradient;
        
        // Draw flame-like shape
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.quadraticCurveTo(
            x + barWidth / 2, canvas.height - height - Math.random() * 20,
            x + barWidth, canvas.height
        );
        ctx.fill();
        
        x += barWidth + 1;
    }
}

// Poetry visualization - text-like patterns
export function drawPoetryVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const lineHeight = canvas.height / 10;
    
    for (let i = 0; i < 10; i++) {
        const y = i * lineHeight + lineHeight / 2;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x < canvas.width; x += 5) {
            const dataIndex = Math.floor((x / canvas.width) * dataArray.length);
            const amplitude = dataArray[dataIndex] / 10;
            
            // Create text-like pattern
            if (x % 20 < 15) {
                ctx.lineTo(x, y + Math.sin(x * 0.05) * amplitude);
            } else {
                ctx.moveTo(x, y + Math.sin(x * 0.05) * amplitude);
            }
        }
        
        ctx.strokeStyle = 'rgba(255, 152, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Blind visualization - sound waves radiating outward
export function drawBlindVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw concentric circles
    for (let i = 0; i < dataArray.length; i += 4) {
        const radius = (dataArray[i] / 255) * Math.min(canvas.width, canvas.height) / 2;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 206, 209, ${0.8 - (i / dataArray.length)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Disco visualization - colorful patterns
export function drawDiscoVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        const height = dataArray[i] * 1.2;
        
        // Disco colors
        const hue = (i / dataArray.length) * 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.7)`;
        
        // Draw disco squares
        const size = height / 4;
        const centerX = x + barWidth / 2;
        const centerY = canvas.height / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((Date.now() * 0.001 + i * 0.1) % (Math.PI * 2));
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
        
        x += barWidth + 1;
    }
}

// Shadow visualization - dark, mysterious patterns
export function drawShadowVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    
    for (let i = 0; i < dataArray.length; i++) {
        const amplitude = dataArray[i] / 2;
        const angle = (i / dataArray.length) * Math.PI * 2;
        
        const x = centerX + Math.cos(angle) * amplitude;
        const y = centerY + Math.sin(angle) * amplitude;
        
        ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fillStyle = 'rgba(30, 58, 95, 0.5)';
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 193, 7, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Ending visualization - fading, ethereal effect
export function drawEndingVisualization(ctx, canvas, dataArray) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Calculate average amplitude
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const avgAmplitude = sum / dataArray.length;
    
    // Draw fading circle
    const maxRadius = Math.min(canvas.width, canvas.height) / 2;
    const radius = (avgAmplitude / 255) * maxRadius;
    
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(74, 74, 74, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

// Function to play special sound for insignia interaction
export function playInsigniaSound() {
    try {
        // Create a temporary audio context
        const tempContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator
        const oscillator = tempContext.createOscillator();
        oscillator.type = 'sine';
        
        // Create gain node for volume control
        const gainNode = tempContext.createGain();
        gainNode.gain.value = 0.1;
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(tempContext.destination);
        
        // Set frequency and schedule changes
        oscillator.frequency.setValueAtTime(220, tempContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, tempContext.currentTime + 0.5);
        oscillator.frequency.exponentialRampToValueAtTime(440, tempContext.currentTime + 1.0);
        
        // Fade out
        gainNode.gain.setValueAtTime(0.1, tempContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, tempContext.currentTime + 1.0);
        
        // Start and stop
        oscillator.start();
        oscillator.stop(tempContext.currentTime + 1.0);
        
        debug('Insignia sound played');
    } catch (error) {
        debug('Error playing insignia sound: ' + error.message);
    }
}