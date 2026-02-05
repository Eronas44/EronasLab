import React from 'react';
import { Globe, Code, Plus, Activity, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import type { Project } from '../types';

interface ActiveProjectsProps {
  projects: Project[];
}

const ActiveProjectsPage: React.FC<ActiveProjectsProps> = ({ projects }) => {
  const activeProjects = projects.filter(p => p.status === 'Running');
  const totalActiveTime = activeProjects.length * 24; // Example calculation
  const avgUptime = activeProjects.length > 0 ? Math.round(totalActiveTime / activeProjects.length) : 0;

  const handleAddNewProject = () => {
    alert("Mengarahkan ke halaman pembuatan proyek baru...");
  };

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  const handleRestart = (projectName: string) => {
    console.log(`Restarting project: ${projectName}`);
    alert(`Restarting ${projectName}...`);
  };

  const handleStop = (projectName: string) => {
    console.log(`Stopping project: ${projectName}`);
    alert(`Stopping ${projectName}...`);
  };

  const activeStats = [
    {
      title: 'Active Projects',
      value: activeProjects.length.toString(),
      icon: <Activity className="w-4 h-4" />,
      color: '#10b981'
    },
    {
      title: 'Avg Uptime',
      value: `${avgUptime}h`,
      icon: <Clock className="w-4 h-4" />,
      color: '#3b82f6'
    },
    {
      title: 'Performance',
      value: '98%',
      icon: <TrendingUp className="w-4 h-4" />,
      color: '#8b5cf6'
    },
    {
      title: 'Alerts',
      value: '2',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: '#f59e0b'
    }
  ];

  return (
    <div className="container">
      <h1 className="main-title">Active Projects</h1>
      
      {/* Active Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {activeStats.map((stat, index) => (
          <div key={index} className="stats-card" style={{ 
            background: `${stat.color}15`,
            border: `1px solid ${stat.color}30`,
            borderRadius: '8px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ color: stat.color, marginBottom: '0.5rem' }}>
              {stat.icon}
            </div>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>{stat.value}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Active Projects ({activeProjects.length})</h2>
            <button className="btn-primary" onClick={handleAddNewProject}>
              <Plus className='inline-icon'/> Add New Project
            </button>
          </div>
          <div className="projects-list">
            {activeProjects.length > 0 ? (
              activeProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: '#10b981',
                        animation: 'pulse 2s infinite'
                      }}></div>
                      <p className="project-title">{project.title}</p>
                    </div>
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
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-logs" onClick={() => handleViewLogs(project.title)}>
                      Logs
                    </button>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      onClick={() => handleRestart(project.title)}
                    >
                      Restart
                    </button>
                    <button 
                      className="btn-secondary" 
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        fontSize: '0.75rem',
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }}
                      onClick={() => handleStop(project.title)}
                    >
                      Stop
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                No active projects
              </div>
            )}
          </div>
        </div>
        
        <div className="stats-column">
          <div className="stats-card">
            <h3 className="stats-title">Performance Monitor</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>CPU Usage</span>
                <span style={{ fontWeight: 'bold' }}>67%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '67%', height: '100%', backgroundColor: '#10b981' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Memory</span>
                <span style={{ fontWeight: 'bold' }}>4.1GB / 8GB</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '51%', height: '100%', backgroundColor: '#3b82f6' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Network I/O</span>
                <span style={{ fontWeight: 'bold' }}>125 MB/s</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '35%', height: '100%', backgroundColor: '#8b5cf6' }}></div>
              </div>
            </div>
            <button className="btn-secondary">View Detailed Metrics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectsPage;
