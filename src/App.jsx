import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ContentHub from './pages/ContentHub';
import CreatorNetwork from './pages/CreatorNetwork';
import Workflows from './pages/Workflows';
import AICopilot from './pages/AICopilot';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="content" element={<ContentHub />} />
          <Route path="creators" element={<CreatorNetwork />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="copilot" element={<AICopilot />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
