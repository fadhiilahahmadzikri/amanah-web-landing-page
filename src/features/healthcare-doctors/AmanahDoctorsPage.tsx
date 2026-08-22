import {
  HealthcareShell,
  TechnicalDivider,
} from '@/components/healthcare';
import { DoctorsHeroSection } from './components/DoctorsHeroSection';
import { TeamSection } from './components/TeamSection';
import { doctorSections } from './data';

type AmanahDoctorsPageProps = {
  locale?: string;
};

export function AmanahDoctorsPage({ locale }: AmanahDoctorsPageProps) {
  return (
    <HealthcareShell activePath="/dokter" locale={locale}>
      <DoctorsHeroSection />
      <TechnicalDivider />
      {doctorSections.map((section, index) => (
        <div key={section.id}>
          <TeamSection section={section} />
          {index < doctorSections.length - 1 && <TechnicalDivider />}
        </div>
      ))}
    </HealthcareShell>
  );
}
