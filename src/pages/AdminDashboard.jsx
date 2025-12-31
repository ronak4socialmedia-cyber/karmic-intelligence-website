import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Save, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      // Save auth token
      localStorage.setItem('adminToken', data.session.access_token);
      setToken(data.session.access_token);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      fetchContent();
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select('*');

      if (error) throw error;

      // Organize data by section
      const formattedData = {};
      data.forEach(item => {
        if (!formattedData[item.section_name]) {
          formattedData[item.section_name] = {};
        }
        formattedData[item.section_name][item.field_name] = item.field_value;
      });

      setContent(formattedData);
      setFormData(formattedData[activeTab] || {});
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaveStatus('Saving...');

      // Save each field
      for (const [fieldName, fieldValue] of Object.entries(formData)) {
        const { error } = await supabase
          .from('cms_content')
          .upsert({
            section_name: activeTab,
            field_name: fieldName,
            field_value: fieldValue,
            updated_at: new Date()
          });

        if (error) throw error;
      }

      setSaveStatus('✓ Saved successfully!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('❌ Save failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setToken(null);
    setContent(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(content[tab] || {});
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f1419] to-[#1a1f2e] flex items-center justify-center p-4">
        <div className="bg-[#1a1f2e] rounded-lg border border-[#ff9900]/20 p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f1419] text-white border border-[#ff9900]/30 rounded px-4 py-2 mb-4 focus:outline-none focus:border-[#ff9900]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f1419] text-white border border-[#ff9900]/30 rounded px-4 py-2 mb-6 focus:outline-none focus:border-[#ff9900]"
            />
            <button
              type="submit"
              className="w-full bg-[#ff9900] text-[#0f1419] font-semibold py-2 rounded hover:bg-[#ffb333] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] to-[#1a1f2e] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="bg-[#1a1f2e] rounded-lg border border-[#ff9900]/20 p-6">
          <div className="flex gap-4 mb-6 border-b border-[#ff9900]/20">
            {content &&
              Object.keys(content).map(section => (
                <button
                  key={section}
                  onClick={() => handleTabChange(section)}
                  className={`px-4 py-2 font-semibold transition ${
                    activeTab === section
                      ? 'text-[#ff9900] border-b-2 border-[#ff9900]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
          </div>

          <div className="space-y-4">
            {formData &&
              Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key.includes('description') || key.includes('content') || value?.length > 100 ? (
                    <textarea
                      value={value || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-[#0f1419] text-white border border-[#ff9900]/30 rounded px-4 py-2 focus:outline-none focus:border-[#ff9900]"
                      rows="6"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-[#0f1419] text-white border border-[#ff9900]/30 rounded px-4 py-2 focus:outline-none focus:border-[#ff9900]"
                    />
                  )}
                </div>
              ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#ff9900] text-[#0f1419] font-semibold px-6 py-2 rounded hover:bg-[#ffb333] transition"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            {saveStatus && (
              <div className="flex items-center text-sm font-semibold">
                <span className={saveStatus.includes('✓') ? 'text-green-400' : 'text-red-400'}>
                  {saveStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
