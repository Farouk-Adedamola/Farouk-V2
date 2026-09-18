'use client';

import { useEffect, useRef } from 'react';

import { clamp } from '@/lib/spring';
import { roles } from '@/data/resume';

/**
 * No accordion — every role is readable at rest. The spine fills 1:1 with the
 * scroll position, so it scrubs backwards when you scroll up rather than
 * playing a one-shot reveal.
 */
export default function Work() {
  const tlRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = tlRef.current;
    const spine = spineRef.current;
    if (!tl || !spine) return;

    const jobs = Array.from(tl.querySelectorAll<HTMLElement>('.job'));
    let ticking = false;

    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      const r = tl.getBoundingClientRect();

      const progress = clamp((vh * 0.62 - r.top) / Math.max(1, r.height), 0, 1);
      spine.style.setProperty('--fill', progress.toFixed(4));
      const head = r.top + r.height * progress;

      jobs.forEach((job) => {
        const jr = job.getBoundingClientRect();
        const e = clamp((vh * 0.94 - jr.top) / (vh * 0.4), 0, 1);
        job.style.setProperty('--e', e.toFixed(3));
        job.classList.toggle('reached', head >= jr.top + 8);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="wrap section" id="work">
      <div className="head">
        <h2>Work</h2>
        <span className="idx">2021 → present · {roles.length} roles</span>
      </div>

      <div className="tl" ref={tlRef}>
        <div className="spine">
          <i ref={spineRef} />
        </div>

        {roles.map((role) => (
          <article className="job" key={`${role.company}-${role.period}`}>
            <span className="node" aria-hidden="true" />
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
    </section>
  );
}
