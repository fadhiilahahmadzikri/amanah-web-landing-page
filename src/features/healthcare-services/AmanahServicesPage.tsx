import {
  HealthcareShell,
  TechnicalDivider,
} from '@/components/healthcare';
import { ServicesHeroSection } from './components/organisms/ServicesHeroSection';
import { ServicesExperience } from './components/ServicesExperience';

type AmanahServicesPageProps = {
  locale?: string;
};

export function AmanahServicesPage({ locale }: AmanahServicesPageProps) {
  return (
    <HealthcareShell activePath="/layanan" locale={locale}>
      <ServicesHeroSection />
      <TechnicalDivider />
      <ServicesExperience />
    </HealthcareShell>
  );
}
