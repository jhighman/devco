// Debug function
export function debug(message) {
    const debugPanel = document.getElementById('debug-panel');
    if (debugPanel) {
        const timestamp = new Date().toLocaleTimeString();
        debugPanel.innerHTML += `<div>[${timestamp}] ${message}</div>`;
        debugPanel.scrollTop = debugPanel.scrollHeight;
    }
    console.log(message);
}

// Error utility function
export function throwError(message) {
    debug(message);
    throw new Error(message);
}

// Preload an image
export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

/**
 * Load an image with fallback paths
 * @param {HTMLImageElement} imgElement - The image element to set src on
 * @param {string[]} paths - Array of possible image paths to try
 * @param {Function} fallbackFn - Function to call if all paths fail
 * @returns {void}
 */
export function loadImageWithFallback(imgElement, paths, fallbackFn) {
    if (!imgElement || !paths || !paths.length) {
        debug('Invalid parameters for loadImageWithFallback');
        if (fallbackFn) fallbackFn();
        return;
    }

    // Keep track of the current path index
    let currentIndex = 0;
    
    // Try to load the image from the current path
    const tryLoadImage = () => {
        if (currentIndex >= paths.length) {
            debug('All image paths failed, using fallback');
            if (fallbackFn) fallbackFn();
            return;
        }
        
        const path = paths[currentIndex];
        debug(`Trying to load image from: ${path}`);
        
        // Set up error handler for this attempt
        imgElement.onerror = () => {
            debug(`Failed to load image from: ${path}`);
            currentIndex++;
            tryLoadImage(); // Try the next path
        };
        
        // Set the source to trigger loading
        imgElement.src = path;
    };
    
    // Start the loading process
    tryLoadImage();
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}