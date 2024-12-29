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
  ArrowBigDown,
} from 'lucide-react';

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
      className={`fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-[1280px] px-4 py-6 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <nav
        className="group relative mx-auto flex max-w-fit items-center justify-between rounded-[8px] px-6 py-3 shadow-[0_0_2rem_-0.5rem] shadow-emerald-500/30 transition-all  duration-300 sm:justify-center sm:bg-darkTheme-primary"
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
        <ul className="border- relative hidden items-center border-b border-t border-gray-300 py-2 sm:flex ">
          {NAV_ITEMS.slice(0, 4).map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`relative px-6 py-1 font-figtree text-xl font-medium transition-all duration-200  
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
          className="relative z-[60] block self-end sm:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-300" />
          ) : (
            <div className="flex gap-1">
              <Text font="figtree" size="md">
                Menu
              </Text>
              <ArrowBigDown className="h-6 w-6 text-gray-300" />
            </div>
          )}
        </button>

        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-[52] w-64 bg-light-primary p-2 shadow-lg transition-transform duration-300 ease-in-out sm:hidden
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
