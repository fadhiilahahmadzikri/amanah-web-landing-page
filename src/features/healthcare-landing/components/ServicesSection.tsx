'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { ViewportLine } from '@/components/healthcare';
import { services } from '../data';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';
import { ServicesCarousel } from './ServicesCarousel';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) {
        return;
      }

      const maskLines = headerRef.current.querySelectorAll('[data-mask-text]');

      gsap.fromTo(
        maskLines,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="layanan"
      className="bg-background"
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          relative flex flex-col gap-8 px-6 pt-12 pb-8
          md:px-10 md:pt-16 md:pb-10
          md:flex-row md:items-end md:justify-between
        "
        >
          <div
            ref={headerRef}
            className="flex max-w-3xl flex-col items-start gap-8"
          >
            <PillLabel># Services</PillLabel>
            <div className="overflow-hidden">
              <h2
                data-mask-text
                className="
                  text-4xl/tight font-medium tracking-tight text-foreground
                  will-change-transform
                  md:text-6xl
                "
              >
                Layanan Kesehatan untuk Anda dan Keluarga
              </h2>
            </div>
          </div>

          <div
            className="
              hidden
              md:block
            "
            aria-hidden
          />
          <ViewportLine position="bottom" />
        </div>

        <div className="relative pt-8">
          <ServicesCarousel services={services} />
        </div>
      </SectionContainer>
    </section>
  );
}
