'use client';

import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useReviewsRevealAnimation<TElement extends HTMLElement>(
  rootRef: RefObject<TElement | null>,
) {
  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const revealBlocks = Array.from(
        root.querySelectorAll<HTMLElement>('[data-reviews-reveal]'),
      );
      const summaryBlocks = Array.from(
        root.querySelectorAll<HTMLElement>('[data-review-summary]'),
      );
      const reviewCards = Array.from(
        root.querySelectorAll<HTMLElement>('[data-review-card]'),
      );
      const summaryTrigger = summaryBlocks[0] ?? root;

      if (reduceMotion) {
        gsap.set([...revealBlocks, ...summaryBlocks, ...reviewCards], {
          autoAlpha: 1,
          clearProps: 'filter,transform,visibility',
        });
        return;
      }

      gsap.fromTo(
        revealBlocks,
        {
          autoAlpha: 0,
          filter: 'blur(12px)',
          y: 28,
        },
        {
          autoAlpha: 1,
          duration: 1,
          ease: 'expo.out',
          filter: 'blur(0px)',
          scrollTrigger: {
            start: 'top 86%',
            toggleActions: 'play none none reverse',
            trigger: root,
          },
          y: 0,
        },
      );

      if (summaryBlocks.length > 0) {
        gsap.fromTo(
          summaryBlocks,
          {
            autoAlpha: 0,
            scale: 0.98,
            y: 36,
          },
          {
            autoAlpha: 1,
            duration: 1.1,
            ease: 'expo.out',
            scale: 1,
            scrollTrigger: {
              start: 'top 78%',
              toggleActions: 'play none none reverse',
              trigger: summaryTrigger,
            },
            y: 0,
          },
        );
      }

      gsap.set(reviewCards, {
        autoAlpha: 0,
        filter: 'blur(10px)',
        y: 42,
      });

      ScrollTrigger.batch(reviewCards, {
        batchMax: 8,
        interval: 0.08,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            duration: 0.9,
            ease: 'expo.out',
            filter: 'blur(0px)',
            stagger: 0.08,
            y: 0,
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 0,
            duration: 0.35,
            ease: 'power2.out',
            filter: 'blur(8px)',
            stagger: 0.04,
            y: 30,
          });
        },
        start: 'top 88%',
      });
    },
    { scope: rootRef },
  );
}
