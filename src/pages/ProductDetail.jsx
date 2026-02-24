import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, TrendingDown, Sparkles,
  Play, Image, FileText, File, Users, Eye,
  ChevronRight, RefreshCw, BarChart3, Check, AlertTriangle,
  X, Loader2, ChevronDown,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell,
} from 'recharts';
import {
  products, creators, productCreators, contentAssets,
  competitorBenchmarks, formatCurrency, formatNumber, getChannelColor, getChannelName,
} from '../data/mockData';
import ProductImage from '../components/shared/ProductImage';
import ChannelBadge from '../components/shared/ChannelBadge';
import ListingScoreRing from '../components/shared/ListingScoreRing';

const tabs = ['Growth Overview', 'Content Hub', 'Creator & Affiliate', 'Channel Performance'];

const flywheelPhases = [
  { key: 'build',     label: 'Build',     desc: 'Content Creation'   },
  { key: 'distribute', label: 'Distribute', desc: 'Channel Publishing' },
  { key: 'amplify',   label: 'Amplify',   desc: 'Creator Marketing'  },
  { key: 'learn',     label: 'Learn',     desc: 'Data & Insights'    },
];

const flywheelStyle = (s) => {
  if (s === 'complete')       return { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)', badgeBg: 'rgba(16,185,129,0.15)',  badgeColor: 'var(--success)', label: 'Complete'      };
  if (s === 'active')         return { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)', badgeBg: 'rgba(99,102,241,0.15)',  badgeColor: 'var(--brand)',   label: 'In Progress'   };
  return                             { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', badgeBg: 'rgba(245,158,11,0.15)',  badgeColor: 'var(--warning)', label: 'Needs Attention' };
};

const flywheelIcon = (s) => {
  if (s === 'complete') return <Check size={14} style={{ color: 'var(--success)' }} />;
  if (s === 'active')   return <RefreshCw size={13} style={{ color: 'var(--brand)' }} />;
  return <AlertTriangle size={13} style={{ color: 'var(--warning)' }} />;
};

function StatusPill({ status }) {
  const map = {
    growing:  { label: '↑ Growing',   bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)' },
    declining: { label: '↓ Declining', bg: 'rgba(239,68,68,0.1)',   color: 'var(--danger)'  },
    new:       { label: 'New',         bg: 'rgba(148,163,184,0.15)', color: 'var(--text-3)'  },
  };
  const s = map[status] || map.new;
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: s.bg, color: s.color }}>{s.label}</span>;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [aigcModal, setAigcModal] = useState(null); // { skuId } when open

  const product = products.find((p) => p.id === id);
  if (!product) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320 }}>
      <p style={{ color: 'var(--text-2)' }}>Product not found</p>
      <button onClick={() => navigate('/products')} style={{ marginTop: 16, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>← Back to Products</button>
    </div>
  );

  const productCreatorIds = productCreators[product.id] || [];
  const productCreatorsList = productCreatorIds.map((cid) => creators.find((c) => c.id === cid)).filter(Boolean);
  const productContent = contentAssets.filter((a) => a.skuId === product.id);
  const benchmark = competitorBenchmarks[product.category] || competitorBenchmarks['Electronics'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back + header */}
      <div>
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-2)', textDecoration: 'none', marginBottom: 14 }}>
          <ArrowLeft size={14} /> Back to Products
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          <ProductImage product={product} size="xl" />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{product.name}</h1>
              <StatusPill status={product.status} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 6 }}>{product.id} · {product.category} · ${product.price}</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 600 }}>{product.description}</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {product.channels.map((c) => <ChannelBadge key={c} channelId={c} size="md" />)}
            </div>
          </div>
          <button className="btn btn-ghost"><Sparkles size={14} /> AI Optimize</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} className={`tab-btn${activeTab === i ? ' active' : ''}`}>{tab}</button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in-up">
        {activeTab === 0 && <GrowthOverview product={product} benchmark={benchmark} />}
        {activeTab === 1 && <ContentHubTab content={productContent} onGenerate={() => setAigcModal({ skuId: product.id })} />}
        {activeTab === 2 && <CreatorTab product={product} creatorsList={productCreatorsList} />}
        {activeTab === 3 && <ChannelPerformance product={product} benchmark={benchmark} />}
      </div>

      {/* AIGC Modal */}
      {aigcModal && <AigcModal onClose={() => setAigcModal(null)} product={product} />}
    </div>
  );
}

/* ── Tab 1: Growth Overview ── */
function GrowthOverview({ product, benchmark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Flywheel */}
      <div className="card" style={{ padding: 20 }}>
        <h3 className="section-title">Growth Flywheel Status</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {flywheelPhases.map((phase, i) => {
            const s = flywheelStyle(product.flywheel[phase.key]);
            return (
              <div key={phase.key} style={{ position: 'relative' }}>
                <div style={{ borderRadius: 12, border: `1px solid ${s.border}`, background: s.bg, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    {flywheelIcon(product.flywheel[phase.key])}
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{phase.label}</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-2)' }}>{phase.desc}</p>
                  <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: s.badgeBg, color: s.badgeColor }}>{s.label}</span>
                </div>
                {i < 3 && <div style={{ position: 'absolute', top: '50%', right: -10, transform: 'translateY(-50%)', zIndex: 1 }}><ChevronRight size={14} style={{ color: 'var(--text-3)' }} /></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cross-Product Insights */}
      {product.crossInsights && product.crossInsights.length > 0 && (
        <div className="card" style={{ padding: 20, background: 'rgba(99,102,241,0.04)', border: '1px dashed rgba(99,102,241,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Sparkles size={14} style={{ color: 'var(--brand)' }} />
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand)', margin: 0 }}>Cross-Product Insights</h3>
            <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: 'rgba(99,102,241,0.12)', color: 'var(--brand)' }}>AI-powered</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {product.crossInsights.map((ins, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(99,102,241,0.1)' }}>
                <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{ins.icon}</span>
                <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, flex: 1, margin: 0 }}>{ins.text}</p>
                <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {ins.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Channel cards */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.channels.length}, 1fr)`, gap: 12 }}>
        {product.channels.map((ch) => {
          const data = product.channelData[ch];
          if (!data) return null;
          const color = getChannelColor(ch);
          return (
            <div key={ch} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{getChannelName(ch)}</span>
              </div>
              {[
                ['GMV (30d)',       `$${data.gmv.toLocaleString()}`],
                ['Conversion Rate', `${data.conversionRate}%`],
                ['Sessions',        formatNumber(data.sessions)],
                ['Active Creators', data.creatorCount],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Listing Score</span>
                <ListingScoreRing score={data.listingScore} size={30} strokeWidth={2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-channel insight */}
      {product.channels.length > 1 && product.channelData.tiktok && (
        <div style={{ display: 'flex', gap: 12, padding: 16, borderRadius: 12, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}>
          <Sparkles size={16} style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }}>Cross-channel Insight</div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              This SKU converts {(product.channelData.tiktok.conversionRate / (product.channelData.shopify?.conversionRate || product.channelData.amazon?.conversionRate || 2.5)).toFixed(1)}x better on TikTok — creator content is driving the difference. Consider scaling creator partnerships across other channels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Tab 2: Content Hub ── */
function ContentHubTab({ content, onGenerate }) {
  const groups = {
    image: content.filter((c) => c.type === 'image'),
    video: content.filter((c) => c.type === 'video'),
    copy:  content.filter((c) => c.type === 'copy'),
    brief: content.filter((c) => c.type === 'brief'),
  };

  const sourceBadge = (s) => {
    if (s === 'ai')      return { text: 'AI Generated', bg: 'rgba(99,102,241,0.12)', color: 'var(--brand)' };
    if (s === 'creator') return { text: 'Creator UGC',  bg: 'rgba(16,185,129,0.12)', color: 'var(--success)' };
    return                      { text: 'Seller Upload', bg: 'rgba(148,163,184,0.15)', color: 'var(--text-2)' };
  };

  const sections = [
    { key: 'image', label: 'Product Images',   Icon: Image,    aiLabel: 'Generate with AI', isVisual: true  },
    { key: 'video', label: 'Video Assets',      Icon: Play,     aiLabel: 'Generate with AI', isVisual: true  },
    { key: 'copy',  label: 'Listing Copy',      Icon: FileText, aiLabel: 'Regenerate Copy',  isVisual: false },
    { key: 'brief', label: 'Creator Briefs',    Icon: File,     aiLabel: 'New Brief',        isVisual: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sections.map(({ key, label, Icon, aiLabel, isVisual }) => {
        const items = groups[key];
        if (!items.length) return null;
        return (
          <div key={key}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                <Icon size={14} style={{ color: 'var(--text-3)' }} /> {label} ({items.length})
              </h3>
              <button onClick={onGenerate} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Sparkles size={13} /> {aiLabel}
              </button>
            </div>
            <div className={isVisual ? 'content-grid-4' : undefined} style={isVisual ? undefined : { display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((asset) => {
                const sb = sourceBadge(asset.source);
                if (!isVisual) {
                  // Text preview card for copy / brief
                  return (
                    <div key={asset.id} className="card card-hover" style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${asset.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} style={{ color: asset.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{asset.name}</span>
                          <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 999, background: sb.bg, color: sb.color, flexShrink: 0 }}>{sb.text}</span>
                        </div>
                        {asset.preview && (
                          <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre-line' }}>{asset.preview}</p>
                        )}
                        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                          {asset.channels.map((c) => <ChannelBadge key={c} channelId={c} />)}
                        </div>
                      </div>
                      <button style={{ fontSize: 11, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, fontWeight: 500 }}>Edit</button>
                    </div>
                  );
                }
                return (
                  <div key={asset.id} className="card card-hover" style={{ overflow: 'hidden' }}>
                    <div style={{ height: 120, background: `${asset.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {key === 'video' ? <Play size={28} style={{ color: asset.color }} /> : <Icon size={28} style={{ color: asset.color }} />}
                      <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: sb.bg, color: sb.color }}>{sb.text}</span>
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }} className="truncate">{asset.name}</div>
                      <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                        {asset.channels.map((c) => <ChannelBadge key={c} channelId={c} />)}
                      </div>
                      {asset.views && <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 10, color: 'var(--text-3)' }}><Eye size={10} /> {formatNumber(asset.views)} views</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── AIGC Generation Modal ── */
const AIGC_TYPES = [
  { id: 'image',   label: 'Product Image',  icon: '🖼️',  desc: 'High-quality AI product photos' },
  { id: 'video',   label: 'Video Brief',    icon: '🎬',  desc: 'Script & creative direction for creators' },
  { id: 'copy',    label: 'Listing Copy',   icon: '✍️',  desc: 'Optimized titles & descriptions' },
  { id: 'brief',   label: 'Creator Brief',  icon: '📋',  desc: 'Ready-to-send creator outreach brief' },
];
const AIGC_CHANNELS = [
  { id: 'tiktok',  label: 'TikTok Shop', color: '#ff0050' },
  { id: 'shopify', label: 'Shopify',     color: '#96bf48' },
  { id: 'amazon',  label: 'Amazon',      color: '#ff9900' },
];
const AIGC_MOCK_RESULTS = {
  image:  ['Lifestyle hero shot on white background', 'Hands-on detail close-up', 'Lifestyle scene with props'],
  video:  ['30s unboxing & first impression script', '15s TikTok hook: "POV you just got..."', '60s feature walkthrough brief'],
  copy:   ['TikTok Shop listing title (A/B variant)', 'Amazon bullet points (5-pack)', 'Shopify SEO description'],
  brief:  ['TikTok creator brief with talking points', 'Instagram reel brief with visual guidelines', 'YouTube shorts brief with CTA'],
};

function AigcModal({ onClose, product }) {
  const [step, setStep] = useState(0); // 0=type, 1=channel, 2=results
  const [selectedType, setSelectedType] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTypeSelect = (id) => setSelectedType(id);
  const handleChannelNext = (ch) => {
    setSelectedChannel(ch);
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1600);
    setStep(1.5); // transitional loading state
  };

  const stepLabels = ['Select Type', 'Select Channel', 'Results'];
  const currentStep = step === 1.5 ? 2 : Math.floor(step);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 16, width: 560, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={15} style={{ color: 'var(--brand)' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Generate with AI</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{product.name}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 24px', borderBottom: '1px solid var(--border)', gap: 0 }}>
          {stepLabels.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < stepLabels.length - 1 ? 1 : undefined }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: i < currentStep ? 'var(--brand)' : i === currentStep ? 'rgba(99,102,241,0.12)' : 'var(--surface-2)', color: i < currentStep ? '#fff' : i === currentStep ? 'var(--brand)' : 'var(--text-3)', border: i === currentStep ? '2px solid var(--brand)' : 'none' }}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, color: i <= currentStep ? 'var(--text-1)' : 'var(--text-3)' }}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && <div style={{ flex: 1, height: 1, background: i < currentStep ? 'var(--brand)' : 'var(--border)', margin: '0 10px' }} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div style={{ padding: '20px 24px' }}>
          {step === 0 && (
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16 }}>What type of content do you want to generate?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {AIGC_TYPES.map((t) => (
                  <button key={t.id} onClick={() => handleTypeSelect(t.id)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, borderRadius: 10, border: `2px solid ${selectedType === t.id ? 'var(--brand)' : 'var(--border)'}`, background: selectedType === t.id ? 'rgba(99,102,241,0.05)' : 'var(--surface)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                    <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <button disabled={!selectedType} onClick={() => setStep(1)} style={{ height: 36, padding: '0 20px', borderRadius: 8, border: 'none', background: selectedType ? 'var(--brand)' : 'var(--border)', color: selectedType ? '#fff' : 'var(--text-3)', fontSize: 13, fontWeight: 600, cursor: selectedType ? 'pointer' : 'default' }}>
                  Next: Select Channel →
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16 }}>Which channel is this content for?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {AIGC_CHANNELS.filter((ch) => product.channels.includes(ch.id)).map((ch) => (
                  <button key={ch.id} onClick={() => handleChannelNext(ch.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.border = `1px solid ${ch.color}`; e.currentTarget.style.background = `${ch.color}08`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.border = '1px solid var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  >
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: ch.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>{ch.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-3)' }}>→</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(0)} style={{ marginTop: 16, fontSize: 12, color: 'var(--text-2)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
            </div>
          )}

          {(step === 1.5 || (step === 2 && loading)) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: 14 }}>
              <Loader2 size={32} style={{ color: 'var(--brand)', animation: 'spin 1s linear infinite' }} />
              <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Generating your content with AI…</p>
            </div>
          )}

          {step === 2 && !loading && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.07)' }}>
                <Check size={14} style={{ color: 'var(--success)' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)' }}>3 assets generated successfully</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(AIGC_MOCK_RESULTS[selectedType] || []).map((result, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                    <span style={{ fontSize: 16 }}>{AIGC_TYPES.find((t) => t.id === selectedType)?.icon}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-1)', flex: 1 }}>{result}</span>
                    <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>Use</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
                <button onClick={onClose} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'none', color: 'var(--text-2)', fontSize: 13, cursor: 'pointer' }}>Close</button>
                <button onClick={() => { setStep(0); setSelectedType(null); setSelectedChannel(null); }} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: 'none', background: 'var(--brand)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Generate More</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Tab 3: Creator & Affiliate ── */
function CreatorTab({ product, creatorsList }) {
  if (!creatorsList.length) return (
    <div className="card" style={{ padding: 48, textAlign: 'center' }}>
      <Users size={36} style={{ color: 'var(--text-3)', margin: '0 auto 12px' }} />
      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }}>No creators yet</h3>
      <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 16 }}>Find relevant creators to grow this SKU</p>
      <button className="btn btn-primary"><Sparkles size={13} /> Find Creators with AI</button>
    </div>
  );

  const sorted = [...creatorsList].sort((a, b) => b.gmvAttributed - a.gmvAttributed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{creatorsList.length} Creators promoting this SKU</h3>
        <button className="btn btn-ghost"><Sparkles size={13} /> Find More Creators</button>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Niche</th>
              <th style={{ textAlign: 'right' }}>Followers</th>
              <th style={{ textAlign: 'right' }}>Content</th>
              <th style={{ textAlign: 'right' }}>Attributed GMV</th>
              <th style={{ textAlign: 'right' }}>Conv. Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} style={{ cursor: 'default' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                      {c.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: 'var(--text-1)', fontSize: 13 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.handle}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--text-2)', fontSize: 12 }}>{c.niche}</td>
                <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>{formatNumber(c.followers)}</td>
                <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>{c.contentCount}</td>
                <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-1)' }}>{formatCurrency(c.gmvAttributed)}</td>
                <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--success)' }}>{c.conversionRate}%</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 500, background: c.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.12)', color: c.status === 'active' ? 'var(--success)' : 'var(--text-3)' }}>
                    {c.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Tab 4: Channel Performance ── */
function ChannelPerformance({ product, benchmark }) {
  const channelEntries = Object.entries(product.channelData);

  const radarData = [
    { subject: 'Title',       value: product.listingScores.title,       benchmark: benchmark.avgListingScore     },
    { subject: 'Images',      value: product.listingScores.images,      benchmark: benchmark.avgListingScore - 5 },
    { subject: 'Description', value: product.listingScores.description, benchmark: benchmark.avgListingScore - 3 },
    { subject: 'Keywords',    value: product.listingScores.keywords,    benchmark: benchmark.avgListingScore + 2 },
    { subject: 'Price',       value: product.listingScores.price,       benchmark: benchmark.avgListingScore - 2 },
  ];

  const channelBarData = channelEntries.map(([ch, data]) => ({
    channel: getChannelName(ch), gmv: data.gmv, fill: getChannelColor(ch),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="content-grid-2">
        {/* Radar */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="section-title">Listing Quality Score</h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--text-2)' }} />
                <Radar name="Your Score"   dataKey="value"     stroke="var(--brand)"   fill="var(--brand)"   fillOpacity={0.18} strokeWidth={2} />
                <Radar name="Category Avg" dataKey="benchmark" stroke="var(--text-3)"  fill="transparent"    strokeWidth={1}    strokeDasharray="4 4" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8, fontSize: 11, color: 'var(--text-2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 2, background: 'var(--brand)', borderRadius: 2, display: 'inline-block' }} /> Your Score</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 2, background: 'var(--text-3)', borderRadius: 2, display: 'inline-block' }} /> Category Avg</span>
          </div>
        </div>

        {/* Bar */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="section-title">Channel GMV Comparison</h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="channel" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'GMV']} />
                <Bar dataKey="gmv" radius={[6, 6, 0, 0]}>
                  {channelBarData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="card" style={{ padding: 20 }}>
        <h3 className="section-title">Score Breakdown by Component</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(product.listingScores).map(([key, value]) => {
            const barColor = value >= 85 ? 'var(--success)' : value >= 70 ? 'var(--warning)' : 'var(--danger)';
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--text-2)', width: 80, textTransform: 'capitalize' }}>{key}</span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: `${value}%`, background: barColor }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', width: 28, textAlign: 'right' }}>{value}</span>
                <span style={{ fontSize: 10, color: 'var(--text-3)', width: 56, textAlign: 'right' }}>avg {benchmark.avgListingScore}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benchmark */}
      <div className="card" style={{ padding: 20 }}>
        <h3 className="section-title">Category Benchmark ({product.category})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {[
            { label: 'Avg Listing Score', benchmark: benchmark.avgListingScore, yours: product.listingScore,    fmt: (v) => v           },
            { label: 'Avg Conversion',    benchmark: `${benchmark.avgConversion}%`, yours: null                                          },
            { label: 'Avg Creator Count', benchmark: benchmark.avgCreatorCount,  yours: product.creatorCount,   fmt: (v) => v           },
            { label: 'Avg Monthly GMV',   benchmark: formatCurrency(benchmark.avgGMV), yours: null                                       },
          ].map(({ label, benchmark: bval, yours, fmt }) => (
            <div key={label} style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{bval}</div>
              {yours !== null && yours !== undefined && (
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2, color: yours > (typeof bval === 'number' ? bval : 0) ? 'var(--success)' : 'var(--danger)' }}>
                  You: {fmt ? fmt(yours) : yours}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
