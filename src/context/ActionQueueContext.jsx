/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { actionQueue as initialActions } from '../data/mockData';

const ActionQueueContext = createContext(null);

export function ActionQueueProvider({ children }) {
  const [actions, setActions] = useState(initialActions);

  const handleApply = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const handleSkip = (id, reason) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'skipped', skipReason: reason } : a));
  };

  const handleUndo = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'pending' } : a));
  };

  return (
    <ActionQueueContext.Provider value={{ actions, handleApply, handleSkip, handleUndo }}>
      {children}
    </ActionQueueContext.Provider>
  );
}

export function useActionQueue() {
  const ctx = useContext(ActionQueueContext);
  if (!ctx) throw new Error('useActionQueue must be used within ActionQueueProvider');
  return ctx;
}
