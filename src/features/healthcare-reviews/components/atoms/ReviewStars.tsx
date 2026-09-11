import { StarIcon } from 'lucide-react';
import { cn } from '@/utils/Helpers';

const REVIEW_STAR_COUNT = 5;
const FIRST_STAR_INDEX = 0;

type ReviewStarsProps = {
  className?: string;
  iconClassName?: string;
  label?: string;
  rating: number;
};

export function ReviewStars({
  className,
  iconClassName,
  label,
  rating,
}: ReviewStarsProps) {
  const reviewLabel = label ?? `${rating} dari ${REVIEW_STAR_COUNT} bintang`;

  return (
    <div
      aria-label={reviewLabel}
      className={cn('flex items-center gap-0.5', className)}
      role="img"
    >
      {Array.from({ length: REVIEW_STAR_COUNT }, (_, index) => {
        const isFilled = index + FIRST_STAR_INDEX < rating;

        return (
          <StarIcon
            key={index}
            aria-hidden
            className={cn(
              'size-4',
              isFilled
                ? 'fill-chart-4 text-chart-4'
                : 'fill-muted text-muted-foreground/35',
              iconClassName,
            )}
          />
        );
      })}
    </div>
  );
}
