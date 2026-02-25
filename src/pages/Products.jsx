import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { products, formatCurrency } from '../data/mockData';
import ProductImage from '../components/shared/ProductImage';
import ChannelBadge from '../components/shared/ChannelBadge';
import ListingScoreRing from '../components/shared/ListingScoreRing';

function StatusBadge({ status }) {
  const map = {
    growing:  { label: '↑ Growing',   bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)' },
    declining: { label: '↓ Declining', bg: 'rgba(239,68,68,0.1)',   color: 'var(--danger)'  },
    new:       { label: 'New',         bg: 'rgba(148,163,184,0.15)', color: 'var(--text-3)'  },
  };
  const s = map[status] || map.new;
  return <span style={{ ...badgeBase, background: s.bg, color: s.color }}>{s.label}</span>;
}

const badgeBase = { display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 500 };

const getPriorityScore = (p) => {
  let score = 0;
  if (p.status === 'declining') score += 30;
  if (p.listingScore < 75) score += 20;
  else if (p.listingScore < 85) score += 10;
  const fwValues = Object.values(p.flywheel);
  const needsAttention = fwValues.filter(v => v === 'needs-attention').length;
  score += needsAttention * 8;
  if (p.creatorCount === 0) score += 15;
  else if (p.creatorCount < 3) score += 8;
  if (p.status === 'new') score += 5;
  return score;
};

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState(searchParams.get('channel') || 'all');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'priority');

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (channelFilter !== 'all' && !p.channels.includes(channelFilter)) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priority') return getPriorityScore(b) - getPriorityScore(a);
    if (sortBy === 'gmv-desc') return (b.gmv30d || 0) - (a.gmv30d || 0);
    if (sortBy === 'gmv-asc') return (a.gmv30d || 0) - (b.gmv30d || 0);
    if (sortBy === 'listing-asc') return (a.listingScore || 0) - (b.listingScore || 0);
    if (sortBy === 'growth-desc') return (b.growth || -999) - (a.growth || -999);
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Products</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{products.length} SKUs across all channels</p>
        </div>
        <button className="btn btn-primary"><Plus size={14} /> Add Product</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input className="input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 32, width: 220 }} />
        </div>
        <select className="select" value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
          <option value="all">All Channels</option>
          <option value="tiktok">TikTok Shop</option>
          <option value="shopify">Shopify</option>
          <option value="amazon">Amazon</option>
        </select>
        <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="growing">Growing</option>
          <option value="declining">Declining</option>
          <option value="new">New</option>
        </select>
        <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Sort: Priority</option>
          <option value="gmv-desc">Sort: GMV ↓</option>
          <option value="gmv-asc">Sort: GMV ↑</option>
          <option value="listing-asc">Sort: Listing Score ↑</option>
          <option value="growth-desc">Sort: Growth ↓</option>
        </select>
        {/* View toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginLeft: 'auto' }}>
          {[{ v: 'grid', Icon: LayoutGrid }, { v: 'list', Icon: List }].map(({ v, Icon }) => (
            <button key={v} onClick={() => setView(v)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', background: view === v ? 'rgba(240,107,37,0.1)' : 'var(--surface)', color: view === v ? 'var(--brand)' : 'var(--text-3)' }}>
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--text-2)' }}>
        <span>{sorted.length} products</span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span style={{ color: 'var(--danger)' }}>
          {sorted.filter(p => getPriorityScore(p) >= 30).length} urgent
        </span>
        <span style={{ color: 'var(--warning)' }}>
          {sorted.filter(p => { const s = getPriorityScore(p); return s >= 15 && s < 30; }).length} to review
        </span>
        <span style={{ color: 'var(--success)' }}>
          {sorted.filter(p => getPriorityScore(p) < 15).length} on track
        </span>
      </div>

      {/* Grid view */}
      {view === 'grid' ? (
        <div className="content-grid-3">
          {sorted.map((p) => (
            <div key={p.id} className="card card-hover" style={{ padding: 16, position: 'relative' }} onClick={() => navigate(`/products/${p.id}`)}>
              {(() => {
                const score = getPriorityScore(p);
                if (score < 15) return null;
                const color = score >= 30 ? 'var(--danger)' : 'var(--warning)';
                return (
                  <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: '0.05em' }}>
                      {score >= 30 ? 'URGENT' : 'REVIEW'}
                    </span>
                  </div>
                );
              })()}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <ProductImage product={p} size="md" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-1)', fontSize: 13 }} className="truncate">{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{p.id} · {p.category}</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                    {p.channels.map((c) => <ChannelBadge key={c} channelId={c} />)}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>GMV (30d)</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginTop: 2 }}>{formatCurrency(p.gmv30d)}</div>
                  {p.growth !== null ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 10, fontWeight: 600, marginTop: 2, color: p.growth > 0 ? 'var(--success)' : 'var(--danger)' }}>
                      {p.growth > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {p.growth > 0 ? '+' : ''}{p.growth}%
                    </span>
                  ) : <span style={{ fontSize: 10, color: 'var(--text-3)' }}>New</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Listing</div>
                  <ListingScoreRing score={p.listingScore} size={34} strokeWidth={2.5} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Creators</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 4 }}>
                    <Users size={12} style={{ color: 'var(--text-3)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>{p.creatorCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 56 }}>Priority</th>
                <th>Product</th>
                <th>Category</th>
                <th>Channels</th>
                <th style={{ textAlign: 'right' }}>GMV (30d)</th>
                <th style={{ textAlign: 'right' }}>Growth</th>
                <th style={{ textAlign: 'center' }}>Listing Score</th>
                <th style={{ textAlign: 'right' }}>Creators</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
                  <td style={{ textAlign: 'center' }}>
                    {(() => {
                      const score = getPriorityScore(p);
                      if (score >= 30) return (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', fontSize: 10, fontWeight: 700, color: 'var(--danger)' }}>!</span>
                      );
                      if (score >= 15) return (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'rgba(245,158,11,0.1)', fontSize: 10, fontWeight: 700, color: 'var(--warning)' }}>!</span>
                      );
                      return (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.08)', fontSize: 10, fontWeight: 700, color: 'var(--success)' }}>✓</span>
                      );
                    })()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ProductImage product={p} size="sm" />
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text-1)' }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-2)' }}>{p.category}</td>
                  <td><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{p.channels.map((c) => <ChannelBadge key={c} channelId={c} />)}</div></td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-1)' }}>${p.gmv30d.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    {p.growth !== null ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: p.growth > 0 ? 'var(--success)' : 'var(--danger)' }}>
                        {p.growth > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {p.growth > 0 ? '+' : ''}{p.growth}%
                      </span>
                    ) : <span style={{ fontSize: 11, color: 'var(--text-3)' }}>New</span>}
                  </td>
                  <td style={{ textAlign: 'center' }}><ListingScoreRing score={p.listingScore} size={34} strokeWidth={2.5} /></td>
                  <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>{p.creatorCount}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
