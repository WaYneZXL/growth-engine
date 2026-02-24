# Growth Engine — by AfterShip

A high-fidelity interactive prototype for **Growth Engine** — an SKU-centric channel growth platform for cross-channel e-commerce sellers.

Built to demo the product vision internally. All data is mocked; no backend required.

---

## What it is

Growth Engine consolidates three capabilities into a single, SKU-first workspace:

| Capability | What it does |
|---|---|
| **Listing Management** | Manage and optimize product listings across TikTok Shop, Shopify, and Amazon |
| **Creator / Affiliate Marketing** | Recruit creators, track affiliate-driven GMV per channel, manage partnerships |
| **AIGC** | AI-generated product images, listing copy, video briefs, and creator outreach |

The core philosophy: organize by **seller intent** ("launch a product", "fix a declining SKU"), not by tool category.

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | GMV overview, attribution donut, 12-week trend, top SKUs, AI insights |
| `/products` | Products | SKU list with search/filter, grid and list view |
| `/products/:id` | Product Detail | 4-tab deep dive: Growth Flywheel, Digital Assets, Creator & Affiliate, Channel Performance |
| `/content` | Digital Assets | Visual content library (images + videos) across all SKUs |
| `/creators` | Creator Network | Sortable table of creators with platform presence and per-channel GMV |
| `/workflows` | Growth Recommendations | Playbook cards with expandable step-by-step automation details |
| `/copilot` | AI Copilot | Full-page chat interface with mock AI responses and action cards |
| `/settings` | Settings | Settings stubs |

A slide-out **Copilot panel** is accessible from the top bar on any page.

---

## Tech stack

- **React 19** + **Vite 7**
- **React Router v7** — client-side routing
- **Recharts** — line chart, bar chart, radar chart, donut chart
- **Lucide React** — icons
- **Tailwind CSS v4** — utility layout; custom design tokens via CSS variables
- All data in `src/data/mockData.js` — no backend, no API calls

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

Requires Node 18+.

---

## Project structure

```
src/
├── components/
│   ├── layout/          # Sidebar, TopBar, Layout, CopilotPanel
│   └── shared/          # MetricCard, ChannelBadge, ProductImage, ListingScoreRing
├── data/
│   └── mockData.js      # All mock data (SKUs, creators, content, workflows, etc.)
├── pages/
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── ContentHub.jsx   # "Digital Assets" page
│   ├── CreatorNetwork.jsx
│   ├── Workflows.jsx    # "Growth Recommendations" page
│   ├── AICopilot.jsx
│   └── Settings.jsx
├── App.jsx
├── main.jsx
└── index.css            # Design tokens + global styles
```

---

## Mock data overview

- **12 SKUs** across Electronics, Beauty, Fitness, Home & Kitchen, Pets
- **3 sales channels**: TikTok Shop, Shopify, Amazon
- **17 creators** with multi-platform presence (TikTok, Instagram, YouTube) and per-channel GMV attribution
- **24 content assets** (images, videos, copy, briefs)
- **5 workflow playbooks**
- GMV range: ~$4k–$52k/SKU/month

---

## Design decisions

- **Collapsible sidebar** — toggle between full (240px) and icon-only (56px) mode
- **CSS variables for theming** — all colors defined in `:root`, not dependent on Tailwind resolving custom tokens
- **Inline styles + utility classes** — consistent rendering regardless of Tailwind v4 JIT behavior
- **No auth, no dark mode, no mobile** — desktop-first demo prototype
