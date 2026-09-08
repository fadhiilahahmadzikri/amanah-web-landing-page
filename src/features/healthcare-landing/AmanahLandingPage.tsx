import {
  HealthcareShell,
  TechnicalDivider,
} from '@/components/healthcare';
import { AboutSection } from './components/AboutSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { HeroSection } from './components/HeroSection';
import { KhitanShowcaseSection } from './components/KhitanShowcaseSection';
import { ServicesSection } from './components/ServicesSection';
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
      <AboutSection />
      <TechnicalDivider />
      <FacilitiesSection />
      <TechnicalDivider />
      <ServicesSection />
      <TechnicalDivider />
      <KhitanShowcaseSection />
      <TechnicalDivider />
      <AppointmentSection />
      <TechnicalDivider />
      <TestimonialsSection />
      <TechnicalDivider />
      <ContactSection />
    </HealthcareShell>
  );
}
