# Client Customization Guide

This guide provides step-by-step instructions for customizing the Interactive Map for a new chamber of commerce client.

## Overview

Customizing for a new client involves updating just 3-4 main files:
1. **js/config.js** - Map settings, client info, banners
2. **css/theme.css** - Colors and fonts to match print map
3. **data/advertisers.csv** - Client's advertiser data
4. **assets/images/** - Logo and banner images

Most customization takes 20-30 minutes once you have the client's materials ready.

## Before You Start

### Gather Client Materials

Collect the following from your client:

- [ ] Chamber of Commerce name
- [ ] Logo file (PNG or JPG, preferably 200px wide)
- [ ] Print map (PDF or image for color reference)
- [ ] 2 sponsor banner images (728x90px or similar)
- [ ] Banner URLs (where each banner should link)
- [ ] Advertiser list with:
  - Business names
  - Addresses
  - Phone numbers
  - Websites (optional)
  - Descriptions (optional)

### Find the Map Center

1. Go to https://www.latlong.net/
2. Search for the client's city or main area
3. Note the coordinates (you'll need both latitude and longitude)
4. Example: Springfield, IL = Latitude: 39.7817, Longitude: -89.6501

### Get Print Map Colors

If the client has a print map:
1. Open the print map in an image viewer
2. Use a color picker tool to get hex color codes
3. Note the primary brand color (main color used throughout)
4. Note any secondary colors

**Online color picker:** https://imagecolorpicker.com/

## Step-by-Step Customization

### Step 1: Create Client Project Copy

1. **Make a copy of the project folder**
   ```
   Copy: InteractiveMapProject
   Paste as: ClientName-InteractiveMap
   ```
   Example: `SpringfieldChamber-InteractiveMap`

2. **Rename the folder** to identify the client

3. **This is now your client-specific version**
   - Keep the original as a template
   - Make all changes in the client copy

### Step 2: Update js/config.js

Open `js/config.js` in your text editor and update these sections:

#### A. Map Settings

**Find this section:**
```javascript
mapbox: {
    accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN_HERE',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-98.5795, 39.8283],
    zoom: 12,
    // ...
}
```

**Update:**
1. **accessToken:** Use your Mapbox token (get from https://account.mapbox.com/access-tokens/)
2. **center:** Change to client's coordinates `[longitude, latitude]`
   - ⚠️ NOTE: Longitude comes FIRST, then latitude
   - Example: Springfield, IL = `[-89.6501, 39.7817]`
3. **zoom:** Adjust zoom level
   - City view: 11-13
   - Neighborhood: 14-15
   - Adjust based on how many locations client has

#### B. Client Information

**Find this section:**
```javascript
client: {
    name: 'Chamber of Commerce Interactive Map',
    logoPath: 'assets/images/logo.png',
    logoAlt: 'Chamber of Commerce Logo'
}
```

**Update:**
1. **name:** Replace with client's chamber name
   - Example: `'Springfield Chamber of Commerce'`
2. **logoPath:** Keep as is (you'll replace the image file)
3. **logoAlt:** Update for accessibility
   - Example: `'Springfield Chamber Logo'`

#### C. Banners

**Find this section:**
```javascript
banners: [
    {
        image: 'assets/images/banner1.jpg',
        link: 'https://example.com/sponsor1',
        alt: 'Sponsor 1'
    },
    {
        image: 'assets/images/banner2.jpg',
        link: 'https://example.com/sponsor2',
        alt: 'Sponsor 2'
    }
]
```

**Update:**
1. **image:** Keep the paths as is (you'll replace the files)
2. **link:** Change to where each banner should link
   - Must be full URL: `https://example.com`
   - Use `#` if banner shouldn't link anywhere
3. **alt:** Update with sponsor names
   - Example: `'Smith Hardware Store'`

#### D. Marker Color (Optional)

**Find this section:**
```javascript
markers: {
    defaultColor: '#FF0000',  // Red
    // ...
}
```

**Update:**
- Change to match client's brand color
- Use hex color code (with # symbol)
- Example: `'#0066cc'` for blue

**Save config.js**

### Step 3: Update css/theme.css

Open `css/theme.css` and update the color variables to match the client's print map.

#### Find the :root section at the top:

```css
:root {
    /* PRIMARY COLORS */
    --color-primary: #0066cc;
    --color-primary-dark: #004999;
    --color-secondary: #ff6600;
    /* etc... */
}
```

#### Update Colors:

1. **--color-primary:** Client's main brand color
   - This is the most important color to get right
   - Used for accents, buttons, links
   - Get from print map or brand guidelines

2. **--color-primary-dark:** Darker version of primary
   - Used for hover states
   - Tip: Use a color picker to darken primary by ~20%

3. **--color-secondary:** Client's secondary color (if any)
   - Accent color
   - Can leave as-is if client doesn't have one

4. **Optional: Update other colors**
   - Text colors (usually fine as-is)
   - Background colors (usually fine as-is)
   - Only change if client has specific requirements

#### Example Color Schemes:

**Blue theme:**
```css
--color-primary: #0066cc;
--color-primary-dark: #004999;
```

**Green theme:**
```css
--color-primary: #2d8659;
--color-primary-dark: #1e5c3c;
```

**Red theme:**
```css
--color-primary: #c41e3a;
--color-primary-dark: #8b1529;
```

**Save theme.css**

### Step 4: Add Client Images

#### A. Logo

1. **Prepare logo file:**
   - Recommended size: 200px width (height auto)
   - Format: PNG (with transparency) or JPG
   - File name: `logo.png` or `logo.jpg`

2. **Replace the logo:**
   - Navigate to `assets/images/`
   - Delete placeholder `logo.png`
   - Add client's logo as `logo.png`

3. **If using different file name/extension:**
   - Update `logoPath` in `js/config.js`
   - Example: `'assets/images/chamber-logo.jpg'`

#### B. Banners

1. **Prepare banner files:**
   - Recommended size: 728x90px (leaderboard) or 468x60px
   - Format: JPG or PNG
   - File names: `banner1.jpg` and `banner2.jpg`

2. **Replace the banners:**
   - Navigate to `assets/images/`
   - Delete placeholder banner files
   - Add client banners as `banner1.jpg` and `banner2.jpg`

3. **If using different file names:**
   - Update paths in `js/config.js` banners section

### Step 5: Import Advertiser Data

#### A. Prepare the Data

You can prepare data in Excel or Google Sheets.

**Required columns:**
- `name` - Business name
- `latitude` - Decimal latitude
- `longitude` - Decimal longitude

**Optional columns:**
- `address` - Street address
- `city` - City name
- `state` - State abbreviation
- `zip` - ZIP code
- `phone` - Phone number
- `website` - Website URL (include https://)
- `email` - Email address
- `category` - Business category (Restaurant, Retail, etc.)
- `description` - Brief description

#### B. Get Coordinates

For each address, you need latitude and longitude:

**Method 1: Batch Geocoding (Recommended for many addresses)**
- Use a free service like https://www.latlong.net/convert-address-to-lat-long.html
- Or Google Sheets geocoding add-ons

**Method 2: Manual Lookup**
1. Go to https://www.latlong.net/
2. Enter the business address
3. Copy latitude and longitude
4. Paste into your spreadsheet

**Method 3: Google Maps**
1. Find business on Google Maps
2. Right-click on the marker
3. Click the coordinates at the top to copy
4. First number = latitude, second = longitude

#### C. Format the CSV

**Important formatting rules:**
1. **Column names must match exactly**
   - Use lowercase: `name`, `latitude`, `longitude`
   - Not: `Name`, `Lat`, `Long`

2. **Wrap text containing commas in quotes**
   - Example: `"Joe's Coffee, Inc."`

3. **Coordinates must be decimal format**
   - Good: `39.7817`
   - Bad: `39° 46' 54" N` (degrees/minutes/seconds)

4. **Include full URLs for websites**
   - Good: `https://example.com`
   - Bad: `example.com`

**Example row:**
```csv
name,address,city,state,zip,phone,website,email,category,description,latitude,longitude
"Joe's Coffee","123 Main St","Springfield","IL","62701","(217) 555-1234","https://joescoffee.com","joe@coffee.com","Restaurant","Best coffee in town",39.7817,-89.6501
```

#### D. Export and Replace CSV

1. **Export from Excel/Google Sheets:**
   - File > Save As > CSV (Comma delimited)
   - File name: `advertisers.csv`

2. **Replace the file:**
   - Navigate to `data/` folder
   - Delete old `advertisers.csv`
   - Add your new `advertisers.csv`

### Step 6: Test Everything

Open `index.html` in a web browser and complete this checklist:

#### Visual Check
- [ ] Map appears and shows correct area
- [ ] Client name displays at top
- [ ] Logo appears
- [ ] Both banners appear
- [ ] Search bar appears
- [ ] All marker pins appear on map

#### Interaction Check
- [ ] Map can be zoomed in/out
- [ ] Map can be panned (dragged)
- [ ] Click a marker → popup appears
- [ ] Popup shows correct information
- [ ] Website links in popups work
- [ ] Banner images are clickable
- [ ] Banners link to correct URLs

#### Search Check
- [ ] Type business name → marker filters
- [ ] Type category → related markers show
- [ ] Clear search (X button) → all markers return
- [ ] Search is case-insensitive (works with lowercase)

#### Mobile Check
- [ ] Open on phone or use browser mobile emulation (F12 > Device toolbar)
- [ ] All elements visible on mobile
- [ ] Map is usable (zoom, pan work)
- [ ] Search works on mobile

#### Console Check
1. Open browser console (F12)
2. Look for errors (red text)
3. Should see success messages:
   - "Configuration loaded successfully"
   - "Map loaded successfully"
   - "Loaded X advertisers from CSV"

#### Colors Check
- [ ] Primary color matches client's print map
- [ ] Colors are readable (good contrast)
- [ ] Hover states work (banners, links)

### Step 7: Final Adjustments

Based on testing, you may need to adjust:

#### Map View
**Too zoomed in/out?**
- Edit `js/config.js`
- Change `zoom` value (11-15 typical range)

**Wrong center?**
- Edit `js/config.js`
- Update `center` coordinates

#### Colors Don't Match
- Edit `css/theme.css`
- Adjust `--color-primary` and related colors
- Reload page to see changes

#### Marker Color
- Edit `js/config.js`
- Change `markers.defaultColor`

#### Search Not Finding Businesses
- Edit `js/config.js`
- Check `search.fields` array
- Make sure field names match CSV columns

### Step 8: Client Review

1. **Create a test URL or share local copy**
   - Can use Netlify Drop for instant test URL
   - Or send to client's IT for temporary hosting

2. **Have client review:**
   - All business information is accurate
   - Colors match their brand
   - All links work correctly
   - Test on their devices

3. **Make any requested adjustments**

4. **Get final approval**

## Deployment

Once approved, deploy to client's website:

1. **Prepare files for upload:**
   - Include: index.html, css/, js/, data/, assets/
   - Exclude: docs/, examples/, README.md

2. **Upload via FTP or hosting platform**

3. **Test on live site**

4. **Show client the live URL**

## Creating Additional Deployments

### Same Client, Different Regions

If a client needs multiple maps for different regions:

1. Copy the customized client folder
2. Update map center in config.js
3. Replace CSV with region-specific data
4. Everything else stays the same

### Same Chamber, Annual Updates

For yearly updates to existing maps:

1. Replace `data/advertisers.csv` with new data
2. Update banner images if sponsors changed
3. Test and deploy
4. Usually takes < 10 minutes

## Customization Checklist

Use this checklist for each new client:

- [ ] **Project Setup**
  - [ ] Copy project folder
  - [ ] Rename to client name

- [ ] **Config (js/config.js)**
  - [ ] Add Mapbox access token
  - [ ] Update map center coordinates
  - [ ] Set appropriate zoom level
  - [ ] Update client name
  - [ ] Update banner URLs
  - [ ] Set marker color (optional)

- [ ] **Colors (css/theme.css)**
  - [ ] Update primary color
  - [ ] Update primary-dark color
  - [ ] Update secondary color (if needed)

- [ ] **Assets**
  - [ ] Replace logo.png
  - [ ] Replace banner1.jpg
  - [ ] Replace banner2.jpg

- [ ] **Data**
  - [ ] Create advertiser CSV with required columns
  - [ ] Get coordinates for all locations
  - [ ] Format correctly
  - [ ] Replace advertisers.csv

- [ ] **Testing**
  - [ ] Test in browser
  - [ ] Test all interactions
  - [ ] Test search
  - [ ] Test on mobile
  - [ ] Check browser console

- [ ] **Deployment**
  - [ ] Get client approval
  - [ ] Upload to web server
  - [ ] Test live site
  - [ ] Deliver to client

## Tips and Best Practices

### Time Savers
- **Keep a customization spreadsheet** with client settings
- **Create standard banner sizes** (ask clients to provide specific sizes)
- **Use the examples/ folder** to save successful configurations
- **Keep print maps for reference** for future updates

### Common Mistakes to Avoid
- ❌ Forgetting longitude comes before latitude in coordinates
- ❌ Not using https:// in website URLs
- ❌ Using wrong CSV column names
- ❌ Forgetting to update Mapbox token for new projects
- ❌ Not testing on mobile devices
- ❌ Uploading docs/ folder to live site (not needed)

### Quality Checks
- ✅ Zoom level shows all locations without being too far out
- ✅ Colors have good contrast (readable on all screens)
- ✅ All business information is accurate and up-to-date
- ✅ Phone numbers and links work
- ✅ Logo is clear and not pixelated
- ✅ Banners are appropriate size and clear

## Getting Help

If you encounter issues during customization:

1. **Check SETUP.md** - Troubleshooting section
2. **Check browser console** - Shows specific errors
3. **Compare with examples/** - Reference working configurations
4. **Review CLAUDE.md** - Coding guidelines
5. **Test with sample data** - Rule out data issues

---

**You're ready to customize!** Follow these steps for each client and you'll have a professional interactive map in under 30 minutes.
