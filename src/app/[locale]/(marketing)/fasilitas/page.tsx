import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahServicesPage } from '@/features/healthcare-services';

type FacilitiesPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Fasilitas & Layanan - Klinik Amanah Healthcare',
    description:
      'Fasilitas dan layanan kesehatan profesional, nyaman, dan terpercaya untuk Anda dan keluarga.',
  };
}

export default async function FacilitiesPage(props: FacilitiesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahServicesPage activePath="/fasilitas" locale={locale} />;
}
