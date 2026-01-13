/**
 * MAP.JS - Map Initialization and Setup
 *
 * This file creates the Mapbox GL map and sets up the user interface.
 * It uses configuration from config.js to customize the map for each client.
 */

// Variable to store the map instance (used by other files)
let map = null;

/**
 * Initialize the map when the page loads
 *
 * This function runs automatically when the DOM is fully loaded.
 * It sets up the UI elements and creates the Mapbox map.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing map...');

    // First, populate UI elements from config
    populateUIElements();

    // Then, initialize the Mapbox map
    initializeMap();
});

/**
 * Populate UI elements from configuration
 *
 * Sets the logo, client name, banners, and Dolph logo from CONFIG.
 * Now handles floating banners and left panel.
 */
function populateUIElements() {
    // Set client logo in left panel
    const logoImg = document.getElementById('client-logo');
    if (logoImg && CONFIG.client.logoPath) {
        logoImg.src = CONFIG.client.logoPath;
        logoImg.alt = CONFIG.client.logoAlt || 'Client Logo';
    }

    // Set up Dolph Map logo (bottom right)
    setupDolphLogo();

    // Set up Banner 1 (premium position)
    setupBanner1();

    // Set up Banner 2 (slideshow)
    setupBanner2Slideshow();

    console.log('UI elements populated');
}

/**
 * Set up Dolph Map Company Logo (Bottom Right)
 *
 * Displays the Dolph Map Company logo in the bottom right corner.
 * Can be clicked to navigate to Dolph Map Company website.
 */
function setupDolphLogo() {
    const dolphLogoImg = document.getElementById('dolph-logo');
    const dolphLogoContainer = document.querySelector('.dolph-logo-floating');

    if (!CONFIG.dolphLogo || !dolphLogoImg) {
        console.warn('Dolph logo not configured');
        return;
    }

    // Set logo image
    if (CONFIG.dolphLogo.logoPath) {
        dolphLogoImg.src = CONFIG.dolphLogo.logoPath;
        dolphLogoImg.alt = CONFIG.dolphLogo.logoAlt || 'Dolph Map Company';
    }

    // Add click handler if link is provided
    if (CONFIG.dolphLogo.link && CONFIG.dolphLogo.link !== '') {
        dolphLogoContainer.style.cursor = 'pointer';
        dolphLogoContainer.addEventListener('click', function() {
            window.open(CONFIG.dolphLogo.link, '_blank');
        });
    }

    console.log('Dolph Map logo configured');
}

/**
 * Set up Banner 1 (Premium Position)
 *
 * Banner 1 is a single static banner at the top center.
 * This is the premium advertising position.
 */
function setupBanner1() {
    const banner1Link = document.getElementById('banner1-link');
    const banner1Img = document.getElementById('banner1-img');

    if (CONFIG.banners.banner1) {
        if (banner1Link) {
            banner1Link.href = CONFIG.banners.banner1.link;
        }
        if (banner1Img) {
            banner1Img.src = CONFIG.banners.banner1.image;
            banner1Img.alt = CONFIG.banners.banner1.alt || 'Premium Sponsor';

            // Adjust banner 2 position once banner 1 image loads
            banner1Img.addEventListener('load', function() {
                adjustBanner2Position();
            });
        }
    }
}

/**
 * Adjust Banner 2 Position
 *
 * Positions banner 2 below banner 1 based on banner 1's actual height.
 * This prevents overlapping when banner 1 has a tall image.
 */
function adjustBanner2Position() {
    const banner1 = document.querySelector('.banner-floating.banner-1');
    const banner2 = document.querySelector('.banner-floating.banner-2');

    if (!banner1 || !banner2) {
        return;
    }

    // Get banner 1's position and height
    const banner1Rect = banner1.getBoundingClientRect();
    const banner1Bottom = banner1Rect.top + banner1Rect.height;

    // Position banner 2 with a 20px gap below banner 1
    const gap = 20;
    const newTop = banner1Bottom + gap;

    banner2.style.top = newTop + 'px';

    console.log('Banner 2 repositioned to ' + newTop + 'px (Banner 1 height: ' + banner1Rect.height + 'px)');
}

/**
 * Set up Banner 2 Slideshow
 *
 * Creates slideshow items from the banner2 array in CONFIG.
 * Each banner gets added to the slideshow container.
 */
function setupBanner2Slideshow() {
    const container = document.getElementById('banner2-slideshow');
    const banners = CONFIG.banners.banner2;

    if (!container || !banners || banners.length === 0) {
        console.warn('Banner 2 slideshow not configured');
        return;
    }

    // Create slideshow items for each banner
    banners.forEach(function(banner, index) {
        const slideItem = document.createElement('div');
        slideItem.className = 'slideshow-item';

        // First item is active by default
        if (index === 0) {
            slideItem.classList.add('active');
        }

        const link = document.createElement('a');
        link.href = banner.link;
        link.target = '_blank';

        const img = document.createElement('img');
        img.src = banner.image;
        img.alt = banner.alt || 'Sponsor ' + (index + 1);
        img.style.width = '100%';

        link.appendChild(img);
        slideItem.appendChild(link);
        container.appendChild(slideItem);
    });

    console.log('Banner slideshow created with ' + banners.length + ' banners');

    // Start the slideshow rotation
    startSlideshow();
}

/**
 * Start Banner Slideshow
 *
 * Rotates through slideshow items at the configured interval.
 * Uses fade animation defined in CSS.
 */
function startSlideshow() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slideshow-item');
    const interval = CONFIG.banners.slideshow.interval;

    // Only start slideshow if there are multiple banners
    if (slides.length <= 1) {
        return;
    }

    setInterval(function() {
        // Hide current slide
        slides[currentIndex].classList.remove('active');

        // Move to next slide (loop back to 0 at end)
        currentIndex = (currentIndex + 1) % slides.length;

        // Show next slide
        slides[currentIndex].classList.add('active');
    }, interval);

    console.log('Slideshow started with ' + (interval / 1000) + 's interval');
}

/**
 * Initialize the Mapbox GL map
 *
 * Creates the map instance with settings from CONFIG.
 * Adds navigation controls and handles map load events.
 */
function initializeMap() {
    // Check if Mapbox GL JS library is loaded
    if (typeof mapboxgl === 'undefined') {
        showError('Mapbox GL JS library failed to load. Check your internet connection.');
        return;
    }

    // Check if access token is configured
    if (!CONFIG.mapbox.accessToken || CONFIG.mapbox.accessToken === 'YOUR_MAPBOX_ACCESS_TOKEN_HERE') {
        showError('Mapbox access token is not configured. Please update config.js with your token.');
        console.error('Get a token at: https://account.mapbox.com/access-tokens/');
        return;
    }

    // Set the Mapbox access token
    mapboxgl.accessToken = CONFIG.mapbox.accessToken;

    try {
        // Create the map instance
        map = new mapboxgl.Map({
            container: 'map',           // ID of the container div
            style: CONFIG.mapbox.style, // Map style URL
            center: CONFIG.mapbox.center, // [longitude, latitude]
            zoom: CONFIG.mapbox.zoom,   // Initial zoom level
            minZoom: CONFIG.mapbox.minZoom, // Minimum zoom
            maxZoom: CONFIG.mapbox.maxZoom  // Maximum zoom
        });

        console.log('Map instance created');

        // Add navigation controls (zoom buttons and compass)
        // Position them in the top-right corner
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-right');

        // Add scale control (shows map scale in miles/kilometers)
        const scale = new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: 'imperial' // Use 'metric' for kilometers
        });
        map.addControl(scale, 'bottom-right');

        // Event: Map has finished loading
        map.on('load', function() {
            console.log('Map loaded successfully');

            // Inspect map layers (for debugging - shows all available layers)
            if (typeof inspectMapLayers === 'function') {
                console.log('');
                console.log('🔍 INSPECTING MAP LAYERS...');
                console.log('This will help identify which layers to customize.');
                console.log('');
                inspectMapLayers(map);
            }

            // Apply Dolph Map Company custom styling
            if (typeof applyDolphStyle === 'function') {
                applyDolphStyle(map);
            }

            onMapLoaded();
        });

        // Event: Map style has finished loading
        map.on('style.load', function() {
            console.log('Map style loaded');
        });

        // Event: Error loading map
        map.on('error', function(e) {
            console.error('Map error:', e);
            showError('Error loading map. Please check your configuration.');
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        showError('Failed to initialize map. Please check the console for details.');
    }
}

/**
 * Called when the map has finished loading
 *
 * This is where we trigger loading of markers and other map features.
 * The markers.js file will listen for this and load advertiser data.
 */
function onMapLoaded() {
    // Dispatch a custom event to notify other scripts that map is ready
    // markers.js will listen for this event to load advertisers
    const event = new CustomEvent('mapReady', { detail: { map: map } });
    document.dispatchEvent(event);
}

/**
 * Get the map instance
 *
 * Other files can call this function to access the map.
 * Used by markers.js to add markers to the map.
 *
 * @returns {mapboxgl.Map|null} - The map instance or null if not initialized
 */
function getMap() {
    return map;
}

/**
 * Resize the map
 *
 * Call this if the map container size changes.
 * Mapbox needs to recalculate its dimensions.
 */
function resizeMap() {
    if (map) {
        map.resize();
    }
}

/**
 * Fly to a specific location on the map
 *
 * Smoothly animates the map to center on given coordinates.
 * Uses padding to reserve space for banners and popup.
 *
 * @param {number} longitude - Longitude coordinate
 * @param {number} latitude - Latitude coordinate
 * @param {number} zoom - Zoom level (optional, defaults to 16)
 */
function flyToLocation(longitude, latitude, zoom) {
    if (!map) {
        console.warn('Map not initialized');
        return;
    }

    // Default zoom if not provided
    if (typeof zoom === 'undefined') {
        zoom = 16;
    }

    // getBannerPadding() is defined in markers.js and globally accessible
    const padding = typeof getBannerPadding === 'function' ? getBannerPadding() : { top: 400 };

    map.flyTo({
        center: [longitude, latitude],
        zoom: zoom,
        duration: 1000,
        essential: true,
        padding: padding
    });
}

/**
 * Handle window resize
 *
 * Resize the map when the browser window is resized.
 * Also adjust banner 2 position in case banner 1 height changes.
 */
window.addEventListener('resize', function() {
    resizeMap();
    adjustBanner2Position();
});

/**
 * DO NOT MODIFY BELOW THIS LINE
 * Log that map module is loaded
 */
console.log('Map module loaded successfully');
