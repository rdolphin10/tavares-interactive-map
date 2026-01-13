# Example Client Configurations

This folder contains example configurations for two different chambers of commerce, demonstrating how to customize the Interactive Map Project for different clients.

## Example Client 1: Springfield Chamber

**Location:** Springfield, IL
**Theme:** Green color scheme
**Files:**
- `config.js` - Configuration with Springfield coordinates and green branding
- `theme.css` - Green color theme (#2d8659)
- `advertisers.csv` - Sample businesses in Springfield area

**Use this example for:**
- Community-focused organizations
- Nature/environmental themes
- Green/eco-friendly branding

## Example Client 2: Riverside Chamber

**Location:** Riverside, CA
**Theme:** Blue color scheme
**Files:**
- `config.js` - Configuration with Riverside coordinates and blue branding
- `theme.css` - Blue color theme (#1565c0)
- `advertisers.csv` - Sample businesses in Riverside area

**Use this example for:**
- Professional/corporate organizations
- Traditional business associations
- Blue/trust-focused branding

## How to Use These Examples

### As Reference
When customizing for a new client, open these files to see:
- How to format the config.js settings
- How to customize theme colors
- How to structure the CSV data

### As Starting Point
1. Copy one of the example folders
2. Rename it for your client
3. Replace the example content with client-specific information
4. Copy files to main project directory

### Copying Configuration

To use an example configuration in your project:

**Option 1: Copy Individual Files**
```bash
# Copy config from example to main project
cp examples/example-client-1/config.js js/config.js
cp examples/example-client-1/theme.css css/theme.css
cp examples/example-client-1/advertisers.csv data/advertisers.csv
```

**Option 2: Use as Template**
1. Open the example files
2. Copy the relevant sections
3. Paste into your project files
4. Modify with your client's specific information

## Key Differences Between Examples

| Feature | Springfield (Green) | Riverside (Blue) |
|---------|-------------------|-----------------|
| **Primary Color** | #2d8659 (Forest Green) | #1565c0 (Professional Blue) |
| **Map Center** | Springfield, IL | Riverside, CA |
| **Zoom Level** | 13 (closer view) | 12 (wider view) |
| **Business Count** | 5 sample businesses | 6 sample businesses |
| **Theme** | Community/Nature | Corporate/Professional |

## Creating Your Own Configuration

1. **Choose an example** that matches your client's style
2. **Copy the files** to your project directory
3. **Update these values** in config.js:
   - `accessToken` - Your Mapbox token
   - `center` - Your client's coordinates
   - `client.name` - Your client's name
   - `banners` - Your client's banner URLs

4. **Update colors** in theme.css:
   - `--color-primary` - Client's main brand color
   - `--color-primary-dark` - Darker version for hovers

5. **Replace data** in advertisers.csv:
   - Delete example businesses
   - Add your client's businesses
   - Ensure latitude/longitude are accurate

6. **Test** by opening index.html in a browser

## File Purposes

### config.js
**Purpose:** Central configuration for all map settings
**Customize:** Map location, client name, banners, marker colors
**Change frequency:** Once per client

### theme.css
**Purpose:** Visual styling with CSS variables
**Customize:** Colors, fonts, shadows
**Change frequency:** Once per client to match brand

### advertisers.csv
**Purpose:** Business/advertiser location data
**Customize:** Replace with client's data
**Change frequency:** Updates as businesses change

## Tips

- **Start with the example closest to your client's style**
- **Keep the original examples unchanged** (for future reference)
- **Document any custom changes** you make beyond the examples
- **Save successful configurations** in this examples/ folder for reuse

## Need Help?

Refer to the main documentation:
- [SETUP.md](../docs/SETUP.md) - Initial setup
- [CUSTOMIZATION.md](../docs/CUSTOMIZATION.md) - Detailed customization guide
- [CLAUDE.md](../docs/CLAUDE.md) - Coding guidelines
- [README.md](../README.md) - Project overview
