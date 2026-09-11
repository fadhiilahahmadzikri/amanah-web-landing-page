import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahContactPage } from '@/features/healthcare-contact';
import { getI18nPath } from '@/utils/Helpers';
import { defaultOgImages, defaultTwitterCard } from '@/utils/seo';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Kontak Kami',
    description:
      'Hubungi Klinik Amanah Healthcare Yogyakarta untuk informasi layanan, jadwal dokter, reservasi kunjungan, dan konsultasi kesehatan keluarga.',
    alternates: {
      canonical: getI18nPath('/kontak', locale),
    },
    openGraph: {
      title: 'Kontak Kami - Klinik Amanah Healthcare',
      description:
        'Hubungi Klinik Amanah Healthcare Yogyakarta untuk informasi layanan, jadwal dokter, dan reservasi janji temu.',
      url: getI18nPath('/kontak', locale),
      images: defaultOgImages,
    },
    twitter: {
      ...defaultTwitterCard,
      title: 'Kontak Kami - Klinik Amanah Healthcare',
      description:
        'Hubungi Klinik Amanah Healthcare Yogyakarta untuk informasi layanan, jadwal dokter, dan reservasi janji temu.',
    },
  };
}

export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahContactPage locale={locale} />;
}
