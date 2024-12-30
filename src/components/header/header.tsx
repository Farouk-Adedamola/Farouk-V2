'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { Home, BookOpen, FolderGit2, User } from 'lucide-react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import Text from '../Text/text';

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
    path: '/about',
    name: 'About',
    description: 'Learn more about me!',
    icon: User,
  },
];

export default function Header() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    setIsScrolledDown(currentScrollPos > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-transform duration-300
        ${isScrolledDown ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-6">
        <nav className="mx-auto max-w-fit rounded-lg bg-darkTheme-primary shadow-lg">
          {/* Desktop Navigation */}
          <div className="hidden sm:block">
            <ul className="flex items-center border-y border-gray-300 p-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.path} className="px-2">
                  <Link
                    href={item.path}
                    className={`group relative inline-flex items-center gap-2 px-4 py-2 font-figtree text-lg font-medium transition-colors duration-200
                      ${
                        pathname === item.path
                          ? 'text-emerald-light'
                          : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex w-full items-center justify-between p-4"
              aria-label="Toggle menu"
            >
              <Text
                font="figtree"
                size="md"
                weight="bold"
                className="flex items-center gap-2"
              >
                Menu
                {mobileMenuOpen ? (
                  <MdKeyboardArrowUp size={24} />
                ) : (
                  <MdKeyboardArrowDown size={24} />
                )}
              </Text>
            </button>

            {/* Mobile Menu Panel */}
            <div
              className={`transform-gpu overflow-hidden transition-all duration-300 ease-in-out
                ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
              <div className="space-y-4 p-4">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.path}
                    className="border-b border-gray-800 pb-4"
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 font-figtree text-lg font-medium
                        ${
                          pathname === item.path
                            ? 'text-emerald-light'
                            : 'text-gray-300'
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                    <p className="mt-2 pl-8 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
