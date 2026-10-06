'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import DashGrid from './DashGrid';
import { stackLayers } from '@/data/resume';
import { prefersReducedMotion } from '@/lib/spring';
import type { WakaSnapshot } from '@/lib/wakatime';

/**
 * An isometric plane bleeding off the right edge of the hero.
 *
 * The plane itself is borrowed — a rotated surface over graph paper, dissolved
 * with intersecting mask gradients. What sits on it is not: three layers of the
 * stack, each carrying the work that proves it, and the frontend card reads the
 * live WakaTime language share so one figure on the page is genuinely current.
 *
 * Activation is driven by pointer proximity rather than :hover. The hero copy
 * sits above the plane and would otherwise swallow the pointer over most of the
 * cards, and proximity gives continuous feedback instead of a binary flip.
 */
export default function HeroPlane({ data }: { data: WakaSnapshot }) {
  const planeRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState<number | null>(null);
  const top = data.languages[0];

  const onMove = useCallback((e: PointerEvent) => {
    const cards = planeRef.current?.querySelectorAll<HTMLElement>('.pcard');
    if (!cards?.length) return;

    let best: number | null = null;
    let bestDistance = Infinity;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    setLive(bestDistance < 260 ? best : null);
  }, []);

  useEffect(() => {
    const hero = planeRef.current?.closest('.hero') as HTMLElement | null;
    if (!hero) return;
    const clear = () => setLive(null);
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', clear);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', clear);
    };
  }, [onMove]);

  const reduced = typeof window !== 'undefined' && prefersReducedMotion();

  return (
    <div className="plane" ref={planeRef} aria-hidden="true">
      <div className="plane-inner">
        <DashGrid className="plane-grid" width={660} height={475} spacing={26} />

        <div className="plane-deck">
          {stackLayers.map((layer, i) => (
            <article
              className={`pcard${live === i ? ' is-live' : ''}`}
              key={layer.id}
            >
              <header>
                <span className="pcard-k">{layer.label}</span>
                {layer.id === 'frontend' && top && (
                  <span className="pcard-live">
                    <i />
                    {top.name} {top.percent.toFixed(0)}%
                  </span>
                )}
              </header>

              <ul className="pcard-stack">
                {layer.items.map((item, k) => (
                  <li
                    key={item}
                    style={
                      reduced
                        ? undefined
                        : ({ ['--i' as string]: k } as React.CSSProperties)
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <footer>{layer.proof}</footer>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
