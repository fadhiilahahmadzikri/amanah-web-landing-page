import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahServicesPage } from '@/features/healthcare-services';
import { getI18nPath } from '@/utils/Helpers';

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ServicesPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Layanan Medis & Kesehatan',
    description:
      'Pelayanan dokter umum, kebidanan & persalinan 24 jam, khitan modern, dan imunisasi profesional di Klinik Amanah Yogyakarta.',
    alternates: {
      canonical: getI18nPath('/layanan', locale),
    },
    openGraph: {
      title: 'Layanan Medis & Kesehatan - Klinik Amanah Healthcare',
      description:
        'Pelayanan dokter umum, kebidanan & persalinan 24 jam, khitan modern, dan imunisasi profesional untuk keluarga Anda.',
      url: getI18nPath('/layanan', locale),
    },
  };
}

export default async function ServicesPage(props: ServicesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahServicesPage activePath="/layanan" locale={locale} />;
}
