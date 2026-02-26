import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ContentHub from './pages/ContentHub';
import CreatorNetwork from './pages/CreatorNetwork';
import CreatorDetail from './pages/CreatorDetail';
import Workflows from './pages/Workflows';
import WorkflowTasks from './pages/WorkflowTasks';
import AICopilot from './pages/AICopilot';
import ExistingFeedPage from './pages/ExistingFeedPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Growth Engine pages (NEW) */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="content" element={<ContentHub />} />
          <Route path="creators" element={<CreatorNetwork />} />
          <Route path="creators/:id" element={<CreatorDetail />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="workflows/tasks" element={<WorkflowTasks />} />
          <Route path="copilot" element={<AICopilot />} />

          {/* Store Management (existing Feed) */}
          <Route path="store/shopify" element={<ExistingFeedPage title="Shopify Products" description="Products imported from Shopify. Map them to sales channel categories, choose stores to list them on, and sync to your sales channels." />} />
          <Route path="store/consolidated" element={<ExistingFeedPage title="Consolidated Listings" description="Manage consolidated product listings across multiple sales channels from a single view." />} />
          <Route path="store/bundles" element={<ExistingFeedPage title="Bundles" description="Create and manage product bundles for sales channels." />} />
          <Route path="channel-listings" element={<ExistingFeedPage title="Channel Listings" description="Per-channel listing management. Edit listing details, manage sync status, handle publishing and activation for each sales channel." />} />
          <Route path="category-templates" element={<ExistingFeedPage title="Category Templates" description="Pre-configured category mappings and attribute templates for faster product listing across channels." />} />
          <Route path="orders" element={<ExistingFeedPage title="Orders" description="Order syncing between eCommerce platform and sales channels. Track order status, fulfillment sync, and handle sync failures." />} />
          <Route path="reviews" element={<ExistingFeedPage title="Reviews" description="Product review management and syndication across channels." />} />

          {/* Affiliates (existing Feed) */}
          <Route path="affiliates/find" element={<ExistingFeedPage title="Find Creators" description="Search and discover creators using AI-powered Magic Search and Lookalike tools." />} />
          <Route path="affiliates/magic-search" element={<ExistingFeedPage title="Magic Search" description="Leverage AI and TikTok Shop data to find the right creators for your brand. Natural language search with filters." />} />
          <Route path="affiliates/lookalike" element={<ExistingFeedPage title="Lookalike" description="Find creators with a similar audience, style, and sales performance to your ideal partners." />} />
          <Route path="affiliates/outreach" element={<ExistingFeedPage title="Creator Outreach" description="Manage creator communication, send collaboration invitations, and track outreach campaigns." />} />

          {/* Settings (existing Feed) */}
          <Route path="settings" element={<ExistingFeedPage title="Settings" description="Product sync settings, pricing rules, inventory thresholds, fulfillment configuration, and account management." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
