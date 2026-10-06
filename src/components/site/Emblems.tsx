'use client';

import { useEffect, useId, useRef } from 'react';

import { clamp, createSpring, prefersReducedMotion } from '@/lib/spring';
import type { WakaLanguage, WakaSnapshot } from '@/lib/wakatime';

/* Home positions as a percentage of the viewport, hand-placed so the scatter is
   deliberate and identical on every visit. Most sit toward the edges, where the
   page has the most air; the ones that cross content do so behind it. */
const SEALS = [
  { x: 6, y: 30, d: 236, depth: 1 },
  { x: 93, y: 20, d: 212, depth: 1.25 },
  { x: 92, y: 74, d: 212, depth: 0.9 },
];

/* Ordered by prominence: the biggest language takes the first slot. */
const COINS = [
  { x: 7, y: 88, depth: 1.5 },
  { x: 80, y: 50, depth: 0.8 },
  { x: 70, y: 8, depth: 1.35 },
  { x: 27, y: 10, depth: 0.7 },
  { x: 97, y: 46, depth: 1.1 },
  { x: 52, y: 94, depth: 0.6 },
  { x: 3, y: 58, depth: 1.2 },
  { x: 76, y: 92, depth: 0.75 },
  { x: 38, y: 52, depth: 1.45 },
];

/* The attribution tag rests this far below the top of the screen, and waits
   this far above it, which is off-screen with room to spare. */
const TAG_TOP = 70;
const TAG_OFF = -170;

const pos = (x: number, y: number) => ({ left: `${x}%`, top: `${y}%` });

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
}: {
  label: string;
  value: string;
  sub: string;
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
        <circle className="rb-orbit" cx="100" cy="100" r="84" />
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

function Coin({ lang }: { lang: WakaLanguage }) {
  return (
    <>
      <span className="sr-only">
        {lang.name}: {lang.percent.toFixed(1)}% of tracked time
      </span>
      <svg className="rb-svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="rb-disc" cx="50" cy="50" r="49" />
        <circle className="rb-track" cx="50" cy="50" r="43" />
        <circle
          className="rb-arc"
          cx="50"
          cy="50"
          r="43"
          pathLength={100}
          style={{
            ['--arc' as string]: Math.max(lang.percent, 1.2).toFixed(2),
          }}
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

export default function Emblems({ data }: { data: WakaSnapshot }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const { totals, languages } = data;
  const coins = languages.slice(0, COINS.length);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const reduced = prefersReducedMotion();
    const badges = Array.from(layer.querySelectorAll<HTMLElement>('.rb'));
    const movers = badges.map((el) => el.querySelector<HTMLElement>('.rb-in')!);

    const reveal = window.setTimeout(() => layer.classList.add('in'), 250);

    /* One shared tag for every badge, so moving from one to the next never
       makes it leave and re-enter. It drops in with a bounce when the first
       badge wakes, and only retracts once none has been awake for a moment. */
    const tag = tagRef.current;
    let tagOn = false;
    let hideTimer: number | undefined;
    const tagSpring = createSpring(TAG_OFF, (y) => {
      if (tag) tag.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
    });
    if (tag && reduced) {
      /* No travel for anyone who asked for less motion: it just fades. */
      tag.style.transform = 'translate3d(0,0,0)';
      tag.style.opacity = '0';
    }
    const setTag = (on: boolean) => {
      if (!tag) return;
      if (on) {
        window.clearTimeout(hideTimer);
        hideTimer = undefined;
        if (tagOn) return;
        tagOn = true;
        if (reduced) tag.style.opacity = '1';
        else tagSpring.to(0, { damping: 0.5, response: 0.55 });
      } else if (tagOn && hideTimer === undefined) {
        hideTimer = window.setTimeout(() => {
          hideTimer = undefined;
          tagOn = false;
          if (reduced) tag.style.opacity = '0';
          else tagSpring.to(TAG_OFF, { damping: 1, response: 0.3 });
        }, 340);
      }
    };

    /* Selected work is a pinned stage of screenshots. The badges recede for it. */
    const stage = document.getElementById('projects');
    let io: IntersectionObserver | undefined;
    if (stage && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([e]) => layer.classList.toggle('hush', e.isIntersecting),
        { rootMargin: '0px 0px 18% 0px' }
      );
      io.observe(stage);
    }

    /* Everything below runs in one loop that sleeps when nothing is moving:
       cursor drift, a slow sway tied to scroll, and the wake-up test. */
    const fine = window.matchMedia('(min-width: 1000px) and (hover: hover)');
    let px = -9999;
    let py = -9999;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let sv = window.scrollY;
    let raf: number | null = null;

    const frame = () => {
      const sy = window.scrollY;
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      sv += (sy - sv) * 0.08;

      movers.forEach((el, i) => {
        const depth = Number(el.dataset.depth);
        const sway = reduced ? 0 : Math.sin(sv * 0.0013 + i * 1.7) * 46 * depth;
        const swayX = reduced
          ? 0
          : Math.cos(sv * 0.0009 + i * 2.3) * 18 * depth;
        el.style.transform = `translate3d(${(cx * depth * 24 + swayX).toFixed(
          2
        )}px,${(cy * depth * 18 + sway).toFixed(2)}px,0)`;
      });

      /* Waking is decided by distance to the badge, not by what is under the
         cursor, so it still works where page content sits in front of it. */
      let anyAwake = false;
      badges.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const awake = Math.hypot(dx, dy) < r.width / 2 + 6;
        if (awake) anyAwake = true;
        el.classList.toggle('awake', awake);
      });
      setTag(anyAwake);

      const moving =
        Math.abs(tx - cx) > 0.002 ||
        Math.abs(ty - cy) > 0.002 ||
        Math.abs(sy - sv) > 0.5;
      raf = moving ? requestAnimationFrame(frame) : null;
    };
    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      tx = clamp((px / window.innerWidth) * 2 - 1, -1, 1);
      ty = clamp((py / window.innerHeight) * 2 - 1, -1, 1);
      kick();
    };
    const onLeave = () => {
      px = py = -9999;
      tx = ty = 0;
      kick();
    };

    window.addEventListener('scroll', kick, { passive: true });
    if (fine.matches) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }
    kick();

    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(hideTimer);
      tagSpring.stop();
      io?.disconnect();
      window.removeEventListener('scroll', kick);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [data]);

  const seals = [
    {
      label: 'Total tracked',
      value: totals?.total ?? '—',
      sub: totals?.since ? `since ${totals.since}` : 'awaiting data',
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

  if (!totals && coins.length === 0) return null;

  return (
    <>
      <div
        className="emb"
        ref={layerRef}
        role="group"
        aria-label="Coding activity, via WakaTime"
      >
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
              <Coin lang={lang} />
            </div>
          </div>
        ))}
      </div>
      <div className="emb-tag-wrap" aria-hidden="true">
        <div
          className="emb-tag"
          ref={tagRef}
          style={{ transform: `translate3d(0,${TAG_OFF}px,0)` }}
        >
          <i className="dot" />
          <span>Powered by</span>
          <b>WakaTime</b>
        </div>
      </div>
    </>
  );
}
