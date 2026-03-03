import { Bell, Search, Zap } from 'lucide-react';
import { useActionQueue } from '../../context/ActionQueueContext';

export default function TopBar() {
  const { actions } = useActionQueue();
  const pendingCount = actions.filter(a => a.status === 'pending').length;
  const lastActionTime = '3 min ago';

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
      {/* Left: Agent identity + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Zap size={15} style={{ color: 'var(--ai)' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>One Agent</span>
        </div>
        <span style={{ color: 'var(--border)', fontSize: 14 }}>|</span>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
          Monitoring 24 SKUs · Last action: {lastActionTime}
        </span>
        {pendingCount > 0 && (
          <span style={{
            fontSize: 10, fontWeight: 600,
            color: 'var(--brand)', background: 'rgba(240,107,37,0.08)',
            padding: '2px 8px', borderRadius: 10,
          }}>
            {pendingCount} pending
          </span>
        )}
      </div>

      {/* Center: Command input */}
      <div style={{ position: 'relative', flex: '0 1 360px' }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
        <input
          type="text"
          placeholder="Ask or assign a task..."
          style={{
            width: '100%', height: 34, paddingLeft: 34, paddingRight: 48,
            borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)',
            fontSize: 12, color: 'var(--text-1)', outline: 'none',
          }}
        />
        <kbd style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          fontSize: 10, color: 'var(--text-3)', background: '#fff', border: '1px solid var(--border)',
          borderRadius: 4, padding: '1px 5px',
        }}>⌘K</kbd>
      </div>

      {/* Right: Notifications */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
