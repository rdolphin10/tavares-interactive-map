/**
 * DOLPH-STYLE.JS - Dolph Map Company Custom Styling
 *
 * This file applies the Dolph Map Company custom colors to the Mapbox map.
 * It modifies various map layers to match the Dolph brand style guide.
 *
 * Color Scheme:
 * - City Titles: #ed1c24
 * - Ocean/Water: #add3f0
 * - Interstates/Highways: #cd292c
 * - Cities: #fffcd5, #ffffff, #4f4f4f
 * - Zip Codes: #5da9dd
 * - Golf Courses/Parks/Airports: #b3ddc0
 * - Main Waterways: #78b6e4
 * - Road Titles: #231f20
 * - Waterway Titles: #0072bc
 * - Other Roads: #939598
 */

/**
 * Dolph Map Company Color Palette
 */
const DOLPH_COLORS = {
    // Text/Labels
    cityTitles: '#ed1c24',
    roadTitles: '#000000',       // Black for road text
    waterwayTitles: '#0072bc',

    // Water Features
    ocean: '#add3f0',
    mainWaterways: '#78b6e4',

    // Roads
    interstates: '#cd292c',
    highways: '#cd292c',
    mainRoads: '#cd292c',        // Primary/main roads should be RED
    otherRoads: '#d3d3d3',       // Light grey for minor roads

    // Background/Land
    background: '#fffef0',       // Very light yellow background (lighter)
    backgroundAlt: '#ffffff',    // White alternative

    // Land Use
    golfCourses: '#b3ddc0',
    parks: '#b3ddc0',
    airports: '#b3ddc0',

    // Cities/Places
    city1: '#fffcd5',
    city2: '#ffffff',
    city3: '#4f4f4f',

    // Boundaries
    zipCodes: '#5da9dd',
    countyLines: '#4a4a4a'       // Dark grey for county boundaries
};

/**
 * Apply Dolph Map Company styling to the map
 *
 * This function should be called after the map has loaded.
 * It modifies the paint properties of various map layers.
 *
 * @param {mapboxgl.Map} map - The Mapbox map instance
 */
function applyDolphStyle(map) {
    console.log('Applying Dolph Map Company styling...');

    // Wait for the style to load completely
    if (!map.isStyleLoaded()) {
        map.once('style.load', function() {
            applyDolphStyle(map);
        });
        return;
    }

    try {
        const layers = map.getStyle().layers;

        // ========================================
        // WATER FEATURES (Colors only)
        // ========================================
        if (map.getLayer('water')) {
            map.setPaintProperty('water', 'fill-color', DOLPH_COLORS.ocean);
        }

        if (map.getLayer('waterway')) {
            map.setPaintProperty('waterway', 'line-color', DOLPH_COLORS.mainWaterways);
        }

        // Waterway label color + uppercase
        if (map.getLayer('waterway-label')) {
            map.setPaintProperty('waterway-label', 'text-color', DOLPH_COLORS.waterwayTitles);
            map.setLayoutProperty('waterway-label', 'text-transform', 'uppercase');
        }

        // ========================================
        // BACKGROUND / LAND (Colors only)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.id.includes('background') || layer.id === 'land') {
                try {
                    if (layer.type === 'background') {
                        map.setPaintProperty(layer.id, 'background-color', DOLPH_COLORS.background);
                    } else if (layer.type === 'fill') {
                        map.setPaintProperty(layer.id, 'fill-color', DOLPH_COLORS.background);
                    }
                } catch (e) {
                    // Skip if can't style
                }
            }
        });

        // ========================================
        // ROADS (Colors + slightly thinner)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.type !== 'line') return;
            if (!layer.id.includes('road') &&
                !layer.id.includes('motorway') &&
                !layer.id.includes('trunk') &&
                !layer.id.includes('primary') &&
                !layer.id.includes('secondary') &&
                !layer.id.includes('tertiary') &&
                !layer.id.includes('street')) return;

            try {
                // Highways/Interstates - Red
                if (layer.id.includes('motorway') || layer.id.includes('trunk')) {
                    map.setPaintProperty(layer.id, 'line-color', DOLPH_COLORS.interstates);
                }
                // Primary roads - Red
                else if (layer.id.includes('primary')) {
                    map.setPaintProperty(layer.id, 'line-color', DOLPH_COLORS.mainRoads);
                }
                // Secondary/minor roads - Light grey
                else if (layer.id.includes('secondary') ||
                         layer.id.includes('tertiary') ||
                         layer.id.includes('street')) {
                    map.setPaintProperty(layer.id, 'line-color', DOLPH_COLORS.otherRoads);
                }

                // Make roads slightly thinner (80% of original width)
                const currentWidth = map.getPaintProperty(layer.id, 'line-width');
                if (typeof currentWidth === 'number' && currentWidth > 0) {
                    map.setPaintProperty(layer.id, 'line-width', currentWidth * 0.8);
                }
            } catch (e) {
                // Skip if can't style
            }
        });

        // ========================================
        // ROAD LABELS (Color + uppercase)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.id.includes('road') && layer.id.includes('label') && layer.type === 'symbol') {
                try {
                    map.setPaintProperty(layer.id, 'text-color', DOLPH_COLORS.roadTitles);
                    map.setLayoutProperty(layer.id, 'text-transform', 'uppercase');
                } catch (e) {
                    // Skip if can't style
                }
            }
        });

        // ========================================
        // PARKS, GOLF COURSES, AIRPORTS (Colors only)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.type !== 'fill') return;

            try {
                if (layer.id.includes('park') || layer.id.includes('pitch')) {
                    map.setPaintProperty(layer.id, 'fill-color', DOLPH_COLORS.parks);
                }
                if (layer.id.includes('golf')) {
                    map.setPaintProperty(layer.id, 'fill-color', DOLPH_COLORS.golfCourses);
                }
                if (layer.id.includes('airport') || layer.id.includes('aeroway')) {
                    map.setPaintProperty(layer.id, 'fill-color', DOLPH_COLORS.airports);
                }
            } catch (e) {
                // Skip if can't style
            }
        });

        // ========================================
        // PLACE LABELS - Cities, Towns (Color + Bold + Uppercase)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.type !== 'symbol') return;

            if (layer.id.includes('place') ||
                layer.id.includes('settlement') ||
                layer.id.includes('city') ||
                layer.id.includes('town') ||
                layer.id.includes('village')) {
                try {
                    map.setPaintProperty(layer.id, 'text-color', DOLPH_COLORS.cityTitles);
                    map.setLayoutProperty(layer.id, 'text-transform', 'uppercase');
                    map.setLayoutProperty(layer.id, 'text-font', ['DIN Pro Bold', 'Arial Unicode MS Bold']);
                } catch (e) {
                    // Skip if can't style
                }
            }
        });

        // ========================================
        // BOUNDARIES (Colors only)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.type !== 'line') return;

            if (layer.id.includes('admin') && layer.id.includes('2')) {
                try {
                    map.setPaintProperty(layer.id, 'line-color', DOLPH_COLORS.countyLines);
                } catch (e) {
                    // Skip if can't style
                }
            }
        });

        // ========================================
        // ALL OTHER LABELS (Uppercase)
        // ========================================
        layers.forEach(function(layer) {
            if (layer.type !== 'symbol') return;

            // Skip layers we've already styled
            if (layer.id.includes('place') ||
                layer.id.includes('settlement') ||
                layer.id.includes('city') ||
                layer.id.includes('town') ||
                layer.id.includes('village') ||
                layer.id.includes('road') ||
                layer.id.includes('waterway')) return;

            try {
                map.setLayoutProperty(layer.id, 'text-transform', 'uppercase');
            } catch (e) {
                // Skip if can't style
            }
        });

        console.log('Dolph Map Company styling applied successfully');

    } catch (error) {
        console.error('Error applying Dolph styling:', error);
    }
}

/**
 * Debug function to list all available map layers
 *
 * Call this in the browser console to see what layers are available:
 * listMapLayers(map)
 *
 * @param {mapboxgl.Map} map - The Mapbox map instance
 */
function listMapLayers(map) {
    if (!map || !map.getStyle()) {
        console.error('Map not initialized or style not loaded');
        return;
    }

    const layers = map.getStyle().layers;
    console.log('Available map layers:');
    console.log('====================');

    layers.forEach(function(layer) {
        console.log(layer.id + ' (' + layer.type + ')');
    });

    return layers;
}

/**
 * Export functions for use in other files
 */
if (typeof window !== 'undefined') {
    window.applyDolphStyle = applyDolphStyle;
    window.listMapLayers = listMapLayers;
    window.DOLPH_COLORS = DOLPH_COLORS;
}

console.log('Dolph Map Company styling module loaded');
