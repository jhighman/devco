import { chapterAssets, globalAssets, currentEnvironment, isSubdirectory, assetPathPrefix } from './data.js';
import { debug, generatePathVariations } from './utils.js';

// Asset manager for loading and caching assets
export class AssetManager {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Get the proper asset path with environment-specific handling
     * @param {string} path - The original asset path
     * @returns {string} - The processed asset path
     */
    getAssetPath(path) {
        if (!path) {
            debug('Null or undefined path passed to getAssetPath');
            return '';
        }
        
        // Log the original path for debugging
        debug(`Processing asset path: ${path}`);
        
        // Generate multiple possible paths for the asset
        const possiblePaths = [];
        
        // Add the original path
        possiblePaths.push(path);
        
        // If we're in production and the path includes the full domain, try without it
        if (currentEnvironment === 'production' && path.includes('https://devco.band')) {
            possiblePaths.push(path.replace('https://devco.band', ''));
        }
        
        // If the path includes /pop-song-summer/ but we're not in a subdirectory, try without it
        if (path.includes('/pop-song-summer/') && !isSubdirectory) {
            possiblePaths.push(path.replace('/pop-song-summer/', '/'));
        }
        
        // If the path doesn't include /pop-song-summer/ but we are in a subdirectory, try with it
        if (!path.includes('/pop-song-summer/') && isSubdirectory) {
            // Check if the path starts with a slash
            if (path.startsWith('/')) {
                possiblePaths.push('/pop-song-summer' + path);
            } else {
                possiblePaths.push('/pop-song-summer/' + path);
            }
        }
        
        // If the path starts with a slash, try without it
        if (path.startsWith('/') && !path.startsWith('//')) {
            possiblePaths.push(path.substring(1));
        }
        
        // If the path doesn't start with a slash or http, try with it
        if (!path.startsWith('/') && !path.startsWith('http')) {
            possiblePaths.push('/' + path);
        }
        
        // Log all possible paths for debugging
        debug(`Generated possible asset paths: ${possiblePaths.join(', ')}`);
        
        // Return the original path - we'll try the alternatives in the preload functions
        return path;
    }
    
    /**
     * Get all possible paths for an asset
     * @param {string} path - The original asset path
     * @returns {string[]} - Array of possible paths to try
     */
    getAllPossiblePaths(path) {
        if (!path) {
            return [];
        }
        
        // Use our utility function to generate all possible path variations
        const variations = generatePathVariations(path);
        
        // Add environment-specific paths
        const possiblePaths = [...variations];
        
        // If we're in production and the path includes the full domain, try without it
        if (currentEnvironment === 'production' && path.includes('https://devco.band')) {
            possiblePaths.push(path.replace('https://devco.band', ''));
        }
        
        // If the path includes /pop-song-summer/ but we're not in a subdirectory, try without it
        if (path.includes('/pop-song-summer/') && !isSubdirectory) {
            possiblePaths.push(path.replace('/pop-song-summer/', '/'));
        }
        
        // If the path doesn't include /pop-song-summer/ but we are in a subdirectory, try with it
        if (!path.includes('/pop-song-summer/') && isSubdirectory) {
            // Check if the path starts with a slash
            if (path.startsWith('/')) {
                possiblePaths.push('/pop-song-summer' + path);
            } else {
                possiblePaths.push('/pop-song-summer/' + path);
            }
        }
        
        // Remove duplicates and return
        return [...new Set(possiblePaths)];
    }

    /**
     * Load assets mapping
     * @returns {Promise<Object>} - Promise resolving to the assets mapping
     */
    async loadAssetMapping() {
        try {
            debug('Loading assets mapping...');
            
            // In a production environment, you might fetch and parse a YAML file
            // For now, we're using the imported assets from data.js
            
            debug('Assets mapping loaded successfully');
            return { chapterAssets, globalAssets };
        } catch (error) {
            debug(`Error loading assets mapping: ${error.message}`);
            throw error;
        }
    }

    /**
     * Preload assets for a specific chapter
     * @param {number} chapterIndex - The chapter index to preload assets for
     * @returns {Promise<void>}
     */
    async preloadChapterAssets(chapterIndex) {
        const assets = chapterAssets[chapterIndex] || chapterAssets.default;
        debug(`Preloading assets for chapter ${chapterIndex}...`);
        
        try {
            await Promise.all([
                this.preloadImage(assets.headerImage),
                this.preloadImage(assets.svg),
                this.preloadAudio(assets.audio)
            ]);
            debug(`Assets for chapter ${chapterIndex} preloaded successfully`);
        } catch (error) {
            debug(`Error preloading chapter assets: ${error.message}`);
            // We'll continue even if preloading fails
        }
    }

    /**
     * Preload an image and cache it
     * @param {string} src - The image source URL
     * @returns {Promise<HTMLImageElement>} - Promise resolving to the loaded image
     */
    async preloadImage(src) {
        if (this.cache.has(src)) {
            debug(`Using cached image: ${src}`);
            return this.cache.get(src);
        }
        
        // Get all possible paths for this asset
        const possiblePaths = this.getAllPossiblePaths(src);
        debug(`Trying to preload image with paths: ${possiblePaths.join(', ')}`);
        
        // Try each path in sequence
        for (let i = 0; i < possiblePaths.length; i++) {
            const path = possiblePaths[i];
            debug(`Attempting to preload image (${i+1}/${possiblePaths.length}): ${path}`);
            
            try {
                const img = await new Promise((resolve, reject) => {
                    const imgElement = new Image();
                    
                    imgElement.onload = () => {
                        debug(`Successfully preloaded image: ${path}`);
                        resolve(imgElement);
                    };
                    
                    imgElement.onerror = (error) => {
                        debug(`Failed to preload image: ${path}`);
                        debug(`Image error details: ${error ? JSON.stringify(error) : 'No error details available'}`);
                        reject(new Error(`Failed to preload image: ${path}`));
                    };
                    
                    imgElement.src = path;
                });
                
                // If we get here, the image loaded successfully
                this.cache.set(src, img);
                return img;
            } catch (error) {
                // This path failed, try the next one
                debug(`Path ${path} failed, trying next alternative if available`);
            }
        }
        
        // If we get here, all paths failed
        debug(`All paths failed for image: ${src}`);
        throw new Error(`Failed to preload image: ${src}`);
    }

    /**
     * Preload an audio file and cache it
     * @param {string} src - The audio source URL
     * @returns {Promise<HTMLAudioElement>} - Promise resolving to the loaded audio
     */
    async preloadAudio(src) {
        if (this.cache.has(src)) {
            debug(`Using cached audio: ${src}`);
            return this.cache.get(src);
        }
        
        // Get all possible paths for this asset
        const possiblePaths = this.getAllPossiblePaths(src);
        debug(`Trying to preload audio with paths: ${possiblePaths.join(', ')}`);
        
        // Try each path in sequence
        for (let i = 0; i < possiblePaths.length; i++) {
            const path = possiblePaths[i];
            debug(`Attempting to preload audio (${i+1}/${possiblePaths.length}): ${path}`);
            
            try {
                const audio = await new Promise((resolve, reject) => {
                    const audioElement = new Audio();
                    
                    audioElement.oncanplaythrough = () => {
                        debug(`Successfully preloaded audio: ${path}`);
                        resolve(audioElement);
                    };
                    
                    audioElement.onerror = (error) => {
                        debug(`Failed to preload audio: ${path}`);
                        debug(`Audio error details: ${error ? JSON.stringify(error) : 'No error details available'}`);
                        reject(new Error(`Failed to preload audio: ${path}`));
                    };
                    
                    // Set a timeout in case oncanplaythrough never fires
                    setTimeout(() => {
                        if (audioElement.readyState >= 3) {
                            debug(`Audio preload timed out but is playable: ${path}`);
                            resolve(audioElement);
                        } else {
                            debug(`Audio preload timed out and is not playable: ${path}`);
                            reject(new Error(`Audio preload timed out: ${path}`));
                        }
                    }, 5000);
                    
                    audioElement.src = path;
                    audioElement.load();
                });
                
                // If we get here, the audio loaded successfully
                this.cache.set(src, audio);
                return audio;
            } catch (error) {
                // This path failed, try the next one
                debug(`Path ${path} failed for audio, trying next alternative if available`);
            }
        }
        
        // If we get here, all paths failed
        debug(`All paths failed for audio: ${src}`);
        throw new Error(`Failed to preload audio: ${src}`);
    }

    /**
     * Get all assets for a specific chapter
     * @param {number} chapterIndex - The chapter index
     * @returns {Object} - The chapter assets
     */
    getChapterAssets(chapterIndex) {
        return chapterAssets[chapterIndex] || chapterAssets.default;
    }

    /**
     * Get an asset by its title for a specific chapter
     * @param {number} chapterIndex - The chapter index
     * @param {string} title - The asset title to search for
     * @returns {Object|null} - The asset object or null if not found
     */
    getAssetByTitle(chapterIndex, title) {
        debug(`Searching for asset with title: ${title} in chapter ${chapterIndex}`);
        
        // First check in chapter-specific assets
        const chapterAssets = this.getChapterAssets(chapterIndex);
        if (chapterAssets && title in chapterAssets) {
            return chapterAssets[title];
        }
        
        // Then check in global assets
        if (globalAssets && title in globalAssets) {
            return globalAssets[title];
        }
        
        // If not found, check if any asset title contains the search title
        for (const key in globalAssets) {
            if (globalAssets[key].title && globalAssets[key].title.includes(title)) {
                return globalAssets[key];
            }
        }
        
        debug(`Asset with title "${title}" not found`);
        return null;
    }
}