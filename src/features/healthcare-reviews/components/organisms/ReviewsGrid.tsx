'use client';

import type { HealthcareReview, ReviewImage } from '../../types';
import {
  SectionContainer,
  SectionHeader,
} from '@/components/healthcare';
import { ReviewCard } from './ReviewCard';

type ReviewsGridProps = {
  onImageOpen: (image: ReviewImage) => void;
  reviews: HealthcareReview[];
};

export function ReviewsGrid({
  onImageOpen,
  reviews,
}: ReviewsGridProps) {
  return (
    <section className="
      relative overflow-hidden bg-background py-14
      sm:py-16
      md:py-20
    "
    >
      <SectionContainer className="
        px-4
        sm:px-6
      "
      >
        <SectionHeader
          data-reviews-reveal
          className="mb-8"
          eyebrow="Ulasan Pasien"
          headingAs="h1"
          headingSize="display"
          title="Pengalaman Pasien Sebelum Anda Berkunjung"
          description="Baca cerita pasien tentang pelayanan, kenyamanan kunjungan, dan respons tim Klinik Amanah sebagai bahan pertimbangan sebelum membuat janji."
          descriptionSize="lead"
        />

        <div className="
          grid grid-cols-1 gap-5
          md:grid-cols-2 md:gap-6
          xl:grid-cols-3
          2xl:grid-cols-4
        "
        >
          {reviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onImageOpen={onImageOpen}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
