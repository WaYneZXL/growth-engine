import { NavLink, useLocation } from 'react-router-dom';
import {
  Package, ListChecks, FolderTree, ClipboardList, Star,
  Home, BarChart3, Image,
  Sparkles, Send, Users,
  Workflow, BookOpen, Settings, PanelLeftClose, PanelLeftOpen, ChevronDown,
} from 'lucide-react';

/* ── Navigation structure ── */
const mainSections = [
  {
    header: 'Store Management',
    items: [
      {
        path: '/store/shopify', icon: Package, label: 'Store products',
        children: [
          { path: '/store/shopify', label: 'Shopify products' },
          { path: '/store/consolidated', label: 'Consolidated listings' },
          { path: '/store/bundles', label: 'Bundles' },
        ],
      },
      { path: '/channel-listings', icon: ListChecks, label: 'Channel listings' },
      { path: '/category-templates', icon: FolderTree, label: 'Category templates' },
      { path: '/orders', icon: ClipboardList, label: 'Orders' },
      { path: '/reviews', icon: Star, label: 'Reviews' },
    ],
  },
  {
    header: 'Growth',
    items: [
      { path: '/', icon: Home, label: 'Home', isNew: true },
      { path: '/products', icon: BarChart3, label: 'Products', isNew: true },
      { path: '/content', icon: Image, label: 'Digital Assets', isNew: true },
    ],
  },
  {
    header: 'Creators & Affiliates',
    items: [
      {
        path: '/affiliates/find', icon: Sparkles, label: 'Find creators',
        children: [
          { path: '/affiliates/magic-search', label: 'Magic search' },
          { path: '/affiliates/lookalike', label: 'Lookalike' },
        ],
      },
      { path: '/affiliates/outreach', icon: Send, label: 'Creator outreach' },
      { path: '/creators', icon: Users, label: 'My creators', isNew: true },
    ],
  },
  {
    header: 'Workflows',
    items: [
      {
        path: '/workflows/tasks', icon: Workflow, label: 'Workflows', isNew: true,
        children: [
          { path: '/workflows/tasks', label: 'Tasks' },
          { path: '/workflows', label: 'Templates' },
        ],
      },
    ],
  },
];

/* ── Styles ── */
const S = {
  sidebar: {
    background: '#fff',
    borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', height: '100%',
  },
  logo: {
    padding: '20px 16px 16px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
  },
  logoInner: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: {
    width: 28, height: 28, borderRadius: 6, background: '#f06b25',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  logoTitle: { color: 'var(--text-1)', fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap' },
  toggleBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--text-3)', padding: 4, borderRadius: 6, display: 'flex', flexShrink: 0,
  },
  nav: { flex: 1, padding: '4px 8px', overflowY: 'auto', overflowX: 'hidden' },
  sectionHeader: {
    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-3)',
    padding: '20px 10px 6px', textTransform: 'uppercase',
  },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
    textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden',
    transition: 'background 0.15s', marginBottom: 1,
    background: active ? 'rgba(240,107,37,0.06)' : 'transparent',
    color: active ? 'var(--brand)' : 'var(--text-2)',
  }),
  childItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '6px 16px 6px 44px', borderRadius: 6, fontSize: 12, fontWeight: 500,
    textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden',
    transition: 'background 0.15s', marginBottom: 1,
    background: active ? 'rgba(240,107,37,0.06)' : 'transparent',
    color: active ? 'var(--brand)' : 'var(--text-3)',
  }),
  navIcon: (active) => ({
    width: 16, height: 16, flexShrink: 0,
    color: active ? 'var(--brand)' : 'var(--text-3)',
  }),
  navLabel: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' },
  newBadge: {
    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4,
    background: 'rgba(99,102,241,0.12)', color: 'var(--brand)',
    flexShrink: 0,
  },
  orangePill: {
    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4,
    background: 'rgba(240,107,37,0.1)', color: 'var(--brand)',
    flexShrink: 0,
  },
  bottom: {
    padding: '8px 8px 12px', borderTop: '1px solid var(--border)', flexShrink: 0,
  },
  copilotBtn: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
    border: 'none', cursor: 'pointer', width: '100%',
    background: 'rgba(124,92,252,0.06)', color: 'var(--ai)',
    whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: 2,
  },
  userRow: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '6px 16px', overflow: 'hidden',
  },
  avatar: {
    width: 26, height: 26, borderRadius: '50%', background: 'rgba(240,107,37,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, color: 'var(--brand)', fontWeight: 600, flexShrink: 0,
  },
  userName: { color: 'var(--text-1)', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' },
  userPlan: { color: 'var(--text-3)', fontSize: 10, whiteSpace: 'nowrap' },
};

/* ── Helpers ── */
function isPathActive(itemPath, locationPath, exact) {
  if (itemPath === '/') return locationPath === '/';
  if (exact) return locationPath === itemPath;
  return locationPath === itemPath || locationPath.startsWith(itemPath + '/');
}

function isParentActive(item, locationPath) {
  if (isPathActive(item.path, locationPath)) return true;
  if (item.children) return item.children.some(c => isPathActive(c.path, locationPath));
  return false;
}

/* ── Render a single nav item + optional children ── */
function NavItem({ item, collapsed, locationPath }) {
  const active = isPathActive(item.path, locationPath);
  const parentActive = isParentActive(item, locationPath);

  return (
    <div>
      <NavLink
        to={item.path}
        style={S.navItem(active)}
        title={collapsed ? item.label : undefined}
      >
        <item.icon style={S.navIcon(active)} />
        {!collapsed && (
          <>
            <span style={S.navLabel}>{item.label}</span>
            {item.isNew && <span style={S.newBadge}>NEW</span>}
            {item.hasOrangePill && <span style={S.orangePill}>New</span>}
            {item.children && (
              <ChevronDown
                size={12}
                style={{
                  flexShrink: 0, color: 'var(--text-3)',
                  transform: parentActive ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.15s',
                }}
              />
            )}
          </>
        )}
      </NavLink>

      {!collapsed && item.children && parentActive && (
        <div>
          {item.children.map((child) => {
            const childActive = isPathActive(child.path, locationPath, true);
            return (
              <NavLink key={child.path + child.label} to={child.path} style={S.childItem(childActive)}>
                {child.label}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Component ── */
export default function Sidebar({ collapsed, onToggle, onToggleCopilot }) {
  const location = useLocation();

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} style={S.sidebar}>
      {/* Brand */}
      <div style={S.logo}>
        <div style={S.logoInner}>
          <div style={S.logoIcon}>
            <Package size={14} color="#fff" />
          </div>
          {!collapsed && <div style={S.logoTitle}>Feed</div>}
        </div>
        <button style={S.toggleBtn} onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Main nav */}
      <nav style={S.nav}>
        {mainSections.map((section, si) => (
          <div key={si}>
            {!collapsed && <div style={S.sectionHeader}>{section.header}</div>}
            {collapsed && <div style={{ height: 16 }} />}
            {section.items.map((item) => (
              <NavItem key={item.path + item.label} item={item} collapsed={collapsed} locationPath={location.pathname} />
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom pinned */}
      <div style={S.bottom}>
        <NavLink
          to="/settings"
          style={S.navItem(location.pathname === '/settings')}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={16} style={S.navIcon(location.pathname === '/settings')} />
          {!collapsed && <span style={S.navLabel}>Settings</span>}
        </NavLink>

        {onToggleCopilot && (
          <button
            style={collapsed ? { ...S.copilotBtn, justifyContent: 'center', padding: '8px 0' } : S.copilotBtn}
            onClick={onToggleCopilot}
            title={collapsed ? 'AI Copilot' : undefined}
          >
            <Sparkles size={16} style={{ flexShrink: 0 }} />
            {!collapsed && 'AI Copilot'}
          </button>
        )}

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
