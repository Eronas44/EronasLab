import React, { useState, useEffect } from 'react';
import { Globe, Code, Plus, Bot, Play, Pause, Square, Settings, Activity, Cpu, Memory, Wifi, Terminal, Shield, Zap } from 'lucide-react';
import type { Project } from '../types';

interface MineflayerProps {
  projects: Project[];
}

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

const MineflayerPage: React.FC<MineflayerProps> = ({ projects }) => {
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
    
    // Simulate bot starting
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
    
    // Simulate bot stopping
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
    
    // Simulate bot restart
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
    
    // Simulate fetching logs
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
      <h1 className="main-title">Mineflayer Bot</h1>
      <div className="grid-layout">
        <div className="bots-column">
          <div className="bots-header">
            <h2 className="bots-title">Your Bots</h2>
            <button className="btn-primary" onClick={handleAddNewBot}>
              <Plus className='inline-icon'/> Add New Bot
          <div className="projects-header">
            <h2 className="projects-title">Your Bot</h2>
            <button className="btn-primary" onClick={handleAddNewProject}>
              <Plus className='inline-icon'/> Add New Project
            </button>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-info">
                  <p className="project-title">{project.title}</p>
                  {project.url && project.url !== '#' ? (
                    <a href={project.url} target="_blank" rel="noreferrer" className="project-url">
                      <Globe className='icon-url'/> {new URL(project.url).hostname}
                    </a>
                  ) : (
                    <span className="project-url" style={{color: '#9ca3af'}}>
                      <Code className='icon-url'/> No Public URL
                    </span>
                  )}
                </div>
                <span className={`project-status ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
                <button className="btn-logs" onClick={() => handleViewLogs(project.title)}>
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="stats-column">
          <div className="stats-card">
            <h3 className="stats-title">Alerts</h3>
            <p className="alerts-text">Get alerted for anomalies.</p>
            <button className="btn-secondary">Automatically monitor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MineflayerPage;