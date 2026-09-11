'use client';

import type { HealthcareReview, ReviewImage } from '../../types';
import {
  MessageSquareReplyIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/utils/Helpers';
import { ReviewStars } from '../atoms/ReviewStars';
import { ReviewAuthor } from '../molecules/ReviewAuthor';
import { ReviewPhotoGrid } from '../molecules/ReviewPhotoGrid';

type ReviewClampTextProps = {
  buttonClassName?: string;
  className?: string;
  maxLength?: number;
  onOpenModal: () => void;
  text: string;
};

function ReviewClampText({
  buttonClassName,
  className,
  maxLength = 150,
  onOpenModal,
  text,
}: ReviewClampTextProps) {
  if (text.length <= maxLength) {
    return (
      <p className={className}>
        {text}
      </p>
    );
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const safeSnippet = (lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated)
    .replace(/[.…\s]+$/, '')
    .trim();

  return (
    <p className={className}>
      {safeSnippet}
      <button
        type="button"
        onClick={onOpenModal}
        className={cn(
          'ml-1 inline cursor-pointer font-semibold text-primary underline-offset-2 transition-colors hover:text-amanah-blue hover:underline',
          buttonClassName,
        )}
        aria-label="Baca ulasan selengkapnya"
      >
        ...selengkapnya
      </button>
    </p>
  );
}

type ReviewCardProps = {
  className?: string;
  onImageOpen: (image: ReviewImage) => void;
  review: HealthcareReview;
};

export function ReviewCard({
  className,
  onImageOpen,
  review,
}: ReviewCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <Card
        data-review-card
        data-review-id={review.id}
        className={cn(
          `
            flex h-full flex-col overflow-hidden rounded-none border-line bg-card
            shadow-none
          `,
          className,
        )}
      >
        <CardHeader className="gap-4 p-4 pb-3">
          <ReviewAuthor
            author={review.author}
            onImageOpen={onImageOpen}
          />

          <div className="flex items-center justify-between gap-3">
            <ReviewStars rating={review.rating} />
            <span className="shrink-0 amanah-type-caption text-muted-foreground">
              {review.relativeDate}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-24">
            <CardTitle className="sr-only">
              Ulasan dari
              {' '}
              {review.author.name}
            </CardTitle>

            {review.text
              ? (
                  <ReviewClampText
                    text={review.text}
                    maxLength={150}
                    onOpenModal={() => setIsDetailOpen(true)}
                    className="amanah-type-small whitespace-pre-line text-foreground"
                  />
                )
              : (
                  <p className="amanah-type-small text-muted-foreground">
                    Pasien memberi rating tanpa menuliskan cerita tambahan.
                  </p>
                )}
          </div>

          {review.ownerResponse && (
            <div className="border border-line bg-accent p-3">
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <MessageSquareReplyIcon aria-hidden className="size-4" />
                <p className="amanah-type-caption font-semibold">
                  Respons Klinik Amanah
                  {' '}
                  ·
                  {' '}
                  {review.ownerResponse.date}
                </p>
              </div>
              <ReviewClampText
                text={review.ownerResponse.text}
                maxLength={150}
                onOpenModal={() => setIsDetailOpen(true)}
                className="amanah-type-caption whitespace-pre-line text-muted-foreground"
                buttonClassName="text-xs"
              />
            </div>
          )}

          <ReviewPhotoGrid
            className="-mx-4 -mb-4 mt-auto"
            photos={review.photos}
            photosCount={review.photosCount}
            onImageOpen={onImageOpen}
          />
        </CardContent>

        <CardFooter className="
          mt-auto flex items-center justify-between gap-3 border-t border-line p-4
        "
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ThumbsUpIcon aria-hidden className="size-4" />
            <span className="amanah-type-caption">
              {review.likes}
              {' '}
              suka
            </span>
          </div>

          <span className="amanah-type-caption text-muted-foreground">
            No.
            {' '}
            {review.index}
          </span>
        </CardFooter>
      </Card>

      {isDetailOpen && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent
            data-lenis-prevent
            className="
              flex max-h-[85vh] w-full max-w-lg flex-col gap-0 overflow-hidden
              rounded-none border-line bg-card p-0 shadow-none
              sm:max-w-xl
            "
          >
            <DialogHeader className="shrink-0 gap-4 border-b border-line p-4 pr-16 text-left sm:text-left">
              <DialogTitle className="sr-only">
                Ulasan dari
                {' '}
                {review.author.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detail ulasan lengkap dari
                {' '}
                {review.author.name}
                {' '}
                di Klinik Amanah
              </DialogDescription>

              <ReviewAuthor
                author={review.author}
                onImageOpen={onImageOpen}
              />

              <div className="flex items-center justify-between gap-3">
                <ReviewStars rating={review.rating} />
                <span className="shrink-0 amanah-type-caption text-muted-foreground">
                  {review.relativeDate}
                </span>
              </div>
            </DialogHeader>

            <div
              data-lenis-prevent
              className="
                max-h-[60vh] flex-1 min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain p-4
                space-y-4 touch-pan-y
              "
            >
              <p className="amanah-type-small whitespace-pre-line text-foreground">
                {review.text || 'Pasien memberi rating tanpa menuliskan cerita tambahan.'}
              </p>

              {review.ownerResponse && (
                <div className="border border-line bg-accent p-3">
                  <div className="mb-2 flex items-center gap-2 text-foreground">
                    <MessageSquareReplyIcon aria-hidden className="size-4" />
                    <p className="amanah-type-caption font-semibold">
                      Respons Klinik Amanah
                      {' '}
                      ·
                      {' '}
                      {review.ownerResponse.date}
                    </p>
                  </div>
                  <p className="amanah-type-caption whitespace-pre-line text-muted-foreground">
                    {review.ownerResponse.text}
                  </p>
                </div>
              )}

              <ReviewPhotoGrid
                className="-mx-4 -mb-4 mt-auto"
                photos={review.photos}
                photosCount={review.photosCount}
                onImageOpen={onImageOpen}
              />
            </div>

            <DialogFooter className="
              shrink-0 mt-auto flex flex-row items-center justify-between gap-3 border-t
              border-line p-4
              sm:flex-row sm:justify-between
            "
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ThumbsUpIcon aria-hidden className="size-4" />
                <span className="amanah-type-caption">
                  {review.likes}
                  {' '}
                  suka
                </span>
              </div>

              <span className="amanah-type-caption text-muted-foreground">
                No.
                {' '}
                {review.index}
              </span>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
