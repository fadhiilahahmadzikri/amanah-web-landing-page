import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahReviewsPage } from '@/features/healthcare-reviews';
import { reviewsPageContent } from '@/features/healthcare-reviews/data';
import { getI18nPath } from '@/utils/Helpers';
import { defaultOgImages, defaultTwitterCard } from '@/utils/seo';

type ReviewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ReviewsPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Ulasan Pasien',
    description: `Baca ${reviewsPageContent.summary.totalReviewsClaimed} Google Maps untuk ${reviewsPageContent.summary.placeTitle}.`,
    alternates: {
      canonical: getI18nPath('/ulasan', locale),
    },
    openGraph: {
      title: 'Ulasan Pasien - Klinik Amanah Healthcare',
      description: `Rating ${reviewsPageContent.summary.overallRatingLabel}/5 dari Google Maps untuk ${reviewsPageContent.summary.placeTitle}.`,
      url: getI18nPath('/ulasan', locale),
      type: 'website',
      images: defaultOgImages,
    },
    twitter: {
      ...defaultTwitterCard,
      title: 'Ulasan Pasien - Klinik Amanah Healthcare',
      description: `Rating ${reviewsPageContent.summary.overallRatingLabel}/5 dari Google Maps untuk ${reviewsPageContent.summary.placeTitle}.`,
    },
  };
}

export default async function ReviewsPage(props: ReviewsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahReviewsPage locale={locale} />;
}
