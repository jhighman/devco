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
    
    // Generate additional fallback paths
    const enhancedPaths = [];
    
    // Add original paths
    paths.forEach(path => {
        enhancedPaths.push(path);
        
        // Add path without /pop-song-summer prefix if it exists
        if (path.includes('/pop-song-summer/')) {
            const altPath = path.replace('/pop-song-summer/', '/');
            enhancedPaths.push(altPath);
            debug(`Added alternative path without prefix: ${altPath}`);
        }
        
        // Add path with leading slash removed if it exists
        if (path.startsWith('/') && !path.startsWith('//')) {
            const altPath = path.substring(1);
            enhancedPaths.push(altPath);
            debug(`Added alternative path without leading slash: ${altPath}`);
        }
    });
    
    debug(`Enhanced paths for image loading: ${enhancedPaths.join(', ')}`);
    
    // Try to load the image from the current path
    const tryLoadImage = () => {
        if (currentIndex >= enhancedPaths.length) {
            debug('All image paths failed, using fallback');
            if (fallbackFn) fallbackFn();
            return;
        }
        
        const path = enhancedPaths[currentIndex];
        debug(`Trying to load image from: ${path}`);
        
        // Set up error handler for this attempt
        imgElement.onerror = () => {
            debug(`Failed to load image from: ${path}`);
            currentIndex++;
            tryLoadImage(); // Try the next path
        };
        
        // Set up load handler to confirm success
        imgElement.onload = () => {
            debug(`Successfully loaded image from: ${path}`);
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