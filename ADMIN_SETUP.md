# Admin Dashboard Setup & Usage Guide

## Quick Start

The admin dashboard allows you to manage website content without touching code. All changes are saved securely to the database.

### Accessing the Admin Dashboard

1. **Live URL:** https://karmic-intelligence-website.vercel.app/admin
2. **Default Password:** `admin123` (CHANGE THIS IMMEDIATELY IN PRODUCTION!)
3. **Local Development:** http://localhost:3000/admin

## First-Time Setup

### Step 1: Change the Admin Password

**CRITICAL: Do this immediately before deploying to production!**

1. Go to the repository root
2. Edit `.env.local` or set environment variables:
   ```
   ADMIN_PASSWORD=your-very-secure-password-here
   ```
3. Generate a strong password:
   ```bash
   # Generate random password
   node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
   ```
4. Redeploy the application
5. Clear browser storage and log in with new password

### Step 2: Set JWT Secret

For production, generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env.local` or Vercel environment variables:
```
JWT_SECRET=your-generated-secret-here
```

### Step 3: Configure Database (Optional)

For data persistence beyond server restarts:

1. Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Get connection string
4. Add to environment:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karmic_intelligence
   ```

## Admin Dashboard Features

### Login
- Password-protected access
- JWT token-based authentication
- 24-hour session expiration
- Local storage caching for offline access

### Content Sections

The admin dashboard allows editing three main sections:

#### 1. Hero Section
**What it controls:** The main banner/header

**Editable Fields:**
- `subtitle` - Small text above the main title
- `title` - Main headline ("Karmic Intelligence")
- `description` - Subheading text

**Example:**
```json
{
  "subtitle": "The Conscious Architect",
  "title": "Karmic Intelligence",
  "description": "Blending ancient Vedic wisdom with modern insights..."
}
```

#### 2. Services Section
**What it controls:** Service offerings/features

**Editable Fields:**
- `id` - Unique identifier for each service
- `title` - Service name
- `description` - Service description
- `icon` - Icon name from lucide-react icons

**Example:**
```json
[
  {
    "id": 1,
    "title": "Astro-Vastu Consultation",
    "description": "Optimize your spaces using astronomical alignment",
    "icon": "Building2"
  }
]
```

**Available Icons:**
- Building2, Book, Compass, Star, Lightbulb, Zap, Heart, Shield, etc.
- See full list: https://lucide.dev/

#### 3. Philosophy Section
**What it controls:** About/Philosophy content

**Editable Fields:**
- `title` - Section title
- `content` - Main philosophy text

**Example:**
```json
{
  "title": "Our Philosophy",
  "content": "We believe in blending ancient wisdom with modern science..."
}
```

## How to Use the Admin Dashboard

### Making Changes

1. **Log In**
   - Go to admin URL
   - Enter admin password
   - Click "Login"

2. **Select Section**
   - Click the tab for the section you want to edit (Hero, Services, Philosophy)
   - Current tab is highlighted in orange

3. **Edit Content**
   - Fill in or modify the text fields
   - For Services, edit the list items as JSON
   - Preview appears in real-time

4. **Save Changes**
   - Click "Save Changes" button
   - Green checkmark indicates successful save
   - Changes appear immediately on the live site

5. **Log Out**
   - Click "Logout" button in top right
   - Session will clear from browser

### Live Preview

- JSON preview shown at bottom of each section
- See exactly how data is stored
- Helps understand data structure

## Making Changes via Admin Panel

### Example: Editing the Hero Title

```
1. Open admin dashboard
2. Enter password
3. "Hero" tab is already selected
4. Find the "Title" field
5. Change from "Karmic Intelligence" to your desired text
6. Click "Save Changes"
7. Refresh the website to see changes
```

### Example: Adding a New Service

```
1. Go to admin dashboard
2. Click "Services" tab
3. Modify the JSON array to include new service:
   {
     "id": 3,
     "title": "New Service Name",
     "description": "Service description here",
     "icon": "StarIcon"
   }
4. Click "Save Changes"
5. Refresh website to see new service
```

## API Endpoints (For Developers)

### Authentication
```
POST /api/auth/login
Body: { "password": "admin123" }
Response: { "token": "jwt-token-here" }
```

### Get Content
```
GET /api/cms/content
Response: { hero: {...}, services: [...], philosophy: {...} }
```

### Update Hero
```
POST /api/cms/hero
Headers: Authorization: Bearer {token}
Body: { "title": "New Title", "subtitle": "New Subtitle" }
```

### Update Services
```
POST /api/cms/services
Headers: Authorization: Bearer {token}
Body: [{id: 1, title: "...", description: "...", icon: "..."}]
```

### Update Philosophy
```
POST /api/cms/philosophy
Headers: Authorization: Bearer {token}
Body: { "title": "New Title", "content": "New content..." }
```

## Troubleshooting

### "Failed to fetch content"
- Check internet connection
- Ensure token is valid (re-login if needed)
- Check browser console for detailed error
- Verify API endpoint is accessible

### Changes don't save
- Ensure you're logged in (check token in localStorage)
- Check network tab in browser dev tools
- Verify MONGODB_URI is correct (if using external DB)
- Try refreshing and re-logging in

### Locked out
- Clear browser storage: `localStorage.clear()`
- Navigate to admin page again
- You'll be logged out and can re-enter password

### Password not working
- Password is case-sensitive
- Verify ADMIN_PASSWORD environment variable
- Check that environment variables are deployed to Vercel/hosting
- May need to redeploy after changing password

## Security Best Practices

1. **Change Default Password**
   - Never use `admin123` in production
   - Generate strong password with minimum 16 characters
   - Include uppercase, lowercase, numbers, and special characters

2. **Protect JWT Secret**
   - Keep it secret and never commit to git
   - Only store in environment variables
   - Regenerate if ever compromised

3. **HTTPS Only**
   - Ensure admin dashboard is only accessed via HTTPS
   - Vercel enforces this automatically
   - Never send credentials over HTTP

4. **Session Management**
   - Tokens expire after 24 hours
   - Clear browser storage when logging out from shared computers
   - Don't share login credentials

5. **Database Security**
   - If using MongoDB Atlas, enable IP whitelist
   - Use strong database credentials
   - Enable MongoDB encryption
   - Regular backups enabled

## Content Guidelines

### Writing Effective Hero Text
- **Subtitle:** 2-5 words, captivating
- **Title:** 1-3 words, bold and clear
- **Description:** 1-2 sentences, compelling

### Service Descriptions
- Keep descriptions concise (1-2 sentences)
- Focus on benefits to the user
- Use action-oriented language
- Ensure icon matches the service

### Philosophy Content
- Can be longer and more detailed
- Use clear paragraphs
- Avoid jargon
- Make it authentic and compelling

## Data Backup

### Automatic Backups
- If using MongoDB Atlas: Automatic daily backups
- Vercel: Stores code in Git (deployment history)

### Manual Backup
```bash
# Export data from MongoDB
mongodump --uri "mongodb+srv://..." --out ./backup

# Or export via MongoDB Atlas web interface
```

## Common Tasks

### Update Website Title
1. Log in to admin
2. Hero tab
3. Change "title" field
4. Save

### Add Service
1. Services tab
2. Add object to JSON array
3. Fill in id, title, description, icon
4. Save

### Remove Service
1. Services tab
2. Delete object from JSON array
3. Save

### Change Company Description
1. Philosophy tab
2. Update "content" field
3. Save

## Support

For issues or questions:
1. Check troubleshooting section above
2. Check browser console for error messages
3. Review network tab in dev tools
4. Contact development team if needed

---

**Last Updated:** December 2025
**Version:** 1.0
