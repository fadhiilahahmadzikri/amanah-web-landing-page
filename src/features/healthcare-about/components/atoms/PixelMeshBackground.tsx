'use client';

import { useId } from 'react';
import { cn } from '@/utils/Helpers';

type PixelMeshBackgroundProps = {
  className?: string;
  maskGradient?: string;
  ref?: React.Ref<HTMLDivElement>;
};

// Deterministic pseudo-random number generator for 100% SSR hydration consistency
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const PALETTE = [
  { color: '#3171de', maxOp: 0.88, minOp: 0.55 }, // amanah-blue (#3171de) - primary brand
  { color: '#5e98c2', maxOp: 0.82, minOp: 0.50 }, // amanah-sky (#5e98c2) - secondary brand
  { color: '#4382e8', maxOp: 0.92, minOp: 0.60 }, // vibrant mid-blue
  { color: '#76a5dc', maxOp: 0.80, minOp: 0.48 }, // soft sky-blue
  { color: '#265ec7', maxOp: 0.86, minOp: 0.55 }, // royal blue
  { color: '#94bce4', maxOp: 0.78, minOp: 0.45 }, // gentle light-blue
];

const TILE_SIZE = 12;
const TILE_GAP = 3;
const STEP = TILE_SIZE + TILE_GAP; // 15px
const GRID_SIZE = 16; // 16x16 = 256 tiles per pattern repeat (240px x 240px)

const TILES = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
  const col = i % GRID_SIZE;
  const row = Math.floor(i / GRID_SIZE);
  const rnd1 = pseudoRandom(i * 13 + 7);
  const rnd2 = pseudoRandom(i * 29 + 11);
  const rnd3 = pseudoRandom(i * 47 + 19);

  // Pure Amanah blue mosaic with pulsing cycle down to 0 opacity
  const pal = PALETTE[Math.floor(rnd2 * PALETTE.length)]!;
  const peakOp = Number((pal.minOp + rnd3 * (pal.maxOp - pal.minOp)).toFixed(3));
  const dur = (2.2 + rnd1 * 3.0).toFixed(2);
  const delay = (-rnd2 * 5.0).toFixed(2);

  return {
    color: pal.color,
    delay: `${delay}s`,
    dur: `${dur}s`,
    id: `pt-${i}`,
    peakOp,
    x: col * STEP,
    y: row * STEP,
  };
});

export function PixelMeshBackground({
  className,
  maskGradient = 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.82) 8%, rgba(0, 0, 0, 0.55) 18%, rgba(0, 0, 0, 0.32) 28%, rgba(0, 0, 0, 0.15) 38%, rgba(0, 0, 0, 0.05) 48%, rgba(0, 0, 0, 0.01) 54%, transparent 58%)',
  ref,
}: PixelMeshBackgroundProps) {
  const patternId = useId();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        `
          pointer-events-none absolute inset-0 size-full overflow-hidden
          select-none
        `,
        className,
      )}
      style={{
        WebkitMaskImage: maskGradient,
        maskImage: maskGradient,
      }}
    >
      <style>
        {`
          @keyframes pixelMosaicPulse {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: var(--peak-op);
            }
          }
        `}
      </style>
      <svg
        className="size-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width={GRID_SIZE * STEP}
            height={GRID_SIZE * STEP}
            patternUnits="userSpaceOnUse"
          >
            {TILES.map(t => (
              <rect
                key={t.id}
                x={t.x}
                y={t.y}
                width={TILE_SIZE}
                height={TILE_SIZE}
                rx={2.5}
                ry={2.5}
                fill={t.color}
                style={
                  {
                    '--peak-op': t.peakOp,
                    'animation': `pixelMosaicPulse ${t.dur} ease-in-out infinite ${t.delay}`,
                    'opacity': 0,
                  } as React.CSSProperties
                }
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
