import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahAboutPage } from '@/features/healthcare-about';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Tentang Kami - Klinik Amanah Healthcare',
    description: 'Kenali Klinik Amanah Healthcare, komitmen kami, nilai pelayanan, dan fasilitas terbaik untuk keluarga Anda.',
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AmanahAboutPage locale={locale} />
  );
}
