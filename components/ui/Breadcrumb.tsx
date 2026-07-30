import Link from "next/link";

interface BreadcrumbProps {
  label: string;
}

export function Breadcrumb({ label }: BreadcrumbProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
              <i className="ri-home-line mr-2"></i>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="ml-1 text-sm font-medium text-primary" aria-current="page">
                {label}
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
}
