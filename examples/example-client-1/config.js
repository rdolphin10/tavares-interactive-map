/**
 * EXAMPLE CLIENT 1: Springfield Chamber of Commerce
 * This is an example configuration showing customization for a chamber in Springfield, IL
 * Green color theme
 */

const CONFIG = {
    mapbox: {
        accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN_HERE',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-89.6501, 39.7817], // Springfield, IL
        zoom: 13,
        minZoom: 3,
        maxZoom: 18
    },

    client: {
        name: 'Springfield Chamber of Commerce',
        logoPath: 'assets/images/logo.png',
        logoAlt: 'Springfield Chamber Logo'
    },

    banners: [
        {
            image: 'assets/images/banner1.jpg',
            link: 'https://springfieldchamber.com/sponsor1',
            alt: 'First National Bank'
        },
        {
            image: 'assets/images/banner2.jpg',
            link: 'https://springfieldchamber.com/sponsor2',
            alt: 'Smith Auto Group'
        }
    ],

    data: {
        csvPath: 'data/advertisers.csv'
    },

    markers: {
        defaultColor: '#2d8659', // Green to match brand
        clusterEnabled: false,
        customIcon: null
    },

    search: {
        enabled: true,
        placeholder: 'Search Springfield businesses...',
        fields: ['name', 'category', 'address']
    }
};
