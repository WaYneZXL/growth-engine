import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, Clock, Loader2, AlertTriangle, RotateCcw, ChevronDown, ChevronUp,
  Bot, User, Package, Zap,
} from 'lucide-react';
import { workflowTasks, formatNumber } from '../data/mockData';

const statusConfig = {
  running:   { label: 'Running',   bg: 'rgba(240,107,37,0.1)',  color: 'var(--brand)',   icon: Loader2 },
  completed: { label: 'Completed', bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)', icon: Check },
  failed:    { label: 'Failed',    bg: 'rgba(239,68,68,0.1)',   color: 'var(--danger)',  icon: AlertTriangle },
};

const filterOptions = ['all', 'running', 'completed', 'failed'];

function timeAgo(dateStr) {
  const now = new Date('2026-02-26T12:00:00Z');
  const d = new Date(dateStr);
  const diff = Math.floor((now - d) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function WorkflowTasks() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);

  const filtered = filter === 'all'
    ? workflowTasks
    : workflowTasks.filter(t => t.status === filter);

  const counts = {
    all: workflowTasks.length,
    running: workflowTasks.filter(t => t.status === 'running').length,
    completed: workflowTasks.filter(t => t.status === 'completed').length,
    failed: workflowTasks.filter(t => t.status === 'failed').length,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Tasks</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>
          All workflow executions by AI agents and users
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { label: 'Total', value: counts.all, color: 'var(--text-1)' },
          { label: 'Running', value: counts.running, color: 'var(--brand)' },
          { label: 'Completed', value: counts.completed, color: 'var(--success)' },
          { label: 'Failed', value: counts.failed, color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6 }}>
        {filterOptions.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: '1px solid', cursor: 'pointer', textTransform: 'capitalize',
              background: filter === f ? 'var(--brand)' : 'transparent',
              color: filter === f ? '#fff' : 'var(--text-2)',
              borderColor: filter === f ? 'var(--brand)' : 'var(--border)',
            }}
          >
            {f} {counts[f] > 0 && `(${counts[f]})`}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(task => {
          const sc = statusConfig[task.status];
          const StatusIcon = sc.icon;
          const isExpanded = expandedTask === task.id;

          return (
            <div key={task.id} className="card" style={{ overflow: 'hidden', borderColor: task.status === 'running' ? 'rgba(240,107,37,0.25)' : task.status === 'failed' ? 'rgba(239,68,68,0.2)' : undefined }}>
              <div style={{ padding: '16px 20px' }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  {/* Status icon */}
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: sc.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                  }}>
                    <StatusIcon size={15} style={{ color: sc.color, ...(task.status === 'running' ? { animation: 'spin 1s linear infinite' } : {}) }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{task.title}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: sc.bg, color: sc.color }}>{sc.label}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {task.triggeredBy === 'ai' ? <Bot size={11} /> : <User size={11} />}
                        {task.triggeredBy === 'ai' ? 'AI Agent' : 'User'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Zap size={11} /> {task.workflowName}
                      </span>
                      {task.skuName && (
                        <span
                          style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'var(--brand)' }}
                          onClick={() => task.skuId && navigate(`/products/${task.skuId}`)}
                        >
                          <Package size={11} /> {task.skuName}
                        </span>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> {timeAgo(task.triggeredAt)}
                      </span>
                    </div>

                    {/* Progress bar */}
                    {task.status === 'running' && (
                      <div style={{ marginBottom: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Step {task.completedSteps + 1} of {task.totalSteps}: {task.currentStep}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)' }}>{task.progress}%</span>
                        </div>
                        <div style={{ height: 5, background: 'var(--surface-2)', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${task.progress}%`, background: 'var(--brand)', borderRadius: 999, transition: 'width 0.5s' }} />
                        </div>
                      </div>
                    )}

                    {/* Failed reason */}
                    {task.status === 'failed' && task.failReason && (
                      <div style={{ fontSize: 12, color: 'var(--danger)', background: 'rgba(239,68,68,0.06)', padding: '6px 10px', borderRadius: 6, marginBottom: 4 }}>
                        {task.failReason}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    {task.canRollback && task.status === 'completed' && (
                      <button
                        className="btn btn-subtle"
                        style={{ fontSize: 11, height: 28, display: 'flex', alignItems: 'center', gap: 4 }}
                        title="Rollback this task"
                      >
                        <RotateCcw size={11} /> Rollback
                      </button>
                    )}
                    {task.status === 'failed' && (
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: 11, height: 28, display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        <RotateCcw size={11} /> Retry
                      </button>
                    )}
                    <button
                      className="btn btn-subtle"
                      style={{ fontSize: 11, height: 28, display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    >
                      {isExpanded ? 'Hide' : 'Steps'}
                      {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded step details */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '14px 20px', background: 'var(--surface-2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {task.steps.map((step, i) => {
                      const stepDone = step.status === 'done';
                      const stepRunning = step.status === 'running';
                      const stepFailed = step.status === 'failed';
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          padding: stepRunning ? '8px 10px' : '4px 0',
                          borderRadius: stepRunning ? 8 : 0,
                          background: stepRunning ? 'rgba(240,107,37,0.06)' : stepFailed ? 'rgba(239,68,68,0.04)' : 'transparent',
                          border: stepRunning ? '1px solid rgba(240,107,37,0.15)' : '1px solid transparent',
                        }}>
                          {/* Step number / icon */}
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                            background: stepDone ? 'rgba(16,185,129,0.12)' : stepRunning ? 'rgba(240,107,37,0.12)' : stepFailed ? 'rgba(239,68,68,0.12)' : 'var(--surface)',
                            border: `1px solid ${stepDone ? 'rgba(16,185,129,0.3)' : stepRunning ? 'rgba(240,107,37,0.3)' : stepFailed ? 'rgba(239,68,68,0.3)' : 'var(--border)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 10, fontWeight: 600,
                            color: stepDone ? 'var(--success)' : stepRunning ? 'var(--brand)' : stepFailed ? 'var(--danger)' : 'var(--text-3)',
                          }}>
                            {stepDone ? <Check size={11} /> : stepRunning ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : stepFailed ? <AlertTriangle size={10} /> : i + 1}
                          </div>

                          {/* Step content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, color: stepDone ? 'var(--text-2)' : 'var(--text-1)', fontWeight: 500 }}>{step.name}</div>
                            {step.output && (
                              <div style={{ fontSize: 11, color: stepFailed ? 'var(--danger)' : 'var(--text-3)', marginTop: 2 }}>{step.output}</div>
                            )}
                            {step.completedAt && (
                              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{formatDate(step.completedAt)}</div>
                            )}
                          </div>

                          {/* Status pill */}
                          <span style={{
                            fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 999, flexShrink: 0,
                            background: stepDone ? 'rgba(16,185,129,0.1)' : stepRunning ? 'rgba(240,107,37,0.1)' : stepFailed ? 'rgba(239,68,68,0.1)' : 'rgba(148,163,184,0.1)',
                            color: stepDone ? 'var(--success)' : stepRunning ? 'var(--brand)' : stepFailed ? 'var(--danger)' : 'var(--text-3)',
                          }}>
                            {stepDone ? 'Done' : stepRunning ? 'Running' : stepFailed ? 'Failed' : 'Pending'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-3)', fontSize: 13 }}>
            No {filter} tasks found.
          </div>
        )}
      </div>
    </div>
  );
}
