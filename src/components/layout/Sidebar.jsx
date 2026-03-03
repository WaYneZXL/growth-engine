import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Zap, Search, BarChart3, Settings } from 'lucide-react';
import { useActionQueue } from '../../context/ActionQueueContext';

const navItems = [
  { path: '/',            icon: Zap,       label: 'Inbox' },
  { path: '/explore',     icon: Search,    label: 'Explore' },
  { path: '/performance', icon: BarChart3, label: 'Performance' },
];

const bottomItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
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
  const { actions } = useActionQueue();
  const pendingCount = actions.filter(a => a.status === 'pending').length;

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
      {/* Agent status indicator */}
      <div
        style={{
          position: 'relative',
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          flexShrink: 0,
        }}
        onMouseEnter={() => setTooltip('_agent')}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Pulsing dot */}
        <div style={{
          position: 'absolute',
          top: -2,
          right: -2,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--success)',
          border: '2px solid #0f172a',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        {/* Pending count badge */}
        {pendingCount > 0 && (
          <div style={{
            position: 'absolute',
            bottom: -4,
            right: -6,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            background: 'var(--brand)',
            color: '#fff',
            fontSize: 9,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            border: '2px solid #0f172a',
          }}>
            {pendingCount}
          </div>
        )}
        <Zap size={16} style={{ color: '#fff' }} />
        {tooltip === '_agent' && (
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
            Agent active · {pendingCount} pending
          </div>
        )}
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
