'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { blurFor } from '@/data/blur';
import { projects } from '@/data/resume';
import type { Project } from '@/data/resume';
import { clamp, createSpring, prefersReducedMotion } from '@/lib/spring';

const N = projects.length;

/** The screen of a project: its screenshot, or the hatched plate when it has none. */
function Screen({ p, priority }: { p: Project; priority?: boolean }) {
  if (p.image) {
    return (
      <Image
        src={p.image}
        alt=""
        fill
        sizes="(max-width: 900px) 92vw, 960px"
        quality={92}
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
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="wk-visit"
    >
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
        let s: number;
        let veil: number;
        let z: number;
        if (d > 0) {
          /* Slides in from the right edge, easing out as it lands. It is never
             translucent, so nothing underneath shows through it. */
          tx = Math.pow(Math.min(d, 1), 1.7) * 112;
          s = 1;
          veil = 0;
          z = 200 - Math.round(d);
        } else {
          /* The card it covers eases left and dims, then is dropped once hidden. */
          tx = d * 14;
          s = 1 - Math.min(ad, 1) * 0.05;
          veil = clamp(ad * 0.85, 0, 0.85);
          z = 100 + i;
        }
        el.style.transform = `translate3d(${tx.toFixed(
          2
        )}%,0,0) scale(${s.toFixed(4)})`;
        el.style.visibility = d <= -1 || d >= 2 ? 'hidden' : 'visible';
        el.style.zIndex = String(z);
        el.style.setProperty('--veil', veil.toFixed(3));
        el.style.setProperty('--pan', `${(clamp(d, -1, 1) * -4).toFixed(2)}%`);
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
      <div className="wk-track" ref={trackRef} style={{ ['--n' as string]: N }}>
        <div className="wk-pin">
          <div className="wrap">
            <div className="head">
              <h2 id="wk-title">Selected work</h2>
              <span className="idx">
                {active + 1} of {N} · scroll to slide
              </span>
            </div>

            <div className="wk-grid">
              <div className="wk-names">
                <div className="wk-list">
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
                <div className="wk-detail" key={cur.name} aria-live="polite">
                  <div className="kpi">{cur.kpi}</div>
                  <p>{cur.blurb}</p>
                  {cur.tools.length > 0 && (
                    <div className="tools">
                      {cur.tools.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link p={cur} />
                </div>
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
