import { X, Package, User, Image, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useActionQueue } from '../../context/ActionQueueContext';
import { products, creators, contentAssets, productCreators, formatCurrency } from '../../data/mockData';
import ProductImage from '../shared/ProductImage';
import ListingScoreRing from '../shared/ListingScoreRing';
import ChannelBadge from '../shared/ChannelBadge';
import ActionCard from '../shared/ActionCard';

function ProductInspector({ product }) {
  const { actions, handleApply, handleSkip } = useActionQueue();
  const relatedActions = actions.filter(a => a.sku === product.id && a.status === 'pending');
  const creatorIds = productCreators[product.id] || [];
  const productCreatorList = creatorIds.slice(0, 5).map(id => creators.find(c => c.id === id)).filter(Boolean);
  const GrowthIcon = product.growth > 0 ? TrendingUp : product.growth < 0 ? TrendingDown : Minus;
  const growthColor = product.growth > 0 ? 'var(--success)' : product.growth < 0 ? 'var(--danger)' : 'var(--text-3)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ProductImage product={product} size="lg" />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>{product.id} · {product.category}</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {product.channels.map(ch => <ChannelBadge key={ch} channelId={ch} />)}
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>GMV (30d)</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{formatCurrency(product.gmv30d)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
            <GrowthIcon size={12} style={{ color: growthColor }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: growthColor }}>{product.growth > 0 ? '+' : ''}{product.growth}%</span>
          </div>
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Listing Score</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ListingScoreRing score={product.listingScore} size={36} />
          </div>
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Creators</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{product.creatorCount}</div>
        </div>
      </div>

      {/* Channel performance */}
      {product.channelData && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Channel Performance</div>
          {Object.entries(product.channelData).map(([ch, data]) => (
            <div key={ch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <ChannelBadge channelId={ch} />
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{formatCurrency(data.gmv)}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>GMV</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{data.conversionRate}%</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>CVR</div>
                </div>
                <ListingScoreRing score={data.listingScore} size={30} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creators */}
      {productCreatorList.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Top Creators</div>
          {productCreatorList.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {c.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{c.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{c.handle}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--success)' }}>{c.conversionRate}%</div>
            </div>
          ))}
          {creatorIds.length > 5 && (
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>+{creatorIds.length - 5} more</div>
          )}
        </div>
      )}

      {/* Related actions */}
      {relatedActions.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Agent Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {relatedActions.map(action => (
              <ActionCard key={action.id} action={action} variant="compact" onApply={handleApply} onSkip={handleSkip} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CreatorInspector({ creator }) {
  const totalGmv = Object.values(creator.channelGmv).reduce((s, v) => s + v, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: creator.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>
          {creator.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>{creator.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ai)', marginBottom: 4 }}>{creator.handle}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{creator.niche} · {creator.status}</div>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { label: 'Total GMV', value: formatCurrency(totalGmv) },
          { label: 'Conv. Rate', value: `${creator.conversionRate}%` },
          { label: 'Followers', value: `${(creator.followers / 1000).toFixed(0)}K` },
        ].map((m, i) => (
          <div key={i} style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Platform breakdown */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Platforms</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {creator.platforms.map(p => (
            <span key={p} style={{
              fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 6,
              background: 'var(--surface-2)', color: 'var(--text-2)',
            }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* GMV by channel */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>GMV Attribution</div>
        {Object.entries(creator.channelGmv).filter(([, v]) => v > 0).map(([ch, gmv]) => (
          <div key={ch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
            <ChannelBadge channelId={ch} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{formatCurrency(gmv)}</span>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bio</div>
        <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{creator.bio}</div>
      </div>

      {/* Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Avg Views</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{(creator.avgViews / 1000).toFixed(0)}K</div>
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Engagement</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{creator.engagementRate}%</div>
        </div>
      </div>
    </div>
  );
}

function ContentInspector({ asset }) {
  const product = products.find(p => p.id === asset.skuId);
  const typeIcons = { image: Image, video: Image, copy: Image, brief: Image };
  const TypeIcon = typeIcons[asset.type] || Image;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, background: `${asset.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <TypeIcon size={24} style={{ color: asset.color }} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>{asset.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)} · {asset.source.toUpperCase()}</div>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>SKU</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{product?.name || asset.skuId}</div>
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Created</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{asset.createdAt}</div>
        </div>
      </div>

      {/* Distribution */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Distribution</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {asset.channels.map(ch => <ChannelBadge key={ch} channelId={ch} />)}
        </div>
      </div>

      {/* Views (for video) */}
      {asset.views && (
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Views</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>{(asset.views / 1000).toFixed(0)}K</div>
        </div>
      )}

      {/* Preview (for copy/brief) */}
      {asset.preview && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Preview</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, background: 'var(--surface-2)', padding: '12px 14px', borderRadius: 8, whiteSpace: 'pre-line' }}>
            {asset.preview}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InspectorPanel() {
  const { inspector, closeInspector } = useActionQueue();
  const { type, id } = inspector;

  let title = 'Details';
  let content = null;

  if (type === 'product') {
    const product = products.find(p => p.id === id);
    if (product) {
      title = product.name;
      content = <ProductInspector product={product} />;
    }
  } else if (type === 'creator') {
    const creator = creators.find(c => c.id === id);
    if (creator) {
      title = creator.name;
      content = <CreatorInspector creator={creator} />;
    }
  } else if (type === 'content') {
    const asset = contentAssets.find(a => a.id === id);
    if (asset) {
      title = asset.name;
      content = <ContentInspector asset={asset} />;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{title}</div>
        <button
          onClick={closeInspector}
          style={{
            width: 28, height: 28, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', background: 'var(--surface-2)', cursor: 'pointer',
            color: 'var(--text-3)',
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {content || (
          <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13, padding: 40 }}>
            No data found for this entity.
          </div>
        )}
      </div>
    </div>
  );
}
