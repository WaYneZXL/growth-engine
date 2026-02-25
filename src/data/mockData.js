// ============================================================
// Mock Data for Growth Engine
// ============================================================

// --- Channels ---
export const channels = [
  { id: 'tiktok', name: 'TikTok Shop', color: '#ff0050', icon: 'tiktok' },
  { id: 'shopify', name: 'Shopify', color: '#96bf48', icon: 'shopify' },
  { id: 'amazon', name: 'Amazon', color: '#ff9900', icon: 'amazon' },
];

// --- SKU / Products ---
export const products = [
  {
    id: 'SKU-0042',
    name: 'Wireless Earbuds Pro',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
    imageColor: '#6366f1',
    channels: ['tiktok', 'shopify', 'amazon'],
    listingScore: 92,
    creatorCount: 8,
    gmv30d: 48200,
    gmvPrev30d: 38500,
    growth: 25.2,
    status: 'growing',
    description: 'Premium wireless earbuds with active noise cancellation, 36-hour battery life, and IPX5 water resistance.',
    price: 79.99,
    channelData: {
      tiktok: { gmv: 28900, conversionRate: 4.8, listingScore: 95, creatorCount: 6, sessions: 12400, orders: 595 },
      shopify: { gmv: 12300, conversionRate: 2.1, listingScore: 88, creatorCount: 2, sessions: 8200, orders: 172 },
      amazon: { gmv: 7000, conversionRate: 3.2, listingScore: 91, creatorCount: 0, sessions: 5600, orders: 179 },
    },
    listingScores: {
      title: 95, images: 90, description: 88, keywords: 94, price: 85,
    },
    flywheel: { build: 'complete', distribute: 'complete', amplify: 'active', learn: 'active' },
    crossInsights: [
      { icon: '🎯', text: 'Creator videos on TikTok are lifting Shopify search traffic by ~18% — your affiliate content is cross-channel influencing organic', action: 'View Attribution' },
      { icon: '📸', text: 'SKUs with 5+ AI images convert 2.1x better — Earbuds Pro has only 2 images, generate 3 more for Amazon', action: 'Generate Images' },
      { icon: '🤖', text: 'AIGC CPA is $0.80 vs creator CPA $3.20 — shifting long-tail content to AIGC could save ~$2,400/mo while freeing budget for 3 hero creators', action: 'Optimize Mix' },
    ],
    contentMix: {
      current: { aigcPct: 30, creatorPct: 70 },
      recommended: { aigcPct: 45, creatorPct: 55 },
      aigcCPA: 0.8,
      creatorCPA: 3.2,
      aigcGmv: 8400,
      creatorGmv: 24600,
      phase: 'scale',
      phaseLabel: 'Scaling — shift long-tail to AIGC, focus creators on hero moments',
      savingsEstimate: 2400,
    },
  },
  {
    id: 'SKU-0118',
    name: 'Hydrating Serum',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
    imageColor: '#ec4899',
    channels: ['tiktok', 'shopify'],
    listingScore: 87,
    creatorCount: 12,
    gmv30d: 35600,
    gmvPrev30d: 28900,
    growth: 23.2,
    status: 'growing',
    description: 'Hyaluronic acid serum with vitamin C and niacinamide for deep hydration and brightening.',
    price: 34.99,
    channelData: {
      tiktok: { gmv: 26800, conversionRate: 5.2, listingScore: 90, creatorCount: 10, sessions: 15200, orders: 790 },
      shopify: { gmv: 8800, conversionRate: 2.8, listingScore: 82, creatorCount: 2, sessions: 6100, orders: 171 },
    },
    listingScores: { title: 90, images: 85, description: 82, keywords: 88, price: 92 },
    flywheel: { build: 'complete', distribute: 'complete', amplify: 'active', learn: 'needs-attention' },
    crossInsights: [
      { icon: '💡', text: '12 creators promoting Serum also post Beauty content — cross-promote with Vitamin C Cream for a bundle effect', action: 'View Creators' },
      { icon: '🔥', text: 'Serum UGC drives 5.2% average conversion — AI-generated listing copy is underperforming vs creator copy', action: 'Refresh Copy' },
    ],
    contentMix: {
      current: { aigcPct: 20, creatorPct: 80 },
      recommended: { aigcPct: 45, creatorPct: 55 },
      aigcCPA: 1.1,
      creatorCPA: 2.8,
      aigcGmv: 7100,
      creatorGmv: 28500,
      phase: 'scale',
      phaseLabel: 'Scaling — 12 creators is strong, supplement with AIGC to cover long-tail keywords',
      savingsEstimate: 1800,
    },
  },
  {
    id: 'SKU-0205',
    name: 'Premium Yoga Mat',
    category: 'Fitness',
    image: null,
    imageColor: '#10b981',
    channels: ['shopify', 'amazon'],
    listingScore: 78,
    creatorCount: 4,
    gmv30d: 18900,
    gmvPrev30d: 21200,
    growth: -10.8,
    status: 'declining',
    description: 'Non-slip TPE yoga mat with alignment lines, 6mm thick, eco-friendly materials.',
    price: 45.99,
    channelData: {
      shopify: { gmv: 11200, conversionRate: 3.1, listingScore: 80, creatorCount: 3, sessions: 7800, orders: 242 },
      amazon: { gmv: 7700, conversionRate: 2.6, listingScore: 75, creatorCount: 1, sessions: 6200, orders: 161 },
    },
    listingScores: { title: 82, images: 72, description: 75, keywords: 80, price: 78 },
    flywheel: { build: 'needs-attention', distribute: 'active', amplify: 'needs-attention', learn: 'needs-attention' },
    crossInsights: [
      { icon: '⚠️', text: 'Yoga Mat has zero TikTok presence — 4 fitness creators already active on your account could be onboarded', action: 'Find Creators' },
      { icon: '📉', text: 'Amazon listing images score 72 vs category avg 75 — outdated photos may be hurting conversion', action: 'Refresh Images' },
    ],
  },
  {
    id: 'SKU-0319',
    name: 'Smart Watch Ultra',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    imageColor: '#3b82f6',
    channels: ['tiktok', 'shopify', 'amazon'],
    listingScore: 94,
    creatorCount: 6,
    gmv30d: 52100,
    gmvPrev30d: 45800,
    growth: 13.8,
    status: 'growing',
    description: 'Advanced smartwatch with AMOLED display, health monitoring, GPS, and 7-day battery.',
    price: 199.99,
    channelData: {
      tiktok: { gmv: 22400, conversionRate: 3.6, listingScore: 96, creatorCount: 4, sessions: 9800, orders: 353 },
      shopify: { gmv: 18200, conversionRate: 2.9, listingScore: 92, creatorCount: 2, sessions: 11200, orders: 325 },
      amazon: { gmv: 11500, conversionRate: 3.8, listingScore: 93, creatorCount: 0, sessions: 7400, orders: 281 },
    },
    listingScores: { title: 96, images: 94, description: 92, keywords: 95, price: 88 },
    flywheel: { build: 'complete', distribute: 'complete', amplify: 'active', learn: 'complete' },
    crossInsights: [
      { icon: '🚀', text: 'Smart Watch is your top GMV SKU — TikTok creator content is driving Shopify search lift of 22%', action: 'Scale Creators' },
      { icon: '📊', text: 'Watch + Earbuds bundle opportunity: 68% of Earbuds buyers also viewed Watch, consider cross-promotion', action: 'Create Bundle' },
    ],
    contentMix: {
      current: { aigcPct: 25, creatorPct: 75 },
      recommended: { aigcPct: 40, creatorPct: 60 },
      aigcCPA: 1.0,
      creatorCPA: 2.6,
      aigcGmv: 13000,
      creatorGmv: 39100,
      phase: 'scale',
      phaseLabel: 'Scaling — diversify with AIGC for product variations, creators for brand storytelling',
      savingsEstimate: 1600,
    },
  },
  {
    id: 'SKU-0428',
    name: 'Automatic Coffee Machine',
    category: 'Home & Kitchen',
    image: null,
    imageColor: '#92400e',
    channels: ['shopify', 'amazon'],
    listingScore: 81,
    creatorCount: 3,
    gmv30d: 29400,
    gmvPrev30d: 27100,
    growth: 8.5,
    status: 'growing',
    description: 'Fully automatic espresso machine with built-in grinder, milk frother, and 15 bar pressure.',
    price: 289.99,
    channelData: {
      shopify: { gmv: 16800, conversionRate: 2.4, listingScore: 83, creatorCount: 2, sessions: 9400, orders: 226 },
      amazon: { gmv: 12600, conversionRate: 3.1, listingScore: 79, creatorCount: 1, sessions: 7100, orders: 220 },
    },
    listingScores: { title: 84, images: 78, description: 80, keywords: 82, price: 75 },
    flywheel: { build: 'active', distribute: 'active', amplify: 'needs-attention', learn: 'active' },
    crossInsights: [
      { icon: '☕', text: 'Coffee Machine has no creator affiliates on TikTok — Home & Kitchen creators generate 3.2x ROI vs paid ads', action: 'Recruit Creators' },
      { icon: '💡', text: 'Amazon bullet points last updated 90+ days ago — AI rewrite could boost conversion by an estimated 12-18%', action: 'Rewrite Copy' },
    ],
  },
  {
    id: 'SKU-0537',
    name: 'Interactive Pet Toy',
    category: 'Pets',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&q=80',
    imageColor: '#f59e0b',
    channels: ['tiktok', 'amazon'],
    listingScore: 85,
    creatorCount: 9,
    gmv30d: 22700,
    gmvPrev30d: 15400,
    growth: 47.4,
    status: 'growing',
    description: 'Smart interactive ball with LED lights, auto-rolling mode, and pet-safe materials.',
    price: 29.99,
    channelData: {
      tiktok: { gmv: 18200, conversionRate: 6.1, listingScore: 88, creatorCount: 8, sessions: 18400, orders: 1123 },
      amazon: { gmv: 4500, conversionRate: 2.9, listingScore: 82, creatorCount: 1, sessions: 4200, orders: 122 },
    },
    listingScores: { title: 88, images: 84, description: 82, keywords: 86, price: 90 },
    flywheel: { build: 'complete', distribute: 'active', amplify: 'complete', learn: 'active' },
    crossInsights: [
      { icon: '🔥', text: 'Pet Toy viral video (680K views) drove 38% more search for your brand on Amazon — capitalize with keyword update', action: 'Update Keywords' },
      { icon: '🐾', text: '9 creators promoting Pet Toy — 6 also cover Home & Kitchen, ideal for cross-SKU campaigns', action: 'Plan Campaign' },
      { icon: '⚖️', text: 'Content mix is 60% AIGC / 40% creator — validation phase suggests balancing equally to test which drives more conversions', action: 'Optimize Mix' },
    ],
    contentMix: {
      current: { aigcPct: 60, creatorPct: 40 },
      recommended: { aigcPct: 50, creatorPct: 50 },
      aigcCPA: 1.4,
      creatorCPA: 1.9,
      aigcGmv: 10900,
      creatorGmv: 7300,
      phase: 'validation',
      phaseLabel: 'Validation — test equal AIGC/creator split to find your optimal conversion ratio',
      savingsEstimate: 600,
    },
  },
  {
    id: 'SKU-0641',
    name: 'LED Desk Lamp Pro',
    category: 'Home & Office',
    image: null,
    imageColor: '#8b5cf6',
    channels: ['shopify', 'amazon'],
    listingScore: 72,
    creatorCount: 2,
    gmv30d: 8900,
    gmvPrev30d: 9800,
    growth: -9.2,
    status: 'declining',
    description: 'Adjustable LED desk lamp with wireless charging base, 5 brightness levels, and color temperature control.',
    price: 59.99,
    channelData: {
      shopify: { gmv: 5200, conversionRate: 1.8, listingScore: 74, creatorCount: 1, sessions: 4800, orders: 86 },
      amazon: { gmv: 3700, conversionRate: 2.2, listingScore: 70, creatorCount: 1, sessions: 3600, orders: 79 },
    },
    listingScores: { title: 75, images: 68, description: 70, keywords: 72, price: 74 },
    flywheel: { build: 'needs-attention', distribute: 'needs-attention', amplify: 'needs-attention', learn: 'needs-attention' },
    crossInsights: [
      { icon: '⚠️', text: 'LED Lamp is the lowest-performing SKU — no TikTok, only 2 creators, listing score 72. Recommend running Boost Underperforming workflow', action: 'Run Workflow' },
      { icon: '💡', text: 'Home Office category avg GMV is $12k — you are at $8.9k. Expanding to TikTok could add $4-6k/month', action: 'Add TikTok' },
    ],
  },
  {
    id: 'SKU-0755',
    name: 'Resistance Bands Set',
    category: 'Fitness',
    image: null,
    imageColor: '#ef4444',
    channels: ['tiktok', 'shopify', 'amazon'],
    listingScore: 88,
    creatorCount: 7,
    gmv30d: 19500,
    gmvPrev30d: 16200,
    growth: 20.4,
    status: 'growing',
    description: '5-piece resistance band set with door anchor, handles, and carry bag. Latex-free TPE material.',
    price: 24.99,
    channelData: {
      tiktok: { gmv: 11200, conversionRate: 5.5, listingScore: 90, creatorCount: 5, sessions: 12800, orders: 704 },
      shopify: { gmv: 4800, conversionRate: 2.6, listingScore: 85, creatorCount: 1, sessions: 4200, orders: 109 },
      amazon: { gmv: 3500, conversionRate: 3.4, listingScore: 88, creatorCount: 1, sessions: 3800, orders: 129 },
    },
    listingScores: { title: 90, images: 86, description: 88, keywords: 90, price: 92 },
    flywheel: { build: 'complete', distribute: 'complete', amplify: 'active', learn: 'active' },
    crossInsights: [
      { icon: '💪', text: 'Resistance Bands + Yoga Mat cross-promotion opportunity — 4 creators cover both fitness products', action: 'Create Bundle' },
      { icon: '📈', text: 'Bands TikTok conversion 5.5% vs Amazon 3.4% — shifting 20% of ad budget to TikTok creator seeding could increase total GMV by ~$3k', action: 'Rebalance Budget' },
      { icon: '🚀', text: 'Cold-start phase: AIGC is correctly dominating at 90% — begin recruiting 2-3 fitness creators now as GMV approaches $5K threshold', action: 'Find Creators' },
    ],
    contentMix: {
      current: { aigcPct: 90, creatorPct: 10 },
      recommended: { aigcPct: 80, creatorPct: 20 },
      aigcCPA: 0.9,
      creatorCPA: 2.1,
      aigcGmv: 17600,
      creatorGmv: 1900,
      phase: 'cold-start',
      phaseLabel: 'Cold Start — AIGC leads, begin recruiting creators once monthly GMV exceeds $5K',
      savingsEstimate: 0,
    },
  },
  {
    id: 'SKU-0863',
    name: 'Portable Blender',
    category: 'Home & Kitchen',
    image: null,
    imageColor: '#14b8a6',
    channels: ['tiktok', 'shopify'],
    listingScore: 90,
    creatorCount: 11,
    gmv30d: 31200,
    gmvPrev30d: 22800,
    growth: 36.8,
    status: 'growing',
    description: 'USB-C rechargeable portable blender, 6 blades, 400ml capacity, self-cleaning mode.',
    price: 39.99,
    channelData: {
      tiktok: { gmv: 24600, conversionRate: 5.8, listingScore: 93, creatorCount: 9, sessions: 16800, orders: 974 },
      shopify: { gmv: 6600, conversionRate: 2.4, listingScore: 86, creatorCount: 2, sessions: 5400, orders: 130 },
    },
    listingScores: { title: 92, images: 90, description: 88, keywords: 91, price: 89 },
    flywheel: { build: 'complete', distribute: 'complete', amplify: 'complete', learn: 'active' },
    crossInsights: [
      { icon: '🥤', text: 'Blender viral content is your #1 top-of-funnel driver — 11 creators reaching 3.2M combined followers this month', action: 'Scale Creators' },
      { icon: '🔗', text: 'Blender + Coffee Machine audience overlap 41% — coordinate posting schedule for maximum reach', action: 'Coordinate Posts' },
    ],
    contentMix: {
      current: { aigcPct: 40, creatorPct: 60 },
      recommended: { aigcPct: 40, creatorPct: 60 },
      aigcCPA: 1.6,
      creatorCPA: 1.7,
      aigcGmv: 12500,
      creatorGmv: 18700,
      phase: 'scale',
      phaseLabel: 'Optimal mix — AIGC and creator costs are nearly equal, maintain current split',
      savingsEstimate: 0,
    },
  },
  {
    id: 'SKU-0971',
    name: 'Bamboo Cutting Board Set',
    category: 'Home & Kitchen',
    image: null,
    imageColor: '#a3e635',
    channels: ['amazon'],
    listingScore: 68,
    creatorCount: 0,
    gmv30d: 4200,
    gmvPrev30d: 4500,
    growth: -6.7,
    status: 'declining',
    description: 'Set of 3 organic bamboo cutting boards with juice groove, different sizes for various tasks.',
    price: 32.99,
    channelData: {
      amazon: { gmv: 4200, conversionRate: 2.1, listingScore: 68, creatorCount: 0, sessions: 3800, orders: 80 },
    },
    listingScores: { title: 70, images: 62, description: 65, keywords: 72, price: 70 },
    flywheel: { build: 'needs-attention', distribute: 'needs-attention', amplify: 'needs-attention', learn: 'needs-attention' },
    crossInsights: [
      { icon: '🪵', text: 'Bamboo Board has zero creator coverage and Amazon-only presence — this SKU is invisible to discovery channels', action: 'Run Launch Workflow' },
      { icon: '📦', text: 'Kitchen bundle opportunity: Board + Blender + Coffee Machine — buyers often purchase 2+ kitchen items within 30 days', action: 'Create Bundle' },
    ],
  },
  {
    id: 'SKU-1089',
    name: 'Vitamin C Face Cream',
    category: 'Beauty',
    image: null,
    imageColor: '#fb923c',
    channels: ['tiktok', 'shopify'],
    listingScore: 83,
    creatorCount: 5,
    gmv30d: 14800,
    gmvPrev30d: null,
    growth: null,
    status: 'new',
    description: 'Brightening face cream with 15% vitamin C, hyaluronic acid, and SPF 30 protection.',
    price: 28.99,
    channelData: {
      tiktok: { gmv: 9400, conversionRate: 4.2, listingScore: 85, creatorCount: 4, sessions: 8600, orders: 361 },
      shopify: { gmv: 5400, conversionRate: 2.5, listingScore: 80, creatorCount: 1, sessions: 4200, orders: 105 },
    },
    listingScores: { title: 85, images: 80, description: 82, keywords: 84, price: 86 },
    flywheel: { build: 'active', distribute: 'active', amplify: 'active', learn: 'needs-attention' },
    crossInsights: [
      { icon: '✨', text: 'Vitamin C Cream is new but already 5 creators — bundle with Hydrating Serum for a skincare routine campaign', action: 'Plan Campaign' },
      { icon: '🧴', text: 'Beauty category conversion avg is 4.1% — Cream is at 4.2% already. Increasing creator count to 10 could push to 5%+', action: 'Recruit Creators' },
    ],
  },
  {
    id: 'SKU-1192',
    name: 'Noise Cancelling Headphones',
    category: 'Electronics',
    image: null,
    imageColor: '#1e293b',
    channels: ['shopify', 'amazon'],
    listingScore: 76,
    creatorCount: 1,
    gmv30d: 11300,
    gmvPrev30d: null,
    growth: null,
    status: 'new',
    description: 'Over-ear ANC headphones with 40mm drivers, 30-hour battery, and foldable design.',
    price: 129.99,
    channelData: {
      shopify: { gmv: 6500, conversionRate: 2.0, listingScore: 78, creatorCount: 1, sessions: 5200, orders: 104 },
      amazon: { gmv: 4800, conversionRate: 2.4, listingScore: 74, creatorCount: 0, sessions: 4400, orders: 106 },
    },
    listingScores: { title: 78, images: 74, description: 72, keywords: 76, price: 80 },
    flywheel: { build: 'active', distribute: 'needs-attention', amplify: 'needs-attention', learn: 'needs-attention' },
    crossInsights: [
      { icon: '🎧', text: 'Headphones + Earbuds — electronics buyers overlap 55%. Earbuds creators could cross-promote Headphones with minimal extra cost', action: 'Cross-Promote' },
      { icon: '⚡', text: 'New SKU with Shopify+Amazon only — adding TikTok could 2-3x monthly GMV based on Earbuds benchmark', action: 'Add TikTok' },
    ],
  },
];

// --- Creators ---
// platforms: where the creator posts content (their social channels)
// channelGmv: GMV they drive on each of YOUR sales channels
export const creators = [
  { id: 'CR-001', name: 'Sarah Chen',    handle: '@sarahreviews',   avatarColor: '#ec4899', followers: 285000, platforms: ['tiktok', 'instagram'],          contentCount: 24, conversionRate: 5.2, niche: 'Beauty & Skincare', status: 'active',  channelGmv: { tiktok: 12800, shopify: 4200, amazon: 1400 } },
  { id: 'CR-002', name: 'Mike Johnson',  handle: '@techmikeJ',      avatarColor: '#3b82f6', followers: 520000, platforms: ['tiktok', 'youtube'],             contentCount: 18, conversionRate: 4.8, niche: 'Tech Reviews',     status: 'active',  channelGmv: { tiktok: 18600, shopify: 8300, amazon: 5200 } },
  { id: 'CR-003', name: 'Luna Park',     handle: '@lunalifestyle',  avatarColor: '#8b5cf6', followers: 178000, platforms: ['tiktok', 'instagram', 'youtube'], contentCount: 31, conversionRate: 6.1, niche: 'Lifestyle',        status: 'active',  channelGmv: { tiktok: 9400,  shopify: 3600, amazon: 1200 } },
  { id: 'CR-004', name: 'David Kim',     handle: '@davidkfitness',  avatarColor: '#10b981', followers: 412000, platforms: ['tiktok', 'instagram'],          contentCount: 15, conversionRate: 4.5, niche: 'Fitness',          status: 'active',  channelGmv: { tiktok: 14200, shopify: 5800, amazon: 2800 } },
  { id: 'CR-005', name: 'Emma Wilson',   handle: '@emmawilson',     avatarColor: '#f59e0b', followers: 89000,  platforms: ['tiktok'],                        contentCount: 42, conversionRate: 7.3, niche: 'Home & Kitchen',   status: 'active',  channelGmv: { tiktok: 6100,  shopify: 1900, amazon: 900  } },
  { id: 'CR-006', name: 'Alex Rivera',   handle: '@alexunboxes',    avatarColor: '#ef4444', followers: 340000, platforms: ['tiktok', 'youtube'],             contentCount: 22, conversionRate: 5.0, niche: 'Unboxing',         status: 'active',  channelGmv: { tiktok: 16200, shopify: 7400, amazon: 4900 } },
  { id: 'CR-007', name: 'Zoe Zhang',     handle: '@zoezbeauty',     avatarColor: '#ec4899', followers: 156000, platforms: ['tiktok', 'instagram'],          contentCount: 28, conversionRate: 5.8, niche: 'Beauty',           status: 'active',  channelGmv: { tiktok: 8200,  shopify: 2600, amazon: 800  } },
  { id: 'CR-008', name: 'Chris Taylor',  handle: '@christech',      avatarColor: '#6366f1', followers: 680000, platforms: ['youtube', 'tiktok'],            contentCount: 12, conversionRate: 3.9, niche: 'Tech',             status: 'active',  channelGmv: { tiktok: 19800, shopify: 12400, amazon: 9000 } },
  { id: 'CR-009', name: 'Maya Patel',    handle: '@mayacooks',      avatarColor: '#14b8a6', followers: 234000, platforms: ['tiktok', 'instagram'],          contentCount: 35, conversionRate: 5.5, niche: 'Cooking',          status: 'active',  channelGmv: { tiktok: 10200, shopify: 3800, amazon: 1800 } },
  { id: 'CR-010', name: 'Jake Morris',   handle: '@jakeoutdoors',   avatarColor: '#22c55e', followers: 198000, platforms: ['youtube', 'instagram'],         contentCount: 19, conversionRate: 4.2, niche: 'Outdoor',          status: 'paused', channelGmv: { tiktok: 0,     shopify: 5600, amazon: 3600 } },
  { id: 'CR-011', name: 'Ashley Lee',    handle: '@ashleyskincare', avatarColor: '#f472b6', followers: 310000, platforms: ['tiktok', 'instagram', 'youtube'], contentCount: 26, conversionRate: 5.9, niche: 'Skincare',         status: 'active',  channelGmv: { tiktok: 13400, shopify: 4800, amazon: 1500 } },
  { id: 'CR-012', name: 'Ryan Gomez',    handle: '@ryanfit',        avatarColor: '#84cc16', followers: 145000, platforms: ['tiktok', 'instagram'],          contentCount: 20, conversionRate: 4.6, niche: 'Fitness',          status: 'active',  channelGmv: { tiktok: 5200,  shopify: 1800, amazon: 800  } },
  { id: 'CR-013', name: 'Nina Olsen',    handle: '@ninashops',      avatarColor: '#a855f7', followers: 92000,  platforms: ['tiktok'],                        contentCount: 38, conversionRate: 6.8, niche: 'Shopping Hauls',   status: 'active',  channelGmv: { tiktok: 5400,  shopify: 600,  amazon: 200  } },
  { id: 'CR-014', name: 'Tom Nguyen',    handle: '@tomtechlife',    avatarColor: '#0ea5e9', followers: 267000, platforms: ['youtube', 'tiktok'],            contentCount: 16, conversionRate: 4.1, niche: 'Tech Lifestyle',   status: 'active',  channelGmv: { tiktok: 9800,  shopify: 4600, amazon: 2900 } },
  { id: 'CR-015', name: 'Bella Romano',  handle: '@bellahome',      avatarColor: '#d946ef', followers: 128000, platforms: ['instagram', 'tiktok'],          contentCount: 33, conversionRate: 5.4, niche: 'Home Decor',       status: 'active',  channelGmv: { tiktok: 5800,  shopify: 3200, amazon: 1400 } },
  { id: 'CR-016', name: 'Jason Park',    handle: '@jasonpetlife',   avatarColor: '#f97316', followers: 205000, platforms: ['tiktok', 'instagram'],          contentCount: 21, conversionRate: 5.7, niche: 'Pets',             status: 'active',  channelGmv: { tiktok: 9200,  shopify: 2800, amazon: 1600 } },
  { id: 'CR-017', name: 'Lily Wang',     handle: '@lilybeautylab',  avatarColor: '#e11d48', followers: 445000, platforms: ['tiktok', 'instagram', 'youtube'], contentCount: 29, conversionRate: 4.3, niche: 'Beauty',           status: 'active',  channelGmv: { tiktok: 16800, shopify: 5800, amazon: 2800 } },
];

// Map creators to products
export const productCreators = {
  'SKU-0042': ['CR-002', 'CR-006', 'CR-008', 'CR-014', 'CR-003', 'CR-005', 'CR-010', 'CR-012'],
  'SKU-0118': ['CR-001', 'CR-003', 'CR-007', 'CR-011', 'CR-013', 'CR-017', 'CR-005', 'CR-009', 'CR-015', 'CR-004', 'CR-012', 'CR-016'],
  'SKU-0205': ['CR-004', 'CR-012', 'CR-003', 'CR-010'],
  'SKU-0319': ['CR-002', 'CR-008', 'CR-014', 'CR-006', 'CR-003', 'CR-010'],
  'SKU-0428': ['CR-005', 'CR-009', 'CR-015'],
  'SKU-0537': ['CR-016', 'CR-003', 'CR-005', 'CR-013', 'CR-006', 'CR-010', 'CR-012', 'CR-009', 'CR-004'],
  'SKU-0641': ['CR-015', 'CR-005'],
  'SKU-0755': ['CR-004', 'CR-012', 'CR-003', 'CR-006', 'CR-010', 'CR-013', 'CR-009'],
  'SKU-0863': ['CR-005', 'CR-009', 'CR-003', 'CR-013', 'CR-015', 'CR-001', 'CR-007', 'CR-011', 'CR-017', 'CR-016', 'CR-012'],
  'SKU-0971': [],
  'SKU-1089': ['CR-001', 'CR-007', 'CR-011', 'CR-017', 'CR-003'],
  'SKU-1192': ['CR-014'],
};

// --- GMV Weekly Trend (12 weeks) ---
export const gmvWeeklyTrend = [
  { week: 'W1', listing: 18200, affiliate: 8400, aigc: 5200, total: 31800 },
  { week: 'W2', listing: 19100, affiliate: 9200, aigc: 5800, total: 34100 },
  { week: 'W3', listing: 18800, affiliate: 10100, aigc: 6400, total: 35300 },
  { week: 'W4', listing: 20400, affiliate: 10800, aigc: 7100, total: 38300 },
  { week: 'W5', listing: 21200, affiliate: 11500, aigc: 7600, total: 40300 },
  { week: 'W6', listing: 19800, affiliate: 12200, aigc: 8200, total: 40200 },
  { week: 'W7', listing: 22100, affiliate: 13400, aigc: 8800, total: 44300 },
  { week: 'W8', listing: 23500, affiliate: 14100, aigc: 9200, total: 46800 },
  { week: 'W9', listing: 24200, affiliate: 14800, aigc: 9800, total: 48800 },
  { week: 'W10', listing: 25100, affiliate: 15600, aigc: 10400, total: 51100 },
  { week: 'W11', listing: 26800, affiliate: 16200, aigc: 11200, total: 54200 },
  { week: 'W12', listing: 28400, affiliate: 17400, aigc: 12000, total: 57800 },
];

// --- GMV Attribution ---
// influenced: true = this segment is driven/boosted by AfterShip (listing opt + creator marketing)
export const gmvAttribution = [
  { name: 'Organic Search',    value: 35, color: '#94a3b8', influenced: false },
  { name: 'Affiliate/Creator', value: 22, color: '#6366f1', influenced: true  },
  { name: 'Paid Ads',          value: 25, color: '#94a3b8', influenced: false },
  { name: 'Listing SEO',       value: 12, color: '#818cf8', influenced: true  },
  { name: 'Other',             value: 6,  color: '#cbd5e1', influenced: false },
];

// --- Dashboard Metrics ---
export const dashboardMetrics = {
  gmv: { value: 128450, change: 18.2, trend: [95, 98, 102, 108, 112, 118, 128] },
  activeSKUs: { value: 342, channels: 3 },
  creatorPartners: { value: 87, active: true },
  contentAssets: { value: 1204, aiPercentage: 68 },
};

// --- AI Insights ---
export const aiInsights = [
  {
    id: 'INS-001',
    type: 'opportunity',
    icon: '🔥',
    title: 'High-performing creator cluster detected',
    description: "SKU-0042 'Wireless Earbuds Pro' has 8 creators driving 3x avg conversion — consider increasing creator recruitment for this SKU.",
    action: 'Recruit More Creators',
    skuId: 'SKU-0042',
  },
  {
    id: 'INS-002',
    type: 'warning',
    icon: '⚠️',
    title: 'Content-listing mismatch detected',
    description: '12 SKUs have high-performing creator content but outdated Shopify listings — content mismatch may be reducing conversion rates.',
    action: 'Review Listings',
    skuId: null,
  },
  {
    id: 'INS-003',
    type: 'insight',
    icon: '💡',
    title: 'Channel ROI imbalance',
    description: 'Your TikTok affiliate ROI is 2.4x higher than Shopify organic — recommend shifting content budget to TikTok creator partnerships.',
    action: 'View Analysis',
    skuId: null,
  },
  {
    id: 'INS-004',
    type: 'opportunity',
    icon: '🚀',
    title: 'Viral potential detected',
    description: "SKU-0537 'Interactive Pet Toy' content engagement is 3.2x above category average on TikTok — prime candidate for scaling.",
    action: 'Scale Campaign',
    skuId: 'SKU-0537',
  },
  {
    id: 'INS-005',
    type: 'opportunity',
    icon: '🛍️',
    title: 'Shopify write-back opportunity',
    description: '8 SKUs have high-performing TikTok creator content that hasn\'t been synced to Shopify listings — auto-write-back could lift Shopify conversion by an estimated 15-22%.',
    action: 'Sync to Shopify',
    skuId: null,
  },
];

// --- Content Assets ---
export const contentAssets = [
  { id: 'CA-001', type: 'image', name: 'Earbuds Hero Shot', skuId: 'SKU-0042', source: 'ai', channels: ['tiktok', 'shopify', 'amazon'], color: '#6366f1', createdAt: '2026-02-18' },
  { id: 'CA-002', type: 'image', name: 'Earbuds Lifestyle', skuId: 'SKU-0042', source: 'creator', channels: ['tiktok'], color: '#818cf8', createdAt: '2026-02-15' },
  { id: 'CA-003', type: 'video', name: 'Earbuds Review 60s', skuId: 'SKU-0042', source: 'creator', channels: ['tiktok'], color: '#6366f1', views: 245000, createdAt: '2026-02-12' },
  { id: 'CA-004', type: 'video', name: 'Earbuds Unboxing', skuId: 'SKU-0042', source: 'creator', channels: ['tiktok'], color: '#4f46e5', views: 182000, createdAt: '2026-02-10' },
  { id: 'CA-005', type: 'copy', name: 'TikTok Listing Title', skuId: 'SKU-0042', source: 'ai', channels: ['tiktok'], color: '#6366f1', createdAt: '2026-02-20', preview: '🎧 Wireless Earbuds Pro | 36HR Battery | ANC | IPX5 Waterproof — Free Shipping + 30-Day Returns' },
  { id: 'CA-006', type: 'brief', name: 'Creator Brief v2', skuId: 'SKU-0042', source: 'ai', channels: ['tiktok'], color: '#818cf8', createdAt: '2026-02-22', preview: 'Key message: Best earbuds under $80. Hook idea: "POV: you finally stopped borrowing headphones". CTA: Link in bio for 10% off.' },
  { id: 'CA-007', type: 'image', name: 'Serum Product Shot', skuId: 'SKU-0118', source: 'seller', channels: ['tiktok', 'shopify'], color: '#ec4899', createdAt: '2026-02-14' },
  { id: 'CA-008', type: 'image', name: 'Serum Before/After', skuId: 'SKU-0118', source: 'ai', channels: ['tiktok'], color: '#f472b6', createdAt: '2026-02-16' },
  { id: 'CA-009', type: 'video', name: 'Serum Application Tutorial', skuId: 'SKU-0118', source: 'creator', channels: ['tiktok'], color: '#ec4899', views: 340000, createdAt: '2026-02-08' },
  { id: 'CA-010', type: 'copy', name: 'Shopify Description', skuId: 'SKU-0118', source: 'ai', channels: ['shopify'], color: '#ec4899', createdAt: '2026-02-19', preview: 'Deeply hydrate and brighten with our triple-action serum. Hyaluronic acid locks in moisture while vitamin C fades dark spots — dermatologist approved.' },
  { id: 'CA-011', type: 'image', name: 'Yoga Mat Flat Lay', skuId: 'SKU-0205', source: 'seller', channels: ['shopify', 'amazon'], color: '#10b981', createdAt: '2026-01-20' },
  { id: 'CA-012', type: 'video', name: 'Yoga Mat Review', skuId: 'SKU-0205', source: 'creator', channels: ['shopify'], color: '#10b981', views: 89000, createdAt: '2026-02-02' },
  { id: 'CA-013', type: 'image', name: 'Smart Watch Wrist Shot', skuId: 'SKU-0319', source: 'ai', channels: ['tiktok', 'shopify', 'amazon'], color: '#3b82f6', createdAt: '2026-02-20' },
  { id: 'CA-014', type: 'video', name: 'Watch Features Walkthrough', skuId: 'SKU-0319', source: 'ai', channels: ['tiktok', 'shopify'], color: '#3b82f6', views: 410000, createdAt: '2026-02-17' },
  { id: 'CA-015', type: 'image', name: 'Coffee Machine Glamour', skuId: 'SKU-0428', source: 'seller', channels: ['shopify', 'amazon'], color: '#92400e', createdAt: '2026-02-05' },
  { id: 'CA-016', type: 'video', name: 'Pet Toy in Action', skuId: 'SKU-0537', source: 'creator', channels: ['tiktok'], color: '#f59e0b', views: 680000, createdAt: '2026-02-11' },
  { id: 'CA-017', type: 'image', name: 'Pet Toy Package', skuId: 'SKU-0537', source: 'ai', channels: ['tiktok', 'amazon'], color: '#fbbf24', createdAt: '2026-02-18' },
  { id: 'CA-018', type: 'brief', name: 'Pet Creator Brief', skuId: 'SKU-0537', source: 'ai', channels: ['tiktok'], color: '#f59e0b', createdAt: '2026-02-21', preview: 'Show your pet playing with the rolling ball — spontaneous reactions work best. Film in good lighting, horizontal or vertical OK. No scripted dialog needed.' },
  { id: 'CA-019', type: 'video', name: 'Blender Smoothie Recipe', skuId: 'SKU-0863', source: 'creator', channels: ['tiktok'], color: '#14b8a6', views: 520000, createdAt: '2026-02-13' },
  { id: 'CA-020', type: 'image', name: 'Blender All Colors', skuId: 'SKU-0863', source: 'ai', channels: ['tiktok', 'shopify'], color: '#2dd4bf', createdAt: '2026-02-19' },
  { id: 'CA-021', type: 'copy', name: 'Amazon Bullet Points', skuId: 'SKU-0428', source: 'ai', channels: ['amazon'], color: '#92400e', createdAt: '2026-02-21', preview: '• BARISTA-GRADE ESPRESSO at home — 15-bar pressure extracts full flavor\n• BUILT-IN CONICAL GRINDER with 5 grind settings for fresh beans every time\n• ONE-TOUCH MILK FROTHER creates silky microfoam for lattes and cappuccinos' },
  { id: 'CA-022', type: 'image', name: 'Resistance Bands Action', skuId: 'SKU-0755', source: 'creator', channels: ['tiktok'], color: '#ef4444', createdAt: '2026-02-16' },
  { id: 'CA-023', type: 'video', name: 'Full Body Band Workout', skuId: 'SKU-0755', source: 'creator', channels: ['tiktok'], color: '#ef4444', views: 295000, createdAt: '2026-02-09' },
  { id: 'CA-024', type: 'image', name: 'Vitamin C Cream Texture', skuId: 'SKU-1089', source: 'ai', channels: ['tiktok', 'shopify'], color: '#fb923c', createdAt: '2026-02-22' },
];

// --- Workflows ---
export const workflows = [
  {
    id: 'WF-001',
    name: 'New Product Launch',
    description: 'End-to-end workflow for launching a new product across all channels',
    steps: 5,
    estimatedTime: '~2 days',
    automation: 'Automated',
    lastRun: '2026-02-24',
    status: 'running',
    runningStep: 2,
    progress: 45,
    runningFor: 'Interactive Pet Toy — TikTok Launch',
    icon: '🚀',
    stepsDetail: [
      { phase: 'Build', name: 'Generate product images & copy with AI', status: 'auto', runState: 'done' },
      { phase: 'Build', name: 'Create creator brief & outreach template', status: 'auto', runState: 'done' },
      { phase: 'Distribute', name: 'Publish listings to selected channels', status: 'auto', runState: 'active' },
      { phase: 'Amplify', name: 'Match & invite relevant creators', status: 'semi-auto', runState: 'pending' },
      { phase: 'Learn', name: 'Set up performance tracking & alerts', status: 'auto', runState: 'pending' },
    ],
  },
  {
    id: 'WF-002',
    name: 'Boost Underperforming SKU',
    description: 'Diagnose and improve performance for declining products',
    steps: 4,
    estimatedTime: '~1 day',
    automation: 'Semi-Auto',
    lastRun: '2026-02-22',
    status: 'active',
    icon: '📈',
    stepsDetail: [
      { phase: 'Learn', name: 'Analyze performance gaps vs category benchmarks', status: 'auto' },
      { phase: 'Build', name: 'Regenerate underperforming content assets', status: 'auto' },
      { phase: 'Distribute', name: 'Update listings with optimized content', status: 'semi-auto' },
      { phase: 'Amplify', name: 'Recruit high-converting creators in category', status: 'semi-auto' },
    ],
  },
  {
    id: 'WF-003',
    name: 'Scale Winning Product',
    description: 'Expand successful products to new channels and more creators',
    steps: 3,
    estimatedTime: 'Ongoing',
    automation: 'Semi-Auto',
    lastRun: '2026-02-21',
    status: 'active',
    icon: '⚡',
    stepsDetail: [
      { phase: 'Distribute', name: 'Adapt content for new channel requirements', status: 'auto' },
      { phase: 'Amplify', name: 'Scale creator partnerships based on performance data', status: 'semi-auto' },
      { phase: 'Learn', name: 'Monitor cross-channel cannibalization', status: 'auto' },
    ],
  },
  {
    id: 'WF-004',
    name: 'Pre-Sale Preparation',
    description: 'Prepare products, content, and creators for upcoming sale events',
    steps: 6,
    estimatedTime: '~3 days',
    automation: 'Guided',
    lastRun: '2026-02-15',
    status: 'active',
    icon: '🎯',
    stepsDetail: [
      { phase: 'Learn', name: 'Identify top SKUs with highest sale potential', status: 'auto' },
      { phase: 'Build', name: 'Generate sale-specific creative assets', status: 'auto' },
      { phase: 'Build', name: 'Create event-specific creator briefs', status: 'auto' },
      { phase: 'Distribute', name: 'Schedule listing updates with sale pricing', status: 'semi-auto' },
      { phase: 'Amplify', name: 'Coordinate creator posting schedule', status: 'manual' },
      { phase: 'Learn', name: 'Set up real-time sale performance dashboard', status: 'auto' },
    ],
  },
  {
    id: 'WF-005',
    name: 'Creator Campaign Setup',
    description: 'Find, onboard, and activate creators for a product campaign',
    steps: 4,
    estimatedTime: '~2 days',
    automation: 'Semi-Auto',
    lastRun: '2026-02-19',
    status: 'active',
    icon: '🤝',
    stepsDetail: [
      { phase: 'Learn', name: 'AI recommends best-fit creators based on product & audience', status: 'auto' },
      { phase: 'Build', name: 'Generate personalized creator briefs with product samples', status: 'auto' },
      { phase: 'Amplify', name: 'Send outreach & track responses', status: 'semi-auto' },
      { phase: 'Learn', name: 'Monitor content creation & early performance signals', status: 'auto' },
    ],
  },
];

// --- Copilot Conversations ---
export const copilotConversations = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Hi! I'm your Growth Copilot. I can help you launch products, optimize listings, find creators, and grow your sales across channels. What would you like to work on?",
  },
];

export const copilotQuickPrompts = [
  'Launch Interactive Pet Toy on TikTok',
  "Why did this SKU's sales drop?",
  'Should I use more AIGC or creators?',
  'Find creators for my best sellers',
];

// --- Competitor Benchmarks ---
export const competitorBenchmarks = {
  'Electronics': { avgListingScore: 82, avgConversion: 3.2, avgCreatorCount: 4, avgGMV: 28000 },
  'Beauty': { avgListingScore: 79, avgConversion: 4.1, avgCreatorCount: 6, avgGMV: 22000 },
  'Fitness': { avgListingScore: 75, avgConversion: 3.5, avgCreatorCount: 3, avgGMV: 15000 },
  'Home & Kitchen': { avgListingScore: 73, avgConversion: 2.8, avgCreatorCount: 2, avgGMV: 18000 },
  'Pets': { avgListingScore: 77, avgConversion: 4.5, avgCreatorCount: 5, avgGMV: 16000 },
  'Home & Office': { avgListingScore: 71, avgConversion: 2.5, avgCreatorCount: 2, avgGMV: 12000 },
};

// Compute total gmvAttributed from channelGmv for backwards compat
creators.forEach((c) => {
  c.gmvAttributed = Object.values(c.channelGmv).reduce((s, v) => s + v, 0);
});

// Creator platform metadata
export const creatorPlatforms = {
  tiktok:    { label: 'TikTok',     color: '#010101', bg: 'rgba(1,1,1,0.07)'       },
  instagram: { label: 'Instagram',  color: '#e1306c', bg: 'rgba(225,48,108,0.09)'  },
  youtube:   { label: 'YouTube',    color: '#ff0000', bg: 'rgba(255,0,0,0.08)'     },
};

// --- Helper functions ---
export const formatCurrency = (value) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value.toLocaleString()}`;
};

export const formatNumber = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toLocaleString();
};

export const getChannelColor = (channelId) => {
  const map = { tiktok: '#ff0050', shopify: '#96bf48', amazon: '#ff9900' };
  return map[channelId] || '#94a3b8';
};

export const getChannelName = (channelId) => {
  const map = { tiktok: 'TikTok Shop', shopify: 'Shopify', amazon: 'Amazon' };
  return map[channelId] || channelId;
};

export const getStatusColor = (status) => {
  const map = { growing: '#10b981', declining: '#ef4444', new: '#94a3b8' };
  return map[status] || '#94a3b8';
};
