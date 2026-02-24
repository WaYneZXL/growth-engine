import { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Clock, Zap } from 'lucide-react';
import { workflows } from '../data/mockData';

const phaseColor = {
  Build:     { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  Distribute:{ bg: 'rgba(16,185,129,0.12)', color: 'var(--success)' },
  Amplify:   { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6' },
  Learn:     { bg: 'rgba(245,158,11,0.12)', color: 'var(--warning)' },
};

const automationStyle = {
  Automated: { bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)' },
  'Semi-Auto':{ bg: 'rgba(99,102,241,0.1)', color: 'var(--brand)'   },
  Guided:    { bg: 'rgba(245,158,11,0.1)',  color: 'var(--warning)' },
};

const stepStyle = {
  auto:       { bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)', label: 'Auto'      },
  'semi-auto':{ bg: 'rgba(99,102,241,0.1)', color: 'var(--brand)',   label: 'Semi-auto' },
  manual:     { bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)', label: 'Manual'    },
};

export default function Workflows() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Growth Recommendations</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Growth playbooks to automate your operations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
        {workflows.map((wf) => {
          const isExpanded = expanded === wf.id;
          const aStyle = automationStyle[wf.automation] || automationStyle['Semi-Auto'];

          return (
            <div key={wf.id} className="card" style={{ overflow: 'hidden', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{wf.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{wf.name}</h3>
                      <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 999, background: aStyle.bg, color: aStyle.color }}>{wf.automation}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{wf.description}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'var(--text-3)', marginBottom: 14 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={11} /> {wf.steps} steps</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {wf.estimatedTime}</span>
                  <span>Last run: {wf.lastRun}</span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary" style={{ fontSize: 12, height: 32 }}><Play size={11} /> Run Workflow</button>
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
                      const pc = phaseColor[step.phase] || phaseColor.Build;
                      const sc = stepStyle[step.status] || stepStyle.manual;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-3)', fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
                          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 6, background: pc.bg, color: pc.color, flexShrink: 0 }}>{step.phase}</span>
                          <span style={{ fontSize: 12, color: 'var(--text-1)', flex: 1 }}>{step.name}</span>
                          <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 999, background: sc.bg, color: sc.color, flexShrink: 0 }}>{sc.label}</span>
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
