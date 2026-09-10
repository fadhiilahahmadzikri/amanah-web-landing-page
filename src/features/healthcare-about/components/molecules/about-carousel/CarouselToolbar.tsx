import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { cn } from '@/utils/Helpers';

type CarouselToolbarProps = {
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSelectSlide: (index: number) => void;
  totalSlides: number;
};

export function CarouselToolbar({
  currentIndex,
  onNext,
  onPrevious,
  onSelectSlide,
  totalSlides,
}: CarouselToolbarProps) {
  return (
    <>
      <div
        className="
          pointer-events-none absolute inset-x-2 top-1/2 z-40 flex
          -translate-y-1/2 items-center justify-between
          sm:inset-x-4
          md:-inset-x-6
        "
      >
        <button
          type="button"
          aria-label="Previous Slide"
          className="
            group pointer-events-auto flex size-11 cursor-pointer items-center
            justify-center rounded-full border border-white/30 bg-white/15
            text-foreground
            shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]
            backdrop-blur-xl transition-all duration-300
            hover:scale-105 hover:border-white/50 hover:bg-white/30
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)]
            active:scale-95 active:bg-white/40
            sm:size-12
            dark:border-white/20 dark:bg-white/10
          "
          onClick={onPrevious}
        >
          <ArrowLeftIcon className="
            size-5 transition-transform
            group-hover:-translate-x-0.5
          "
          />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          className="
            group pointer-events-auto flex size-11 cursor-pointer items-center
            justify-center rounded-full border border-white/30 bg-white/15
            text-foreground
            shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]
            backdrop-blur-xl transition-all duration-300
            hover:scale-105 hover:border-white/50 hover:bg-white/30
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)]
            active:scale-95 active:bg-white/40
            sm:size-12
            dark:border-white/20 dark:bg-white/10
          "
          onClick={onNext}
        >
          <ArrowRightIcon className="
            size-5 transition-transform
            group-hover:translate-x-0.5
          "
          />
        </button>
      </div>

      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-4 z-40 flex
          justify-center
          sm:bottom-6
        "
      >
        <div
          className="
            pointer-events-auto flex items-center gap-1.5 rounded-full border
            border-white/25 bg-white/15 px-3.5 py-2
            shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.4)]
            backdrop-blur-xl
            dark:border-white/20 dark:bg-white/10
          "
        >
          {Array.from({ length: totalSlides }).map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className="
                  flex h-3 w-8 items-center justify-center
                  focus:outline-none
                "
                onClick={() => onSelectSlide(index)}
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    isActive
                      ? 'w-8 bg-primary shadow-sm'
                      : `
                        size-1.5 bg-foreground/40
                        hover:bg-foreground/80
                      `,
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
