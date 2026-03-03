import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { useActionQueue } from '../context/ActionQueueContext';
import ActionCard from '../components/shared/ActionCard';

/* ═══════════════════════════════════════════════
   Static data
   ═══════════════════════════════════════════════ */

const savingsBreakdown = [
  { label: 'Listing optimization lift',    value: 12400 },
  { label: 'AIGC vs creator cost savings', value: 8900 },
  { label: 'Cross-channel content reuse',  value: 2100 },
  { label: 'Creator efficiency gains',     value: 1800 },
];

const gmvByChannel = [
  { week: 'W1',  tiktok: 8200,  shopify: 12400, amazon: 5800 },
  { week: 'W2',  tiktok: 8800,  shopify: 12100, amazon: 6200 },
  { week: 'W3',  tiktok: 9400,  shopify: 12800, amazon: 5900 },
  { week: 'W4',  tiktok: 10200, shopify: 13100, amazon: 6100 },
  { week: 'W5',  tiktok: 11100, shopify: 12600, amazon: 6400 },
  { week: 'W6',  tiktok: 11800, shopify: 13400, amazon: 6000 },
  { week: 'W7',  tiktok: 12400, shopify: 13200, amazon: 6300 },
  { week: 'W8',  tiktok: 13100, shopify: 13800, amazon: 6500 },
  { week: 'W9',  tiktok: 14200, shopify: 13500, amazon: 6200 },
  { week: 'W10', tiktok: 15000, shopify: 14100, amazon: 6800 },
  { week: 'W11', tiktok: 15800, shopify: 14400, amazon: 6600 },
  { week: 'W12', tiktok: 16200, shopify: 14800, amazon: 7100 },
];

const lifecycleStages = [
  {
    stage: 'New / Cold Start', count: 2,
    skus: ['Vitamin C Face Cream', 'Noise Cancelling Headphones'],
    color: '#6366f1', icon: '🌱',
    description: 'Need content generation & creator seeding',
    action: 'Generate launch content',
  },
  {
    stage: 'Validating', count: 2,
    skus: ['Interactive Pet Toy', 'Resistance Bands Set'],
    color: '#f59e0b', icon: '🧪',
    description: 'Testing channels & content angles',
    action: 'Review performance data',
  },
  {
    stage: 'Scaling Winners', count: 4,
    skus: ['Wireless Earbuds Pro', 'Smart Watch Ultra', 'Hydrating Serum', 'Automatic Coffee Machine'],
    color: '#10b981', icon: '🚀',
    description: 'Expand channels & increase creator coverage',
    action: 'Expand to new channels',
  },
  {
    stage: 'Mature / Optimize', count: 1,
    skus: ['Portable Blender'],
    color: '#64748b', icon: '📊',
    description: 'Optimize margins & defend position',
    action: 'Refresh stale content',
  },
  {
    stage: 'Declining', count: 3,
    skus: ['Premium Yoga Mat', 'LED Desk Lamp Pro', 'Bamboo Cutting Board Set'],
    color: '#ef4444', icon: '⚠️',
    description: 'Diagnose & decide: fix or sunset',
    action: 'Run diagnosis',
  },
];

const totalSKUs = lifecycleStages.reduce((s, l) => s + l.count, 0);

const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

function InsightCallout({ text }) {
  return (
    <div style={{
      background: 'rgba(99,102,241,0.04)',
      border: '1px solid rgba(99,102,241,0.1)',
      borderRadius: 8, padding: '10px 14px', marginTop: 14,
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
        <span style={{ color: 'var(--brand)', fontWeight: 600 }}>✦ </span>
        {text}
      </div>
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="card" style={{ padding: '8px 12px', fontSize: 11, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
      <div style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '1px 0' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: p.color }} />
          <span style={{ color: 'var(--text-2)' }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>${(p.value / 1000).toFixed(1)}k</span>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */

export default function Dashboard() {
  const navigate = useNavigate();
  const { actions, handleApply, handleSkip } = useActionQueue();

  const pendingActions = actions
    .filter(a => a.status === 'pending' && a.category !== 'learning')
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 3);

  const totalPending = actions.filter(a => a.status === 'pending' && a.category !== 'learning').length;
  const maxSavings = Math.max(...savingsBreakdown.map(s => s.value));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Action Queue banner */}
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(124,92,252,0.05)',
        border: '1px solid rgba(124,92,252,0.12)',
        borderRadius: 10,
        padding: '10px 16px',
        textDecoration: 'none',
        transition: 'background 0.15s',
      }}>
        <Zap size={15} style={{ color: 'var(--ai)' }} />
        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Looking for today's actions?
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ai)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Go to Action Queue <ArrowRight size={13} />
        </span>
      </Link>

      {/* ═══════════════════════════════════════════
          Section 1: Agent Impact
          ═══════════════════════════════════════════ */}
      <div style={{
        background: 'rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 12,
        padding: '28px 32px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <span style={{ color: 'var(--brand)', fontSize: 16 }}>✦</span>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Agent Impact · Last 30 Days</h1>
        </div>

        {/* Top row: 3 key metrics */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
          {/* GMV */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              AfterShip-Influenced GMV
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>$47,200</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)' }}>+18% vs last month</span>
            </div>
          </div>

          {/* Cost Saved */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Cost Saved (AIGC vs Manual)
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>$2,340</span>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>this month</span>
            </div>
          </div>

          {/* Actions Requiring Review */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Actions Requiring Review
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>3</span>
              <span style={{ fontSize: 12 }}>
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>2 urgent</span>
              </span>
            </div>
          </div>
        </div>

        {/* Estimated Savings breakdown */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Estimated Savings
          </div>
          {savingsBreakdown.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
              <span style={{ width: 220, fontSize: 13, color: 'var(--text-2)', flexShrink: 0 }}>{item.label}</span>
              <div style={{ flex: 1, height: 20, background: 'rgba(0,0,0,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(item.value / maxSavings) * 100}%`,
                  background: 'rgba(16,185,129,0.5)',
                  borderRadius: 4,
                  transition: 'width 0.8s ease-out',
                }} />
              </div>
              <span style={{ width: 80, fontSize: 14, fontWeight: 700, color: 'var(--text-1)', textAlign: 'right', flexShrink: 0 }}>
                ${item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Override rate */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Merchant override rate</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', fontFeatureSettings: '"tnum"' }}>4.2%</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>(3 of 72 escalated)</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic' }}>
            <span style={{ color: 'var(--brand)', fontWeight: 600, fontStyle: 'normal' }}>✦ </span>
            Your override rate is trending down — the agent is getting better at predicting your preferences.
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Section 2: Business Overview
          ═══════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>

        {/* Card A: Cross-Channel GMV Trends */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', margin: 0 }}>Cross-Channel GMV · 12 Weeks</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {[
                { label: 'TikTok', color: '#ff6384' },
                { label: 'Shopify', color: '#95bf47' },
                { label: 'Amazon', color: '#ff9900' },
              ].map(c => (
                <span key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-3)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: 'inline-block' }} />
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gmvByChannel} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillTiktok" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6384" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#ff6384" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillShopify" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#95bf47" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#95bf47" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillAmazon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff9900" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#ff9900" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="tiktok" name="TikTok" stroke="#ff6384" strokeWidth={2} fill="url(#fillTiktok)" dot={false} activeDot={{ r: 3 }} />
                <Area type="monotone" dataKey="shopify" name="Shopify" stroke="#95bf47" strokeWidth={2} fill="url(#fillShopify)" dot={false} activeDot={{ r: 3 }} />
                <Area type="monotone" dataKey="amazon" name="Amazon" stroke="#ff9900" strokeWidth={2} fill="url(#fillAmazon)" dot={false} activeDot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <InsightCallout text="TikTok is your fastest-growing channel (+97% in 12 weeks) and will likely overtake Shopify as your #1 GMV source within 4 weeks at current trajectory. Consider increasing creator investment on TikTok while using TikTok-validated content to optimize Shopify PDPs." />
        </div>

        {/* Card B: Product Lifecycle */}
        <div className="card" style={{ padding: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', margin: 0, marginBottom: 16 }}>Product Lifecycle</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {lifecycleStages.map((stage, i) => {
              const pct = (stage.count / totalSKUs) * 100;
              return (
                <div key={i} style={{
                  padding: '10px 0',
                  borderBottom: i < lifecycleStages.length - 1 ? '1px solid rgba(226,232,240,0.6)' : 'none',
                }}>
                  {/* Header: icon + name + count */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13 }}>{stage.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{stage.stage}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: stage.color }}>{stage.count} SKUs</span>
                  </div>

                  {/* Bar */}
                  <div style={{ height: 6, background: 'rgba(0,0,0,0.04)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: stage.color, borderRadius: 3,
                      transition: 'width 0.6s ease-out',
                    }} />
                  </div>

                  {/* Description + action */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{stage.description}</span>
                    <button
                      onClick={() => navigate('/products')}
                      style={{
                        fontSize: 11, fontWeight: 600, color: 'var(--brand)',
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        whiteSpace: 'nowrap', flexShrink: 0,
                      }}
                    >
                      {stage.action} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <InsightCallout text="Your portfolio is healthy — 63% of SKUs are in Scaling or Validating stages. 2 declining SKUs (Bamboo Cutting Board, Basic Earphones) should be diagnosed or sunset to free up creator budget." />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Section 3: Today's Priorities
          ═══════════════════════════════════════════ */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Today's Priorities</h2>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
              Top {pendingActions.length} of {totalPending} AI-identified actions ranked by estimated revenue impact
            </p>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600, color: '#6366f1',
            background: 'rgba(99,102,241,0.08)', padding: '4px 12px', borderRadius: 10,
          }}>
            <Sparkles size={12} /> AI-prioritized
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pendingActions.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              variant="compact"
              onApply={handleApply}
              onSkip={handleSkip}
            />
          ))}
        </div>

        {totalPending > 3 && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                fontSize: 13, fontWeight: 600, color: 'var(--brand)',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}
            >
              View all {totalPending} actions <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
