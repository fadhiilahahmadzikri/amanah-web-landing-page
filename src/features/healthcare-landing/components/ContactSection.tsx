'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { ViewportLine } from '@/components/healthcare';
import { contactImage, contactItems } from '../data';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (leftRef.current) {
        const maskLines = leftRef.current.querySelectorAll('[data-mask-text]');
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

      if (rightRef.current) {
        const items = rightRef.current.querySelectorAll('[data-contact-item]');
        gsap.fromTo(
          items,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
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
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 90%',
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
      id="kontak"
      className="bg-background"
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          relative
          grid
          lg:grid-cols-[1fr_1.05fr]
        "
        >
          <div
            ref={leftRef}
            className="
              flex flex-col gap-8 border-b border-line bg-background px-6 py-12
              lg:border-r lg:border-b-0
              md:px-10 md:py-16
            "
          >
            <div className="overflow-hidden">
              <h2
                data-mask-text
                className="
                  text-5xl/tight font-medium tracking-tight text-foreground
                  will-change-transform
                  md:text-7xl
                "
              >
                Mari Terhubung
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                data-mask-text
                className="
                  max-w-xl text-lg/relaxed text-muted-foreground
                  will-change-transform
                  md:text-xl
                "
              >
                Punya pertanyaan atau ingin membuat janji kunjungan? Hubungi Klinik Amanah Healthcare. Tim kami siap membantu memberikan informasi mengenai layanan, jadwal dokter, dan kebutuhan kesehatan Anda.
              </p>
            </div>
          </div>

          <div
            ref={rightRef}
            className="
              flex flex-col justify-center gap-8 bg-background px-6 py-12
              md:px-10 md:py-16
            "
          >
            {contactItems.map(item => (
              <div key={item.href} data-contact-item className="flex flex-col gap-3">
                <p className="text-base font-semibold text-muted-foreground">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="
                    w-fit border-b border-line pb-0.5 text-2xl font-bold
                    wrap-break-word text-foreground transition-colors
                    hover:border-foreground/50
                    md:text-3xl
                  "
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
          <ViewportLine position="bottom" />
        </div>

        <div className="relative">
          <div
            ref={imageRef}
            className="
              relative aspect-1256/580 overflow-hidden bg-muted
            "
          >
            <Image
              src={contactImage.src}
              alt={contactImage.alt}
              fill
              sizes="(min-width: 1320px) 1256px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
