import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AmanahReviewsPage } from '@/features/healthcare-reviews';
import { reviewsPageContent } from '@/features/healthcare-reviews/data';

type ReviewsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return {
    title: 'Ulasan Pasien - Klinik Amanah HealthCare',
    description: `Baca ${reviewsPageContent.summary.totalReviewsClaimed} Google Maps untuk ${reviewsPageContent.summary.placeTitle}.`,
    openGraph: {
      description: `Rating ${reviewsPageContent.summary.overallRatingLabel}/5 dari Google Maps untuk ${reviewsPageContent.summary.placeTitle}.`,
      title: 'Ulasan Pasien - Klinik Amanah HealthCare',
      type: 'website',
    },
  };
}

export default async function ReviewsPage(props: ReviewsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AmanahReviewsPage locale={locale} />;
}
