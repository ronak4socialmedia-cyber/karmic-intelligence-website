// CMS API Endpoints
// This file handles all CMS operations

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!

// In-memory database (replace with MongoDB in production)
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

// Login endpoint
export default function handler(req, res) {
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
    res.status(200).json(cmsData);
    return;
  }

  // Update hero section (requires auth)
  if (req.method === 'POST' && req.url === '/api/cms/hero') {
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    cmsData.hero = { ...cmsData.hero, ...req.body };
    res.status(200).json({ success: true, data: cmsData.hero });
    return;
  }

  // Update services (requires auth)
  if (req.method === 'POST' && req.url === '/api/cms/services') {
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    cmsData.services = req.body;
    res.status(200).json({ success: true, data: cmsData.services });
    return;
  }

  // Update philosophy (requires auth)
  if (req.method === 'POST' && req.url === '/api/cms/philosophy') {
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    cmsData.philosophy = { ...cmsData.philosophy, ...req.body };
    res.status(200).json({ success: true, data: cmsData.philosophy });
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
