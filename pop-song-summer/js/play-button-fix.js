// play-button-fix.js - Direct fix for the missing play button

// Execute immediately when the script loads
(function() {
    console.log('Play button fix script loaded');
    
    // Function to create and add a new play button
    function addNewPlayButton() {
        console.log('Adding new play button');
        
        // Find the audio controls
        const audioControls = document.querySelector('.audio-controls');
        if (!audioControls) {
            console.error('Audio controls not found');
            return;
        }
        
        // Check if our custom play button already exists
        if (document.getElementById('custom-play-button')) {
            console.log('Custom play button already exists');
            return;
        }
        
        // Create a new play button
        const newPlayButton = document.createElement('button');
        newPlayButton.id = 'custom-play-button';
        newPlayButton.className = 'play-button';
        newPlayButton.setAttribute('aria-label', 'Play/Pause');
        
        // Set inline styles to ensure visibility
        newPlayButton.style.cssText = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            background: #FF5722 !important;
            border: none !important;
            color: white !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            margin-right: 15px !important;
            z-index: 201 !important;
            position: relative !important;
            flex-shrink: 0 !important;
        `;
        
        // Add play icon
        newPlayButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        
        // Insert at the beginning of audio controls
        if (audioControls.firstChild) {
            audioControls.insertBefore(newPlayButton, audioControls.firstChild);
        } else {
            audioControls.appendChild(newPlayButton);
        }
        
        // Add click event listener
        newPlayButton.addEventListener('click', function() {
            console.log('Custom play button clicked');
            
            // Get the audio player
            const audioPlayer = document.getElementById('audio-player');
            if (!audioPlayer) {
                console.error('Audio player not found');
                return;
            }
            
            // Toggle play/pause
            if (audioPlayer.paused) {
                audioPlayer.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
                
                // Update button to show pause icon
                this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
            } else {
                audioPlayer.pause();
                
                // Update button to show play icon
                this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            }
        });
        
        console.log('New play button added successfully');
    }
    
    // Try to add the play button immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(addNewPlayButton, 100);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(addNewPlayButton, 100);
        });
    }
    
    // Also try after a delay to ensure the audio controls are loaded
    setTimeout(addNewPlayButton, 500);
    setTimeout(addNewPlayButton, 1000);
    setTimeout(addNewPlayButton, 2000);
    
    // Add a MutationObserver to detect when the audio controls are added to the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.nodeType === 1 && (node.classList.contains('audio-controls') || node.querySelector('.audio-controls'))) {
                        console.log('Audio controls added to DOM, adding play button');
                        setTimeout(addNewPlayButton, 100);
                    }
                }
            }
        });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also add the button when the window is resized
    window.addEventListener('resize', function() {
        setTimeout(addNewPlayButton, 100);
    });
})();