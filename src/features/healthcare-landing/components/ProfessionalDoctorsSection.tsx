import type { HealthcareTeamMember } from '@/features/healthcare-doctors/types';
import {
  AmanahScriptText,
  HealthcareHeading,
  HealthcareText,
  ViewportLine,
} from '@/components/healthcare';
import { TeamCard } from '@/features/healthcare-doctors/components/TeamCard';
import { SectionContainer } from './SectionContainer';

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
  return (
    <section
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
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <AmanahScriptText
              className="font-semibold text-foreground"
            >
              Kenali Dokter Kami
            </AmanahScriptText>
            <HealthcareHeading
              as="h2"
              size="section"
              className="mt-1 font-medium text-foreground"
            >
              Hangat Mendampingi, Sepenuh Hati.
            </HealthcareHeading>
            <HealthcareText
              size="body"
              className="mt-5 max-w-2xl font-medium text-muted-foreground"
            >
              Dokter Klinik Amanah Healthcare berkomitmen memberikan pendampingan yang nyaman dan terpercaya bagi pasien dan keluarga, mulai dari pemeriksaan, konsultasi, hingga perawatan lanjutan.
            </HealthcareText>
          </div>
        </div>

        <div className="
          relative mx-auto grid max-w-3xl auto-rows-fr gap-px bg-line
          md:grid-cols-2
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
