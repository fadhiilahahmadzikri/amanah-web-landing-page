'use client';

import type { AboutSlide } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/Helpers';

type AboutCarouselProps = {
  slides: AboutSlide[];
};

type SideSlidePosition = 'previous' | 'next';

const INITIAL_ACTIVE_INDEX = 2;

function getWrappedIndex(index: number, totalItems: number) {
  return (index + totalItems) % totalItems;
}

function getInitialIndex(totalItems: number) {
  return Math.min(INITIAL_ACTIVE_INDEX, totalItems - 1);
}

function getSlide(slides: AboutSlide[], index: number) {
  return slides[getWrappedIndex(index, slides.length)]!;
}

type SideSlideProps = {
  slide: AboutSlide;
  position: SideSlidePosition;
};

function SideSlide({ slide, position }: SideSlideProps) {
  return (
    <article
      aria-hidden="true"
      className={cn(
        `
          pointer-events-none absolute top-9 hidden h-[405px] w-[760px]
          overflow-hidden rounded-[1.75rem] bg-foreground opacity-40
          md:block
          xl:w-[900px]
        `,
        position === 'previous'
          ? 'left-0 translate-x-[-42%]'
          : 'right-0 translate-x-[42%]',
      )}
    >
      <Image
        src={slide.image.src}
        alt=""
        fill
        sizes="900px"
        className="object-cover"
      />
      <div className="
        absolute inset-0 bg-linear-to-t from-foreground via-foreground/70
        to-foreground/20
      "
      />
      <div className="
        absolute inset-x-0 bottom-0 flex flex-col gap-3 p-10 text-background
      "
      >
        <p className="text-sm font-semibold text-amanah-mint">{slide.eyebrow}</p>
        <h3 className="max-w-xl text-3xl/tight font-semibold">{slide.title}</h3>
      </div>
    </article>
  );
}

export function AboutCarousel({ slides }: AboutCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex(slides.length));

  const showPreviousSlide = useCallback(() => {
    setActiveIndex(currentIndex => getWrappedIndex(currentIndex - 1, slides.length));
  }, [slides.length]);

  const showNextSlide = useCallback(() => {
    setActiveIndex(currentIndex => getWrappedIndex(currentIndex + 1, slides.length));
  }, [slides.length]);

  const showSlide = useCallback((slideIndex: number) => {
    setActiveIndex(getWrappedIndex(slideIndex, slides.length));
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = getSlide(slides, activeIndex);
  const previousSlide = getSlide(slides, activeIndex - 1);
  const nextSlide = getSlide(slides, activeIndex + 1);

  return (
    <div className="
      relative mt-12 overflow-hidden pb-5
      md:mt-20 md:pb-8
    "
    >
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 top-24 h-[340px] bg-muted
          md:top-28 md:h-[430px]
        "
      />

      <div className="
        relative mx-auto max-w-344 overflow-hidden px-4
        md:px-10
      "
      >
        <SideSlide slide={previousSlide} position="previous" />
        <SideSlide slide={nextSlide} position="next" />

        <article className="
          relative mx-auto h-[430px] w-full max-w-[1022px] overflow-hidden
          rounded-[1.75rem] bg-foreground shadow-amanah-card
          sm:h-[470px]
          md:h-[537px]
        "
        >
          <Image
            src={activeSlide.image.src}
            alt={activeSlide.image.alt}
            fill
            priority
            sizes="(min-width: 1200px) 1022px, calc(100vw - 2rem)"
            className="object-cover"
          />
          <div className="
            absolute inset-0 bg-linear-to-t from-foreground via-foreground/65
            to-foreground/10
          "
          />

          <div className="
            absolute top-5 right-5 rounded-full bg-foreground/45 px-4 py-2
            text-xs font-semibold text-background backdrop-blur-md
            md:top-7 md:right-7 md:text-sm
          "
          >
            <span>{activeIndex + 1}</span>
            <span className="px-2 text-background/60">/</span>
            <span className="text-background/60">{slides.length}</span>
          </div>

          <div className="
            absolute inset-x-0 bottom-20 flex max-w-3xl flex-col gap-3 px-6
            text-background
            sm:px-8
            md:bottom-18 md:px-12
          "
          >
            <p className="
              text-xs font-semibold text-amanah-mint
              md:text-sm
            "
            >
              {activeSlide.eyebrow}
            </p>
            <h3 className="
              text-2xl/tight font-semibold
              md:text-5xl
            "
            >
              {activeSlide.title}
            </h3>
            <p className="
              text-sm/relaxed text-background/80
              md:text-base/relaxed
            "
            >
              {activeSlide.description}
            </p>
          </div>

          <div className="
            absolute inset-x-5 bottom-5 flex items-center justify-between
            md:inset-x-7 md:bottom-7
          "
          >
            <Button
              type="button"
              size="icon-lg"
              variant="ghost"
              className="
                size-11 rounded-full border border-background/25
                bg-foreground/35 text-background backdrop-blur-md
                hover:bg-foreground/55 hover:text-background
                md:size-12
              "
              aria-label="Tampilkan slide sebelumnya"
              onClick={showPreviousSlide}
            >
              <ArrowLeftIcon data-icon="inline-start" />
            </Button>

            <div className="
              flex items-center gap-1.5 rounded-full bg-foreground/45 px-3 py-2
              backdrop-blur-md
            "
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className="flex h-3 w-8 items-center justify-center"
                  aria-label={`Tampilkan slide ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => showSlide(index)}
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all',
                      index === activeIndex
                        ? 'w-8 bg-background'
                        : 'size-1.5 bg-background/45',
                    )}
                  />
                </button>
              ))}
            </div>

            <Button
              type="button"
              size="icon-lg"
              variant="ghost"
              className="
                size-11 rounded-full border border-background/25
                bg-foreground/35 text-background backdrop-blur-md
                hover:bg-foreground/55 hover:text-background
                md:size-12
              "
              aria-label="Tampilkan slide berikutnya"
              onClick={showNextSlide}
            >
              <ArrowRightIcon data-icon="inline-start" />
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
