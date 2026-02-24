import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, ArrowRight, BarChart3, Check, Loader2, Clock } from 'lucide-react';
import { copilotConversations, copilotQuickPrompts } from '../../data/mockData';

const mockResponses = [
  {
    type: 'steps',
    content: "Got it! Here's your TikTok launch plan for **Interactive Pet Toy**:",
    steps: [
      { label: 'Generate product images & video brief with AI',        status: 'done'   },
      { label: 'Create TikTok-optimized listing copy',                 status: 'done'   },
      { label: 'Publish listing to TikTok Shop',                      status: 'active' },
      { label: 'Match & invite 5 pet creators (AI recommended)',       status: 'pending' },
      { label: 'Set up performance alerts & 7-day review',             status: 'pending' },
    ],
    actions: [{ label: 'Run Full Launch Workflow', type: 'action' }, { label: 'View Matched Creators', type: 'insight' }],
  },
  {
    content: "Sales drop analysis:\n\n1. 3 SKUs haven't had listing updates in 45+ days\n2. Two top creators paused posting\n3. Competitors improved their listings significantly last month",
    actions: [{ label: 'Refresh Listing Content', type: 'action' }, { label: 'Re-engage Paused Creators', type: 'action' }],
  },
  {
    content: "Top 5 SKUs for fresh content:\n\n1. Wireless Earbuds Pro — needs updated lifestyle images\n2. Smart Watch Ultra — video performing well, create more\n3. Portable Blender — trending on TikTok\n4. Hydrating Serum — strong UGC, add AI images\n5. Interactive Pet Toy — viral potential",
    actions: [{ label: 'Generate All Content', type: 'action' }, { label: 'Customize by SKU', type: 'action' }],
  },
  {
    content: "Great question! Based on the last 30 days:\n\n• Your top 3 SKUs on TikTok have 5+ creators each\n• Conversion rates are 2.3x higher with linked creator videos\n• 4 SKUs aren't on TikTok yet — big opportunity",
    actions: [{ label: 'Expand SKUs to TikTok', type: 'action' }, { label: 'View Creator Analysis', type: 'insight' }],
  },
];

export default function CopilotPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState(copilotConversations);
  const [input, setInput]       = useState('');
  const [responseIdx, setResponseIdx] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const resp = mockResponses[responseIdx % mockResponses.length];
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user',      content: msg },
      { id: `a-${Date.now()}`, role: 'assistant', content: resp.content, actions: resp.actions, steps: resp.steps },
    ]);
    setInput('');
    setResponseIdx((v) => v + 1);
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 40 }} onClick={onClose} />
      <div className="animate-slide-in-right" style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 400, background: '#fff', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={15} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Growth Copilot</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>AI-powered growth assistant</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-2)' }}>
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '92%', borderRadius: msg.role === 'user' ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                padding: '10px 14px', fontSize: 13, lineHeight: 1.55,
                background: msg.role === 'user' ? 'var(--brand)' : 'var(--surface-2)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-1)',
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                {/* Stepper rendering */}
                {msg.steps && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {msg.steps.map((step, i) => {
                      const isDone   = step.status === 'done';
                      const isActive = step.status === 'active';
                      const isPending = step.status === 'pending';
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, position: 'relative' }}>
                          {/* Vertical connector line */}
                          {i < msg.steps.length - 1 && (
                            <div style={{ position: 'absolute', left: 9, top: 22, width: 1, height: 'calc(100% - 4px)', background: isDone ? 'rgba(16,185,129,0.4)' : 'rgba(148,163,184,0.3)', zIndex: 0 }} />
                          )}
                          {/* Status icon */}
                          <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, background: isDone ? 'rgba(16,185,129,0.15)' : isActive ? 'rgba(99,102,241,0.15)' : 'rgba(148,163,184,0.12)', border: `1.5px solid ${isDone ? 'rgba(16,185,129,0.5)' : isActive ? 'rgba(99,102,241,0.5)' : 'rgba(148,163,184,0.3)'}` }}>
                            {isDone   && <Check size={10} style={{ color: 'var(--success)' }} />}
                            {isActive && <Loader2 size={10} style={{ color: 'var(--brand)', animation: 'spin 1s linear infinite' }} />}
                            {isPending && <Clock size={9} style={{ color: 'var(--text-3)' }} />}
                          </div>
                          <div style={{ paddingBottom: 12, flex: 1 }}>
                            <span style={{ fontSize: 12, color: isDone ? 'var(--text-3)' : isActive ? 'var(--text-1)' : 'var(--text-2)', fontWeight: isActive ? 600 : 400, textDecoration: isDone ? 'line-through' : 'none' }}>
                              {step.label}
                            </span>
                            {isActive && <span style={{ display: 'inline-block', marginLeft: 6, fontSize: 10, fontWeight: 600, color: 'var(--brand)' }}>● In progress</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {msg.actions && (
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {msg.actions.map((action, i) => (
                      <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '7px 10px', borderRadius: 8, fontSize: 11, fontWeight: 500, border: action.type === 'action' ? 'none' : '1px solid var(--border)', background: action.type === 'action' ? 'rgba(99,102,241,0.12)' : 'var(--surface)', color: action.type === 'action' ? 'var(--brand)' : 'var(--text-2)', cursor: 'pointer' }}>
                        {action.type === 'action' ? <ArrowRight size={12} /> : <BarChart3 size={12} />}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Quick prompts</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {copilotQuickPrompts.map((prompt, i) => (
                <button key={i} onClick={() => handleSend(prompt)} style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 8, fontSize: 12, color: 'var(--text-2)', background: 'var(--surface-2)', border: 'none', cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.07)'; e.currentTarget.style.color = 'var(--brand)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-2)'; }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, flexShrink: 0 }}>
          <input
            className="input"
            style={{ flex: 1, height: 40, borderRadius: 10 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Growth Copilot..."
          />
          <button onClick={() => handleSend()} style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand)'}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
