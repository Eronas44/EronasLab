import React, { useState } from 'react';
import { Globe, Code, Plus, Star, Clock, Zap, Settings } from 'lucide-react';
import type { Project } from '../types';

interface OverviewProps {
  projects: Project[];
}

const OverviewPage: React.FC<OverviewProps> = ({ projects }) => {
  const [favorites, setFavorites] = useState<number[]>([1, 3]); // Example favorite project IDs
  const [quickActions] = useState([
    { icon: <Zap className="w-4 h-4" />, label: 'Quick Deploy', action: 'deploy' },
    { icon: <Clock className="w-4 h-4" />, label: 'Schedule Task', action: 'schedule' },
    { icon: <Settings className="w-4 h-4" />, label: 'Configure', action: 'configure' }
  ]);

  const favoriteProjects = projects.filter(p => favorites.includes(p.id));
  const recentProjects = [...projects].slice(0, 5);

  const toggleFavorite = (projectId: number) => {
    setFavorites(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleAddNewProject = () => {
    alert("Mengarahkan ke halaman pembuatan proyek baru...");
  };

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  const handleQuickAction = (action: string, projectTitle: string) => {
    console.log(`Quick action ${action} for project: ${projectTitle}`);
    alert(`Executing ${action} for ${projectTitle}`);
  };

  return (
    <div className="container">
      <h1 className="main-title">Overview</h1>
      
      {/* Quick Actions Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="btn-secondary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.75rem 1.5rem'
              }}
              onClick={() => handleQuickAction(action.action, 'Global')}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Your Favorites ({favoriteProjects.length})</h2>
            <button className="btn-primary" onClick={handleAddNewProject}>
              <Plus className='inline-icon'/> Add New Project
            </button>
          </div>
          <div className="projects-list">
            {favoriteProjects.length > 0 ? (
              favoriteProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => toggleFavorite(project.id)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          color: '#fbbf24'
                        }}
                      >
                        <Star className="w-4 h-4" fill="currentColor" />
                      </button>
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
                      onClick={() => handleQuickAction('deploy', project.title)}
                    >
                      Deploy
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                No favorite projects yet. Click the star icon to add favorites.
              </div>
            )}
          </div>
        </div>
        
        <div className="stats-column">
          <div className="stats-card">
            <h3 className="stats-title">Recent Activity</h3>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Recently accessed projects:</p>
              {recentProjects.map((project) => (
                <div key={project.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <span style={{ fontSize: '0.875rem' }}>{project.title}</span>
                  <button
                    onClick={() => toggleFavorite(project.id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      color: favorites.includes(project.id) ? '#fbbf24' : '#d1d5db'
                    }}
                  >
                    <Star className="w-4 h-4" fill={favorites.includes(project.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-secondary">View All Projects</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;