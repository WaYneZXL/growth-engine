import { useLocation, Link } from 'react-router-dom';
import { Search, Sparkles, Bell } from 'lucide-react';

const breadcrumbMap = {
  '/':          ['Dashboard'],
  '/products':  ['Products'],
  '/content':   ['Digital Assets'],
  '/creators':  ['Creator Network'],
  '/workflows': ['Playbooks'],
  '/copilot':   ['AI Copilot'],
  '/settings':  ['Settings'],
};

export default function TopBar({ onToggleCopilot }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbs = () => {
    if (location.pathname === '/') return [{ label: 'Dashboard', path: '/' }];
    const crumbs = [];
    if (pathSegments[0] === 'products') {
      crumbs.push({ label: 'Products', path: '/products' });
      if (pathSegments[1]) crumbs.push({ label: pathSegments[1], path: location.pathname });
    } else {
      const mapped = breadcrumbMap[location.pathname];
      if (mapped) mapped.forEach((label, i) => crumbs.push({ label, path: i === mapped.length - 1 ? location.pathname : '/' }));
    }
    return crumbs;
  };

  const crumbs = getBreadcrumbs();

  return (
    <header className="topbar">
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: 'var(--text-3)' }}>/</span>}
            {i === crumbs.length - 1 ? (
              <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{crumb.label}</span>
            ) : (
              <Link to={crumb.path} style={{ color: 'var(--text-2)', textDecoration: 'none' }}>{crumb.label}</Link>
            )}
          </span>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input
            type="text"
            placeholder="Search SKUs, creators..."
            style={{
              width: 240, height: 36, paddingLeft: 32, paddingRight: 44,
              borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)',
              fontSize: 13, color: 'var(--text-1)', outline: 'none',
            }}
          />
          <kbd style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            fontSize: 10, color: 'var(--text-3)', background: '#fff', border: '1px solid var(--border)',
            borderRadius: 4, padding: '2px 5px',
          }}>⌘K</kbd>
        </div>

        {/* Notifications */}
        <button style={{ position: 'relative', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-2)' }}>
          <Bell size={18} />
          <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }} />
        </button>

        {/* Copilot toggle */}
        <button
          onClick={onToggleCopilot}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px',
            borderRadius: 8, border: 'none', background: 'rgba(124,92,252,0.1)',
            color: '#7c5cfc', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Sparkles size={15} className="animate-sparkle" />
          Copilot
        </button>
      </div>
    </header>
  );
}
