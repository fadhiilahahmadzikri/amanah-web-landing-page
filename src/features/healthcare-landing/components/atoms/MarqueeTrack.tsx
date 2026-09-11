'use client';

import type { ReactNode } from 'react';
import { cn } from '@/utils/Helpers';

type MarqueeTrackProps = {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  durationSeconds?: number;
  gapClassName?: string;
  pauseOnHover?: boolean;
};

export function MarqueeTrack({
  children,
  className,
  direction = 'left',
  durationSeconds = 42,
  gapClassName = 'gap-4 sm:gap-6',
  pauseOnHover = true,
}: MarqueeTrackProps) {
  const isLeft = direction === 'left';
  const animationName = isLeft ? 'amanahMarqueeLeft' : 'amanahMarqueeRight';

  return (
    <div
      className={cn(
        'group flex w-full overflow-hidden select-none',
        className,
      )}
    >
      <style>
        {`
        @keyframes amanahMarqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        @keyframes amanahMarqueeRight {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}
      </style>

      {/* First track */}
      <div
        className={cn(
          'flex shrink-0 items-stretch py-1 will-change-transform',
          gapClassName,
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          'motion-reduce:[animation-play-state:paused]',
        )}
        style={{
          animation: `${animationName} ${durationSeconds}s linear infinite`,
        }}
      >
        {children}
      </div>

      {/* Second identical track to complete the seamless loop */}
      <div
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-stretch py-1 will-change-transform',
          gapClassName,
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          'motion-reduce:[animation-play-state:paused]',
        )}
        style={{
          animation: `${animationName} ${durationSeconds}s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
