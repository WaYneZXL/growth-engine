import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  dashboardImpact, dashboardActions, dashboardOpportunities,
  gmvWeeklyTrend, formatCurrency,
} from '../data/mockData';

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

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page header */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Here's what needs your attention today</p>
      </div>

      {/* 1. Impact Hero — 3 outcome cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {/* Card 1: You earned */}
        <div className="card" style={{ padding: 24, borderLeft: '4px solid var(--brand)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-3)', marginBottom: 8 }}>
            AfterShip-Attributed GMV
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, marginBottom: 8 }}>
            ${dashboardImpact.gmv.value.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 600, color: 'var(--success)', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 10 }}>
              ↑{dashboardImpact.gmv.change}%
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>vs last month</span>
          </div>
          <button
            onClick={() => navigate('/products')}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            View breakdown <ArrowRight size={12} />
          </button>
        </div>

        {/* Card 2: You saved */}
        <div className="card" style={{ padding: 24, borderLeft: '4px solid var(--success)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-3)', marginBottom: 8 }}>
            AIGC Cost Savings
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--success)', lineHeight: 1.1, marginBottom: 8 }}>
            ${dashboardImpact.savings.value.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.4 }}>
            {dashboardImpact.savings.description}
          </div>
          <button
            onClick={() => navigate('/products')}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Optimize content mix <ArrowRight size={12} />
          </button>
        </div>

        {/* Card 3: Needs attention */}
        <div className="card" style={{ padding: 24, borderLeft: '4px solid var(--warning)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-3)', marginBottom: 8 }}>
            Action Items
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, marginBottom: 8 }}>
            {dashboardImpact.actions.total}
          </div>
          <div style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.4 }}>
            <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{dashboardImpact.actions.urgent} urgent</span>
            <span style={{ color: 'var(--text-2)' }}> · {dashboardImpact.actions.recommended} recommended</span>
          </div>
          <button
            onClick={() => {/* scroll to needs attention section */}}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Review now <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* 2. Needs Attention — urgent action items */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={16} style={{ color: 'var(--warning)' }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Needs Your Attention</h3>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '3px 10px', borderRadius: 10 }}>
            {dashboardActions.length} items
          </span>
        </div>
        {dashboardActions.map((item, i) => (
          <div
            key={item.id}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px',
              borderBottom: i < dashboardActions.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {/* Severity dot */}
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.severityColor, marginTop: 5, flexShrink: 0 }} />

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                {item.description}
              </div>
              {item.impact && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6,
                  fontSize: 11, fontWeight: 600, color: item.impactColor,
                  background: `${item.impactColor}10`, padding: '3px 8px', borderRadius: 6,
                }}>
                  {item.impact}
                </div>
              )}
            </div>

            {/* CTA button */}
            <button
              className="btn btn-ghost"
              style={{ fontSize: 12, flexShrink: 0, whiteSpace: 'nowrap' }}
              onClick={() => navigate(item.path)}
            >
              {item.cta} →
            </button>
          </div>
        ))}
      </div>

      {/* 3+4. Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>
        {/* Growth Opportunities */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15 }}>🎯</span>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Growth Opportunities</h3>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, fontWeight: 600, color: 'var(--brand)',
              background: 'rgba(99,102,241,0.08)', padding: '3px 10px', borderRadius: 10,
            }}>
              <Sparkles size={11} /> AI-detected
            </span>
          </div>
          {dashboardOpportunities.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0',
                borderBottom: i < dashboardOpportunities.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.description}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)', marginBottom: 6 }}>{item.impact}</div>
                <button
                  style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--brand)',
                    background: 'rgba(99,102,241,0.08)', border: 'none', borderRadius: 6,
                    padding: '5px 10px', cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Snapshot — trend chart only */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 className="section-title" style={{ marginBottom: 0 }}>GMV Trend (12 Weeks)</h3>
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
    </div>
  );
}
