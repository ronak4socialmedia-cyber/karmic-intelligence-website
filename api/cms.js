// CMS API Endpoints
// This file handles all CMS operations with optional MongoDB persistence
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const MONGODB_URI = process.env.MONGODB_URI;

// Default in-memory database
let cmsData = {
  hero: {
    subtitle: 'The Conscious Architect',
    title: 'Karmic Intelligence',
    description: 'Blending ancient Vedic wisdom with modern insights, Karmic Intelligence empowers personal and professional growth.'
  },
  services: [
    {
      id: 1,
      title: 'Astro-Vastu Consultation',
      description: 'Optimize your residential and commercial spaces using astronomical and architectural alignment.',
      icon: 'Building2'
    },
    {
      id: 2,
      title: 'Education (Astro Granth)',
      description: 'Advanced vedic knowledge with 8,800+ students and 9+ courses.',
      icon: 'Book'
    }
  ],
  philosophy: {
    title: 'Our Philosophy',
    content: 'Blending ancient wisdom with modern science...'
  }
};

// Simple MongoDB helper (for future use)
let db = null;

async function initDB() {
  if (MONGODB_URI && !db) {
    try {
      const { MongoClient } = await import('mongodb');
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db('karmic_intelligence');
    } catch (error) {
      console.log('MongoDB not available, using in-memory storage');
    }
  }
}

async function getCMSData() {
  if (db) {
    try {
      const doc = await db.collection('cms').findOne({ _id: 'content' });
      return doc?.data || cmsData;
    } catch (error) {
      console.log('DB error, using cache');
      return cmsData;
    }
  }
  return cmsData;
}

async function saveCMSData(data) {
  if (db) {
    try {
      await db.collection('cms').updateOne(
        { _id: 'content' },
        { $set: { data, updatedAt: new Date() } },
        { upsert: true }
      );
    } catch (error) {
      console.log('DB save error');
    }
  }
  cmsData = data;
}

export default async function handler(req, res) {
  await initDB();

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Login endpoint
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
    return;
  }

  // Verify token middleware
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (e) {
      isAuthenticated = false;
    }
  }

  // GET all content
  if (req.method === 'GET' && req.url === '/api/cms/content') {
    const data = await getCMSData();
    res.status(200).json(data);
    return;
  }

  // Update hero section (requires auth)
  if (req.method === 'POST' && req.url === '/api/cms/hero') {
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const data = await getCMSData();
    data.hero = { ...data.hero, ...req.body };
    await saveCMSData(data);
    res.status(200).json({ success: true, data: data.hero });
    return;
  }

  // Update services (requires auth)
  if (req.method === 'POST' && req.url === '/api/cms/services') {
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const data = await getCMSData();
    data.services = req.body;
    await saveCMSData(data);
    res.status(200).json({ success: true, data: data.services });
    return;
  }

  // Update philosophy (requires auth)
  if (req.method === 'POST' && req.url === '/api/cms/philosophy') {
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const data = await getCMSData();
    data.philosophy = { ...data.philosophy, ...req.body };
    await saveCMSData(data);
    res.status(200).json({ success: true, data: data.philosophy });
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
