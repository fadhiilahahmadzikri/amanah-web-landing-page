import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahDoctorsPage } from '@/features/healthcare-doctors';

type DoctorsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Dokter dan Bidan Amanah Healthcare',
    description: 'Kenali dokter dan bidan Amanah Healthcare yang profesional, peduli, dan terpercaya.',
  };
}

export default async function DoctorsPage(props: DoctorsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AmanahDoctorsPage locale={locale} />
  );
}
