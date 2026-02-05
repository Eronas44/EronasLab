import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { 
  Zap, Settings, Play, BarChart3,
  FileText, Upload, RefreshCw,
  Code, Shield
} from 'lucide-react';

interface AiTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'processing';
  category: 'analysis' | 'generation' | 'automation' | 'monitoring';
  usage: number;
  lastUsed: Date;
}

const AiPage: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string, timestamp: Date}>>([]);
  const [tools, setTools] = useState<AiTool[]>([
    {
      id: 'code-analysis',
      name: 'Code Analysis',
      description: 'Analyze code quality, security vulnerabilities, and performance',
      icon: <Code className="w-5 h-5" />,
      status: 'active',
      category: 'analysis',
      usage: 45,
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'text-generation',
      name: 'Text Generation',
      description: 'Generate human-like text, articles, and documentation',
      icon: <FileText className="w-5 h-5" />,
      status: 'active',
      category: 'generation',
      usage: 128,
      lastUsed: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 'image-generation',
      name: 'Image Generation',
      description: 'Create images from text descriptions using AI',
      icon: <Upload className="w-5 h-5" />,
      status: 'inactive',
      category: 'generation',
      usage: 23,
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Analyze datasets and generate insights',
      icon: <BarChart3 className="w-5 h-5" />,
      status: 'active',
      category: 'analysis',
      usage: 67,
      lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 'automation',
      name: 'Task Automation',
      description: 'Automate repetitive tasks and workflows',
      icon: <RefreshCw className="w-5 h-5" />,
      status: 'active',
      category: 'automation',
      usage: 34,
      lastUsed: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: 'monitoring',
      name: 'System Monitoring',
      description: 'Monitor system health and performance',
      icon: <Shield className="w-5 h-5" />,
      status: 'active',
      category: 'monitoring',
      usage: 89,
      lastUsed: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    const initPixi = async () => {
      const app = new PIXI.Application();
      await app.init({ 
        width: 400, 
        height: 300, 
        backgroundColor: 0x0a0a0a, 
        antialias: true 
      });

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);
      }

      // Enhanced brain visualization
      const brain = new PIXI.Graphics();
      app.stage.addChild(brain);

      const particles: PIXI.Graphics[] = [];
      for (let i = 0; i < 50; i++) {
        const particle = new PIXI.Graphics();
        particles.push(particle);
        app.stage.addChild(particle);
      }

      let time = 0;
      app.ticker.add((ticker) => {
        time += 0.02 * ticker.deltaTime;
        
        // Clear and redraw brain
        brain.clear();
        
        // Brain shape
        brain.ellipse(200, 150, 150, 95).fill({ color: 0x1a1a2e, alpha: 0.85 });
        brain.ellipse(200, 150, 130, 82).fill({ color: 0x16213e, alpha: 0.70 });
        
        // Neural connections
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time;
          const radius = 100 + Math.sin(time + i) * 20;
          const x = 200 + Math.cos(angle) * radius;
          const y = 150 + Math.sin(angle) * radius * 0.75;
          
          brain.moveTo(200, 150);
          brain.lineTo(x, y);
          brain.stroke({ 
            color: 0x00ffff, 
            width: 2, 
            alpha: 0.3 + Math.sin(time + i * 2) * 0.3 
          });
        }
        
        // Animated particles
        particles.forEach((particle, index) => {
          particle.clear();
          const particleTime = time + index * 0.5;
          const x = 200 + Math.cos(particleTime * 3) * 150;
          const y = 150 + Math.sin(particleTime * 3) * 100;
          
          particle.circle(x, y, 3 + Math.sin(particleTime * 5) * 2).fill({ 
            color: 0x00ffff, 
            alpha: 0.8 
          });
        });
      });

      appRef.current = app;
    };

    initPixi();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
      }
    };
  }, []);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleExecuteTool = () => {
    if (!selectedTool || !prompt) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const responses = [
        `I've analyzed your request for ${tools.find(t => t.id === selectedTool)?.name.toLowerCase()}. Here are the insights...`,
        `Based on your prompt, I've generated the following content...`,
        `The automation task has been successfully configured and is now running...`,
        `System monitoring is active. All parameters are within normal ranges.`,
        `Data analysis complete. Found 3 key patterns and 2 anomalies.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
      setIsProcessing(false);
      
      // Update tool usage
      setTools(prev => prev.map(tool => 
        tool.id === selectedTool 
          ? { ...tool, lastUsed: new Date(), usage: tool.usage + 1 }
          : tool
      ));
      
      // Add to chat history
      setChatHistory(prev => [...prev, {
        role: 'user',
        content: prompt,
        timestamp: new Date()
      }, {
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      }]);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'processing': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const formatLastUsed = (date: Date) => {
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

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 className="main-title" style={{ marginBottom: '0.25rem' }}>AI Tools</h1>
          <p style={{ color: 'var(--muted)' }}>Run analysis, generate content, and automate tasks.</p>
        </div>
        <button className="btn-secondary" type="button">
          <Settings className="inline-icon" />
          Settings
        </button>
      </div>

      <div className="grid-layout">
        <div className="projects-column">
          <div className="projects-header">
            <h2 className="projects-title">Tools</h2>
            <button className="btn-secondary" type="button" onClick={() => setResponse('')}>
              <RefreshCw className="inline-icon" />
              Reset
            </button>
          </div>

          <div className="projects-list">
            {tools.map((tool) => {
              const isSelected = selectedTool === tool.id;
              return (
                <div
                  key={tool.id}
                  className="project-card"
                  style={{
                    borderColor: isSelected ? 'rgba(34, 211, 238, 0.35)' : 'var(--border)'
                  }}
                >
                  <div className="project-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(99, 102, 241, 0.14)',
                        border: '1px solid rgba(148, 163, 184, 0.14)'
                      }}>
                        {tool.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="project-title">{tool.name}</p>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{tool.description}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span
                        className="project-status"
                        style={{
                          background: 'rgba(148, 163, 184, 0.12)',
                          color: 'var(--text)'
                        }}
                      >
                        {tool.category}
                      </span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                        Used {tool.usage} times • {formatLastUsed(tool.lastUsed)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                      className="project-status"
                      style={{
                        background: `${getStatusColor(tool.status)}22`,
                        color: getStatusColor(tool.status)
                      }}
                    >
                      {tool.status}
                    </span>
                    <button
                      type="button"
                      className={isSelected ? 'btn-primary' : 'btn-logs'}
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      <Play className="inline-icon" />
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-column">
          <div className="stats-card" style={{ marginBottom: '1rem' }}>
            <h3 className="stats-title" style={{ marginBottom: '0.75rem' }}>Neural Visualizer</h3>
            <div
              ref={canvasRef}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'rgba(2, 6, 23, 0.45)'
              }}
            />
          </div>

          <div className="stats-card" style={{ marginBottom: '1rem' }}>
            <h3 className="stats-title" style={{ marginBottom: '0.75rem' }}>Prompt Runner</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--muted)' }}>Selected tool</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>
                    {selectedTool ? tools.find(t => t.id === selectedTool)?.name : 'None'}
                  </span>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your prompt..."
                  style={{ width: '100%', minHeight: 110, padding: '0.75rem' }}
                />
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={handleExecuteTool}
                disabled={!selectedTool || !prompt || isProcessing}
                style={{
                  opacity: !selectedTool || !prompt || isProcessing ? 0.6 : 1,
                  cursor: !selectedTool || !prompt || isProcessing ? 'not-allowed' : 'pointer'
                }}
              >
                <Zap className="inline-icon" />
                {isProcessing ? 'Processing...' : 'Run'}
              </button>

              {response && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'rgba(2, 6, 23, 0.35)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700 }}>Response</span>
                    <button className="btn-logs" type="button" onClick={() => setResponse('')}>
                      Clear
                    </button>
                  </div>
                  <div style={{ color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{response}</div>
                </div>
              )}
            </div>
          </div>

          <div className="stats-card">
            <h3 className="stats-title" style={{ marginBottom: '0.75rem' }}>Chat History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 260, overflow: 'auto' }}>
              {chatHistory.length === 0 ? (
                <div style={{ color: 'var(--muted)' }}>No messages yet.</div>
              ) : (
                chatHistory.slice(-8).map((message, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 12,
                      border: '1px solid var(--border)',
                      background: message.role === 'user' ? 'rgba(99, 102, 241, 0.10)' : 'rgba(34, 211, 238, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{message.role}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div style={{ color: 'var(--text)' }}>{message.content}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPage;
