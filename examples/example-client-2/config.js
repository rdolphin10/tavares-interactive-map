/**
 * EXAMPLE CLIENT 2: Riverside Chamber of Commerce
 * This is an example configuration showing customization for a chamber in Riverside, CA
 * Blue color theme
 */

const CONFIG = {
    mapbox: {
        accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN_HERE',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-117.3961, 33.9533], // Riverside, CA
        zoom: 12,
        minZoom: 3,
        maxZoom: 18
    },

    client: {
        name: 'Riverside Chamber of Commerce',
        logoPath: 'assets/images/logo.png',
        logoAlt: 'Riverside Chamber Logo'
    },

    banners: [
        {
            image: 'assets/images/banner1.jpg',
            link: 'https://riversidechamber.com/featured-sponsor1',
            alt: 'Riverside Medical Center'
        },
        {
            image: 'assets/images/banner2.jpg',
            link: 'https://riversidechamber.com/featured-sponsor2',
            alt: 'Pacific Real Estate Group'
        }
    ],

    data: {
        csvPath: 'data/advertisers.csv'
    },

    markers: {
        defaultColor: '#1565c0', // Blue to match brand
        clusterEnabled: false,
        customIcon: null
    },

    search: {
        enabled: true,
        placeholder: 'Find Riverside businesses...',
        fields: ['name', 'category', 'city']
    }
};
