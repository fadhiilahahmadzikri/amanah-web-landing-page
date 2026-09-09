'use client';

import type { CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/utils/Helpers';

export type GalleryHoverCarouselItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
};

type GalleryHoverCarouselProps = {
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  demoUrl?: string;
  items?: GalleryHoverCarouselItem[];
  className?: string;
};

export default function GalleryHoverCarousel({
  heading = 'Ruang Nyaman untuk Anda dan Keluarga',
  subheading = 'Klinik Amanah menyediakan fasilitas yang nyaman dan lengkap untuk mendukung kebutuhan kesehatan Anda dan keluarga.',
  eyebrow = 'Fasilitas',
  demoUrl = '#',
  items = [
    {
      id: 'item-apotek',
      title: 'Apotek',
      summary:
        'Menyediakan kebutuhan obat-obatan dan resep medis Anda dengan cepat tanpa perlu pindah tempat.',
      url: demoUrl,
      image: '/assets/images/dokumentasi/dokumentasi-17.png',
    },
    {
      id: 'item-ruang-bersalin',
      title: 'Ruang Persalinan 24 Jam',
      summary:
        'Siaga setiap saat untuk mendampingi proses melahirkan dengan aman, nyaman, dan ditangani tenaga medis profesional.',
      url: demoUrl,
      image: '/assets/images/asset-index-8.jpg',
    },
    {
      id: 'item-ruang-tunggu',
      title: 'Ruang Tunggu Nyaman',
      summary:
        'Area tunggu yang bersih, sejuk, dan ramah keluarga agar Anda dan kerabat tetap merasa rileks saat berobat.',
      url: demoUrl,
      image: '/assets/images/dokumentasi/dokumentasi-12.png',
    },
    {
      id: 'item-baby-care',
      title: 'Baby Care Center',
      summary:
        'Area khusus perawatan dan stimulasi bayi yang aman, bersih, dan nyaman bagi si kecil.',
      url: demoUrl,
      image: '/assets/images/asset-index-1.jpg',
    },
  ],
  className,
}: GalleryHoverCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const autoplayPluginRef = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  // Carousel scroll tracking
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

  return (
    <section className={cn(`
      bg-background py-12 text-foreground
      md:py-16
      lg:py-20
    `, className)}
    >
      <div className="
        mx-auto w-full max-w-[1300px] px-4
        sm:px-5
      "
      >
        <div className="
          grid grid-cols-1 items-start gap-8
          lg:grid-cols-12 lg:gap-10
        "
        >
          {/* Left Intro Column (per wireframe) */}
          <div className="
            flex flex-col items-start self-start
            lg:col-span-4
          "
          >
            {eyebrow && (
              <span
                className="
                  inline-flex items-center rounded-none border border-line
                  bg-amanah-soft/60 px-3 py-1.5 text-xs font-semibold
                  tracking-[0.16em] text-primary uppercase
                  dark:bg-amanah-soft/20
                "
              >
                {eyebrow}
              </span>
            )}
            <h2
              className="
                mt-3 text-2xl/tight font-semibold tracking-tight text-foreground
                sm:mt-3.5 sm:text-3xl/tight
                md:text-4xl/tight
              "
            >
              {heading}
            </h2>
            <p
              className="
                mt-3 text-sm/relaxed text-muted-foreground
                sm:text-base/relaxed
              "
            >
              {subheading}
            </p>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center gap-2.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Fasilitas sebelumnya"
                className="
                  size-10 rounded-full border-line bg-surface text-primary
                  transition-colors
                  hover:border-primary hover:bg-amanah-soft
                  hover:text-amanah-blue
                  disabled:opacity-40
                  dark:bg-surface/50
                "
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Fasilitas selanjutnya"
                className="
                  size-10 rounded-full border-line bg-surface text-primary
                  transition-colors
                  hover:border-primary hover:bg-amanah-soft
                  hover:text-amanah-blue
                  disabled:opacity-40
                  dark:bg-surface/50
                "
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Carousel Column (per wireframe) */}
          <div className="
            w-full min-w-0
            lg:col-span-8
          "
          >
            <Carousel
              setApi={setCarouselApi}
              plugins={[autoplayPluginRef.current]}
              opts={{
                align: 'start',
                loop: true,
                breakpoints: { '(max-width: 768px)': { dragFree: true } },
              }}
              className="relative w-full"
            >
              <CarouselContent className="
                -ml-3
                sm:-ml-4
              "
              >
                {items.map(item => (
                  <CarouselItem
                    key={item.id}
                    className="
                      basis-[85%] pl-3
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
                          size-full overflow-hidden rounded-none border
                          border-line bg-card shadow-xs transition-shadow
                          duration-300
                          hover:shadow-md
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
      </div>
    </section>
  );
}
