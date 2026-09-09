'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { appointment, watermark } from '../data';
import { ArrowCtaButton } from './ArrowCtaButton';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

export function AppointmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (textRef.current) {
        const maskLines = textRef.current.querySelectorAll('[data-mask-text]');
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
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.08 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
      id="dokter"
      className="bg-background"
    >
      <SectionContainer className="
        relative isolate overflow-hidden px-0
        sm:px-0
      "
      >
        <div className="
          relative z-10 grid
          lg:grid-cols-2
        "
        >
          <div className="
            relative flex min-h-[520px] flex-col items-start justify-center
            gap-8 overflow-hidden bg-background px-6 py-12 text-foreground
            md:px-10 md:py-16
          "
          >
            <Image
              ref={watermarkRef}
              src={watermark.src}
              alt=""
              width={547}
              height={547}
              className="
                pointer-events-none absolute top-24 -left-44 hidden h-auto
                w-[760px] max-w-none opacity-[0.045] brightness-0
                md:block
                xl:w-[808px]
                dark:opacity-[0.08] dark:brightness-100
              "
              aria-hidden
            />

            <div
              ref={textRef}
              className="relative z-10 flex max-w-xl flex-col items-start gap-8"
            >
              <PillLabel>{appointment.eyebrow}</PillLabel>
              <div className="
                -mb-3 overflow-hidden pb-3
                md:-mb-4 md:pb-4
              "
              >
                <h2
                  data-mask-text
                  className="
                    text-4xl/tight font-medium tracking-tight
                    will-change-transform
                    md:text-6xl
                  "
                >
                  {appointment.title}
                </h2>
              </div>
              <div className="-mb-2 overflow-hidden pb-2">
                <p
                  data-mask-text
                  className="
                    text-lg/relaxed text-muted-foreground will-change-transform
                    md:text-xl
                  "
                >
                  {appointment.description}
                </p>
              </div>
              <ArrowCtaButton href="/kontak">
                Buat Janji Temu
              </ArrowCtaButton>
            </div>
          </div>

          <div
            ref={imageRef}
            className="
              relative min-h-[420px] overflow-hidden border-t border-line
              bg-background
              lg:min-h-[560px] lg:border-t-0 lg:border-l
            "
          >
            <Image
              src={appointment.image.src}
              alt={appointment.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
