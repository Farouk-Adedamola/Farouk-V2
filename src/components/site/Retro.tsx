'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import DashGrid from './DashGrid';
import { blurFor } from '@/data/blur';
import { retros } from '@/data/retro';
import { createSpring, haptic } from '@/lib/spring';

/**
 * One entry per year. Every year is in the HTML so it stays crawlable and
 * linkable; only the selected one is shown, because six full retros inline
 * would double the length of a page that is already long.
 */
export default function Retro() {
  const [active, setActive] = useState(0);

  const railRef = useRef<HTMLDivElement>(null);
  const lozRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const xSpring = useRef<ReturnType<typeof createSpring> | null>(null);
  const wSpring = useRef<ReturnType<typeof createSpring> | null>(null);
  const hSpring = useRef<ReturnType<typeof createSpring> | null>(null);
  const primed = useRef(false);

  /* The rail marker rides two independent springs, same as the nav lozenge. */
  const drawLozenge = useCallback(() => {
    const loz = lozRef.current;
    if (!loz || !xSpring.current || !wSpring.current) return;
    loz.style.transform = `translate3d(${xSpring.current.value.toFixed(2)}px,0,0)`;
    loz.style.width = `${Math.max(0, wSpring.current.value).toFixed(2)}px`;
  }, []);

  const settle = useCallback(
    (index: number) => {
      const rail = railRef.current;
      const stage = stageRef.current;
      if (!rail || !xSpring.current || !wSpring.current) return;

      const button = rail.querySelectorAll('button')[index] as HTMLElement;
      if (button) {
        if (!primed.current) {
          xSpring.current.set(button.offsetLeft);
          wSpring.current.set(button.offsetWidth);
          drawLozenge();
          lozRef.current?.classList.add('live');
          primed.current = true;
        } else {
          xSpring.current.to(button.offsetLeft, { damping: 1, response: 0.32 });
          wSpring.current.to(button.offsetWidth, { damping: 1, response: 0.32 });
        }
      }

      /* Years have different amounts to say, so the stage springs to fit. */
      const panel = panelRefs.current[index];
      if (panel && stage && hSpring.current) {
        if (!stage.style.height) stage.style.height = `${panel.offsetHeight}px`;
        hSpring.current.to(panel.offsetHeight, { damping: 1, response: 0.4 });
      }
    },
    [drawLozenge]
  );

  useEffect(() => {
    xSpring.current = createSpring(0, drawLozenge);
    wSpring.current = createSpring(0, drawLozenge);
    hSpring.current = createSpring(0, (h) => {
      if (stageRef.current) stageRef.current.style.height = `${Math.max(0, h)}px`;
    });
    settle(0);

    const onResize = () => {
      primed.current = false;
      settle(active);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      xSpring.current?.stop();
      wSpring.current?.stop();
      hSpring.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    settle(active);
  }, [active, settle]);

  const current = retros[active];

  return (
    <section className="section retro" id="retro">
      <div className="wrap">
        <div className="head">
          <h2>Retro</h2>
          <span className="idx">
            one per year · {retros.length} so far
          </span>
        </div>

        <div className="retro-rail" ref={railRef} role="tablist" aria-label="Year">
          <span className="loz" ref={lozRef} aria-hidden="true" />
          {retros.map((r, i) => (
            <button
              key={r.year}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`retro-${r.year}`}
              className={i === active ? 'on' : undefined}
              onClick={() => {
                setActive(i);
                haptic(5);
              }}
            >
              {r.year}
            </button>
          ))}
        </div>

        <p className="retro-theme">{current.theme}</p>

        <div className="retro-stage" ref={stageRef}>
          {retros.map((r, i) => (
            <div
              className="retro-panel"
              key={r.year}
              id={`retro-${r.year}`}
              role="tabpanel"
              aria-label={`${r.year} retro`}
              hidden={i !== active}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
            >
              <div className="retro-grid">
                <div className="retro-col">
                  <h3>Highlights</h3>
                  <ul>
                    {r.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="retro-col">
                  <h3>What I learnt</h3>
                  <ul>
                    {r.learnt.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div className="retro-col">
                  <h3>Getting better at</h3>
                  <ul>
                    {r.improving.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="retro-shots">
                {r.images?.length ? (
                  r.images.map((img) => (
                    <figure key={img.src}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 860px) 100vw, 33vw"
                        placeholder={blurFor(img.src) ? 'blur' : 'empty'}
                        blurDataURL={blurFor(img.src)}
                      />
                    </figure>
                  ))
                ) : (
                  <figure className="retro-empty">
                    <DashGrid width={320} height={180} spacing={20} />
                    <span>{r.year} — no photos yet</span>
                  </figure>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
