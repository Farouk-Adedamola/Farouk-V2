'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { roles } from '@/data/resume';
import { clamp, createSpring, prefersReducedMotion } from '@/lib/spring';

/**
 * No accordion — every role is readable at rest. Beside them sits a time ruler
 * drawn to scale: each role is a bar of its true length, gaps included. A lit
 * caliper tracks the role in view and stretches from one tenure to the next as
 * you scroll, so the line is information, not decoration.
 */

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const START = 2021 * 12; /* ruler begins January 2021 */
const mIdx = (year: number, month: number) => year * 12 + month;
const labelOf = (i: number) => `${MONTHS[i % 12]} ${Math.floor(i / 12)}`;

/** "Dec 2025 — Present" → inclusive start month, exclusive end month. */
function parsePeriod(period: string, nowIdx: number) {
  const m = period.match(
    /([A-Za-z]{3})[a-z]*\s+(\d{4})\s*[—–-]\s*(?:(Present)|([A-Za-z]{3})[a-z]*\s+(\d{4}))/
  );
  const monthOf = (s: string) =>
    Math.max(0, MONTHS.indexOf(s.slice(0, 3).toUpperCase()));
  if (!m) return { start: START, end: START + 1, present: false };
  const start = mIdx(Number(m[2]), monthOf(m[1]));
  const present = Boolean(m[3]);
  const end = present ? nowIdx + 1 : mIdx(Number(m[5]), monthOf(m[4])) + 1;
  return { start, end, present };
}

function tenure(months: number) {
  const y = Math.floor(months / 12);
  const mo = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (mo || !y) parts.push(`${mo} mo${mo === 1 ? '' : 's'}`);
  return parts.join(' ');
}

const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Work() {
  const tlRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<HTMLDivElement>(null);
  const flagsRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);

  const board = useMemo(() => {
    const now = new Date();
    const nowIdx = mIdx(now.getFullYear(), now.getMonth());
    const end = nowIdx + 1;
    const total = end - START;
    const pct = (months: number) => (months / total) * 100;

    const spans = roles.map((r) => {
      const p = parsePeriod(r.period, nowIdx);
      return {
        ...p,
        top: pct(end - p.end),
        height: pct(p.end - p.start),
      };
    });

    const ticks = Array.from({ length: total + 1 }, (_, k) => {
      const t = START + k;
      return { t, top: pct(end - t), year: t % 12 === 0, qtr: t % 3 === 0 };
    });

    return { spans, ticks, end, nowIdx };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    const lit = litRef.current;
    const hot = hotRef.current;
    const flags = flagsRef.current;
    if (!tl || !lit || !hot || !flags) return;

    const jobs = Array.from(tl.querySelectorAll<HTMLElement>('.job'));
    const { spans } = board;
    const n = jobs.length;
    let shown = -1;

    const render = (p: number) => {
      const i0 = clamp(Math.floor(p), 0, Math.max(0, n - 2));
      const a = spans[i0];
      const b = spans[Math.min(n - 1, i0 + 1)];
      /* Hold on a role through most of its scroll, morph near the boundary. */
      const e = n > 1 ? smooth(clamp((p - i0 - 0.2) / 0.6, 0, 1)) : 0;
      const top = a.top + (b.top - a.top) * e;
      const height = a.height + (b.height - a.height) * e;

      lit.style.top = `${top.toFixed(3)}%`;
      lit.style.height = `${height.toFixed(3)}%`;
      hot.style.clipPath = `inset(${top.toFixed(3)}% 0 ${(
        100 -
        top -
        height
      ).toFixed(3)}% 0)`;
      flags.style.setProperty('--t', `${top.toFixed(3)}%`);
      flags.style.setProperty('--b', `${(top + height).toFixed(3)}%`);

      const idx = clamp(Math.round(p), 0, n - 1);
      if (idx !== shown) {
        shown = idx;
        setCur(idx);
        jobs.forEach((j, k) => j.classList.toggle('on', k === idx));
      }
    };

    const spring = createSpring(0, (x) => render(x));
    const reduced = prefersReducedMotion();

    const target = () => {
      const line = window.innerHeight * 0.45;
      const tops = jobs.map((j) => j.getBoundingClientRect().top);
      if (line <= tops[0]) return 0;
      for (let i = 0; i < n - 1; i++) {
        if (line < tops[i + 1]) {
          return i + (line - tops[i]) / Math.max(1, tops[i + 1] - tops[i]);
        }
      }
      return n - 1;
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const t = target();
        if (reduced) {
          spring.set(t);
          render(t);
        } else {
          spring.to(t, { damping: 1, response: 0.3 });
        }
      });
    };

    const t0 = target();
    spring.set(t0);
    render(t0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      spring.stop();
    };
  }, [board]);

  const span = board.spans[cur];
  const startLabel = labelOf(span.start);
  const endLabel = span.present ? 'NOW' : labelOf(span.end - 1);

  const ticks = (
    <>
      {board.ticks.map((tk) => (
        <i
          key={tk.t}
          className={tk.year ? 'tk yr' : tk.qtr ? 'tk q' : 'tk'}
          style={{ top: `${tk.top.toFixed(3)}%` }}
        />
      ))}
    </>
  );

  return (
    <section className="wrap section" id="work">
      <div className="head">
        <h2>Work</h2>
        <span className="idx">2021 → present · {roles.length} roles</span>
      </div>

      <div className="tl" ref={tlRef}>
        <div className="ruler" aria-hidden="true">
          <div className="rl-spine" />
          {board.spans.map((s, i) => (
            <span
              className="rl-role"
              key={i}
              style={{ top: `${s.top}%`, height: `${s.height}%` }}
            />
          ))}

          <div className="rl-ticks">{ticks}</div>
          <div className="rl-ticks hot" ref={hotRef}>
            {ticks}
          </div>

          {board.ticks
            .filter((tk) => tk.year)
            .map((tk) => (
              <span
                className="rl-year"
                key={tk.t}
                style={{ top: `${tk.top}%` }}
              >
                {Math.floor(tk.t / 12)}
              </span>
            ))}

          <span className="rl-now" />
          <div className="rl-lit" ref={litRef} />

          <div className="rl-flags" ref={flagsRef}>
            <span className="fl top">{endLabel}</span>
            <span className="fl mid">{tenure(span.end - span.start)}</span>
            <span className="fl bot">{startLabel}</span>
          </div>
        </div>

        <div className="jobs">
          {roles.map((role) => (
            <article className="job" key={`${role.company}-${role.period}`}>
              <div className="meta">
                <div className="yr">{role.period}</div>
                <h3 className="ttl">{role.title}</h3>
                <div className="co">{role.company}</div>
                <div className="loc">{role.location}</div>
              </div>
              <div className="det">
                <ul>
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="tools">
                  {role.tools.map((tool) => (
                    <span className="chip" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
