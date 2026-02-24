import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CopilotPanel from './CopilotPanel';

export default function Layout() {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
      <div className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <TopBar
          onToggleCopilot={() => setCopilotOpen((v) => !v)}
          sidebarCollapsed={sidebarCollapsed}
        />
        <div className="page-content animate-fade-in-up">
          <Outlet />
        </div>
      </div>
      <CopilotPanel isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>
  );
}
