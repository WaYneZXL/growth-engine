import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Image, Play, FileText, File, Sparkles, Eye, Grid3X3, AlertTriangle, Share2 } from 'lucide-react';
import { contentAssets, products, formatNumber, getChannelName } from '../data/mockData';
import ChannelBadge from '../components/shared/ChannelBadge';

const typeFilters = [
  { value: 'all',   label: 'All',    Icon: Grid3X3  },
  { value: 'image', label: 'Images', Icon: Image    },
  { value: 'video', label: 'Videos', Icon: Play     },
  { value: 'copy',  label: 'Copy',   Icon: FileText },
  { value: 'brief', label: 'Briefs', Icon: File     },
];

const typeIcon = { image: Image, video: Play, copy: FileText, brief: File };

// All content assets
const allAssets = contentAssets;

const sourceLabel = (s) => {
  if (s === 'ai')      return { text: 'AI Generated', bg: 'rgba(124,92,252,0.12)', color: 'var(--ai)'   };
  if (s === 'creator') return { text: 'Creator UGC',  bg: 'rgba(16,185,129,0.12)', color: 'var(--success)' };
  return                      { text: 'Seller Upload', bg: 'rgba(148,163,184,0.15)', color: 'var(--text-2)' };
};

export default function ContentHub() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter]     = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [search, setSearch]             = useState('');

  const filtered = allAssets.filter((a) => {
    if (typeFilter !== 'all'    && a.type !== typeFilter)               return false;
    if (sourceFilter !== 'all'  && a.source !== sourceFilter)           return false;
    if (channelFilter !== 'all' && !a.channels.includes(channelFilter)) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const total = allAssets.length;

  const getProductName = (skuId) => products.find((x) => x.id === skuId)?.name ?? skuId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Digital Assets</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>
            {total} assets · {allAssets.filter(a => a.source === 'ai').length} AI-generated · {allAssets.filter(a => a.source === 'creator').length} creator UGC
          </p>
        </div>
        <button className="btn btn-ghost"><Sparkles size={14} /> Generate with AI</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input className="input" placeholder="Search content..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 32, width: 200 }} />
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {typeFilters.map(({ value, label, Icon }) => (
            <button key={value} onClick={() => setTypeFilter(value)} style={{ display: 'flex', alignItems: 'center', gap: 5, height: 34, padding: '0 10px', borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1px solid ${typeFilter === value ? 'transparent' : 'var(--border)'}`, background: typeFilter === value ? 'rgba(240,107,37,0.1)' : 'var(--surface)', color: typeFilter === value ? 'var(--brand)' : 'var(--text-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        <select className="select" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
          <option value="all">All Sources</option>
          <option value="ai">AI Generated</option>
          <option value="creator">Creator UGC</option>
          <option value="seller">Seller Upload</option>
        </select>
        <select className="select" value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
          <option value="all">All Channels</option>
          <option value="tiktok">TikTok Shop</option>
          <option value="shopify">Shopify</option>
          <option value="amazon">Amazon</option>
        </select>
      </div>

      {/* Actionable cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Content Gaps */}
        {(() => {
          const contentGapProducts = products
            .map(p => {
              const assets = contentAssets.filter(a => a.skuId === p.id);
              const hasImage = assets.some(a => a.type === 'image');
              const hasVideo = assets.some(a => a.type === 'video');
              const hasCopy = assets.some(a => a.type === 'copy');
              const missing = [];
              if (!hasImage) missing.push('images');
              if (!hasVideo) missing.push('video');
              if (!hasCopy) missing.push('copy');
              return { ...p, assetCount: assets.length, missing };
            })
            .filter(p => p.missing.length > 0 || p.assetCount < 3)
            .sort((a, b) => a.assetCount - b.assetCount)
            .slice(0, 4);

          return (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertTriangle size={14} style={{ color: 'var(--warning)' }} />
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Content Gaps</h3>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{contentGapProducts.length} SKUs need content</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(contentGapProducts.length, 4)}, 1fr)`, gap: 10 }}>
                {contentGapProducts.map(p => (
                  <div key={p.id} onClick={() => navigate(`/products/${p.id}`)}
                    style={{ padding: 12, borderRadius: 10, background: 'var(--surface-2)', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
                  >
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }} className="truncate">{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>{p.assetCount} assets</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {p.missing.map(m => (
                        <span key={m} style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'rgba(245,158,11,0.1)', color: 'var(--warning)' }}>
                          Missing {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Expand Distribution */}
        {(() => {
          const underDistributed = contentAssets
            .filter(a => {
              const p = products.find(x => x.id === a.skuId);
              return p && a.channels.length < p.channels.length && (a.type === 'image' || a.type === 'video');
            })
            .slice(0, 4);

          return (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Share2 size={14} style={{ color: 'var(--brand)' }} />
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Expand Distribution</h3>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{underDistributed.length} assets on fewer channels</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {underDistributed.map(a => {
                  const p = products.find(x => x.id === a.skuId);
                  const missingChannels = p ? p.channels.filter(ch => !a.channels.includes(ch)) : [];
                  return (
                    <div key={a.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'var(--surface-2)', transition: 'background 0.15s', cursor: 'default' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,107,37,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
                    >
                      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)', flex: 1, minWidth: 0 }} className="truncate">
                        {a.name}
                      </span>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {a.channels.map(c => <ChannelBadge key={c} channelId={c} />)}
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-3)', flexShrink: 0 }}>→</span>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {missingChannels.map(c => (
                          <span key={c} style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'rgba(240,107,37,0.08)', color: 'var(--brand)' }}>
                            + {getChannelName(c)}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Content */}
      {filtered.length > 0 ? (() => {
        const visual = filtered.filter((a) => a.type === 'image' || a.type === 'video');
        const text   = filtered.filter((a) => a.type === 'copy'  || a.type === 'brief');
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {visual.length > 0 && (
              <div className="content-grid-4">
                {visual.map((asset) => {
                  const sl = sourceLabel(asset.source);
                  const Icon = typeIcon[asset.type] || Image;
                  return (
                    <div key={asset.id} className="card card-hover" style={{ overflow: 'hidden' }} onClick={() => navigate(`/products/${asset.skuId}`)}>
                      <div style={{ height: 130, background: `${asset.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <Icon size={32} style={{ color: asset.color }} />
                        <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: sl.bg, color: sl.color }}>{sl.text}</span>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }} className="truncate">{asset.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }} className="truncate">{getProductName(asset.skuId)}</div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                          {asset.channels.map((c) => <ChannelBadge key={c} channelId={c} />)}
                        </div>
                        {asset.views && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 10, color: 'var(--text-3)' }}>
                            <Eye size={10} /> {formatNumber(asset.views)} views
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {text.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {text.map((asset) => {
                  const sl = sourceLabel(asset.source);
                  const Icon = typeIcon[asset.type] || FileText;
                  return (
                    <div key={asset.id} className="card card-hover" style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }} onClick={() => navigate(`/products/${asset.skuId}`)}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${asset.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} style={{ color: asset.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{asset.name}</span>
                          <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 999, background: sl.bg, color: sl.color, flexShrink: 0 }}>{sl.text}</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 4 }} className="truncate">{getProductName(asset.skuId)}</div>
                        {asset.preview && (
                          <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre-line' }}>{asset.preview}</p>
                        )}
                        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                          {asset.channels.map((c) => <ChannelBadge key={c} channelId={c} />)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })() : (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>No content assets match your filters</p>
        </div>
      )}
    </div>
  );
}
