'use client';

import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/Helpers';

export type CardItem = {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
};

export type SocialCardsProps = {
  cards: CardItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
};

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) {
    return 0.28;
  }
  if (width < 640) {
    return 0.38;
  }
  if (width < 768) {
    return 0.5;
  }
  if (width < 1024) {
    return 0.75;
  }
  if (width < 1280) {
    return 1.0;
  }
  if (width < 1536) {
    return 1.15;
  }
  return 1.32;
}

function getHeightMultiplier(width: number) {
  if (typeof window === 'undefined') {
    return 1;
  }
  let idealPx: number;
  if (width < 480) {
    idealPx = 22 * 16;
  } else if (width < 640) {
    idealPx = 26 * 16;
  } else if (width < 768) {
    idealPx = 28 * 16;
  } else if (width < 1024) {
    idealPx = 34 * 16;
  } else {
    idealPx = 38 * 16;
  }

  const available = window.innerHeight * 0.7;
  if (available >= idealPx) {
    return 1;
  }
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) {
    return FAN_POSITIONS[slot] || FAN_POSITIONS[3]!;
  }
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES
  = 'relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-background/80 dark:bg-card/80 backdrop-blur-[16px] text-foreground/70 dark:text-foreground/80 cursor-pointer shrink-0 z-30 outline-none shadow-md hover:border-amanah-blue/40 hover:text-amanah-blue hover:scale-105 active:scale-95 transition-all duration-300 before:content-[\'\'] before:absolute before:inset-[3px] before:rounded-full before:border before:border-black/[0.04] dark:before:border-white/[0.04] before:pointer-events-none';

export function CardFanCarousel({
  cards,
  autoPlay = true,
  autoPlayInterval = 2800,
  className,
}: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const directionRef = useRef<'left' | 'right' | null>(null);
  const prevVisibleRef = useRef<Set<number>>(new Set());
  const isPausedRef = useRef(false);

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (!needsPagination) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, needsPagination, cards]);

  const cycle = useCallback((direction: 'left' | 'right') => {
    if (isAnimatingRef.current || !needsPagination) {
      return;
    }
    isAnimatingRef.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === 'right' ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards,
    );
  }, [totalCards, needsPagination]);

  // Infinite Auto-play loop
  useEffect(() => {
    if (!autoPlay || !needsPagination) {
      return;
    }

    const intervalTimer = setInterval(() => {
      if (
        isPausedRef.current
        || isAnimatingRef.current
        || (typeof document !== 'undefined' && document.hidden)
      ) {
        return;
      }
      cycle('right');
    }, autoPlayInterval);

    return () => clearInterval(intervalTimer);
  }, [autoPlay, autoPlayInterval, cycle, needsPagination]);

  // GSAP fan positioning and entrance animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) {
      return;
    }

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>('[data-fan-card]'));
    if (!cardElements.length) {
      return;
    }

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisibleRef.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEnteredRef.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) {
      isAnimatingRef.current = true;
    }

    let completedCount = 0;
    const visibleCount = visibleMap.size;

    // Safety timeout to prevent animation deadlocks
    const safetyTimer = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 1400);

    const onCardDone = () => {
      completedCount += 1;
      if (completedCount >= visibleCount) {
        clearTimeout(safetyTimer);
        isAnimatingRef.current = false;
        if (isFirstMount) {
          hasEnteredRef.current = true;
        }
      }
    };

    const enterDistance = Math.max(48, 42 * multiplier);
    const exitDistance = Math.max(48, 42 * multiplier);

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, {
            ...target,
            duration: 1.2,
            ease: 'elastic.out(1.05,.78)',
            delay: 0.2 + slot * 0.06,
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === 'right' ? enterDistance : -enterDistance;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === 'right' ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: onCardDone,
          });
        }
      } else if (wasVisible) {
        const exitX = direction === 'right' ? -exitDistance : exitDistance;
        gsap.to(card, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.5,
          rotation: direction === 'right' ? -30 : 30,
          duration: 0.4,
          ease: 'power2.in',
          zIndex: 0,
        });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisibleRef.current = new Set(visibleMap.keys());

    // Hover spread interactions
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) {
        visibleEntries.push({ el, slot });
      }
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) {
              targetY -= 1 * hM;
            }
            if (slot === 0 && hoveredSlot > centerSlot) {
              targetY -= 1 * hM;
            }
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: 'elastic.out(1,.75)',
          overwrite: 'auto',
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimatingRef.current) {
          return;
        }
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          updateHoverLayout(slot);
        }
      };
      el.addEventListener('mouseenter', handler);
      return { el, handler };
    });

    const onMouseEnterContainer = () => {
      isPausedRef.current = true;
    };

    const onMouseLeaveContainer = () => {
      isPausedRef.current = false;
      if (isAnimatingRef.current) {
        return;
      }
      if (leaveTimer) {
        clearTimeout(leaveTimer);
      }
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        updateHoverLayout(null);
      }, 50);
    };

    const onTouchStartContainer = () => {
      isPausedRef.current = true;
    };

    const onTouchEndContainer = () => {
      isPausedRef.current = false;
    };

    container.addEventListener('mouseenter', onMouseEnterContainer);
    container.addEventListener('mouseleave', onMouseLeaveContainer);
    container.addEventListener('touchstart', onTouchStartContainer, { passive: true });
    container.addEventListener('touchend', onTouchEndContainer, { passive: true });

    const onResize = () => {
      if (!isAnimatingRef.current) {
        updateHoverLayout(activeSlot);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(safetyTimer);
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener('mouseenter', handler));
      container.removeEventListener('mouseenter', onMouseEnterContainer);
      container.removeEventListener('mouseleave', onMouseLeaveContainer);
      container.removeEventListener('touchstart', onTouchStartContainer);
      container.removeEventListener('touchend', onTouchEndContainer);
      window.removeEventListener('resize', onResize);
      if (leaveTimer) {
        clearTimeout(leaveTimer);
      }
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) {
    return null;
  }

  const handleCardClick = (index: number) => {
    if (isAnimatingRef.current || index === centerIndex) {
      return;
    }
    const diff = (index - centerIndex + totalCards) % totalCards;
    directionRef.current = diff <= totalCards / 2 ? 'right' : 'left';
    setCenterIndex(index);
  };

  return (
    <div className={cn(`
      relative z-20 flex w-full flex-col items-center py-2 select-none
      sm:py-4
    `, className)}
    >
      {/* Full-width cards container with left & right gradient masking ("tembus ke dinding tapi kena clip") */}
      <div
        className="
          relative flex w-full items-center justify-center overflow-hidden
        "
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      >
        <div
          ref={containerRef}
          data-fan-layout
          className="
            relative flex h-88 w-full items-center justify-center
            overflow-visible
            sm:h-104
            md:h-112
            lg:h-136
            xl:h-152
          "
        >
          {cards.map((card, index) => {
            const image = (
              <div className="
                relative size-full overflow-hidden rounded-2xl bg-muted
                shadow-xl ring-1 ring-black/10
                md:rounded-3xl md:shadow-2xl
                dark:ring-white/10
              "
              >
                <Image
                  src={card.imgUrl}
                  alt={card.alt || `Dokumentasi Amanah ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                  className="
                    pointer-events-none object-cover transition-transform
                    duration-500 select-none
                    hover:scale-105
                  "
                  priority={index < 4}
                />
                <div className="
                  pointer-events-none absolute inset-0 bg-linear-to-t
                  from-black/50 via-transparent to-transparent opacity-30
                "
                />
              </div>
            );

            const cardClasses
              = 'absolute w-[12.5rem] h-[17.5rem] sm:w-[15rem] sm:h-[21rem] md:w-[16.5rem] md:h-[23rem] lg:w-[18.5rem] lg:h-[25.5rem] rounded-2xl md:rounded-3xl cursor-pointer will-change-transform';

            return card.linkUrl
              ? (
                  <a
                    key={card.imgUrl}
                    data-fan-card
                    href={card.linkUrl}
                    target={card.linkUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={cn(cardClasses, 'block')}
                  >
                    {image}
                  </a>
                )
              : (
                  <div
                    key={card.imgUrl}
                    data-fan-card
                    onClick={() => handleCardClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCardClick(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className={cardClasses}
                  >
                    {image}
                  </div>
                );
          })}
        </div>
      </div>

      {/* Pagination controls below the cards viewport (outside the mask so they remain crisp) */}
      {needsPagination && (
        <div className="
          z-30 mt-4 flex items-center justify-center gap-3
          sm:gap-4
          md:mt-6
        "
        >
          <button
            type="button"
            className={cn(ARROW_CLASSES, `
              size-10
              sm:size-11
              md:size-12
            `)}
            onClick={() => cycle('left')}
            aria-label="Dokumentasi sebelumnya"
          >
            <ChevronLeft
              className="
                relative z-2 size-4
                md:size-5
              "
              strokeWidth={2.5}
            />
          </button>

          <div className="
            flex max-w-[260px] scrollbar-none items-center gap-1.5
            overflow-x-auto py-1
            sm:max-w-none sm:gap-2
          "
          >
            {cards.map((card, i) => (
              <button
                key={`dot-${card.imgUrl}`}
                type="button"
                onClick={() => {
                  if (isAnimatingRef.current || i === centerIndex) {
                    return;
                  }
                  const diff = (i - centerIndex + totalCards) % totalCards;
                  directionRef.current = diff <= totalCards / 2 ? 'right' : 'left';
                  setCenterIndex(i);
                }}
                aria-label={`Lihat dokumentasi ke-${i + 1}`}
                className={cn(
                  `
                    h-2 shrink-0 cursor-pointer rounded-full transition-all
                    duration-300
                  `,
                  i === centerIndex
                    ? `
                      w-6 scale-105 bg-amanah-blue
                      dark:bg-amanah-sky
                    `
                    : `
                      w-2 bg-foreground/20
                      hover:bg-foreground/40
                      dark:bg-white/20
                      dark:hover:bg-white/40
                    `,
                )}
              />
            ))}
          </div>

          <button
            type="button"
            className={cn(ARROW_CLASSES, `
              size-10
              sm:size-11
              md:size-12
            `)}
            onClick={() => cycle('right')}
            aria-label="Dokumentasi selanjutnya"
          >
            <ChevronRight
              className="
                relative z-2 size-4
                md:size-5
              "
              strokeWidth={2.5}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export { CardFanCarousel as SocialCards };
export default CardFanCarousel;
