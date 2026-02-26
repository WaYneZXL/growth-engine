import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Image, Play, FileText, File, Sparkles, Eye, Grid3X3,
  AlertTriangle, Share2, Upload, PieChart,
} from 'lucide-react';
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
  const aiCount = allAssets.filter(a => a.source === 'ai').length;
  const creatorCount = allAssets.filter(a => a.source === 'creator').length;
  const sellerCount = total - aiCount - creatorCount;

  const getProductName = (skuId) => products.find((x) => x.id === skuId)?.name ?? skuId;

  // Recent uploads (sorted by createdAt desc)
  const recentUploads = [...allAssets]
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    .slice(0, 3);

  // Content gaps
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
    .slice(0, 3);

  // Distribution gaps
  const underDistributed = contentAssets
    .filter(a => {
      const p = products.find(x => x.id === a.skuId);
      return p && a.channels.length < p.channels.length && (a.type === 'image' || a.type === 'video');
    })
    .slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Digital Assets</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>
          {total} assets · {aiCount} AI-generated · {creatorCount} creator UGC
        </p>
      </div>

      {/* ── Section 1: Action Panels ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Upload & Distribute */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Upload size={14} style={{ color: 'var(--text-2)' }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Upload & Distribute</h3>
          </div>
          {/* Drop zone */}
          <div style={{
            height: 120, border: '2px dashed var(--border)', borderRadius: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
            marginBottom: 14,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.background = 'rgba(240,107,37,0.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Upload size={20} style={{ color: 'var(--text-3)', marginBottom: 6 }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Drop files here or click to browse</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Images, videos, documents — auto-matched to SKUs</div>
          </div>
          {/* Recent uploads */}
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Recent Uploads</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {recentUploads.map(a => {
              const Icon = typeIcon[a.type] || File;
              return (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 8, background: 'var(--surface-2)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,107,37,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
                >
                  <Icon size={13} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-1)', flex: 1, minWidth: 0 }} className="truncate">{a.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-3)', flexShrink: 0 }} className="truncate">{getProductName(a.skuId)}</span>
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    {a.channels.map(c => <ChannelBadge key={c} channelId={c} />)}
                  </div>
                  <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Distribute →</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generate with AI */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Sparkles size={14} style={{ color: 'var(--ai)' }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Generate with AI</h3>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 14 }}>Batch-generate content for multiple SKUs</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[
              { emoji: '📸', title: 'Product Images', sub: 'AI lifestyle & studio shots' },
              { emoji: '🎬', title: 'Video Clips', sub: '15-60s product videos' },
              { emoji: '✍️', title: 'Listing Copy', sub: 'Channel-adapted titles & bullets' },
            ].map(item => (
              <div key={item.title} style={{
                flex: 1, padding: 12, borderRadius: 10, background: 'var(--surface-2)',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-3)', fontStyle: 'italic', margin: 0 }}>
            Select SKUs → Choose content type → AI generates channel-adapted assets
          </p>
        </div>
      </div>

      {/* ── Section 2: Content Health ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {/* Card A: Content Gaps */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={14} style={{ color: 'var(--warning)' }} />
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Content Gaps</h3>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{contentGapProducts.length} SKUs</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {contentGapProducts.map(p => (
              <div key={p.id} onClick={() => navigate(`/products/${p.id}`)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: 'var(--surface-2)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }} className="truncate">{p.name}</div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flexShrink: 0 }}>
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

        {/* Card B: Distribution Gaps */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Share2 size={14} style={{ color: 'var(--brand)' }} />
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Expand Distribution</h3>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{underDistributed.length} assets</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {underDistributed.map(a => {
              const p = products.find(x => x.id === a.skuId);
              const missingChannels = p ? p.channels.filter(ch => !a.channels.includes(ch)) : [];
              return (
                <div key={a.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: 'var(--surface-2)', transition: 'background 0.15s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,107,37,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-2)'}
                >
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-1)', flex: 1, minWidth: 0 }} className="truncate">{a.name}</span>
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    {a.channels.map(c => <ChannelBadge key={c} channelId={c} />)}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', flexShrink: 0 }}>→</span>
                  <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
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

        {/* Card C: Content Mix */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <PieChart size={14} style={{ color: 'var(--text-2)' }} />
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Portfolio Mix</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'AI Generated', count: aiCount, color: 'var(--ai)', barColor: 'rgba(124,92,252,0.7)' },
              { label: 'Creator UGC', count: creatorCount, color: 'var(--success)', barColor: 'rgba(16,185,129,0.7)' },
              { label: 'Seller Upload', count: sellerCount, color: 'var(--text-3)', barColor: 'rgba(148,163,184,0.4)' },
            ].map(item => {
              const pct = total > 0 ? Math.round(item.count / total * 100) : 0;
              return (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{item.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.count} ({pct}%)</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'var(--surface-2)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: item.barColor, transition: 'width 0.4s' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 12 }}>{total} total assets</div>
        </div>
      </div>

      {/* ── Section 3: Asset Library ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>All Assets</h2>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
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

        {/* Asset grid */}
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
    </div>
  );
}
