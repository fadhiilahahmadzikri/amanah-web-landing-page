import {
  HealthcareShell,
  TechnicalDivider,
} from '@/components/healthcare';
import { FacilitiesCarouselSection } from './components/organisms/FacilitiesCarouselSection';
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
      <FacilitiesCarouselSection />
      <TechnicalDivider />
      <ServicesExperience />
    </HealthcareShell>
  );
}
