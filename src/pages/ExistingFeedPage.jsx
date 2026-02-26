export default function ExistingFeedPage({ title, description }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16, padding: 40 }}>
      <div style={{
        padding: '6px 14px', borderRadius: 6,
        background: 'rgba(245,158,11,0.08)',
        color: '#d97706',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Existing Feed Page
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', margin: 0, textAlign: 'center' }}>{title}</h1>
      <p style={{ fontSize: 13, color: 'var(--text-3)', maxWidth: 420, textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
        This page exists in the current AfterShip Feed product and remains unchanged in the unified experience.
      </p>
      {description && (
        <div style={{
          marginTop: 12, padding: 16, borderRadius: 10,
          background: 'var(--surface-2)', maxWidth: 420, width: '100%'
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>Current functionality:</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>{description}</div>
        </div>
      )}
    </div>
  );
}
