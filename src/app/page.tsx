'use client';

import { useEffect } from 'react';
import React from 'react';

import Hero from '@/components/hero/hero';

export const metadata = {
  title: 'Portfolio Site | Farouk Adedamola',
};

export default function HomePage() {
  useEffect(() => {
    console.log(
      "%c👋 Hello! Welcome to Farouk's Portfolio",
      'color: #10b981; font-size: 20px; font-weight: bold;'
    );
    console.log(
      '%cFeel free to explore the code!',
      'color: #6ee7b7; font-size: 16px;'
    );
  }, []);
  return (
    <h1 className="mx-auto mt-12 max-w-[1440px]">
      <Hero />
    </h1>
  );
}
