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
    
    // Remove duplicates from paths array
    const uniquePaths = [...new Set(paths)];
    debug(`Trying ${uniquePaths.length} unique image paths`);
    
    // Try to load the image from the current path
    const tryLoadImage = () => {
        if (currentIndex >= uniquePaths.length) {
            debug('All image paths failed, using fallback');
            if (fallbackFn) fallbackFn();
            return;
        }
        
        const path = uniquePaths[currentIndex];
        debug(`Trying to load image from (${currentIndex + 1}/${uniquePaths.length}): ${path}`);
        
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
 * Utility function to generate all possible variations of a path
 * @param {string} path - The original path
 * @returns {string[]} - Array of path variations
 */
export function generatePathVariations(path) {
    if (!path) return [];
    
    const variations = [path];
    
    // Add path without /pop-song-summer prefix if it exists
    if (path.includes('/pop-song-summer/')) {
        variations.push(path.replace('/pop-song-summer/', '/'));
    }
    
    // Add path with /pop-song-summer prefix if it doesn't exist
    if (!path.includes('/pop-song-summer/') && !path.startsWith('http')) {
        if (path.startsWith('/')) {
            variations.push('/pop-song-summer' + path);
        } else {
            variations.push('/pop-song-summer/' + path);
        }
    }
    
    // Add path with leading slash removed if it exists
    if (path.startsWith('/') && !path.startsWith('//')) {
        variations.push(path.substring(1));
    }
    
    // Add path with leading slash added if it doesn't exist
    if (!path.startsWith('/') && !path.startsWith('http')) {
        variations.push('/' + path);
    }
    
    // Add path with domain for production
    if (!path.startsWith('http')) {
        if (path.startsWith('/')) {
            variations.push('https://devco.band' + path);
        } else {
            variations.push('https://devco.band/' + path);
        }
    }
    
    // Try with just the filename
    const filename = path.split('/').pop();
    if (filename) {
        variations.push(filename);
        variations.push('/assets/images/pss/' + filename);
        variations.push('assets/images/pss/' + filename);
    }
    
    return [...new Set(variations)]; // Remove duplicates
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