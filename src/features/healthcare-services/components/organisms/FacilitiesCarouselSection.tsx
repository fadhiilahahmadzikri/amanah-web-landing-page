'use client';

import type { CarouselApi } from '@/components/ui/carousel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SectionContainer } from '@/components/healthcare';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PillLabel } from '@/features/healthcare-landing/components/PillLabel';
import { cn } from '@/utils/Helpers';
import { facilitiesSectionData } from '../../data';

gsap.registerPlugin(ScrollTrigger);

type FacilitiesCarouselSectionProps = {
  className?: string;
};

export function FacilitiesCarouselSection({ className }: FacilitiesCarouselSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    carouselApi.on('select', update);
    carouselApi.on('reInit', update);

    queueMicrotask(update);

    return () => {
      carouselApi.off('select', update);
      carouselApi.off('reInit', update);
    };
  }, [carouselApi]);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (carouselContainerRef.current) {
        gsap.fromTo(
          carouselContainerRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="fasilitas"
      className={cn(
        `
          relative overflow-hidden bg-background py-12
          md:py-16
          lg:py-20
        `,
        className,
      )}
    >
      <SectionContainer>
        <div className="
          grid grid-cols-1 items-start gap-8
          lg:grid-cols-12 lg:gap-10
          xl:gap-14
        "
        >
          {/* Left Intro Column (per wireframe) */}
          <div
            ref={leftColRef}
            className="
              flex flex-col items-start self-start
              lg:col-span-4
            "
          >
            <PillLabel>{facilitiesSectionData.eyebrow}</PillLabel>

            <h2
              className="
                mt-3 text-3xl font-medium tracking-tight text-foreground
                sm:mt-3.5 sm:text-4xl
                lg:text-4xl/tight
              "
            >
              {facilitiesSectionData.title}
            </h2>

            <p
              className="
                mt-3 text-sm/relaxed text-muted-foreground
                sm:text-base/relaxed
              "
            >
              {facilitiesSectionData.description}
            </p>

            {/* Navigation Buttons */}
            <div className="
              mt-6 flex items-center gap-2.5
              sm:mt-8
            "
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Fasilitas sebelumnya"
                className="
                  size-11 rounded-full border border-line bg-surface
                  text-foreground shadow-xs transition-all duration-300
                  hover:border-primary hover:bg-amanah-soft
                  hover:text-amanah-blue
                  disabled:opacity-35
                  dark:bg-surface/50
                "
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Fasilitas selanjutnya"
                className="
                  size-11 rounded-full border border-line bg-surface
                  text-foreground shadow-xs transition-all duration-300
                  hover:border-primary hover:bg-amanah-soft
                  hover:text-amanah-blue
                  disabled:opacity-35
                  dark:bg-surface/50
                "
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>

          {/* Right Carousel Column (per wireframe) */}
          <div
            ref={carouselContainerRef}
            className="
              w-full min-w-0
              lg:col-span-8
            "
          >
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: 'start',
                breakpoints: { '(max-width: 768px)': { dragFree: true } },
              }}
              className="relative w-full"
            >
              <CarouselContent className="
                -ml-3
                sm:-ml-4
              "
              >
                {facilitiesSectionData.items.map(item => (
                  <CarouselItem
                    key={item.id}
                    className="
                      basis-[84%] pl-3
                      sm:basis-[55%] sm:pl-4
                      md:basis-[48%]
                      xl:basis-[42%]
                    "
                  >
                    <Link
                      href={item.url}
                      className="
                        group relative block h-[340px] w-full
                        md:h-[370px]
                      "
                    >
                      <Card
                        className="
                          size-full overflow-hidden rounded-2xl border
                          border-line bg-card shadow-xs transition-shadow
                          duration-300
                          hover:shadow-lg
                          md:rounded-3xl
                        "
                      >
                        {/* Image: shrinks to top half on hover */}
                        <div
                          className="
                            relative size-full overflow-hidden transition-all
                            duration-500 ease-out
                            group-hover:h-1/2
                            max-md:h-48
                          "
                        >
                          <Image
                            fill
                            src={item.image}
                            alt={item.title}
                            sizes="(min-width: 1280px) 340px, (min-width: 768px) 50vw, 85vw"
                            className="
                              size-full object-cover object-center
                              transition-transform duration-700 ease-out
                              group-hover:scale-105
                            "
                          />
                          {/* Smooth upward masking (like pelayanan umum) */}
                          <div
                            className="
                              pointer-events-none absolute inset-x-0 bottom-0
                              z-10 h-[55%] bg-linear-to-t from-background/90
                              via-background/45 to-transparent
                              transition-opacity duration-500
                              group-hover:opacity-0
                              dark:from-[#090d24]/95 dark:via-[#090d24]/50
                              dark:to-transparent
                            "
                          />
                        </div>

                        {/* Text Section: single unified title, smooth reveal of summary and affordance, NO black border line */}
                        <div
                          className="
                            absolute inset-x-0 bottom-0 z-20 flex flex-col
                            justify-start bg-transparent p-5 transition-all
                            duration-500 ease-out
                            group-hover:h-1/2 group-hover:bg-card/95
                            group-hover:pt-3.5 group-hover:backdrop-blur-md
                            max-md:relative max-md:h-auto max-md:bg-card
                            max-md:p-4
                            dark:group-hover:bg-[#090d24]/95
                          "
                        >
                          <h3
                            className="
                              text-base font-semibold tracking-tight
                              text-foreground
                              md:text-lg
                            "
                          >
                            {item.title}
                          </h3>
                          <p
                            className="
                              mt-1 line-clamp-2 max-h-0 pr-10 text-xs/relaxed
                              text-muted-foreground opacity-0 transition-all
                              duration-500 ease-out
                              group-hover:max-h-20 group-hover:opacity-100
                              max-md:max-h-20 max-md:opacity-100
                              md:text-sm/relaxed
                            "
                          >
                            {item.summary}
                          </p>
                          <div
                            className="
                              absolute right-4 bottom-4 flex size-8 items-center
                              justify-center rounded-full border border-line
                              bg-surface text-primary opacity-0 shadow-xs
                              transition-all duration-500
                              group-hover:-rotate-45 group-hover:border-primary
                              group-hover:bg-primary
                              group-hover:text-primary-foreground
                              group-hover:opacity-100
                              max-md:opacity-100
                              md:size-9
                            "
                          >
                            <ArrowRight className="size-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
