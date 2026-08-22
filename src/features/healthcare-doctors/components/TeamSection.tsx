import type { HealthcareTeamSection } from '../types';
import { SectionContainer } from '@/components/healthcare';
import { TeamCard } from './TeamCard';

type TeamSectionProps = {
  section: HealthcareTeamSection;
};

export function TeamSection({ section }: TeamSectionProps) {
  return (
    <section
      id={section.id}
      className="
        bg-background py-12
        md:py-16
      "
    >
      <SectionContainer className="max-w-[1400px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="
            font-amanah-script text-3xl/[1.1] text-amanah-navy
            md:text-4xl
          "
          >
            {section.eyebrow}
          </p>
          <h2 className="
            mt-3 text-4xl/[1.08] font-semibold text-amanah-navy
            md:text-5xl/[1.08]
          "
          >
            {section.title}
          </h2>
          <p className="
            mx-auto mt-5 max-w-2xl text-sm/[1.65] font-semibold
            text-amanah-muted
            md:text-base
          "
          >
            {section.description}
          </p>
        </div>

        <div className="
          mt-10 grid gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
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
