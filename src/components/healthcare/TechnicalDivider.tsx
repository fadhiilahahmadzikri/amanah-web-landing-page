import type { CSSProperties } from 'react';
import { cn } from '@/utils/Helpers';
import { ViewportLine } from './ViewportLine';

type TechnicalDividerProps = {
  className?: string;
};

const stripeDividerStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      135deg,
      color-mix(in oklab, var(--line) 42%, transparent) 0 1px,
      transparent 1px 8px
    )
  `,
} satisfies CSSProperties;

export function TechnicalDivider({ className }: TechnicalDividerProps) {
  return (
    <div
      aria-hidden
      className={cn('relative h-8 overflow-visible', className)}
    >
      <span
        className="
          absolute top-px bottom-px left-1/2 w-screen -translate-x-1/2
        "
        style={stripeDividerStyle}
      />
      <ViewportLine position="top" />
      <ViewportLine position="bottom" />
    </div>
  );
}
