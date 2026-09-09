import { HealthcareShell } from '@/components/healthcare';
import { AboutSection } from '@/features/healthcare-landing/components/AboutSection';

type AmanahAboutPageProps = {
  locale?: string;
};

export function AmanahAboutPage({ locale }: AmanahAboutPageProps) {
  return (
    <HealthcareShell activePath="/tentang-kami" locale={locale}>
      <AboutSection />
    </HealthcareShell>
  );
}
