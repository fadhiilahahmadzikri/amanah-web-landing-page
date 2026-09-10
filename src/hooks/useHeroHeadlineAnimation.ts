'use client';

import gsap from 'gsap';
import React, { useCallback, useMemo, useRef } from 'react';
import { cn } from '@/utils/Helpers';

export type HeroHeadlineWordsProps = {
  className?: string;
  onRef?: (index: number, el: HTMLSpanElement | null) => void;
  wordClassName?: string;
  words: string[];
};

export function HeroHeadlineWords({
  className,
  onRef,
  wordClassName,
  words,
}: HeroHeadlineWordsProps) {
  return React.createElement(
    React.Fragment,
    null,
    words.map((word, index) =>
      React.createElement(
        'span',
        {
          key: `${word}-${index}`,
          className: cn(
            '-mb-1 inline-block overflow-hidden pt-0.5 pb-1 align-top',
            className,
          ),
        },
        React.createElement(
          'span',
          {
            'data-hero-headline-word': true,
            ref: (el: HTMLSpanElement | null) => onRef?.(index, el),
            className: cn(
              'inline-block will-change-transform',
              wordClassName,
            ),
          },
          word,
          index < words.length - 1 ? '\u00A0' : '',
        ),
      ),
    ),
  );
}

export function parseHeadlineWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

export function parseTwoLineHeadline(headline: string): {
  line1Words: string[];
  line2Words: string[];
} {
  if (headline.includes(' dan ')) {
    const parts = headline.split(' dan ');
    const line1 = parts[0]?.trim() ?? '';
    const line2 = `dan ${parts.slice(1).join(' dan ').trim()}`;
    return {
      line1Words: parseHeadlineWords(line1),
      line2Words: parseHeadlineWords(line2),
    };
  }

  const allWords = parseHeadlineWords(headline);
  const mid = Math.ceil(allWords.length / 2);
  return {
    line1Words: allWords.slice(0, mid),
    line2Words: allWords.slice(mid),
  };
}

export type UseHeroHeadlineAnimationOptions = {
  /** If a single headline string is provided, it will be automatically split into 2 lines */
  headline?: string;
  /** Explicit line 1 text string */
  line1Text?: string;
  /** Explicit line 2 text string */
  line2Text?: string;
};

export function useHeroHeadlineAnimation({
  headline,
  line1Text,
  line2Text,
}: UseHeroHeadlineAnimationOptions = {}) {
  const line1WrapperRef = useRef<HTMLSpanElement>(null);
  const line2WrapperRef = useRef<HTMLSpanElement>(null);
  const line1WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const line2WordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const { line1Words, line2Words } = useMemo(() => {
    if (line1Text !== undefined && line2Text !== undefined) {
      return {
        line1Words: parseHeadlineWords(line1Text),
        line2Words: parseHeadlineWords(line2Text),
      };
    }
    if (headline) {
      return parseTwoLineHeadline(headline);
    }
    return { line1Words: [], line2Words: [] };
  }, [headline, line1Text, line2Text]);

  const addToTimeline = useCallback(
    (timeline: gsap.core.Timeline, atPosition: number | string = 0) => {
      const line1El = line1WrapperRef.current;
      const line2El = line2WrapperRef.current;

      if (!line1El || !line2El) {
        return;
      }

      const queriedLine1 = Array.from(
        line1El.querySelectorAll<HTMLSpanElement>('[data-hero-headline-word]'),
      );
      const queriedLine2 = Array.from(
        line2El.querySelectorAll<HTMLSpanElement>('[data-hero-headline-word]'),
      );

      const line1Elements = queriedLine1.length > 0
        ? queriedLine1
        : (line1WordsRef.current.filter(Boolean) as HTMLSpanElement[]);
      const line2Elements = queriedLine2.length > 0
        ? queriedLine2
        : (line2WordsRef.current.filter(Boolean) as HTMLSpanElement[]);

      const prefersReducedMotion
        = typeof window !== 'undefined'
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([line1El, line2El], { y: 0, autoAlpha: 1 });
        const allWords = [...line1Elements, ...line2Elements];
        if (allWords.length > 0) {
          gsap.set(allWords, { autoAlpha: 1, yPercent: 0, clearProps: 'all' });
        }
        return;
      }

      // Measure vertical distance from Line 1 to Line 2 so Line 1 initially sits at Line 2
      const rect1 = line1El.getBoundingClientRect();
      const rect2 = line2El.getBoundingClientRect();
      const deltaY
        = rect1 && rect2 && rect2.top > rect1.top
          ? rect2.top - rect1.top
          : (line1El.offsetHeight || 54);

      gsap.set(line1El, { y: deltaY });
      if (line1Elements.length > 0) {
        gsap.set(line1Elements, { autoAlpha: 0, yPercent: 120 });
      }
      if (line2Elements.length > 0) {
        gsap.set(line2Elements, { autoAlpha: 0, yPercent: 120 });
      }

      // (a) Line 1 words tick up randomly like digital clock counter digits on Line 2
      if (line1Elements.length > 0) {
        timeline.fromTo(
          line1Elements,
          {
            autoAlpha: 0,
            yPercent: 120,
          },
          {
            duration: 0.55,
            ease: 'back.out(1.4)',
            autoAlpha: 1,
            stagger: {
              each: 0.08,
              from: 'random',
            },
            yPercent: 0,
          },
          atPosition,
        );
      }

      // (b) Line 1 shifts up to its natural Line 1 spot
      const shiftPos
        = typeof atPosition === 'number'
          ? atPosition + 0.85
          : `${atPosition}+=0.85`;

      timeline.to(
        line1El,
        {
          duration: 0.75,
          ease: 'power3.inOut',
          y: 0,
        },
        shiftPos,
      );

      // (c) Line 2 words tick up randomly from below onto Line 2
      const line2Pos
        = typeof atPosition === 'number'
          ? atPosition + 1.1
          : `${atPosition}+=1.1`;

      if (line2Elements.length > 0) {
        timeline.fromTo(
          line2Elements,
          {
            autoAlpha: 0,
            yPercent: 120,
          },
          {
            duration: 0.55,
            ease: 'back.out(1.4)',
            autoAlpha: 1,
            stagger: {
              each: 0.08,
              from: 'random',
            },
            yPercent: 0,
          },
          line2Pos,
        );
      }
    },
    [],
  );

  return {
    addToTimeline,
    line1Words,
    line1WordsRef,
    line1WrapperRef,
    line2Words,
    line2WordsRef,
    line2WrapperRef,
  };
}
