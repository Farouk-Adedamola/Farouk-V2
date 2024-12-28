'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Menu,
  X,
  Home,
  BookOpen,
  FolderGit2,
  FileText,
  User,
  Laptop2,
  List,
  MenuIcon,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    path: '/',
    name: 'Home',
    description: 'Welcome to my forever work-in-progress!',
    icon: Home,
  },
  {
    path: '/blog',
    name: 'Blog',
    description: 'Thoughts, mental models, and tutorials',
    icon: BookOpen,
  },
  {
    path: '/projects',
    name: 'Projects',
    description: 'Showcase of my projects',
    icon: FolderGit2,
  },
  {
    path: '/shorts',
    name: 'Shorts',
    description: 'Personal notes of snippets',
    icon: FileText,
  },
  {
    path: '/about',
    name: 'About',
    description: 'Learn more about me!',
    icon: User,
  },
  {
    path: '/uses',
    name: 'Uses',
    description: 'A peek into my digital workspace',
    icon: Laptop2,
  },
  {
    path: '/bucket-list',
    name: 'Bucket List',
    description: 'Things to do at least once in my life',
    icon: List,
  },
];

export default function Header() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMouseMove = (e: any) => {
    const nav = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - nav.left,
      y: e.clientY - nav.top,
    });
  };

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Close menu if scrolled past 100vh
    if (currentScrollPos > viewportHeight) {
      setMobileMenuOpen(false);
    }

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full px-4 py-6 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <nav
        className="group relative mx-auto flex max-w-xl items-center justify-between rounded-[8px] px-4 py-3 shadow-[0_0_2rem_-0.5rem] shadow-emerald-500/30 transition-all duration-300 sm:max-w-2xl sm:justify-center sm:bg-darkTheme-primary"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Gradient effects */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            maskImage: 'radial-gradient(circle at center, transparent, black)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent, black)',
          }}
        />
        <div
          className="absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isHovering
              ? `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52,211,153,0.1), transparent 80%)`
              : '',
          }}
        />
        <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-emerald-500/0 group-hover:via-emerald-500/10 group-hover:to-emerald-500/0">
          <div className="absolute inset-[1px] rounded-full bg-darkTheme-primary" />
        </div>

        {/* Desktop Navigation */}
        <ul className="relative hidden items-center sm:flex sm:space-x-6">
          {NAV_ITEMS.slice(0, 4).map((item) => (
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-[60] block sm:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-300" />
          ) : (
            <Menu className="h-6 w-6 text-gray-300" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[51] bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden
            ${
              mobileMenuOpen
                ? 'z-50 opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-[52] w-64 bg-darkTheme-primary p-6 shadow-lg transition-transform duration-300 ease-in-out sm:hidden
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="mt-16 space-y-6">
            {NAV_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.path} className="border-b border-gray-800 pb-4">
                  <Link
                    href={item.path}
                    className={`flex items-center space-x-3 font-figtree text-lg font-medium ${
                      pathname === item.path
                        ? 'text-emerald-light'
                        : 'text-gray-300'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                  <p className="mt-1 pl-8 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
