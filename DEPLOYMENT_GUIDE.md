# Karmic Intelligence Website - Deployment Guide

## Overview
This guide covers deploying the Karmic Intelligence website to both Vercel (recommended) and shared hosting providers like Hostomy with cPanel.

## Current Status
- ✅ Frontend: React with Tailwind CSS
- ✅ Admin Dashboard: Complete with authentication
- ✅ CMS API: MongoDB-ready with fallback to in-memory storage
- ✅ Deployed on Vercel: https://karmic-intelligence-website.vercel.app/

## Deployment Options

### Option 1: Vercel (Current - Recommended)
**Advantages:**
- Automatic deployments from GitHub
- Serverless functions for API routes
- Built-in HTTPS, CDN, and auto-scaling
- Free tier available
- Environment variables managed securely

**Steps:**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   ```
   JWT_SECRET=your-secure-jwt-secret
   ADMIN_PASSWORD=your-secure-admin-password
   MONGODB_URI=your-mongodb-connection-string (optional)
   ```
3. Vercel automatically builds and deploys on every push
4. Access your site at: https://karmic-intelligence-website.vercel.app/

### Option 2: Shared Hosting with cPanel (Hostomy)
**Advantages:**
- Full server control
- No vendor lock-in
- Can use traditional databases

**Requirements:**
- Node.js 16+ support
- npm or yarn package manager
- SSH access
- MongoDB Atlas (cloud-hosted) or MySQL for database

**Setup Steps:**

1. **Prepare your hosting:**
   - SSH into your hosting account
   - Navigate to your public_html or desired directory
   - Install Node.js (if not already installed):
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

2. **Clone and install:**
   ```bash
   cd /var/www/yourwebsite
   git clone https://github.com/ronak4socialmedia-cyber/karmic-intelligence-website.git .
   npm install
   ```

3. **Set environment variables:**
   Create a `.env.local` file:
   ```
   JWT_SECRET=your-secure-jwt-secret-change-this
   ADMIN_PASSWORD=your-secure-admin-password-change-this
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karmic_intelligence
   NODE_ENV=production
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Setup PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "karmic-intelligence"
   pm2 startup
   pm2 save
   ```

6. **Configure cPanel (Optional - for easier management):**
   - Go to cPanel > Node.js Manager
   - Create a Node.js application pointing to your directory
   - Set the startup file to `server.js` or `npm start`
   - Allocate required resources

7. **Setup a reverse proxy (Nginx/Apache):**
   ```bash
   # For Apache, enable mod_proxy:
   sudo a2enmod proxy
   sudo a2enmod proxy_http
   
   # Create a virtual host configuration pointing to localhost:3000
   ```

### Option 3: Using MongoDB Atlas (Recommended for Database)

1. **Create MongoDB Atlas account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free M0 cluster
   - Create a database user
   - Whitelist your IP address

2. **Get connection string:**
   - Copy the connection string from Atlas
   - Add to `.env.local`:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karmic_intelligence?retryWrites=true&w=majority
     ```

3. **Test the connection:**
   ```bash
   npm run test:db
   ```

## Admin Dashboard Access

1. **Default credentials:**
   - Username: (no username required)
   - Password: `admin123` (change this!)

2. **Change admin password:**
   - Update `.env.local`:
     ```
     ADMIN_PASSWORD=your-new-secure-password
     ```
   - Redeploy the application

3. **Access the dashboard:**
   - Go to `https://yourdomain.com/admin` or navigate through the website
   - Enter admin password
   - Edit content for Hero, Services, and Philosophy sections
   - Changes are saved to the database (or in-memory)

## Database Schema

The CMS stores data in this structure:

```json
{
  "hero": {
    "subtitle": "The Conscious Architect",
    "title": "Karmic Intelligence",
    "description": "Blending ancient Vedic wisdom..."
  },
  "services": [
    {
      "id": 1,
      "title": "Service Title",
      "description": "Service description",
      "icon": "IconName"
    }
  ],
  "philosophy": {
    "title": "Our Philosophy",
    "content": "Philosophy content..."
  }
}
```

## API Endpoints

- `POST /api/auth/login` - Login with password
  - Body: `{ "password": "admin123" }`
  - Returns: `{ "token": "jwt-token" }`

- `GET /api/cms/content` - Get all CMS content
  - Returns: Full CMS data object

- `POST /api/cms/hero` - Update hero section (requires auth)
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "title": "New Title", ... }`

- `POST /api/cms/services` - Update services (requires auth)
  - Headers: `Authorization: Bearer {token}`
  - Body: `[{...}, {...}]`

- `POST /api/cms/philosophy` - Update philosophy (requires auth)
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "title": "...", "content": "..." }`

## Troubleshooting

### Issue: Admin dashboard shows "Failed to fetch content"
- Check that the API routes are accessible
- Verify CORS headers in api/cms.js
- Check browser console for specific errors
- Ensure JWT_SECRET is set correctly

### Issue: Changes not persisting
- Verify MongoDB connection (if using external DB)
- Check server logs: `pm2 logs karmic-intelligence`
- Ensure MONGODB_URI is correct in `.env.local`

### Issue: Login fails
- Verify ADMIN_PASSWORD matches in `.env.local`
- Clear browser local storage: `localStorage.clear()`
- Check JWT_SECRET is set consistently

## Security Recommendations

1. **Change all default credentials immediately:**
   ```
   JWT_SECRET=generate-a-strong-random-string
   ADMIN_PASSWORD=create-a-strong-password
   ```

2. **Use HTTPS only** (Vercel does this automatically)

3. **Keep dependencies updated:**
   ```bash
   npm audit
   npm update
   ```

4. **Monitor logs regularly:**
   ```bash
   pm2 logs karmic-intelligence
   ```

5. **Backup your database** (if using MongoDB Atlas, use their backup features)

## Performance Tips

1. Enable caching headers in your web server
2. Use CDN (Vercel includes this)
3. Optimize images in the public folder
4. Consider implementing pagination for large content lists

## Support & Next Steps

1. Test the admin dashboard thoroughly before going live
2. Customize the admin password and JWT secret
3. Set up monitoring and backups
4. Document your deployment configuration
5. Train team members on using the CMS

## File Structure

```
karmic-intelligence-website/
├── api/
│   └── cms.js          # CMS API handler
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── pages/
│   │   └── AdminDashboard.jsx  # Admin panel
│   └── App.jsx
├── package.json
└── vercel.json         # Vercel configuration
```

---

**Last Updated:** December 2025
**Status:** Production Ready
