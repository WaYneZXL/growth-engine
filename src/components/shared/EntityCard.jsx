import { User, Image as ImageIcon, Package } from 'lucide-react';
import ProductImage from './ProductImage';
import ListingScoreRing from './ListingScoreRing';
import ChannelBadge from './ChannelBadge';
import { formatCurrency } from '../../data/mockData';

const signalConfig = {
  urgent:      { color: 'var(--danger)',  bg: 'rgba(239,68,68,0.08)',  label: 'Urgent' },
  review:      { color: 'var(--warning)', bg: 'rgba(245,158,11,0.08)', label: 'Review' },
  opportunity: { color: 'var(--ai)',      bg: 'rgba(124,92,252,0.08)', label: 'Opportunity' },
};

function ProductCard({ entity, signal, reason, onClick }) {
  const cfg = signal ? signalConfig[signal] : null;
  return (
    <div
      onClick={onClick}
      className="card-hover"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
        background: '#fff',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <ProductImage product={entity} size="md" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{entity.name}</div>
            {cfg && (
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                color: cfg.color, background: cfg.bg,
                padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase',
              }}>
                {cfg.label}
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>{entity.id} · {entity.category}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{formatCurrency(entity.gmv30d)}</span>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: entity.growth > 0 ? 'var(--success)' : entity.growth < 0 ? 'var(--danger)' : 'var(--text-3)',
            }}>
              {entity.growth > 0 ? '+' : ''}{entity.growth}%
            </span>
            <ListingScoreRing score={entity.listingScore} size={28} strokeWidth={2.5} />
            <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
              {entity.channels.map(ch => <ChannelBadge key={ch} channelId={ch} />)}
            </div>
          </div>
          {reason && (
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.5, padding: '6px 8px', background: 'var(--surface-2)', borderRadius: 6 }}>
              {reason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreatorCard({ entity, signal, reason, onClick }) {
  const cfg = signal ? signalConfig[signal] : null;
  const totalGmv = Object.values(entity.channelGmv).reduce((s, v) => s + v, 0);

  return (
    <div
      onClick={onClick}
      className="card-hover"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
        background: '#fff',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
          background: entity.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 18, fontWeight: 700,
        }}>
          {entity.name.charAt(0)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{entity.name}</div>
            {cfg && (
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                color: cfg.color, background: cfg.bg,
                padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase',
              }}>
                {cfg.label}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ai)', marginBottom: 6 }}>{entity.handle}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>{formatCurrency(totalGmv)}</strong> GMV
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--success)' }}>{entity.conversionRate}%</strong> CVR
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
              {(entity.followers / 1000).toFixed(0)}K followers
            </span>
          </div>
          {reason && (
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.5, padding: '6px 8px', background: 'var(--surface-2)', borderRadius: 6 }}>
              {reason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentCard({ entity, signal, reason, onClick }) {
  const cfg = signal ? signalConfig[signal] : null;
  const typeLabels = { image: 'Image', video: 'Video', copy: 'Copy', brief: 'Brief' };

  return (
    <div
      onClick={onClick}
      className="card-hover"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
        background: '#fff',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 10, flexShrink: 0,
          background: `${entity.color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ImageIcon size={20} style={{ color: entity.color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{entity.name}</div>
            {cfg && (
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                color: cfg.color, background: cfg.bg,
                padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase',
              }}>
                {cfg.label}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>
            {typeLabels[entity.type] || entity.type} · {entity.source.toUpperCase()} · {entity.skuId}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {entity.channels.map(ch => <ChannelBadge key={ch} channelId={ch} />)}
          </div>
          {reason && (
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.5, padding: '6px 8px', background: 'var(--surface-2)', borderRadius: 6 }}>
              {reason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EntityCard({ entity, type, signal, reason, onClick }) {
  if (type === 'product') return <ProductCard entity={entity} signal={signal} reason={reason} onClick={onClick} />;
  if (type === 'creator') return <CreatorCard entity={entity} signal={signal} reason={reason} onClick={onClick} />;
  if (type === 'content') return <ContentCard entity={entity} signal={signal} reason={reason} onClick={onClick} />;
  return null;
}
