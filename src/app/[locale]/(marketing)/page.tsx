import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahLandingPage } from '@/features/healthcare-landing';

type IndexProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Klinik Amanah Healthcare',
    description: 'Pelayanan kesehatan profesional, nyaman, dan terpercaya untuk Anda dan keluarga.',
  };
}

export default async function Index(props: IndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AmanahLandingPage locale={locale} />
  );
}
