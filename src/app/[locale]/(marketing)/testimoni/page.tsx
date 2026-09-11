import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahTestimonialsPage } from '@/features/healthcare-testimonials';
import { getI18nPath } from '@/utils/Helpers';

type TestimonialsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: TestimonialsPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Testimoni Pasien',
    description:
      'Cerita dan pengalaman nyata para keluarga, ayah, bunda, dan si kecil saat menjalani perawatan medis dan persalinan di Klinik Amanah Healthcare Yogyakarta.',
    alternates: {
      canonical: getI18nPath('/testimoni', locale),
    },
    openGraph: {
      title: 'Testimoni Pasien - Klinik Amanah Healthcare',
      description:
        'Cerita nyata para pasien yang merasakan langsung pelayanan hangat, profesional, dan bersahabat di Klinik Amanah.',
      url: getI18nPath('/testimoni', locale),
    },
  };
}

export default async function TestimonialsPage(props: TestimonialsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahTestimonialsPage locale={locale} />;
}
