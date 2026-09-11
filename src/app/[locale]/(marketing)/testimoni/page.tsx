import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahTestimonialsPage } from '@/features/healthcare-testimonials';

type TestimonialsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Testimoni Pasien - Klinik Amanah Healthcare',
    description:
      'Cerita dan pengalaman nyata para keluarga, ayah, bunda, dan si kecil saat menjalani perawatan medis dan relaksasi di Klinik Amanah Healthcare Yogyakarta.',
  };
}

export default async function TestimonialsPage(props: TestimonialsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahTestimonialsPage locale={locale} />;
}
