/**
 * DROPDOWN.JS - Business List Navigation
 *
 * This file replaces search.js functionality with a business list dropdown.
 * Users can click business names to focus the map and show popups.
 */

// Store references to elements and current state
let businessListElement = null;
let currentSelectedIndex = -1;
let businessPanel = null;
let toggleButton = null;

/**
 * Initialize dropdown toggle functionality
 */
function initializeDropdownToggle() {
    businessPanel = document.getElementById('business-panel');
    toggleButton = document.getElementById('business-dropdown-toggle');

    if (!businessPanel || !toggleButton) {
        console.error('Business panel or toggle button not found');
        return;
    }

    // Toggle dropdown when button is clicked
    toggleButton.addEventListener('click', function(e) {
        e.stopPropagation();
        businessPanel.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (businessPanel.classList.contains('open') &&
            !businessPanel.contains(e.target) &&
            !toggleButton.contains(e.target)) {
            businessPanel.classList.remove('open');
        }
    });

    console.log('Dropdown toggle initialized');
}

// Initialize toggle on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDropdownToggle);
} else {
    initializeDropdownToggle();
}

/**
 * Initialize dropdown when markers are ready
 *
 * Listens for the 'markersReady' event from markers.js,
 * then populates the business list.
 */
document.addEventListener('markersReady', function(e) {
    console.log('Markers ready, initializing business dropdown...');
    const advertisers = e.detail.advertisers;
    initializeDropdown(advertisers);
});

/**
 * Initialize the business dropdown list
 *
 * Populates the list with all business names from the CSV data.
 * Adds click handlers to each list item.
 *
 * @param {Array} advertisers - Array of advertiser objects from CSV
 */
function initializeDropdown(advertisers) {
    businessListElement = document.getElementById('business-list');

    if (!businessListElement) {
        console.error('Business list element not found');
        return;
    }

    // Clear any existing items
    businessListElement.innerHTML = '';

    // Create array with original indices for sorting
    var sortedBusinesses = advertisers.map(function(advertiser, index) {
        return { advertiser: advertiser, originalIndex: index };
    });

    // Sort alphabetically by name
    sortedBusinesses.sort(function(a, b) {
        return a.advertiser.name.localeCompare(b.advertiser.name);
    });

    // Create list item for each business
    sortedBusinesses.forEach(function(item) {
        const li = document.createElement('li');
        li.className = 'business-list-item';
        li.textContent = item.advertiser.name;
        li.dataset.index = item.originalIndex;  // Store original index for marker lookup

        // Add click event listener
        li.addEventListener('click', function() {
            selectBusiness(item.originalIndex);
        });

        businessListElement.appendChild(li);
    });

    console.log('Business dropdown initialized with ' + advertisers.length + ' businesses (sorted alphabetically)');
}

/**
 * Handle business selection
 *
 * When a business is clicked in the list:
 * 1. Remove highlight from previous selection
 * 2. Highlight the clicked business
 * 3. Focus the map on that business location
 * 4. Open the popup for that business
 * 5. Close the dropdown
 *
 * @param {number} index - Index of the selected business in the allMarkers array
 */
function selectBusiness(index) {
    // Remove 'active' class from all items
    const items = document.querySelectorAll('.business-list-item');
    items.forEach(function(item) {
        item.classList.remove('active');
    });

    // Add 'active' class to selected item
    if (items[index]) {
        items[index].classList.add('active');
    }

    // Update current selection
    currentSelectedIndex = index;

    // Focus map on the selected business
    // This function is defined in markers.js
    if (typeof focusOnMarker === 'function') {
        focusOnMarker(index);
    } else {
        console.error('focusOnMarker function not available');
    }

    // Close the dropdown after selection
    if (businessPanel) {
        businessPanel.classList.remove('open');
    }

    console.log('Selected business at index: ' + index);
}

/**
 * Get currently selected business index
 *
 * @returns {number} - Index of currently selected business, or -1 if none
 */
function getSelectedIndex() {
    return currentSelectedIndex;
}

/**
 * Clear selection
 *
 * Removes highlighting from all business items.
 */
function clearSelection() {
    const items = document.querySelectorAll('.business-list-item');
    items.forEach(function(item) {
        item.classList.remove('active');
    });
    currentSelectedIndex = -1;
}

/**
 * DO NOT MODIFY BELOW THIS LINE
 * Log that dropdown module is loaded
 */
console.log('Dropdown module loaded successfully');
