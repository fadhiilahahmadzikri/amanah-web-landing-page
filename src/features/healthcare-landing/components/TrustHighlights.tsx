'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { HealthcareHeading, HealthcareText } from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import { trustHighlights } from '../data';
import { SectionContainer } from './SectionContainer';
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
        grid max-w-[1300px] px-0
        min-[1400px]:grid-cols-[650px_304px_297px]
        sm:px-0
        lg:grid-cols-[minmax(0,2.14fr)_minmax(0,1fr)_minmax(0,0.98fr)]
      "
      >
        <div className="
          grid grid-cols-2 border-b border-line
          sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-stretch
          min-[1400px]:grid-cols-[241px_361px]
          lg:border-r lg:border-b-0
        "
        >
          <div
            data-trust-panel
            className="
              flex flex-col items-start justify-between gap-6
              border-r border-line bg-background p-4
              sm:min-h-[149px] sm:gap-10 sm:p-6
              lg:px-[30px] lg:py-[18px]
            "
          >
            <div className="flex flex-col gap-2 sm:gap-[15px]">
              <HealthcareHeading
                as="h2"
                size="card"
                className="text-sm font-medium text-foreground sm:text-base"
              >
                {trustHighlights.service.eyebrow}
              </HealthcareHeading>
              <HealthcareText
                size="small"
                className="max-w-[203px] text-xs text-muted-foreground sm:text-sm"
              >
                {trustHighlights.service.title}
              </HealthcareText>
            </div>

            <a
              href="#layanan"
              className="
                inline-flex items-center gap-1.5 border-b border-line pb-0.5
                text-xs font-semibold text-primary transition-colors
                hover:border-primary hover:text-amanah-blue
                sm:gap-[10px] sm:amanah-type-small
              "
            >
              {trustHighlights.service.cta}
              <Image
                src={trustHighlights.service.ctaIcon.src}
                alt={trustHighlights.service.ctaIcon.alt}
                width={13}
                height={13}
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="
            flex flex-col
            sm:grid sm:grid-cols-2
            min-[1400px]:grid-cols-[163px_178px]
          "
          >
            <div
              data-trust-panel
              className="
                flex flex-1 flex-col justify-center gap-3 bg-background p-4
                sm:min-h-[205px] sm:gap-[15px] sm:border-r sm:border-line sm:px-6 sm:py-7
              "
            >
              <Image
                src={trustHighlights.patientCount.icon.src}
                alt={trustHighlights.patientCount.icon.alt}
                width={20}
                height={20}
                aria-hidden="true"
                className="size-4 object-contain sm:size-5"
              />
              <div className="flex flex-col gap-1.5 pt-1 sm:gap-[15px] sm:pt-2">
                <HealthcareText size="small" className="text-xs text-muted-foreground sm:text-sm">
                  {trustHighlights.patientCount.label}
                </HealthcareText>
                <div className="overflow-hidden">
                  <strong
                    ref={counterRef}
                    className="
                      inline-block text-2xl font-bold text-foreground
                      sm:amanah-type-subsection
                    "
                  >
                    {trustHighlights.patientCount.value}
                  </strong>
                </div>
              </div>
            </div>

            <div
              data-trust-panel
              className="
                hidden sm:flex sm:min-h-[203px] sm:items-center sm:justify-center
                sm:overflow-hidden bg-linear-to-r from-amanah-sky/25 to-background px-6 py-7
                dark:from-amanah-blue/20 dark:to-card
              "
            >
              <Image
                src={trustHighlights.patientCount.image.src}
                alt={trustHighlights.patientCount.image.alt}
                width={178}
                height={147}
                className="h-auto w-full max-w-[178px] object-contain"
              />
            </div>
          </div>
        </div>

        <div
          data-trust-panel
          className="
            flex min-h-[241px] flex-col justify-center gap-8 border-b
            border-line bg-background px-8 py-10
            md:px-[38px] md:py-[45px]
            lg:border-r lg:border-b-0
          "
        >
          <div className="flex flex-col gap-3">
            <HealthcareHeading
              as="h2"
              size="card"
              className="font-medium text-foreground"
            >
              {trustHighlights.community.title}
            </HealthcareHeading>
            <HealthcareText className="text-muted-foreground">
              {trustHighlights.community.description}
            </HealthcareText>
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
            className="size-5 object-contain"
          />
          <HealthcareText
            as="blockquote"
            className="font-medium text-foreground italic"
          >
            {trustHighlights.quote.text}
          </HealthcareText>
          <HealthcareText size="small" className="text-muted-foreground">
            {trustHighlights.quote.author}
          </HealthcareText>
        </div>
      </SectionContainer>
    </section>
  );
}
