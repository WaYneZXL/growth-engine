import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BarChart3, Image, Users, BookOpen, Settings } from 'lucide-react';

const navItems = [
  { path: '/',          icon: Home,       label: 'Command Center' },
  { path: '/products',  icon: BarChart3,  label: 'Products' },
  { path: '/content',   icon: Image,      label: 'Digital Assets' },
  { path: '/creators',  icon: Users,      label: 'Creator Network' },
];

const bottomItems = [
  { path: '/workflows', icon: BookOpen,   label: 'Workflows' },
  { path: '/settings',  icon: Settings,   label: 'Settings' },
];

function isActive(itemPath, locationPath) {
  if (itemPath === '/') return locationPath === '/';
  return locationPath === itemPath || locationPath.startsWith(itemPath + '/');
}

function NavIcon({ item, active, tooltip, setTooltip }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      style={{
        position: 'relative',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        textDecoration: 'none',
        transition: 'background 0.15s',
        background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
      }}
      onMouseEnter={() => setTooltip(item.label)}
      onMouseLeave={() => setTooltip(null)}
    >
      {/* Active indicator bar */}
      {active && (
        <div style={{
          position: 'absolute',
          left: -6,
          top: 10,
          bottom: 10,
          width: 3,
          borderRadius: '0 3px 3px 0',
          background: '#6366f1',
        }} />
      )}
      <Icon
        size={20}
        style={{
          color: active ? '#fff' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.15s',
        }}
      />
      {/* Tooltip */}
      {tooltip === item.label && (
        <div style={{
          position: 'absolute',
          left: 52,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#1e293b',
          color: '#fff',
          fontSize: 12,
          fontWeight: 500,
          padding: '5px 10px',
          borderRadius: 6,
          whiteSpace: 'nowrap',
          zIndex: 100,
          pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>
          {item.label}
        </div>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const [tooltip, setTooltip] = useState(null);

  return (
    <aside style={{
      width: 60,
      height: '100%',
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
    }}>
      {/* Brand logo */}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '-0.5px' }}>GE</span>
      </div>

      {/* Top nav items */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        flex: 1,
      }}>
        {navItems.map((item) => (
          <NavIcon
            key={item.path}
            item={item}
            active={isActive(item.path, location.pathname)}
            tooltip={tooltip}
            setTooltip={setTooltip}
          />
        ))}
      </nav>

      {/* Bottom nav items */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}>
        {bottomItems.map((item) => (
          <NavIcon
            key={item.path}
            item={item}
            active={isActive(item.path, location.pathname)}
            tooltip={tooltip}
            setTooltip={setTooltip}
          />
        ))}
      </div>
    </aside>
  );
}
