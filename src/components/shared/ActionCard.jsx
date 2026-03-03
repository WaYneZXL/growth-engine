import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Loader2, Undo2 } from 'lucide-react';
import SkipFeedback from './SkipFeedback';

const priorityConfig = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', label: 'Revenue at Risk', icon: '\ud83d\udfe2' },
  high:     { color: '#f06b25', bg: 'rgba(240,107,37,0.08)', label: 'High Priority',   icon: '\ud83d\udfe0' },
  medium:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', label: 'Optimization',     icon: '\ud83d\udfe1' },
  low:      { color: '#7c5cfc', bg: 'rgba(124,92,252,0.08)', label: 'Suggestion',       icon: '\ud83d\udfe3' },
};

const categoryLabels = {
  'revenue-risk': 'Revenue at Risk',
  'optimization': 'Optimization',
  'growth': 'Growth Opportunity',
  'learning': 'Pattern Insight',
};

const channelBadge = {
  tiktok:  { label: 'TikTok',  color: '#ff0050' },
  shopify: { label: 'Shopify', color: '#96bf48' },
  amazon:  { label: 'Amazon',  color: '#ff9900' },
};

export default function ActionCard({ action, onApply, onSkip, onUndo, isResolved, variant = 'full' }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [showSkipFeedback, setShowSkipFeedback] = useState(false);
  const [applying, setApplying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const compact = variant === 'compact';
  const cfg = priorityConfig[action.priority] || priorityConfig.medium;

  const handleApply = (customText) => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      onApply(action.id, customText || null);
    }, compact ? 800 : 1500);
  };

  const handleSkipSelect = (reason) => {
    setShowSkipFeedback(false);
    setFadeOut(true);
    setTimeout(() => {
      onSkip(action.id, reason);
    }, 300);
  };

  const handleEditApply = () => {
    handleApply(editText);
    setEditing(false);
  };

  // Resolved card
  if (isResolved) {
    return (
      <div style={{
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--success)',
        borderRadius: compact ? 10 : 12,
        padding: compact ? '10px 14px' : '14px 20px',
        background: 'var(--surface)',
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'opacity 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 10 }}>
          <div style={{
            width: compact ? 18 : 22, height: compact ? 18 : 22, borderRadius: '50%',
            background: 'rgba(16,185,129,0.12)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={compact ? 10 : 13} style={{ color: 'var(--success)' }} />
          </div>
          <span style={{ fontSize: compact ? 12 : 13, color: 'var(--text-2)' }}>{action.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}>
          <span style={{ fontSize: compact ? 10 : 11, color: 'var(--text-3)' }}>Just now</span>
          {onUndo && (
            <button
              onClick={() => onUndo(action.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 11, fontWeight: 600, color: 'var(--brand)',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <Undo2 size={12} /> Undo
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: compact ? 10 : 12,
        padding: compact ? 14 : 20,
        background: '#fff',
        boxShadow: compact ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'translateX(40px)' : 'translateX(0)',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: compact ? 6 : 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8 }}>
          <span style={{
            fontSize: compact ? 9 : 10, fontWeight: 700, letterSpacing: '0.05em',
            color: cfg.color, background: cfg.bg,
            padding: compact ? '2px 7px' : '3px 10px', borderRadius: 4,
            textTransform: 'uppercase',
          }}>
            {categoryLabels[action.category] || action.category}
          </span>
          {action.channel && channelBadge[action.channel] && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: compact ? 9 : 10, fontWeight: 500, color: 'var(--text-3)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: channelBadge[action.channel].color,
              }} />
              {channelBadge[action.channel].label}
            </span>
          )}
        </div>
        <span style={{
          fontSize: compact ? 12 : 14, fontWeight: 700,
          color: action.category === 'revenue-risk' ? 'var(--danger)' : action.category === 'learning' ? 'var(--ai)' : 'var(--text-1)',
        }}>
          {action.impactLabel}
        </span>
      </div>

      {/* Title */}
      <div style={{ fontSize: compact ? 13 : 15, fontWeight: 600, color: 'var(--text-1)', marginBottom: compact ? 4 : 6 }}>
        {action.skuName && <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{action.skuName} — </span>}
        {action.title}
      </div>

      {/* Subtitle / problem statement */}
      <div style={{
        fontSize: compact ? 12 : 13, color: 'var(--text-2)', lineHeight: 1.6,
        marginBottom: compact ? 10 : 12,
        ...(compact ? {
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } : {}),
      }}>
        {action.subtitle}
      </div>

      {/* Expandable reasoning — full variant only */}
      {!compact && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 12, fontWeight: 600, color: 'var(--ai)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, marginBottom: expanded ? 10 : 14,
            }}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            Why this matters
          </button>

          {expanded && (
            <div style={{
              background: 'rgba(124,92,252,0.03)',
              border: '1px solid rgba(124,92,252,0.08)',
              borderRadius: 8,
              padding: '14px 16px',
              marginBottom: 14,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {action.reasoning.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12.5, lineHeight: 1.6 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(124,92,252,0.1)', color: 'var(--ai)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, marginTop: 1,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ color: 'var(--text-2)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Recommendation — full variant only */}
      {!compact && (
        <div style={{
          background: 'var(--surface-2)',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
            Recommended
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500, marginBottom: action.recommendation.before ? 10 : 0 }}>
            {action.recommendation.description}
          </div>

          {/* Before/After preview */}
          {action.recommendation.before && !editing && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--danger)', textTransform: 'uppercase', marginBottom: 4 }}>Current</div>
                <div style={{
                  fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5,
                  padding: '8px 10px', background: 'rgba(239,68,68,0.04)',
                  border: '1px solid rgba(239,68,68,0.1)', borderRadius: 6,
                }}>
                  {action.recommendation.before}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase', marginBottom: 4 }}>Proposed</div>
                <div style={{
                  fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5, fontWeight: 500,
                  padding: '8px 10px', background: 'rgba(16,185,129,0.04)',
                  border: '1px solid rgba(16,185,129,0.1)', borderRadius: 6,
                }}>
                  {action.recommendation.after}
                </div>
              </div>
            </div>
          )}

          {/* Inline edit mode */}
          {editing && (
            <div style={{ marginTop: 10 }}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder={action.recommendation.after || 'Describe your preferred changes...'}
                autoFocus
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: 13,
                  border: '1px solid var(--ai)',
                  borderRadius: 8,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.5,
                  boxShadow: '0 0 0 3px rgba(124,92,252,0.1)',
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  onClick={handleEditApply}
                  style={{
                    fontSize: 12, fontWeight: 600, padding: '6px 14px',
                    borderRadius: 6, background: 'var(--ai)', color: '#fff',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Apply edited version
                </button>
                <button
                  onClick={() => setEditing(false)}
                  style={{
                    fontSize: 12, fontWeight: 500, padding: '6px 14px',
                    borderRadius: 6, background: 'none', color: 'var(--text-2)',
                    border: '1px solid var(--border)', cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {!editing && (
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 8, position: 'relative' }}>
          <button
            onClick={() => handleApply()}
            disabled={applying}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: compact ? 4 : 6,
              fontSize: compact ? 11 : 13, fontWeight: 600,
              padding: compact ? '5px 10px' : '8px 18px',
              borderRadius: compact ? 6 : 8, border: 'none',
              cursor: applying ? 'default' : 'pointer',
              background: applying ? 'var(--success)' : 'var(--brand)',
              color: '#fff', transition: 'background 0.2s',
              minWidth: compact ? 60 : 90,
              justifyContent: 'center',
            }}
          >
            {applying ? (
              <>
                <Loader2 size={compact ? 10 : 14} style={{ animation: 'spin 1s linear infinite' }} />
                {compact ? '...' : 'Applying...'}
              </>
            ) : (
              <>
                <Check size={compact ? 10 : 14} /> Apply
              </>
            )}
          </button>
          {/* Edit button — full variant only */}
          {!compact && (
            <button
              onClick={() => {
                setEditing(true);
                setEditText(action.recommendation.after || '');
              }}
              style={{
                fontSize: 13, fontWeight: 500, padding: '8px 14px',
                borderRadius: 8, background: 'transparent', color: 'var(--text-1)',
                border: '1px solid var(--border)', cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              Edit
            </button>
          )}
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <button
              onClick={() => setShowSkipFeedback(!showSkipFeedback)}
              style={{
                fontSize: compact ? 11 : 13, color: 'var(--text-3)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: compact ? '5px 4px' : '8px 4px', fontWeight: 500,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-2)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-3)'}
            >
              Skip
            </button>
            {showSkipFeedback && (
              <SkipFeedback
                onSelect={handleSkipSelect}
                onClose={() => setShowSkipFeedback(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* Timestamp — full variant only */}
      {!compact && (
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 12, textAlign: 'right' }}>
          {action.createdAt}
        </div>
      )}
    </div>
  );
}
