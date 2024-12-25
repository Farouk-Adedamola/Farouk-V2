'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import ThemeToggle from '@/components/theme-toggle';

const NAV_ITEMS = [
  { path: '/', name: 'Home' },
  { path: '/blog', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
  { path: '/about', name: 'About' },
];

export default function Header() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  const handleMouseMove = (e: any) => {
    const nav = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - nav.left,
      y: e.clientY - nav.top,
    });
  };

  // Listens to page scroll and adjusts the header visibility

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 w-full px-4 py-6 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <nav
        className="group relative mx-auto flex max-w-2xl items-center justify-center rounded-[16px] bg-darkTheme-primary px-6 py-3 shadow-[0_0_2rem_-0.5rem] shadow-emerald-500/30 transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            maskImage: 'radial-gradient(circle at center, transparent, black)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent, black)',
          }}
        />

        <div
          className=" absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isHovering
              ? `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52,211,153,0.1), transparent 80%)`
              : '',
          }}
        />

        <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-emerald-500/0 group-hover:via-emerald-500/10 group-hover:to-emerald-500/0">
          <div className="absolute inset-[1px] rounded-full bg-darkTheme-primary" />
        </div>

        <ul className="relative flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`relative px-2 py-1 font-figtree text-xl font-medium transition-all duration-200
                  ${
                    pathname === item.path
                      ? 'text-emerald-light'
                      : 'text-gray-300 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative ml-6">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
