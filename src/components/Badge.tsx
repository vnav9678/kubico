interface BadgeProps {
  label: string;
  category?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  'Raised Beds': 'bg-[#8B5E3C] text-white',
  'Wall Planters': 'bg-[#2D6A4F] text-white',
  'Corner Units': 'bg-[#374151] text-white',
  'Accessories': 'bg-[#40916C] text-white',
};

export default function Badge({ label, category, className = '' }: BadgeProps) {
  const colorClass = category ? (categoryColors[category] || 'bg-gray-500 text-white') : 'bg-gray-200 text-gray-700';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}
    >
      {label}
    </span>
  );
}
