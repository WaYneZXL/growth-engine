// ============================================================
// Mock Data for AfterShip Feed
// ============================================================

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
      tiktok: { gmv: 28900, conversionRate: 4.8, listingScore: 95, creatorCount: 6, sessions: 12400, orders: 595, impressions: 185000, clicks: 24800, ctr: 13.4, aov: 48.6, returnRate: 4.2, inventory: 820, daysOfStock: 18 },
      shopify: { gmv: 12300, conversionRate: 2.1, listingScore: 88, creatorCount: 2, sessions: 8200, orders: 172, impressions: 62000, clicks: 14200, ctr: 22.9, aov: 71.5, returnRate: 2.8, inventory: 450, daysOfStock: 42 },
      amazon: { gmv: 7000, conversionRate: 3.2, listingScore: 91, creatorCount: 0, sessions: 5600, orders: 179, impressions: 84000, clicks: 9800, ctr: 11.7, aov: 39.1, returnRate: 5.1, inventory: 340, daysOfStock: 28 },
    },
    listingScores: {
      title: 95, images: 90, description: 88, keywords: 94, price: 85,
    },
    channelListings: {
      tiktok: {
        overallScore: 95,
        dimensions: [
          { name: 'Title & Hooks', score: 97, weight: 'high', status: 'strong' },
          { name: 'Main Image', score: 92, weight: 'high', status: 'strong' },
          { name: 'Product Video', score: 98, weight: 'high', status: 'strong' },
          { name: 'Description', score: 90, weight: 'medium', status: 'good' },
          { name: 'Selling Points Match', score: 94, weight: 'medium', status: 'strong' },
        ],
        suggestions: [
          { priority: 'low', text: 'Description could emphasize "36-hour battery" more — top converting hook from creator videos', action: 'Rewrite with AI' },
        ],
      },
      shopify: {
        overallScore: 78,
        dimensions: [
          { name: 'Title & SEO', score: 85, weight: 'high', status: 'good' },
          { name: 'Hero Image', score: 62, weight: 'high', status: 'weak' },
          { name: 'Image Gallery', score: 70, weight: 'medium', status: 'needs-work' },
          { name: 'Description', score: 82, weight: 'high', status: 'good' },
          { name: 'Meta & Structured Data', score: 88, weight: 'medium', status: 'good' },
        ],
        suggestions: [
          { priority: 'high', text: 'Hero image is white-background product shot — Shopify converts 23% better with lifestyle imagery. AI can generate from existing assets.', action: 'Generate Lifestyle Image' },
          { priority: 'medium', text: 'Gallery only has 3 images (category avg: 6). Add lifestyle scenes, detail close-ups, and in-use shots.', action: 'Generate Images' },
          { priority: 'low', text: 'Creator @techsarah\'s TikTok hook "these replaced my AirPods" hasn\'t been incorporated into Shopify copy — could lift conversion.', action: 'Rewrite with AI' },
        ],
      },
      amazon: {
        overallScore: 91,
        dimensions: [
          { name: 'Title Keywords', score: 94, weight: 'high', status: 'strong' },
          { name: 'Main Image (Compliance)', score: 96, weight: 'high', status: 'strong' },
          { name: 'Bullet Points', score: 88, weight: 'high', status: 'good' },
          { name: 'A+ Content', score: 85, weight: 'medium', status: 'good' },
          { name: 'Backend Keywords', score: 92, weight: 'medium', status: 'strong' },
        ],
        suggestions: [
          { priority: 'medium', text: 'Bullet point #3 mentions "water resistant" — upgrade to "IPX5 waterproof" which has 3x search volume on Amazon.', action: 'Optimize Keywords' },
        ],
      },
    },
    channelOptimizations: [
      { icon: '📦', type: 'inventory', text: 'TikTok sells 3.5x faster than Amazon but has similar stock levels. Consider reallocating 200 units from Amazon → TikTok to avoid stockout in ~18 days.', impact: 'Prevent $14K stockout', impactColor: '#ef4444' },
      { icon: '💰', type: 'pricing', text: 'Shopify conversion is 2.1% vs TikTok 4.8% — Shopify price is $79.99 vs TikTok $69.99. A/B test a Shopify price of $74.99 to close the gap.', impact: 'Est. +0.8% conversion', impactColor: '#10b981' },
    ],
    flywheel: { listings: 'complete', content: 'complete', creators: 'active', insights: 'active' },
    recommendedActions: [
      { priority: 'high', title: 'Add lifestyle images to Shopify listing', reason: 'Shopify hero image is white-background — listings with lifestyle imagery convert 23% better in this category.', impact: 'Est. +23% conv.', impactColor: '#10b981', cta: 'Fix Listing', targetTab: 1 },
      { priority: 'medium', title: 'Incorporate TikTok-validated hooks into Shopify copy', reason: 'Creator videos drive +18% Shopify traffic, but the listing doesn\'t use the winning selling points.', impact: 'Est. +12% conv.', impactColor: '#10b981', cta: 'Fix Listing', targetTab: 1 },
      { priority: 'low', title: 'Shift long-tail content from creators to AIGC', reason: 'AIGC converts at $0.80/conv vs creator $3.20/conv — rebalancing saves budget for hero moments.', impact: 'Save ~$2.4K/mo', impactColor: '#10b981', cta: 'Optimize Mix', targetTab: 2 },
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
      tiktok: { gmv: 26800, conversionRate: 5.2, listingScore: 90, creatorCount: 10, sessions: 15200, orders: 790, impressions: 228000, clicks: 31400, ctr: 13.8, aov: 33.9, returnRate: 3.1, inventory: 580, daysOfStock: 12 },
      shopify: { gmv: 8800, conversionRate: 2.8, listingScore: 82, creatorCount: 2, sessions: 6100, orders: 171, impressions: 48000, clicks: 10200, ctr: 21.3, aov: 51.5, returnRate: 1.9, inventory: 920, daysOfStock: 48 },
    },
    listingScores: { title: 90, images: 85, description: 82, keywords: 88, price: 92 },
    channelListings: {
      tiktok: {
        overallScore: 90,
        dimensions: [
          { name: 'Title & Hooks', score: 92, weight: 'high', status: 'strong' },
          { name: 'Main Image', score: 85, weight: 'high', status: 'good' },
          { name: 'Product Video', score: 95, weight: 'high', status: 'strong' },
          { name: 'Description', score: 88, weight: 'medium', status: 'good' },
          { name: 'Selling Points Match', score: 90, weight: 'medium', status: 'strong' },
        ],
        suggestions: [
          { priority: 'medium', text: 'Main image still uses studio shot. TikTok listings with "skin close-up" images get 31% more clicks in Beauty category.', action: 'Generate Image' },
        ],
      },
      shopify: {
        overallScore: 72,
        dimensions: [
          { name: 'Title & SEO', score: 78, weight: 'high', status: 'needs-work' },
          { name: 'Hero Image', score: 65, weight: 'high', status: 'weak' },
          { name: 'Image Gallery', score: 60, weight: 'medium', status: 'weak' },
          { name: 'Description', score: 80, weight: 'high', status: 'good' },
          { name: 'Meta & Structured Data', score: 75, weight: 'medium', status: 'needs-work' },
        ],
        suggestions: [
          { priority: 'high', text: 'Creator content on TikTok emphasizes "deep hydration" as #1 hook — Shopify title still says "Moisturizing Face Serum". Rewrite using creator-validated language.', action: 'Rewrite with AI' },
          { priority: 'high', text: 'Only 2 gallery images. Beauty category avg is 8. AI can generate ingredient close-ups, before/after mockups, and texture shots.', action: 'Generate Images' },
          { priority: 'medium', text: 'Missing structured data for "Skin Type" and "Key Ingredients" — adding these improves Google Shopping visibility.', action: 'Fix SEO' },
        ],
      },
    },
    channelOptimizations: [
      { icon: '📦', type: 'inventory', text: 'TikTok stock projected to run out in 12 days based on current velocity. Shopify has 45+ days of stock.', impact: 'Rebalance inventory', impactColor: '#f59e0b' },
      { icon: '🔄', type: 'content', text: 'Shopify conversion trails TikTok by 2.4x — listing quality gap (72 vs 90) is likely the cause, not pricing.', impact: 'Fix listing first', impactColor: '#7c5cfc' },
    ],
    flywheel: { listings: 'needs-attention', content: 'complete', creators: 'active', insights: 'needs-attention' },
    recommendedActions: [
      { priority: 'high', title: 'Rewrite Shopify title with creator-validated language', reason: 'TikTok creators use "deep hydration" (5.2% conv.) but Shopify says "Moisturizing Face Serum" (2.8% conv.).', impact: 'Est. +15% conv.', impactColor: '#10b981', cta: 'Rewrite with AI', targetTab: 1 },
      { priority: 'high', title: 'Generate more Shopify gallery images', reason: 'Only 2 images vs category avg 8. Beauty PDPs with 6+ images convert 1.8x better.', impact: 'Est. +80% more', impactColor: '#10b981', cta: 'Generate Images', targetTab: 2 },
      { priority: 'medium', title: 'Cross-promote with Vitamin C Cream creators', reason: '12 creators promoting Serum also post Beauty content — bundle recommendation could lift AOV.', impact: 'Est. +$3K AOV lift', impactColor: '#10b981', cta: 'View Creators', targetTab: 3 },
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
    flywheel: { listings: 'needs-attention', content: 'needs-attention', creators: 'needs-attention', insights: 'needs-attention' },
    recommendedActions: [
      { priority: 'high', title: 'Launch TikTok Shop listing', reason: 'Zero TikTok presence but 4 fitness creators on your account could start promoting immediately.', impact: 'New channel', impactColor: '#10b981', cta: 'Expand Channel', targetTab: 4 },
      { priority: 'high', title: 'Refresh Amazon listing images', reason: 'Image score 72 vs category avg 75 — outdated photos likely hurting conversion.', impact: 'Est. +15% conv.', impactColor: '#10b981', cta: 'Generate Images', targetTab: 2 },
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
      tiktok: { gmv: 22400, conversionRate: 3.6, listingScore: 96, creatorCount: 4, sessions: 9800, orders: 353, impressions: 142000, clicks: 18600, ctr: 13.1, aov: 63.5, returnRate: 3.8, inventory: 410, daysOfStock: 15 },
      shopify: { gmv: 18200, conversionRate: 2.9, listingScore: 92, creatorCount: 2, sessions: 11200, orders: 325, impressions: 78000, clicks: 17800, ctr: 22.8, aov: 56.0, returnRate: 2.2, inventory: 680, daysOfStock: 35 },
      amazon: { gmv: 11500, conversionRate: 3.8, listingScore: 93, creatorCount: 0, sessions: 7400, orders: 281, impressions: 96000, clicks: 12800, ctr: 13.3, aov: 40.9, returnRate: 4.5, inventory: 520, daysOfStock: 28 },
    },
    listingScores: { title: 96, images: 94, description: 92, keywords: 95, price: 88 },
    channelListings: {
      tiktok: {
        overallScore: 86,
        dimensions: [
          { name: 'Title & Hooks', score: 88, weight: 'high', status: 'good' },
          { name: 'Main Image', score: 82, weight: 'high', status: 'good' },
          { name: 'Product Video', score: 90, weight: 'high', status: 'strong' },
          { name: 'Description', score: 84, weight: 'medium', status: 'good' },
          { name: 'Selling Points Match', score: 86, weight: 'medium', status: 'good' },
        ],
        suggestions: [
          { priority: 'medium', text: 'Main image shows watch on white background. TikTok fitness content performs 40% better with "on-wrist action shots".', action: 'Generate Image' },
        ],
      },
      shopify: {
        overallScore: 81,
        dimensions: [
          { name: 'Title & SEO', score: 85, weight: 'high', status: 'good' },
          { name: 'Hero Image', score: 78, weight: 'high', status: 'needs-work' },
          { name: 'Image Gallery', score: 80, weight: 'medium', status: 'good' },
          { name: 'Description', score: 82, weight: 'high', status: 'good' },
          { name: 'Meta & Structured Data', score: 80, weight: 'medium', status: 'good' },
        ],
        suggestions: [
          { priority: 'medium', text: 'Gallery lacks comparison images (vs Apple Watch). Competitor comparison content drives 18% longer time-on-page in Electronics.', action: 'Generate Comparison' },
        ],
      },
      amazon: {
        overallScore: 84,
        dimensions: [
          { name: 'Title Keywords', score: 86, weight: 'high', status: 'good' },
          { name: 'Main Image (Compliance)', score: 92, weight: 'high', status: 'strong' },
          { name: 'Bullet Points', score: 80, weight: 'high', status: 'good' },
          { name: 'A+ Content', score: 78, weight: 'medium', status: 'needs-work' },
          { name: 'Backend Keywords', score: 85, weight: 'medium', status: 'good' },
        ],
        suggestions: [
          { priority: 'medium', text: 'A+ content still uses generic brand template. Custom A+ with lifestyle images lifts conversion 8-12% in Electronics.', action: 'Upgrade A+ Content' },
          { priority: 'low', text: 'Backend keywords missing "fitness tracker" variant — 12K monthly searches on Amazon.', action: 'Add Keywords' },
        ],
      },
    },
    channelOptimizations: [
      { icon: '📦', type: 'inventory', text: 'Amazon has 35 days of stock but sales velocity is accelerating (+22% this week). Consider pre-ordering before stockout.', impact: 'Plan ahead', impactColor: '#f59e0b' },
    ],
    flywheel: { listings: 'active', content: 'active', creators: 'active', insights: 'active' },
    recommendedActions: [
      { priority: 'medium', title: 'Add comparison images to Shopify gallery', reason: 'No vs-Apple-Watch comparison content. Electronics category sees 18% longer time-on-page with comparison images.', impact: 'Est. +18% engagement', impactColor: '#10b981', cta: 'Generate Images', targetTab: 2 },
      { priority: 'medium', title: 'Upgrade Amazon A+ Content', reason: 'Using generic brand template — custom A+ with lifestyle images lifts conversion 8-12% in Electronics.', impact: 'Est. +8-12% conv.', impactColor: '#10b981', cta: 'Fix Listing', targetTab: 1 },
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
    flywheel: { listings: 'active', content: 'active', creators: 'needs-attention', insights: 'active' },
    recommendedActions: [
      { priority: 'high', title: 'Recruit TikTok creator affiliates', reason: 'No creator affiliates on TikTok — Home & Kitchen creators generate 3.2x ROI vs paid ads.', impact: 'Est. 3.2x ROI', impactColor: '#10b981', cta: 'Find Creators', targetTab: 3 },
      { priority: 'medium', title: 'Rewrite Amazon bullet points', reason: 'Amazon copy last updated 90+ days ago — AI rewrite could boost conversion by 12-18%.', impact: 'Est. +12-18% conv.', impactColor: '#10b981', cta: 'Rewrite with AI', targetTab: 1 },
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
      tiktok: { gmv: 18200, conversionRate: 6.1, listingScore: 88, creatorCount: 8, sessions: 18400, orders: 1123, impressions: 276000, clicks: 38200, ctr: 13.8, aov: 16.2, returnRate: 2.4, inventory: 1200, daysOfStock: 14 },
      amazon: { gmv: 4500, conversionRate: 2.9, listingScore: 82, creatorCount: 1, sessions: 4200, orders: 122, impressions: 52000, clicks: 7400, ctr: 14.2, aov: 36.9, returnRate: 4.8, inventory: 680, daysOfStock: 56 },
    },
    listingScores: { title: 88, images: 84, description: 82, keywords: 86, price: 90 },
    channelListings: {
      tiktok: {
        overallScore: 88,
        dimensions: [
          { name: 'Title & Hooks', score: 82, weight: 'high', status: 'good' },
          { name: 'Main Image', score: 90, weight: 'high', status: 'strong' },
          { name: 'Product Video', score: 95, weight: 'high', status: 'strong' },
          { name: 'Description', score: 85, weight: 'medium', status: 'good' },
          { name: 'Selling Points Match', score: 88, weight: 'medium', status: 'good' },
        ],
        suggestions: [
          { priority: 'medium', text: 'Title uses generic "Interactive Cat Toy" — creator @petloversarah\'s viral hook "automatic laser pattern" has 3.2x higher CTR. Rewrite title.', action: 'Rewrite with AI' },
        ],
      },
      amazon: {
        overallScore: 64,
        dimensions: [
          { name: 'Title Keywords', score: 70, weight: 'high', status: 'needs-work' },
          { name: 'Main Image (Compliance)', score: 55, weight: 'high', status: 'weak' },
          { name: 'Bullet Points', score: 58, weight: 'medium', status: 'weak' },
          { name: 'A+ Content', score: 72, weight: 'high', status: 'needs-work' },
          { name: 'Backend Keywords', score: 68, weight: 'medium', status: 'needs-work' },
        ],
        suggestions: [
          { priority: 'high', text: 'Amazon hero image is a white-background product photo. The TikTok video (450K views) shows cats actively playing — extract a frame for Amazon hero.', action: 'Generate from Video' },
          { priority: 'high', text: 'Amazon description doesn\'t mention "automatic laser pattern" — the #1 reason people buy according to TikTok data. AI can rewrite using creator-validated hooks.', action: 'Rewrite with AI' },
          { priority: 'medium', text: 'No customer review highlights on PDP. 85% of TikTok comments mention "my cat loves it" — use as social proof on Amazon.', action: 'Add Social Proof' },
        ],
      },
    },
    channelOptimizations: [
      { icon: '🚀', type: 'expansion', text: 'This SKU is on 2 channels but category leaders are on 3+. Shopify Pet category has high demand — consider expanding.', impact: 'Est. +$6K/mo', impactColor: '#10b981' },
      { icon: '💰', type: 'pricing', text: 'TikTok price is $24.99 and converting at 6.1%. Category avg price is $29.99 — you may have room to increase without hurting conversion.', impact: 'Est. +$3K margin/mo', impactColor: '#10b981' },
    ],
    flywheel: { listings: 'active', content: 'complete', creators: 'complete', insights: 'active' },
    recommendedActions: [
      { priority: 'high', title: 'Update Amazon PDP with viral TikTok hook', reason: '@petloversarah\'s video (450K views) proved "automatic laser pattern" is the #1 purchase driver — Amazon listing doesn\'t mention it.', impact: 'Est. +18% conv.', impactColor: '#10b981', cta: 'Fix Listing', targetTab: 1 },
      { priority: 'high', title: 'Replace Amazon hero image with lifestyle shot', reason: 'Current white-background photo vs TikTok video showing cats playing — extract video frame for Amazon.', impact: 'Est. +25% CTR', impactColor: '#10b981', cta: 'Generate Image', targetTab: 2 },
      { priority: 'medium', title: 'Expand to Shopify store', reason: 'Strong TikTok performance (6.1% conv., 3.2x above category) with zero Shopify presence. Pet accessories sell well on Shopify.', impact: 'Est. +$6K/mo', impactColor: '#10b981', cta: 'Expand Channel', targetTab: 4 },
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
    flywheel: { listings: 'needs-attention', content: 'needs-attention', creators: 'needs-attention', insights: 'needs-attention' },
    recommendedActions: [
      { priority: 'high', title: 'Launch TikTok Shop listing', reason: 'No TikTok presence, only 2 creators, listing score 72. Home Office category avg GMV is $12k vs your $8.9k.', impact: 'Est. +$4-6K/mo', impactColor: '#10b981', cta: 'Expand Channel', targetTab: 4 },
      { priority: 'high', title: 'Refresh all listing images', reason: 'Listing images score 68 — lowest across all SKUs. AI-generated lifestyle shots could close the gap.', impact: 'Est. +20% conv.', impactColor: '#10b981', cta: 'Generate Images', targetTab: 2 },
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
      tiktok: { gmv: 11200, conversionRate: 5.5, listingScore: 90, creatorCount: 5, sessions: 12800, orders: 704, impressions: 168000, clicks: 22400, ctr: 13.3, aov: 15.9, returnRate: 2.1, inventory: 1800, daysOfStock: 34 },
      shopify: { gmv: 4800, conversionRate: 2.6, listingScore: 85, creatorCount: 1, sessions: 4200, orders: 109, impressions: 32000, clicks: 7200, ctr: 22.5, aov: 44.0, returnRate: 1.6, inventory: 620, daysOfStock: 85 },
      amazon: { gmv: 3500, conversionRate: 3.4, listingScore: 88, creatorCount: 1, sessions: 3800, orders: 129, impressions: 48000, clicks: 6800, ctr: 14.2, aov: 27.1, returnRate: 3.8, inventory: 540, daysOfStock: 63 },
    },
    listingScores: { title: 90, images: 86, description: 88, keywords: 90, price: 92 },
    channelListings: {
      tiktok: {
        overallScore: 74,
        dimensions: [
          { name: 'Title & Hooks', score: 70, weight: 'high', status: 'needs-work' },
          { name: 'Main Image', score: 72, weight: 'high', status: 'needs-work' },
          { name: 'Product Video', score: 80, weight: 'high', status: 'good' },
          { name: 'Description', score: 75, weight: 'medium', status: 'needs-work' },
          { name: 'Selling Points Match', score: 72, weight: 'medium', status: 'needs-work' },
        ],
        suggestions: [
          { priority: 'high', text: 'AIGC cold-start data shows "travel-friendly" converts 2.1x better than "5 resistance levels". Rewrite title and description to lead with portability angle.', action: 'Rewrite with AI' },
          { priority: 'high', text: 'Main image is a flat lay of all 5 bands. TikTok fitness listings with "in-use workout" images get 45% higher CTR.', action: 'Generate Image' },
          { priority: 'medium', text: 'Description is 20 words — TikTok optimal is 80-120 words with emoji breaks. AI can expand.', action: 'Expand Description' },
        ],
      },
    },
    channelOptimizations: [
      { icon: '🌐', type: 'expansion', text: 'Strong on TikTok but underperforming on Shopify and Amazon. Fitness accessories sell well on Amazon — AIGC-validated "travel-friendly" angle works for Amazon keyword strategy too.', impact: 'New channel opportunity', impactColor: '#10b981' },
    ],
    flywheel: { listings: 'needs-attention', content: 'active', creators: 'needs-attention', insights: 'needs-attention' },
    recommendedActions: [
      { priority: 'high', title: 'Rewrite TikTok listing with validated selling angle', reason: 'AIGC cold-start proved "travel-friendly" converts 2.1x better than "5 resistance levels". Title still uses old angle.', impact: 'Est. +2.1x conv.', impactColor: '#10b981', cta: 'Rewrite with AI', targetTab: 1 },
      { priority: 'high', title: 'Start creator recruitment', reason: 'Cold start phase complete — GMV data and validated hooks ready. 8 matched creators waiting for outreach.', impact: 'Est. +$8K/mo', impactColor: '#10b981', cta: 'Find Creators', targetTab: 3 },
      { priority: 'medium', title: 'Replace TikTok main image', reason: 'Flat-lay photo of all 5 bands — fitness listings with "in-use workout" images get 45% higher CTR.', impact: 'Est. +45% CTR', impactColor: '#10b981', cta: 'Generate Image', targetTab: 2 },
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
    flywheel: { listings: 'complete', content: 'active', creators: 'complete', insights: 'active' },
    recommendedActions: [
      { priority: 'high', title: 'Expand to Amazon marketplace', reason: 'Strong on TikTok ($24.6K GMV) and Shopify but zero Amazon presence. Home & Kitchen category has high demand on Amazon.', impact: 'Est. +$8K/mo', impactColor: '#10b981', cta: 'Expand Channel', targetTab: 4 },
      { priority: 'medium', title: 'Generate more video content', reason: 'Only 2 video assets. Recipe/smoothie videos are top-performing content type for this category.', impact: 'Content gap', impactColor: '#f59e0b', cta: 'Generate Videos', targetTab: 2 },
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
    flywheel: { listings: 'active', content: 'needs-attention', creators: 'needs-attention', insights: 'needs-attention' },
    recommendedActions: [
      { priority: 'high', title: 'Expand to TikTok and Shopify', reason: 'Amazon-only presence with zero creators — invisible to discovery channels. Kitchen items trend well on TikTok.', impact: 'New channels', impactColor: '#10b981', cta: 'Expand Channel', targetTab: 4 },
      { priority: 'high', title: 'Recruit kitchen creators', reason: 'Zero creator coverage. 5 Home & Kitchen creators on your account could promote immediately.', impact: 'Est. +$5K/mo', impactColor: '#10b981', cta: 'Find Creators', targetTab: 3 },
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
    flywheel: { listings: 'active', content: 'active', creators: 'active', insights: 'active' },
    recommendedActions: [
      { priority: 'medium', title: 'Bundle with Hydrating Serum for skincare routine', reason: '5 creators already promoting Cream also post Beauty content — bundle could lift AOV significantly.', impact: 'Est. +$4K AOV lift', impactColor: '#10b981', cta: 'Plan Campaign', targetTab: 3 },
      { priority: 'medium', title: 'Recruit 5 more Beauty creators', reason: 'Conversion already at 4.2% vs category avg 4.1%. Doubling creator count to 10 could push to 5%+.', impact: 'Est. +$6K/mo', impactColor: '#10b981', cta: 'Find Creators', targetTab: 3 },
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
    flywheel: { listings: 'needs-attention', content: 'needs-attention', creators: 'needs-attention', insights: 'needs-attention' },
    recommendedActions: [
      { priority: 'high', title: 'Launch TikTok Shop listing', reason: 'New SKU with Shopify+Amazon only — adding TikTok could 2-3x monthly GMV based on Earbuds benchmark.', impact: 'Est. 2-3x GMV', impactColor: '#10b981', cta: 'Expand Channel', targetTab: 4 },
      { priority: 'medium', title: 'Cross-promote with Earbuds creators', reason: 'Electronics buyers overlap 55% between Headphones and Earbuds. Existing creators could promote with minimal extra cost.', impact: 'Est. +$4K/mo', impactColor: '#10b981', cta: 'Find Creators', targetTab: 3 },
    ],
  },
];

// --- Creators ---
// platforms: where the creator posts content (their social channels)
// channelGmv: GMV they drive on each of YOUR sales channels
export const creators = [
  { id: 'CR-001', name: 'Sarah Chen',    handle: '@sarahreviews',   avatarColor: '#ec4899', followers: 285000, platforms: ['tiktok', 'instagram'],          contentCount: 24, conversionRate: 5.2, niche: 'Beauty & Skincare', status: 'active',  channelGmv: { tiktok: 12800, shopify: 4200, amazon: 1400 }, bio: 'Skincare enthusiast sharing honest product reviews and routines. Focuses on K-beauty and clean ingredients.', avgViews: 42000, engagementRate: 4.8, tags: { style: ['Clean Girl', 'Tutorial', 'GRWM'], categories: ['Skincare', 'Beauty', 'K-Beauty'], demographics: ['Women 18-34', 'US & Canada', 'Mid-Income'], contentType: ['Reviews', 'Routines', 'Tutorials'] } },
  { id: 'CR-002', name: 'Mike Johnson',  handle: '@techmikeJ',      avatarColor: '#3b82f6', followers: 520000, platforms: ['tiktok', 'youtube'],             contentCount: 18, conversionRate: 4.8, niche: 'Tech Reviews',     status: 'active',  channelGmv: { tiktok: 18600, shopify: 8300, amazon: 5200 }, bio: 'Deep-dive tech reviewer known for honest comparisons and durability tests. Strong male 25-44 audience.', avgViews: 85000, engagementRate: 3.6, tags: { style: ['Comparison', 'Durability Test', 'Unboxing'], categories: ['Electronics', 'Wearables', 'Audio'], demographics: ['Men 25-44', 'US', 'Tech-Savvy'], contentType: ['Reviews', 'Comparisons', 'Long-form'] } },
  { id: 'CR-003', name: 'Luna Park',     handle: '@lunalifestyle',  avatarColor: '#8b5cf6', followers: 178000, platforms: ['tiktok', 'instagram', 'youtube'], contentCount: 31, conversionRate: 6.1, niche: 'Lifestyle',        status: 'active',  channelGmv: { tiktok: 9400,  shopify: 3600, amazon: 1200 }, bio: 'Multi-category lifestyle creator blending fashion, home, and wellness. Cross-platform with strong IG presence.', avgViews: 31000, engagementRate: 5.2, tags: { style: ['Aesthetic', 'Day-in-Life', 'Haul'], categories: ['Lifestyle', 'Home', 'Wellness'], demographics: ['Women 22-38', 'Urban', 'Mid-High Income'], contentType: ['Vlogs', 'Hauls', 'Flat Lays'] } },
  { id: 'CR-004', name: 'David Kim',     handle: '@davidkfitness',  avatarColor: '#10b981', followers: 412000, platforms: ['tiktok', 'instagram'],          contentCount: 15, conversionRate: 4.5, niche: 'Fitness',          status: 'active',  channelGmv: { tiktok: 14200, shopify: 5800, amazon: 2800 }, bio: 'Certified personal trainer creating workout content. Known for "budget gym equipment" series.', avgViews: 67000, engagementRate: 4.1, tags: { style: ['Workout', 'Equipment Review', 'Motivational'], categories: ['Fitness', 'Home Gym', 'Nutrition'], demographics: ['Men 20-35', 'US & UK', 'Health-Conscious'], contentType: ['Workouts', 'Reviews', 'Tutorials'] } },
  { id: 'CR-005', name: 'Emma Wilson',   handle: '@emmawilson',     avatarColor: '#f59e0b', followers: 89000,  platforms: ['tiktok'],                        contentCount: 42, conversionRate: 7.3, niche: 'Home & Kitchen',   status: 'active',  channelGmv: { tiktok: 6100,  shopify: 1900, amazon: 900  }, bio: 'Home & kitchen creator specializing in small-space solutions and affordable finds. High content volume.', avgViews: 18000, engagementRate: 6.4, tags: { style: ['Organization', 'Unboxing', 'Life Hack'], categories: ['Home', 'Kitchen', 'Organization'], demographics: ['Women 25-45', 'US', 'Budget-Conscious'], contentType: ['Hauls', 'Hacks', 'Unboxing'] } },
  { id: 'CR-006', name: 'Alex Rivera',   handle: '@alexunboxes',    avatarColor: '#ef4444', followers: 340000, platforms: ['tiktok', 'youtube'],             contentCount: 22, conversionRate: 5.0, niche: 'Unboxing',         status: 'active',  channelGmv: { tiktok: 16200, shopify: 7400, amazon: 4900 }, bio: 'High-energy unboxing and first-impression creator. Covers tech, gadgets, and trending products.', avgViews: 58000, engagementRate: 3.9, tags: { style: ['Unboxing', 'First Impression', 'Hype'], categories: ['Tech', 'Gadgets', 'Trending'], demographics: ['Men 18-30', 'US & LATAM', 'Early Adopters'], contentType: ['Unboxing', 'First Looks', 'Shorts'] } },
  { id: 'CR-007', name: 'Zoe Zhang',     handle: '@zoezbeauty',     avatarColor: '#ec4899', followers: 156000, platforms: ['tiktok', 'instagram'],          contentCount: 28, conversionRate: 5.8, niche: 'Beauty',           status: 'active',  channelGmv: { tiktok: 8200,  shopify: 2600, amazon: 800  }, bio: 'Beauty and skincare creator focusing on drugstore dupes and Asian beauty. Bilingual Eng/Mandarin.', avgViews: 28000, engagementRate: 5.5, tags: { style: ['Dupes', 'Tutorial', 'Minimal'], categories: ['Beauty', 'Skincare', 'Makeup'], demographics: ['Women 18-30', 'US & Asia', 'Budget-Beauty'], contentType: ['Tutorials', 'Dupes', 'Reviews'] } },
  { id: 'CR-008', name: 'Chris Taylor',  handle: '@christech',      avatarColor: '#6366f1', followers: 680000, platforms: ['youtube', 'tiktok'],            contentCount: 12, conversionRate: 3.9, niche: 'Tech',             status: 'active',  channelGmv: { tiktok: 19800, shopify: 12400, amazon: 9000 }, bio: 'In-depth tech YouTuber with the largest following in the network. Known for production quality.', avgViews: 120000, engagementRate: 2.8, tags: { style: ['Cinematic', 'In-Depth', 'Benchmark'], categories: ['Electronics', 'Smart Home', 'Audio'], demographics: ['Men 25-44', 'Global', 'High-Income Tech'], contentType: ['Reviews', 'Benchmarks', 'Long-form'] } },
  { id: 'CR-009', name: 'Maya Patel',    handle: '@mayacooks',      avatarColor: '#14b8a6', followers: 234000, platforms: ['tiktok', 'instagram'],          contentCount: 35, conversionRate: 5.5, niche: 'Cooking',          status: 'active',  channelGmv: { tiktok: 10200, shopify: 3800, amazon: 1800 }, bio: 'Recipe creator blending Indian and Western cuisines. Strong engagement with cooking appliance content.', avgViews: 38000, engagementRate: 5.1, tags: { style: ['Recipe', 'Quick Meals', 'Cultural Fusion'], categories: ['Cooking', 'Kitchen', 'Food'], demographics: ['Women 25-40', 'US & South Asia', 'Foodies'], contentType: ['Recipes', 'Appliance Reviews', 'Shorts'] } },
  { id: 'CR-010', name: 'Jake Morris',   handle: '@jakeoutdoors',   avatarColor: '#22c55e', followers: 198000, platforms: ['youtube', 'instagram'],         contentCount: 19, conversionRate: 4.2, niche: 'Outdoor',          status: 'paused', channelGmv: { tiktok: 0,     shopify: 5600, amazon: 3600 }, bio: 'Outdoor and adventure creator. Currently paused due to seasonal content planning.', avgViews: 35000, engagementRate: 3.8, tags: { style: ['Adventure', 'Gear Review', 'Nature'], categories: ['Outdoor', 'Fitness', 'Travel'], demographics: ['Men 25-40', 'US & Canada', 'Active Lifestyle'], contentType: ['Gear Reviews', 'Vlogs', 'Tutorials'] } },
  { id: 'CR-011', name: 'Ashley Lee',    handle: '@ashleyskincare', avatarColor: '#f472b6', followers: 310000, platforms: ['tiktok', 'instagram', 'youtube'], contentCount: 26, conversionRate: 5.9, niche: 'Skincare',         status: 'active',  channelGmv: { tiktok: 13400, shopify: 4800, amazon: 1500 }, bio: 'Dermatologist-recommended skincare creator. Clinical approach to beauty with ingredient deep-dives.', avgViews: 52000, engagementRate: 4.7, tags: { style: ['Clinical', 'Ingredient Analysis', 'Before/After'], categories: ['Skincare', 'Beauty', 'Wellness'], demographics: ['Women 25-40', 'US', 'Science-Driven'], contentType: ['Reviews', 'Ingredient Dives', 'Routines'] } },
  { id: 'CR-012', name: 'Ryan Gomez',    handle: '@ryanfit',        avatarColor: '#84cc16', followers: 145000, platforms: ['tiktok', 'instagram'],          contentCount: 20, conversionRate: 4.6, niche: 'Fitness',          status: 'active',  channelGmv: { tiktok: 5200,  shopify: 1800, amazon: 800  }, bio: 'Budget fitness creator focused on home workouts with minimal equipment. College audience.', avgViews: 22000, engagementRate: 4.3, tags: { style: ['Budget', 'Home Workout', 'Beginner-Friendly'], categories: ['Fitness', 'Budget Gear', 'Health'], demographics: ['Men 18-28', 'US', 'Students'], contentType: ['Workouts', 'Reviews', 'Shorts'] } },
  { id: 'CR-013', name: 'Nina Olsen',    handle: '@ninashops',      avatarColor: '#a855f7', followers: 92000,  platforms: ['tiktok'],                        contentCount: 38, conversionRate: 6.8, niche: 'Shopping Hauls',   status: 'active',  channelGmv: { tiktok: 5400,  shopify: 600,  amazon: 200  }, bio: 'TikTok-native shopping haul creator. High volume, fast turnaround. Best conversion rate in network.', avgViews: 15000, engagementRate: 7.1, tags: { style: ['Haul', 'TikTok Native', 'Impulse Buy'], categories: ['Shopping', 'Trending', 'Deals'], demographics: ['Women 18-28', 'US', 'Impulse Shoppers'], contentType: ['Hauls', 'Trending', 'TikTok Shop'] } },
  { id: 'CR-014', name: 'Tom Nguyen',    handle: '@tomtechlife',    avatarColor: '#0ea5e9', followers: 267000, platforms: ['youtube', 'tiktok'],            contentCount: 16, conversionRate: 4.1, niche: 'Tech Lifestyle',   status: 'active',  channelGmv: { tiktok: 9800,  shopify: 4600, amazon: 2900 }, bio: 'Tech lifestyle creator bridging gadgets and everyday life. Desk setup and WFH content.', avgViews: 44000, engagementRate: 3.7, tags: { style: ['Desk Setup', 'Productivity', 'Aesthetic Tech'], categories: ['Tech', 'Home Office', 'Lifestyle'], demographics: ['Men 22-35', 'US', 'Remote Workers'], contentType: ['Setups', 'Reviews', 'Vlogs'] } },
  { id: 'CR-015', name: 'Bella Romano',  handle: '@bellahome',      avatarColor: '#d946ef', followers: 128000, platforms: ['instagram', 'tiktok'],          contentCount: 33, conversionRate: 5.4, niche: 'Home Decor',       status: 'active',  channelGmv: { tiktok: 5800,  shopify: 3200, amazon: 1400 }, bio: 'Home decor and DIY creator. Strong Pinterest cross-posting drives Shopify traffic.', avgViews: 21000, engagementRate: 5.0, tags: { style: ['DIY', 'Room Makeover', 'Cozy Aesthetic'], categories: ['Home Decor', 'DIY', 'Organization'], demographics: ['Women 25-40', 'US', 'Homeowners'], contentType: ['Makeovers', 'Hauls', 'DIY Tutorials'] } },
  { id: 'CR-016', name: 'Jason Park',    handle: '@jasonpetlife',   avatarColor: '#f97316', followers: 205000, platforms: ['tiktok', 'instagram'],          contentCount: 21, conversionRate: 5.7, niche: 'Pets',             status: 'active',  channelGmv: { tiktok: 9200,  shopify: 2800, amazon: 1600 }, bio: 'Pet lifestyle creator with 3 cats and 2 dogs. Authentic content drives high purchase intent.', avgViews: 36000, engagementRate: 5.3, tags: { style: ['Pet Life', 'Product Test', 'Cute Content'], categories: ['Pets', 'Pet Supplies', 'Lifestyle'], demographics: ['All Genders 20-40', 'US', 'Pet Owners'], contentType: ['Product Tests', 'Day-in-Life', 'Cute Clips'] } },
  { id: 'CR-017', name: 'Lily Wang',     handle: '@lilybeautylab',  avatarColor: '#e11d48', followers: 445000, platforms: ['tiktok', 'instagram', 'youtube'], contentCount: 29, conversionRate: 4.3, niche: 'Beauty',           status: 'active',  channelGmv: { tiktok: 16800, shopify: 5800, amazon: 2800 }, bio: 'Premium beauty creator with luxury brand partnerships. Strong cross-platform presence.', avgViews: 72000, engagementRate: 3.4, tags: { style: ['Luxury', 'Editorial', 'Comparison'], categories: ['Beauty', 'Luxury', 'Skincare'], demographics: ['Women 25-40', 'Global', 'High-Income'], contentType: ['Reviews', 'Comparisons', 'Editorial'] } },
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
      { phase: 'Listings', name: 'Generate product images & copy with AI', status: 'auto', runState: 'done' },
      { phase: 'Listings', name: 'Create creator brief & outreach template', status: 'auto', runState: 'done' },
      { phase: 'Content', name: 'Publish listings to selected channels', status: 'auto', runState: 'active' },
      { phase: 'Creators', name: 'Match & invite relevant creators', status: 'semi-auto', runState: 'pending' },
      { phase: 'Insights', name: 'Set up performance tracking & alerts', status: 'auto', runState: 'pending' },
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
      { phase: 'Insights', name: 'Analyze performance gaps vs category benchmarks', status: 'auto' },
      { phase: 'Listings', name: 'Regenerate underperforming content assets', status: 'auto' },
      { phase: 'Content', name: 'Update listings with optimized content', status: 'semi-auto' },
      { phase: 'Creators', name: 'Recruit high-converting creators in category', status: 'semi-auto' },
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
      { phase: 'Content', name: 'Adapt content for new channel requirements', status: 'auto' },
      { phase: 'Creators', name: 'Scale creator partnerships based on performance data', status: 'semi-auto' },
      { phase: 'Insights', name: 'Monitor cross-channel cannibalization', status: 'auto' },
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
      { phase: 'Insights', name: 'Identify top SKUs with highest sale potential', status: 'auto' },
      { phase: 'Listings', name: 'Generate sale-specific creative assets', status: 'auto' },
      { phase: 'Listings', name: 'Create event-specific creator briefs', status: 'auto' },
      { phase: 'Content', name: 'Schedule listing updates with sale pricing', status: 'semi-auto' },
      { phase: 'Creators', name: 'Coordinate creator posting schedule', status: 'manual' },
      { phase: 'Insights', name: 'Set up real-time sale performance dashboard', status: 'auto' },
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
      { phase: 'Insights', name: 'AI recommends best-fit creators based on product & audience', status: 'auto' },
      { phase: 'Listings', name: 'Generate personalized creator briefs with product samples', status: 'auto' },
      { phase: 'Creators', name: 'Send outreach & track responses', status: 'semi-auto' },
      { phase: 'Insights', name: 'Monitor content creation & early performance signals', status: 'auto' },
    ],
  },
];

// --- Copilot Conversations ---
export const copilotConversations = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Hi! I'm your Feed Copilot. I can help you launch products, optimize listings, find creators, and grow your sales across channels. What would you like to work on?",
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

// Compute total gmvAttributed from channelGmv
creators.forEach((c) => {
  c.gmvAttributed = Object.values(c.channelGmv).reduce((s, v) => s + v, 0);
});

// Creator platform metadata
export const creatorPlatforms = {
  tiktok:    { label: 'TikTok',     color: '#010101', bg: 'rgba(1,1,1,0.07)'       },
  instagram: { label: 'Instagram',  color: '#e1306c', bg: 'rgba(225,48,108,0.09)'  },
  youtube:   { label: 'YouTube',    color: '#ff0000', bg: 'rgba(255,0,0,0.08)'     },
};

// --- Dashboard Impact Hero ---
export const dashboardImpact = {
  gmv: { value: 128450, change: 18.2 },
  savings: { value: 4800, description: 'this month by using AIGC for long-tail content' },
  actions: { total: 4, urgent: 2, recommended: 2 },
};

// --- Dashboard Action Items ---
export const dashboardActions = [
  {
    id: 'ACT-001',
    severity: 'urgent',
    severityColor: '#ef4444',
    title: '3 SKUs declining — Yoga Mat, LED Lamp, and Bamboo Board need attention',
    description: 'Premium Yoga Mat (-10.8%), LED Desk Lamp Pro (-9.2%), and Bamboo Cutting Board (-6.7%) are all declining. Listing scores and creator coverage are below category averages.',
    impact: '$12K+ GMV at risk',
    impactColor: '#ef4444',
    cta: 'Diagnose & Fix',
    path: '/products',
  },
  {
    id: 'ACT-002',
    severity: 'urgent',
    severityColor: '#ef4444',
    title: 'Creator video went viral — Shopify listing missing the winning hook',
    description: '@petloversarah\'s TikTok video (450K views) for Interactive Pet Toy highlights "automatic laser pattern" — but your Shopify PDP title and hero image don\'t mention it.',
    impact: 'Est. +18% Shopify conversion',
    impactColor: '#10b981',
    cta: 'Update Listing',
    path: '/products/SKU-0537',
  },
  {
    id: 'ACT-003',
    severity: 'warning',
    severityColor: '#f59e0b',
    title: 'Content mix imbalance on 3 SKUs — over-reliant on creators',
    description: 'Earbuds Pro, Hydrating Serum, and Smart Watch are 70%+ creator-dependent, but AIGC content converts at 4x better cost efficiency.',
    impact: 'Save ~$4.8K/mo',
    impactColor: '#10b981',
    cta: 'Optimize Mix',
    path: '/products/SKU-0042',
  },
  {
    id: 'ACT-004',
    severity: 'ready',
    severityColor: '#10b981',
    title: 'Resistance Bands cold start complete — ready for creators',
    description: 'AIGC content validated "travel-friendly" as the #1 converting hook (2.1x above other angles). 8 matched creators are ready for outreach.',
    impact: 'Est. +$8K GMV/mo',
    impactColor: '#10b981',
    cta: 'Find Creators',
    path: '/products/SKU-0755',
  },
];

// --- Dashboard Growth Opportunities ---
export const dashboardOpportunities = [
  {
    id: 'OPP-001',
    title: 'Sync TikTok creator content to Shopify listings',
    description: '8 SKUs have high-performing TikTok creator content that hasn\'t been reflected in Shopify PDPs. AI can rewrite listings using creator-validated messaging.',
    impact: '+15-22% conv.',
    cta: 'Sync Now',
    path: '/products',
  },
  {
    id: 'OPP-002',
    title: 'Scale creator recruitment for Pet Toy',
    description: 'Content engagement is 3.2x above category average on TikTok — prime candidate for scaling creator partnerships.',
    impact: '+$8K/mo',
    cta: 'Find Creators',
    path: '/products/SKU-0537',
  },
  {
    id: 'OPP-003',
    title: 'Expand 4 SKUs to TikTok Shop',
    description: 'These SKUs perform well on Shopify but have zero TikTok presence. Category data suggests strong TikTok demand.',
    impact: 'New channel',
    cta: 'Expand',
    path: '/products',
  },
];

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
