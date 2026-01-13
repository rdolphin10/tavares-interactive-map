/**
 * CONFIG - Client Configuration Object
 *
 * This is the PRIMARY CUSTOMIZATION FILE for each client.
 * Update this file when deploying for a new chamber of commerce.
 *
 * Most customization happens here - you should rarely need to modify
 * other JavaScript files.
 */

const CONFIG = {

    // ========================================
    // MAPBOX SETTINGS
    // ========================================
    mapbox: {
        /**
         * Mapbox Access Token
         * Get your token at: https://account.mapbox.com/access-tokens/
         * IMPORTANT: Replace this with your actual token before deploying
         */
        accessToken: 'pk.eyJ1IjoicnlhbmRvbHBoanIiLCJhIjoiY21nenN1bGR1MDkwcWFtcHV3MTl6bWRodSJ9.VnbaNeUpr7ixd2knIEdEhg',

        /**
         * Map Style URL
         * Options:
         * - 'mapbox://styles/mapbox/streets-v12' (default streets)
         * - 'mapbox://styles/mapbox/light-v11' (light theme)
         * - 'mapbox://styles/mapbox/dark-v11' (dark theme)
         * - 'mapbox://styles/mapbox/outdoors-v12' (outdoor/terrain)
         * - 'mapbox://styles/mapbox/satellite-streets-v12' (satellite)
         * - Custom style URL (create your own at https://studio.mapbox.com/)
         */
        style: 'mapbox://styles/mapbox/streets-v12',

        /**
         * Map Center [longitude, latitude]
         * Set this to the center of your client's area
         * Example: Springfield, IL = [-89.6501, 39.7817]
         * Find coordinates: https://www.latlong.net/
         */
        center: [-81.732307, 28.805161], // Center of USA (update for client)

        /**
         * Initial Zoom Level
         * Range: 0 (world view) to 22 (building level)
         * Typical values:
         * - City view: 12-13
         * - Neighborhood: 14-15
         * - Street level: 16-17
         */
        zoom: 12,

        /**
         * Minimum Zoom Level (prevents zooming out too far)
         */
        minZoom: 3,

        /**
         * Maximum Zoom Level (prevents zooming in too far)
         */
        maxZoom: 18
    },

    // ========================================
    // CLIENT INFORMATION
    // ========================================
    client: {
        /**
         * Client Name (Chamber of Commerce name)
         * Displayed at the top of the map
         */
        name: 'Chamber of Commerce Interactive Map',

        /**
         * Path to Client Logo Image
         * Recommended size: 200px width, maintain aspect ratio
         * Supported formats: PNG, JPG, SVG
         */
        logoPath: 'assets/images/TavaresChamberLogo.png',

        /**
         * Alt text for logo (for accessibility)
         */
        logoAlt: 'Chamber of Commerce Logo'
    },

    // ========================================
    // DOLPH MAP LOGO
    // ========================================
    dolphLogo: {
        /**
         * Path to Dolph Map Company Logo
         * Displayed in bottom right corner
         * Recommended size: 200px width x 60px height
         * Supported formats: PNG, SVG (with transparent background)
         */
        logoPath: 'assets/images/dolph-logo.png',

        /**
         * Alt text for Dolph logo
         */
        logoAlt: 'Dolph Map Company',

        /**
         * Optional link when logo is clicked
         * Set to null or empty string to disable link
         */
        link: 'https://dolphmap.com'
    },

    // ========================================
    // BANNER CONFIGURATION
    // ========================================
    banners: {
        /**
         * Banner 1 - Premium Position (Center Top - Always Visible)
         * This banner gets the most prominent position
         * Single static banner for highest-paying advertiser
         */
        banner1: {
            // Path to banner image
            // Recommended size: 728x90px (leaderboard)
            image: 'assets/images/TavadoraBanner.jpg',

            // URL to navigate to when banner is clicked
            link: 'https://www.tavadora.com/',

            // Alt text for accessibility
            alt: 'Premium Sponsor'
        },

        /**
         * Banner 2 - Slideshow (Below Banner 1)
         * Array of banners that rotate automatically
         * Add as many banners as needed to the array
         */
        banner2: [
            {
                image: 'assets/images/BeltonBailBondsBanner.jpg',
                link: 'https://www.beltonbailbonds.com/',
                alt: 'Sponsor 1'
            },
            {
                image: 'assets/images/grace.jpg',
                link: 'https://graceassured.com/',
                alt: 'Sponsor 2'
            },
            {
                image: 'assets/images/chc.jpg',
                link: 'https://www.chcfl.org/',
                alt: 'Sponsor 3'
            }
        ],

        /**
         * Slideshow Settings
         */
        slideshow: {
            // Time each banner is displayed (milliseconds)
            interval: 7000,  // 7 seconds

            // Fade transition duration (milliseconds)
            fadeTransition: 1000  // 1 second
        }
    },

    // ========================================
    // DATA SOURCE
    // ========================================
    data: {
        /**
         * Path to CSV file containing advertiser data
         * Required columns: name, latitude, longitude
         * Optional columns: address, city, state, zip, phone, website,
         *                   email, category, description
         */
        csvPath: 'data/advertisers.csv'
    },

    // ========================================
    // MARKER/PIN SETTINGS
    // ========================================
    markers: {
        /**
         * Default Marker Color
         * Use hex color code (e.g., '#FF0000' for red)
         * Can be customized to match client branding
         */
        defaultColor: '#001f3f',

        /**
         * Enable Marker Clustering
         * When true, nearby markers group together at lower zoom levels
         * Recommended: true for maps with many locations (20+)
         */
        clusterEnabled: false,

        /**
         * Custom Marker Icon (Optional)
         * Set to null to use default Mapbox marker
         * Set to image path to use custom icon (e.g., 'assets/icons/custom-pin.png')
         * Recommended size: 32x32px or 40x40px PNG with transparency
         */
        customIcon: null
    },

};  // End of CONFIG object

/**
 * DO NOT MODIFY BELOW THIS LINE
 * The following code makes CONFIG available to other JavaScript files
 */

// Verify that CONFIG is properly defined
if (typeof CONFIG === 'undefined') {
    console.error('ERROR: CONFIG object is not defined!');
}

// Log configuration loaded (helpful for debugging)
console.log('Configuration loaded successfully');
