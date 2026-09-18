/**
 * Motion primitives, translated from Apple's "Designing Fluid Interfaces".
 *
 * A spring is described the way a designer thinks about it — damping ratio and
 * response — not as mass/stiffness/damping. It has no fixed duration: the settle
 * time emerges from the parameters, which is exactly why it can be interrupted
 * and re-targeted at any frame without a visible jump.
 */

export type SpringOptions = {
  /** 1.0 = critically damped (no overshoot). Below 1.0 overshoots. */
  damping?: number;
  /** Seconds to reach the target. Lower is snappier. Not a duration. */
  response?: number;
  /** Initial velocity, in units per second. This is the gesture hand-off. */
  velocity?: number;
  onRest?: () => void;
};

export type Spring = {
  readonly value: number;
  readonly velocity: number;
  /** Jump the presentation value without animating (used while dragging). */
  set: (v: number) => void;
  /** Halt the loop but KEEP value and velocity, so an interrupt resumes cleanly. */
  stop: () => void;
  to: (target: number, options?: SpringOptions) => void;
};

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createSpring(
  from: number,
  onUpdate: (value: number, velocity: number) => void
): Spring {
  let x = from;
  let v = 0;
  let target = from;
  let raf: number | null = null;
  let last = 0;
  let damping = 1;
  let response = 0.4;
  let onRest: (() => void) | null = null;

  const step = (t: number) => {
    if (!last) last = t;
    const dt = Math.min((t - last) / 1000, 1 / 30);
    last = t;

    const w = (2 * Math.PI) / response;
    v += (-w * w * (x - target) - 2 * damping * w * v) * dt;
    x += v * dt;
    onUpdate(x, v);

    if (Math.abs(x - target) < 0.08 && Math.abs(v) < 0.08) {
      x = target;
      v = 0;
      onUpdate(x, 0);
      raf = null;
      last = 0;
      const done = onRest;
      onRest = null;
      done?.();
      return;
    }
    raf = requestAnimationFrame(step);
  };

  return {
    get value() {
      return x;
    },
    get velocity() {
      return v;
    },
    set(next) {
      x = next;
    },
    stop() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      last = 0;
      onRest = null;
    },
    to(next, options = {}) {
      target = next;
      if (options.damping != null) damping = options.damping;
      if (options.response != null) response = options.response;
      if (options.velocity != null) v = options.velocity;
      onRest = options.onRest ?? null;

      if (prefersReducedMotion()) {
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        last = 0;
        x = next;
        v = 0;
        onUpdate(x, 0);
        const done = onRest;
        onRest = null;
        done?.();
        return;
      }
      if (raf === null) {
        last = 0;
        raf = requestAnimationFrame(step);
      }
    },
  };
}

/**
 * Where a flick is going, not where it was released. This is the exponential
 * decay form Apple ships — deliberately not the textbook v²/(2·deceleration).
 */
export function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Progressive resistance past a boundary. A hard stop reads as frozen. */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55
): number {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

export const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

/** A short position/time history is what makes release velocity accurate. */
export type Sample = { t: number; p: number };

export function velocityFrom(history: Sample[], windowMs = 110): number {
  const now = performance.now();
  const recent = history.filter((s) => now - s.t < windowMs);
  if (recent.length < 2) return 0;
  const first = recent[0];
  const last = recent[recent.length - 1];
  const dt = (last.t - first.t) / 1000;
  return dt > 0 ? (last.p - first.p) / dt : 0;
}

/**
 * Reserved for commits — a snap landing, a sheet settling. Over-feedback trains
 * people to ignore all of it, so nothing decorative gets a haptic.
 */
export function haptic(ms: number): void {
  if (prefersReducedMotion()) return;
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* unsupported, and not worth reporting */
  }
}
