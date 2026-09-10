'use client';

import type { FacilityItem } from '../types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { HealthcareHeading, HealthcareText } from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import { FacilityContextIcon } from './FacilityIcons';

type FacilityCardProps = {
  facility: FacilityItem;
  index: number;
  className?: string;
  isActive: boolean;
  isPaused: boolean;
  progressDuration?: number;
  onProgressComplete: (index: number) => void;
  onCardHover: (index: number) => void;
  onCardClick?: (index: number) => void;
};

export function FacilityCard({
  facility,
  index,
  className,
  isActive,
  isPaused,
  progressDuration = 4.5,
  onProgressComplete,
  onCardHover,
  onCardClick,
}: FacilityCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  // Initialize GSAP reveal timeline
  useGSAP(
    () => {
      gsap.set(descRef.current, { y: 35, opacity: 0 });
      gsap.set(bgRef.current, { opacity: 0, scale: 1 });
      gsap.set(titleRef.current, { y: 0, opacity: 1 });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      });

      // 1. Title retreats early along y-axis and fades out
      tl.to(
        titleRef.current,
        {
          y: -18,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        0,
      )
        // 2. Background Layer activates with opacity fade & subtle scale
        .to(
          bgRef.current,
          {
            opacity: 1,
            scale: 1.05,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.06,
        )
        // Icon container gets subtle scale enhancement
        .to(
          iconRef.current,
          {
            scale: 1.06,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.08,
        )
        // 3. Description rises into place from below with opacity fade-in
        .to(
          descRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.12,
        );

      tlRef.current = tl;
    },
    { scope: cardRef },
  );

  // Synchronize active state with card reveal & progressive interval bar
  useEffect(() => {
    const cardTl = tlRef.current;
    const bar = progressBarRef.current;
    if (!cardTl || !bar) {
      return;
    }

    if (isActive) {
      cardTl.play();

      if (!progressTweenRef.current) {
        gsap.set(bar, { scaleX: 0, transformOrigin: 'left' });
        progressTweenRef.current = gsap.to(bar, {
          scaleX: 1,
          duration: progressDuration,
          ease: 'none',
          onComplete: () => {
            progressTweenRef.current = null;
            onProgressComplete(index);
          },
        });
      }

      if (isPaused) {
        progressTweenRef.current?.pause();
      } else {
        progressTweenRef.current?.resume();
      }
    } else {
      cardTl.reverse();

      if (progressTweenRef.current) {
        progressTweenRef.current.kill();
        progressTweenRef.current = null;
      }
      gsap.to(bar, {
        scaleX: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [isActive, isPaused, index, progressDuration, onProgressComplete]);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => onCardHover(index)}
      onClick={() => onCardClick?.(index)}
      onFocus={() => onCardHover(index)}
      tabIndex={0}
      aria-label={facility.title}
      className={cn(
        `
          group relative flex min-h-[300px] cursor-pointer flex-col
          justify-between overflow-hidden p-8 select-none
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-primary
          md:min-h-[320px]
          xl:min-h-[344px] xl:px-9 xl:py-10
        `,
        index % 2 === 0 ? 'bg-background' : 'bg-card',
        className,
      )}
    >
      {/* Interval Progressive Bar */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 z-30 h-[3.5px]
          overflow-hidden bg-line/20
          dark:bg-white/10
        "
      >
        <div
          ref={progressBarRef}
          className="
            size-full origin-left scale-x-0 bg-amanah-blue
            shadow-[0_1px_6px_rgba(49,113,222,0.4)] will-change-transform
            dark:bg-amanah-mint dark:shadow-[0_1px_8px_rgba(52,211,153,0.5)]
          "
        />
      </div>

      {/* Slot 5: Background Layer */}
      <div
        ref={bgRef}
        aria-hidden="true"
        data-card-bg
        className="
          pointer-events-none absolute inset-0 z-0 opacity-0
          will-change-[transform,opacity]
        "
      >
        <Image
          src={facility.image.src}
          alt={facility.image.alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
        {/* Responsive light/dark gradient scrim focused on text readability */}
        <div className="
          absolute inset-x-0 bottom-0 h-[68%] bg-linear-to-t from-white/95
          via-white/70 via-40% to-transparent
          dark:from-[#090d24]/95 dark:via-[#090d24]/70 dark:via-40%
          dark:to-transparent
        "
        />
      </div>

      {/* Slot 2: Icon */}
      <div className="relative z-10">
        <span
          ref={iconRef}
          data-facility-icon
          className={cn(
            `
              inline-flex size-12 shrink-0 items-center justify-center
              rounded-xl bg-amanah-icon-soft text-amanah-blue transition-colors
              duration-300
              group-hover:border group-hover:border-slate-200/80
              group-hover:bg-white group-hover:text-amanah-blue
              group-hover:shadow-md
              dark:bg-amanah-blue/20 dark:text-amanah-mint
              dark:group-hover:border-white/20 dark:group-hover:bg-white/15
              dark:group-hover:text-white dark:group-hover:shadow-lg
              dark:group-hover:backdrop-blur-md
            `,
            isActive && `
              border border-slate-200/80 bg-white text-amanah-blue shadow-md
              dark:border-white/20 dark:bg-white/15 dark:text-white
              dark:shadow-lg dark:backdrop-blur-md
            `,
          )}
        >
          <FacilityContextIcon
            src={facility.icon.src}
            className="
              size-6 transition-transform duration-300
              group-hover:scale-110
            "
          />
        </span>
      </div>

      {/* Bottom slots wrapper */}
      <div className="
        relative z-10 mt-auto flex min-h-[84px] flex-col justify-end
      "
      >
        {/* Slot 3: Title */}
        <HealthcareHeading
          as="h3"
          ref={titleRef}
          data-card-title
          size="card"
          className="text-foreground will-change-[transform,opacity]"
        >
          {facility.title}
        </HealthcareHeading>

        {/* Slot 4: Description */}
        <div
          ref={descRef}
          data-card-desc
          className="
            pointer-events-none absolute inset-x-0 bottom-0 opacity-0
            will-change-[transform,opacity]
          "
        >
          <HealthcareText
            className="
              font-medium text-foreground
              dark:text-white dark:drop-shadow-sm
            "
          >
            {facility.description}
          </HealthcareText>
        </div>
      </div>
    </article>
  );
}
