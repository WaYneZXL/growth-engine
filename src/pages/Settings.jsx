import { User, Bell, Link2, Palette, Shield, ChevronRight } from 'lucide-react';

const sections = [
  { Icon: User,   label: 'Account',             desc: 'Manage your account details and preferences'           },
  { Icon: Link2,  label: 'Channel Connections',  desc: 'Connect and manage TikTok Shop, Shopify, and Amazon'  },
  { Icon: Bell,   label: 'Notifications',        desc: 'Configure alerts and notification preferences'         },
  { Icon: Palette,label: 'Appearance',           desc: 'Customize dashboard theme and display options'         },
  { Icon: Shield, label: 'Security',             desc: 'Two-factor authentication and security settings'       },
];

export default function Settings() {
  return (
    <div style={{ maxWidth: 560 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Settings</h1>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2, marginBottom: 20 }}>Manage your AfterShip Feed preferences</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sections.map(({ Icon, label, desc }) => (
          <div key={label} className="card card-hover" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={17} style={{ color: 'var(--text-2)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 1 }}>{desc}</div>
            </div>
            <ChevronRight size={15} style={{ color: 'var(--text-3)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
