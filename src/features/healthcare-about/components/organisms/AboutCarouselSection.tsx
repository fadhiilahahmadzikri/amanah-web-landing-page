'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { SectionContainer } from '@/components/healthcare';
import { aboutSlides } from '../../data';
import { AboutCarousel } from '../molecules/AboutCarousel';

gsap.registerPlugin(ScrollTrigger);

export function AboutCarouselSection() {
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
      id="tentang-kami-carousel"
      className="overflow-hidden bg-background"
    >
      <SectionContainer className="
        px-0
        sm:px-0
      "
      >
        <div className="
          overflow-hidden bg-card pt-12
          md:pt-20
        "
        >
          <div
            ref={headerRef}
            className="
              mx-auto flex max-w-3xl flex-col items-center px-6 text-center
            "
          >
            <div className="-mb-2 overflow-hidden pb-2">
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
            <div className="
              -mb-3 overflow-hidden pb-3
              md:-mb-4 md:pb-4
            "
            >
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
            <div className="
              mt-4 -mb-2 overflow-hidden pb-2
              sm:mt-5
            "
            >
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
