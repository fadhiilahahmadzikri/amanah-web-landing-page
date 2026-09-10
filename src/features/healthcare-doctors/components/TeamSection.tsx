'use client';

import type { CSSProperties } from 'react';
import type { HealthcareTeamSection } from '../types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import {
  SectionContainer,
  SectionHeader,
  TechnicalDivider,
} from '@/components/healthcare';
import { TeamCard } from './TeamCard';

gsap.registerPlugin(ScrollTrigger);

type TeamSectionProps = {
  section: HealthcareTeamSection;
};

type TeamGridStyle = CSSProperties & {
  '--doctor-card-min': string;
};

const teamGridStyle = {
  '--doctor-card-min': 'clamp(150px, 48vw, 292px)',
  'gridTemplateColumns': 'repeat(auto-fit, minmax(min(calc((100% - 1px) / 2), var(--doctor-card-min)), 1fr))',
} satisfies TeamGridStyle;

export function TeamSection({ section }: TeamSectionProps) {
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
            stagger: 0.08,
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
      id={section.id}
      className="bg-background"
    >
      <SectionContainer className="
        px-0
        sm:px-0
      "
      >
        <div className="
          px-6 py-10 text-center
          md:px-8 md:py-12
        "
        >
          <SectionHeader
            ref={headerRef}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            descriptionClassName="line-clamp-2"
          />
        </div>

        <TechnicalDivider />

        <div
          ref={gridRef}
          className="grid auto-rows-fr gap-px bg-line"
          style={teamGridStyle}
        >
          {section.members.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              priority={index < 4}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
