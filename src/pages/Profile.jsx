import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit2, Key, Bell, CreditCard, LogOut } from 'lucide-react';
import { getData, updateData, deleteData } from '../utils/storage';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const currentUser = getData('user');
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    deleteData('user');
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'security', name: 'Security', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'payments', name: 'Saved Cards', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="glass-card mb-8 overflow-hidden p-0">
          <div className="h-32 bg-gradient-to-r from-primary-600 to-indigo-600 relative">
            <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors">
              <Edit2 size={16} />
            </button>
          </div>
          <div className="px-6 md:px-8 pb-8 flex flex-col md:flex-row gap-6 items-center md:items-end -mt-12 relative z-10 text-center md:text-left">
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-dark-card overflow-hidden bg-white shrink-0 shadow-lg">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-warm-900 dark:text-white">{user.name}</h1>
              <p className="text-warm-500 dark:text-warm-400 mt-1 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="flex items-center gap-1"><Mail size={14} /> {user.email}</span>
                <span className="flex items-center gap-1"><Phone size={14} /> +91 {user.phone || 'Not Added'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${activeTab === tab.id 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-primary-800' 
                    : 'text-warm-600 dark:text-warm-400 hover:bg-cream-100 dark:hover:bg-cream-800/50'
                  }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-primary-600 dark:text-primary-400' : ''} />
                {tab.name}
              </button>
            ))}
            <div className="my-4 border-t border-cream-300 dark:border-cream-300"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-warm-600 dark:text-warm-400 hover:bg-cream-50 dark:hover:bg-cream-900/20"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'personal' && (
              <div className="glass-card animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-warm-900 dark:text-white">Personal Information</h2>
                  <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">Edit</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Full Name</label>
                    <div className="font-medium text-warm-900 dark:text-white">{user.name}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Email Address</label>
                    <div className="font-medium text-warm-900 dark:text-white">{user.email}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Mobile Number</label>
                    <div className="font-medium text-warm-900 dark:text-white">+91 {user.phone || '---'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Gender</label>
                    <div className="font-medium text-warm-900 dark:text-white">{user.gender || 'Not specified'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Date of Birth</label>
                    <div className="font-medium text-warm-900 dark:text-white">{user.dob ? new Date(user.dob).toLocaleDateString() : 'Not specified'}</div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-cream-300 dark:border-cream-300">
                  <h3 className="text-lg font-bold text-warm-900 dark:text-white mb-4">Travel Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Meal Preference</label>
                      <div className="font-medium text-warm-900 dark:text-white">{user.preferences?.meal || 'None'}</div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-warm-500 mb-1 uppercase tracking-wider">Berth Preference</label>
                      <div className="font-medium text-warm-900 dark:text-white">{user.preferences?.berth || 'No Preference'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="glass-card animate-fade-in-up">
                <h2 className="text-xl font-bold text-warm-900 dark:text-white mb-6">Security Settings</h2>
                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">New Password</label>
                    <input type="password" placeholder="New password" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" className="input-field" />
                  </div>
                  <button type="button" className="btn-primary mt-4">Update Password</button>
                </form>
              </div>
            )}
            
            {/* Other tabs can be similarly implemented... */}
            {(activeTab === 'notifications' || activeTab === 'payments') && (
              <div className="glass-card animate-fade-in-up flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-cream-100 dark:bg-cream-800 rounded-full flex items-center justify-center mb-4 text-warm-400">
                  {activeTab === 'notifications' ? <Bell size={24} /> : <CreditCard size={24} />}
                </div>
                <h3 className="text-lg font-bold text-warm-900 dark:text-white mb-2">Coming Soon</h3>
                <p className="text-warm-500">This feature is currently under development.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
