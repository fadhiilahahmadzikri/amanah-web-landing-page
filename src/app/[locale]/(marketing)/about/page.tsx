import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahAboutPage } from '@/features/healthcare-about';
import { getI18nPath } from '@/utils/Helpers';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Tentang Kami',
    description:
      'Kenali Klinik Amanah Pratama Healthcare lebih dekat. Pelayanan kesehatan yang ramah, profesional, nyaman, dan terpercaya untuk keluarga Anda.',
    alternates: {
      canonical: getI18nPath('/tentang-kami', locale),
    },
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahAboutPage locale={locale} />;
}
