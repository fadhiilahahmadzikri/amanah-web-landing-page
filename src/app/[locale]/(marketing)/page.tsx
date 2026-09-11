import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AmanahLandingPage } from '@/features/healthcare-landing';
import { getI18nPath } from '@/utils/Helpers';

type IndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: getI18nPath('/', locale),
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: getI18nPath('/', locale),
    },
  };
}

export default async function Index(props: IndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahLandingPage locale={locale} />;
}
