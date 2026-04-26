interface BadgeProps {
  label: string;
  category?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  'Camas de cultivo': 'bg-[#8B5E3C] text-white',
  'Jardineras de pared': 'bg-[#2D6A4F] text-white',
  'Unidades de esquina': 'bg-[#374151] text-white',
  'Accesorios': 'bg-[#40916C] text-white',
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
