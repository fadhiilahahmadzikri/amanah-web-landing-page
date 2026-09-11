import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahLandingPage } from '@/features/healthcare-landing';
import { getI18nPath } from '@/utils/Helpers';

type IndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Klinik Pratama Amanah Healthcare',
    description:
      'Pelayanan kesehatan profesional, nyaman, dan terpercaya untuk Anda dan keluarga di Condongcatur, Sleman, Yogyakarta.',
    alternates: {
      canonical: getI18nPath('/', locale),
    },
    openGraph: {
      title: 'Klinik Pratama Amanah Healthcare',
      description:
        'Pelayanan kesehatan dokter umum, kebidanan 24 jam, imunisasi, dan khitan modern di Yogyakarta.',
      url: getI18nPath('/', locale),
    },
  };
}

export default async function Index(props: IndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahLandingPage locale={locale} />;
}
