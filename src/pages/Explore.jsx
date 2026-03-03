import { useState, useMemo } from 'react';
import { Search, AlertTriangle, Sparkles } from 'lucide-react';
import { useActionQueue } from '../context/ActionQueueContext';
import EntityCard from '../components/shared/EntityCard';
import { products, creators, contentAssets, exploreAlerts } from '../data/mockData';

const filterOptions = ['All', 'Products', 'Creators', 'Content'];

export default function Explore() {
  const { openInspector } = useActionQueue();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Build unified entity list
  const allEntities = useMemo(() => {
    const list = [];
    products.forEach(p => list.push({ type: 'product', data: p, name: p.name, id: p.id }));
    creators.forEach(c => list.push({ type: 'creator', data: c, name: c.name, id: c.id }));
    contentAssets.forEach(a => list.push({ type: 'content', data: a, name: a.name, id: a.id }));
    return list;
  }, []);

  // Find alert info for an entity
  const getAlert = (type, id) => exploreAlerts.find(a => a.type === type && a.id === id);

  // Filter entities
  const filtered = useMemo(() => {
    let items = allEntities;
    if (activeFilter === 'Products') items = items.filter(e => e.type === 'product');
    else if (activeFilter === 'Creators') items = items.filter(e => e.type === 'creator');
    else if (activeFilter === 'Content') items = items.filter(e => e.type === 'content');

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q) ||
        (e.data.handle && e.data.handle.toLowerCase().includes(q)) ||
        (e.data.category && e.data.category.toLowerCase().includes(q)) ||
        (e.data.niche && e.data.niche.toLowerCase().includes(q)) ||
        (e.data.skuId && e.data.skuId.toLowerCase().includes(q))
      );
    }
    return items;
  }, [allEntities, activeFilter, search]);

  // Needs-attention entities
  const attentionEntities = useMemo(() => {
    return exploreAlerts.map(alert => {
      let data;
      if (alert.type === 'product') data = products.find(p => p.id === alert.id);
      else if (alert.type === 'creator') data = creators.find(c => c.id === alert.id);
      else if (alert.type === 'content') data = contentAssets.find(a => a.id === alert.id);
      return data ? { alert, data } : null;
    }).filter(Boolean);
  }, []);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Search bar */}
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products, creators, content..."
          style={{
            width: '100%', height: 48, paddingLeft: 44, paddingRight: 16,
            borderRadius: 12, border: '1px solid var(--border)', background: '#fff',
            fontSize: 14, color: 'var(--text-1)', outline: 'none',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        />
      </div>

      {/* Needs Attention section — only show when not searching */}
      {!search.trim() && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <AlertTriangle size={14} style={{ color: 'var(--warning)' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Needs Attention</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 4 }}>Agent-surfaced</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {attentionEntities.map(({ alert, data }) => (
              <EntityCard
                key={`${alert.type}-${alert.id}`}
                entity={data}
                type={alert.type}
                signal={alert.signal}
                reason={alert.reason}
                onClick={() => openInspector(alert.type, alert.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 6 }}>
        {filterOptions.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              fontSize: 12, fontWeight: 500, padding: '6px 14px',
              borderRadius: 8, border: '1px solid',
              cursor: 'pointer',
              borderColor: activeFilter === f ? 'var(--ai)' : 'var(--border)',
              background: activeFilter === f ? 'rgba(124,92,252,0.06)' : '#fff',
              color: activeFilter === f ? 'var(--ai)' : 'var(--text-2)',
              transition: 'all 0.15s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Entity results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-3)', fontSize: 13 }}>
            No results found for "{search}"
          </div>
        )}
        {filtered.map(entity => {
          const alert = getAlert(entity.type, entity.id);
          return (
            <EntityCard
              key={`${entity.type}-${entity.id}`}
              entity={entity.data}
              type={entity.type}
              signal={alert?.signal}
              reason={search.trim() ? undefined : alert?.reason}
              onClick={() => openInspector(entity.type, entity.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
