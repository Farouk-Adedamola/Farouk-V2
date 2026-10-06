'use client';

import { useEffect, useId, useRef } from 'react';

import { clamp, prefersReducedMotion } from '@/lib/spring';
import type { WakaLanguage, WakaSnapshot } from '@/lib/wakatime';

/* The field is composed on a 1100 × 620 board. Centres are hand-placed, so the
   scatter is deliberate and identical on every visit; a random scatter would
   reshuffle on each load and sooner or later stack two badges on each other. */
const BOARD = { w: 1100, h: 620 };

const SEALS = [
  { x: 190, y: 300, d: 236, depth: 1 },
  { x: 560, y: 190, d: 212, depth: 1.25 },
  { x: 905, y: 362, d: 212, depth: 0.9 },
];

/* Ordered by prominence: the biggest language takes the first slot. */
const COINS = [
  { x: 385, y: 445, depth: 1.5 },
  { x: 735, y: 500, depth: 0.8 },
  { x: 785, y: 62, depth: 1.35 },
  { x: 372, y: 92, depth: 0.7 },
  { x: 1012, y: 160, depth: 1.1 },
  { x: 570, y: 582, depth: 0.6 },
  { x: 62, y: 92, depth: 1.2 },
  { x: 82, y: 522, depth: 0.75 },
  { x: 1050, y: 545, depth: 1.45 },
];

const pos = (x: number, y: number) => ({
  left: `${((x / BOARD.w) * 100).toFixed(3)}%`,
  top: `${((y / BOARD.h) * 100).toFixed(3)}%`,
});

/** "3,412 hrs 24 mins" → ["3,412", "hrs 24 mins"], so the number can be set large. */
function split(value: string): [string, string] {
  const m = value.match(/^(\S+)\s*(.*)$/);
  return m ? [m[1], m[2]] : [value, ''];
}

const coinSize = (percent: number) =>
  Math.round(clamp(66 + Math.sqrt(Math.max(percent, 0)) * 15, 84, 156));

function Seal({
  label,
  value,
  sub,
  live,
}: {
  label: string;
  value: string;
  sub: string;
  live?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const [big, rest] = split(value);

  return (
    <>
      <span className="sr-only">
        {label}: {value}. {sub}
      </span>
      <svg className="rb-svg" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id={id} d="M 26 100 A 74 74 0 0 1 174 100" />
        </defs>
        <circle className="rb-disc" cx="100" cy="100" r="98" />
        <g className="rb-ticks">
          {Array.from({ length: 60 }, (_, k) => (
            <line
              key={k}
              x1="100"
              y1="5"
              x2="100"
              y2={k % 5 === 0 ? 12 : 9}
              transform={`rotate(${k * 6} 100 100)`}
            />
          ))}
        </g>
        <circle
          className={live ? 'rb-orbit live' : 'rb-orbit'}
          cx="100"
          cy="100"
          r="84"
        />
        <text className="rb-arc-text">
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
            {label.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <div className="rb-face" aria-hidden="true">
        <b>{big}</b>
        {rest && <i>{rest}</i>}
        <small>{sub}</small>
      </div>
    </>
  );
}

function Coin({ lang, top }: { lang: WakaLanguage; top: boolean }) {
  return (
    <>
      <span className="sr-only">
        {lang.name}: {lang.percent.toFixed(1)}% of tracked time
      </span>
      <svg className="rb-svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="rb-disc" cx="50" cy="50" r="49" />
        <circle className="rb-track" cx="50" cy="50" r="43" />
        <circle
          className={top ? 'rb-arc live' : 'rb-arc'}
          cx="50"
          cy="50"
          r="43"
          pathLength={100}
          style={{ ['--arc' as string]: Math.max(lang.percent, 1.2).toFixed(2) }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="rb-face coin-face" aria-hidden="true">
        <b>{lang.name}</b>
        <small>{lang.percent.toFixed(1)}%</small>
      </div>
    </>
  );
}

export default function Readout({ data }: { data: WakaSnapshot }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const { totals, languages, unavailable } = data;
  const coins = languages.slice(0, COINS.length);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const reduced = prefersReducedMotion();

    /* Reveal once, as the field scrolls into view. */
    let io: IntersectionObserver | undefined;
    if (reduced || !('IntersectionObserver' in window)) {
      field.classList.add('in');
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            field.classList.add('in');
            io?.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(field);
    }

    /* Cursor drift: every badge sits at its own depth, so nearer ones travel
       further than distant ones and the field reads as layers, not a flat grid. */
    const wide = window.matchMedia('(min-width: 1000px) and (pointer: fine)');
    const layers = Array.from(
      field.querySelectorAll<HTMLElement>('[data-depth]')
    );
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf: number | null = null;

    const frame = () => {
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      layers.forEach((el) => {
        const depth = Number(el.dataset.depth);
        el.style.transform = `translate3d(${(cx * depth * 26).toFixed(2)}px,${(
          cy * depth * 20
        ).toFixed(2)}px,0)`;
      });
      const settled =
        Math.abs(tx - cx) < 0.002 && Math.abs(ty - cy) < 0.002 && !tx && !ty;
      raf = settled ? null : requestAnimationFrame(frame);
    };
    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = field.getBoundingClientRect();
      tx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      ty = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    if (!reduced && wide.matches) {
      field.addEventListener('pointermove', onMove);
      field.addEventListener('pointerleave', onLeave);
    }

    return () => {
      io?.disconnect();
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerleave', onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [data]);

  const seals = [
    {
      label: 'Total tracked',
      value: totals?.total ?? '—',
      sub: totals?.since ? `since ${totals.since}` : 'awaiting data',
      live: true,
    },
    {
      label: 'Daily average',
      value: totals?.dailyAverage ?? '—',
      sub: totals?.activeDays
        ? `${totals.activeDays.toLocaleString('en-GB')} active days`
        : 'awaiting data',
    },
    {
      label: 'Best day',
      value: totals?.bestDay ?? '—',
      sub: totals?.bestDayDate || 'no data yet',
    },
  ];

  return (
    <section className="wrap section" id="readout">
      <div className="head">
        <h2>Readout</h2>
        <span className="idx">
          {totals?.rangeLabel ?? 'Tracked'} · via WakaTime
        </span>
      </div>

      {unavailable && <span className="tag">feed unavailable</span>}

      <div className="rb-field" ref={fieldRef}>
        {seals.map((s, i) => (
          <div
            className="rb rb-seal"
            key={s.label}
            style={{
              ...pos(SEALS[i].x, SEALS[i].y),
              ['--d' as string]: SEALS[i].d,
              ['--i' as string]: i,
              ['--f' as string]: `${7 + i * 1.3}s`,
            }}
          >
            <div className="rb-in" data-depth={SEALS[i].depth}>
              <Seal {...s} />
            </div>
          </div>
        ))}

        {coins.map((lang, i) => (
          <div
            className="rb rb-coin"
            key={lang.name}
            style={{
              ...pos(COINS[i].x, COINS[i].y),
              ['--d' as string]: coinSize(lang.percent),
              ['--i' as string]: i + 3,
              ['--f' as string]: `${6 + ((i * 7) % 5) * 0.9}s`,
            }}
          >
            <div className="rb-in" data-depth={COINS[i].depth}>
              <Coin lang={lang} top={i === 0} />
            </div>
          </div>
        ))}

        {coins.length === 0 && (
          <p className="rb-empty">
            Language breakdown unavailable — check the WakaTime share URLs.
          </p>
        )}
      </div>
    </section>
  );
}
