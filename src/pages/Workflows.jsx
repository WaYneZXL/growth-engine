import { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Clock, Zap, Loader2, Check } from 'lucide-react';
import { workflows } from '../data/mockData';

const phaseColor = {
  Listings:  { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  Content:   { bg: 'rgba(16,185,129,0.12)', color: 'var(--success)' },
  Creators:  { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6' },
  Insights:  { bg: 'rgba(245,158,11,0.12)', color: 'var(--warning)' },
};

const automationStyle = {
  Automated: { bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)' },
  'Semi-Auto':{ bg: 'rgba(240,107,37,0.1)', color: 'var(--brand)'   },
  Guided:    { bg: 'rgba(245,158,11,0.1)',  color: 'var(--warning)' },
};

const stepStyle = {
  auto:       { bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)', label: 'Auto'      },
  'semi-auto':{ bg: 'rgba(240,107,37,0.1)', color: 'var(--brand)',   label: 'Semi-auto' },
  manual:     { bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)', label: 'Manual'    },
};

export default function Workflows() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Playbooks</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Automated playbooks for your operations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
        {workflows.map((wf) => {
          const isExpanded = expanded === wf.id;
          const isRunning  = wf.status === 'running';
          const aStyle = automationStyle[wf.automation] || automationStyle['Semi-Auto'];

          return (
            <div key={wf.id} className="card" style={{ overflow: 'hidden', transition: 'box-shadow 0.2s', borderColor: isRunning ? 'rgba(240,107,37,0.3)' : undefined }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Running banner */}
              {isRunning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(240,107,37,0.08)', borderBottom: '1px solid rgba(240,107,37,0.15)' }}>
                  <Loader2 size={12} style={{ color: 'var(--brand)', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)' }}>Running</span>
                  <span style={{ fontSize: 11, color: 'var(--text-2)' }}>— {wf.runningFor}</span>
                </div>
              )}

              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{wf.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{wf.name}</h3>
                      <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 999, background: aStyle.bg, color: aStyle.color }}>{wf.automation}</span>
                      {isRunning && <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: 'rgba(240,107,37,0.12)', color: 'var(--brand)' }}>In Progress</span>}
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{wf.description}</p>
                  </div>
                </div>

                {/* Progress bar for running workflows */}
                {isRunning && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Step {wf.runningStep + 1} of {wf.steps}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand)' }}>{wf.progress}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 999, border: '1px solid var(--border)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${wf.progress}%`, background: 'var(--brand)', borderRadius: 999, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text-3)', marginBottom: 14 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={11} /> {wf.steps} steps</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {wf.estimatedTime}</span>
                  <span>Last run: {wf.lastRun}</span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button disabled={isRunning} className="btn btn-primary" style={{ fontSize: 12, height: 32, opacity: isRunning ? 0.6 : 1, cursor: isRunning ? 'not-allowed' : 'pointer' }}>
                    {isRunning ? <><Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> Running...</> : <><Play size={11} /> Run Workflow</>}
                  </button>
                  <button className="btn btn-subtle" style={{ fontSize: 12, height: 32 }} onClick={() => setExpanded(isExpanded ? null : wf.id)}>
                    {isExpanded ? 'Hide' : 'View'} Steps
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '14px 20px', background: 'var(--surface-2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {wf.stepsDetail.map((step, i) => {
                      const pc = phaseColor[step.phase] || phaseColor.Listings;
                      const sc = stepStyle[step.status] || stepStyle.manual;
                      const runState = step.runState;
                      const isActiveStep = isRunning && runState === 'active';
                      const isDoneStep   = isRunning && runState === 'done';
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: isActiveStep ? '8px 10px' : '2px 0', borderRadius: isActiveStep ? 8 : 0, background: isActiveStep ? 'rgba(240,107,37,0.07)' : 'transparent', border: isActiveStep ? '1px solid rgba(240,107,37,0.2)' : '1px solid transparent', transition: 'all 0.15s' }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: isDoneStep ? 'rgba(16,185,129,0.12)' : isActiveStep ? 'rgba(240,107,37,0.12)' : 'var(--surface)', border: `1px solid ${isDoneStep ? 'rgba(16,185,129,0.3)' : isActiveStep ? 'rgba(240,107,37,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: isDoneStep ? 'var(--success)' : isActiveStep ? 'var(--brand)' : 'var(--text-3)', fontWeight: 600, flexShrink: 0 }}>
                            {isDoneStep ? <Check size={11} /> : isActiveStep ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : i + 1}
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 6, background: pc.bg, color: pc.color, flexShrink: 0 }}>{step.phase}</span>
                          <span style={{ fontSize: 12, color: isActiveStep ? 'var(--text-1)' : isDoneStep ? 'var(--text-3)' : 'var(--text-1)', flex: 1, textDecoration: isDoneStep ? 'line-through' : 'none' }}>{step.name}</span>
                          {isRunning ? (
                            <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: isDoneStep ? 'rgba(16,185,129,0.1)' : isActiveStep ? 'rgba(240,107,37,0.1)' : 'rgba(148,163,184,0.1)', color: isDoneStep ? 'var(--success)' : isActiveStep ? 'var(--brand)' : 'var(--text-3)', flexShrink: 0 }}>
                              {isDoneStep ? 'Done' : isActiveStep ? 'Running' : 'Pending'}
                            </span>
                          ) : (
                            <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: sc.bg, color: sc.color, flexShrink: 0 }}>{sc.label}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
