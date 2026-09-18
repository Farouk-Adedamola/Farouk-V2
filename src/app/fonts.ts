import localFont from 'next/font/local';

/**
 * Self-hosted rather than next/font/google: Bricolage Grotesque postdates this
 * Next version's Google font manifest, and the hosted CSS clamps the width axis.
 * These are the upstream variable files, subset to Latin plus the currency and
 * arrow glyphs the page actually sets.
 */
export const display = localFont({
  src: '../assets/fonts/BricolageGrotesque.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '200 800',
  preload: true,
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
});

export const mono = localFont({
  src: '../assets/fonts/JetBrainsMono.woff2',
  variable: '--font-mono',
  display: 'swap',
  weight: '100 800',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
