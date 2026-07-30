import Link from "next/link";

interface CategoryCardProps {
  href: string;
  icon: string;
  label: string;
  bgColor: string;
  iconColor: string;
}

export function CategoryCard({ href, icon, label, bgColor, iconColor }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="category-card bg-white rounded p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md"
    >
      <div className={`w-16 h-16 flex items-center justify-center ${bgColor} rounded-full mb-3`}>
        <i className={`${icon} text-2xl ${iconColor}`}></i>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
