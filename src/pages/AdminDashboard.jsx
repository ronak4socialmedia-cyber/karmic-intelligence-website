import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Save, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchContent();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: '/api/auth/login', method: 'POST', data: { password } })
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchContent();
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/cms?url=/api/cms/content');
      const data = await res.json();
      setContent(data);
      setFormData(data[activeTab] || {});
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const handleSave = async () => {
    if (!token) return;
    
    try {
      setSaveStatus('Saving...');
      const res = await fetch(`/api/cms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          url: `/api/cms/${activeTab}`,
          method: 'POST',
          data: formData
        })
      });
      
      if (res.ok) {
        setSaveStatus('✓ Saved successfully!');
        setTimeout(() => setSaveStatus(''), 2000);
      } else {
        setSaveStatus('❌ Save failed');
      }
    } catch (error) {
      setSaveStatus('❌ Error: ' + error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold ml-3">Admin Panel</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </button>
          </form>
          
          <p className="text-gray-600 text-sm text-center mt-4">
            🔒 This admin panel is password protected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CMS Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {['hero', 'services', 'philosophy'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (content) setFormData(content[tab] || {});
            }}
            className={`px-6 py-3 font-medium transition ${
              activeTab === tab
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Editor */}
      <div className="max-w-4xl mx-auto p-6">
        {activeTab === 'hero' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Subtitle"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
            />
          </div>
        )}

        {/* Save Button */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-bold transition"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
          {saveStatus && <span className="py-2 text-sm">{saveStatus}</span>}
        </div>

        {/* Preview */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4" />
            <h3 className="font-bold">Live Preview</h3>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <pre className="text-sm text-green-400 overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
