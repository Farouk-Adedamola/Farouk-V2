'use client';

import { useEffect, useRef } from 'react';

import { prefersReducedMotion } from '@/lib/spring';
import type { WakaSnapshot } from '@/lib/wakatime';

export default function Readout({ data }: { data: WakaSnapshot }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = ref.current?.querySelectorAll<HTMLElement>('.bar-f');
    if (!bars?.length) return;
    const reduced = prefersReducedMotion();
    const timers: number[] = [];
    bars.forEach((bar, i) => {
      const pct = Number(bar.dataset.p ?? 0) / 100;
      timers.push(
        window.setTimeout(
          () => bar.style.setProperty('--p', pct.toFixed(4)),
          reduced ? 0 : 90 + i * 55
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [data]);

  const { totals, languages, unavailable } = data;

  return (
    <section className="wrap section" id="readout">
      <div className="head">
        <h2>Readout</h2>
        <span className="idx">
          {totals?.rangeLabel ?? 'Tracked'} · via WakaTime
        </span>
      </div>

      <div className="readout" ref={ref}>
        <div className="readout-top">
          <span className="m">Coding activity</span>
          {unavailable && <span className="tag">feed unavailable</span>}
        </div>

        <dl className="stats">
          <div className="stat">
            <dt>Total tracked</dt>
            <dd>{totals?.total ?? '—'}</dd>
            <div className="sub">
              {totals?.since ? `since ${totals.since}` : 'awaiting data'}
            </div>
          </div>
          <div className="stat">
            <dt>Daily average</dt>
            <dd>{totals?.dailyAverage ?? '—'}</dd>
            <div className="sub">
              {totals?.activeDays
                ? `across ${totals.activeDays.toLocaleString('en-GB')} active days`
                : 'awaiting data'}
            </div>
          </div>
          <div className="stat">
            <dt>Best day</dt>
            <dd>{totals?.bestDay ?? '—'}</dd>
            <div className="sub">{totals?.bestDayDate || 'no data yet'}</div>
          </div>
        </dl>

        <div className="langs">
          {languages.length > 0 ? (
            languages.map((lang) => (
              <div className="lang" key={lang.name}>
                <span className="nm">{lang.name}</span>
                <span className="bar-t">
                  <i className="bar-f" data-p={lang.percent.toFixed(1)} />
                </span>
                <span className="pc">{lang.percent.toFixed(1)}%</span>
              </div>
            ))
          ) : (
            <p className="empty">
              Language breakdown unavailable — check the WakaTime share URLs.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
