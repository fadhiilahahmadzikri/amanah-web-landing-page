import { HealthcareShell } from '@/components/healthcare';
import { ContactSection } from '@/features/healthcare-landing/components/ContactSection';

type AmanahContactPageProps = {
  locale?: string;
};

export function AmanahContactPage({ locale }: AmanahContactPageProps) {
  return (
    <HealthcareShell activePath="/kontak" locale={locale}>
      <ContactSection />
    </HealthcareShell>
  );
}
