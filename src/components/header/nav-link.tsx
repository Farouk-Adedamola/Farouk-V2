'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NavLink({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = path.split('?')[0] === segment;

  return (
    <Link href={`/${path}`} className={`group ${isActive && 'text-primary'}`}>
      {children}
      <span
        className={`block h-0.5 max-w-0 bg-white transition-all duration-300 group-hover:max-w-full ${
          isActive && 'max-w-full'
        }`}
      ></span>
    </Link>
  );
}
