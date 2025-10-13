'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { Home, BookOpen, FolderGit2, User, File } from 'lucide-react';
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
    path: '/resume',
    name: 'Resume',
    description: 'My resume',
    icon: File,
  },
];

const SCROLL_THRESHOLD = 50;
const SCROLL_DELAY = 10;

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const scrollDifference = Math.abs(currentScrollPos - prevScrollPos);

    if (scrollDifference > SCROLL_THRESHOLD) {
      // Hide when scrolling down, show when scrolling up (reversed from previous version)
      setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 5);
      setPrevScrollPos(currentScrollPos);
      setMobileMenuOpen(false);
    }
  }, [prevScrollPos]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, SCROLL_DELAY);
    };

    window.addEventListener('scroll', debouncedScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-opacity duration-500 ease-in-out
        ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-6">
        {/* Desktop Navigation */}
        <nav className="mx-auto hidden max-w-fit rounded-lg bg-darkTheme-primary shadow-lg sm:block">
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
        </nav>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-auto flex items-center rounded-lg bg-darkTheme-primary px-4 py-2 shadow-lg"
            aria-label="Toggle menu"
          >
            <Text
              font="figtree"
              size="sm"
              className="flex items-center gap-2 font-bold"
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
            className={`fixed left-0 right-0 mt-4 flex max-w-[80%] justify-self-end  rounded-lg bg-darkTheme-primary shadow-lg transition-opacity duration-300 ease-in-out
              ${
                mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
          >
            <div className="h-full overflow-y-auto">
              <div className="space-y-4 p-2">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.path}
                    className="border-b border-gray-800 pb-4 last:border-none"
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
                      <Text font="figtree" size="sm">
                        {item.name}
                      </Text>
                    </Link>
                    <Text
                      font="figtree"
                      size="sm"
                      className="mt-2 pl-8 text-xs text-gray-500"
                    >
                      {item.description}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
