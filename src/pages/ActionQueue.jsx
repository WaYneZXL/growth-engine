import { useState } from 'react';
import { Sparkles, Zap, CheckCircle2, TrendingUp, ChevronDown, ChevronUp, X, Clock, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useActionQueue } from '../context/ActionQueueContext';
import ActionCard from '../components/shared/ActionCard';
import AgentMessage from '../components/shared/AgentMessage';
import ActivityTimeline from '../components/shared/ActivityTimeline';
import { agentActivity, agentStats, gmvWeeklyTrend, dashboardImpact, formatCurrency } from '../data/mockData';

const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

function ForYouTab({ actions, handleApply, handleSkip, handleUndo }) {
  const [completedExpanded, setCompletedExpanded] = useState(false);

  const pending = actions
    .filter(a => a.status === 'pending')
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const resolved = actions.filter(a => a.status === 'resolved');
  const skipped = actions.filter(a => a.status === 'skipped');

  const totalPending = pending.length;
  const totalImpact = pending.reduce((sum, a) => sum + a.impactValue, 0);

  const learnings = pending.filter(a => a.category === 'learning');
  const actionItems = pending.filter(a => a.category !== 'learning');

  // Group actions by SKU for agent narrative
  const earbudsActions = actionItems.filter(a => a.sku === 'SKU-0042');
  const otherActions = actionItems.filter(a => a.sku !== 'SKU-0042');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Batch apply bar */}
      {actionItems.length >= 3 && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'rgba(240,107,37,0.04)',
          border: '1px solid rgba(240,107,37,0.12)',
          borderRadius: 10,
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
            {totalPending} actions pending · {formatCurrency(totalImpact)} total impact
          </span>
          <button
            onClick={() => {
              const topActions = actionItems.slice(0, 3);
              topActions.forEach(a => handleApply(a.id));
            }}
            style={{
              fontSize: 12, fontWeight: 600, padding: '6px 14px',
              borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'var(--brand)', color: '#fff',
            }}
          >
            Apply top 3
          </button>
        </div>
      )}

      {/* Agent narrative for Earbuds cluster */}
      {earbudsActions.length >= 2 && (
        <>
          <AgentMessage message={`I noticed ${earbudsActions.length} actions relate to Wireless Earbuds Pro. This SKU is growing 25% MoM but has listing quality gaps on Shopify and no dedicated TikTok creators. Here's what I recommend in priority order:`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {earbudsActions.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                onApply={handleApply}
                onSkip={handleSkip}
              />
            ))}
          </div>
        </>
      )}

      {/* Remaining actions */}
      {otherActions.length > 0 && (
        <>
          {earbudsActions.length >= 2 && (
            <AgentMessage message="Here are the remaining actions, sorted by impact:" />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {otherActions.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                onApply={handleApply}
                onSkip={handleSkip}
              />
            ))}
          </div>
        </>
      )}

      {actionItems.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '48px 20px',
          color: 'var(--text-3)', fontSize: 14,
        }}>
          <CheckCircle2 size={32} style={{ color: 'var(--success)', marginBottom: 12 }} />
          <div style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }}>All caught up!</div>
          <div>No pending actions. Check back later for new recommendations.</div>
        </div>
      )}

      {/* Completed section */}
      {(resolved.length > 0 || skipped.length > 0) && (
        <div>
          <button
            onClick={() => setCompletedExpanded(!completedExpanded)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, width: '100%',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 0', fontSize: 13, fontWeight: 600,
              color: 'var(--text-2)',
            }}
          >
            {completedExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Completed today ({resolved.length + skipped.length})
          </button>

          {completedExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              {resolved.map(action => (
                <ActionCard
                  key={action.id}
                  action={action}
                  isResolved
                  onUndo={handleUndo}
                />
              ))}
              {skipped.map(action => (
                <div
                  key={action.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderLeft: '3px solid var(--text-3)',
                    borderRadius: 12,
                    padding: '14px 20px',
                    background: 'var(--surface)',
                    opacity: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-3)', textDecoration: 'line-through' }}>{action.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Skipped</span>
                    <button
                      onClick={() => handleUndo(action.id)}
                      style={{
                        fontSize: 11, fontWeight: 600, color: 'var(--brand)',
                        background: 'none', border: 'none', cursor: 'pointer',
                      }}
                    >
                      Undo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Learnings */}
      {learnings.length > 0 && (
        <div>
          <h2 style={{
            fontSize: 13, fontWeight: 600, color: 'var(--text-2)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            marginBottom: 12,
          }}>
            Patterns & Learnings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {learnings.map(action => (
              <div
                key={action.id}
                style={{
                  border: '1px solid rgba(124,92,252,0.15)',
                  borderLeft: '3px solid var(--ai)',
                  borderRadius: 12,
                  padding: 20,
                  background: 'rgba(124,92,252,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                    color: 'var(--ai)', background: 'rgba(124,92,252,0.08)',
                    padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase',
                  }}>
                    Pattern Insight
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 6 }}>
                  {action.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 14 }}>
                  {action.subtitle}
                </div>
                <div style={{
                  background: 'rgba(124,92,252,0.04)',
                  borderRadius: 8, padding: '10px 14px', marginBottom: 14,
                }}>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--ai)' }}>Recommendation:</strong> {action.recommendation.description}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleApply(action.id)}
                    style={{
                      fontSize: 12, fontWeight: 600, padding: '6px 14px',
                      borderRadius: 6, background: 'var(--ai)', color: '#fff',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    Apply suggestion
                  </button>
                  <button
                    onClick={() => handleSkip(action.id, 'dismissed')}
                    style={{
                      fontSize: 12, color: 'var(--text-3)',
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }}>Agent Activity</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>What the agent has been doing today</div>
      </div>
      <ActivityTimeline events={agentActivity} />
    </div>
  );
}

function DigestTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Morning briefing */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,92,252,0.06), rgba(159,133,255,0.04))',
        border: '1px solid rgba(124,92,252,0.12)',
        borderRadius: 14,
        padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Sparkles size={16} style={{ color: 'var(--ai)' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Morning Briefing</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>
          Your portfolio is up 18.2% this month. 3 SKUs need attention today — Portable Blender TikTok CVR is dropping fast.
          Wireless Earbuds Pro has untapped creator potential worth $4.8K/mo. 8 SKUs have zero video content on TikTok.
        </div>
      </div>

      {/* Agent impact scorecard */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 12 }}>Agent Impact This Week</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Actions taken', value: agentStats.actionsThisWeek, color: 'var(--ai)' },
            { label: 'Approved', value: agentStats.approved, color: 'var(--success)' },
            { label: 'Auto-applied', value: agentStats.autoApplied, color: 'var(--brand)' },
            { label: 'Skipped', value: agentStats.skipped, color: 'var(--text-3)' },
            { label: 'Revenue impact', value: formatCurrency(agentStats.revenueImpact), color: 'var(--success)' },
            { label: 'Override rate', value: `${agentStats.overrideRate}%`, color: 'var(--warning)' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* GMV chart */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 12 }}>Revenue Trend (12 weeks)</div>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '16px 16px 8px',
        }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={gmvWeeklyTrend}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="total" stroke="var(--ai)" fill="url(#gradTotal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio health */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 12 }}>Portfolio Health</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-1)' }}>{formatCurrency(dashboardImpact.gmv.value)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Total GMV (30d)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <TrendingUp size={12} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--success)' }}>+{dashboardImpact.gmv.change}%</span>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--success)' }}>{formatCurrency(dashboardImpact.savings.value)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Saved this month</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{dashboardImpact.savings.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: 'foryou', label: 'For You', icon: Zap },
  { id: 'activity', label: 'Activity', icon: Clock },
  { id: 'digest', label: 'Digest', icon: BarChart3 },
];

export default function ActionQueue() {
  const { actions, handleApply: ctxApply, handleSkip: ctxSkip, handleUndo, activeTab, setActiveTab } = useActionQueue();
  const [toast, setToast] = useState(null);

  const pending = actions.filter(a => a.status === 'pending');
  const totalImpact = pending.reduce((sum, a) => sum + a.impactValue, 0);

  const handleApply = (id) => {
    ctxApply(id);
    const action = actions.find(a => a.id === id);
    showToast(`Applied: ${action?.title || 'Action'}`);
  };

  const handleSkip = (id, reason) => {
    ctxSkip(id, reason);
    showToast("Noted — I'll adjust future suggestions");
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 1000,
          background: 'var(--text-1)', color: '#fff',
          padding: '10px 18px', borderRadius: 10,
          fontSize: 13, fontWeight: 500,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 8,
          animation: 'fade-in-up 0.2s ease-out',
        }}>
          <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
          {toast}
          <button
            onClick={() => setToast(null)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0, marginLeft: 8 }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Morning Briefing Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,92,252,0.06), rgba(159,133,255,0.04))',
        border: '1px solid rgba(124,92,252,0.12)',
        borderRadius: 14,
        padding: '24px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Sparkles size={18} style={{ color: 'var(--ai)' }} className="animate-sparkle" />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3, marginBottom: 8 }}>
          {pending.length} actions ready{totalImpact > 0 && <span style={{ color: 'var(--ai)' }}> · Est. ${totalImpact.toLocaleString()} revenue impact</span>}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 680 }}>
          Your top priority is a revenue risk on Portable Blender's TikTok listing. You also have growth opportunities for Wireless Earbuds Pro and content gaps to close across 8 SKUs.
        </div>
      </div>

      {/* Tab navigation */}
      <div style={{
        display: 'flex', gap: 2,
        background: 'var(--surface-2)',
        borderRadius: 10,
        padding: 3,
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--text-1)' : 'var(--text-3)',
                background: isActive ? '#fff' : 'transparent',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'foryou' && (
        <ForYouTab actions={actions} handleApply={handleApply} handleSkip={handleSkip} handleUndo={handleUndo} />
      )}
      {activeTab === 'activity' && <ActivityTab />}
      {activeTab === 'digest' && <DigestTab />}
    </div>
  );
}
