import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import InspectorPanel from './InspectorPanel';
import { useActionQueue } from '../../context/ActionQueueContext';

export default function Layout() {
  const { inspector } = useActionQueue();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: inspector.open ? '60px 1fr 420px' : '60px 1fr',
      gridTemplateRows: 'auto 1fr',
      height: '100vh',
      transition: 'grid-template-columns 0.3s ease',
    }}>
      {/* Thin left nav — spans full height */}
      <div style={{ gridRow: '1 / -1' }}>
        <Sidebar />
      </div>

      {/* Top bar — spans center + right */}
      <div style={{ gridColumn: inspector.open ? '2 / -1' : '2' }}>
        <TopBar />
      </div>

      {/* Center stage */}
      <div style={{ overflow: 'auto', padding: '24px 32px' }}>
        <Outlet />
      </div>

      {/* Inspector panel — slides in when open */}
      {inspector.open && (
        <div style={{
          borderLeft: '1px solid var(--border)',
          background: '#fff',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <InspectorPanel />
        </div>
      )}
    </div>
  );
}
