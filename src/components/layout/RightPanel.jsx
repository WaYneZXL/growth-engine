import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, ChevronDown, Loader2, Check, Brain, Lightbulb } from 'lucide-react';

/* ═══════════════════════════════════════════════
   Per-route contextual data
   ═══════════════════════════════════════════════ */

const routeData = {
  '/': {
    briefing: {
      title: 'Morning Briefing · Feb 26, 2026',
      body: '3 SKUs need attention today. Smart Pet Feeder conversion dropped 34% on TikTok — likely algorithm change. Wireless Earbuds Pro has zero creator coverage despite 45% MoM growth. Hydrating Serum shows a 2.1x return rate gap between TikTok and Shopify.\n\nEstimated revenue at risk: $5,150/mo',
      action: 'Review all 3 →',
    },
    pending: [
      {
        id: 'dash-1',
        time: '3 min ago',
        title: 'Smart Pet Feeder — TikTok listing needs optimization',
        body: 'Conversion dropped 4.2% → 2.8% in 14 days. Title is 142 chars, new TikTok sweet spot is under 80. Agent has prepared an optimized version.',
        actions: ['Apply optimized listing', 'Preview changes', 'Skip'],
      },
      {
        id: 'dash-2',
        time: '8 min ago',
        title: 'Invite 5 creators for Wireless Earbuds Pro',
        body: 'SKU grew 45% MoM but has zero TikTok creators. 5 matched creators identified — avg 3.2% conversion, est. $1,800/mo incremental GMV.',
        actions: ['Invite all 5 · est. $420', 'Review individually', 'Skip'],
      },
    ],
    resolved: [
      {
        id: 'dash-r1',
        time: '1 hour ago',
        title: 'Auto-refreshed Portable Blender listing copy',
        body: 'Content was 38 days stale. Updated title, bullets, and images using "travel size" angle from recent review sentiment. Listing score: 71 → 86.',
        actions: ['View changes', 'Undo'],
      },
    ],
    learning: {
      id: 'dash-l1',
      time: '4 hours ago',
      title: 'Pattern: Creator UGC converts 2.5x on TikTok vs seller uploads',
      body: 'Analysis of your last 30 days: Creator UGC → 4.8% CVR on TikTok, seller uploads → 1.9%. Shift long-tail SKUs to AIGC ($0.80/conv) and reserve creators for hero products.',
      actions: ['Create AIGC for 6 long-tail SKUs', 'More analysis', 'Dismiss'],
    },
  },

  '/products': {
    briefing: {
      title: 'Portfolio Health Check',
      body: '24 active SKUs across 3 channels. 18 growing, 3 declining, 3 new. Your portfolio listing score averages 81/100 — 6 SKUs below 75 are dragging down overall channel performance.',
      action: 'Fix 6 low-score SKUs →',
    },
    pending: [
      {
        id: 'prod-1',
        time: '5 min ago',
        title: 'Batch-optimize 6 underperforming listings',
        body: '6 SKUs have listing scores below 75. Agent analyzed top competitors and prepared optimized titles, images, and bullet points for each. Est. lift: +12% avg conversion.',
        actions: ['Apply all 6 optimizations · preview first', 'Review one by one', 'Skip'],
      },
      {
        id: 'prod-2',
        time: '12 min ago',
        title: '3 SKUs ready for TikTok expansion',
        body: 'Smart Watch Ultra, Organic Face Cream, and LED Desk Lamp perform well on Shopify but aren\'t on TikTok. Cross-channel data suggests $5.2K/mo combined opportunity.',
        actions: ['Create TikTok listings for all 3', 'View analysis', 'Skip'],
      },
      {
        id: 'prod-3',
        time: '20 min ago',
        title: 'Archive 2 stagnant SKUs',
        body: 'Bamboo Cutting Board and Classic Notebook haven\'t generated GMV in 60+ days across any channel. Keeping them dilutes your portfolio metrics. Consider archiving or running clearance.',
        actions: ['Archive both', 'Run clearance campaign', 'Keep'],
      },
    ],
    resolved: [
      {
        id: 'prod-r1',
        time: '2 hours ago',
        title: 'Auto-synced 4 price updates from Shopify → TikTok',
        body: 'Detected Shopify price changes on 4 SKUs. TikTok listings updated to maintain consistent pricing. No margin impact.',
        actions: ['View details'],
      },
    ],
    learning: null,
  },

  '/content': {
    briefing: {
      title: 'Content Coverage Report',
      body: '412 content assets across your portfolio. 8 SKUs have zero video content (TikTok-listed). 5 SKUs haven\'t had content updates in 30+ days. Estimated content gap cost: ~$3,400/mo in missed conversion.',
      action: 'Generate content for top gaps →',
    },
    pending: [
      {
        id: 'cont-1',
        time: '4 min ago',
        title: 'Batch-generate AIGC for 8 SKUs missing video',
        body: '8 TikTok-listed SKUs have zero video content. Agent can generate short product showcase videos using existing product photos + AI animation. Est. cost: $12.80 total. Est. lift: +$2,100/mo.',
        actions: ['Generate all 8 videos · $12.80', 'Preview one first', 'Skip'],
      },
      {
        id: 'cont-2',
        time: '10 min ago',
        title: 'Repurpose top-performing TikTok creator video for Shopify',
        body: '@techreviewer_amy\'s Wireless Earbuds Pro video has 340K views, 4.8% CVR on TikTok. Same product\'s Shopify page uses static images only. Embedding this video could lift Shopify CVR ~1.5%.',
        actions: ['Add video to Shopify listing', 'Preview embedding', 'Skip'],
      },
    ],
    resolved: [
      {
        id: 'cont-r1',
        time: '3 hours ago',
        title: 'Auto-generated 12 product images for 3 new SKUs',
        body: 'New SKUs added to catalog triggered auto-generation pipeline. 12 images created (4 per SKU: hero, lifestyle, detail, size comparison). All passed quality check. Listing score avg: 84.',
        actions: ['View generated images'],
      },
    ],
    learning: null,
  },

  '/creators': {
    briefing: {
      title: 'Creator Network Status',
      body: '38 active creators, 12 pending outreach. This week: 67 creator posts, $8,400 attributed GMV, avg 3.1% conversion. 4 creators haven\'t posted in 14+ days — might need re-engagement or replacement.',
      action: 'Review inactive creators →',
    },
    pending: [
      {
        id: 'cre-1',
        time: '5 min ago',
        title: 'Invite 3 new creators matched to uncovered SKUs',
        body: 'AI identified 3 high-fit creators for SKUs with zero coverage:\n• @wellness_queen (92K, beauty) → Hydrating Serum\n• @gadget_guru (64K, tech) → Smart Watch Ultra\n• @home_chef (41K, kitchen) → Portable Blender\n\nAvg expected CVR: 3.4%. Est. GMV: $2,800/mo.',
        actions: ['Send all 3 invitations', 'Customize offers', 'Skip'],
      },
      {
        id: 'cre-2',
        time: '18 min ago',
        title: 'Adjust commission for top performer @petlover_sarah',
        body: '@petlover_sarah drove $3,200 GMV last month (top 5%) at 10% commission. Similar-tier creators average 12% on competitor brands. Increasing to 12% may improve retention and posting frequency.',
        actions: ['Increase to 12%', 'Keep at 10%', 'Negotiate custom deal'],
      },
    ],
    resolved: [],
    learning: {
      id: 'cre-l1',
      time: '2 hours ago',
      title: 'Pattern: Nano-creators (5K-20K) outperform mid-tier on CVR',
      body: 'Your nano-creators average 4.2% CVR vs mid-tier\'s 2.8%. Cost per conversion is $1.80 vs $4.50. Consider shifting 30% of mid-tier budget to nano-creator recruitment.',
      actions: ['Find nano-creators for top 5 SKUs', 'Show full analysis', 'Dismiss'],
    },
  },

  '/workflows': {
    briefing: {
      title: 'Active Workflows',
      body: '3 workflows running, 1 awaiting approval. "New Product Launch: LED Desk Lamp" is at step 3/5 (creator matching). "Weekly Listing Refresh" completed — 8 listings updated, avg score +4 points.',
      action: 'View active workflows →',
    },
    pending: [
      {
        id: 'wf-1',
        time: '1 min ago',
        title: 'Approve creator shortlist for LED Desk Lamp launch',
        body: 'Workflow paused at creator selection step. Agent matched 5 creators — all home/office niche, avg 28K followers, 3.5% CVR. Total estimated launch commission: $280.',
        actions: ['Approve all 5 & continue workflow', 'Replace 1 creator', 'Skip'],
      },
    ],
    resolved: [
      {
        id: 'wf-r1',
        time: '30 min ago',
        title: 'Weekly Listing Refresh completed',
        body: '8 listings updated across TikTok and Shopify. Refreshed titles, bullets, and secondary images based on trending search terms and competitor changes. Avg listing score: 79 → 83.',
        actions: ['View changelog'],
      },
    ],
    learning: null,
  },
};

// Product detail route (matches /products/:id)
const productDetailData = {
  briefing: {
    title: 'SKU Analysis: Smart Pet Feeder',
    body: 'This SKU generates $4,200/mo but is trending down (-18% WoW). TikTok conversion dropped from 4.2% to 2.8% while Shopify holds at 3.1%. The gap suggests a TikTok-specific listing issue, not a product demand problem.\n\nRoot cause confidence: 82% — title length mismatch',
    action: 'See full diagnosis →',
  },
  pending: [
    {
      id: 'pd-1',
      time: '2 min ago',
      title: 'Rewrite TikTok listing title (142 → 76 chars)',
      body: 'Current: "Smart Automatic Pet Feeder with WiFi App Control 5L Capacity Timed Feeding Schedule for Cats and Dogs"\n→ Proposed: "Smart Pet Feeder · WiFi App · 5L · Auto Schedule"\n\nEstimated conversion recovery: +1.2% (back to ~4.0%)',
      actions: ['Apply new title now', 'Edit before applying', 'Skip'],
    },
    {
      id: 'pd-2',
      time: '6 min ago',
      title: 'Swap hero image to creator-sourced lifestyle shot',
      body: 'Current hero is a white-background product photo. Top 3 competitors use lifestyle/in-home shots. Creator @petlover_sarah has a high-performing unboxing frame — license it as hero.\n\nCost: $0 (already in your UGC library)',
      actions: ['Swap hero image', 'Preview comparison', 'Skip'],
    },
    {
      id: 'pd-3',
      time: '15 min ago',
      title: 'Re-engage 2 paused creators for this SKU',
      body: '@furry_friends (52K followers) and @smart_home_dan (38K) stopped posting 3 weeks ago. Both had strong conversion (4.1%, 3.8%). Agent drafted a re-engagement message with updated commission offer.',
      actions: ['Send re-engagement to both · 12% commission', 'Edit message', 'Skip'],
    },
  ],
  resolved: [],
  learning: {
    id: 'pd-l1',
    time: '1 hour ago',
    title: 'Cross-channel insight: Shopify reviews reveal underused angle',
    body: '23 of the last 50 Shopify reviews mention "quiet motor" as a key purchase reason — but your TikTok listing doesn\'t mention it. Competitors haven\'t picked up on this angle yet.',
    actions: ['Add "quiet motor" to TikTok copy', 'Show reviews', 'Dismiss'],
  },
};

function getDataForRoute(path) {
  if (routeData[path]) return routeData[path];
  if (path.startsWith('/products/')) return productDetailData;
  if (path.startsWith('/creators/')) return routeData['/creators'];
  return routeData['/'];
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

function PendingCard({ card, onExecute, onDismiss }) {
  const [executing, setExecuting] = useState(false);

  const handlePrimary = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      onExecute(card);
    }, 1500);
  };

  return (
    <div style={{
      borderRadius: 10,
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--brand)',
      padding: 14,
      marginBottom: 8,
      background: '#fff',
      opacity: executing ? 0.7 : 1,
      transition: 'opacity 0.2s',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--brand)', letterSpacing: '0.05em' }}>⏳ PENDING</span>
        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{card.time}</span>
      </div>

      {/* Title */}
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 6 }}>
        {card.title}
      </div>

      {/* Body */}
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 10, whiteSpace: 'pre-line' }}>
        {card.body}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {card.actions.map((action, i) => {
          const isPrimary = i === 0;
          const isSkip = action === 'Skip' || action === 'Keep';

          if (isSkip) {
            return (
              <button key={i} onClick={() => onDismiss(card)} style={{
                fontSize: 11, color: 'var(--text-3)', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 0', marginLeft: 'auto',
              }}>
                {action}
              </button>
            );
          }

          return (
            <button key={i} onClick={isPrimary ? handlePrimary : undefined} disabled={executing} style={{
              fontSize: 11, fontWeight: 500,
              padding: '5px 10px', borderRadius: 6,
              background: isPrimary ? 'var(--brand)' : 'transparent',
              color: isPrimary ? '#fff' : 'var(--text-1)',
              border: isPrimary ? 'none' : '1px solid var(--border)',
              cursor: executing && isPrimary ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {executing && isPrimary && <Loader2 size={10} style={{ animation: 'spin 1s linear infinite' }} />}
              {executing && isPrimary ? 'Applying...' : action}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResolvedCard({ card }) {
  return (
    <div style={{
      borderRadius: 10,
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--success)',
      padding: 14,
      marginBottom: 8,
      background: '#fff',
      opacity: 0.7,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: 'var(--success)', letterSpacing: '0.05em' }}>
          <Check size={10} /> RESOLVED
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{card.time}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 6 }}>
        {card.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 8 }}>
        {card.body}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {card.actions.map((action, i) => (
          <button key={i} style={{
            fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 6,
            background: 'transparent', color: 'var(--text-2)',
            border: '1px solid var(--border)', cursor: 'pointer',
          }}>
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

function LearningCard({ card, onDismiss, onAction }) {
  const [executing, setExecuting] = useState(false);
  const [done, setDone] = useState(false);

  const handlePrimary = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setDone(true);
      if (onAction) onAction(card);
    }, 1500);
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
        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{card.time}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 6 }}>
        {card.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 10, whiteSpace: 'pre-line' }}>
        {done ? 'Task queued. Agent will process this and update you when complete.' : card.body}
      </div>
      {!done && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {card.actions.map((action, i) => {
          if (action === 'Dismiss') {
            return (
              <button key={i} onClick={() => onDismiss(card)} style={{
                fontSize: 11, color: 'var(--text-3)', background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px 0', marginLeft: 'auto',
              }}>
                Dismiss
              </button>
            );
          }
          const isPrimary = i === 0;
          return (
            <button key={i} onClick={isPrimary ? handlePrimary : undefined} disabled={executing} style={{
              fontSize: 11, fontWeight: 500, padding: '5px 10px', borderRadius: 6,
              background: isPrimary ? '#8b5cf6' : 'transparent',
              color: isPrimary ? '#fff' : '#8b5cf6',
              border: isPrimary ? 'none' : '1px solid rgba(139,92,246,0.3)',
              cursor: executing && isPrimary ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {executing && isPrimary && <Loader2 size={10} style={{ animation: 'spin 1s linear infinite' }} />}
              {executing && isPrimary ? 'Queuing...' : action}
            </button>
          );
        })}
      </div>
      )}
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

/* ═══════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════ */

const mockAIResponses = [
  "I'll look into that. Based on your current portfolio data, I can see a few relevant signals. Let me prepare a detailed analysis — it should be ready in about a minute.",
  "Good question. Looking at the cross-channel data, I see an opportunity to optimize. I'll add an action card above with my recommendation.",
  "I've queued that as a task. You'll see it appear in your pending actions shortly with a full breakdown and one-click execution.",
];

export default function RightPanel({ currentPath }) {
  const data = getDataForRoute(currentPath);
  const [pendingCards, setPendingCards] = useState(data.pending);
  const [resolvedCards, setResolvedCards] = useState(data.resolved);
  const [learningCard, setLearningCard] = useState(data.learning);
  const [resolvedExpanded, setResolvedExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(new Set());
  const [undoItem, setUndoItem] = useState(null);
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [responseIdx, setResponseIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const pendingRef = useRef(null);

  // Reset state on route change
  useEffect(() => {
    const newData = getDataForRoute(currentPath);
    setPendingCards(newData.pending);
    setResolvedCards(newData.resolved);
    setLearningCard(newData.learning);
    setResolvedExpanded(false);
    setDismissed(new Set());
    setUndoItem(null);
    setChatMessages([]);
    setAnimKey(k => k + 1);
  }, [currentPath]);

  const handleExecute = useCallback((card) => {
    setPendingCards(prev => prev.filter(c => c.id !== card.id));
    setResolvedCards(prev => [{
      ...card,
      time: 'Just now',
      actions: ['View changes', 'Undo'],
    }, ...prev]);
  }, []);

  const handleDismiss = useCallback((card) => {
    setDismissed(prev => new Set([...prev, card.id]));
    setUndoItem(card);
    const timer = setTimeout(() => setUndoItem(prev => prev?.id === card.id ? null : prev), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleUndo = useCallback(() => {
    if (!undoItem) return;
    setDismissed(prev => {
      const next = new Set(prev);
      next.delete(undoItem.id);
      return next;
    });
    setUndoItem(null);
  }, [undoItem]);

  const handleDismissLearning = useCallback(() => {
    setLearningCard(null);
  }, []);

  const handleBriefingAction = useCallback(() => {
    pendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSend = useCallback(() => {
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
  }, [input, responseIdx]);

  const visiblePending = pendingCards.filter(c => !dismissed.has(c.id));

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
      <div ref={scrollRef} key={animKey} style={{ flex: 1, overflow: 'auto', padding: '16px 18px' }}>
        <div className="rp-stagger">
          {/* Briefing */}
          <div className="rp-card-anim" style={{ animationDelay: '0ms' }}>
            <BriefingCard data={data.briefing} onAction={handleBriefingAction} />
          </div>

          {/* Undo toast */}
          {undoItem && (
            <div style={{
              background: 'var(--text-1)', color: '#fff',
              padding: '6px 12px', borderRadius: 6, marginBottom: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 11,
            }}>
              <span>Dismissed · </span>
              <button onClick={handleUndo} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline',
              }}>Undo</button>
            </div>
          )}

          {/* Pending */}
          <div ref={pendingRef} />
          {visiblePending.length > 0 && (
            <>
              <SectionLabel label={`Pending · ${visiblePending.length}`} />
              {visiblePending.map((card, i) => (
                <div key={card.id} className="rp-card-anim" style={{ animationDelay: `${(i + 1) * 50}ms` }}>
                  <PendingCard card={card} onExecute={handleExecute} onDismiss={handleDismiss} />
                </div>
              ))}
            </>
          )}

          {/* Resolved */}
          {resolvedCards.length > 0 && (
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
                  Resolved ({resolvedCards.length})
                  <ChevronDown size={10} style={{
                    transform: resolvedExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }} />
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </button>
              {resolvedExpanded && resolvedCards.map(card => (
                <ResolvedCard key={card.id} card={card} />
              ))}
            </>
          )}

          {/* Learning */}
          {learningCard && (
            <div className="rp-card-anim" style={{ animationDelay: `${(visiblePending.length + 2) * 50}ms` }}>
              <SectionLabel label="Learning" />
              <LearningCard card={learningCard} onDismiss={handleDismissLearning} onAction={() => {}} />
            </div>
          )}

          {/* Chat messages (from bottom input) */}
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
