'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { trustHighlights } from '../data';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

export function TrustHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const panels = sectionRef.current?.querySelectorAll('[data-trust-panel]');
      if (panels && panels.length > 0) {
        gsap.fromTo(
          panels,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
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

      if (counterRef.current) {
        const counterTarget = { val: 0 };
        gsap.to(counterTarget, {
          val: 5000,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.floor(counterTarget.val).toLocaleString('id-ID')}+`;
            }
          },
        });
      }

      const avatars = sectionRef.current?.querySelectorAll('[data-avatar-item]');
      if (avatars && avatars.length > 0) {
        gsap.fromTo(
          avatars,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'back.out(1.8)',
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
      aria-label="Ringkasan pelayanan Klinik Amanah"
      className="relative z-10 bg-background"
    >
      <SectionContainer className="
        grid max-w-[1300px] px-0 sm:px-0
        min-[1400px]:grid-cols-[650px_304px_297px]
        lg:grid-cols-[minmax(0,2.14fr)_minmax(0,1fr)_minmax(0,0.98fr)]
      "
      >
        <div className="
          grid border-b border-line
          min-[1400px]:grid-cols-[241px_361px]
          sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-stretch
          lg:border-r lg:border-b-0
        "
        >
          <div
            data-trust-panel
            className="
              flex min-h-[149px] flex-col items-start justify-between gap-10
              border-b border-line bg-background p-6
              sm:border-r sm:border-b-0
              lg:px-[30px] lg:py-[18px]
            "
          >
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-xl font-medium text-foreground">
                {trustHighlights.service.eyebrow}
              </h2>
              <p className="max-w-[203px] text-[15px]/[22px] text-muted-foreground">
                {trustHighlights.service.title}
              </p>
            </div>

            <a
              href="#layanan"
              className="
                inline-flex items-center gap-[10px] text-[15px]/[22px]
                border-b border-line pb-0.5 font-semibold text-foreground
                transition-colors hover:border-foreground/50
              "
            >
              {trustHighlights.service.cta}
              <Image
                src={trustHighlights.service.ctaIcon.src}
                alt={trustHighlights.service.ctaIcon.alt}
                width={13}
                height={13}
                aria-hidden="true"
                className="grayscale"
              />
            </a>
          </div>

          <div className="
            grid
            min-[1400px]:grid-cols-[163px_178px]
            sm:grid-cols-2
          "
          >
            <div
              data-trust-panel
              className="
                flex min-h-[205px] flex-col justify-center gap-[15px]
                border-b border-line bg-background px-6 py-7
                sm:border-r sm:border-b-0
              "
            >
              <Image
                src={trustHighlights.patientCount.icon.src}
                alt={trustHighlights.patientCount.icon.alt}
                width={20}
                height={20}
                aria-hidden="true"
                className="size-5 object-contain grayscale"
              />
              <div className="flex flex-col gap-[15px] pt-2">
                <p className="text-[15px]/[22px] text-muted-foreground">
                  {trustHighlights.patientCount.label}
                </p>
                <div className="overflow-hidden">
                  <strong ref={counterRef} className="inline-block text-2xl font-bold text-foreground">
                    {trustHighlights.patientCount.value}
                  </strong>
                </div>
              </div>
            </div>

            <div
              data-trust-panel
              className="
                flex min-h-[203px] items-center justify-center overflow-hidden
                bg-background px-6 py-7
              "
            >
              <Image
                src={trustHighlights.patientCount.image.src}
                alt={trustHighlights.patientCount.image.alt}
                width={178}
                height={147}
                className="
                  h-auto w-full max-w-[178px] object-contain grayscale
                "
              />
            </div>
          </div>
        </div>

        <div
          data-trust-panel
          className="
            flex min-h-[241px] flex-col justify-center gap-8 border-b
            border-line bg-background px-8 py-10
            lg:border-r lg:border-b-0
            md:px-[38px] md:py-[45px]
          "
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-[17px]/[25px] font-medium text-foreground">
              {trustHighlights.community.title}
            </h2>
            <p className="text-[17px]/[25px] text-muted-foreground">
              {trustHighlights.community.description}
            </p>
          </div>
          <div className="flex">
            {trustHighlights.community.avatars.map((avatar, index) => (
              <Image
                key={avatar.src}
                data-avatar-item
                src={avatar.src}
                alt={avatar.alt}
                width={56}
                height={56}
                className="
                  size-14 rounded-full border-2 border-background object-cover
                "
                style={{ marginLeft: index === 0 ? 0 : -16 }}
              />
            ))}
          </div>
        </div>

        <div
          data-trust-panel
          className="
            flex min-h-[241px] flex-col justify-center gap-5 bg-background p-8
          "
        >
          <Image
            src={trustHighlights.quote.icon.src}
            alt={trustHighlights.quote.icon.alt}
            width={20}
            height={20}
            aria-hidden="true"
            className="size-5 object-contain grayscale"
          />
          <blockquote className="
            text-[17px]/[25px] font-medium text-foreground italic
          "
          >
            {trustHighlights.quote.text}
          </blockquote>
          <p className="text-[15px]/[23px] text-muted-foreground">
            {trustHighlights.quote.author}
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
