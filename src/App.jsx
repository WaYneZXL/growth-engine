import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ActionQueueProvider } from './context/ActionQueueContext';
import Layout from './components/layout/Layout';
import ActionQueue from './pages/ActionQueue';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ContentHub from './pages/ContentHub';
import CreatorNetwork from './pages/CreatorNetwork';
import CreatorDetail from './pages/CreatorDetail';
import Workflows from './pages/Workflows';
import WorkflowTasks from './pages/WorkflowTasks';

export default function App() {
  return (
    <BrowserRouter>
      <ActionQueueProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ActionQueue />} />
            <Route path="overview" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="content" element={<ContentHub />} />
            <Route path="creators" element={<CreatorNetwork />} />
            <Route path="creators/:id" element={<CreatorDetail />} />
            <Route path="workflows" element={<Workflows />} />
            <Route path="workflows/tasks" element={<WorkflowTasks />} />
            <Route path="settings" element={<div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>Settings</div>} />
          </Route>
        </Routes>
      </ActionQueueProvider>
    </BrowserRouter>
  );
}
