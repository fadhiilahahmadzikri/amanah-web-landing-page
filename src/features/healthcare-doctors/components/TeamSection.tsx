import type { HealthcareTeamSection } from '../types';
import type { CSSProperties } from 'react';
import {
  SectionContainer,
  TechnicalDivider,
} from '@/components/healthcare';
import { TeamCard } from './TeamCard';

type TeamSectionProps = {
  section: HealthcareTeamSection;
};

type TeamGridStyle = CSSProperties & {
  '--doctor-card-min': string;
};

const teamGridStyle = {
  '--doctor-card-min': 'clamp(150px, 48vw, 292px)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(calc((100% - 1px) / 2), var(--doctor-card-min)), 1fr))',
} satisfies TeamGridStyle;

export function TeamSection({ section }: TeamSectionProps) {
  return (
    <section
      id={section.id}
      className="
        bg-background
      "
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          px-6 py-10 text-center
          md:px-8 md:py-12
        "
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <p className="
              font-amanah-script text-3xl/[1.05] font-semibold
              text-foreground
              md:text-4xl/[1.05]
            "
            >
              {section.eyebrow}
            </p>
            <h2 className="
              mt-3 text-4xl/[1.08] font-medium tracking-tight text-foreground
              md:text-5xl/[1.08] lg:whitespace-nowrap
            "
            >
              {section.title}
            </h2>
            <p className="
              mt-5 line-clamp-2 max-w-2xl text-sm/[1.65] font-medium
              text-muted-foreground
              md:text-base
            "
            >
              {section.description}
            </p>
          </div>
        </div>

        <TechnicalDivider />

        <div
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
