import React, { useState } from 'react';
import {Plus, Bot, Play, Pause, Square, Settings, Activity, Cpu, Wifi, Terminal, Shield, Zap } from 'lucide-react';

interface BotInstance {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'starting' | 'stopping';
  server: string;
  players: number;
  uptime: string;
  cpu: number;
  memory: number;
  version: string;
}


const MineflayerPage: React.FC = () => {
  const [bots, setBots] = useState<BotInstance[]>([
    {
      id: 'bot-1',
      name: 'Main Survival Bot',
      status: 'online',
      server: 'mc.hypixel.net',
      players: 45,
      uptime: '2d 14h 32m',
      cpu: 25,
      memory: 512,
      version: '1.19.4'
    },
    {
      id: 'bot-2',
      name: 'Creative Builder',
      status: 'offline',
      server: 'build.example.com',
      players: 0,
      uptime: '0d 0h 0m',
      cpu: 0,
      memory: 0,
      version: '1.19.4'
    },
    {
      id: 'bot-3',
      name: 'Farming Assistant',
      status: 'online',
      server: 'farm.example.com',
      players: 12,
      uptime: '5d 8h 15m',
      cpu: 45,
      memory: 768,
      version: '1.19.3'
    }
  ]);

  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleAddNewBot = () => {
    alert("Mengarahkan ke halaman pembuatan bot baru...");
  };

  const handleStartBot = (botId: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, status: 'starting' }
        : bot
    ));
    
    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === botId 
          ? { ...bot, status: 'online' }
          : bot
      ));
    }, 2000);
  };

  const handleStopBot = (botId: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, status: 'stopping' }
        : bot
    ));
    
    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === botId 
          ? { ...bot, status: 'offline' }
          : bot
      ));
    }, 1500);
  };

  const handleRestartBot = (botId: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, status: 'stopping' }
        : bot
    ));
    
    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === botId 
          ? { ...bot, status: 'starting' }
          : bot
      ));
    }, 1000);
    
    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === botId 
          ? { ...bot, status: 'online' }
          : bot
      ));
    }, 3000);
  };

  const handleViewLogs = (botId: string) => {
    setSelectedBot(botId);
    setShowLogs(true);
    
    const mockLogs = [
      `[${new Date().toLocaleTimeString()}] [INFO] Bot ${botId} connected to server`,
      `[${new Date().toLocaleTimeString()}] [INFO] Authentication successful`,
      `[${new Date().toLocaleTimeString()}] [INFO] Joining world...`,
      `[${new Date().toLocaleTimeString()}] [INFO] Bot spawned at coordinates (128, 64, 256)`,
      `[${new Date().toLocaleTimeString()}] [INFO] Starting automated farming routine`,
      `[${new Date().toLocaleTimeString()}] [WARN] Low health detected, consuming food`,
      `[${new Date().toLocaleTimeString()}] [INFO] Inventory full, depositing items`
    ];
    setLogs(mockLogs);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'offline': return '#ef4444';
      case 'starting': return '#f59e0b';
      case 'stopping': return '#f97316';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Activity className="w-4 h-4" />;
      case 'offline': return <Square className="w-4 h-4" />;
      case 'starting': return <Play className="w-4 h-4" />;
      case 'stopping': return <Pause className="w-4 h-4" />;
      default: return <Square className="w-4 h-4" />;
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Mineflayer Bot Management</h1>
      
      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="stats-card" style={{ 
          background: '#10b98115',
          border: '1px solid #10b98130',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#10b981', marginBottom: '0.5rem' }}>
            <Bot className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {bots.length}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Total Bots
          </p>
        </div>
        
        <div className="stats-card" style={{ 
          background: '#10b98115',
          border: '1px solid #10b98130',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#10b981', marginBottom: '0.5rem' }}>
            <Activity className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {bots.filter(b => b.status === 'online').length}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Online
          </p>
        </div>
        
        <div className="stats-card" style={{ 
          background: '#f59e0b15',
          border: '1px solid #f59e0b30',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>
            <Wifi className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {bots.reduce((sum, bot) => sum + bot.players, 0)}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Total Players
          </p>
        </div>
        
        <div className="stats-card" style={{ 
          background: '#8b5cf615',
          border: '1px solid #8b5cf630',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
            <Cpu className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {Math.round(bots.reduce((sum, bot) => sum + bot.cpu, 0) / bots.length)}%
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Avg CPU
          </p>
        </div>
      </div>

      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Bot Instances ({bots.length})</h2>
            <button className="btn-primary" onClick={handleAddNewBot}>
              <Plus className="inline-icon"/> Add New Bot
            </button>
          </div>
          <div className="projects-list">
            {bots.map((bot) => (
              <div key={bot.id} className="project-card">
                <div className="project-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: getStatusColor(bot.status),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getStatusIcon(bot.status)}
                    </div>
                    <p className="project-title">{bot.name}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280', 
                      backgroundColor: '#f3f4f6', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px' 
                    }}>
                      {bot.server}
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280'
                    }}>
                      {bot.players} players
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280'
                    }}>
                      Uptime: {bot.uptime}
                    </span>
                  </div>
                </div>
                <span className={`project-status`} style={{ 
                  backgroundColor: getStatusColor(bot.status),
                  color: 'white'
                }}>
                  {bot.status.toUpperCase()}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn-logs" 
                    onClick={() => handleViewLogs(bot.id)}
                    disabled={bot.status === 'starting' || bot.status === 'stopping'}
                  >
                    <Terminal className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                    Logs
                  </button>
                  {bot.status === 'online' ? (
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      onClick={() => handleStopBot(bot.id)}
                    >
                      <Square className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                      Stop
                    </button>
                  ) : (
                    <button 
                      className="btn-primary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      onClick={() => handleStartBot(bot.id)}
                      disabled={bot.status === 'starting' || bot.status === 'stopping'}
                    >
                      <Play className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                      Start
                    </button>
                  )}
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => handleRestartBot(bot.id)}
                    disabled={bot.status === 'starting' || bot.status === 'stopping'}
                  >
                    <Settings className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                    Restart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="stats-column">
          {showLogs && selectedBot ? (
            <div className="stats-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="stats-title">Bot Logs - {selectedBot}</h3>
                <button 
                  onClick={() => setShowLogs(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#6b7280', 
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{ 
                backgroundColor: '#1f2937', 
                color: '#f9fafb', 
                padding: '1rem', 
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                height: '400px',
                overflow: 'auto'
              }}>
                {logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '0.25rem' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="stats-card">
              <h3 className="stats-title">Bot Management</h3>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Quick Actions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    <Shield className="w-4 h-4" style={{ marginRight: '0.5rem' }} />
                    Security Settings
                  </button>
                  <button className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    <Zap className="w-4 h-4" style={{ marginRight: '0.5rem' }} />
                    Performance Optimization
                  </button>
                  <button className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    <Settings className="w-4 h-4" style={{ marginRight: '0.5rem' }} />
                    Global Configuration
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>System Resources</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#6b7280' }}>Total Memory Usage</span>
                    <span style={{ fontWeight: 'bold' }}>{bots.reduce((sum, bot) => sum + bot.memory, 0)} MB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#6b7280' }}>Network Bandwidth</span>
                    <span style={{ fontWeight: 'bold' }}>2.4 GB/hour</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Storage Used</span>
                    <span style={{ fontWeight: 'bold' }}>15.2 GB</span>
                  </div>
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%' }}>
                Open Advanced Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MineflayerPage;
