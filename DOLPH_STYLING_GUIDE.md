# Dolph Map Company Styling Guide

This document explains the custom Dolph Map Company styling that has been applied to your interactive map.

## What Was Implemented

The Dolph Map Company custom color scheme has been applied to your Mapbox map with the following colors:

### Color Palette

| Map Feature | Hex Color | Example |
|-------------|-----------|---------|
| City Titles | `#ed1c24` | Red text for city names |
| Ocean/Water Bodies | `#add3f0` | Light blue water |
| Interstates/Highways | `#cd292c` | Red roads |
| Main Waterways | `#78b6e4` | Medium blue rivers |
| Waterway Titles | `#0072bc` | Dark blue text |
| Road Titles | `#231f20` | Dark gray/black text |
| Other Roads | `#939598` | Gray roads |
| Golf Courses/Parks/Airports | `#b3ddc0` | Light green areas |
| Zip Code Boundaries | `#5da9dd` | Blue boundary lines |
| Cities (varied) | `#fffcd5`, `#ffffff`, `#4f4f4f` | Cream, white, dark gray |

## Files Modified/Created

### 1. **js/dolph-style.js** (NEW)
This is the main styling file that contains:
- The `DOLPH_COLORS` object with all custom colors
- The `applyDolphStyle()` function that applies colors to map layers
- A debug function `listMapLayers()` to inspect available layers

### 2. **index.html** (MODIFIED)
Added the dolph-style.js script to load before map.js:
```html
<script src="js/dolph-style.js"></script>
```

### 3. **js/map.js** (MODIFIED)
Added a call to `applyDolphStyle()` after the map loads:
```javascript
map.on('load', function() {
    if (typeof applyDolphStyle === 'function') {
        applyDolphStyle(map);
    }
    onMapLoaded();
});
```

## How It Works

1. The map loads with the standard Mapbox Streets style
2. Once the map is fully loaded, the `applyDolphStyle()` function runs
3. The function modifies the paint properties of various map layers
4. Each layer (roads, water, parks, etc.) gets updated with Dolph colors

## Testing the Map

To test the styled map:

1. **Open the map in your browser:**
   - Open `index.html` in a web browser
   - Wait for the map to fully load

2. **Check the styling:**
   - Water should be light blue (#add3f0)
   - Highways should be red (#cd292c)
   - Parks should be light green (#b3ddc0)
   - City names should be red (#ed1c24)
   - Other roads should be gray (#939598)

3. **Open browser console (F12) to check for errors:**
   ```
   Look for:
   - "Dolph Map Company styling applied successfully"
   - Any error messages about missing layers
   ```

## Customization & Fine-Tuning

### Adjusting Colors

To change any color, edit the `DOLPH_COLORS` object in `js/dolph-style.js`:

```javascript
const DOLPH_COLORS = {
    cityTitles: '#ed1c24',  // Change this value
    ocean: '#add3f0',       // Change this value
    // ... etc
};
```

### Debugging Layer Names

If some styling isn't working, the layer names in the Mapbox style might be different. To see all available layers:

1. Open your map in a browser
2. Open the browser console (F12)
3. Run this command:
   ```javascript
   listMapLayers(map)
   ```
4. This will print all available layer names

### Adding More Layer Customization

To style additional layers, add them to the `applyDolphStyle()` function in `js/dolph-style.js`:

```javascript
// Example: Style building footprints
if (map.getLayer('building')) {
    map.setPaintProperty('building', 'fill-color', '#your-color-here');
}
```

## Alternative Approach: Mapbox Studio (Recommended for Production)

For better performance and more control, you can create a custom style in Mapbox Studio:

### Steps:

1. **Go to Mapbox Studio:**
   - Visit: https://studio.mapbox.com/
   - Log in with your Mapbox account

2. **Create a new style:**
   - Click "New style"
   - Choose "Streets" as your template
   - Click "Customize Streets"

3. **Apply Dolph colors manually:**
   - Use the layer panel to find each layer (water, roads, etc.)
   - Click on the layer to edit its properties
   - Change the color values to match the Dolph palette

4. **Publish the style:**
   - Click "Publish" in the top-right
   - Copy your style URL (looks like: `mapbox://styles/username/style-id`)

5. **Update your config:**
   - Open `js/config.js`
   - Change the `style` property:
     ```javascript
     style: 'mapbox://styles/YOUR_USERNAME/YOUR_STYLE_ID',
     ```

6. **Remove programmatic styling (optional):**
   - If you use a custom Mapbox Studio style, you can remove the `applyDolphStyle()` call from `js/map.js` for better performance

### Benefits of Mapbox Studio Approach:
- Better performance (no runtime style modifications)
- More control over every aspect of the map
- Easier to preview changes before publishing
- Can be shared across multiple projects

## Troubleshooting

### Colors aren't applying
- Check browser console for errors
- Verify that `dolph-style.js` is loaded before `map.js`
- Run `listMapLayers(map)` to check available layer names
- Some layers might have different names in newer Mapbox styles

### Some features are the wrong color
- The layer names might be different in your Mapbox style version
- Use `listMapLayers(map)` to find the correct layer name
- Update the layer name in the `applyDolphStyle()` function

### Performance issues
- Consider creating a custom style in Mapbox Studio instead
- Programmatic styling works well but adds a small delay on load

## Support

If you need to adjust the styling further:
1. Edit colors in `js/dolph-style.js` in the `DOLPH_COLORS` object
2. Add new layer styling in the `applyDolphStyle()` function
3. Test by refreshing your browser and checking the console

For more information about Mapbox styling:
- Mapbox Style Specification: https://docs.mapbox.com/mapbox-gl-js/style-spec/
- Mapbox Studio: https://studio.mapbox.com/
