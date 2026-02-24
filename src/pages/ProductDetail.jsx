import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, TrendingDown, Sparkles,
  Play, Image, FileText, File, Users, Eye,
  ChevronRight, RefreshCw, BarChart3, Check, AlertTriangle,
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
        {activeTab === 1 && <ContentHubTab content={productContent} />}
        {activeTab === 2 && <CreatorTab product={product} creatorsList={productCreatorsList} />}
        {activeTab === 3 && <ChannelPerformance product={product} benchmark={benchmark} />}
      </div>
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
function ContentHubTab({ content }) {
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
    { key: 'image', label: 'Product Images',   Icon: Image,    aiLabel: 'Generate with AI' },
    { key: 'video', label: 'Video Assets',      Icon: Play,     aiLabel: 'Generate with AI' },
    { key: 'copy',  label: 'Listing Copy',      Icon: FileText, aiLabel: 'Regenerate Copy'  },
    { key: 'brief', label: 'Creator Briefs',    Icon: File,     aiLabel: 'New Brief'        },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sections.map(({ key, label, Icon, aiLabel }) => {
        const items = groups[key];
        if (!items.length) return null;
        return (
          <div key={key}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                <Icon size={14} style={{ color: 'var(--text-3)' }} /> {label} ({items.length})
              </h3>
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Sparkles size={13} /> {aiLabel}
              </button>
            </div>
            <div className="content-grid-4">
              {items.map((asset) => {
                const sb = sourceBadge(asset.source);
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
