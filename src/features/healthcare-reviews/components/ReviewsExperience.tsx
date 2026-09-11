'use client';

import type {
  HealthcareReview,
  HealthcareReviewsSummary,
} from '../types';
import { useRef } from 'react';
import { useReviewGallery } from '../hooks/useReviewGallery';
import { useReviewsRevealAnimation } from '../hooks/useReviewsRevealAnimation';
import { ReviewImageDialog } from './molecules/ReviewImageDialog';
import { ReviewsGrid } from './organisms/ReviewsGrid';
type ReviewsExperienceProps = {
  reviews: HealthcareReview[];
  summary?: HealthcareReviewsSummary;
};

export function ReviewsExperience({
  reviews,
}: ReviewsExperienceProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const {
    handleOpenChange,
    isOpen,
    openImage,
    selectedImage,
  } = useReviewGallery();

  useReviewsRevealAnimation(rootRef);

  return (
    <div ref={rootRef}>
      <ReviewsGrid
        reviews={reviews}
        onImageOpen={openImage}
      />
      <ReviewImageDialog
        image={selectedImage}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
}
