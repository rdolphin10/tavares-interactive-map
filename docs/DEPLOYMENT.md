# Deployment Guide

This guide covers deploying the Interactive Map to Netlify.

## Deploying to Netlify

### Option 1: Drag-and-Drop (Fastest)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up or log in (GitHub, GitLab, or email)
3. Drag your project folder onto the deploy area
4. Wait for deployment (usually under 30 seconds)
5. Get your live URL (e.g., `random-name-123.netlify.app`)

### Option 2: GitHub + Netlify (Recommended for Updates)

1. Push your project to a GitHub repository
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Select GitHub and authorize Netlify
5. Choose your repository
6. Leave build settings empty (this is a static site)
7. Click "Deploy site"

**Benefits of Git integration:**
- Automatic deployments when you push changes
- Deploy previews for pull requests
- Easy rollbacks to previous versions

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project directory
netlify deploy --prod
```

---

## Custom Domain Setup

1. In Netlify dashboard, go to **Site settings** > **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `map.clientchamber.com`)
4. Follow the DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

### DNS Configuration

**For subdomains** (e.g., `map.clientchamber.com`):
- Add a CNAME record pointing to your Netlify site URL

**For root domains** (e.g., `clientchamber.com`):
- Use Netlify DNS or add an A record to Netlify's load balancer

---

## Pre-Deployment Checklist

Before deploying a client site:

- [ ] Update `js/config.js` with client settings:
  - Map center coordinates
  - Client name and logo path
  - Banner images and links
  - Mapbox access token (if using client's own)

- [ ] Update `css/theme.css` with client brand colors

- [ ] Replace data file:
  - Update `data/advertisers.csv` with client business data
  - Verify CSV has required columns: `name`, `latitude`, `longitude`

- [ ] Replace images in `assets/images/`:
  - Chamber logo
  - Banner images
  - Business card images (in `business-cards/` subfolder)

- [ ] Test locally before deploying

---

## Deploying Multiple Client Sites

Since this is a template for multiple chambers:

### Recommended Folder Structure

```
dolph-map-projects/
├── tavares-chamber/
├── springfield-chamber/
└── riverside-chamber/
```

### For Each Client

1. Copy the template folder
2. Rename for the client
3. Customize `config.js`, `theme.css`, and data files
4. Deploy to Netlify (each client gets their own site)

### Naming Convention

Use descriptive Netlify site names:
- `tavares-chamber-map.netlify.app`
- `springfield-chamber-map.netlify.app`

Or use custom domains:
- `map.tavareschamber.com`
- `map.springfieldchamber.org`

---

## Troubleshooting

### Map doesn't load
- Check Mapbox access token in `config.js`
- Verify token hasn't expired
- Check browser console (F12) for errors

### CSV data doesn't load
- Ensure file path in `config.js` matches actual filename
- Verify CSV file is in the `data/` folder
- Check CSV has correct column headers (`name`, `latitude`, `longitude`)

### Images not displaying
- Check file paths are relative (not absolute)
- Verify images were uploaded with correct filenames
- Note: Linux servers are case-sensitive (`Logo.png` vs `logo.png`)

### Site shows 404
- Ensure `index.html` is in the project root
- Check `netlify.toml` configuration
- Verify all files were uploaded

### Slow loading
- Optimize large images before uploading
- Business card images should be under 500KB each
- Banner images should be under 200KB each

---

## Updating a Deployed Site

### With Git Integration
Simply push your changes to GitHub - Netlify will automatically redeploy.

### Without Git Integration
1. Make changes locally
2. Go to Netlify dashboard > Deploys
3. Drag the updated project folder to redeploy

---

## Configuration File

The `netlify.toml` file in the project root configures:
- **Security headers** - Protects against common web vulnerabilities
- **Cache headers** - Improves load times for returning visitors
- **Publish directory** - Set to root (`.`) for this static site

No changes needed for most deployments.
