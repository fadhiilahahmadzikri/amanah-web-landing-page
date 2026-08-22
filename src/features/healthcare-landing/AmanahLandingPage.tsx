import {
  HealthcareFooter,
  HealthcareHeader,
} from '@/components/healthcare';
import { AboutSection } from './components/AboutSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustHighlights } from './components/TrustHighlights';

type AmanahLandingPageProps = {
  locale?: string;
};

export function AmanahLandingPage({ locale }: AmanahLandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-amanah-navy">
      <HealthcareHeader activePath="/" locale={locale} />
      <main>
        <HeroSection />
        <TrustHighlights />
        <AboutSection />
        <FacilitiesSection />
        <ServicesSection />
        <AppointmentSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <HealthcareFooter locale={locale} />
    </div>
  );
}
