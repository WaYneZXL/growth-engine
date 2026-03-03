/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { actionQueue as initialActions } from '../data/mockData';

const ActionQueueContext = createContext(null);

export function ActionQueueProvider({ children }) {
  const [actions, setActions] = useState(initialActions);
  const [activeTab, setActiveTab] = useState('foryou');
  const [inspector, setInspector] = useState({ open: false, type: null, id: null });

  const handleApply = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const handleSkip = (id, reason) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'skipped', skipReason: reason } : a));
  };

  const handleUndo = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'pending' } : a));
  };

  const openInspector = useCallback((type, id) => {
    setInspector({ open: true, type, id });
  }, []);

  const closeInspector = useCallback(() => {
    setInspector({ open: false, type: null, id: null });
  }, []);

  return (
    <ActionQueueContext.Provider value={{
      actions, handleApply, handleSkip, handleUndo,
      activeTab, setActiveTab,
      inspector, openInspector, closeInspector,
    }}>
      {children}
    </ActionQueueContext.Provider>
  );
}

export function useActionQueue() {
  const ctx = useContext(ActionQueueContext);
  if (!ctx) throw new Error('useActionQueue must be used within ActionQueueProvider');
  return ctx;
}
