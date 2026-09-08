'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { SectionContainer } from '@/components/healthcare';
import { PillLabel } from '@/features/healthcare-landing/components/PillLabel';
import { cn } from '@/utils/Helpers';
import { servicesHeroData } from '../../data';
import { HeroCurvedVisual } from '../atoms/HeroCurvedVisual';

import { ServiceFeatureHighlight } from '../atoms/ServiceFeatureHighlight';

gsap.registerPlugin(ScrollTrigger);

type ServicesHeroSectionProps = {
  className?: string;
};

export function ServicesHeroSection({ className }: ServicesHeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current || !visualRef.current) {
        return;
      }

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'expo.out' } });

      const eyebrow = contentRef.current.querySelector('[data-hero-eyebrow]');
      const heading = contentRef.current.querySelector('[data-hero-heading]');
      const desc = contentRef.current.querySelector('[data-hero-desc]');
      const highlights = contentRef.current.querySelector('[data-hero-highlights]');

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0,
        );
      }

      if (heading) {
        tl.fromTo(
          heading,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          0.1,
        );
      }

      if (desc) {
        tl.fromTo(
          desc,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.2,
        );
      }

      if (highlights) {
        tl.fromTo(
          highlights,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.3,
        );
      }

      tl.fromTo(
        visualRef.current,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        0.15,
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={cn('relative overflow-hidden bg-background', className)}
    >
      <SectionContainer className="
        relative isolate overflow-hidden px-0
        sm:px-0
      "
      >
        <div
          className="
            relative flex min-h-[480px] flex-col overflow-hidden bg-background
            md:min-h-[520px] md:flex-row md:items-stretch md:justify-between
            lg:min-h-[560px]
          "
        >
          {/* Left Textual Context & Highlights */}
          <div
            ref={contentRef}
            className="
              z-10 flex max-w-full flex-col justify-center px-6 py-10
              md:max-w-[50%] md:py-14 md:pr-4 md:pl-10
              lg:max-w-[48%] lg:py-16 lg:pl-12
            "
          >
            {/* Pill Eyebrow reusing the existing design system component */}
            <div data-hero-eyebrow>
              <PillLabel>{servicesHeroData.eyebrow}</PillLabel>
            </div>

            {/* Headline with project-wide typography convention */}
            <div className="
              mt-6 -mb-3 overflow-hidden pb-3
              md:-mb-4 md:pb-4
            "
            >
              <h2
                data-hero-heading
                className="
                  text-4xl/tight font-medium tracking-tight text-foreground
                  will-change-transform
                  md:text-6xl
                "
              >
                Layanan Kesehatan untuk
                {' '}
                <span className="
                  text-amanah-blue
                  dark:text-amanah-sky
                "
                >
                  Anda dan Keluarga
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <div className="mt-5 -mb-2 overflow-hidden pb-2">
              <p
                data-hero-desc
                className="
                  max-w-xl text-base/relaxed text-muted-foreground
                  md:text-lg/relaxed
                "
              >
                {servicesHeroData.description}
              </p>
            </div>

            {/* 3 Circular KPI Indicators in a STRICT single horizontal row */}
            <div
              data-hero-highlights
              className="
                mt-8 grid w-full max-w-xl grid-cols-3 items-center gap-2
                border-t border-line/60 pt-6
                sm:gap-3.5
                lg:gap-6
              "
            >
              {servicesHeroData.highlights.map(item => (
                <ServiceFeatureHighlight
                  key={item.id}
                  title={item.title}
                />
              ))}
            </div>
          </div>

          {/* Right Visual Anchor extending flush against the right rail and touching top & bottom dividers */}
          <div
            ref={visualRef}
            className="
              relative flex h-[360px] w-full items-end justify-end
              overflow-hidden
              sm:h-[420px]
              md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[54%]
              lg:w-[52%]
            "
          >
            <HeroCurvedVisual
              src={servicesHeroData.image.src}
              alt={servicesHeroData.image.alt}
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
