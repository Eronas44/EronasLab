// src/pages/project.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Settings, Activity, Clock, 
  Database, GitBranch, Terminal, Play, Pause, Square,
  Upload, Trash2, Edit, Save, X,
  AlertCircle, CheckCircle, TrendingUp
} from 'lucide-react';
import type { Project } from '../types';

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectPage: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'settings' | 'deploy'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  // Find the project by ID
  const project = projects.find(p => p.id === parseInt(id || '0')) || {
    id: 1,
    title: 'Sample Project',
    status: 'Running' as const,
    tech: 'React',
    url: 'https://example.com'
  };

  const [projectState, setProjectState] = useState(project);

  React.useEffect(() => {
    setProjectName(project.title);
    setProjectUrl(project.url);
  }, [project]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveEdit = () => {
    setProjectState(prev => ({ ...prev, title: projectName, url: projectUrl }));
    setIsEditing(false);
    alert('Project updated successfully!');
  };

  const handleCancelEdit = () => {
    setProjectName(project.title);
    setProjectUrl(project.url);
    setIsEditing(false);
  };

  const handleAction = (action: string) => {
    console.log(`Performing ${action} on project: ${project.title}`);
    alert(`${action} action executed for ${project.title}`);
  };

  const stats = [
    { label: 'Status', value: projectState.status, icon: <Activity className="w-4 h-4" />, color: projectState.status === 'Running' ? '#10b981' : '#ef4444' },
    { label: 'Uptime', value: '24h 15m', icon: <Clock className="w-4 h-4" />, color: '#3b82f6' },
    { label: 'CPU Usage', value: '45%', icon: <TrendingUp className="w-4 h-4" />, color: '#8b5cf6' },
    { label: 'Memory', value: '2.1GB', icon: <Database className="w-4 h-4" />, color: '#f59e0b' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { id: 'logs', label: 'Logs', icon: <Terminal className="w-4 h-4" /> },
    { id: 'deploy', label: 'Deploy', icon: <Upload className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="container">
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={handleBack}
            style={{ 
              background: 'none', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          {isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}
              />
              <button
                onClick={handleSaveEdit}
                style={{ 
                  background: '#10b981', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  padding: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                style={{ 
                  background: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  padding: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{projectState.title}</h1>
              <button
                onClick={() => setIsEditing(true)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => handleAction('start')}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Play className="w-4 h-4" />
            Start
          </button>
          <button
            onClick={() => handleAction('stop')}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
          <button
            onClick={() => handleAction('restart')}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Pause className="w-4 h-4" />
            Restart
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} className="stats-card" style={{ 
            background: `${stat.color}15`,
            border: `1px solid ${stat.color}30`,
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{stat.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="stats-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Project Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Project Information</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Project ID:</span>
                    <span style={{ fontWeight: 'bold' }}>#{projectState.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Technology:</span>
                    <span style={{ fontWeight: 'bold' }}>{projectState.tech}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Status:</span>
                    <span style={{ 
                      fontWeight: 'bold',
                      color: projectState.status === 'Running' ? '#10b981' : '#ef4444'
                    }}>
                      {projectState.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>URL:</span>
                    {projectState.url && projectState.url !== '#' ? (
                      <a href={projectState.url} target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>
                        {new URL(projectState.url).hostname}
                      </a>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>No Public URL</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Recent Activity</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Deployment successful</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>2 hours ago</span>
                  </div>
                  <div style={{ padding: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <GitBranch className="w-4 h-4" style={{ color: '#3b82f6' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>New branch created</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>5 hours ago</span>
                  </div>
                  <div style={{ padding: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <AlertCircle className="w-4 h-4" style={{ color: '#f59e0b' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>High memory usage detected</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="stats-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Application Logs</h3>
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
              <div>[2024-01-15 10:30:45] INFO: Application started successfully</div>
              <div>[2024-01-15 10:30:46] INFO: Database connection established</div>
              <div>[2024-01-15 10:30:47] INFO: Server listening on port 3000</div>
              <div>[2024-01-15 10:31:12] DEBUG: Processing request GET /api/users</div>
              <div>[2024-01-15 10:31:13] DEBUG: Request completed in 45ms</div>
              <div>[2024-01-15 10:32:15] WARNING: High memory usage detected (85%)</div>
              <div>[2024-01-15 10:32:16] INFO: Garbage collection triggered</div>
              <div>[2024-01-15 10:33:20] ERROR: Database connection timeout</div>
              <div>[2024-01-15 10:33:21] INFO: Attempting to reconnect...</div>
              <div>[2024-01-15 10:33:22] INFO: Database connection restored</div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary">Download Logs</button>
              <button className="btn-secondary">Clear Logs</button>
              <button className="btn-secondary">Real-time Mode</button>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="stats-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Deployment Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Deployment Configuration</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Branch
                    </label>
                    <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                      <option>main</option>
                      <option>develop</option>
                      <option>feature/new-ui</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Environment
                    </label>
                    <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                      <option>Production</option>
                      <option>Staging</option>
                      <option>Development</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Deployment History</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>v1.2.3</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Deployed to production</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#10b981', fontSize: '0.875rem' }}>Success</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>2 hours ago</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>v1.2.2</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Deployed to staging</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#10b981', fontSize: '0.875rem' }}>Success</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Upload className="w-4 h-4" style={{ marginRight: '0.5rem' }} />
                Deploy Now
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="stats-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Project Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Basic Settings</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Project URL
                    </label>
                    <input
                      type="url"
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Danger Zone</h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn-secondary"
                    style={{ backgroundColor: '#ef4444', color: 'white' }}
                    onClick={() => handleAction('delete')}
                  >
                    <Trash2 className="w-4 h-4" style={{ marginRight: '0.5rem' }} />
                    Delete Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;