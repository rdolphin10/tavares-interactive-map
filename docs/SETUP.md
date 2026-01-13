# Setup Instructions

This guide will help you set up the Interactive Map Project for the first time.

## Prerequisites

### Required
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Sublime Text, Notepad++, or similar)
- A Mapbox account (free tier is sufficient)

### Optional (for deployment)
- Web hosting or a web server
- FTP client for file uploads

## Initial Setup

### Step 1: Get a Mapbox Access Token

The map requires a Mapbox API token to function. Follow these steps:

1. **Create a Mapbox account**
   - Go to https://account.mapbox.com/auth/signup/
   - Sign up for a free account (no credit card required)

2. **Get your access token**
   - After signing in, go to https://account.mapbox.com/access-tokens/
   - Copy your "Default public token"
   - Or click "Create a token" to make a new one

3. **Add token to config**
   - Open `js/config.js` in your text editor
   - Find the line: `accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN_HERE'`
   - Replace `YOUR_MAPBOX_ACCESS_TOKEN_HERE` with your actual token
   - Save the file

   Example:
   ```javascript
   accessToken: 'pk.eyJ1IjoieW91cm5hbWUiLCJhIjoiY2x4eHh4eHh4In0.xxxxxxxxxxxxxxx'
   ```

### Step 2: Test Locally

You can test the map by simply opening the HTML file in a browser:

#### Method 1: Direct Open (Simple)
1. Navigate to the project folder
2. Double-click `index.html`
3. It should open in your default browser

**Note:** Some browsers may restrict loading local files (CSV). If the map loads but shows no markers, use Method 2.

#### Method 2: Local Web Server (Recommended)

**Option A: Using Python (if installed)**
```bash
# Navigate to project folder
cd /path/to/InteractiveMapProject

# Python 3
python -m http.server 8000

# Then open in browser: http://localhost:8000
```

**Option B: Using Node.js (if installed)**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to project folder and run
cd /path/to/InteractiveMapProject
http-server -p 8000

# Then open in browser: http://localhost:8000
```

**Option C: Using VS Code**
- Install the "Live Server" extension in VS Code
- Right-click on `index.html`
- Select "Open with Live Server"

### Step 3: Verify Everything Works

After opening the map, check the following:

#### Visual Check
- [ ] Map displays and is interactive (can zoom/pan)
- [ ] Client name appears at the top
- [ ] Two banners are visible
- [ ] Search bar is visible
- [ ] Map markers/pins appear on the map

#### Functionality Check
- [ ] Click a marker - popup should appear
- [ ] Type in search bar - markers should filter
- [ ] Click X in search bar - all markers reappear
- [ ] Click banners - they should open links
- [ ] Zoom and pan controls work

#### Console Check
1. Open browser Developer Tools (press F12)
2. Click the "Console" tab
3. You should see:
   - "Configuration loaded successfully"
   - "Utilities loaded successfully"
   - "Map module loaded successfully"
   - "Markers module loaded successfully"
   - "Search module loaded successfully"
   - "Map instance created"
   - "Map loaded successfully"
   - "Loaded X advertisers from CSV"

4. You should NOT see any red error messages

### Step 4: Customize for Your First Client

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed instructions on:
- Changing the map center and zoom
- Updating colors to match client branding
- Adding client logo and banners
- Importing client advertiser data

## Deployment

### Deploying to a Web Server

The project is ready to deploy as-is. Simply upload all files to your web server.

#### Upload These Files/Folders:
```
index.html
css/
js/
data/
assets/
```

#### You DON'T need to upload:
```
docs/           (documentation)
examples/       (example configurations)
README.md       (project info)
```

### Deployment Methods

#### Method 1: FTP/SFTP Upload
1. Connect to your web server via FTP client (FileZilla, Cyberduck, etc.)
2. Navigate to your web root (usually `public_html` or `www`)
3. Upload all project files
4. Test by visiting your domain

#### Method 2: cPanel File Manager
1. Log into cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload all project files (can upload as ZIP and extract)
5. Test by visiting your domain

#### Method 3: Web Hosting Platforms

**Netlify (Free):**
1. Sign up at https://www.netlify.com
2. Drag and drop your project folder
3. Get an instant live URL

**GitHub Pages (Free):**
1. Create a GitHub repository
2. Upload files
3. Enable GitHub Pages in settings
4. Access at `https://username.github.io/repository-name`

**Vercel (Free):**
1. Sign up at https://vercel.com
2. Import your project
3. Get instant deployment

## Troubleshooting

### Map doesn't appear
**Problem:** Blank space where map should be

**Solutions:**
1. Check browser console for errors (F12)
2. Verify Mapbox token is correct in `js/config.js`
3. Check internet connection (map tiles load from internet)
4. Verify `js/config.js` doesn't have syntax errors

### Markers don't appear
**Problem:** Map loads but no location pins

**Solutions:**
1. Check browser console for CSV loading errors
2. Verify `data/advertisers.csv` file exists
3. Check CSV has required columns: name, latitude, longitude
4. Verify coordinates are valid numbers
5. Make sure you're using a local server (not file://)

### Search doesn't work
**Problem:** Typing in search bar has no effect

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify markers loaded successfully first
3. Check `CONFIG.search.enabled` is `true` in `js/config.js`
4. Verify search fields match CSV column names

### Banners don't appear
**Problem:** Banner images missing or broken

**Solutions:**
1. Verify image files exist in `assets/images/`
2. Check image paths in `js/config.js` are correct
3. Check image file names match exactly (case-sensitive)
4. Verify images are valid format (JPG, PNG)

### Page looks broken on mobile
**Problem:** Layout issues on phones/tablets

**Solutions:**
1. Make sure viewport meta tag exists in `index.html`
2. Test with browser dev tools mobile emulation
3. Check `css/styles.css` responsive styles
4. Clear browser cache and reload

### CORS errors in console
**Problem:** "CORS policy" errors when loading CSV

**Solution:**
- Use a local web server (see Method 2 in Testing section)
- File:// protocol often blocks loading local files
- Once deployed to a real server, this won't be an issue

### Map is wrong location
**Problem:** Map centers on wrong area

**Solution:**
- Update `CONFIG.mapbox.center` in `js/config.js`
- Format: `[longitude, latitude]` (note: longitude first!)
- Use https://www.latlong.net/ to find coordinates

### Performance is slow
**Problem:** Map loads slowly or lags

**Solutions:**
1. Check number of markers (100+ can slow down)
2. Enable clustering: `CONFIG.markers.clusterEnabled = true`
3. Optimize image sizes (compress banners/logo)
4. Check internet connection speed
5. Consider using a simpler Mapbox style

## Getting Help

### Check the Documentation
1. **CUSTOMIZATION.md** - Step-by-step customization guide
2. **CLAUDE.md** - Coding guidelines and best practices
3. **README.md** - Project overview

### Browser Console
- Always check the console (F12) for error messages
- Errors will show in red with descriptions
- Success messages confirm each module loads

### Test with Example Data
- The included `data/advertisers.csv` has working sample data
- If your data doesn't work, compare format with the sample

### Common Fixes
1. **Clear browser cache** - Ctrl+F5 or Cmd+Shift+R
2. **Check file paths** - Make sure case matches exactly
3. **Validate JSON** - Use jsonlint.com for config objects
4. **Test in different browser** - Rule out browser-specific issues

## Next Steps

Once setup is complete:

1. ✅ **Customize for your client** - See CUSTOMIZATION.md
2. ✅ **Add client data** - Update CSV with real advertisers
3. ✅ **Match print map styling** - Adjust colors in theme.css
4. ✅ **Add client assets** - Logo and banner images
5. ✅ **Test thoroughly** - All features on desktop and mobile
6. ✅ **Deploy to web** - Upload to client's website

## System Requirements

### Minimum Requirements
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen:** 320px width minimum (mobile)
- **Connection:** Stable internet (map tiles download as needed)

### Recommended
- **Browser:** Latest version of Chrome, Firefox, Safari, or Edge
- **Screen:** 1024px+ for best desktop experience
- **Connection:** Broadband for fast tile loading

## Support

### Mapbox Support
- Documentation: https://docs.mapbox.com/
- Support: https://support.mapbox.com/
- Pricing: https://www.mapbox.com/pricing/

### Free Tier Limits
- Mapbox free tier includes:
  - 50,000 map loads per month
  - Plenty for most chamber of commerce sites
  - No credit card required

---

**Congratulations!** You're now ready to create interactive maps for your clients. Refer to CUSTOMIZATION.md for client-specific setup instructions.
