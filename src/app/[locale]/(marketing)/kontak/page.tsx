import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahContactPage } from '@/features/healthcare-contact';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Kontak Kami - Klinik Amanah Healthcare',
    description: 'Hubungi Klinik Amanah Healthcare untuk informasi layanan, jadwal dokter, dan reservasi kunjungan.',
  };
}

export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AmanahContactPage locale={locale} />
  );
}
