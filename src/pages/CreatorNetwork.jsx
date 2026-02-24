import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp, Users, DollarSign, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { creators, creatorPlatforms, productCreators, products, formatNumber, formatCurrency } from '../data/mockData';

// Reverse-lookup: for each creator, which SKUs are they associated with?
const creatorToSkus = {};
Object.entries(productCreators).forEach(([skuId, creatorIds]) => {
  creatorIds.forEach((cid) => {
    if (!creatorToSkus[cid]) creatorToSkus[cid] = [];
    creatorToSkus[cid].push(skuId);
  });
});

// ── Platform chip ─────────────────────────────────────────────────────────────
function PlatformChip({ platform }) {
  const p = creatorPlatforms[platform];
  if (!p) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 7px', borderRadius: 999,
      fontSize: 10, fontWeight: 600,
      background: p.bg, color: p.color,
      whiteSpace: 'nowrap',
    }}>
      {p.label}
    </span>
  );
}

// ── GMV bar cell ──────────────────────────────────────────────────────────────
function GmvBar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 64, height: 5, background: 'var(--surface-2)', borderRadius: 999, flexShrink: 0, border: '1px solid var(--border)' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: color, transition: 'width 0.4s' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: value > 0 ? 'var(--text-1)' : 'var(--text-3)', minWidth: 42, textAlign: 'right' }}>
        {value > 0 ? formatCurrency(value) : '—'}
      </span>
    </div>
  );
}

// ── Sort helpers ──────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { key: 'gmv',        label: 'Total GMV'    },
  { key: 'tiktok',     label: 'TikTok Shop'  },
  { key: 'shopify',    label: 'Shopify'      },
  { key: 'amazon',     label: 'Amazon'       },
  { key: 'followers',  label: 'Followers'    },
  { key: 'conversion', label: 'Conv. Rate'   },
];

function getSort(c, key) {
  if (key === 'gmv')        return c.gmvAttributed;
  if (key === 'tiktok')     return c.channelGmv.tiktok;
  if (key === 'shopify')    return c.channelGmv.shopify;
  if (key === 'amazon')     return c.channelGmv.amazon;
  if (key === 'followers')  return c.followers;
  if (key === 'conversion') return c.conversionRate;
  return 0;
}

// ── Channel GMV column headers ────────────────────────────────────────────────
const CHANNELS = [
  { key: 'tiktok',  label: 'TikTok Shop', color: '#ff0050' },
  { key: 'shopify', label: 'Shopify',     color: '#96bf48' },
  { key: 'amazon',  label: 'Amazon',      color: '#ff9900' },
];

export default function CreatorNetwork() {
  const navigate = useNavigate();
  const [search, setSearch]           = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey]         = useState('gmv');
  const [sortDir, setSortDir]         = useState('desc');
  const [expandedCreator, setExpandedCreator] = useState(null);

  const niches = [...new Set(creators.map((c) => c.niche))].sort();

  const filtered = creators.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.handle.toLowerCase().includes(search.toLowerCase())) return false;
    if (nicheFilter !== 'all' && c.niche !== nicheFilter) return false;
    if (platformFilter !== 'all' && !c.platforms.includes(platformFilter)) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const diff = getSort(b, sortKey) - getSort(a, sortKey);
    return sortDir === 'desc' ? diff : -diff;
  });

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  // Maximums for bar scaling
  const maxGmv       = Math.max(...creators.map((c) => c.gmvAttributed));
  const maxByChannel = {
    tiktok:  Math.max(...creators.map((c) => c.channelGmv.tiktok)),
    shopify: Math.max(...creators.map((c) => c.channelGmv.shopify)),
    amazon:  Math.max(...creators.map((c) => c.channelGmv.amazon)),
  };

  // Stats
  const totalGMV    = creators.reduce((s, c) => s + c.gmvAttributed, 0);
  const activeCount = creators.filter((c) => c.status === 'active').length;
  const avgConv     = (creators.reduce((s, c) => s + c.conversionRate, 0) / creators.length).toFixed(1);
  const topCreator  = [...creators].sort((a, b) => b.gmvAttributed - a.gmvAttributed)[0];

  const SortIcon = ({ k }) => {
    if (sortKey !== k) return <span style={{ color: 'var(--text-3)', fontSize: 10, marginLeft: 2 }}>↕</span>;
    return <span style={{ color: 'var(--brand)', fontSize: 10, marginLeft: 2 }}>{sortDir === 'desc' ? '↓' : '↑'}</span>;
  };

  const thStyle = (k) => ({
    textAlign: k === 'creator' ? 'left' : 'right',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '10px 14px',
    fontSize: 11,
    fontWeight: 600,
    color: sortKey === k ? 'var(--brand)' : 'var(--text-3)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface-2)',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Creator Network</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{creators.length} creators · {activeCount} active</p>
        </div>
        <button className="btn btn-primary"><Sparkles size={14} /> Find Creators with AI</button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { Icon: Users,      iconColor: 'var(--brand)',   label: 'Total Creators',      value: creators.length,          sub: `${activeCount} active`                                   },
          { Icon: DollarSign, iconColor: 'var(--success)', label: 'Total Attributed GMV', value: formatCurrency(totalGMV), sub: null                                                      },
          { Icon: TrendingUp, iconColor: 'var(--brand)',   label: 'Avg Conv. Rate',       value: `${avgConv}%`,            sub: null                                                      },
          { Icon: Star,       iconColor: 'var(--warning)', label: 'Top Performer',        value: topCreator.name,          sub: `${formatCurrency(topCreator.gmvAttributed)} total GMV`   },
        ].map(({ Icon, iconColor, label, value, sub }) => (
          <div key={label} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Icon size={13} style={{ color: iconColor }} />
              <span style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
            </div>
            <div style={{ fontSize: value.length > 12 ? 14 : 20, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>{value}</div>
            {sub && <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 3 }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
          <input className="input" placeholder="Search creators..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 32, width: 200 }} />
        </div>
        <select className="select" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
          <option value="all">All Platforms</option>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
        </select>
        <select className="select" value={nicheFilter} onChange={(e) => setNicheFilter(e.target.value)}>
          <option value="all">All Niches</option>
          {niches.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-3)' }}>{sorted.length} creators</span>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* Creator */}
              <th style={{ ...thStyle('creator'), textAlign: 'left' }}>Creator</th>
              {/* Platforms */}
              <th style={{ ...thStyle('platforms'), textAlign: 'left', cursor: 'default' }}>Posts on</th>
              {/* Niche */}
              <th style={{ ...thStyle('niche'), textAlign: 'left', cursor: 'default' }}>Niche</th>
              {/* Followers */}
              <th style={{ ...thStyle('followers'), textAlign: 'right' }} onClick={() => handleSort('followers')}>
                Followers <SortIcon k="followers" />
              </th>
              {/* Channel GMV cols */}
              {CHANNELS.map((ch) => (
                <th key={ch.key} style={{ ...thStyle(ch.key), textAlign: 'right' }} onClick={() => handleSort(ch.key)}>
                  <span style={{ color: ch.color }}>{ch.label}</span> <SortIcon k={ch.key} />
                </th>
              ))}
              {/* Total GMV */}
              <th style={{ ...thStyle('gmv'), textAlign: 'right' }} onClick={() => handleSort('gmv')}>
                Total GMV <SortIcon k="gmv" />
              </th>
              {/* Conv */}
              <th style={{ ...thStyle('conversion'), textAlign: 'right' }} onClick={() => handleSort('conversion')}>
                Conv. <SortIcon k="conversion" />
              </th>
              {/* Status */}
              <th style={{ ...thStyle('status'), cursor: 'default' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, idx) => {
              const totalGmv  = c.gmvAttributed;
              const skuIds    = creatorToSkus[c.id] || [];
              const isExpanded = expandedCreator === c.id;
              return (
                <>
                  <tr key={c.id}
                    style={{ borderBottom: (!isExpanded && idx < sorted.length - 1) ? '1px solid var(--border)' : 'none', transition: 'background 0.12s', cursor: 'pointer' }}
                    onClick={() => setExpandedCreator(isExpanded ? null : c.id)}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Creator */}
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: c.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                          {c.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{c.name}</span>
                            {skuIds.length > 0 && (
                              <span style={{ fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 999, background: 'rgba(99,102,241,0.1)', color: 'var(--brand)' }}>{skuIds.length} SKUs</span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.handle}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', color: 'var(--text-3)' }}>
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </div>
                      </div>
                    </td>

                    {/* Platforms */}
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {c.platforms.map((p) => <PlatformChip key={p} platform={p} />)}
                      </div>
                    </td>

                    {/* Niche */}
                    <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>{c.niche}</td>

                    {/* Followers */}
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>
                      {formatNumber(c.followers)}
                    </td>

                    {/* Channel GMV */}
                    {CHANNELS.map((ch) => (
                      <td key={ch.key} style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <GmvBar value={c.channelGmv[ch.key]} max={maxByChannel[ch.key]} color={ch.color} />
                        </div>
                      </td>
                    ))}

                    {/* Total GMV */}
                    <td style={{ padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{formatCurrency(totalGmv)}</div>
                      <div style={{ width: 64, height: 4, background: 'var(--surface-2)', borderRadius: 999, marginTop: 4, marginLeft: 'auto', border: '1px solid var(--border)' }}>
                        <div style={{ width: `${Math.round((totalGmv / maxGmv) * 100)}%`, height: '100%', borderRadius: 999, background: 'var(--brand)' }} />
                      </div>
                    </td>

                    {/* Conv rate */}
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--success)', whiteSpace: 'nowrap' }}>
                      {c.conversionRate}%
                    </td>

                    {/* Status */}
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: c.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.12)', color: c.status === 'active' ? 'var(--success)' : 'var(--text-3)' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.status === 'active' ? 'var(--success)' : 'var(--text-3)' }} />
                        {c.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${c.id}-expand`} style={{ borderBottom: idx < sorted.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td colSpan={9} style={{ padding: '0 14px 12px 58px', background: 'rgba(99,102,241,0.03)' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                          Promoting {skuIds.length} SKU{skuIds.length !== 1 ? 's' : ''}
                        </div>
                        {skuIds.length === 0 ? (
                          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Not assigned to any products yet</p>
                        ) : (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {skuIds.map((sid) => {
                              const prod = products.find((p) => p.id === sid);
                              if (!prod) return null;
                              return (
                                <button key={sid} onClick={(e) => { e.stopPropagation(); navigate(`/products/${sid}`); }}
                                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', transition: 'all 0.12s' }}
                                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
                                >
                                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: prod.imageColor, flexShrink: 0 }} />
                                  <span style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{prod.name}</span>
                                  <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{sid}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div style={{ padding: '48px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>No creators match your filters</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text-3)' }}>
        <span style={{ fontWeight: 500 }}>Channel GMV bars show relative performance within each channel.</span>
        {CHANNELS.map((ch) => (
          <span key={ch.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: ch.color, display: 'inline-block' }} />
            {ch.label}
          </span>
        ))}
      </div>
    </div>
  );
}
