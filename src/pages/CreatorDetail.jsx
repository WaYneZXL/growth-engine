import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Users, Sparkles, TrendingUp, Eye, Play, Image,
  FileText, ExternalLink, Tag,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';
import {
  creators, creatorPlatforms, productCreators, products, contentAssets,
  formatNumber, formatCurrency, getChannelColor, getChannelName,
} from '../data/mockData';

// Reverse-lookup: which SKUs does each creator promote?
const creatorToSkus = {};
Object.entries(productCreators).forEach(([skuId, creatorIds]) => {
  creatorIds.forEach((cid) => {
    if (!creatorToSkus[cid]) creatorToSkus[cid] = [];
    creatorToSkus[cid].push(skuId);
  });
});

export default function CreatorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const creator = creators.find((c) => c.id === id);
  if (!creator) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320 }}>
      <p style={{ color: 'var(--text-2)' }}>Creator not found</p>
      <button onClick={() => navigate('/creators')} style={{ marginTop: 16, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>← Back to Creator Network</button>
    </div>
  );

  const skuIds = creatorToSkus[creator.id] || [];
  const promotedProducts = skuIds.map(sid => products.find(p => p.id === sid)).filter(Boolean);
  const creatorContent = contentAssets.filter(a => a.source === 'creator' && skuIds.includes(a.skuId));

  // Channel GMV bar chart data
  const channelGmvData = Object.entries(creator.channelGmv)
    .filter(([, v]) => v > 0)
    .map(([ch, gmv]) => ({ channel: getChannelName(ch), gmv, fill: getChannelColor(ch) }));

  // Stats
  const totalGmv = creator.gmvAttributed;
  const totalContent = creator.contentCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back + header */}
      <div>
        <Link to="/creators" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-2)', textDecoration: 'none', marginBottom: 14 }}>
          <ArrowLeft size={14} /> Back to Creator Network
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          {/* Avatar */}
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: creator.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {creator.name.split(' ').map(n => n[0]).join('')}
          </div>
          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{creator.name}</h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: creator.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.12)', color: creator.status === 'active' ? 'var(--success)' : 'var(--text-3)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: creator.status === 'active' ? 'var(--success)' : 'var(--text-3)' }} />
                {creator.status === 'active' ? 'Active' : 'Paused'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 2 }}>{creator.handle} · {creator.niche}</p>
            {creator.bio && <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 600, marginTop: 6 }}>{creator.bio}</p>}
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {creator.platforms.map(p => {
                const pl = creatorPlatforms[p];
                if (!pl) return null;
                return (
                  <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: pl.bg, color: pl.color }}>
                    {pl.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[
          { label: 'Total GMV', value: formatCurrency(totalGmv), color: 'var(--text-1)' },
          { label: 'Followers', value: formatNumber(creator.followers), color: 'var(--text-1)' },
          { label: 'Conv. Rate', value: `${creator.conversionRate}%`, color: 'var(--success)' },
          { label: 'Avg Views', value: creator.avgViews ? formatNumber(creator.avgViews) : '—', color: 'var(--text-1)' },
          { label: 'Engagement', value: creator.engagementRate ? `${creator.engagementRate}%` : '—', color: 'var(--brand)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Left: AI Tags */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Sparkles size={14} style={{ color: 'var(--ai)' }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>AI Profile Tags</h3>
            <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: 'rgba(124,92,252,0.12)', color: 'var(--ai)' }}>AI-generated</span>
          </div>
          {creator.tags ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Content Style', items: creator.tags.style, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
                { label: 'Categories', items: creator.tags.categories, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
                { label: 'Audience', items: creator.tags.demographics, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
                { label: 'Content Types', items: creator.tags.contentType, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
              ].map(section => (
                <div key={section.label}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{section.label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {section.items.map(tag => (
                      <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: section.bg, color: section.color }}>
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Profile tags not yet generated.</p>
          )}
        </div>

        {/* Right: Channel GMV breakdown */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', marginBottom: 16 }}>Channel GMV Breakdown</h3>
          {channelGmvData.length > 0 ? (
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelGmvData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="channel" tick={{ fontSize: 12, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} width={85} />
                  <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
                  <Bar dataKey="gmv" radius={[0, 4, 4, 0]} barSize={24}>
                    {channelGmvData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--text-3)' }}>No channel GMV data available.</p>
          )}
          {/* Channel breakdown numbers below chart */}
          <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
            {Object.entries(creator.channelGmv).filter(([, v]) => v > 0).map(([ch, gmv]) => (
              <div key={ch} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: getChannelColor(ch), textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{getChannelName(ch)}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>{formatCurrency(gmv)}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{totalGmv > 0 ? Math.round(gmv / totalGmv * 100) : 0}% of total</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promoted Products */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Promoting {promotedProducts.length} Product{promotedProducts.length !== 1 ? 's' : ''}</h3>
        </div>
        {promotedProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {promotedProducts.map(p => (
              <div key={p.id} className="card card-hover" style={{ padding: 12, cursor: 'pointer' }} onClick={() => navigate(`/products/${p.id}`)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${p.imageColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: p.imageColor }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }} className="truncate">{p.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{p.id}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: 'var(--text-3)' }}>GMV (30d)</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{formatCurrency(p.gmv30d)}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                  {p.channels.map(c => (
                    <span key={c} style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: `${getChannelColor(c)}14`, color: getChannelColor(c) }}>
                      {getChannelName(c)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Not assigned to any products yet.</p>
        )}
      </div>

      {/* Content by this creator */}
      {creatorContent.length > 0 && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Content ({creatorContent.length})</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
            {creatorContent.map(a => {
              const Icon = a.type === 'video' ? Play : a.type === 'image' ? Image : FileText;
              const prod = products.find(x => x.id === a.skuId);
              return (
                <div key={a.id} className="card card-hover" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/products/${a.skuId}`)}>
                  <div style={{ height: 80, background: `${a.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Icon size={24} style={{ color: a.color }} />
                    {a.views && (
                      <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Eye size={8} /> {formatNumber(a.views)}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-1)' }} className="truncate">{a.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }} className="truncate">{prod?.name || a.skuId}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
