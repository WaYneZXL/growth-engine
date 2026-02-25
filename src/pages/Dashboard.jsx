import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, Users, Image, TrendingUp, TrendingDown, ArrowRight, Sparkles } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import MetricCard from '../components/shared/MetricCard';
import ChannelBadge from '../components/shared/ChannelBadge';
import ProductImage from '../components/shared/ProductImage';
import ListingScoreRing from '../components/shared/ListingScoreRing';
import { dashboardMetrics, gmvAttribution, gmvWeeklyTrend, products, aiInsights, formatCurrency } from '../data/mockData';

const topProducts = products.filter((p) => p.gmv30d).sort((a, b) => b.gmv30d - a.gmv30d).slice(0, 5);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="card" style={{ padding: '10px 14px', fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
      <div style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: 'var(--text-2)' }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="card" style={{ padding: '8px 12px', fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
      <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{payload[0].name}: {payload[0].value}%</span>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page header */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Overview of your growth engine performance</p>
      </div>

      {/* Metric cards */}
      <div className="metric-grid">
        <MetricCard title="AfterShip-Attributed GMV" value={`$${dashboardMetrics.gmv.value.toLocaleString()}`} change={dashboardMetrics.gmv.change} subtitle="vs last month" trend={dashboardMetrics.gmv.trend} icon={DollarSign} iconColor="#6366f1" />
        <MetricCard title="Active SKUs" value={dashboardMetrics.activeSKUs.value} subtitle={`across ${dashboardMetrics.activeSKUs.channels} channels`} icon={Package} iconColor="#3b82f6" />
        <MetricCard title="Creator Partners" value={dashboardMetrics.creatorPartners.value} subtitle="active creators" icon={Users} iconColor="#10b981" />
        <MetricCard title="Content Assets" value={dashboardMetrics.contentAssets.value.toLocaleString()} subtitle={`${dashboardMetrics.contentAssets.aiPercentage}% AI-generated`} icon={Image} iconColor="#8b5cf6" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14 }}>
        {/* GMV Attribution Donut */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="section-title">GMV Attribution</h3>
          <div style={{ height: 220, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={gmvAttribution} cx="50%" cy="46%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                  {gmvAttribution.map((entry, i) => (
                    <Cell key={i} fill={entry.influenced ? '#6366f1' : entry.color} opacity={entry.influenced ? 1 : 0.65} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend verticalAlign="bottom" height={32} iconType="circle" iconSize={6} formatter={(v) => <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand)', lineHeight: 1 }}>~34%</div>
              <div style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 3, textAlign: 'center', lineHeight: 1.3 }}>influenced by<br />AfterShip</div>
            </div>
          </div>
          <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(99,102,241,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={12} style={{ color: 'var(--brand)', flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>
              <span style={{ color: 'var(--brand)', fontWeight: 600 }}>AfterShip influences ~34%</span> of your GMV via listing optimization & creator marketing.
            </p>
          </div>
        </div>

        {/* Growth Trend */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 className="section-title" style={{ marginBottom: 0 }}>Growth Trend (12 Weeks)</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text-2)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 2, borderRadius: 2, background: '#3b82f6', display: 'inline-block' }} /> Listing</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 2, borderRadius: 2, background: '#10b981', display: 'inline-block' }} /> Affiliate</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 2, borderRadius: 2, background: '#8b5cf6', display: 'inline-block' }} /> AIGC</span>
            </div>
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gmvWeeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="listing"  name="Listing"  stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="affiliate" name="Affiliate" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="aigc"     name="AIGC"     stroke="#8b5cf6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        {/* Top SKUs */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <h3 className="section-title" style={{ marginBottom: 0 }}>Top Performing SKUs</h3>
            <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--brand)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
              View all <ArrowRight size={13} />
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Channel</th>
                <th style={{ textAlign: 'right' }}>GMV (30d)</th>
                <th style={{ textAlign: 'right' }}>Growth</th>
                <th style={{ textAlign: 'center' }}>Listing</th>
                <th style={{ textAlign: 'right' }}>Creators</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ProductImage product={p} size="sm" />
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text-1)', fontSize: 13 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.id}</div>
                      </div>
                    </div>
                  </td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Insights */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <Sparkles size={15} style={{ color: 'var(--brand)' }} />
            <h3 className="section-title" style={{ marginBottom: 0 }}>AI Insights</h3>
          </div>
          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {aiInsights.map((insight) => (
              <div key={insight.id} style={{ padding: 12, borderRadius: 10, background: 'var(--surface-2)', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99,102,241,0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14 }}>{insight.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4 }}>{insight.title}</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.6, marginLeft: 22, marginBottom: 8 }}>{insight.description}</p>
                <button style={{ marginLeft: 22, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {insight.action} <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
