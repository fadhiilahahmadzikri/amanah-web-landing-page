'use client';

import type { ServiceItem } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

type ServicesCarouselProps = {
  services: ServiceItem[];
};

const CARD_SCROLL_OFFSET = 400;

export function ServicesCarousel({ services }: ServicesCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToPreviousService = () => {
    viewportRef.current?.scrollBy({
      left: -CARD_SCROLL_OFFSET,
      behavior: 'smooth',
    });
  };

  const scrollToNextService = () => {
    viewportRef.current?.scrollBy({
      left: CARD_SCROLL_OFFSET,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-4" aria-label="Navigasi poster layanan">
        <Button
          type="button"
          size="icon-lg"
          variant="outline"
          className="rounded-full"
          aria-label="Lihat layanan sebelumnya"
          onClick={scrollToPreviousService}
        >
          <ArrowLeftIcon data-icon="inline-start" />
        </Button>
        <Button
          type="button"
          size="icon-lg"
          className="rounded-full"
          aria-label="Lihat layanan berikutnya"
          onClick={scrollToNextService}
        >
          <ArrowRightIcon data-icon="inline-start" />
        </Button>
      </div>

      <div
        ref={viewportRef}
        className="
          scrollbar-none overflow-x-auto scroll-smooth rounded-3xl
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="flex w-max snap-x snap-mandatory gap-6 pb-2">
          {services.map(service => (
            <article
              key={service.title}
              className="
                relative aspect-376/428 w-[min(78vw,376px)] shrink-0 snap-start
                overflow-hidden rounded-[1.25rem] bg-muted shadow-md
              "
            >
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 768px) 376px, 78vw"
                className="object-cover"
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
