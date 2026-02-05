import React, { useEffect, useState } from 'react';
import type { Project } from './types';
import { LayoutDashboard, Settings, Zap, AlertTriangle, MessageSquare, Bot, Layers, BrainCircuit, ChevronDown, ChevronRight } from 'lucide-react';
import OverviewPage from './pages/Overview';
import ProjectsPage from './pages/project';
import SettingPage from './pages/Setting';
import MineflayerPage from './pages/Mineflayer';
import AiPage from './pages/ai';
import AllProjectsPage from './pages/AllProjects';
import ActiveProjectsPage from './pages/ActiveProjects';
import RecentlyTouchedPage from './pages/RecentlyTouched';
import DonePage from './pages/Done';
import DashboardPage from './pages/Dashboard';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((_err) => {
        setError("Gagal memuat proyek. Pastikan server API berjalan!");
        setLoading(false);
      });
  }, []);

  // --- Fungsi Event Handler untuk Tombol ---

  const handleFeedback = () => {
    alert("Terima kasih atas feedback Anda! Fitur modal/form akan segera hadir.");
  };
  // --- Rendering Conditional Content ---

  const renderContent = () => {
    if (loading) {
      return (<div className="loading-state"><Zap className='loading-icon' /> Memuat modul EronasLab...</div>);
    }
    if (error) {
      return (<div className="error-state"><AlertTriangle className='error-icon' /> {error}</div>);
    }

    if (activePage.startsWith('overview')) {
      return <OverviewPage projects={projects} />;
    }
    if (activePage.startsWith('projects')) {
      return <ProjectsPage projects={projects} />;
    }
    if (activePage === 'Mineflayerbot') {
      return <MineflayerPage projects={projects} />;
    }
    if (activePage === 'AllProjects') {
      return <AllProjectsPage projects={projects} />;
    }
    if (activePage === 'settings') {
      return <SettingPage />;
    }
    if (activePage === 'ai') {
      return <AiPage />;
    }
    if (activePage === 'activeproject') {
      return <ActiveProjectsPage projects={projects} />;
    }
    if (activePage === 'recentlytouched') {
      return <RecentlyTouchedPage projects={projects} />;
    }
    if (activePage === 'done') {
      return <DonePage projects={projects} />;
    }
    if (activePage === 'dashboard') {
      return <DashboardPage projects={projects} />;
    }

    // Default: activePage === 'overview' atau 'projects'
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-section">
          <Zap className="icon-logo" />
          <span className="logo-text">EronasLab</span>
        </div>
        <nav className="nav-menu">
          {/* Navigasi Sidebar menggunakan state setActivePage */}
          {/* Overview Section with Submenu */}
          <a href="#" className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault(); setActivePage('dashboard');
            }}
          >
            <Settings className="icon-nav" /> Dashboard
          </a>
          <div className="nav-group">
            {/* Removed orphaned </a> */}
            <a
              href="#"
              className={`nav-item ${activePage.startsWith('overview') ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setOverviewExpanded(!overviewExpanded);
              }}
            >
              <LayoutDashboard className="icon-nav" />
              <span>Overview</span>
              {overviewExpanded ? <ChevronDown className="icon-chevron" size={16} style={{marginLeft: 'auto'}}/> : <ChevronRight className="icon-chevron" size={16} style={{marginLeft: 'auto'}}/>}
            </a>
            {overviewExpanded && (
              <div className="nav-sub-menu">
                <a href="#" className={`nav-item nav-sub-item ${activePage === 'activeproject' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActivePage('activeproject'); }}>
                  <span style={{ marginRight: '12px', color: '#4b5563', fontSize: '14px',fontFamily: 'monospace' }}>└─</span>  
                  <LayoutDashboard className="icon-nav" /> Active Projects
                </a>
                <a href="#" className={`nav-item nav-sub-item ${activePage === 'recentlytouched' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActivePage('recentlytouched'); }}>
                  <span style={{ marginRight: '12px', color: '#4b5563', fontSize: '14px',fontFamily: 'monospace' }}>└─</span>  
                  <LayoutDashboard className="icon-nav" /> Recently Touched
                </a>
              </div>
            )}
          </div>

          {/* Projects Section with Submenu */}
          <div className="nav-group">
            <a
              href="#"
              className={`nav-item ${activePage.startsWith('projects') ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setProjectsExpanded(!projectsExpanded);
              }}
            >
              <Layers className="icon-nav" />
              <span>Project</span>
              {projectsExpanded ? <ChevronDown className="icon-chevron" size={16} style={{marginLeft: 'auto'}}/> : <ChevronRight className="icon-chevron" size={16} style={{marginLeft: 'auto'}}/>}
            </a>
            {projectsExpanded && (
              <div className="nav-sub-menu">
                <a href="#" className={`nav-item nav-sub-item ${activePage === 'AllProjects' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActivePage('AllProjects'); }}>
                  <span style={{ marginRight: '12px', color: '#4b5563', fontSize: '14px',fontFamily: 'monospace' }}>└─</span>  
                  <Layers className="icon-nav" /> All Projects
                </a>
                <a href="#" className={`nav-item nav-sub-item ${activePage === 'done' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActivePage('done'); }}>
                  <span style={{ marginRight: '12px', color: '#4b5563', fontSize: '14px',fontFamily: 'monospace' }}>└─</span>  
                  <Layers className="icon-nav" /> Done
                </a>
              </div>
            )}
          </div>
          <a href="#" className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault(); setActivePage('settings');
            }}
          >
            <Settings className="icon-nav" /> Settings
          </a>
          <a href="#" className={`nav-item ${activePage === 'Mineflayerbot' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault(); setActivePage('Mineflayerbot');
            }}
          >
            <Bot className="icon-nav" /> Mineflayer bot
          </a>
          <a href="#" className={`nav-item ${activePage === 'ai' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault(); setActivePage('ai');
            }}
          >
            <BrainCircuit className="icon-nav" /> Artificial Inteligent
          </a>


        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="header-path">Eronas projects</div>
          <div className="header-actions">
            {/* Tombol Feedback menggunakan event handler */}
            <button className="btn-feedback" onClick={handleFeedback}>
              <MessageSquare className='inline-icon' /> Feedback
            </button>
            <div className="user-avatar">E</div>
          </div>
        </header>

        <div className="main-scroll-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
