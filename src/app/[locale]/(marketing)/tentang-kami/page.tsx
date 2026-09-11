import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahAboutPage } from '@/features/healthcare-about';
import { getI18nPath } from '@/utils/Helpers';
import { defaultOgImages, defaultTwitterCard } from '@/utils/seo';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Tentang Kami',
    description:
      'Kenali Klinik Amanah Pratama Healthcare lebih dekat. Pelayanan kesehatan yang ramah, profesional, nyaman, dan terpercaya untuk keluarga Anda di Yogyakarta.',
    alternates: {
      canonical: getI18nPath('/tentang-kami', locale),
    },
    openGraph: {
      title: 'Tentang Kami - Klinik Amanah Pratama Healthcare',
      description:
        'Kenali Klinik Amanah Pratama Healthcare lebih dekat. Pelayanan kesehatan ramah, profesional, dan berdedikasi untuk keluarga Anda.',
      url: getI18nPath('/tentang-kami', locale),
      images: defaultOgImages,
    },
    twitter: {
      ...defaultTwitterCard,
      title: 'Tentang Kami - Klinik Amanah Pratama Healthcare',
      description:
        'Kenali Klinik Amanah Pratama Healthcare lebih dekat. Pelayanan kesehatan ramah, profesional, dan berdedikasi untuk keluarga Anda.',
    },
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahAboutPage locale={locale} />;
}
