interface ProductSVGProps {
  productId: string;
  category: string;
  className?: string;
  width?: number;
  height?: number;
}

const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  'Raised Beds': { bg: '#8B5E3C', accent: '#2D6A4F' },
  'Wall Planters': { bg: '#2D6A4F', accent: '#8B5E3C' },
  'Corner Units': { bg: '#374151', accent: '#8B5E3C' },
  'Accessories': { bg: '#40916C', accent: '#F8F5F0' },
};

export default function ProductSVG({ productId, category, className = '', width = 400, height = 300 }: ProductSVGProps) {
  const seed = productId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const colors = CATEGORY_COLORS[category] || { bg: '#8B5E3C', accent: '#2D6A4F' };
  const cols = (seed % 4) + 2;
  const rows = (seed % 3) + 1;
  const cellW = Math.floor(width / (cols + 2));
  const cellH = Math.floor(height / (rows + 2));
  const startX = Math.floor((width - cols * cellW) / 2);
  const startY = Math.floor((height - rows * cellH) / 2);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={`${category} product illustration`}
    >
      <rect width={width} height={height} fill="#F0EBE3" />
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={startX + c * cellW + 2}
            y={startY + r * cellH + 2}
            width={cellW - 4}
            height={cellH - 4}
            rx={3}
            fill={(r + c) % 2 === 0 ? colors.bg : colors.accent}
            opacity={0.85}
          />
        ))
      )}
      <rect
        x={startX - 4}
        y={startY - 4}
        width={cols * cellW + 8}
        height={rows * cellH + 8}
        rx={6}
        fill="none"
        stroke={colors.bg}
        strokeWidth={2}
      />
    </svg>
  );
}
