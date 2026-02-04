import React, { useEffect, useState } from 'react';
import type{ Project} from './types';
import { LayoutDashboard, Settings, Zap, AlertTriangle, MessageSquare, Bot, Layers, BrainCircuit } from 'lucide-react'; 
import OverviewPage from './pages/Overview';
import ProjectsPage from './pages/project';
import SettingPage from './pages/Setting';
import MineflayerPage from './pages/Mineflayer';
import AiPage from './pages/ai';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [activePage, setActivePage] = useState<'overview' | 'projects' | 'settings' | 'Mineflayerbot' | 'ai'>('overview');

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
        return (<div className="error-state"><AlertTriangle className='error-icon'/> {error}</div>);
    }

     if (activePage === 'overview') {
        return <OverviewPage projects={projects} />;
    }
     if (activePage === 'projects') {
        return <ProjectsPage />;
    }
     if (activePage === 'Mineflayerbot') {
        return <MineflayerPage projects={projects} />;
    }
     if (activePage === 'settings') {
        return <SettingPage />;
    }
     if (activePage === 'ai') {
        return <AiPage/>;
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
            <a href="#" className={`nav-item ${activePage === 'overview' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setActivePage('overview');}}>
              <LayoutDashboard className="icon-nav" /> Overview
            </a>
            <a href="#" className={`nav-item ${activePage === 'projects' ? 'active' : ''}`} 
              onClick={(e) => {e.preventDefault(); setActivePage('projects');
              }}
            >
              <Layers className="icon-nav" /> Project
            </a>
            <a href="#" className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} 
              onClick={(e) => {e.preventDefault(); setActivePage('settings');
              }}
            >
              <Settings className="icon-nav" /> Settings
            </a>
            <a href="#" className={`nav-item ${activePage === 'Mineflayerbot' ? 'active' : ''}`} 
              onClick={(e) => {e.preventDefault(); setActivePage('Mineflayerbot');
              }}
            >
              <Bot className="icon-nav" /> Mineflayer bot
            </a>
            <a href="#" className={`nav-item ${activePage === 'ai' ? 'active' : ''}`} 
              onClick={(e) => {e.preventDefault(); setActivePage('ai');
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
