import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function MetricCard({ title, value, subtitle, change, trend, icon: Icon, iconColor }) {
  const isPositive = change > 0;

  return (
    <div className="card card-hover" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {Icon && (
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${iconColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={17} style={{ color: iconColor }} />
            </div>
          )}
          <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{title}</span>
        </div>
        {trend && (
          <div style={{ width: 64, height: 32 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend.map((v, i) => ({ v, i }))}>
                <Line type="monotone" dataKey="v" stroke={isPositive ? 'var(--success)' : 'var(--danger)'} strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
        {change !== undefined && change !== null && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 600, color: isPositive ? 'var(--success)' : 'var(--danger)' }}>
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isPositive ? '+' : ''}{change}%
          </span>
        )}
        {subtitle && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{subtitle}</span>}
      </div>
    </div>
  );
}
