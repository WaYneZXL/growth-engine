import { useState } from 'react';
import { Sparkles, Zap, CheckCircle2, TrendingUp, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useActionQueue } from '../context/ActionQueueContext';
import ActionCard from '../components/shared/ActionCard';

const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export default function ActionQueue() {
  const { actions, handleApply: ctxApply, handleSkip: ctxSkip, handleUndo } = useActionQueue();
  const [toast, setToast] = useState(null);
  const [completedExpanded, setCompletedExpanded] = useState(false);

  const pending = actions
    .filter(a => a.status === 'pending')
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const resolved = actions.filter(a => a.status === 'resolved');
  const skipped = actions.filter(a => a.status === 'skipped');

  const totalPending = pending.length;
  const totalCompleted = resolved.length;
  const totalImpact = pending.reduce((sum, a) => sum + a.impactValue, 0);
  const weeklyActions = actions.length + 4; // mock: include some from earlier in the week

  // Learnings (category === 'learning' and still pending)
  const learnings = pending.filter(a => a.category === 'learning');
  const actionItems = pending.filter(a => a.category !== 'learning');

  const handleApply = (id) => {
    ctxApply(id);
    const action = actions.find(a => a.id === id);
    showToast(`Applied: ${action?.title || 'Action'}`);
  };

  const handleSkip = (id, reason) => {
    ctxSkip(id, reason);
    showToast("Noted \u2014 I'll adjust future suggestions");
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

      {/* ═══════════════════════════════════════
          Morning Briefing Banner
          ═══════════════════════════════════════ */}
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
          {totalPending} actions ready{totalImpact > 0 && <span style={{ color: 'var(--ai)' }}> · Est. ${totalImpact.toLocaleString()} revenue impact</span>}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 680 }}>
          Your top priority is a revenue risk on Portable Blender's TikTok listing. You also have growth opportunities for Wireless Earbuds Pro and content gaps to close across 8 SKUs. Scroll through each action to review, edit, or apply.
        </div>
      </div>

      {/* ═══════════════════════════════════════
          Summary Stat Bar
          ═══════════════════════════════════════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }}>
        {[
          { label: 'Actions pending', value: totalPending, dotColor: '#f59e0b', icon: <Zap size={14} /> },
          { label: 'Completed today', value: totalCompleted, dotColor: '#10b981', icon: <CheckCircle2 size={14} /> },
          { label: 'Total impact', value: `$${totalImpact.toLocaleString()}`, dotColor: 'var(--ai)', icon: <Sparkles size={14} /> },
          { label: 'Actions this week', value: weeklyActions, dotColor: 'var(--brand)', icon: <TrendingUp size={14} /> },
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `${stat.dotColor}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: stat.dotColor, flexShrink: 0,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          Action Cards
          ═══════════════════════════════════════ */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
            Pending Actions
          </h2>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600, color: 'var(--ai)',
            background: 'rgba(124,92,252,0.08)', padding: '4px 12px', borderRadius: 10,
          }}>
            <Sparkles size={12} /> Sorted by impact
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {actionItems.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onApply={handleApply}
              onSkip={handleSkip}
            />
          ))}
        </div>

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
      </div>

      {/* ═══════════════════════════════════════
          Completed Section
          ═══════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════
          Patterns & Learnings
          ═══════════════════════════════════════ */}
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
