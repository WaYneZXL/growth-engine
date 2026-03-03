# Growth Engine

## Project Overview

SKU-centric channel growth platform for cross-channel e-commerce sellers (AfterShip). AI-native design where the primary interaction loop is "AI prepares decisions → human reviews & approves/rejects." All data is mocked — no backend or API calls.

## Tech Stack

- **React 19** + **Vite 7** (ES modules)
- **React Router v7** for routing
- **React Context** (`ActionQueueContext`) for shared action-queue state
- **Recharts** for charts/graphs
- **Lucide React** for icons
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, imported as `@import "tailwindcss"` in index.css)

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build

## Architecture

### File Structure

```
src/
├── App.jsx                    # Router setup, wraps everything in ActionQueueProvider
├── main.jsx                   # React entry point
├── index.css                  # Design tokens + global styles
├── components/
│   ├── layout/
│   │   ├── Layout.jsx         # 3-column grid (sidebar 60px + main + RightPanel 340px)
│   │   ├── Sidebar.jsx        # Left nav (60px, icon-only with tooltips)
│   │   ├── TopBar.jsx         # Header with breadcrumb + search
│   │   └── RightPanel.jsx     # AI agent sidebar (340px, route-aware, two modes)
│   └── shared/
│       ├── MetricCard.jsx     # Reusable metric with trend
│       ├── ChannelBadge.jsx   # Channel pill badge
│       ├── ListingScoreRing.jsx # SVG circular progress
│       ├── ProductImage.jsx   # Product image with fallback
│       ├── ActionCard.jsx     # AI action card (apply/edit/skip), full or compact variant
│       └── SkipFeedback.jsx   # Skip reason popover
├── context/
│   └── ActionQueueContext.jsx # Shared action-queue state (Provider + useActionQueue hook)
├── pages/
│   ├── ActionQueue.jsx        # Default landing page (/)
│   ├── Dashboard.jsx          # Overview page (/overview)
│   ├── Products.jsx           # Product portfolio (/products)
│   ├── ProductDetail.jsx      # Product detail (/products/:id)
│   ├── ContentHub.jsx         # Digital assets (/content)
│   ├── CreatorNetwork.jsx     # Creator partnerships (/creators)
│   ├── CreatorDetail.jsx      # Creator detail (/creators/:id)
│   ├── Workflows.jsx          # Workflow definitions (/workflows)
│   └── WorkflowTasks.jsx      # Task execution (/workflows/tasks)
└── data/
    └── mockData.js            # All mock data + helper functions
```

### Routing

```
/                → ActionQueue (primary AI-native surface)
/overview        → Dashboard (traditional overview)
/products        → Products
/products/:id    → ProductDetail
/content         → ContentHub
/creators        → CreatorNetwork
/creators/:id    → CreatorDetail
/workflows       → Workflows
/workflows/tasks → WorkflowTasks
/settings        → Settings (placeholder)
```

### Layout

All pages use the same 3-column grid: sidebar (60px) + main content + RightPanel (340px).

- Layout.jsx renders `<RightPanel>` on every route.
- On ActionQueue (`/`), RightPanel receives `mode="summary"` — shows aggregate stats, resolved actions, and learning cards.
- On all other pages, RightPanel receives `mode="contextual"` — shows a route-specific briefing card plus pending actions filtered to that route.

### State Management

The app uses **ActionQueueContext** for shared action-queue state:

- `ActionQueueProvider` wraps the entire app in `App.jsx`.
- Provides: `actions` (array), `handleApply(id)`, `handleSkip(id, reason)`, `handleUndo(id)`.
- State is initialized from `actionQueue` in mockData.js.
- Both the ActionQueue page and the RightPanel consume `useActionQueue()` — applying/skipping/undoing an action in one place updates it everywhere.
- Local component state (`useState`) is still used for UI concerns (expanded/collapsed, input fields, etc.).

## Data Layer

All data lives in `src/data/mockData.js`.

### Key Exports

| Export | Description |
|---|---|
| `products` | Array of ~12 SKUs with channel data, listing scores, optimizations |
| `creators` | Array of ~17 creators with performance data |
| `productCreators` | SKU-to-creator mapping object |
| `actionQueue` | Array of 8 AI-generated action items (see shape below) |
| `briefings` | Object keyed by route path — contextual briefing content for RightPanel |
| `contentAssets` | Array of content assets |
| `workflows` | Array of workflow definitions |
| `workflowTasks` | Array of workflow task executions |
| `gmvWeeklyTrend` | Weekly GMV trend data for charts |
| `dashboardImpact` | Dashboard impact summary stats |
| `dashboardActions` | Dashboard action summary items |
| `dashboardOpportunities` | Dashboard opportunity cards |
| `copilotConversations` | Mock AI conversation starters |
| `copilotQuickPrompts` | Mock quick-prompt chips |
| `competitorBenchmarks` | Competitor comparison data |
| `creatorPlatforms` | Platform breakdown data |

### Action Queue Item Shape

```js
{
  id: 'AQ-001',
  priority: 'critical' | 'high' | 'medium' | 'low',
  category: 'revenue-risk' | 'optimization' | 'growth' | 'learning',
  impactValue: 3200,
  impactLabel: 'Est. -$3,200/mo',
  sku: 'SKU-0863',
  skuName: 'Portable Blender',
  channel: 'tiktok' | 'shopify' | 'amazon',
  title: '...',
  subtitle: '...',
  reasoning: ['step 1', 'step 2', ...],
  recommendation: { description, before, after },
  actions: [{ label, type }],
  context: ['products', 'overview'],   // which route keys this action appears on
  createdAt: '2 hours ago',
  status: 'pending' | 'resolved' | 'skipped',
}
```

The `context` array controls where the action appears in the RightPanel's contextual mode. Route keys: `overview`, `products`, `content`, `creators`, `workflows`.

### Briefings

`briefings` is an object keyed by route path (`'/overview'`, `'/products'`, `'/content'`, `'/creators'`, `'/workflows'`, `'/products/:id'`). Each value has `{ title, body, action }` and is displayed as a card at the top of the RightPanel in contextual mode.

### Helper Functions

- `formatCurrency(value)` — Formats numbers as `$1.2k`, `$450`, etc.
- `formatNumber(value)` — Formats as `1.2M`, `3.5k`, etc.
- `getChannelColor(channelId)` — Returns hex color for channel
- `getChannelName(channelId)` — Returns display name for channel

## Key Data Flow

1. `ActionQueueProvider` (in App.jsx) initializes `actions` state from `actionQueue` mock data.
2. **ActionQueue page** (`/`) renders each pending action using `<ActionCard variant="full">` with full reasoning, before/after preview, and edit capability.
3. **RightPanel** on other pages uses `<ActionCard variant="compact">` for actions whose `context` array includes the current route key (determined by `getRouteKey()` in RightPanel.jsx).
4. **Apply/skip/undo** from any surface calls the shared context handlers → state updates → all consumers re-render with new status.
5. **RightPanel route mapping**: `getRouteKey(path)` maps the current pathname to a route key (`overview`, `products`, `content`, `creators`, `workflows`). Actions are filtered by `action.context.includes(routeKey)`.

## Conventions

### Component Patterns

- Functional components with hooks only (no class components)
- No TypeScript — plain JSX
- No prop-types
- Navigation via `useNavigate()` from react-router-dom
- Icons from `lucide-react` — import individually
- `ActionCard` accepts `variant="full"` (default, used on ActionQueue page) or `variant="compact"` (used in RightPanel)
- `RightPanel` accepts `mode="summary"` (ActionQueue route) or `mode="contextual"` (all other routes)

### Styling

- **Inline styles** are the primary styling method (consistent throughout codebase)
- **CSS variables** defined in `:root` in `index.css` — always use these for colors:
  - `var(--brand)` (#f06b25) — primary orange
  - `var(--ai)` / `var(--ai-light)` — AI purple (#7c5cfc / #9f85ff)
  - `var(--success)` / `var(--warning)` / `var(--danger)` — semantic colors
  - `var(--text-1)` / `var(--text-2)` / `var(--text-3)` — text hierarchy
  - `var(--surface)` / `var(--surface-2)` — backgrounds
  - `var(--border)` — borders
- **CSS classes** in `index.css` for reusable patterns: `.card`, `.btn`, `.btn-primary`, `.badge`, `.data-table`, `.metric-grid`
- Tailwind utilities used sparingly alongside inline styles
- Border radius: 12px for cards, 8px for buttons/inputs, 10px for nav items
- Font sizes: 11px (labels), 12-13px (body), 14-16px (headings)

### Priority Colors

- Critical: `var(--danger)` (#ef4444)
- High: `var(--brand)` (#f06b25)
- Medium: `var(--warning)` (#f59e0b)
- Low: `var(--ai)` (#7c5cfc)

### Channel Colors

- TikTok: #ff0050
- Shopify: #96bf48
- Amazon: #ff9900

## Adding New Features

### Adding a new page

1. Create the page component in `src/pages/NewPage.jsx`
2. Add a `<Route>` in `src/App.jsx` inside the `<Route path="/" element={<Layout />}>` parent
3. Add a nav item in `src/components/layout/Sidebar.jsx` — add to `navItems` or `bottomItems` array with `{ path, icon, label }`
4. Add a briefing entry in `briefings` (in mockData.js) keyed by the route path

### Adding a new action

1. Add an entry to `actionQueue` in `src/data/mockData.js` following the item shape above
2. Set the `context` array to the route keys where this action should appear in the RightPanel
3. The action will automatically appear on the ActionQueue page and in the RightPanel for matching routes

### Adding a new route to RightPanel

1. Add a briefing to `briefings` in mockData.js keyed by the route path (e.g., `'/newpage'`)
2. Add the route key mapping in `getRouteKey()` in `src/components/layout/RightPanel.jsx`
3. Set `context` arrays on relevant actions to include the new route key

## Important Notes

- **No new npm dependencies** — use only what's in package.json
- **No backend/API calls** — all data is mocked
- **No TypeScript** — plain JavaScript/JSX
- Existing pages (Products, ProductDetail, ContentHub, CreatorNetwork, etc.) should not be modified unless specifically requested
