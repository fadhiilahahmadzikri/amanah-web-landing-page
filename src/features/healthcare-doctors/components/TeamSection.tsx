import type { HealthcareTeamSection } from '../types';
import { SectionContainer } from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import { TeamCard } from './TeamCard';

type TeamSectionProps = {
  section: HealthcareTeamSection;
};

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
          border-b border-line px-6 py-10
          md:px-8 md:py-12
        "
        >
          <p className="
            text-xs font-semibold tracking-[0.16em] text-muted-foreground
            uppercase
          "
          >
            {section.eyebrow}
          </p>
          <h2 className="
            mt-3 max-w-3xl text-4xl/[1.08] font-medium tracking-tight
            text-foreground
            md:text-5xl/[1.08]
          "
          >
            {section.title}
          </h2>
          <p className="
            mt-5 max-w-2xl text-sm/[1.65] font-medium text-muted-foreground
            md:text-base
          "
          >
            {section.description}
          </p>
        </div>

        <div className="
          grid
          sm:grid-cols-2
          xl:grid-cols-4
        "
        >
          {section.members.map((member, index) => {
            const isLastCard = index === section.members.length - 1;

            return (
              <TeamCard
                key={member.id}
                member={member}
                priority={index < 4}
                className={cn(
                  'border-line',
                  !isLastCard && 'border-b',
                  index % 2 === 0 && 'sm:border-r',
                  index >= section.members.length - 2 && 'sm:border-b-0',
                  index < section.members.length - 1 && 'xl:border-r',
                  'xl:border-b-0',
                )}
              />
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
