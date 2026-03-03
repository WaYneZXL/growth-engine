import { Zap, CheckCircle2, XCircle, Bot, TrendingUp, DollarSign, RotateCcw } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { agentStats, gmvWeeklyTrend, dashboardImpact, products, formatCurrency } from '../data/mockData';

const actionBreakdown = [
  { name: 'Approved', value: agentStats.approved, color: 'var(--success)' },
  { name: 'Auto-applied', value: agentStats.autoApplied, color: 'var(--ai)' },
  { name: 'Skipped', value: agentStats.skipped, color: 'var(--text-3)' },
];

const lifecycleStages = (() => {
  const stages = { growing: 0, declining: 0, new: 0, mature: 0 };
  products.forEach(p => { stages[p.status] = (stages[p.status] || 0) + 1; });
  return [
    { name: 'Growing', value: stages.growing, color: '#10b981' },
    { name: 'Declining', value: stages.declining, color: '#ef4444' },
    { name: 'New', value: stages.new, color: '#7c5cfc' },
    { name: 'Mature', value: stages.mature, color: '#f59e0b' },
  ].filter(s => s.value > 0);
})();

// Override rate trend (mock)
const overrideTrend = [
  { week: 'W1', rate: 22 }, { week: 'W2', rate: 20 }, { week: 'W3', rate: 18 },
  { week: 'W4', rate: 19 }, { week: 'W5', rate: 16 }, { week: 'W6', rate: 17 },
  { week: 'W7', rate: 15 }, { week: 'W8', rate: 14 }, { week: 'W9', rate: 13 },
  { week: 'W10', rate: 14 }, { week: 'W11', rate: 12 }, { week: 'W12', rate: 14 },
];

export default function Performance() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>Agent Performance</div>
        <div style={{ fontSize: 13, color: 'var(--text-3)' }}>How well is the agent performing for your portfolio</div>
      </div>

      {/* Impact metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'GMV Influenced', value: formatCurrency(agentStats.revenueImpact), icon: DollarSign, color: 'var(--success)' },
          { label: 'Actions Taken', value: agentStats.actionsThisWeek, icon: Zap, color: 'var(--ai)' },
          { label: 'Approval Rate', value: `${Math.round((agentStats.approved / agentStats.actionsThisWeek) * 100)}%`, icon: CheckCircle2, color: 'var(--success)' },
          { label: 'Override Rate', value: `${agentStats.overrideRate}%`, icon: RotateCcw, color: 'var(--warning)' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `${stat.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} style={{ color: stat.color }} />
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Actions breakdown */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 12, padding: 20,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16 }}>Actions Breakdown</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={actionBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {actionBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{value}</span>}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio health */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 12, padding: 20,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16 }}>Portfolio Lifecycle</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={lifecycleStages} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
                formatter={(value) => [`${value} SKUs`, '']}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                {lifecycleStages.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue impact trend */}
      <div style={{
        background: '#fff', border: '1px solid var(--border)',
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16 }}>Revenue Impact Trend (12 weeks)</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={gmvWeeklyTrend}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ai)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--ai)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
            />
            <Area type="monotone" dataKey="total" stroke="var(--ai)" fill="url(#gradRevenue)" strokeWidth={2} name="Total GMV" />
            <Area type="monotone" dataKey="affiliate" stroke="var(--brand)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="Affiliate" />
            <Area type="monotone" dataKey="aigc" stroke="var(--success)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="AIGC" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Override rate trend */}
      <div style={{
        background: '#fff', border: '1px solid var(--border)',
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Override Rate Trend</div>
          <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Improving — down from 22% to {agentStats.overrideRate}%</span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={overrideTrend}>
            <defs>
              <linearGradient id="gradOverride" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--warning)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--warning)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} domain={[0, 30]} tickFormatter={v => `${v}%`} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
              formatter={(value) => [`${value}%`, 'Override Rate']}
            />
            <Area type="monotone" dataKey="rate" stroke="var(--warning)" fill="url(#gradOverride)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Portfolio summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 12, padding: '18px 20px',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-1)' }}>{formatCurrency(dashboardImpact.gmv.value)}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Total GMV (30d)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <TrendingUp size={12} style={{ color: 'var(--success)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)' }}>+{dashboardImpact.gmv.change}%</span>
          </div>
        </div>
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 12, padding: '18px 20px',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--success)' }}>{formatCurrency(dashboardImpact.savings.value)}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Cost Saved</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6 }}>{dashboardImpact.savings.description}</div>
        </div>
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 12, padding: '18px 20px',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-1)' }}>{products.length}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Active SKUs</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6 }}>Across 3 channels</div>
        </div>
      </div>
    </div>
  );
}
