import React from 'react';
import { Globe, Code } from 'lucide-react';
import type { Project } from '../types';

interface RecentlyTouchedProps {
  projects: Project[];
}

const DashboardPage: React.FC<RecentlyTouchedProps> = ({ projects }) => {
  const recentProjects = [...projects].sort(() => Math.random() - 0.5).slice(0, 5);

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  return (
    <div className="container">
      <h1 className="main-title">Dashboard</h1>
      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Dashboard page</h2>
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
            <h3 className="stats-title">Recent Activity</h3>
            <p className="alerts-text">Your most recently accessed projects.</p>
            <button className="btn-secondary">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
