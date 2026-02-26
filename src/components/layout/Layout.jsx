import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightPanel from './RightPanel';

export default function Layout() {
  const location = useLocation();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '60px 1fr 340px',
      gridTemplateRows: 'auto 1fr',
      height: '100vh',
    }}>
      {/* Thin left nav — spans full height */}
      <div style={{ gridRow: '1 / -1' }}>
        <Sidebar />
      </div>

      {/* Top bar — spans center + right */}
      <div style={{ gridColumn: '2 / -1' }}>
        <TopBar />
      </div>

      {/* Center stage */}
      <div style={{ overflow: 'auto', padding: '24px 32px' }}>
        <Outlet />
      </div>

      {/* Right panel — persistent, always visible */}
      <div style={{
        borderLeft: '1px solid var(--border)',
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <RightPanel currentPath={location.pathname} />
      </div>
    </div>
  );
}
