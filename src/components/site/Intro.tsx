import { INTRO } from '@/lib/intro';

/**
 * The original pixel loader, rebuilt for the current theme: ink ground, paper
 * pixels, an amber frame tracing the viewport. Static markup rendered on the
 * server and animated entirely in CSS — no hydration wait, and it still clears
 * itself if JavaScript never arrives.
 */

const PIXEL_MAP: Record<string, number[][]> = {
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  R: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  '.': [[0], [0], [0], [0], [1]],
};

const TEXT = 'FAROUK.DEV';
const LETTER_GAP = 1;
const ROWS = 5;

type Cell = { x: number; y: number; letter: number; accent: boolean };

function layout() {
  const cells: Cell[] = [];
  let x = 0;
  let dotSeen = false;

  TEXT.split('').forEach((char, letterIndex) => {
    const map = PIXEL_MAP[char];
    if (!map) return;
    if (char === '.') dotSeen = true;

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col]) {
          // Everything from the dot onward — ".DEV" — carries the accent.
          cells.push({ x: x + col, y: row, letter: letterIndex, accent: dotSeen });
        }
      }
    }
    x += map[0].length + LETTER_GAP;
  });

  return { cells, columns: x - LETTER_GAP };
}

const { cells, columns } = layout();

export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div
        className="intro-mark"
        style={{
          width: `calc(${columns} * var(--px))`,
          height: `calc(${ROWS} * var(--px))`,
        }}
      >
        {cells.map((c, i) => (
          <span
            key={i}
            className={c.accent ? 'px px-accent' : 'px'}
            style={{
              left: `calc(${c.x} * var(--px))`,
              top: `calc(${c.y} * var(--px))`,
              animationDelay: `${c.letter * INTRO.letterStagger}ms`,
            }}
          />
        ))}
      </div>

      <i className="edge edge-t" />
      <i className="edge edge-r" />
      <i className="edge edge-b" />
      <i className="edge edge-l" />
    </div>
  );
}
