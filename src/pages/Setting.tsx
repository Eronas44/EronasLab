// src/pages/Setting.tsx
import { useState } from 'react';
import { User, Bell, Palette, Database, Download, Trash2, Save } from 'lucide-react';

interface SettingsState {
  username: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    projects: boolean;
    system: boolean;
  };
  autoSave: boolean;
  logRetention: string;
}

const SettingPage = () => {
  const [settings, setSettings] = useState<SettingsState>({
    username: 'John Doe',
    email: 'john@example.com',
    theme: 'system',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      projects: true,
      system: true
    },
    autoSave: true,
    logRetention: '30'
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'system'>('profile');

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        username: 'User',
        email: 'user@example.com',
        theme: 'system',
        language: 'en',
        notifications: {
          email: true,
          push: false,
          projects: true,
          system: true
        },
        autoSave: true,
        logRetention: '30'
      });
      alert('Settings reset to default');
    }
  };

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateNotification = (key: keyof SettingsState['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'system', label: 'System', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <div className="container">
      <h1 className="main-title">Settings</h1>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ width: '250px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#374151',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'profile' && (
            <div className="stats-card">
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User className="w-5 h-5" />
                Profile Settings
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={settings.username}
                    onChange={(e) => updateSetting('username', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="stats-card">
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ textTransform: 'capitalize', color: '#374151' }}>
                      {key} Notifications
                    </span>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNotification(key as keyof SettingsState['notifications'], e.target.checked)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span style={{ color: value ? '#10b981' : '#6b7280' }}>
                        {value ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="stats-card">
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Palette className="w-5 h-5" />
                Appearance Settings
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => updateSetting('theme', e.target.value as 'light' | 'dark' | 'system')}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSetting('language', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="en">English</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="stats-card">
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database className="w-5 h-5" />
                System Settings
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#374151' }}>Auto-save</span>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => updateSetting('autoSave', e.target.checked)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <span style={{ color: settings.autoSave ? '#10b981' : '#6b7280' }}>
                      {settings.autoSave ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Log Retention (days)
                  </label>
                  <input
                    type="number"
                    value={settings.logRetention}
                    onChange={(e) => updateSetting('logRetention', e.target.value)}
                    min="1"
                    max="365"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
            
            <button
              onClick={handleExport}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button
              onClick={handleReset}
              className="btn-secondary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                backgroundColor: '#ef4444',
                color: 'white'
              }}
            >
              <Trash2 className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;