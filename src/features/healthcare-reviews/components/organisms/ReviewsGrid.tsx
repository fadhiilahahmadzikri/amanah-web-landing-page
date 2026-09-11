'use client';

import type { HealthcareReview, ReviewImage } from '../../types';
import type { PixelMeshBackgroundHandle } from '@/features/healthcare-about/components/atoms/PixelMeshBackground';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import {
  SectionContainer,
  SectionHeader,
} from '@/components/healthcare';
import { PixelMeshBackground } from '@/features/healthcare-about/components/atoms/PixelMeshBackground';
import { ReviewCard } from './ReviewCard';

gsap.registerPlugin(ScrollTrigger);

type ReviewsGridProps = {
  onImageOpen: (image: ReviewImage) => void;
  reviews: HealthcareReview[];
};

export function ReviewsGrid({
  onImageOpen,
  reviews,
}: ReviewsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pixelMeshRef = useRef<PixelMeshBackgroundHandle>(null);
  const pixelContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Hero entrance timeline: executes on load / reload
      const entranceTl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: 'expo.out' },
      });

      // Pixel texture organic crawl from bottom to top
      const crawlState = { progress: 0 };
      entranceTl.to(
        crawlState,
        {
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            pixelMeshRef.current?.setProgress(crawlState.progress);
          },
          progress: 1,
        },
        0,
      );

      // Header mask text lines (eyebrow script, title heading, description lead)
      if (headerRef.current) {
        const maskLines = headerRef.current.querySelectorAll('[data-mask-text]');
        if (maskLines.length > 0) {
          entranceTl.fromTo(
            maskLines,
            { opacity: 0, yPercent: 120 },
            {
              duration: 1.2,
              opacity: 1,
              stagger: 0.12,
              yPercent: 0,
            },
            0.1,
          );
        }
      }

      entranceTl.call(() => {
        ScrollTrigger.refresh();
      });

      // 2. Parallax scrub for curved pixel background on scroll
      if (pixelContainerRef.current && sectionRef.current) {
        gsap.to(pixelContainerRef.current, {
          ease: 'none',
          scrollTrigger: {
            end: 'bottom top',
            scrub: true,
            start: 'top top',
            trigger: sectionRef.current,
          },
          yPercent: 20,
        });
      }

      // 3. Review cards grid animate on scroll (matching FacilitiesSection & ProfessionalDoctorsSection)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-review-card]');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
              duration: 1,
              ease: 'expo.out',
              opacity: 1,
              scrollTrigger: {
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                trigger: gridRef.current,
              },
              stagger: 0.08,
              y: 0,
            },
          );
        }
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden bg-background py-14
        sm:py-16
        md:py-20
      "
    >
      {/* Curved soft-blend pixel texture background */}
      <div
        ref={pixelContainerRef}
        data-pixel-background
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px]
          overflow-hidden select-none
          sm:h-[520px]
          md:h-[580px]
        "
      >
        <PixelMeshBackground
          ref={pixelMeshRef}
          initialProgress={0}
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
          ref={headerRef}
          data-reviews-reveal
          className="mb-8"
          eyebrow="Ulasan Pasien"
          headingAs="h1"
          headingSize="display"
          title="Mereka yang Telah Mempercayai Klinik Pratama Amanah Healthcare"
          description="Setiap kunjungan membawa cerita, dari pemeriksaan hingga momen penting bersama keluarga."
          descriptionSize="lead"
        />

        <div
          ref={gridRef}
          data-reviews-grid
          className="
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
