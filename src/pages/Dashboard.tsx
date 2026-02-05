import React from 'react';
import { Globe, Code, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import type { Project } from '../types';

interface DashboardProps {
  projects: Project[];
}

const DashboardPage: React.FC<DashboardProps> = ({ projects }) => {
  const recentProjects = [...projects].sort(() => Math.random() - 0.5).slice(0, 5);
  const runningProjects = projects.filter(p => p.status === 'Running');
  const stoppedProjects = projects.filter(p => p.status === 'Stopped');
  const totalProjects = projects.length;
  const activePercentage = totalProjects > 0 ? Math.round((runningProjects.length / totalProjects) * 100) : 0;

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects.toString(),
      icon: <Globe className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Running',
      value: runningProjects.length.toString(),
      icon: <Activity className="w-5 h-5" />,
      color: 'green'
    },
    {
      title: 'Stopped',
      value: stoppedProjects.length.toString(),
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'red'
    },
    {
      title: 'Active Rate',
      value: `${activePercentage}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'purple'
    }
  ];

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  return (
    <div className="container">
      <h1 className="main-title">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} className="stats-card" style={{ 
            background: `linear-gradient(135deg, ${stat.color === 'blue' ? '#3b82f6' : stat.color === 'green' ? '#10b981' : stat.color === 'red' ? '#ef4444' : '#8b5cf6'}15, ${stat.color === 'blue' ? '#3b82f6' : stat.color === 'green' ? '#10b981' : stat.color === 'red' ? '#ef4444' : '#8b5cf6'}05)`,
            border: `1px solid ${stat.color === 'blue' ? '#3b82f6' : stat.color === 'green' ? '#10b981' : stat.color === 'red' ? '#ef4444' : '#8b5cf6'}30`,
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ 
                color: stat.color === 'blue' ? '#3b82f6' : stat.color === 'green' ? '#10b981' : stat.color === 'red' ? '#ef4444' : '#8b5cf6'
              }}>
                {stat.icon}
              </div>
              <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{stat.title}</h3>
            </div>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Recent Activity</h2>
          </div>
          <div className="projects-list">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
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
                    Logs
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                No recent projects
              </div>
            )}
          </div>
        </div>
        
        <div className="stats-column">
          <div className="stats-card">
            <h3 className="stats-title">System Overview</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>CPU Usage</span>
                <span style={{ fontWeight: 'bold' }}>45%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: '#3b82f6' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Memory</span>
                <span style={{ fontWeight: 'bold' }}>2.3GB / 8GB</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '29%', height: '100%', backgroundColor: '#10b981' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Storage</span>
                <span style={{ fontWeight: 'bold' }}>120GB / 500GB</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '24%', height: '100%', backgroundColor: '#8b5cf6' }}></div>
              </div>
            </div>
            <button className="btn-secondary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
