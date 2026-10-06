'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { clamp, createSpring, prefersReducedMotion } from '@/lib/spring';
import { blurFor } from '@/data/blur';
import { projects } from '@/data/resume';
import type { Project } from '@/data/resume';

const N = projects.length;

/** The screen of a project: its screenshot, or the hatched plate when it has none. */
function Screen({ p, priority }: { p: Project; priority?: boolean }) {
  if (p.image) {
    return (
      <Image
        src={p.image}
        alt=""
        fill
        sizes="(max-width: 900px) 92vw, 640px"
        priority={priority}
        placeholder={blurFor(p.image) ? 'blur' : 'empty'}
        blurDataURL={blurFor(p.image)}
        draggable={false}
      />
    );
  }
  return (
    <div className="wk-blank">
      <span className="m">{p.plate?.top}</span>
      <span className="big">{p.plate?.big}</span>
      <span className="m">{p.plate?.bottom}</span>
    </div>
  );
}

function Link({ p }: { p: Project }) {
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="wk-visit">
      Open {p.domain} <span aria-hidden="true">↗</span>
    </a>
  ) : null;
}

export default function Deck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia('(min-width: 901px)');
    let shown = -1;
    let teardown: (() => void) | undefined;

    /* Everything on screen is a pure function of one number: how many cards
       into the stack we are. Fractional, so the cards are always mid-flight. */
    const render = (p: number) => {
      plateRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = i - p;
        const ad = Math.abs(d);
        let tx: number;
        let ty: number;
        let rx: number;
        let rz: number;
        let s: number;
        let o: number;
        if (d <= 0) {
          /* Peeled off the top: lifts, tips back, and fades. */
          tx = d * 14;
          ty = d * 64;
          rx = ad * 14;
          rz = d * 1.6;
          s = 1 - ad * 0.05;
          o = clamp(1 - ad * 1.7, 0, 1);
        } else {
          /* Waiting underneath, stepped down and to the right. */
          tx = d * 26;
          ty = d * 22;
          rx = 0;
          rz = 0;
          s = 1 - d * 0.06;
          o = clamp(1 - Math.max(0, d - 1) * 0.5, 0, 1);
        }
        el.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(
          2
        )}px,0) rotateX(${rx.toFixed(2)}deg) rotateZ(${rz.toFixed(
          2
        )}deg) scale(${s.toFixed(4)})`;
        el.style.opacity = o.toFixed(3);
        el.style.zIndex = String(d <= 0 ? 100 + i : 50 - Math.round(d));
        el.style.setProperty('--veil', clamp(d * 0.5, 0, 0.8).toFixed(3));
        el.style.setProperty('--pan', `${(d * -5).toFixed(2)}%`);
      });

      nameRefs.current.forEach((el, i) => {
        if (!el) return;
        const k = clamp(1 - Math.abs(i - p), 0, 1);
        el.style.fontVariationSettings = `'wdth' ${(76 + 24 * k).toFixed(
          1
        )}, 'wght' ${(360 + 440 * k).toFixed(0)}`;
        el.style.opacity = (0.3 + 0.7 * k).toFixed(3);
        el.style.setProperty('--k', k.toFixed(3));
      });

      if (railRef.current) {
        railRef.current.style.transform = `scaleY(${(
          (p + 0.0001) /
          (N - 1)
        ).toFixed(4)})`;
      }

      const idx = clamp(Math.round(p), 0, N - 1);
      if (idx !== shown) {
        shown = idx;
        setActive(idx);
      }
    };

    const setup = () => {
      teardown?.();
      teardown = undefined;
      if (!mq.matches) return;

      const reduced = prefersReducedMotion();
      const spring = createSpring(0, (x) => render(x));

      const travel = () => Math.max(1, track.offsetHeight - window.innerHeight);
      const target = () => {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / travel(), 0, 1) * (N - 1);
      };

      const onScroll = () => {
        const t = target();
        if (reduced) {
          spring.set(t);
          render(t);
        } else {
          spring.to(t, { damping: 1, response: 0.34 });
        }
      };

      spring.set(target());
      render(target());
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);

      teardown = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        spring.stop();
      };
    };

    setup();
    mq.addEventListener('change', setup);
    return () => {
      mq.removeEventListener('change', setup);
      teardown?.();
    };
  }, []);

  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (i / (N - 1)) * travel,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const cur = projects[active];

  return (
    <section className="wk" id="projects" aria-labelledby="wk-title">
      {/* Desktop: pinned, scroll deals the stack. */}
      <div
        className="wk-track"
        ref={trackRef}
        style={{ ['--n' as string]: N }}
      >
        <div className="wk-pin">
          <div className="wrap">
            <div className="head">
              <h2 id="wk-title">Selected work</h2>
              <span className="idx">
                {active + 1} of {N} · scroll to deal
              </span>
            </div>

            <div className="wk-grid">
              <div className="wk-names">
                <span className="wk-rail" aria-hidden="true">
                  <i ref={railRef} />
                </span>
                <ol>
                  {projects.map((p, i) => (
                    <li key={p.name}>
                      <button
                        type="button"
                        ref={(el) => {
                          nameRefs.current[i] = el;
                        }}
                        onClick={() => jumpTo(i)}
                        aria-current={i === active ? 'true' : undefined}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="wk-right">
                <div className="wk-stage" aria-hidden="true">
                  {projects.map((p, i) => (
                    <div
                      className="wk-plate"
                      key={p.name}
                      ref={(el) => {
                        plateRefs.current[i] = el;
                      }}
                    >
                      <div className="wk-chrome">
                        <span className="m">{p.domain ?? p.plate?.top}</span>
                      </div>
                      <div className="wk-screen">
                        <Screen p={p} priority={i < 2} />
                      </div>
                      <i className="wk-veil" />
                    </div>
                  ))}
                </div>

                <div className="wk-detail" key={cur.name} aria-live="polite">
                  <div className="kpi">{cur.kpi}</div>
                  <p>{cur.blurb}</p>
                  <div className="tools">
                    {cur.tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link p={cur} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: a plain, scannable stack. */}
      <div className="wrap wk-flat">
        <div className="head">
          <h2>Selected work</h2>
          <span className="idx">{N} projects</span>
        </div>
        <ol>
          {projects.map((p) => (
            <li key={p.name}>
              <article>
                <div className="wk-chrome">
                  <span className="m">{p.domain ?? p.plate?.top}</span>
                </div>
                <div className="wk-screen">
                  <Screen p={p} />
                </div>
                <div className="bd">
                  <h3>{p.name}</h3>
                  <div className="kpi">{p.kpi}</div>
                  <p>{p.blurb}</p>
                  <div className="tools">
                    {p.tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link p={p} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
