import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ActionQueueProvider } from './context/ActionQueueContext';
import Layout from './components/layout/Layout';
import ActionQueue from './pages/ActionQueue';
import Explore from './pages/Explore';
import Performance from './pages/Performance';

export default function App() {
  return (
    <BrowserRouter>
      <ActionQueueProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ActionQueue />} />
            <Route path="explore" element={<Explore />} />
            <Route path="performance" element={<Performance />} />
            <Route path="settings" element={<div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>Settings</div>} />
          </Route>
        </Routes>
      </ActionQueueProvider>
    </BrowserRouter>
  );
}
