/**
 * Timings for the pixel intro. Shared so the hero can pick up exactly where the
 * overlay lets go, instead of animating underneath it where nobody sees it.
 */
/**
 * These mirror the custom properties in globals.css — the CSS owns the
 * animation, this owns the hand-off to the hero. Change both together.
 */
export const INTRO = {
  /** Per-letter stagger while the mark draws itself in. */
  letterStagger: 75,
  letters: 10,
  pixelDraw: 480,
  /** When the viewport frame starts tracing, and how long each edge takes. */
  frameStart: 900,
  frameStagger: 140,
  frameDraw: 420,
  /** When the overlay starts lifting, and how long it takes. */
  exitStart: 2100,
  exitDuration: 520,
} as const;

export const INTRO_TOTAL = INTRO.exitStart + INTRO.exitDuration; // 2620ms

/**
 * Runs before first paint, so a returning visitor never sees a flash of the
 * overlay. Kept as a string because it has to be inlined in <head> — anything
 * that waits for hydration is already too late.
 */
export const INTRO_BOOT_SCRIPT = `
(function(){
  var run = true;
  try {
    if (sessionStorage.getItem('farouk:intro') === '1') run = false;
    sessionStorage.setItem('farouk:intro', '1');
  } catch (e) {}
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) run = false;
  } catch (e) {}
  document.documentElement.dataset.intro = run ? 'run' : 'skip';
})();
`.trim();
