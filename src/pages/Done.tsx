import React, { useState, useMemo } from 'react';
import { Globe, Code, Archive, Calendar, Clock, TrendingUp, Filter, Download, RefreshCw } from 'lucide-react';
import type { Project } from '../types';

interface DoneProps {
  projects: Project[];
}

const DonePage: React.FC<DoneProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [showFilters, setShowFilters] = useState(false);

  // Simulate completed projects (in real app, this would come from API)
  const completedProjects = useMemo(() => {
    return projects.map((project, index) => ({
      ...project,
      completedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random completion date
      duration: Math.floor(Math.random() * 365) + 1, // Random duration in days
      archived: index % 3 === 0 // Every 3rd project is archived
    }));
  }, [projects]);

  // Filter completed projects
  const filteredProjects = useMemo(() => {
    let filtered = completedProjects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply time filter
    const now = new Date();
    if (timeFilter !== 'all') {
      const filterDate = new Date();
      switch (timeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      filtered = filtered.filter(project => project.completedDate >= filterDate);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.completedDate.getTime() - a.completedDate.getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        case 'status':
          return (a.archived ? 1 : 0) - (b.archived ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [completedProjects, searchTerm, timeFilter, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCompleted = completedProjects.length;
    const archived = completedProjects.filter(p => p.archived).length;
    const thisWeek = completedProjects.filter(p => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return p.completedDate >= weekAgo;
    }).length;
    const thisMonth = completedProjects.filter(p => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return p.completedDate >= monthAgo;
    }).length;

    return { totalCompleted, archived, thisWeek, thisMonth };
  }, [completedProjects]);

  const handleViewLogs = (projectName: string) => {
    console.log(`Melihat log untuk proyek: ${projectName}`);
    alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };

  const handleRestore = (projectTitle: string) => {
    console.log(`Restoring project: ${projectTitle}`);
    alert(`Project ${projectTitle} has been restored to active projects.`);
  };

  const handleArchive = (projectTitle: string) => {
    console.log(`Archiving project: ${projectTitle}`);
    alert(`Project ${projectTitle} has been archived.`);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'completed-projects.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTimeFilter('all');
    setSortBy('date');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="container">
      <h1 className="main-title">Completed Projects</h1>
      
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
            <Archive className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {stats.totalCompleted}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Total Completed
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
            <Calendar className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {stats.thisWeek}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            This Week
          </p>
        </div>
        
        <div className="stats-card" style={{ 
          background: '#3b82f615',
          border: '1px solid #3b82f630',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>
            <Clock className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {stats.thisMonth}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            This Month
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
            <Archive className="w-6 h-6" />
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            {stats.archived}
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Archived
          </p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search completed projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
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
              {/* Time Filter */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                  Time Period
                </label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as any)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week ({stats.thisWeek})</option>
                  <option value="month">This Month ({stats.thisMonth})</option>
                  <option value="year">This Year</option>
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
                  <option value="date">Completion Date</option>
                  <option value="name">Project Name</option>
                  <option value="status">Archive Status</option>
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
            Showing {filteredProjects.length} of {completedProjects.length} completed projects
          </span>
          {(searchTerm || timeFilter !== 'all') && (
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
            <h2 className="projects-title">Completed Projects ({filteredProjects.length})</h2>
          </div>
          <div className="projects-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="project-card" style={{
                  borderLeft: project.archived ? '4px solid #8b5cf6' : '4px solid #10b981'
                }}>
                  <div className="project-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <p className="project-title">{project.title}</p>
                      {project.archived && (
                        <span style={{ 
                          fontSize: '0.75rem', 
                          color: '#6b7280', 
                          backgroundColor: '#f3f4f6', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px' 
                        }}>
                          <Archive className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                          Archived
                        </span>
                      )}
                    </div>
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
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280'
                      }}>
                        Completed: {formatDate(project.completedDate)}
                      </span>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280'
                      }}>
                        Duration: {project.duration} days
                      </span>
                    </div>
                    {project.url && project.url !== '#' ? (
                      <a href={project.url} target="_blank" rel="noreferrer" className="project-url">
                        <Globe className="icon-url"/> {new URL(project.url).hostname}
                      </a>
                    ) : (
                      <span className="project-url" style={{color: '#9ca3af'}}>
                        <Code className="icon-url"/> No Public URL
                      </span>
                    )}
                  </div>
                  <span className={`project-status ${project.status.toLowerCase()}`}>
                    Completed
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-logs" onClick={() => handleViewLogs(project.title)}>
                      Logs
                    </button>
                    {!project.archived ? (
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        onClick={() => handleArchive(project.title)}
                      >
                        <Archive className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                        Archive
                      </button>
                    ) : (
                      <button 
                        className="btn-secondary" 
                        style={{ 
                          padding: '0.25rem 0.5rem', 
                          fontSize: '0.75rem',
                          backgroundColor: '#10b981',
                          color: 'white'
                        }}
                        onClick={() => handleRestore(project.title)}
                      >
                        <RefreshCw className="w-3 h-3" style={{ marginRight: '0.25rem' }} />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                <Archive className="w-12 h-12" style={{ margin: '0 auto', color: '#d1d5db' }} />
                <h3 style={{ marginBottom: '0.5rem', color: '#374151' }}>No completed projects</h3>
                <p style={{ marginBottom: '1rem' }}>
                  {searchTerm || timeFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Completed projects will appear here when you finish them'}
                </p>
                {(searchTerm || timeFilter !== 'all') && (
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
            <h3 className="stats-title">Completion Analytics</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Total Completed</span>
                <span style={{ fontWeight: 'bold' }}>{stats.totalCompleted}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>This Week</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>{stats.thisWeek}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>This Month</span>
                <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{stats.thisMonth}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Archived</span>
                <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>{stats.archived}</span>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Completion Rate</h4>
              <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: '75%', 
                  height: '100%', 
                  backgroundColor: '#10b981',
                  borderRadius: '4px'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>75% Completion Rate</span>
                <TrendingUp className="w-4 h-4" style={{ color: '#10b981' }} />
              </div>
            </div>
            <button className="btn-secondary">Generate Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonePage;
