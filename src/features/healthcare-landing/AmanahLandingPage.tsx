import {
  HealthcareShell,
  TechnicalDivider,
} from '@/components/healthcare';
import { AppointmentSection } from './components/AppointmentSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { HeroSection } from './components/HeroSection';
import { KhitanShowcaseSection } from './components/KhitanShowcaseSection';
import { ProfessionalDoctorsSection } from './components/ProfessionalDoctorsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustHighlights } from './components/TrustHighlights';

type AmanahLandingPageProps = {
  locale?: string;
};

export function AmanahLandingPage({ locale }: AmanahLandingPageProps) {
  return (
    <HealthcareShell activePath="/" locale={locale}>
      <HeroSection />
      <TrustHighlights />
      <TechnicalDivider />
      <FacilitiesSection />
      <TechnicalDivider />
      <ProfessionalDoctorsSection />
      <TechnicalDivider />
      <KhitanShowcaseSection />
      <TechnicalDivider />
      <AppointmentSection />
      <TechnicalDivider />
      <TestimonialsSection />
    </HealthcareShell>
  );
}
