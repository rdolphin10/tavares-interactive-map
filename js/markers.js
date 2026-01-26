/**
 * MARKERS.JS - Marker/Pin Management
 *
 * This file handles creating and managing map markers for advertisers.
 * It loads data from the CSV file and creates interactive pins on the map.
 */

// Array to store all markers (used for filtering/search)
let allMarkers = [];

// Array to store all advertiser data (used for search)
let allAdvertisers = [];

// Track currently open popup to ensure only one is open at a time
let currentOpenPopup = null;

/**
 * Initialize markers when map is ready
 *
 * Listen for the 'mapReady' event dispatched by map.js,
 * then load advertiser data and create markers.
 */
document.addEventListener('mapReady', function(e) {
    console.log('Map is ready, loading advertisers...');
    loadAdvertisersAndCreateMarkers();
});

/**
 * Load advertiser data from CSV and create markers
 *
 * This is the main function that:
 * 1. Loads the CSV file
 * 2. Validates the data
 * 3. Creates a marker for each valid advertiser
 */
function loadAdvertisersAndCreateMarkers() {
    // Get the map instance from map.js
    const map = getMap();

    if (!map) {
        console.error('Map not available');
        return;
    }

    // Load CSV file using the utility function
    loadCSV(CONFIG.data.csvPath)
        .then(function(advertisers) {
            // Store all advertisers for search functionality
            allAdvertisers = advertisers;

            // Filter out any invalid advertisers
            const validAdvertisers = advertisers.filter(function(advertiser) {
                return isValidAdvertiser(advertiser);
            });

            console.log('Valid advertisers: ' + validAdvertisers.length + ' of ' + advertisers.length);

            // Create a marker for each valid advertiser
            validAdvertisers.forEach(function(advertiser) {
                createMarker(advertiser, map);
            });

            console.log('All markers created: ' + allMarkers.length);

            // Dispatch event to notify that markers are ready
            const event = new CustomEvent('markersReady', {
                detail: {
                    advertisers: allAdvertisers,
                    markers: allMarkers
                }
            });
            document.dispatchEvent(event);
        })
        .catch(function(error) {
            console.error('Error loading advertisers:', error);
            showError('Failed to load advertiser data. Please check that the CSV file exists.');
        });
}

/**
 * Create a single marker on the map
 *
 * Creates a Mapbox marker for an advertiser and adds it to the map.
 * The marker includes a popup with advertiser information.
 *
 * @param {Object} advertiser - Advertiser data object
 * @param {mapboxgl.Map} map - Mapbox map instance
 */
function createMarker(advertiser, map) {
    // Parse coordinates as floats
    const longitude = parseFloat(advertiser.longitude);
    const latitude = parseFloat(advertiser.latitude);

    // Create the popup HTML using utility function
    const popupHTML = createPopupHTML(advertiser);

    // Create a Mapbox popup
    const popup = new mapboxgl.Popup({
        offset: [0, -10],     // Offset [x, y] - slight upward offset for better centering
        anchor: 'bottom',     // Anchor popup at bottom (appears above marker)
        closeButton: true,    // Show X button
        closeOnClick: false,  // Don't close when clicking map
        maxWidth: '360px'     // Balanced width
    }).setHTML(popupHTML);

    // Check if this is the Chamber of Commerce (use building icon)
    const isChamber = advertiser.name && advertiser.name.toLowerCase().includes('chamber of commerce');

    let marker;
    if (isChamber) {
        // Create custom building icon for Chamber (classic building with columns)
        const chamberEl = document.createElement('div');
        chamberEl.className = 'chamber-marker';
        chamberEl.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#1a5276">
                <path d="M12 2L2 8v2h20V8L12 2zM4 12v8h3v-6h2v6h2v-6h2v6h2v-6h2v6h3v-8H4zM2 22h20v-2H2v2z"/>
            </svg>
        `;
        chamberEl.style.cursor = 'pointer';

        marker = new mapboxgl.Marker({
            element: chamberEl,
            anchor: 'bottom'
        })
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);
    } else {
        // Create standard marker with navy blue color
        marker = new mapboxgl.Marker({
            color: CONFIG.markers.defaultColor  // Navy blue color from config
        })
            .setLngLat([longitude, latitude]) // Position
            .setPopup(popup)                  // Attach popup
            .addTo(map);                      // Add to map
    }

    // Close any other open popup when this marker is clicked
    marker.getElement().addEventListener('click', function() {
        closeAllPopups();
        currentOpenPopup = popup;

        // Move popup to body to escape map's stacking context
        setTimeout(function() {
            var popupEl = popup.getElement();
            if (popupEl && popupEl.parentElement) {
                document.body.appendChild(popupEl);
            }

            // After popup renders, ensure it's fully visible in viewport
            setTimeout(function() {
                ensurePopupVisible(popup, map);
            }, 50);
        }, 10);
    });

    // Track when popup is closed
    popup.on('close', function() {
        if (currentOpenPopup === popup) {
            currentOpenPopup = null;
        }
    });

    // Store marker and advertiser data together
    allMarkers.push({
        marker: marker,
        advertiser: advertiser,
        element: marker.getElement(),
        visible: true  // Track visibility for search filtering
    });
}

/**
 * Create custom marker element
 *
 * Creates an HTML element for the marker.
 * Can be customized with different colors or icons.
 *
 * @param {Object} advertiser - Advertiser data
 * @returns {HTMLElement} - Marker DOM element
 */
function createMarkerElement(advertiser) {
    // Create a container for the pin
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.cursor = 'pointer';
    el.style.pointerEvents = 'auto';

    // Set marker style
    if (CONFIG.markers.customIcon) {
        // Use custom icon image if configured
        el.style.backgroundImage = 'url(' + CONFIG.markers.customIcon + ')';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'cover';
    } else {
        // Create traditional pin shape with circular head and pointed bottom
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.position = 'relative';

        // Use a simple teardrop pin shape
        el.style.backgroundColor = CONFIG.markers.defaultColor;
        el.style.border = '3px solid white';
        el.style.borderRadius = '50% 50% 50% 0';
        el.style.transform = 'rotate(-45deg)';
        el.style.boxShadow = '0 3px 6px rgba(0,0,0,0.4)';

        // Create inner white circle for better visibility
        const innerCircle = document.createElement('div');
        innerCircle.style.width = '10px';
        innerCircle.style.height = '10px';
        innerCircle.style.backgroundColor = 'white';
        innerCircle.style.borderRadius = '50%';
        innerCircle.style.position = 'absolute';
        innerCircle.style.top = '50%';
        innerCircle.style.left = '50%';
        innerCircle.style.transform = 'translate(-50%, -50%) rotate(45deg)';

        el.appendChild(innerCircle);
    }

    // Add title attribute for hover tooltip
    el.title = advertiser.name || 'Location';

    return el;
}

/**
 * Filter markers based on search term
 *
 * Shows or hides markers based on whether they match the search.
 * Called by search.js when user types in search box.
 *
 * @param {string} searchTerm - The search text
 */
function filterMarkers(searchTerm) {
    // If search is empty, show all markers
    if (!searchTerm || searchTerm.length === 0) {
        showAllMarkers();
        return;
    }

    // Convert search term to lowercase for case-insensitive search
    const searchLower = searchTerm.toLowerCase();

    // Get search fields from config
    const searchFields = CONFIG.search.fields || ['name'];

    // Loop through all markers
    allMarkers.forEach(function(markerData) {
        let isMatch = false;

        // Check if advertiser matches search term in any configured field
        searchFields.forEach(function(field) {
            const value = markerData.advertiser[field];
            if (value && String(value).toLowerCase().includes(searchLower)) {
                isMatch = true;
            }
        });

        // Show or hide marker based on match
        if (isMatch) {
            showMarker(markerData);
        } else {
            hideMarker(markerData);
        }
    });

    console.log('Filtered markers for: "' + searchTerm + '"');
}

/**
 * Show all markers
 *
 * Makes all markers visible on the map.
 * Used when search is cleared.
 */
function showAllMarkers() {
    allMarkers.forEach(function(markerData) {
        showMarker(markerData);
    });
}

/**
 * Show a single marker
 *
 * Makes a marker visible on the map.
 *
 * @param {Object} markerData - Marker data object from allMarkers array
 */
function showMarker(markerData) {
    if (!markerData.visible) {
        markerData.element.style.display = 'block';
        markerData.visible = true;
    }
}

/**
 * Hide a single marker
 *
 * Hides a marker from the map (but doesn't remove it).
 *
 * @param {Object} markerData - Marker data object from allMarkers array
 */
function hideMarker(markerData) {
    if (markerData.visible) {
        markerData.element.style.display = 'none';
        markerData.visible = false;
    }
}

/**
 * Get all advertisers
 *
 * Returns the array of all advertiser data.
 * Used by search.js for additional functionality.
 *
 * @returns {Array} - Array of advertiser objects
 */
function getAllAdvertisers() {
    return allAdvertisers;
}

/**
 * Get all markers
 *
 * Returns the array of all marker data.
 *
 * @returns {Array} - Array of marker data objects
 */
function getAllMarkers() {
    return allMarkers;
}

/**
 * Close all open popups
 *
 * Ensures only one popup is displayed at a time.
 */
function closeAllPopups() {
    allMarkers.forEach(function(markerData) {
        const popup = markerData.marker.getPopup();
        if (popup && popup.isOpen()) {
            popup.remove();
        }
    });
    currentOpenPopup = null;
}

/**
 * Focus on a specific marker
 *
 * Positions the map so the marker is in the lower portion of the screen,
 * leaving room above for the popup to display below the banners.
 * Uses Mapbox's padding option to reserve space for banners and popup.
 *
 * @param {number} index - Index of marker in allMarkers array
 */
function focusOnMarker(index) {
    if (index >= 0 && index < allMarkers.length) {
        const markerData = allMarkers[index];
        const lngLat = markerData.marker.getLngLat();
        const map = getMap();

        // Close any open popups first
        closeAllPopups();

        // Calculate padding to account for banners + popup space
        const padding = getBannerPadding();

        // Fly to marker with padding - Mapbox handles the offset automatically
        map.flyTo({
            center: [lngLat.lng, lngLat.lat],
            zoom: 16,
            duration: 1000,
            padding: padding
        });

        // Open popup after fly animation completes
        setTimeout(function() {
            markerData.marker.togglePopup();
            currentOpenPopup = markerData.marker.getPopup();

            // Move popup to body to escape map's stacking context
            setTimeout(function() {
                var popupEl = currentOpenPopup.getElement();
                if (popupEl && popupEl.parentElement) {
                    document.body.appendChild(popupEl);
                }

                // After popup renders, ensure it's fully visible in viewport
                setTimeout(function() {
                    ensurePopupVisible(currentOpenPopup, map);
                }, 50);
            }, 10);
        }, 1100);
    }
}

/**
 * Ensure popup is fully visible within the browser viewport
 *
 * If the popup extends beyond the top of the viewport,
 * pan the map down to bring the entire popup into view.
 *
 * @param {mapboxgl.Popup} popup - The popup instance
 * @param {mapboxgl.Map} map - The map instance
 */
function ensurePopupVisible(popup, map) {
    if (!popup) return;

    var popupEl = popup.getElement();
    if (!popupEl) return;

    var popupRect = popupEl.getBoundingClientRect();

    // Check if popup top is above the viewport (cut off at top)
    if (popupRect.top < 0) {
        // Calculate how many pixels we need to pan down
        var panAmount = Math.abs(popupRect.top) + 20; // 20px buffer

        // Pan the map down to bring popup into view
        map.panBy([0, -panAmount], { duration: 300 });
    }
}

/**
 * Calculate padding to reserve space for banners and popup
 * Returns a Mapbox-compatible padding object for flyTo()
 * Uses responsive values based on screen size
 *
 * @returns {Object} Padding object with top, bottom, left, right values
 */
function getBannerPadding() {
    // Find banner bottom
    let bannerBottom = 0;
    const banner1 = document.querySelector('.banner-floating.banner-1');
    const banner2 = document.querySelector('.banner-floating.banner-2');

    if (banner1) {
        bannerBottom = banner1.getBoundingClientRect().bottom;
    }
    if (banner2 && banner2.offsetParent !== null) {
        const rect = banner2.getBoundingClientRect();
        if (rect.bottom > bannerBottom) {
            bannerBottom = rect.bottom;
        }
    }

    // Responsive popup space and buffer based on screen size
    let popupSpace, buffer;
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 400) {
        // Small phones - smaller popups
        popupSpace = 300;
        buffer = 60;
    } else if (viewportWidth <= 480) {
        // Standard phones
        popupSpace = 350;
        buffer = 80;
    } else if (viewportWidth <= 768) {
        // Tablets
        popupSpace = 450;
        buffer = 100;
    } else {
        // Desktop
        popupSpace = 600;
        buffer = 120;
    }

    // Calculate desired top padding
    let topPadding = bannerBottom + popupSpace + buffer;

    // Cap at percentage of viewport height based on device
    const maxPaddingPercent = viewportWidth <= 480 ? 0.6 : 0.7;
    const maxPadding = window.innerHeight * maxPaddingPercent;
    topPadding = Math.min(topPadding, maxPadding);

    return {
        top: topPadding,
        bottom: viewportWidth <= 480 ? 30 : 50,
        left: 0,
        right: 0
    };
}

/**
 * DO NOT MODIFY BELOW THIS LINE
 * Log that markers module is loaded
 */
console.log('Markers module loaded successfully');
