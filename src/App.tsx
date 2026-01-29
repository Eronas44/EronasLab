import React, { useEffect, useState } from 'react';
import type{ Project, UsageStat } from './types';
import { LayoutDashboard, Settings, Globe, Code, Zap, AlertTriangle, MessageSquare, Plus } from 'lucide-react'; 

const MOCK_USAGE: UsageStat[] = [
  { id: 1, label: 'Edge Requests', value: '1.2K', limit: '1M' },
  { id: 2, label: 'Fast Data Transfer', value: '15.58 MB', limit: '100 GB' },
  { id: 3, label: 'Edge Request CPU Duration', value: '0s', limit: '1h' },
  { id: 4, label: 'Fast Origin Transfer', value: '0', limit: '10 GB' },
];

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [_usageStats] = useState<UsageStat[]>(MOCK_USAGE); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [activePage, setActivePage] = useState<'overview' | 'projects' | 'settings'>('overview');


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

  const handleAddNewProject = () => {
      alert("Mengarahkan ke halaman pembuatan proyek baru...");
      // Di aplikasi nyata, ini bisa menjadi navigasi atau modal
  };

  const handleUpgrade = () => {
      window.location.href = "https://vercel.com"; // Contoh link eksternal
  };

  const handleViewLogs = (projectName: string) => {
      console.log(`Melihat log untuk proyek: ${projectName}`);
      alert(`Menampilkan jendela log untuk ${projectName}. Cek konsol browser.`);
  };


  // --- Rendering Conditional Content ---

  const renderContent = () => {
    if (loading) {
      return (<div className="loading-state"><Zap className='loading-icon' /> Memuat modul EronasLab...</div>);
    }
    if (error) {
        return (<div className="error-state"><AlertTriangle className='error-icon'/> {error}</div>);
    }

    if (activePage === 'settings') {
        return <h1 className="main-title">Halaman Pengaturan (Belum Diimplementasikan)</h1>;
    }
    
    // Default: activePage === 'overview' atau 'projects'
    return (
        <div className="container">
            <h1 className="main-title">Overview</h1>
            <div className="grid-layout">
                <div className="projects-column">
                    <div className="projects-header">
                        <h2 className="projects-title">Your Favorites</h2>
                        <button className="btn-primary" onClick={handleAddNewProject}>
                            <Plus className='inline-icon'/> Add New Project
                        </button>
                    </div>
                    <div className="projects-list">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-info">
                                    <p className="project-title">{project.title}</p>
                                    {project.url && project.url !== '#' ? (
                                        <a href={project.url} target="_blank" className="project-url">
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
                                {/* Tambahkan tombol Log di sini */}
                                <button className="btn-logs" onClick={() => handleViewLogs(project.title)}>
                                    Logs
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="stats-column">
                    <div className="stats-card">
                        <div className="stats-header">
                            <h3 className="stats-title">Usage (Last 30 days)</h3>
                            <button className="btn-upgrade" onClick={handleUpgrade}>Upgrade</button>
                        </div>
                        {/* ... (Statistik penggunaan tetap sama) ... */}
                    </div>
                    <div className="stats-card">
                        <h3 className="stats-title">Alerts</h3>
                        <p className="alerts-text">Get alerted for anomalies.</p>
                        <button className="btn-secondary">Automatically monitor</button>
                    </div>
                </div>
            </div>
        </div>
    );
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
            <a href="#" className={`nav-item ${activePage === 'overview' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActivePage('overview');}}>
              <LayoutDashboard className="icon-nav" /> Overview
            </a>
            <a href="#" className={`nav-item ${activePage === 'projects' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActivePage('projects');}}>
              <Code className="icon-nav" /> Projects
            </a>
            <a href="#" className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActivePage('settings');}}>
              <Settings className="icon-nav" /> Settings
            </a>
          </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="header-path">Eronas projects</div>
          <div className="header-actions">
            {/* Tombol Feedback menggunakan event handler */}
            <button className="btn-feedback" onClick={handleFeedback}>
                <MessageSquare className='inline-icon'/> Feedback
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
