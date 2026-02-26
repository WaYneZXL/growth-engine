import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List, TrendingUp, TrendingDown, Users, ChevronLeft, ChevronRight } from 'lucide-react';
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

const getPriorityLabel = (score) => {
  if (score >= 30) return { label: 'URGENT', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' };
  if (score >= 15) return { label: 'REVIEW', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' };
  return { label: 'ON TRACK', color: '#10b981', bg: 'rgba(16,185,129,0.08)' };
};

const triageRecommendations = [
  "Title length exceeds TikTok's new 80-char sweet spot. Trim to focus on 'automatic laser pattern' — your #1 converting keyword from creator content.",
  "Listing images are static product shots. Category data shows 32% higher conversion with lifestyle context. AIGC can generate 5 lifestyle variants.",
  "Strong review sentiment (4.6★) but listing doesn't surface top keywords: 'portable', 'quiet', 'USB-C'. Refresh copy to mirror buyer language.",
  "Creator video showing 'unboxing experience' drove 3x CTR. Current listing thumbnail doesn't match this angle. Consider updating hero image.",
  "Price point is 12% above category median. Competitors offer bundle deals. Consider creating a bundle workflow or adjusting positioning.",
  "High add-to-cart rate (8.2%) but low conversion (2.1%). Shipping info and return policy may be causing checkout abandonment.",
];

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState(searchParams.get('channel') || 'all');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'priority');
  const [triageMode, setTriageMode] = useState(false);
  const [triageIndex, setTriageIndex] = useState(0);
  const [triageActions, setTriageActions] = useState([]);
  const [triageComplete, setTriageComplete] = useState(false);

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

  // Triage items: only urgent + review products
  const triageItems = sorted.filter(p => getPriorityScore(p) >= 15);

  const handleTriageAction = (action) => {
    setTriageActions(prev => [...prev, { product: triageItems[triageIndex]?.name, action }]);
    if (triageIndex + 1 >= triageItems.length) {
      setTriageComplete(true);
    } else {
      setTriageIndex(prev => prev + 1);
    }
  };

  const resetTriage = () => {
    setTriageMode(false);
    setTriageIndex(0);
    setTriageActions([]);
    setTriageComplete(false);
  };

  // Triage complete view
  if (triageMode && triageComplete) {
    const optimized = triageActions.filter(a => a.action === 'Optimize Listing').length;
    const generated = triageActions.filter(a => a.action === 'Generate Content').length;
    const matched = triageActions.filter(a => a.action === 'Match Creators').length;
    const skipped = triageActions.filter(a => a.action === 'Skip').length;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Products</h1>
          <button className="btn btn-subtle" onClick={resetTriage}>← Back to List</button>
        </div>
        <div className="card" style={{ padding: 40, textAlign: 'center', maxWidth: 520, margin: '40px auto' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>Triage Complete</h2>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 20 }}>
            {optimized > 0 && <span>{optimized} optimized. </span>}
            {generated > 0 && <span>{generated} content generated. </span>}
            {matched > 0 && <span>{matched} creator matched. </span>}
            {skipped > 0 && <span>{skipped} skipped. </span>}
          </div>
          <div className="card" style={{ padding: 16, background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)', textAlign: 'left' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6366f1', marginBottom: 4 }}>Agent Suggestion</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
              Set auto-generate for listing score &lt; 75? This would catch issues before they impact revenue.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-primary" style={{ background: '#6366f1', fontSize: 12, height: 32 }}>Enable Automation</button>
              <button className="btn btn-subtle" style={{ fontSize: 12, height: 32 }}>Not Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Triage mode view
  if (triageMode && triageItems.length > 0) {
    const current = triageItems[triageIndex];
    const score = getPriorityScore(current);
    const priority = getPriorityLabel(score);
    const progress = ((triageIndex) / triageItems.length) * 100;
    const recommendation = triageRecommendations[triageIndex % triageRecommendations.length];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Products</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={resetTriage} style={{ padding: '0 14px', height: 36, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', background: 'var(--surface)', color: 'var(--text-2)' }}>List View</button>
              <button style={{ padding: '0 14px', height: 36, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', background: '#6366f1', color: '#fff' }}>Priority Triage</button>
            </div>
          </div>
        </div>

        {/* Triage card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => triageIndex > 0 && setTriageIndex(i => i - 1)} disabled={triageIndex === 0} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', cursor: triageIndex > 0 ? 'pointer' : 'default', color: triageIndex > 0 ? 'var(--text-2)' : 'var(--text-3)', opacity: triageIndex === 0 ? 0.5 : 1 }}>
                <ChevronLeft size={14} />
              </button>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{triageIndex + 1} of {triageItems.length} remaining</span>
              <button onClick={() => triageIndex < triageItems.length - 1 && setTriageIndex(i => i + 1)} disabled={triageIndex >= triageItems.length - 1} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', cursor: triageIndex < triageItems.length - 1 ? 'pointer' : 'default', color: triageIndex < triageItems.length - 1 ? 'var(--text-2)' : 'var(--text-3)', opacity: triageIndex >= triageItems.length - 1 ? 0.5 : 1 }}>
                <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ width: 160, height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', borderRadius: 3, background: '#6366f1', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Card content */}
          <div style={{ padding: '32px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginBottom: 6 }}>{current.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text-2)' }}>
                  <span>{formatCurrency(current.gmv30d)}/mo GMV</span>
                  <span>·</span>
                  <span>{current.channels.length} channels</span>
                  <span>·</span>
                  <span>{current.creatorCount} creators</span>
                </div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                color: priority.color, background: priority.bg,
                padding: '5px 12px', borderRadius: 6,
              }}>
                {priority.label}
              </span>
            </div>

            {/* Signal cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
              <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Listing Score</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: current.listingScore < 80 ? 'var(--danger)' : 'var(--text-1)' }}>{current.listingScore}</div>
                {current.listingScore < 85 && <div style={{ fontSize: 11, color: 'var(--danger)', fontWeight: 500, marginTop: 2 }}>↓ needs attention</div>}
              </div>
              <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Content</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)' }}>{current.contentAssets || 6}</div>
                <div style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 500, marginTop: 2 }}>{current.contentGaps || 2} gaps</div>
              </div>
              <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Creators</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)' }}>{current.creatorCount}</div>
                {current.creatorCount < 3 && <div style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 500, marginTop: 2 }}>need 3+</div>}
              </div>
            </div>

            {/* AI Recommendation */}
            <div style={{
              background: 'rgba(99,102,241,0.04)',
              border: '1px solid rgba(99,102,241,0.12)',
              borderRadius: 10,
              padding: 18,
              marginBottom: 28,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6366f1', marginBottom: 6 }}>AI Recommendation</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                "{recommendation}"
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => handleTriageAction('Optimize Listing')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}>
                <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.4)', textUnderlineOffset: 2 }}>O</span>ptimize Listing
              </button>
              <button onClick={() => handleTriageAction('Generate Content')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'transparent', color: '#6366f1', border: '1px solid rgba(99,102,241,0.3)', cursor: 'pointer' }}>
                <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(99,102,241,0.4)', textUnderlineOffset: 2 }}>G</span>enerate Content
              </button>
              <button onClick={() => handleTriageAction('Match Creators')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'transparent', color: '#6366f1', border: '1px solid rgba(99,102,241,0.3)', cursor: 'pointer' }}>
                <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(99,102,241,0.4)', textUnderlineOffset: 2 }}>M</span>atch Creators
              </button>
              <button onClick={() => handleTriageAction('Skip')} style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, background: 'transparent', color: 'var(--text-3)', border: '1px solid var(--border)', cursor: 'pointer', marginLeft: 'auto' }}>
                <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(156,163,175,0.4)', textUnderlineOffset: 2 }}>S</span>kip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Products</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{products.length} SKUs across all channels</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Triage toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <button style={{ padding: '0 14px', height: 36, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', background: !triageMode ? '#6366f1' : 'var(--surface)', color: !triageMode ? '#fff' : 'var(--text-2)' }} onClick={() => setTriageMode(false)}>List View</button>
            <button style={{ padding: '0 14px', height: 36, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', background: triageMode ? '#6366f1' : 'var(--surface)', color: triageMode ? '#fff' : 'var(--text-2)' }} onClick={() => { setTriageMode(true); setTriageIndex(0); setTriageActions([]); setTriageComplete(false); }}>Priority Triage</button>
          </div>
          <button className="btn btn-primary"><Plus size={14} /> Add Product</button>
        </div>
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
