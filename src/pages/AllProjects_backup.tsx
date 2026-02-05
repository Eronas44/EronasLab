import React, { useState, useMemo } from 'react';
import { Globe, Code, Plus, Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import type { Project } from '../types';

interface AllProjectsProps {
  projects: Project[];
}

const AllProjectsPage: React.FC<AllProjectsProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Running' | 'Stopped'>('all');
  const [techFilter, setTechFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'tech'>('name');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique technologies for filter
  const technologies = useMemo(() => {
    const techs = [...new Set(projects.map(p => p.tech))];
    return techs;
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Apply technology filter
    if (techFilter !== 'all') {
      filtered = filtered.filter(project => project.tech === techFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'tech':
          return a.tech.localeCompare(b.tech);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, statusFilter, techFilter, sortBy]);

  const handleAddNewProject = () => {
    alert("Mengarahkan ke halaman pembuatan proyek baru...");
  };

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTechFilter('all');
    setSortBy('name');
  };

  const activeCount = projects.filter(p => p.status === 'Running').length;
  const stoppedCount = projects.filter(p => p.status === 'Stopped').length;

  return (
    <div className="container">
      <h1 className="main-title">All Projects</h1>
      
      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <Search className="w-4 h-4" style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem 0.75rem',
                border: 'none',
                background: viewMode === 'grid' ? '#3b82f6' : 'white',
                color: viewMode === 'grid' ? 'white' : '#374151',
                cursor: 'pointer'
              }}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem 0.75rem',
                border: 'none',
                background: viewMode === 'list' ? '#3b82f6' : 'white',
                color: viewMode === 'list' ? 'white' : '#374151',
                cursor: 'pointer'
              }}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f9fafb', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {/* Status Filter */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                >
                  <option value="all">All Status</option>
                  <option value="Running">Running ({activeCount})</option>
                  <option value="Stopped">Stopped ({stoppedCount})</option>
                </select>
              </div>

              {/* Technology Filter */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                  Technology
                </label>
                <select
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                >
                  <option value="all">All Technologies</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                >
                  <option value="name">Name</option>
                  <option value="status">Status</option>
                  <option value="tech">Technology</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          {(searchTerm || statusFilter !== 'all' || techFilter !== 'all') && (
            <button
              onClick={clearFilters}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#3b82f6', 
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">All Projects ({filteredProjects.length})</h2>
            <button className="btn-primary" onClick={handleAddNewProject}>
              <Plus className='inline-icon'/> Add New Project
            </button>
          </div>
          <div className="projects-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-info">
                    <p className="project-title">{project.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280', 
                        backgroundColor: '#f3f4f6', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px' 
                      }}>
                        {project.tech}
                      </span>
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
                  <button className="btn-logs" onClick={() => handleViewLogs(project.title)}>
                    Logs
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <Search className="w-12 h-12" style={{ margin: '0 auto', color: '#d1d5db' }} />
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: '#374151' }}>No projects found</h3>
                <p style={{ marginBottom: '1rem' }}>
                  {searchTerm || statusFilter !== 'all' || techFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by creating your first project'}
                </p>
                {(searchTerm || statusFilter !== 'all' || techFilter !== 'all') && (
                  <button onClick={clearFilters} className="btn-secondary">
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="stats-column">
          <div className="stats-card">
            <h3 className="stats-title">Project Overview</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Total Projects</span>
                <span style={{ fontWeight: 'bold' }}>{projects.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Running</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>{activeCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Stopped</span>
                <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{stoppedCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Technologies</span>
                <span style={{ fontWeight: 'bold' }}>{technologies.length}</span>
              </div>
            </div>
            <button className="btn-secondary">Export Project List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
