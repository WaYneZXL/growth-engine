import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Palette, Users, Workflow,
  Sparkles, Settings, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';

const navItems = [
  { path: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/products',  icon: Package,         label: 'Products' },
  { path: '/content',   icon: Palette,         label: 'Digital Assets' },
  { path: '/creators',  icon: Users,           label: 'Creator Network' },
  { path: '/workflows', icon: Workflow,        label: 'Playbooks' },
  { path: '/copilot',   icon: Sparkles,        label: 'AI Copilot' },
];

const S = {
  sidebar:      { background: '#1a1a2e', display: 'flex', flexDirection: 'column', height: '100%' },
  logo:         { padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
  logoInner:    { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon:     { width: 32, height: 32, borderRadius: 8, background: '#f06b25', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  logoText:     { overflow: 'hidden' },
  logoTitle:    { color: '#fff', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', letterSpacing: '-0.02em' },
  toggleBtn:    { background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, borderRadius: 6, display: 'flex', flexShrink: 0 },
  nav:          { flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden' },
  navItem:      (active) => ({
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '8px 10px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden',
    transition: 'background 0.15s', marginBottom: 2,
    background: active ? 'rgba(240,107,37,0.12)' : 'transparent',
    color: active ? '#f06b25' : 'rgba(255,255,255,0.55)',
  }),
  navIcon:      (active) => ({ width: 18, height: 18, flexShrink: 0, color: active ? '#f06b25' : 'inherit' }),
  navLabel:     { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' },
  bottom:       { padding: '8px 8px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 },
  settingsLink: { display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px', borderRadius: 8, fontSize: 14, textDecoration: 'none', color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: 2 },
  avatar:       { width: 28, height: 28, borderRadius: '50%', background: 'rgba(240,107,37,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 600, flexShrink: 0 },
  userRow:      { display: 'flex', alignItems: 'center', gap: 12, padding: '6px 10px', overflow: 'hidden' },
  userName:     { color: '#fff', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' },
  userPlan:     { color: 'rgba(255,255,255,0.35)', fontSize: 10, whiteSpace: 'nowrap' },
};

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} style={S.sidebar}>
      {/* Logo + toggle */}
      <div style={S.logo}>
        <div style={S.logoInner}>
          <div style={S.logoIcon}>
            <Package size={16} color="#fff" />
          </div>
          {!collapsed && (
            <div style={S.logoText}>
              <div style={S.logoTitle}>aftership</div>
            </div>
          )}
        </div>
        <button style={S.toggleBtn} onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={S.nav}>
        {navItems.map((item) => {
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
          return (
            <NavLink key={item.path} to={item.path} style={S.navItem(isActive)} title={collapsed ? item.label : undefined}>
              <item.icon style={S.navIcon(isActive)} />
              {!collapsed && <span style={S.navLabel}>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={S.bottom}>
        <NavLink to="/settings" style={S.settingsLink} title={collapsed ? 'Settings' : undefined}>
          <Settings size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <div style={S.userRow}>
          <div style={S.avatar}>JD</div>
          {!collapsed && (
            <div>
              <div style={S.userName}>John Doe</div>
              <div style={S.userPlan}>Pro Plan</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
