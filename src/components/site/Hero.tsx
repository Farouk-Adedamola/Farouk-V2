'use client';

import { useEffect, useRef } from 'react';

import ActionButton from './ActionButton';
import { createSpring, prefersReducedMotion } from '@/lib/spring';
import { INTRO, INTRO_TOTAL } from '@/lib/intro';
import { profile, proof } from '@/data/resume';

/**
 * The name opens on the two axes Bricolage Grotesque actually has — width
 * 76→100 and weight 540→800 — so it thickens and widens as the page arrives.
 * It is legible on the first frame; the motion refines it rather than reveals it.
 */
export default function Hero({ plane }: { plane?: React.ReactNode }) {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.setProperty('--w', '100');
      el.style.setProperty('--g', '800');
      return;
    }

    const spring = createSpring(0, (t) => {
      el.style.setProperty('--w', (76 + 24 * t).toFixed(2));
      el.style.setProperty('--g', (540 + 260 * t).toFixed(0));
    });

    // If the pixel intro is running, hold until it starts lifting — otherwise
    // the name finishes widening behind an opaque overlay and nobody sees it.
    const introRunning =
      document.documentElement.dataset.intro === 'run';
    const delay = introRunning
      ? Math.max(0, INTRO_TOTAL - INTRO.exitDuration - performance.now())
      : 0;

    let raf = 0;
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(() =>
        spring.to(1, { damping: 1, response: 0.85 })
      );
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      spring.stop();
    };
  }, []);

  return (
    <div className="hero">
      <div className="wrap hero-body">
      <div className="eyebrow">
        <span className="m">{profile.locationLine}</span>
        <span className="rule" />
        <span className="m">{profile.since}</span>
      </div>

      <h1 className="display" ref={nameRef}>
        <span className="ln">{profile.first}</span>
        <span className="ln">{profile.last}</span>
      </h1>

      <div className="hero-rule" />

      <div className="role">
        <b>{profile.title}</b>
        {profile.disciplines.map((d) => (
          <i key={d}>{d}</i>
        ))}
      </div>

      <div className="hero-mid">
        <p className="lede">
          {profile.lede.before}
          <em>{profile.lede.accent}</em>
        </p>
        {plane}
      </div>

      <dl className="proof">
        {proof.map((p) => (
          <div key={p.label}>
            <dt>{p.label}</dt>
            <dd>{p.body}</dd>
          </div>
        ))}
      </dl>

      <div className="cta">
        <ActionButton href={`mailto:${profile.email}`} variant="primary">
          Start a conversation
        </ActionButton>
        <ActionButton href={profile.resumePath} external>
          Résumé
        </ActionButton>
        <ActionButton href={profile.github} external>
          GitHub
        </ActionButton>
        <ActionButton href={profile.linkedin} external>
          LinkedIn
        </ActionButton>
      </div>
      </div>
    </div>
  );
}
