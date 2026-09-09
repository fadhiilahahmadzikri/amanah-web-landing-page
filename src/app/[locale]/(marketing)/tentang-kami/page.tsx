import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahAboutPage } from '@/features/healthcare-about';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Tentang Kami - Klinik Amanah Pratama Healthcare',
    description:
      'Kenali Klinik Amanah Pratama Healthcare lebih dekat. Pelayanan kesehatan yang ramah, profesional, nyaman, dan terpercaya untuk keluarga Anda.',
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahAboutPage locale={locale} />;
}
