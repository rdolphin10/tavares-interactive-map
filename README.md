# Interactive Map Project

A simple, customizable interactive map solution for chambers of commerce and similar organizations. Built with Mapbox GL JS and vanilla JavaScript - no build tools or complex frameworks required.

## Overview

This project provides a ready-to-deploy interactive map that displays business locations with popups, search functionality, and customizable branding. It's designed to be easily customized for different clients by updating simple configuration files.

### Key Features

- **Interactive Map** - Pan, zoom, and explore using Mapbox
- **Business Markers** - Location pins for all chamber advertisers
- **Information Popups** - Click markers to see business details with optional graphics
- **Business Card Graphics** - Display custom images in popups that scale automatically
- **Search Functionality** - Find businesses by name, category, or address
- **Sponsor Banners** - Two clickable banner spaces at the top
- **Mobile Responsive** - Works on all devices
- **Easy Customization** - Update 3-4 files to rebrand for each client
- **No Build Tools** - Just HTML, CSS, and JavaScript files

### Perfect For

- Chambers of Commerce
- Tourism boards
- Shopping districts
- Business associations
- Local event guides
- Any organization with member/advertiser locations

## Quick Start

### 1. Get a Mapbox Token

1. Sign up for free at https://account.mapbox.com/auth/signup/
2. Get your access token from https://account.mapbox.com/access-tokens/
3. Add token to `js/config.js`

### 2. Test Locally

Simply open `index.html` in a web browser. For full functionality (CSV loading), use a local web server:

```bash
# Using Python
python -m http.server 8000

# Then open http://localhost:8000
```

### 3. Customize for Your Client

Update these files:
- `js/config.js` - Map center, client name, banners
- `css/theme.css` - Colors to match client branding
- `data/advertisers.csv` - Client's business data
- `assets/images/` - Logo and banner images

See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for detailed instructions.

## Technology Stack

- **Mapbox GL JS** - Interactive mapping
- **PapaParse** - CSV file parsing
- **Vanilla JavaScript** - No frameworks
- **CSS3** - Modern styling with variables
- **HTML5** - Semantic markup

## Project Structure

```
InteractiveMapProject/
├── index.html              # Main entry point
├── css/
│   ├── styles.css          # Core layout (rarely changes)
│   └── theme.css           # Client colors/fonts (customize per client)
├── js/
│   ├── config.js           # Client configuration (customize per client)
│   ├── map.js              # Map initialization
│   ├── markers.js          # Marker management
│   ├── search.js           # Search functionality
│   └── utils.js            # Helper functions
├── data/
│   └── advertisers.csv     # Business data (replace per client)
├── assets/
│   └── images/             # Logo and banners (replace per client)
├── docs/
│   ├── CLAUDE.md           # Coding guidelines
│   ├── SETUP.md            # Setup instructions
│   └── CUSTOMIZATION.md    # Customization guide
└── examples/               # Example configurations
```

## Documentation

Comprehensive documentation is included in the `docs/` folder:

- **[SETUP.md](docs/SETUP.md)** - Initial setup and troubleshooting
- **[CUSTOMIZATION.md](docs/CUSTOMIZATION.md)** - Step-by-step client customization
- **[CLAUDE.md](docs/CLAUDE.md)** - Coding guidelines and best practices

## Customization Workflow

For each new client:

1. **Copy project folder** → Rename for client
2. **Update config.js** → Map location, client name, API token (5 mins)
3. **Update theme.css** → Brand colors (2 mins)
4. **Replace images** → Logo and banners (2 mins)
5. **Import data** → Create and upload CSV (15 mins)
6. **Test** → Verify everything works (5 mins)
7. **Deploy** → Upload to web server (5 mins)

**Total time: ~30 minutes per client**

## CSV Data Format

The advertiser data CSV requires these columns:

**Required:**
- `name` - Business name
- `latitude` - Decimal latitude
- `longitude` - Decimal longitude

**Optional:**
- `address`, `city`, `state`, `zip`
- `phone`, `email`, `website`
- `category`, `description`
- `business_card` - Path to business card image (see Business Graphics section below)

Example:
```csv
name,address,city,state,zip,phone,website,category,description,business_card,latitude,longitude
"Joe's Coffee","123 Main St","Springfield","IL","62701","555-1234","https://joescoffee.com","Restaurant","Best coffee in town","assets/images/business-cards/joes-coffee.jpg",39.7817,-89.6501
```

### Business Graphics in Popups

You can add graphics (business cards, logos, or promotional images) to each business popup. The popup will automatically scale to fit the image cleanly.

**How to add images:**

1. **Place image files** in the `assets/images/business-cards/` directory (or any subfolder in `assets/`)

2. **Update the CSV** with the image path in the `business_card` column:
   ```csv
   business_card
   "assets/images/business-cards/business-name.jpg"
   ```

3. **Supported formats:** JPG, PNG, GIF, WebP

4. **Recommended image sizes:**
   - Width: 300-800 pixels (popup max width is 400px)
   - Keep file sizes under 500KB for fast loading
   - Aspect ratio: Any (popup scales automatically)

**Image paths can be:**
- Relative: `assets/images/business-cards/image.jpg`
- Absolute: `/images/business-cards/image.jpg`
- External URL: `https://example.com/image.jpg`

**What happens if the image fails to load?**
The popup will automatically hide the broken image and display the business information normally.

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## Free Tier Limits

Mapbox free tier includes:
- 50,000 map loads per month
- No credit card required
- Sufficient for most chamber of commerce sites

## Deployment

### Option 1: Traditional Web Hosting
Upload files via FTP to your web server.

### Option 2: Modern Platforms
- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Free hosting for static sites

## Features Roadmap

Current features are complete for v1.0. Possible future enhancements:

- Marker clustering for maps with 100+ locations
- Category filters (show only restaurants, etc.)
- Directions integration
- Print map download
- Admin panel for data management

## Support

### Documentation
Check the `docs/` folder for detailed guides.

### Troubleshooting
See the Troubleshooting section in [SETUP.md](docs/SETUP.md).

### Browser Console
Press F12 to open developer tools. Check the Console tab for error messages and debugging information.

## License

This project is provided as-is for use by Dolph Map Company. Modify and distribute as needed for client projects.

## Design Philosophy

This project prioritizes:

1. **Simplicity** - Easy to understand and modify
2. **Beginner-Friendly** - Extensive comments and documentation
3. **No Build Tools** - Works with just a browser
4. **Easy Customization** - Minimal files to change per client
5. **Maintainability** - Clear structure and coding guidelines

## Credits

**Built for:** Dolph Map Company

**Technologies:**
- Mapbox GL JS - https://www.mapbox.com/
- PapaParse - https://www.papaparse.com/

---

## Getting Started

1. Read [SETUP.md](docs/SETUP.md) for initial setup
2. Follow [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for client customization
3. Refer to [CLAUDE.md](docs/CLAUDE.md) when modifying code

**Ready to create your first interactive map? Start with SETUP.md!**

