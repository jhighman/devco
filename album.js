/**
 * Pop Song Summer - Album Experience
 * Winamp-inspired carousel for displaying chapter artwork and playing music
 */

// YAML data converted to JavaScript object
// In a production environment, this would be loaded from the YAML file using js-yaml or similar
const data = {
    global_assets: {
        insignia_of_the_sun: {
            title: "Insignia of the Sun (Primary Motif)",
            description: "Macro close-up of a velvet patch stitched with a gold-thread sunburst (12 rays) catching light",
            svg: "assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-svg-v001-20250831-jh-final.svg",
            png: "assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-4k-rgb-v001-20250831-jh-final.png",
            canvas: "assets/images/pss/pss-chall-insignia-of-the-sun-motif-ar1x1-4k-canvas-v001-20250831-jh-final.html",
            metadata: "assets/images/pss/pss-chall-insignia-of-the-sun-motif-metadata-v001-20250831-jh-final.json",
            used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        woman_in_red: {
            title: "Woman in Red (Archetype)",
            description: "Portrait: woman in a red velvet dress/coat, sun insignia at sleeve",
            svg: "assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-svg-v001-20250831-jh-final.svg",
            png: "assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-4k-rgb-v001-20250831-jh-final.png",
            canvas: "assets/images/pss/pss-chall-woman-in-red-portrait-ar4x5-4k-canvas-v001-20250831-jh-final.html",
            metadata: "assets/images/pss/pss-chall-woman-in-red-metadata-v001-20250831-jh-final.json",
            used_in_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },
    chapters: [
        {
            number: 1,
            title: "Velvet Dancers",
            html_file: "chapter1.html",
            music_file: "music/pss_ch01_velvet-dancers.mp3",
            assets: [
                {
                    title: "The Velvet Curtain",
                    description: "Anonymous city alley between shuttered bodegas; a blood-red velvet curtain breathes",
                    svg: "assets/images/pss/pss-ch01-velvet-curtain-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch01-velvet-curtain-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch01-velvet-curtain-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch01-velvet-curtain-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                },
                {
                    title: "Back Room: Church of Light",
                    description: "Disco-temple mood: columns of light, water-ripple floor",
                    svg: "assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch01-back-room-church-of-light-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch01-back-room-church-of-light-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                },
                {
                    title: "Hall of Mirrors",
                    description: "Tight corridor of warped mirrors showing the narrator as different ages/selves",
                    svg: "assets/images/pss/pss-ch01-hall-of-mirrors-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch01-hall-of-mirrors-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch01-hall-of-mirrors-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch01-hall-of-mirrors-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                }
            ]
        },
        {
            number: 2,
            title: "Insignia of the Sun",
            html_file: "chapter2.html",
            music_file: "music/pss_ch02_insignia-of-the-sun.mp3",
            assets: []
        },
        {
            number: 3,
            title: "Burning Houses (in the Distance)",
            html_file: "chapter3.html",
            music_file: "music/pss_ch03_burning-houses-in-the-distance.mp3",
            assets: [
                {
                    title: "Burning Houses on the Horizon",
                    description: "Distant suburban ridge ablaze under orange sky",
                    svg: "assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-6k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch03-burning-houses-horizon-panorama-ar21x9-6k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch03-burning-houses-horizon-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "21:9"
                }
            ]
        },
        {
            number: 4,
            title: "On the Corner, Reading Poetry",
            html_file: "chapter4.html",
            music_file: "music/pss_ch04_on-the-corner-reading-poetry.mp3",
            assets: [
                {
                    title: "The Corner: Chalk Sun & Crate",
                    description: "City corner; chalk circle with 12 rays, a milk crate 'stage'",
                    svg: "assets/images/pss/pss-ch10-the-corner-chalk-sun-and-crate-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch10-the-corner-chalk-sun-and-crate-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch10-the-corner-chalk-sun-and-crate-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch10-the-corner-chalk-sun-and-crate-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                }
            ]
        },
        {
            number: 5,
            title: "A Blind Man Singing",
            html_file: "chapter5.html",
            music_file: "music/pss_ch05_a-blind-man-singing.mp3",
            assets: [
                {
                    title: "Blind Man Singing",
                    description: "Street or bridge scene; blind singer on a milk crate, cane nearby",
                    svg: "assets/images/pss/pss-ch05-blind-man-singing-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch05-blind-man-singing-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch05-blind-man-singing-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch05-blind-man-singing-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                }
            ]
        },
        {
            number: 6,
            title: "Out to the Other Side",
            html_file: "chapter6.html",
            music_file: "music/pss_ch06_out-to-the-other-side.mp3",
            assets: []
        },
        {
            number: 7,
            title: "Second Lover, Over and Under",
            html_file: "chapter7.html",
            music_file: "music/pss_ch07_second-lover-over-and-under.mp3",
            assets: []
        },
        {
            number: 8,
            title: "1985 (Disco Time Machine)",
            html_file: "chapter8.html",
            music_file: "music/pss_ch08_1985-disco-time-machine.mp3",
            assets: [
                {
                    title: "Roller Rink Shelter",
                    description: "Rink as shelter: cots on the floor, kids on rental skates weaving between",
                    svg: "assets/images/pss/pss-ch08-roller-rink-shelter-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch08-roller-rink-shelter-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch08-roller-rink-shelter-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch08-roller-rink-shelter-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                }
            ]
        },
        {
            number: 9,
            title: "Shadow Drifter",
            html_file: "chapter9.html",
            music_file: "music/pss_ch09_shadow-drifter.mp3",
            assets: [
                {
                    title: "Bridges — Exodus Chorus",
                    description: "Night bridge full of pedestrians + cars moving in rhythm",
                    svg: "assets/images/pss/pss-ch09-bridges-exodus-chorus-panorama-ar21x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch09-bridges-exodus-chorus-panorama-ar21x9-6k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch09-bridges-exodus-chorus-panorama-ar21x9-6k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch09-bridges-exodus-chorus-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "21:9"
                }
            ]
        },
        {
            number: 10,
            title: "The End of Everything",
            html_file: "chapter10.html",
            music_file: "music/pss_ch10_the-end-of-everything.mp3",
            assets: [
                {
                    title: "Heliograph: Storage Unit Ritual",
                    description: "Storage unit interior; 12 red candles in a circle",
                    svg: "assets/images/pss/pss-ch11-heliograph-storage-unit-ritual-scene-ar16x9-svg-v001-20250831-jh-final.svg",
                    png: "assets/images/pss/pss-ch11-heliograph-storage-unit-ritual-scene-ar16x9-4k-rgb-v001-20250831-jh-final.png",
                    canvas: "assets/images/pss/pss-ch11-heliograph-storage-unit-ritual-scene-ar16x9-4k-canvas-v001-20250831-jh-final.html",
                    metadata: "assets/images/pss/pss-ch11-heliograph-storage-unit-ritual-metadata-v001-20250831-jh-final.json",
                    aspect_ratio: "16:9"
                }
            ]
        }
    ]
};

// Create playlist array with chapter information
const playlist = data.chapters.map(chapter => ({
    number: chapter.number,
    title: chapter.title,
    music_file: chapter.music_file,
    svg: chapter.assets.length > 0 ? chapter.assets[0].svg : data.global_assets.insignia_of_the_sun.svg,
    png: chapter.assets.length > 0 ? chapter.assets[0].png : data.global_assets.insignia_of_the_sun.png,
    description: chapter.assets.length > 0 ? chapter.assets[0].description : data.global_assets.insignia_of_the_sun.description,
    aspect_ratio: chapter.assets.length > 0 ? chapter.assets[0].aspect_ratio || "16:9" : "1:1",
    all_assets: chapter.assets
}));

// DOM elements
let currentIndex = 0;
let isPlaying = false;
let autoAdvance = true;

// Initialize the carousel when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselDots = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const player = document.getElementById('player');
    const songTitle = document.getElementById('song-title');
    const songDescription = document.getElementById('song-description');
    const viewAssetsBtn = document.getElementById('view-assets-btn');
    const assetsModal = document.getElementById('assets-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // Mobile menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    
    if (navToggle && mobileMenu && closeBtn) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.add('flex');
            mobileMenu.classList.remove('hidden');
        });
        
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Initialize carousel slides
    function initCarousel() {
        // Clear existing slides and dots
        carouselSlides.innerHTML = '';
        carouselDots.innerHTML = '';
        
        // Create slides and dots for each chapter
        playlist.forEach((chapter, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `w-full flex-shrink-0 relative ${getAspectRatioClass(chapter.aspect_ratio)}`;
            
            // Create picture element for SVG with PNG fallback
            const picture = document.createElement('picture');
            picture.className = 'w-full h-full flex items-center justify-center';
            
            // Add source for SVG
            const source = document.createElement('source');
            source.srcset = chapter.svg;
            source.type = 'image/svg+xml';
            picture.appendChild(source);
            
            // Add img for PNG fallback
            const img = document.createElement('img');
            img.src = chapter.png;
            img.alt = `Chapter ${chapter.number}: ${chapter.title}`;
            img.className = 'w-full h-full object-contain';
            picture.appendChild(img);
            
            // Add picture to slide
            slide.appendChild(picture);
            
            // Add slide to carousel
            carouselSlides.appendChild(slide);
            
            // Create dot
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#FFC107]' : 'bg-[#4A4A4A]'}`;
            dot.setAttribute('aria-label', `Go to chapter ${chapter.number}`);
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        // Update carousel
        updateCarousel();
    }
    
    // Get Tailwind aspect ratio class based on aspect ratio string
    function getAspectRatioClass(aspectRatio) {
        switch (aspectRatio) {
            case '21:9':
                return 'aspect-w-21 aspect-h-9';
            case '16:9':
                return 'aspect-w-16 aspect-h-9';
            case '4:5':
                return 'aspect-w-4 aspect-h-5';
            case '1:1':
                return 'aspect-w-1 aspect-h-1';
            default:
                return 'aspect-w-16 aspect-h-9';
        }
    }
    
    // Flag to prevent recursive updateCarousel calls
    let isUpdatingCarousel = false;
    
    // Update carousel display
    function updateCarousel() {
        // Prevent recursive calls
        if (isUpdatingCarousel) return;
        isUpdatingCarousel = true;
        
        // Update slide position
        carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        const dots = carouselDots.querySelectorAll('button');
        dots.forEach((dot, index) => {
            dot.className = `w-3 h-3 rounded-full ${index === currentIndex ? 'bg-[#FFC107]' : 'bg-[#4A4A4A]'}`;
        });
        
        // Update slides (add/remove playing class)
        const slides = carouselSlides.querySelectorAll('div');
        slides.forEach((slide, index) => {
            const picture = slide.querySelector('picture');
            if (index === currentIndex && isPlaying) {
                picture.classList.add('playing');
            } else {
                picture.classList.remove('playing');
            }
        });
        
        // Update metadata
        const chapter = playlist[currentIndex];
        songTitle.textContent = `Chapter ${chapter.number}: ${chapter.title}`;
        songDescription.textContent = chapter.description;
        
        // Update audio source without immediately playing
        const wasPlaying = isPlaying;
        isPlaying = false; // Temporarily set to false to prevent immediate play
        
        // Remove existing event listeners to prevent duplicates
        player.removeEventListener('canplay', onCanPlay);
        
        // Update the audio source
        player.src = chapter.music_file;
        
        // If it was playing before, set up to play when ready
        if (wasPlaying) {
            player.addEventListener('canplay', onCanPlay);
        }
        
        // Allow future updateCarousel calls
        isUpdatingCarousel = false;
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = playlist.length - 1;
        } else if (index >= playlist.length) {
            index = 0;
        }
        
        // Only update if we're actually changing slides
        if (currentIndex !== index) {
            currentIndex = index;
            
            // Reset isUpdatingCarousel flag to ensure navigation works
            isUpdatingCarousel = false;
            
            // Update the carousel
            updateCarousel();
            
            // Log navigation for debugging
            console.log(`Navigated to chapter ${playlist[currentIndex].number}: ${playlist[currentIndex].title}`);
        }
    }
    
    // Go to previous slide
    function goToPrevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Go to next slide
    function goToNextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Open assets modal
    function openAssetsModal() {
        const chapter = playlist[currentIndex];
        modalTitle.textContent = `Chapter ${chapter.number}: ${chapter.title} - Assets`;
        
        // Clear modal content
        modalContent.innerHTML = '';
        
        // Add all assets for the current chapter
        if (chapter.all_assets && chapter.all_assets.length > 0) {
            chapter.all_assets.forEach(asset => {
                const assetCard = document.createElement('div');
                assetCard.className = 'bg-[#2d3748] rounded-lg overflow-hidden';
                
                const assetImg = document.createElement('img');
                assetImg.src = asset.png;
                assetImg.alt = asset.title;
                assetImg.className = 'w-full h-48 object-cover';
                
                const assetInfo = document.createElement('div');
                assetInfo.className = 'p-4';
                
                const assetTitle = document.createElement('h4');
                assetTitle.textContent = asset.title;
                assetTitle.className = 'text-[#FFC107] font-bold mb-2';
                
                const assetDesc = document.createElement('p');
                assetDesc.textContent = asset.description;
                assetDesc.className = 'text-white text-sm';
                
                assetInfo.appendChild(assetTitle);
                assetInfo.appendChild(assetDesc);
                
                assetCard.appendChild(assetImg);
                assetCard.appendChild(assetInfo);
                
                modalContent.appendChild(assetCard);
            });
        } else {
            // Show global assets if no chapter-specific assets
            const assetCard = document.createElement('div');
            assetCard.className = 'bg-[#2d3748] rounded-lg overflow-hidden col-span-2';
            
            const assetImg = document.createElement('img');
            assetImg.src = data.global_assets.insignia_of_the_sun.png;
            assetImg.alt = data.global_assets.insignia_of_the_sun.title;
            assetImg.className = 'w-full h-48 object-contain';
            
            const assetInfo = document.createElement('div');
            assetInfo.className = 'p-4';
            
            const assetTitle = document.createElement('h4');
            assetTitle.textContent = data.global_assets.insignia_of_the_sun.title;
            assetTitle.className = 'text-[#FFC107] font-bold mb-2';
            
            const assetDesc = document.createElement('p');
            assetDesc.textContent = data.global_assets.insignia_of_the_sun.description;
            assetDesc.className = 'text-white text-sm';
            
            assetInfo.appendChild(assetTitle);
            assetInfo.appendChild(assetDesc);
            
            assetCard.appendChild(assetImg);
            assetCard.appendChild(assetInfo);
            
            modalContent.appendChild(assetCard);
        }
        
        // Show modal
        assetsModal.classList.remove('hidden');
    }
    
    // Close assets modal
    function closeAssetsModal() {
        assetsModal.classList.add('hidden');
    }
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Previous button clicked');
        goToPrevSlide();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Next button clicked');
        goToNextSlide();
    });
    
    // Make sure navigation buttons are visible and styled properly
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    prevBtn.style.zIndex = '30';
    nextBtn.style.zIndex = '30';
    
    // Function to handle when audio can play
    function onCanPlay() {
        // Remove the listener to prevent multiple calls
        player.removeEventListener('canplay', onCanPlay);
        
        // Only play if we're still on the same slide that triggered this
        if (player.src.includes(playlist[currentIndex].music_file)) {
            isPlaying = true;
            player.play().catch(error => {
                console.error('Error playing audio:', error);
                isPlaying = false;
                autoAdvance = false;
            });
        }
    }
    
    player.addEventListener('play', () => {
        isPlaying = true;
        // Update UI without changing audio source
        const slides = carouselSlides.querySelectorAll('div');
        slides.forEach((slide, index) => {
            const picture = slide.querySelector('picture');
            if (index === currentIndex) {
                picture.classList.add('playing');
            } else {
                picture.classList.remove('playing');
            }
        });
    });
    
    player.addEventListener('pause', () => {
        isPlaying = false;
        // Update UI without changing audio source
        const slides = carouselSlides.querySelectorAll('div');
        slides.forEach(slide => {
            const picture = slide.querySelector('picture');
            picture.classList.remove('playing');
        });
    });
    
    player.addEventListener('ended', () => {
        isPlaying = false;
        if (autoAdvance) {
            goToNextSlide();
        }
    });
    
    // Add error handling for the audio player
    player.addEventListener('error', (e) => {
        console.error('Audio player error:', e);
        isPlaying = false;
        autoAdvance = false;
        
        // Update UI without changing audio source
        const slides = carouselSlides.querySelectorAll('div');
        slides.forEach(slide => {
            const picture = slide.querySelector('picture');
            picture.classList.remove('playing');
        });
    });
    
    viewAssetsBtn.addEventListener('click', openAssetsModal);
    closeModalBtn.addEventListener('click', closeAssetsModal);
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        console.log(`Key pressed: ${e.key}`);
        if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === 'Space') {
            // Toggle play/pause with spacebar
            if (isPlaying) {
                player.pause();
            } else {
                player.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            }
            e.preventDefault(); // Prevent page scrolling
        } else if (e.key === 'Escape' && !assetsModal.classList.contains('hidden')) {
            closeAssetsModal();
        }
    });
    
    // Initialize carousel
    initCarousel();
    
    // Add navigation instructions
    const instructionsDiv = document.createElement('div');
    instructionsDiv.className = 'text-center text-sm text-[#FF9800] mt-4';
    instructionsDiv.innerHTML = `
        <p>Navigation: Use arrow buttons or keyboard (← →) to change chapters. Press spacebar to play/pause.</p>
    `;
    document.querySelector('main > div').appendChild(instructionsDiv);
    
    console.log('Album carousel initialized with navigation controls');
});