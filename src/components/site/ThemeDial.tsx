'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/spring';
import { THEME_COLOR, THEME_KEY } from '@/lib/theme';
import type { Theme } from '@/lib/theme';

/* Rounded: server and browser disagree about the last digits of a sine, and
   React reports that as a hydration mismatch. */
const pt = (n: number) => Number(n.toFixed(3));

/* 24 ticks around the bezel; the four cardinals run longer. */
const TICKS = Array.from({ length: 24 }, (_, k) => {
  const a = (k * 15 - 90) * (Math.PI / 180);
  const long = k % 6 === 0;
  const r1 = 21.5;
  const r2 = long ? 18.6 : 19.9;
  return {
    k,
    x1: pt(23 + r1 * Math.cos(a)),
    y1: pt(23 + r1 * Math.sin(a)),
    x2: pt(23 + r2 * Math.cos(a)),
    y2: pt(23 + r2 * Math.sin(a)),
  };
});

const systemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

/**
 * The theme switch: a tiny orrery. A sun and a moon sit on one arm that turns
 * past a fixed horizon, so only the current one is above it. Changing theme
 * wipes outward from the dial as a growing circle.
 */
export default function ThemeDial() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [auto, setAuto] = useState(true);
  const [ready, setReady] = useState(false);

  /* Writes the theme to the document. This is the only place that does. */
  const commit = (next: Theme, source: 'auto' | 'user') => {
    const root = document.documentElement;
    root.dataset.theme = next;
    root.dataset.themeSource = source;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute('content', THEME_COLOR[next]));
    try {
      if (source === 'user') localStorage.setItem(THEME_KEY, next);
      else localStorage.removeItem(THEME_KEY);
    } catch {
      /* storage can be blocked; the choice then lasts for this visit */
    }
    setTheme(next);
    setAuto(source === 'auto');
  };

  const change = (next: Theme, source: 'auto' | 'user', fromDial: boolean) => {
    const root = document.documentElement;
    const btn = btnRef.current;
    const vt = (
      document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      }
    ).startViewTransition;

    if (!fromDial || !btn || !vt || prefersReducedMotion()) {
      commit(next, source);
      return;
    }

    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const t = vt.call(document, () => commit(next, source));
    t.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 750,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
    setAuto(root.dataset.themeSource !== 'user');
    setReady(true);

    /* While following the browser, follow it live too. */
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onSystem = () => {
      if (document.documentElement.dataset.themeSource === 'user') return;
      commit(systemTheme(), 'auto');
    };
    mq.addEventListener('change', onSystem);
    return () => mq.removeEventListener('change', onSystem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = (e: React.MouseEvent) => {
    if (e.altKey) {
      /* Option-click: hand control back to the browser. */
      change(systemTheme(), 'auto', true);
      return;
    }
    change(theme === 'dark' ? 'light' : 'dark', 'user', true);
  };

  const label =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      ref={btnRef}
      type="button"
      className="td"
      onClick={onClick}
      aria-label={label}
      title={`${label} · Option-click to follow your browser`}
    >
      <span className="td-face">
        <svg viewBox="0 0 46 46" aria-hidden="true">
          <g>
            {TICKS.map((t) => (
              <line
                key={t.k}
                className="td-tick"
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
              />
            ))}
          </g>
          <defs>
            <clipPath id="td-window">
              <circle cx="23" cy="23" r="13" />
            </clipPath>
          </defs>
          <path className="td-sky" d="M 10 23 A 13 13 0 0 1 36 23 Z" />
          <g className="td-stars">
            <circle cx="16.4" cy="17.6" r="0.8" />
            <circle cx="30.4" cy="16.2" r="0.7" />
            <circle cx="28.6" cy="20.2" r="0.55" />
          </g>
          <g clipPath="url(#td-window)">
            <g className="td-arm">
              <circle className="td-sun" cx="23" cy="14.4" r="4.2" />
              <circle className="td-moon" cx="23" cy="31.6" r="4.2" />
              <circle className="td-bite" cx="25" cy="30.5" r="3.5" />
            </g>
          </g>
          <path className="td-ground-base" d="M 10 23 A 13 13 0 0 0 36 23 Z" />
          <path className="td-ground" d="M 10 23 A 13 13 0 0 0 36 23 Z" />
          <line className="td-horizon" x1="10" y1="23" x2="36" y2="23" />
        </svg>
      </span>
      <span
        className="td-cap"
        style={{ visibility: ready ? 'visible' : 'hidden' }}
      >
        {theme === 'dark' ? 'Night' : 'Day'}
        {auto ? ' · auto' : ''}
      </span>
    </button>
  );
}
