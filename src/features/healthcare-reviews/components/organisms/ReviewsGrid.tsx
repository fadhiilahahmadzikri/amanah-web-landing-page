'use client';

import type { HealthcareReview, ReviewImage } from '../../types';
import {
  SectionContainer,
  SectionHeader,
} from '@/components/healthcare';
import { PixelMeshBackground } from '@/features/healthcare-about/components/atoms/PixelMeshBackground';
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
      {/* Curved soft-blend pixel texture background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px]
          overflow-hidden select-none sm:h-[520px] md:h-[580px]
        "
      >
        <PixelMeshBackground
          initialProgress={1}
          progress={1}
          maskGradient="radial-gradient(ellipse 80% 70% at 50% 15%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.45) 65%, rgba(0, 0, 0, 0.1) 85%, transparent 100%)"
          className="
            size-full opacity-35
            dark:opacity-55
          "
        />
      </div>

      <SectionContainer className="
        relative z-10 px-4
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
