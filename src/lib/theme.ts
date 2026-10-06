/**
 * Theme resolution. The page follows the browser's colour scheme until the
 * visitor pins one with the dial; a pinned choice is remembered, and Option-click
 * on the dial hands control back to the browser.
 *
 * The boot script has to run before first paint, so it is kept as a string and
 * inlined in <head> — anything that waits for hydration flashes the wrong theme.
 */
export const THEME_KEY = 'farouk:theme';

export type Theme = 'dark' | 'light';

/** Mirrors --ink in globals.css; used for the browser chrome (theme-color). */
export const THEME_COLOR: Record<Theme, string> = {
  dark: '#08080a',
  light: '#f4f4f6',
};

export const THEME_BOOT_SCRIPT = `
(function(){
  var t = null;
  try { t = localStorage.getItem('${THEME_KEY}'); } catch (e) {}
  var source = 'user';
  if (t !== 'light' && t !== 'dark') {
    source = 'auto';
    try { t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
    catch (e) { t = 'dark'; }
  }
  var d = document.documentElement;
  d.dataset.theme = t;
  d.dataset.themeSource = source;
  try {
    var c = t === 'light' ? '${THEME_COLOR.light}' : '${THEME_COLOR.dark}';
    var m = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < m.length; i++) m[i].setAttribute('content', c);
  } catch (e) {}
})();
`;
