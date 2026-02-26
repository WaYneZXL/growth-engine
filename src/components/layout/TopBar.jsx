import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const pageNames = {
  '/':            'Command Center',
  '/products':    'Products',
  '/content':     'Digital Assets',
  '/creators':    'Creator Network',
  '/workflows':   'Workflows',
  '/settings':    'Settings',
};

export default function TopBar() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getPageName = () => {
    if (pathSegments[0] === 'products' && pathSegments[1]) return 'Product Detail';
    if (pathSegments[0] === 'creators' && pathSegments[1]) return 'Creator Detail';
    return pageNames[location.pathname] || pathSegments[pathSegments.length - 1] || 'Home';
  };

  const pageName = getPageName();

  return (
    <header style={{
      height: 52,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      {/* Left: product name / page name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
        <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>Growth Engine</span>
        <span style={{ color: 'var(--text-3)' }}>/</span>
        <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>{pageName}</span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input
            type="text"
            placeholder="Search SKUs, creators..."
            style={{
              width: 200, height: 32, paddingLeft: 30, paddingRight: 40,
              borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)',
              fontSize: 12, color: 'var(--text-1)', outline: 'none',
            }}
          />
          <kbd style={{
            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
            fontSize: 10, color: 'var(--text-3)', background: '#fff', border: '1px solid var(--border)',
            borderRadius: 4, padding: '1px 5px',
          }}>⌘K</kbd>
        </div>

        {/* Notifications */}
        <button style={{
          position: 'relative', width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-2)',
        }}>
          <Bell size={16} />
          <span style={{
            position: 'absolute', top: 5, right: 5,
            width: 7, height: 7, background: 'var(--danger)', borderRadius: '50%',
          }} />
        </button>
      </div>
    </header>
  );
}
