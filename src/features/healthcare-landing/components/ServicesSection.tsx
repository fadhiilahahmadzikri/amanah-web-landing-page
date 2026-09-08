import { TechnicalDivider } from '@/components/healthcare';
import {
  ServicesExperience,
  ServicesHeroSection,
} from '@/features/healthcare-services';

export function ServicesSection() {
  return (
    <section id="layanan" className="bg-background">
      <ServicesHeroSection />
      <TechnicalDivider />
      <ServicesExperience />
    </section>
  );
}
