import { chapterAssets, globalAssets } from './data.js';
import { debug } from './utils.js';

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
        
        // Add CDN or caching logic here if needed
        
        // Check if the path starts with a slash and remove it if needed
        // This helps with relative paths in production
        if (path.startsWith('/') && !path.startsWith('//')) {
            const newPath = path.substring(1);
            debug(`Modified asset path: ${newPath}`);
            return newPath;
        }
        
        return path;
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
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            const processedSrc = this.getAssetPath(src);
            
            debug(`Attempting to preload image: ${processedSrc}`);
            img.src = processedSrc;
            
            img.onload = () => {
                this.cache.set(src, img);
                debug(`Successfully preloaded image: ${processedSrc}`);
                resolve(img);
            };
            
            img.onerror = (error) => {
                debug(`Failed to preload image: ${processedSrc}`);
                debug(`Image error details: ${error ? JSON.stringify(error) : 'No error details available'}`);
                
                // Try an alternative path as fallback (without the /pop-song-summer prefix)
                if (processedSrc.includes('/pop-song-summer/')) {
                    const altPath = processedSrc.replace('/pop-song-summer/', '/');
                    debug(`Trying alternative path: ${altPath}`);
                    
                    const altImg = new Image();
                    altImg.src = altPath;
                    
                    altImg.onload = () => {
                        debug(`Alternative path successful: ${altPath}`);
                        this.cache.set(src, altImg);
                        resolve(altImg);
                    };
                    
                    altImg.onerror = () => {
                        debug(`Alternative path also failed: ${altPath}`);
                        reject(new Error(`Failed to preload image: ${processedSrc}`));
                    };
                } else {
                    reject(new Error(`Failed to preload image: ${processedSrc}`));
                }
            };
        });
    }

    /**
     * Preload an audio file and cache it
     * @param {string} src - The audio source URL
     * @returns {Promise<HTMLAudioElement>} - Promise resolving to the loaded audio
     */
    async preloadAudio(src) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }
        
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = this.getAssetPath(src);
            
            audio.oncanplaythrough = () => {
                this.cache.set(src, audio);
                debug(`Preloaded audio: ${src}`);
                resolve(audio);
            };
            
            audio.onerror = () => {
                debug(`Failed to preload audio: ${src}`);
                reject(new Error(`Failed to preload audio: ${src}`));
            };
        });
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