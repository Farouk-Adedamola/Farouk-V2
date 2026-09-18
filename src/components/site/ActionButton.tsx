'use client';

import React, { useCallback, useRef } from 'react';

import { clamp } from '@/lib/spring';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  external?: boolean;
};

/**
 * The fill grows from the exact point the pointer crossed the edge, so the
 * button reads as responding to you rather than playing a canned animation.
 */
export default function ActionButton({
  href,
  children,
  variant = 'default',
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const setOrigin = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    el.style.setProperty('--ox', `${pct.toFixed(1)}%`);
  }, []);

  return (
    <a
      ref={ref}
      className={variant === 'primary' ? 'btn primary' : 'btn'}
      href={href}
      onPointerEnter={setOrigin}
      onPointerLeave={setOrigin}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="ix" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}
