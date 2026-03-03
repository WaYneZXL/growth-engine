import { Sparkles } from 'lucide-react';

export default function AgentMessage({ message }) {
  return (
    <div style={{
      display: 'flex',
      gap: 10,
      padding: '14px 16px',
      background: 'linear-gradient(135deg, rgba(124,92,252,0.04), rgba(159,133,255,0.02))',
      border: '1px solid rgba(124,92,252,0.1)',
      borderRadius: 10,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 8, flexShrink: 0,
        background: 'rgba(124,92,252,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 1,
      }}>
        <Sparkles size={12} style={{ color: 'var(--ai)' }} />
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
        {message}
      </div>
    </div>
  );
}
