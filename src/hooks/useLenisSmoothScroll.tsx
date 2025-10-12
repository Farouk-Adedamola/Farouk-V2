'use client';

import { useEffect, useState } from 'react';

import Lenis from 'lenis';

type LenisOptions = {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal';
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  wheelMultiplier?: number;
  infinite?: boolean;
};

export default function UseLenisSmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisOptions: LenisOptions = {
      duration: 1.6, // Increased for smoother feel
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Modified easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1.2, // Added for better wheel response
      infinite: false,
    };

    const lenisInstance = new Lenis(lenisOptions);
    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.addEventListener('popstate', () => {
      lenisInstance.stop();
    });

    lenisInstance.on('scroll', ({ scroll }: { scroll: number }) => {
      if (typeof window !== 'undefined') {
        history.replaceState({}, '', window.location.pathname);
      }
    });

    return () => {
      lenisInstance.destroy();
      window.removeEventListener('popstate', () => {
        lenisInstance.stop();
      });
    };
  }, []);

  return <>{children}</>;
}
