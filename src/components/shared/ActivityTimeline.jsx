import { Scan, Check, Brain, Search } from 'lucide-react';
import { useState } from 'react';

const typeConfig = {
  scan:     { icon: Scan,   color: 'var(--ai)',      bg: 'rgba(124,92,252,0.08)', label: 'Scan' },
  applied:  { icon: Check,  color: 'var(--success)',  bg: 'rgba(16,185,129,0.08)', label: 'Auto-applied' },
  analysis: { icon: Search, color: 'var(--brand)',    bg: 'rgba(240,107,37,0.08)', label: 'Analysis' },
  learning: { icon: Brain,  color: 'var(--ai-light)', bg: 'rgba(159,133,255,0.08)', label: 'Learning' },
};

export default function ActivityTimeline({ events }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {events.map((event, i) => {
        const cfg = typeConfig[event.type] || typeConfig.scan;
        const Icon = cfg.icon;
        const isLast = i === events.length - 1;
        const isExpanded = expandedId === event.id;

        return (
          <div key={event.id} style={{ display: 'flex', gap: 14 }}>
            {/* Timeline track */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: cfg.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={14} style={{ color: cfg.color }} />
              </div>
              {!isLast && (
                <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 20 }} />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 4 }}>
                  {cfg.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{event.time}</span>
              </div>
              <button
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, textAlign: 'left', width: '100%',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4 }}>
                  {event.title}
                </div>
              </button>
              {isExpanded && (
                <div style={{
                  fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6,
                  marginTop: 6, padding: '10px 12px',
                  background: 'var(--surface-2)', borderRadius: 8,
                }}>
                  {event.detail}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
