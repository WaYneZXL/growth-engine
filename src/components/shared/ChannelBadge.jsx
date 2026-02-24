import { getChannelColor, getChannelName } from '../../data/mockData';

export default function ChannelBadge({ channelId, size = 'sm' }) {
  const color = getChannelColor(channelId);
  const name = getChannelName(channelId);
  const fontSize = size === 'sm' ? 10 : 12;
  const padding = size === 'sm' ? '2px 7px' : '3px 9px';

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      borderRadius: 999, fontWeight: 500, fontSize, padding,
      background: `${color}18`, color,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {name}
    </span>
  );
}
