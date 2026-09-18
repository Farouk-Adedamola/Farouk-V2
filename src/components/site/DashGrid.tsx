/**
 * The alternating solid/dashed graph-paper grid.
 *
 * Generated rather than exported from a design tool: the same drawing as a
 * hand-authored file would be ~70 <path> elements of fixed coordinates, and it
 * could not respond to its container. Here the spacing is a prop, so the same
 * component serves the hero plane and the retro backdrop at different scales.
 */

type Props = {
  width: number;
  height: number;
  /** Distance between lines, in viewBox units. Every second line is dashed. */
  spacing?: number;
  className?: string;
  stroke?: string;
};

export default function DashGrid({
  width,
  height,
  spacing = 28,
  className,
  stroke = 'currentColor',
}: Props) {
  const columns = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);

  const line = (i: number, vertical: boolean) => {
    const at = (i + 1) * spacing;
    const dashed = i % 2 === 1;
    return (
      <path
        key={`${vertical ? 'v' : 'h'}${i}`}
        d={
          vertical
            ? `M${at} 0V${height}`
            : `M0 ${at}H${width}`
        }
        stroke={stroke}
        strokeWidth={dashed ? 1.1 : 0.85}
        strokeDasharray={dashed ? '3 3' : undefined}
      />
    );
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: columns }, (_, i) => line(i, true))}
      {Array.from({ length: rows }, (_, i) => line(i, false))}
      <rect
        x="0.5"
        y="0.5"
        width={width - 1}
        height={height - 1}
        stroke={stroke}
        strokeWidth="0.85"
      />
    </svg>
  );
}
