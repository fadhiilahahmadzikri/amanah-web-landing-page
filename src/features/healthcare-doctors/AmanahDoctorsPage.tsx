import {
  HealthcareFooter,
  HealthcareHeader,
} from '@/components/healthcare';
import { DoctorsHeroSection } from './components/DoctorsHeroSection';
import { TeamSection } from './components/TeamSection';
import { doctorSections } from './data';

type AmanahDoctorsPageProps = {
  locale?: string;
};

export function AmanahDoctorsPage({ locale }: AmanahDoctorsPageProps) {
  return (
    <div className="
      min-h-screen overflow-x-hidden bg-background text-amanah-navy
    "
    >
      <HealthcareHeader activePath="/dokter" locale={locale} />
      <main>
        <DoctorsHeroSection />
        {doctorSections.map(section => (
          <TeamSection key={section.id} section={section} />
        ))}
      </main>
      <HealthcareFooter locale={locale} />
    </div>
  );
}
