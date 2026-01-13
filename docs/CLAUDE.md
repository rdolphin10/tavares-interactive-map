# Coding Guidelines for Interactive Map Project

## Purpose
This file contains rules and guidelines for maintaining and modifying this codebase. Follow these rules when making changes or adding features to ensure the code remains simple and beginner-friendly.

## Core Principles

### 1. KEEP IT SIMPLE
This code should be readable by beginners. Avoid clever tricks, complex patterns, or advanced JavaScript features that might confuse someone learning to code.

### 2. COMMENT EVERYTHING
Every function should have a comment explaining what it does and why. Comments should be clear and helpful, not just restating the obvious.

### 3. AVOID COMPLEXITY
If you can solve a problem in 5 lines instead of 50, do it. Don't add features "just in case" they're needed later. Build exactly what's required, nothing more.

### 4. TEST IN BROWSER
Always test changes by opening index.html in a web browser. Check the console for errors. Test on mobile devices too.

## File Organization Rules

### Configuration vs. Code
1. **Configuration changes ONLY go in config.js and theme.css**
   - Never hardcode client-specific values in core JavaScript files
   - Map center, colors, fonts, API keys = configuration
   - Logic, algorithms, functionality = code

2. **Keep HTML structure separate from styling**
   - HTML defines what elements exist (structure)
   - CSS defines how they look (presentation)
   - JavaScript defines how they behave (behavior)

3. **One responsibility per JavaScript file**
   - map.js = map initialization only
   - markers.js = marker management only
   - search.js = search functionality only
   - Don't mix responsibilities

## JavaScript Guidelines

### Code Style
1. **Use clear, descriptive variable names**
   - Good: `searchInput`, `allMarkers`, `advertiserData`
   - Bad: `x`, `temp`, `data`, `i` (unless in a simple loop)

2. **Add comments above each function**
   ```javascript
   /**
    * Load CSV file and return data
    *
    * @param {string} path - Path to CSV file
    * @returns {Promise} - Promise with parsed data
    */
   function loadCSV(path) {
       // Implementation
   }
   ```

3. **Use const and let (not var)**
   - `const` for values that don't change
   - `let` for values that do change
   - Never use `var`

4. **Keep functions small (< 50 lines when possible)**
   - If a function is getting long, break it into smaller functions
   - Each function should do ONE thing well

5. **Avoid complex ES6+ features**
   - Keep it ES5-ES6 friendly
   - Use `function` declarations, not arrow functions (easier for beginners)
   - Avoid destructuring, spread operators, optional chaining unless necessary

6. **Use simple function declarations**
   ```javascript
   // Good (easy to understand)
   function calculateTotal(items) {
       let total = 0;
       items.forEach(function(item) {
           total += item.price;
       });
       return total;
   }

   // Avoid (harder for beginners)
   const calculateTotal = items => items.reduce((sum, item) => sum + item.price, 0);
   ```

### Error Handling
1. **Always check if things exist before using them**
   ```javascript
   const element = document.getElementById('search-input');
   if (!element) {
       console.error('Element not found');
       return;
   }
   // Use element
   ```

2. **Log errors to console**
   ```javascript
   console.error('Error loading CSV:', error);
   ```

3. **Show user-friendly error messages**
   ```javascript
   showError('Failed to load data. Please refresh the page.');
   ```

## CSS Guidelines

### Separation of Concerns
1. **Client colors/fonts go in theme.css ONLY**
   - Use CSS custom properties (variables)
   - Example: `var(--color-primary)`

2. **Layout and structure go in styles.css**
   - Flexbox, grid, positioning
   - NO colors or fonts

3. **Use CSS custom properties for colors**
   ```css
   :root {
       --color-primary: #0066cc;
   }

   .button {
       background-color: var(--color-primary);
   }
   ```

### Naming Conventions
1. **Class names should be descriptive**
   - Good: `.search-bar`, `.banner-container`, `.popup-title`
   - Bad: `.sb`, `.bc`, `.pt`

2. **Use kebab-case for CSS classes**
   - Use hyphens: `.search-input`
   - Not camelCase: `.searchInput`
   - Not underscores: `.search_input`

3. **Avoid !important unless absolutely necessary**
   - It makes debugging harder
   - Usually indicates a specificity problem

### Responsive Design
1. **Mobile-first approach**
   - Base styles for mobile
   - Use media queries to enhance for larger screens

2. **Test on different screen sizes**
   - Phone (< 480px)
   - Tablet (480px - 768px)
   - Desktop (> 768px)

## Data Structure

### CSV Requirements
1. **Required columns**
   - `name` (business name)
   - `latitude` (decimal degrees)
   - `longitude` (decimal degrees)

2. **Optional columns**
   - `address`, `city`, `state`, `zip`
   - `phone`, `email`, `website`
   - `category`, `description`

3. **Data format rules**
   - Keep column names lowercase and simple
   - No special characters in column names
   - Use quotes around values containing commas
   - Latitude range: -90 to 90
   - Longitude range: -180 to 180

## When Adding Features

### Checklist
Before adding a new feature, ask yourself:

1. **Could a beginner understand this?**
   - If no, simplify it or add more comments

2. **Is this feature actually needed?**
   - Don't add features "just in case"

3. **Where does this fit in the file structure?**
   - Don't mix responsibilities between files

4. **Does it need to be configurable?**
   - If yes, add it to config.js

5. **Will this work on mobile?**
   - Test responsive behavior

### After Adding a Feature
1. Add comments explaining the feature
2. Update CUSTOMIZATION.md if it affects client setup
3. Test with example data
4. Check browser console for errors
5. Test on mobile devices

## Common Customization Tasks

### Change Colors
**File:** `css/theme.css`
```css
:root {
    --color-primary: #YOUR_COLOR_HERE;
}
```

### Change Map Center/Zoom
**File:** `js/config.js`
```javascript
mapbox: {
    center: [longitude, latitude],
    zoom: 12
}
```

### Change Banners
**File:** `js/config.js` and replace images in `assets/images/`
```javascript
banners: [
    {
        image: 'assets/images/banner1.jpg',
        link: 'https://example.com'
    }
]
```

### Add Advertisers
**File:** `data/advertisers.csv`
- Edit in Excel or text editor
- Add new rows with required columns

### Change Search Fields
**File:** `js/config.js`
```javascript
search: {
    fields: ['name', 'category', 'address']
}
```

## External Libraries

### Current Libraries
1. **Mapbox GL JS** - Interactive maps
2. **PapaParse** - CSV parsing

### Adding New Libraries
Ask these questions first:
1. Is this library really necessary?
2. Can we accomplish this with vanilla JavaScript?
3. Is the library well-maintained and documented?
4. Is it available via CDN (no build tools)?
5. Will beginners understand how to use it?

## Browser Compatibility

### Target Browsers
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Testing
1. Open index.html in each browser
2. Check console for errors
3. Test all functionality
4. Test on mobile (iOS Safari, Android Chrome)

## Security Notes

### Always Sanitize User Input
```javascript
// Use the sanitizeInput() function from utils.js
const cleanInput = sanitizeInput(userInput);
```

### Always Escape HTML
```javascript
// Use the escapeHTML() function from utils.js
const safeHTML = escapeHTML(userContent);
```

### Never Trust External Data
- Validate CSV data before using
- Check that coordinates are valid
- Verify required fields exist

### API Keys
- Never commit API tokens to version control
- Use environment variables or config files
- Include instructions for users to add their own tokens

## File Modification Guidelines

### Core Files (Rarely Change)
- `js/map.js` - Map initialization logic
- `js/markers.js` - Marker creation logic
- `js/search.js` - Search logic
- `js/utils.js` - Helper functions
- `css/styles.css` - Core layout

**Rule:** Only modify these to fix bugs or add universal features

### Config Files (Change Per Client)
- `js/config.js` - Client settings
- `css/theme.css` - Client colors/fonts

**Rule:** Customize these for each client deployment

### Data Files (Change Per Client)
- `data/advertisers.csv` - Advertiser data

**Rule:** Replace completely for each client

### Assets (Replace Per Client)
- `assets/images/` - Logos, banners

**Rule:** Replace image files, don't modify code

## Getting Help

### Documentation
1. Read `CUSTOMIZATION.md` for step-by-step guides
2. Check `SETUP.md` for initial setup
3. Read `README.md` for project overview

### Code Comments
- Every function has a comment explaining what it does
- Read the comments in the code for understanding

### Console Logging
- Check browser console for helpful messages
- Errors will show in red with descriptions

### Debugging Tips
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Use `console.log()` to debug variables
4. Test one change at a time

## Best Practices Summary

### DO:
- Write clear, simple code
- Add helpful comments
- Use descriptive names
- Test in multiple browsers
- Keep functions small
- Separate configuration from code
- Validate user input
- Handle errors gracefully

### DON'T:
- Use clever tricks or shortcuts
- Mix responsibilities between files
- Hardcode client-specific values
- Add unnecessary features
- Use complex ES6+ features without comments
- Skip testing
- Forget about mobile users
- Ignore console errors

## Maintenance

### Regular Tasks
1. **Update dependencies**
   - Check CDN links are still valid
   - Update Mapbox GL JS version if needed

2. **Review client data**
   - Ensure CSV data is current
   - Verify coordinates are accurate

3. **Test functionality**
   - Test all features quarterly
   - Check for browser compatibility issues

4. **Monitor performance**
   - Check load times
   - Optimize if needed

---

**Remember:** The goal is to keep this code simple enough that anyone can understand and maintain it. When in doubt, choose simplicity over cleverness.
