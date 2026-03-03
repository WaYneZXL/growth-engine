import { useState, useRef } from 'react';
import { Send, ChevronDown, Check, Brain } from 'lucide-react';
import { briefings } from '../../data/mockData';
import { useActionQueue } from '../../context/ActionQueueContext';
import ActionCard from '../shared/ActionCard';

/* ═══════════════════════════════════════════════
   Route helpers
   ═══════════════════════════════════════════════ */

function getBriefing(path) {
  if (briefings[path]) return briefings[path];
  if (path.startsWith('/products/')) return briefings['/products/:id'];
  if (path.startsWith('/creators/')) return briefings['/creators'];
  return briefings['/overview'];
}

function getRouteKey(path) {
  if (path === '/overview') return 'overview';
  if (path === '/products' || path.startsWith('/products/')) return 'products';
  if (path === '/content') return 'content';
  if (path === '/creators' || path.startsWith('/creators/')) return 'creators';
  if (path === '/workflows' || path.startsWith('/workflows/')) return 'workflows';
  return 'overview';
}

/* ═══════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════ */

function BriefingCard({ data, onAction }) {
  return (
    <div style={{
      background: 'rgba(99,102,241,0.04)',
      borderRadius: 10,
      padding: 14,
      marginBottom: 16,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {data.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
        {data.body}
      </div>
      <button onClick={onAction} style={{
        marginTop: 10,
        fontSize: 12, fontWeight: 600,
        padding: '6px 14px', borderRadius: 6,
        background: '#6366f1', color: '#fff',
        border: 'none', cursor: 'pointer',
      }}>
        {data.action}
      </button>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      margin: '12px 0 8px',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-3)', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  );
}

function LearningCard({ card, onDismiss, onAction }) {
  const [done, setDone] = useState(false);

  const handlePrimary = () => {
    setDone(true);
    if (onAction) onAction(card);
  };

  return (
    <div style={{
      borderRadius: 10,
      border: '1px solid rgba(139,92,246,0.2)',
      borderLeft: done ? '3px solid var(--success)' : '3px solid #8b5cf6',
      padding: 14,
      marginBottom: 8,
      background: done ? 'rgba(16,185,129,0.03)' : 'rgba(139,92,246,0.03)',
      opacity: done ? 0.7 : 1,
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: done ? 'var(--success)' : '#8b5cf6', letterSpacing: '0.05em' }}>
          {done ? <><Check size={10} /> QUEUED</> : <><Brain size={10} /> LEARNING</>}
        </span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 6 }}>
        {card.title}
      </div>
      <div style={{
        fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 10,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {done ? 'Task queued. Agent will process this and update you when complete.' : card.subtitle}
      </div>
      {!done && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={handlePrimary} style={{
            fontSize: 11, fontWeight: 500, padding: '5px 10px', borderRadius: 6,
            background: '#8b5cf6', color: '#fff', border: 'none', cursor: 'pointer',
          }}>
            Apply suggestion
          </button>
          <button onClick={() => onDismiss(card)} style={{
            fontSize: 11, color: 'var(--text-3)', background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px 0', marginLeft: 'auto',
          }}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════ */

const mockAIResponses = [
  "I'll look into that. Based on your current portfolio data, I can see a few relevant signals. Let me prepare a detailed analysis.",
  "Good question. Looking at the cross-channel data, I see an opportunity to optimize. I'll add an action card above with my recommendation.",
  "I've queued that as a task. You'll see it appear in your pending actions shortly with a full breakdown and one-click execution.",
];

export default function RightPanel({ currentPath, mode = 'contextual' }) {
  const { actions, handleApply, handleSkip, handleUndo } = useActionQueue();
  const briefing = getBriefing(currentPath);
  const routeKey = getRouteKey(currentPath);

  const [resolvedExpanded, setResolvedExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [responseIdx, setResponseIdx] = useState(0);
  const bottomRef = useRef(null);
  const pendingRef = useRef(null);

  // Derive filtered actions from shared state
  const pending = actions.filter(a => a.status === 'pending' && a.context?.includes(routeKey));
  const resolved = actions.filter(a => a.status === 'resolved');
  const allPending = actions.filter(a => a.status === 'pending');
  const learnings = allPending.filter(a => a.category === 'learning');

  const handleBriefingAction = () => {
    pendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const resp = mockAIResponses[responseIdx % mockAIResponses.length];
    setChatMessages(prev => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', content: input },
      { id: `a-${Date.now()}`, role: 'assistant', content: resp },
    ]);
    setInput('');
    setResponseIdx(v => v + 1);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* ── Fixed Header ── */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#6366f1', fontSize: 14, fontWeight: 600 }}>✦</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>One Agent</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--success)' }}>Active</span>
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>
          Monitoring 24 SKUs across 3 channels · Last action: 3 min ago
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 18px' }}>
        <div className="rp-stagger">

          {mode === 'summary' ? (
            /* ═══════════ Summary mode (ActionQueue page) ═══════════ */
            <>
              {/* Compact stats */}
              <div style={{
                display: 'flex', gap: 10, marginBottom: 16,
              }}>
                <div style={{
                  flex: 1, background: 'rgba(245,158,11,0.06)', borderRadius: 8,
                  padding: '10px 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)' }}>{allPending.length}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500 }}>Pending</div>
                </div>
                <div style={{
                  flex: 1, background: 'rgba(16,185,129,0.06)', borderRadius: 8,
                  padding: '10px 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)' }}>{resolved.length}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500 }}>Completed</div>
                </div>
              </div>

              {/* Resolved section (collapsed) */}
              {resolved.length > 0 && (
                <>
                  <button
                    onClick={() => setResolvedExpanded(v => !v)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '12px 0 4px', fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.08em', color: 'var(--text-3)', textTransform: 'uppercase',
                    }}
                  >
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Resolved ({resolved.length})
                      <ChevronDown size={10} style={{
                        transform: resolvedExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }} />
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </button>
                  {resolvedExpanded && resolved.map(action => (
                    <div key={action.id} style={{ marginBottom: 6 }}>
                      <ActionCard
                        action={action}
                        isResolved
                        variant="compact"
                        onUndo={handleUndo}
                      />
                    </div>
                  ))}
                </>
              )}

              {/* Learnings */}
              {learnings.length > 0 && (
                <>
                  <SectionLabel label="Learning" />
                  {learnings.map(action => (
                    <LearningCard
                      key={action.id}
                      card={action}
                      onDismiss={() => handleSkip(action.id, 'dismissed')}
                      onAction={() => handleApply(action.id)}
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            /* ═══════════ Contextual mode (all other pages) ═══════════ */
            <>
              {/* Briefing */}
              <div className="rp-card-anim" style={{ animationDelay: '0ms' }}>
                <BriefingCard data={briefing} onAction={handleBriefingAction} />
              </div>

              {/* Pending actions filtered by route */}
              <div ref={pendingRef} />
              {pending.length > 0 && (
                <>
                  <SectionLabel label={`Pending · ${pending.length}`} />
                  {pending.map((action, i) => (
                    <div key={action.id} className="rp-card-anim" style={{ animationDelay: `${(i + 1) * 50}ms`, marginBottom: 8 }}>
                      <ActionCard
                        action={action}
                        variant="compact"
                        onApply={handleApply}
                        onSkip={handleSkip}
                      />
                    </div>
                  ))}
                </>
              )}

              {pending.length === 0 && (
                <div style={{
                  textAlign: 'center', padding: '20px 10px',
                  color: 'var(--text-3)', fontSize: 12,
                }}>
                  <Check size={18} style={{ color: 'var(--success)', marginBottom: 6 }} />
                  <div>No pending actions for this page.</div>
                </div>
              )}

              {/* Resolved */}
              {resolved.length > 0 && (
                <>
                  <button
                    onClick={() => setResolvedExpanded(v => !v)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '12px 0 4px', fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.08em', color: 'var(--text-3)', textTransform: 'uppercase',
                    }}
                  >
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Resolved ({resolved.length})
                      <ChevronDown size={10} style={{
                        transform: resolvedExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }} />
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </button>
                  {resolvedExpanded && resolved.map(action => (
                    <div key={action.id} style={{ marginBottom: 6 }}>
                      <ActionCard
                        action={action}
                        isResolved
                        variant="compact"
                        onUndo={handleUndo}
                      />
                    </div>
                  ))}
                </>
              )}

              {/* Learning */}
              {learnings.length > 0 && (
                <>
                  <SectionLabel label="Learning" />
                  {learnings.map(action => (
                    <LearningCard
                      key={action.id}
                      card={action}
                      onDismiss={() => handleSkip(action.id, 'dismissed')}
                      onAction={() => handleApply(action.id)}
                    />
                  ))}
                </>
              )}
            </>
          )}

          {/* Chat messages */}
          {chatMessages.length > 0 && (
            <>
              <SectionLabel label="Conversation" />
              {chatMessages.map(msg => (
                <div key={msg.id} style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 6,
                }}>
                  <div style={{
                    maxWidth: '88%',
                    borderRadius: msg.role === 'user' ? '10px 10px 3px 10px' : '10px 10px 10px 3px',
                    padding: '8px 12px',
                    fontSize: 12,
                    lineHeight: 1.5,
                    background: msg.role === 'user' ? '#6366f1' : 'var(--surface-2)',
                    color: msg.role === 'user' ? '#fff' : 'var(--text-1)',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Fixed Bottom Input ── */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        gap: 6,
        flexShrink: 0,
      }}>
        <input
          className="input"
          style={{ flex: 1, height: 34, borderRadius: 8, fontSize: 12 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask or assign a task..."
        />
        <button
          onClick={handleSend}
          style={{
            width: 34, height: 34, borderRadius: 8,
            background: '#6366f1', color: '#fff',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#4f46e5'}
          onMouseLeave={e => e.currentTarget.style.background = '#6366f1'}
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}
