import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function Products() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (channelFilter !== 'all' && !p.channels.includes(channelFilter)) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
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
        {/* View toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginLeft: 'auto' }}>
          {[{ v: 'grid', Icon: LayoutGrid }, { v: 'list', Icon: List }].map(({ v, Icon }) => (
            <button key={v} onClick={() => setView(v)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', background: view === v ? 'rgba(240,107,37,0.1)' : 'var(--surface)', color: view === v ? 'var(--brand)' : 'var(--text-3)' }}>
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' ? (
        <div className="content-grid-3">
          {filtered.map((p) => (
            <div key={p.id} className="card card-hover" style={{ padding: 16 }} onClick={() => navigate(`/products/${p.id}`)}>
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
              {filtered.map((p) => (
                <tr key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
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
