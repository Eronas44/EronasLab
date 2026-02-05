import React, { useState, useMemo } from 'react';
import { Globe, Code, Clock, Calendar, User, Activity, Filter, Search, TrendingUp, Eye } from 'lucide-react';
import type { Project } from '../types';

interface RecentlyTouchedProps {
  projects: Project[];
}

interface ActivityItem {
  id: string;
  projectTitle: string;
  action: string;
  timestamp: Date;
  user: string;
  details: string;
  type: 'view' | 'edit' | 'deploy' | 'start' | 'stop' | 'restart' | 'access';
}

const RecentlyTouchedPage: React.FC<RecentlyTouchedProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [activityFilter, setActivityFilter] = useState<'all' | 'view' | 'edit' | 'deploy' | 'system'>('all');

  // Generate mock activity data
  const activities = useMemo(() => {
    const now = new Date();
    return projects.flatMap((project, index) => {
      const baseActivities: ActivityItem[] = [
        {
          id: `activity-${index}-1`,
          projectTitle: project.title,
          action: 'Viewed project dashboard',
          timestamp: new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000),
          user: 'John Doe',
          details: 'Checked project statistics and performance metrics',
          type: 'view'
        },
        {
          id: `activity-${index}-2`,
          projectTitle: project.title,
          action: 'Edited project settings',
          timestamp: new Date(now.getTime() - Math.random() * 12 * 60 * 60 * 1000),
          user: 'John Doe',
          details: 'Updated environment variables and deployment configuration',
          type: 'edit'
        },
        {
          id: `activity-${index}-3`,
          projectTitle: project.title,
          action: 'Deployed to production',
          timestamp: new Date(now.getTime() - Math.random() * 6 * 60 * 60 * 1000),
          user: 'Jane Smith',
          details: `Deployed version 1.2.3 to production server`,
          type: 'deploy'
        },
        {
          id: `activity-${index}-4`,
          projectTitle: project.title,
          action: 'Started application',
          timestamp: new Date(now.getTime() - Math.random() * 3 * 60 * 60 * 1000),
          user: 'John Doe',
          details: 'Application started successfully',
          type: 'start'
        },
        {
          id: `activity-${index}-5`,
          projectTitle: project.title,
          action: 'Accessed API endpoints',
          timestamp: new Date(now.getTime() - Math.random() * 2 * 60 * 60 * 1000),
          user: 'API User',
          details: 'Made 145 API calls in the last hour',
          type: 'access'
        }
      ];
      return baseActivities;
    });
  }, [projects]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    let filtered = activities;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (timeFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      filtered = filtered.filter(activity => activity.timestamp >= filterDate);
    }

    // Apply activity type filter
    if (activityFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === activityFilter);
    }

    // Sort by timestamp (most recent first)
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [activities, searchTerm, timeFilter, activityFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setTimeFilter('all');
    setActivityFilter('all');
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hours ago`;
    } else {
      return 'Just now';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view': return <Eye className="w-4 h-4" />;
      case 'edit': return <Code className="w-4 h-4" />;
      case 'deploy': return <TrendingUp className="w-4 h-4" />;
      case 'start': return <Activity className="w-4 h-4" />;
      case 'access': return <Globe className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'view': return '#3b82f6';
      case 'edit': return '#f59e0b';
      case 'deploy': return '#10b981';
      case 'start': return '#10b981';
      case 'access': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Recently Touched</h1>
      
      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search activities..."
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

          {/* Time Filter */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Activity Filter */}
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value as any)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">All Activities</option>
            <option value="view">Views Only</option>
            <option value="edit">Edits Only</option>
            <option value="deploy">Deployments Only</option>
            <option value="system">System Only</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>

        {/* Results Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Showing {filteredActivities.length} of {activities.length} activities
          </span>
          {(searchTerm || timeFilter !== 'all' || activityFilter !== 'all') && (
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
            <h2 className="projects-title">Activity Timeline ({filteredActivities.length})</h2>
          </div>
          <div className="projects-list">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="project-card" style={{
                  borderLeft: `4px solid ${getActivityColor(activity.type)}`
                }}>
                  <div className="project-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        backgroundColor: getActivityColor(activity.type),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="project-title">{activity.projectTitle}</p>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280', 
                          margin: '0.25rem 0',
                          fontStyle: 'italic'
                        }}>
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      marginTop: '0.25rem',
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <User className="w-3 h-3" />
                        <span>{activity.user}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar className="w-3 h-3" />
                        <span>{formatTimestamp(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '0.75rem', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    {activity.details}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                <Clock className="w-12 h-12" style={{ margin: '0 auto', color: '#d1d5db' }} />
                <h3 style={{ marginBottom: '0.5rem', color: '#374151' }}>No recent activity</h3>
                <p style={{ marginBottom: '1rem' }}>
                  {searchTerm || timeFilter !== 'all' || activityFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Your recent activity will appear here'}
                </p>
                {(searchTerm || timeFilter !== 'all' || activityFilter !== 'all') && (
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
            <h3 className="stats-title">Activity Statistics</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Total Activities</span>
                <span style={{ fontWeight: 'bold' }}>{activities.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Today's Activity</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                  {activities.filter(a => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return a.timestamp >= today;
                  }).length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>This Week</span>
                <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
                  {activities.filter(a => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return a.timestamp >= weekAgo;
                  }).length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Most Active User</span>
                <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>John Doe</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Activity Breakdown</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#6b7280' }}>Views</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{ 
                        width: '35%', 
                        height: '100%', 
                        backgroundColor: '#3b82f6',
                        borderRadius: '4px'
                      }}></div>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {activities.filter(a => a.type === 'view').length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#6b7280' }}>Edits</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{ 
                        width: '25%', 
                        height: '100%', 
                        backgroundColor: '#f59e0b',
                        borderRadius: '4px'
                      }}></div>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {activities.filter(a => a.type === 'edit').length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#6b7280' }}>Deployments</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{ 
                        width: '20%', 
                        height: '100%', 
                        backgroundColor: '#10b981',
                        borderRadius: '4px'
                      }}></div>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {activities.filter(a => a.type === 'deploy').length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>System</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{ 
                        width: '20%', 
                        height: '100%', 
                        backgroundColor: '#8b5cf6',
                        borderRadius: '4px'
                      }}></div>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {activities.filter(a => a.type === 'start' || a.type === 'access').length}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="btn-secondary">Generate Activity Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyTouchedPage;
