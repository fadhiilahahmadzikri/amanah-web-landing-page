import type { Ref } from 'react';
import type { AboutSlide } from '../../types';
import Image from 'next/image';
import { memo } from 'react';

type CarouselCardProps = {
  index: number;
  isPriority: boolean;
  onClick: () => void;
  ref?: Ref<HTMLElement>;
  slide: AboutSlide;
  totalSlides: number;
};

export const CarouselCard = memo(function CarouselCard({
  index,
  isPriority,
  onClick,
  ref,
  slide,
  totalSlides,
}: CarouselCardProps) {
  return (
    <article
      ref={ref}
      className="
        card-item absolute h-full w-full max-w-4xl cursor-pointer select-none
        overflow-hidden bg-card shadow-2xl
        [backface-visibility:hidden] [transform-style:preserve-3d]
        [will-change:transform,opacity,filter]
      "
      data-index={index}
      onClick={onClick}
    >
      <Image
        src={slide.image.src}
        alt={slide.title}
        fill
        priority={isPriority}
        sizes="(min-width: 1200px) 1022px, calc(100vw - 2rem)"
        className="card-img absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
      />

      <div
        className="
          card-overlay-gradient pointer-events-none absolute inset-0
          bg-linear-to-t from-card via-card/80 via-40% to-transparent
        "
      />

      <div
        className="
          gradual-blur-overlay pointer-events-none absolute inset-x-0 bottom-0
          z-0 h-80 overflow-hidden
        "
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(2px)',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(5px)',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 50%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 50%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(10px)',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(18px)',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      <div
        className="
          pointer-events-none absolute top-4 right-4 z-10
          sm:top-6 sm:right-6
        "
      >
        <div
          className="
            rounded-lg border border-white/30 bg-white/15 px-3 py-1 font-mono
            text-xs font-semibold tracking-widest text-foreground
            shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]
            backdrop-blur-xl
            dark:border-white/20 dark:bg-white/10
            sm:px-3.5 sm:py-1.5 sm:text-sm
          "
        >
          <span className="card-badge-num">{index + 1}</span>
          <span className="px-1.5 opacity-60">/</span>
          <span className="opacity-60">{totalSlides}</span>
        </div>
      </div>

      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 z-10 flex max-w-3xl
          flex-col gap-1.5 p-5 pb-16 text-left text-foreground
          sm:gap-2 sm:p-8 sm:pb-20
          md:gap-3 md:px-10 md:pb-24
          lg:p-10 lg:pb-24
        "
      >
        <p
          className="
            card-tag text-xs font-semibold tracking-wide text-muted-foreground
            drop-shadow-sm
            [will-change:transform,opacity,filter]
            sm:text-sm
            md:text-base
          "
        >
          {slide.eyebrow}
        </p>
        <h2
          className="
            card-title font-sans text-xl/tight font-semibold tracking-tight
            text-foreground drop-shadow-md
            [will-change:transform,opacity,filter]
            sm:text-2xl/snug
            md:text-3xl/tight
            lg:text-4xl/tight
          "
        >
          {slide.title}
        </h2>
        <p
          className="
            card-desc line-clamp-3 max-w-3xl text-xs/relaxed font-normal
            text-muted-foreground drop-shadow
            [will-change:transform,opacity,filter]
            sm:text-sm/relaxed
            md:text-base/relaxed
          "
        >
          {slide.description}
        </p>
      </div>
    </article>
  );
});
