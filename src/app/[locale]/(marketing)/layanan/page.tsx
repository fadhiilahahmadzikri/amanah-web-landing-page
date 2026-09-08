import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahServicesPage } from '@/features/healthcare-services';

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Layanan Kesehatan - Klinik Amanah Healthcare',
    description:
      'Pelayanan dokter umum dan kebidanan profesional, nyaman, dan terpercaya untuk Anda dan keluarga.',
  };
}

export default async function ServicesPage(props: ServicesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahServicesPage locale={locale} />;
}
