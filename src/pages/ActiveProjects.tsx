import React from 'react';
import { Globe, Code, Plus } from 'lucide-react';
import type { Project } from '../types';

interface ActiveProjectsProps {
  projects: Project[];
}

const ActiveProjectsPage: React.FC<ActiveProjectsProps> = ({ projects }) => {
  const activeProjects = projects.filter(p => p.status === 'Running');

  const handleAddNewProject = () => {
    alert("Mengarahkan ke halaman pembuatan proyek baru...");
  };

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  return (
    <div className="container">
      <h1 className="main-title">Active Projects</h1>
      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Active Projects</h2>
            <button className="btn-primary" onClick={handleAddNewProject}>
              <Plus className='inline-icon'/> Add New Project
            </button>
          </div>
          <div className="projects-list">
            {activeProjects.length > 0 ? (
              activeProjects.map((project) => (
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
                No active projects
              </div>
            )}
          </div>
        </div>
        
        <div className="stats-column">
          <div className="stats-card">
            <h3 className="stats-title">Active Stats</h3>
            <p className="alerts-text">Monitor your active projects.</p>
            <button className="btn-secondary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectsPage;
