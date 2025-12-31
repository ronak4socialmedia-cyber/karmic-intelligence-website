# Supabase CMS Setup Guide for Karmic Intelligence Website

## Overview

This guide will help you set up Supabase as the backend for your Karmic Intelligence website admin CMS. Supabase is an open-source Firebase alternative that provides:

- PostgreSQL Database
- Real-time subscriptions
- User Authentication
- Row-level security (RLS)
- Edge Functions
- Storage for files

## Step 1: Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com)
2. Click "Start your project"
3. Sign up with your email or GitHub account
4. Create a new project:
   - Organization name: Your choice
   - Project name: `karmic-intelligence-cms`
   - Database password: Save this securely
   - Region: Choose closest to your location
5. Wait for the project to be created (2-3 minutes)

## Step 2: Create Database Tables

### Table 1: cms_content

Go to the SQL Editor and run this query:

```sql
CREATE TABLE cms_content (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  section_name VARCHAR(255) NOT NULL,
  field_name VARCHAR(255) NOT NULL,
  field_value TEXT,
  field_type VARCHAR(50) DEFAULT 'text',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(section_name, field_name)
);
```

### Table 2: cms_users

```sql
CREATE TABLE cms_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 3: cms_audit_log

```sql
CREATE TABLE cms_audit_log (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users(id),
  section_name VARCHAR(255),
  field_name VARCHAR(255),
  old_value TEXT,
  new_value TEXT,
  action VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 3: Create Indexes for Performance

```sql
CREATE INDEX idx_cms_content_section ON cms_content(section_name);
CREATE INDEX idx_cms_content_updated_at ON cms_content(updated_at DESC);
CREATE INDEX idx_audit_log_user_id ON cms_audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON cms_audit_log(created_at DESC);
```

## Step 4: Enable Row Level Security

```sql
-- Enable RLS on cms_content
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see content
CREATE POLICY "Enable read access for all authenticated users" ON cms_content
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Only admins can update content
CREATE POLICY "Enable update for admin users" ON cms_content
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM cms_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Enable RLS on cms_users
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" ON cms_users
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Step 5: Get Your API Keys

1. In Supabase Dashboard, click "Project Settings" (bottom left)
2. Click "API" tab
3. Copy your:
   - `Project URL` (e.g., https://xxxxx.supabase.co)
   - `anon key` (public key for browser)
   - `service_role key` (keep this secret!)

## Step 6: Update Your Environment Variables

Create or update `.env.local` in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 7: Install Supabase JavaScript Library

```bash
npm install @supabase/supabase-js
```

## Step 8: Update package.json

Make sure your `package.json` includes:

```json
{
  "dependencies": {
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    "@supabase/supabase-js": "^2.x.x",
    "lucide-react": "^latest"
  },
  "devDependencies": {
    "vite": "^5.x.x",
    "@vitejs/plugin-react": "^4.x.x",
    "tailwindcss": "^3.x.x"
  }
}
```

## Step 9: Deploy to Vercel with Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Click "Settings" -> "Environment Variables"
4. Add the same environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Redeploy your project

## Step 10: Test the Connection

Create a test file `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Admin Dashboard Features

The admin dashboard at `/admin` now supports:

1. **Authentication**: Email/Password login
2. **Content Management**: Edit hero, services, philosophy sections
3. **Real-time Updates**: Changes sync across tabs
4. **Audit Logging**: Track all changes made
5. **Role-based Access**: Admin-only operations

## Troubleshooting

### "Failed to authenticate"
- Check your environment variables are set correctly
- Verify CORS settings in Supabase (Settings -> API)
- Ensure user exists in Supabase Auth

### "RLS policy denied this operation"
- Check user role in cms_users table
- Verify RLS policies are correct
- Check if user_id matches auth.uid()

### "Cannot connect to Supabase"
- Verify your Supabase project is running
- Check internet connection
- Verify API keys in environment variables

## Production Checklist

- [ ] RLS policies enabled on all tables
- [ ] Environment variables set in Vercel
- [ ] Admin password is strong
- [ ] CORS settings configured
- [ ] Backup strategy in place
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] HTTPS enabled

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/ronak4socialmedia-cyber/karmic-intelligence-website/issues)
