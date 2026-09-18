import DashGrid from './DashGrid';
import type { WakaSnapshot } from '@/lib/wakatime';

/**
 * An isometric plane bleeding off the right edge of the hero.
 *
 * The trick is borrowed — a rotateX/rotateZ plane over a graph-paper grid,
 * faded out with two intersecting mask gradients. What sits on it is not:
 * instead of floating tech-stack logos, these are the three systems this CV is
 * actually about, and the first card reads the live WakaTime figure, so the
 * plane shows real data rather than decoration.
 */
export default function HeroPlane({ data }: { data: WakaSnapshot }) {
  const top = data.languages[0];

  return (
    <div className="plane" aria-hidden="true">
      <div className="plane-inner">
        <DashGrid className="plane-grid" width={1120} height={700} spacing={28} />

        <div className="plane-deck">
          {/* 1 — telemetry, fed by the same WakaTime snapshot as the readout */}
          <article className="pcard">
            <header>
              <span className="pcard-k">Tracked</span>
              <span className="pcard-dot" />
            </header>
            <strong className="pcard-fig">{data.totals?.total ?? '—'}</strong>
            <div className="pcard-bars">
              {[0.72, 0.31, 0.18, 0.11].map((w, i) => (
                <i key={i} style={{ transform: `scaleX(${w})` }} />
              ))}
            </div>
            <span className="pcard-sub">
              {top ? `${top.name} ${top.percent.toFixed(0)}%` : 'via WakaTime'}
            </span>
          </article>

          {/* 2 — logistics: the ERP route work */}
          <article className="pcard">
            <header>
              <span className="pcard-k">Fleet</span>
            </header>
            <svg viewBox="0 0 120 64" fill="none" className="pcard-art">
              <path
                d="M6 52 C26 52 24 20 46 20 S72 46 92 46 110 30 114 26"
                stroke="var(--accent)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {[
                [6, 52],
                [46, 20],
                [92, 46],
                [114, 26],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={i === 0 ? 3.2 : 2.2}
                  fill={i === 0 ? 'var(--accent)' : 'var(--ink-raised)'}
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
              ))}
            </svg>
            <span className="pcard-sub">11 PLC · Ardova</span>
          </article>

          {/* 3 — retrieval: the RAG pipeline */}
          <article className="pcard">
            <header>
              <span className="pcard-k">Retrieval</span>
            </header>
            <svg viewBox="0 0 120 64" fill="none" className="pcard-art">
              <path d="M22 32H54M66 32H98" stroke="var(--mute-dim)" strokeWidth="1.2" strokeDasharray="3 3" />
              {[22, 60, 98].map((cx, i) => (
                <rect
                  key={cx}
                  x={cx - 11}
                  y={21}
                  width="22"
                  height="22"
                  rx="6"
                  fill="var(--ink-raised)"
                  stroke={i === 1 ? 'var(--accent)' : 'var(--line)'}
                  strokeWidth="1.2"
                />
              ))}
              <circle cx="60" cy="32" r="3.4" fill="var(--accent)" />
            </svg>
            <span className="pcard-sub">Vector → LLM → answer</span>
          </article>
        </div>
      </div>
    </div>
  );
}
