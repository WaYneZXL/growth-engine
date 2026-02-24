import { Package } from 'lucide-react';

const sizes = { sm: 36, md: 56, lg: 80, xl: 112 };
const radii = { sm: 8,  md: 10, lg: 14, xl: 16  };

export default function ProductImage({ product, size = 'md' }) {
  const px = sizes[size];
  const r  = radii[size];
  const iconPx = Math.round(px * 0.38);

  return (
    <div style={{
      width: px, height: px, borderRadius: r, flexShrink: 0,
      background: `${product.imageColor}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Package size={iconPx} style={{ color: product.imageColor }} />
    </div>
  );
}
