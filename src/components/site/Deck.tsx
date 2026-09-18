'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import {
  clamp,
  createSpring,
  haptic,
  prefersReducedMotion,
  project,
  rubberband,
  velocityFrom,
} from '@/lib/spring';
import type { Sample } from '@/lib/spring';
import { projects } from '@/data/resume';

export default function Deck() {
  const vpRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const vp = vpRef.current;
    const deck = deckRef.current;
    const rail = railRef.current;
    if (!vp || !deck) return;

    const cards = Array.from(deck.children) as HTMLElement[];
    let minX = 0;
    const maxX = 0;
    let snaps: number[] = [0];
    let aimIdx = -1;

    const apply = (x: number) => {
      deck.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      if (rail) {
        const span = Math.abs(minX) || 1;
        rail.style.transform = `scaleX(${(
          0.22 +
          clamp(-x / span, 0, 1) * 0.78
        ).toFixed(4)})`;
      }
    };

    /* Fast motion reads better with a little stretch than a hard sharp streak. */
    const stretch = (v: number) => {
      const st = prefersReducedMotion() ? 0 : clamp(Math.abs(v) / 26000, 0, 0.03);
      deck.style.setProperty('--stretch', (1 + st).toFixed(4));
    };

    const spring = createSpring(0, (x, v) => {
      apply(x);
      stretch(v);
    });

    const measure = () => {
      minX = Math.min(0, vp.clientWidth - deck.scrollWidth);
      snaps = cards.map((c) => clamp(-c.offsetLeft, minX, maxX));
      apply(clamp(spring.value, minX, maxX));
    };

    const nearestIdx = (x: number) => {
      let best = 0;
      let dist = Infinity;
      snaps.forEach((p, i) => {
        const d = Math.abs(p - x);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      return best;
    };

    /* Telegraph the landing card while the gesture is still happening. */
    const aim = (i: number) => {
      if (i === aimIdx) return;
      aimIdx = i;
      cards.forEach((c, k) => c.classList.toggle('aim', k === i));
    };

    let pending = false;
    let dragging = false;
    let pid: number | null = null;
    let grab = 0;
    let history: Sample[] = [];
    let moved = 0;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      spring.stop(); /* grab it mid-flight; value and velocity survive */
      pending = true;
      dragging = false;
      pid = e.pointerId;
      moved = 0;
      grab = e.clientX - spring.value;
      history = [{ t: performance.now(), p: e.clientX }];
    };

    const onMove = (e: PointerEvent) => {
      if (!pending || e.pointerId !== pid) return;
      const dx = e.clientX - history[0].p;
      moved = Math.max(moved, Math.abs(dx));

      if (!dragging) {
        if (Math.abs(dx) < 10) return; /* hysteresis before committing */
        dragging = true;
        vp.classList.add('dragging');
        vp.setPointerCapture(pid);
        grab = e.clientX - spring.value; /* re-anchor, so there is no jump */
      }

      const raw = e.clientX - grab;
      let x = raw;
      if (raw > maxX) x = maxX + rubberband(raw - maxX, vp.clientWidth);
      else if (raw < minX) x = minX - rubberband(minX - raw, vp.clientWidth);

      spring.set(x);
      apply(x);

      history.push({ t: performance.now(), p: e.clientX });
      if (history.length > 8) history.shift();

      const v = velocityFrom(history);
      stretch(v);
      aim(nearestIdx(clamp(x + project(v), minX, maxX)));
      e.preventDefault();
    };

    const onUp = (e: PointerEvent) => {
      if (!pending || (pid !== null && e.pointerId !== pid)) return;
      pending = false;
      if (!dragging) {
        pid = null;
        return;
      }
      dragging = false;
      vp.classList.remove('dragging');
      try {
        if (pid !== null) vp.releasePointerCapture(pid);
      } catch {
        /* capture may already be gone */
      }
      pid = null;

      const v = velocityFrom(history);
      const i = nearestIdx(clamp(spring.value + project(v), minX, maxX));
      aim(i);
      spring.to(snaps[i], {
        velocity: v,
        damping: Math.abs(v) > 60 ? 0.8 : 1, /* bounce only after a flick */
        response: 0.4,
        onRest: () => {
          stretch(0);
          aim(-1);
          haptic(6);
        },
      });
    };

    const onClick = (e: MouseEvent) => {
      if (moved > 10) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const i = nearestIdx(spring.value);
      if (e.key === 'ArrowRight') {
        spring.to(snaps[Math.min(snaps.length - 1, i + 1)], {
          damping: 1,
          response: 0.4,
          onRest: () => haptic(6),
        });
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') {
        spring.to(snaps[Math.max(0, i - 1)], {
          damping: 1,
          response: 0.4,
          onRest: () => haptic(6),
        });
        e.preventDefault();
      }
    };

    let idle: number | undefined;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      spring.stop();
      spring.set(clamp(spring.value - e.deltaX, minX - 60, maxX + 60));
      apply(spring.value);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        spring.to(snaps[nearestIdx(clamp(spring.value, minX, maxX))], {
          damping: 1,
          response: 0.4,
        });
      }, 110);
    };

    vp.addEventListener('pointerdown', onDown);
    vp.addEventListener('pointermove', onMove, { passive: false });
    vp.addEventListener('pointerup', onUp);
    vp.addEventListener('pointercancel', onUp);
    vp.addEventListener('click', onClick, true);
    vp.addEventListener('keydown', onKey);
    vp.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', measure);

    measure();
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      vp.removeEventListener('pointerdown', onDown);
      vp.removeEventListener('pointermove', onMove);
      vp.removeEventListener('pointerup', onUp);
      vp.removeEventListener('pointercancel', onUp);
      vp.removeEventListener('click', onClick, true);
      vp.removeEventListener('keydown', onKey);
      vp.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', measure);
      window.clearTimeout(idle);
      spring.stop();
    };
  }, []);

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="head">
          <h2>Selected work</h2>
          <span className="idx">drag · flick · or use ← →</span>
        </div>
      </div>

      <div className="wrap">
        <div
          className="deck-vp"
          ref={vpRef}
          tabIndex={0}
          role="region"
          aria-label="Selected work, draggable"
        >
          <div className="deck" ref={deckRef}>
            {projects.map((p, i) => (
              <article className="card" key={p.name}>
                {p.image ? (
                  <div className="shot">
                    <Image
                      src={p.image}
                      alt={`${p.name} interface`}
                      fill
                      sizes="(max-width: 560px) 82vw, 380px"
                      priority={i < 2}
                      draggable={false}
                    />
                  </div>
                ) : (
                  <div className="plate">
                    <span className="m">{p.plate?.top}</span>
                    <span className="big">{p.plate?.big}</span>
                    <span className="m">{p.plate?.bottom}</span>
                  </div>
                )}
                <div className="bd">
                  <h3>
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                    {p.domain && <span className="ext">{p.domain}</span>}
                  </h3>
                  <p>{p.blurb}</p>
                  <div className="kpi">{p.kpi}</div>
                  <div className="tools">
                    {p.tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="deck-ft">
          <div className="rail">
            <i ref={railRef} style={{ transform: 'scaleX(0.25)' }} />
          </div>
          <span className="hint">
            1:1 tracking · momentum projected · aim highlighted
          </span>
        </div>
      </div>
    </section>
  );
}
