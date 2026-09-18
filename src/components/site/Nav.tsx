'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { createSpring, haptic, project, rubberband, velocityFrom } from '@/lib/spring';
import type { Sample } from '@/lib/spring';
import { profile, sections } from '@/data/resume';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const lozRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const setOpenRef = useRef<(next: boolean, velocity?: number) => void>(() => {});

  /* ── the lozenge: x and width on independent springs ──────────────── */
  const hovering = useRef<HTMLAnchorElement | null>(null);
  const active = useRef<HTMLAnchorElement | null>(null);
  const primed = useRef(false);
  const springs = useRef<{ x: ReturnType<typeof createSpring>; w: ReturnType<typeof createSpring> } | null>(null);

  const render = useCallback(() => {
    const loz = lozRef.current;
    const s = springs.current;
    if (!loz || !s) return;
    loz.style.transform = `translate3d(${s.x.value.toFixed(2)}px,0,0)`;
    loz.style.width = `${Math.max(0, s.w.value).toFixed(2)}px`;
  }, []);

  const settle = useCallback(() => {
    const el = hovering.current ?? active.current;
    const loz = lozRef.current;
    const s = springs.current;
    if (!el || !loz || !s) return;

    if (!primed.current) {
      s.x.set(el.offsetLeft);
      s.w.set(el.offsetWidth);
      render();
      loz.classList.add('live');
      primed.current = true;
      return;
    }
    s.x.to(el.offsetLeft, { damping: 1, response: 0.32 });
    s.w.to(el.offsetWidth, { damping: 1, response: 0.32 });
  }, [render]);

  useEffect(() => {
    springs.current = {
      x: createSpring(0, render),
      w: createSpring(0, render),
    };
    return () => {
      springs.current?.x.stop();
      springs.current?.w.stop();
    };
  }, [render]);

  /* ── the sheet: materialises out of its trigger, drags to dismiss ─── */
  useEffect(() => {
    const sheet = sheetRef.current;
    const scrim = scrimRef.current;
    const btn = menuRef.current;
    if (!sheet || !scrim || !btn) return;

    const paint = (raw: number) => {
      const p = Math.max(-0.12, Math.min(1.2, raw));
      const shown = 1 - p;
      /* blur, scale and position move together — a material arriving, not a fade */
      sheet.style.transform = `translate3d(0,${(p * 110).toFixed(2)}%,0) scale(${(
        0.94 + 0.06 * shown
      ).toFixed(4)})`;
      sheet.style.setProperty('--sb', `${(22 * shown).toFixed(1)}px`);
      sheet.style.opacity = Math.max(0, Math.min(1, shown * 1.6)).toFixed(3);
      sheet.style.visibility = shown > 0.002 ? 'visible' : 'hidden';
      scrim.style.opacity = (shown * 0.85).toFixed(3);
    };

    const sy = createSpring(1, paint);
    paint(1);

    const apply = (next: boolean, velocity?: number) => {
      openRef.current = next;
      setOpen(next);
      const r = btn.getBoundingClientRect();
      const sr = sheet.getBoundingClientRect();
      sheet.style.transformOrigin = `${(r.left + r.width / 2 - sr.left).toFixed(1)}px ${(
        r.top +
        r.height / 2 -
        sr.top
      ).toFixed(1)}px`;
      if (next) sheet.style.visibility = 'visible';
      sy.to(next ? 0 : 1, { damping: 0.8, response: 0.3, velocity });
      haptic(next ? 7 : 4);
    };
    setOpenRef.current = apply;

    let pid: number | null = null;
    let grab = 0;
    let history: Sample[] = [];

    const height = () => sheet.offsetHeight || 1;

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a')) return;
      sy.stop();
      pid = e.pointerId;
      sheet.setPointerCapture(pid);
      grab = e.clientY - sy.value * height();
      history = [{ t: performance.now(), p: e.clientY }];
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      const h = height();
      let p = (e.clientY - grab) / h;
      if (p < 0) p = -rubberband(-p * h, h) / h; /* resist, don't hard-stop */
      sy.set(p);
      paint(p);
      history.push({ t: performance.now(), p: e.clientY });
      if (history.length > 8) history.shift();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      try {
        sheet.releasePointerCapture(pid);
      } catch {
        /* capture may already be gone */
      }
      pid = null;
      const v = velocityFrom(history) / height();
      const landing = sy.value + project(v, 0.995);
      /* velocity sign decides first; position only breaks the tie */
      apply(!(v > 0.6 || landing > 0.42), v);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openRef.current) apply(false);
    };

    sheet.addEventListener('pointerdown', onDown);
    sheet.addEventListener('pointermove', onMove);
    sheet.addEventListener('pointerup', onUp);
    sheet.addEventListener('pointercancel', onUp);
    document.addEventListener('keydown', onKey);

    return () => {
      sheet.removeEventListener('pointerdown', onDown);
      sheet.removeEventListener('pointermove', onMove);
      sheet.removeEventListener('pointerup', onUp);
      sheet.removeEventListener('pointercancel', onUp);
      document.removeEventListener('keydown', onKey);
      sy.stop();
    };
  }, []);

  /* ── one scroll loop: bar condensation + wayfinding ───────────────── */
  useEffect(() => {
    const nav = navRef.current;
    const loz = lozRef.current;
    if (!nav || !loz) return;

    const links = Array.from(nav.querySelectorAll('a'));
    const targets = links.map((a) =>
      document.querySelector(a.getAttribute('href') ?? '')
    ) as (HTMLElement | null)[];

    let ticking = false;
    const frame = () => {
      ticking = false;
      document.documentElement.style.setProperty(
        '--cond',
        Math.max(0, Math.min(1, window.scrollY / 110)).toFixed(3)
      );

      const y = window.scrollY + window.innerHeight * 0.34;
      let idx = -1;
      targets.forEach((el, i) => {
        if (el && el.offsetTop <= y) idx = i;
      });
      const next = idx >= 0 ? links[idx] : null;
      if (next !== active.current) {
        active.current = next;
        links.forEach((a) => a.classList.toggle('on', a === next));
        loz.style.setProperty('--ax', next ? '1' : '0');
        if (!hovering.current) settle();
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    const onResize = () => {
      primed.current = false;
      settle();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    frame();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [settle]);

  return (
    <>
      <header className="bar" ref={barRef}>
        <div className="wrap">
          <a className="mark" href="#top">
            FAROUK <span>/ {profile.title.toLowerCase()}</span>
          </a>

          <nav className="nav" ref={navRef} aria-label="Sections">
            <span className="loz" ref={lozRef} aria-hidden="true" />
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onPointerEnter={(e) => {
                  hovering.current = e.currentTarget;
                  settle();
                }}
                onPointerLeave={(e) => {
                  if (hovering.current === e.currentTarget) hovering.current = null;
                  settle();
                }}
                onClick={() => haptic(5)}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <span className="pill">
            <span className="dot" aria-hidden="true" />
            Open to roles
          </span>

          <button
            className="menubtn"
            ref={menuRef}
            type="button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpenRef.current(!openRef.current)}
          >
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={open ? 'scrim live' : 'scrim'}
        ref={scrimRef}
        onClick={() => setOpenRef.current(false)}
      />

      <div className="sheet" ref={sheetRef} role="dialog" aria-label="Sections">
        <div className="grab" aria-hidden="true" />
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={() => setOpenRef.current(false)}>
            {s.label}
            <em>{s.note}</em>
          </a>
        ))}
      </div>
    </>
  );
}
