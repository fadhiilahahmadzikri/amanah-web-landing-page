'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { aboutSlides } from '../data';
import { AboutCarousel } from './AboutCarousel';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
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
      id="tentang-kami"
      className="overflow-hidden bg-background"
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          overflow-hidden bg-card pt-12
          md:pt-20
        "
        >
          <div
            ref={headerRef}
            className="
              mx-auto flex max-w-3xl flex-col items-center gap-4 px-6
              text-center
            "
          >
            <div className="overflow-hidden">
              <p
                data-mask-text
                className="
                  inline-block font-amanah-script text-3xl text-foreground
                  will-change-transform
                  md:text-4xl
                "
              >
                Tentang Kami
              </p>
            </div>
            <div className="overflow-hidden">
              <h2
                data-mask-text
                className="
                  inline-block text-4xl/tight font-medium tracking-tight
                  text-foreground will-change-transform
                  md:text-6xl
                "
              >
                Kenali Klinik Amanah
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                data-mask-text
                className="
                  inline-block max-w-2xl text-base/relaxed text-muted-foreground
                  will-change-transform
                  md:text-lg/relaxed
                "
              >
                Memberikan pelayanan kesehatan yang profesional, nyaman, dan terpercaya untuk Anda dan keluarga.
              </p>
            </div>
          </div>

          <AboutCarousel slides={aboutSlides} />
        </div>
      </SectionContainer>
    </section>
  );
}
