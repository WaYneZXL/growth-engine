import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, ArrowRight, BarChart3 } from 'lucide-react';
import { copilotConversations, copilotQuickPrompts } from '../data/mockData';

const mockResponses = [
  {
    content: "I've analyzed your product catalog and identified several growth opportunities:\n\n**Quick Wins:**\n1. 4 SKUs have high-performing TikTok content but aren't listed on TikTok Shop yet\n2. Your top 3 creators haven't received updated product briefs in 30+ days\n3. 6 product listings are missing optimized keywords\n\n**Biggest Impact:**\n• Expanding 'Interactive Pet Toy' to Shopify could add ~$8k/month based on category trends",
    actions: [{ label: 'Expand to New Channels', type: 'action' }, { label: 'Update Creator Briefs', type: 'action' }, { label: 'View Full Analysis', type: 'insight' }],
  },
  {
    content: "Based on the upcoming Spring Sale, here's my recommended prep plan:\n\n**Priority SKUs:**\n1. Portable Blender — trending, high creator engagement\n2. Wireless Earbuds Pro — bestseller, strong conversion\n3. Resistance Bands Set — seasonal fitness demand\n\n**Timeline:**\n• Day 1–2: Generate sale-specific creative assets\n• Day 2–3: Coordinate creator posting schedule\n• Day 3: Update all listings with sale pricing",
    actions: [{ label: 'Start Pre-Sale Workflow', type: 'action' }, { label: 'Customize SKU Selection', type: 'action' }],
  },
  {
    content: "Here's a breakdown of underperforming SKUs:\n\n🔴 **LED Desk Lamp Pro** — Listing score dropped to 72. Images are outdated and missing key features.\n\n🔴 **Premium Yoga Mat** — Creator content paused 3 weeks ago. Top creators shifted to competitors.\n\n🟡 **Bamboo Cutting Board Set** — Amazon only, zero creator partnerships. No cross-channel presence.",
    actions: [{ label: 'Refresh Underperforming Listings', type: 'action' }, { label: 'Re-engage Paused Creators', type: 'action' }, { label: 'View Diagnostics', type: 'insight' }],
  },
];

export default function AICopilot() {
  const [messages, setMessages] = useState(copilotConversations);
  const [input, setInput]       = useState('');
  const [responseIdx, setResponseIdx] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const resp = mockResponses[responseIdx % mockResponses.length];
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user',      content: msg },
      { id: `a-${Date.now()}`, role: 'assistant', content: resp.content, actions: resp.actions },
    ]);
    setInput('');
    setResponseIdx((v) => v + 1);
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={18} style={{ color: 'var(--brand)' }} />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Growth Copilot</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>AI-powered assistant for your growth engine</p>
        </div>
      </div>

      {/* Chat window */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 220px)' }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '12px 16px', fontSize: 13, lineHeight: 1.6,
                background: msg.role === 'user' ? 'var(--brand)' : 'var(--surface-2)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-1)',
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                {msg.actions && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {msg.actions.map((action, i) => (
                      <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, border: action.type === 'action' ? 'none' : '1px solid var(--border)', background: action.type === 'action' ? 'rgba(99,102,241,0.12)' : 'var(--surface)', color: action.type === 'action' ? 'var(--brand)' : 'var(--text-2)', cursor: 'pointer', transition: 'background 0.15s' }}>
                        {action.type === 'action' ? <ArrowRight size={13} /> : <BarChart3 size={13} />}
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
          <div style={{ padding: '0 24px 16px' }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Suggested prompts</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
              {copilotQuickPrompts.map((prompt, i) => (
                <button key={i} onClick={() => handleSend(prompt)} style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 8, fontSize: 13, color: 'var(--text-2)', background: 'var(--surface-2)', border: 'none', cursor: 'pointer', lineHeight: 1.4, transition: 'background 0.15s, color 0.15s' }}
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
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
          <input
            className="input"
            style={{ flex: 1, height: 42, borderRadius: 12 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Growth Copilot anything..."
          />
          <button onClick={() => handleSend()} style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--brand)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand)'}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
