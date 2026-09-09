'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { ViewportLine } from '@/components/healthcare';
import { hero } from '../data';
import { ArrowCtaButton } from './ArrowCtaButton';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'expo.out' } });

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.1, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' },
          0,
        );

        gsap.to(imageRef.current, {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        const eyebrow = contentRef.current.querySelector('[data-hero-eyebrow]');
        const maskLines = contentRef.current.querySelectorAll('[data-mask-line]');
        const cta = contentRef.current.querySelector('[data-hero-cta]');
        const pills = contentRef.current.querySelectorAll('[data-hero-pill]');

        if (eyebrow) {
          tl.fromTo(
            eyebrow,
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' },
            0.1,
          );
        }

        if (maskLines.length > 0) {
          tl.fromTo(
            maskLines,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.12, ease: 'expo.out' },
            0.2,
          );
        }

        if (cta) {
          tl.fromTo(
            cta,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
            0.55,
          );
        }

        if (pills.length > 0) {
          tl.fromTo(
            pills,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
            0.7,
          );
        }
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative bg-background"
    >
      <div className="
        relative min-h-[600px] overflow-hidden
        md:min-h-[720px]
      "
      >
        <div
          ref={imageRef}
          className="absolute inset-0 size-full will-change-transform"
        >
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            sizes="(min-width: 1300px) 1300px, 100vw"
            className="
              object-cover object-[62%_center]
              md:object-center
            "
            priority
          />
          <div className="
            absolute inset-0 bg-linear-to-r from-background via-background/88
            to-background/20
          "
          />
        </div>

        <SectionContainer className="
          relative flex min-h-[600px] items-center px-4
          md:min-h-[720px] md:px-10
        "
        >
          <div
            ref={contentRef}
            className="
              max-w-[760px]
              max-sm:pt-10
            "
          >
            <div className="
              mb-7 overflow-hidden
              md:mb-10
            "
            >
              <p
                data-hero-eyebrow
                className="
                  inline-flex rounded-none border border-line bg-amanah-soft/70
                  px-3 py-1.5 text-xs font-semibold tracking-[0.16em]
                  text-primary uppercase backdrop-blur-sm
                  dark:bg-amanah-soft/30
                "
              >
                {hero.eyebrow}
              </p>
            </div>

            <h1 className="
              flex flex-col gap-2 text-4xl leading-[1.04] font-medium
              tracking-tight text-foreground
              sm:text-5xl
              md:text-7xl md:font-medium
            "
            >
              <div className="-mb-1 overflow-hidden pb-2">
                <span
                  data-mask-line
                  className="inline-block will-change-transform"
                >
                  {hero.title}
                </span>
              </div>
              <div className="-mb-2 overflow-hidden pb-4">
                <span
                  data-mask-line
                  className="
                    inline-block font-amanah-script text-5xl leading-none
                    will-change-transform
                    sm:text-6xl
                    md:text-7xl
                  "
                >
                  {hero.scriptTitle}
                </span>
              </div>
            </h1>

            <div
              data-hero-cta
              className="
                mt-8 w-fit
                md:mt-10
              "
            >
              <ArrowCtaButton href="/kontak">
                Buat Janji Temu
              </ArrowCtaButton>
            </div>

            <div className="
              mt-10 grid max-w-2xl border-y border-line text-xs
              text-muted-foreground
              sm:grid-cols-3
            "
            >
              {['Klinik keluarga', 'Yogyakarta', '5,000+ pasien'].map(item => (
                <span
                  key={item}
                  data-hero-pill
                  className="
                    border-line py-3 font-medium tracking-[0.14em] uppercase
                    sm:border-r sm:px-4
                    sm:first:pl-0
                    sm:last:border-r-0
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
      <ViewportLine position="bottom" />
    </section>
  );
}
