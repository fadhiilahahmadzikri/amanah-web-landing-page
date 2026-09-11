import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahServicesPage } from '@/features/healthcare-services';
import { getI18nPath } from '@/utils/Helpers';

type FacilitiesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: FacilitiesPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Fasilitas Medis',
    description:
      'Fasilitas ruang tindakan, apotek terpadu, USG kehamilan, ruang bersalin 24 jam, dan ruang tunggu ramah anak di Klinik Amanah Yogyakarta.',
    alternates: {
      canonical: getI18nPath('/fasilitas', locale),
    },
    openGraph: {
      title: 'Fasilitas Medis - Klinik Amanah Healthcare',
      description:
        'Fasilitas kesehatan modern, higienis, dan nyaman untuk menunjang kenyamanan pemulihan Anda dan keluarga.',
      url: getI18nPath('/fasilitas', locale),
    },
  };
}

export default async function FacilitiesPage(props: FacilitiesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahServicesPage activePath="/fasilitas" locale={locale} />;
}
