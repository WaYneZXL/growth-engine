import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Image, Play, Sparkles, Eye, Grid3X3 } from 'lucide-react';
import { contentAssets, products, formatNumber } from '../data/mockData';
import ChannelBadge from '../components/shared/ChannelBadge';

const typeFilters = [
  { value: 'all',   label: 'All',    Icon: Grid3X3 },
  { value: 'image', label: 'Images', Icon: Image   },
  { value: 'video', label: 'Videos', Icon: Play    },
];

// Only show image and video assets
const visualAssets = contentAssets.filter((a) => a.type === 'image' || a.type === 'video');

const sourceLabel = (s) => {
  if (s === 'ai')      return { text: 'AI Generated', bg: 'rgba(99,102,241,0.12)', color: 'var(--brand)'   };
  if (s === 'creator') return { text: 'Creator UGC',  bg: 'rgba(16,185,129,0.12)', color: 'var(--success)' };
  return                      { text: 'Seller Upload', bg: 'rgba(148,163,184,0.15)', color: 'var(--text-2)' };
};

const typeIcon = { image: Image, video: Play };

export default function ContentHub() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter]     = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [search, setSearch]             = useState('');

  const filtered = visualAssets.filter((a) => {
    if (typeFilter !== 'all'    && a.type !== typeFilter)               return false;
    if (sourceFilter !== 'all'  && a.source !== sourceFilter)           return false;
    if (channelFilter !== 'all' && !a.channels.includes(channelFilter)) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const total     = visualAssets.length;
  const aiCount   = visualAssets.filter((a) => a.source === 'ai').length;
  const creatorCt = visualAssets.filter((a) => a.source === 'creator').length;
  const sellerCt  = visualAssets.filter((a) => a.source === 'seller').length;

  const getProductName = (skuId) => products.find((x) => x.id === skuId)?.name ?? skuId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Digital Assets</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{total} visual assets across all SKUs</p>
        </div>
        <button className="btn btn-ghost"><Sparkles size={14} /> Generate with AI</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Total Assets',  value: total,     color: 'var(--text-1)', sub: null },
          { label: 'AI Generated',  value: aiCount,   color: 'var(--brand)',  sub: `${Math.round(aiCount / total * 100)}% of total` },
          { label: 'Creator UGC',   value: creatorCt, color: 'var(--success)', sub: null },
          { label: 'Seller Upload', value: sellerCt,  color: 'var(--text-2)', sub: null },
        ].map(({ label, value, color, sub }) => (
          <div key={label} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 4 }}>{value}</div>
            {sub && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input className="input" placeholder="Search content..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 32, width: 200 }} />
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {typeFilters.map(({ value, label, Icon }) => (
            <button key={value} onClick={() => setTypeFilter(value)} style={{ display: 'flex', alignItems: 'center', gap: 5, height: 34, padding: '0 10px', borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1px solid ${typeFilter === value ? 'transparent' : 'var(--border)'}`, background: typeFilter === value ? 'rgba(99,102,241,0.1)' : 'var(--surface)', color: typeFilter === value ? 'var(--brand)' : 'var(--text-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
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

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="content-grid-4">
          {filtered.map((asset) => {
            const sl = sourceLabel(asset.source);
            const Icon = typeIcon[asset.type] || File;
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
      ) : (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>No content assets match your filters</p>
        </div>
      )}
    </div>
  );
}
