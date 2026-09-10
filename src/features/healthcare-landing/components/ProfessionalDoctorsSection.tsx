'use client';

import type { HealthcareTeamMember } from '@/features/healthcare-doctors/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import {
  AmanahScriptText,
  HealthcareHeading,
  HealthcareText,
  ViewportLine,
} from '@/components/healthcare';
import { TeamCard } from '@/features/healthcare-doctors/components/TeamCard';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

const professionalDoctors = [
  {
    id: 'ika-fentiningrum',
    name: 'dr. Ika Fentiningrum',
    role: 'Dokter umum',
    image: {
      src: '/assets/images/dokter-fenti.png',
      alt: 'dr. Ika Fentiningrum dokter umum Klinik Amanah Healthcare',
    },
  },
  {
    id: 'nur-hidayatun',
    name: 'Nur Hidayatun',
    role: 'Bidan',
    image: {
      src: '/assets/images/dokter-hida.png',
      alt: 'Bidan Nur Hidayatun, S.ST Klinik Amanah Healthcare',
    },
  },
] satisfies HealthcareTeamMember[];

export function ProfessionalDoctorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (headerRef.current) {
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
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('article');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
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
      id="tenaga-profesional"
      className="bg-background"
    >
      <SectionContainer className="
        px-0
        sm:px-0
      "
      >
        <div className="
          px-6 py-10 text-center
          md:px-8 md:py-14
        "
        >
          <div
            ref={headerRef}
            className="mx-auto flex max-w-5xl flex-col items-center"
          >
            <div className="-mb-2 overflow-hidden pb-2">
              <AmanahScriptText
                mask="text"
                className="inline-block font-semibold text-foreground"
              >
                Kenali Dokter Kami
              </AmanahScriptText>
            </div>
            <div className="
              -mb-3 overflow-hidden pb-3
              md:-mb-4 md:pb-4
            "
            >
              <HealthcareHeading
                as="h2"
                data-mask-text
                size="section"
                className="mt-1 inline-block font-medium text-foreground will-change-transform"
              >
                Hangat Mendampingi, Sepenuh Hati.
              </HealthcareHeading>
            </div>
            <div className="
              mt-4 -mb-2 overflow-hidden pb-2
              sm:mt-5
            "
            >
              <HealthcareText
                data-mask-text
                size="body"
                className="
                  inline-block max-w-2xl font-medium text-muted-foreground will-change-transform
                "
              >
                Dokter Klinik Amanah Healthcare berkomitmen memberikan pendampingan yang nyaman dan terpercaya bagi pasien dan keluarga, mulai dari pemeriksaan, konsultasi, hingga perawatan lanjutan.
              </HealthcareText>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="
            relative mx-auto grid max-w-3xl auto-rows-fr gap-px bg-line
            grid-cols-2
          "
        >
          {professionalDoctors.map((doctor, index) => (
            <TeamCard
              key={doctor.id}
              className={index === 0 ? 'border-l border-line' : undefined}
              member={doctor}
              priority={index === 0}
              showRightRail={index === professionalDoctors.length - 1}
            />
          ))}
          <ViewportLine className="z-20" position="top" />
        </div>
      </SectionContainer>
    </section>
  );
}
