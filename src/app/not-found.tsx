import Link from 'next/link';

import { profile } from '@/data/resume';

export default function NotFound() {
  return (
    <div className="shell">
      <main className="wrap hero" id="top">
        <div className="eyebrow">
          <span className="m">404</span>
          <span className="rule" />
          <span className="m">{profile.locationLine}</span>
        </div>

        <h1 className="display" style={{ ['--w' as string]: 100, ['--g' as string]: 800 }}>
          <span className="ln">Nothing</span>
          <span className="ln">here</span>
        </h1>

        <div className="hero-rule" />

        <p className="lede">
          That page is gone — the site is one page now.{' '}
          <em>Everything lives at the root.</em>
        </p>

        <div className="cta">
          <Link className="btn primary" href="/">
            <span className="ix" aria-hidden="true" />
            <span>Back to the start</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
