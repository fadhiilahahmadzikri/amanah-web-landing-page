'use client';

import type { AboutHeroData, AboutVisualBandData } from '../../types';
import type { HeroConfettiRef } from '../atoms/HeroConfetti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/utils/Helpers';
import { aboutHeroData, aboutPixelIcons, aboutVisualBandData } from '../../data';
import { DirectionalArrowIndicator } from '../atoms/DirectionalArrowIndicator';
import { HeroConfetti } from '../atoms/HeroConfetti';
import { PixelIconBadge } from '../atoms/PixelIconBadge';
import { PixelMeshBackground } from '../atoms/PixelMeshBackground';

gsap.registerPlugin(ScrollTrigger);

type AboutHeroSectionProps = {
  className?: string;
  data?: AboutHeroData;
  heroData?: AboutHeroData;
  visualData?: AboutVisualBandData;
};

function parseHeroHeadline(headline: string) {
  if (headline.includes(' dan ')) {
    const parts = headline.split(' dan ');
    const line1 = parts[0]?.trim() ?? '';
    const line2 = `dan ${parts.slice(1).join(' dan ').trim()}`;
    return {
      line1Words: line1.split(/\s+/).filter(Boolean),
      line2Words: line2.split(/\s+/).filter(Boolean),
    };
  }

  const allWords = headline.split(/\s+/).filter(Boolean);
  const mid = Math.ceil(allWords.length / 2);
  return {
    line1Words: allWords.slice(0, mid),
    line2Words: allWords.slice(mid),
  };
}

export function AboutHeroSection({
  className,
  data,
  heroData,
  visualData,
}: AboutHeroSectionProps) {
  const resolvedHero = heroData ?? data ?? aboutHeroData;
  const resolvedVisual = visualData ?? aboutVisualBandData;
  const icons = resolvedHero.icons ?? aboutPixelIcons;
  const { line1Words, line2Words } = parseHeroHeadline(resolvedHero.headline);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1WrapperRef = useRef<HTMLSpanElement>(null);
  const line1WordsRef = useRef<HTMLSpanElement[]>([]);
  const line2WrapperRef = useRef<HTMLSpanElement>(null);
  const line2WordsRef = useRef<HTMLSpanElement[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const rightShellRef = useRef<HTMLDivElement>(null);
  const initialTextRef = useRef<HTMLDivElement>(null);
  const initialTextContentRef = useRef<HTMLParagraphElement>(null);
  const expandedTextRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const arrowContainerRef = useRef<HTMLDivElement>(null);
  const arrowInnerRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HeroConfettiRef>(null);

  useGSAP(
    () => {
      if (!containerRef.current) {
        return;
      }

      // --- 0. HERO ENTRANCE CHOREOGRAPHY ---
      // Measure vertical distance from Line 1 to Line 2 so Line 1 initially sits at Line 2
      const line1El = line1WrapperRef.current;
      const line2El = line2WrapperRef.current;
      const rect1 = line1El?.getBoundingClientRect();
      const rect2 = line2El?.getBoundingClientRect();
      const deltaY = rect1 && rect2 && rect2.top > rect1.top
        ? rect2.top - rect1.top
        : (line1El?.offsetHeight ?? 54);

      if (line1El) {
        gsap.set(line1El, { y: deltaY });
      }

      const entranceTl = gsap.timeline({
        delay: 0.15,
      });

      // (a) Line 1 words tick up randomly like digital clock counter digits on Line 2
      const line1Elements = line1WordsRef.current.filter(Boolean);
      if (line1Elements.length > 0) {
        entranceTl.fromTo(
          line1Elements,
          {
            opacity: 0,
            yPercent: 120,
          },
          {
            duration: 0.55,
            ease: 'back.out(1.4)',
            opacity: 1,
            stagger: {
              each: 0.08,
              from: 'random',
            },
            yPercent: 0,
          },
          0,
        );
      }

      // (b) Doctor fluid image in left column enters smoothly
      if (imageWrapperRef.current) {
        entranceTl.fromTo(
          imageWrapperRef.current,
          {
            opacity: 0,
            scale: 1.06,
          },
          {
            duration: 1.2,
            ease: 'power2.out',
            opacity: 1,
            scale: 1,
          },
          0.15,
        );
      }

      // (c) After settling on Line 2, Line 1 shifts up to its natural Line 1 spot
      if (line1El) {
        entranceTl.to(
          line1El,
          {
            duration: 0.75,
            ease: 'power3.inOut',
            y: 0,
          },
          0.85,
        );
      }

      // (d) Line 2 words tick up randomly from below onto Line 2
      const line2Elements = line2WordsRef.current.filter(Boolean);
      if (line2Elements.length > 0) {
        entranceTl.fromTo(
          line2Elements,
          {
            opacity: 0,
            yPercent: 120,
          },
          {
            duration: 0.55,
            ease: 'back.out(1.4)',
            opacity: 1,
            stagger: {
              each: 0.08,
              from: 'random',
            },
            yPercent: 0,
          },
          1.1,
        );
      }

      // (e) Initial description text on right shell glides in
      if (initialTextContentRef.current) {
        entranceTl.fromTo(
          initialTextContentRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            duration: 0.85,
            ease: 'power3.out',
            opacity: 1,
            y: 0,
          },
          1.0,
        );
      }

      // (f) Directional arrow indicator enters smoothly
      if (arrowInnerRef.current) {
        entranceTl.fromTo(
          arrowInnerRef.current,
          {
            opacity: 0,
            y: 16,
          },
          {
            duration: 0.8,
            ease: 'power3.out',
            opacity: 1,
            y: 0,
          },
          1.25,
        );
      }

      entranceTl.call(() => {
        ScrollTrigger.refresh();
      });

      const mm = gsap.matchMedia();

      // Desktop: Pinned scroll transformation where the right shell expands to fill viewport
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top+=48',
            end: '+=750',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            refreshPriority: 10,
          },
        });

        // 1. Downward arrows fade out as expand begins
        if (arrowContainerRef.current) {
          tl.to(
            arrowContainerRef.current,
            {
              autoAlpha: 0,
              scale: 0.85,
              duration: 0.2,
              ease: 'power1.out',
            },
            0,
          );

          // Collapse the arrow compartment so the text gets the full vertical center of the viewport
          tl.to(
            arrowContainerRef.current,
            {
              borderTopWidth: 0,
              duration: 0.7,
              ease: 'power2.inOut',
              height: 0,
            },
            0.05,
          );
        }

        // 2. Headline slides up and fades out cleanly
        if (headlineRef.current) {
          tl.to(
            headlineRef.current,
            {
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power2.inOut',
              y: -50,
            },
            0,
          );
        }

        // 3. TARGET UTAMA: Left column shrinks from 68% to 0%, Right shell EXPANDS from 32% to 100%
        if (leftColRef.current && rightShellRef.current) {
          tl.to(
            leftColRef.current,
            {
              duration: 1,
              ease: 'power2.inOut',
              width: '0%',
            },
            0,
          );

          tl.to(
            rightShellRef.current,
            {
              duration: 1,
              ease: 'power2.inOut',
              width: '100%',
            },
            0,
          );
        }

        // 4. KAMUFLASE: Initial text (rata kiri, di bawah sejajar headline) fades out completely first
        if (initialTextRef.current) {
          tl.to(
            initialTextRef.current,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: 'power2.in',
              y: -12,
            },
            0,
          );
        }

        // 5. KAMUFLASE: Expanded text (rata tengah, di tengah layar) fades in AFTER initial text has dissolved
        // Starts at 0.28 so there is zero overlap / ghosting
        if (expandedTextRef.current) {
          tl.fromTo(
            expandedTextRef.current,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              duration: 0.4,
              ease: 'power2.out',
              y: 0,
            },
            0.28,
          );
        }

        // 6. 3 Pixel Icons: Muncul satu-satu dari bawah ke atas setelah shell full screen
        if (iconsRef.current.length > 0) {
          tl.fromTo(
            iconsRef.current,
            {
              autoAlpha: 0,
              scale: 0.8,
              y: 20,
            },
            {
              autoAlpha: 1,
              duration: 0.25,
              ease: 'back.out(1.5)',
              scale: 1,
              stagger: 0.08,
              y: 0,
            },
            0.68,
          );
        }

        // 7. Confetti celebration burst exactly when icon at index 2 emerges
        tl.call(
          () => {
            confettiRef.current?.fire();
          },
          [],
          0.84,
        );
      });

      // Mobile / Tablet: Unpinned scrubbed scroll transition
      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: 0.8,
          },
        });

        if (arrowContainerRef.current) {
          tl.to(
            arrowContainerRef.current,
            {
              autoAlpha: 0,
              duration: 0.2,
            },
            0,
          );
        }

        if (headlineRef.current) {
          tl.to(
            headlineRef.current,
            {
              autoAlpha: 0.2,
              duration: 0.45,
              y: -30,
            },
            0,
          );
        }

        if (initialTextRef.current) {
          tl.to(
            initialTextRef.current,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: 'power2.in',
              y: -10,
            },
            0,
          );
        }

        if (expandedTextRef.current) {
          tl.fromTo(
            expandedTextRef.current,
            {
              autoAlpha: 0,
              y: 15,
            },
            {
              autoAlpha: 1,
              duration: 0.38,
              ease: 'power2.out',
              y: 0,
            },
            0.28,
          );
        }

        if (iconsRef.current.length > 0) {
          tl.fromTo(
            iconsRef.current,
            {
              autoAlpha: 0,
              scale: 0.8,
              y: 16,
            },
            {
              autoAlpha: 1,
              duration: 0.25,
              ease: 'back.out(1.5)',
              scale: 1,
              stagger: 0.08,
              y: 0,
            },
            0.66,
          );
        }

        // Confetti celebration burst exactly when icon at index 2 emerges
        tl.call(
          () => {
            confettiRef.current?.fire();
          },
          [],
          0.82,
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(`
        relative w-full overflow-hidden border-b border-line bg-background
        lg:h-[calc(100vh-48px)] lg:max-h-[860px] lg:min-h-[600px]
      `, className)}
    >
      <div className="
        relative flex size-full flex-col overflow-hidden
        lg:flex-row
      "
      >
        {/* Left Column: Unified Headline + Fluid Edge-to-Edge Illustration */}
        <div
          ref={leftColRef}
          className="
            relative flex shrink-0 flex-col justify-between overflow-hidden
            border-b border-line
            lg:h-full lg:w-[68%] lg:border-r lg:border-b-0
          "
        >
          {/* Upper: Headline Area */}
          <div className="
            flex flex-1 flex-col justify-end px-6 pt-16 pb-8
            sm:px-10 sm:pt-24 sm:pb-10
            lg:px-12 lg:pt-28 lg:pb-10
          "
          >
            <h1
              ref={headlineRef}
              className="
                relative w-full max-w-none text-2xl font-medium tracking-tight
                text-foreground will-change-transform
                sm:text-3xl
                md:text-4xl
                lg:text-[2.35rem]/[1.15]
                xl:text-[2.85rem]/[1.15]
                2xl:text-5xl/[1.14]
              "
            >
              <span className="sr-only">{resolvedHero.headline}</span>
              <span aria-hidden="true" className="block">
                {/* Line 1: 'Sehat Lebih Mudah, Nyaman,' */}
                <span
                  ref={line1WrapperRef}
                  className="
                    block will-change-transform
                    sm:whitespace-nowrap
                  "
                >
                  {line1Words.map((word, index) => (
                    <span
                      key={`l1-${word}-${index}`}
                      className="
                        -mb-1 inline-block overflow-hidden pt-0.5 pb-1 align-top
                      "
                    >
                      <span
                        ref={(el) => {
                          if (el) {
                            line1WordsRef.current[index] = el;
                          }
                        }}
                        className="inline-block opacity-0 will-change-transform"
                      >
                        {word}
                        {index < line1Words.length - 1 ? '\u00A0' : ''}
                      </span>
                    </span>
                  ))}
                </span>

                {/* Line 2: 'dan Terpercaya Bersama Kami.' */}
                <span
                  ref={line2WrapperRef}
                  className="
                    block will-change-transform
                    sm:whitespace-nowrap
                  "
                >
                  {line2Words.map((word, index) => (
                    <span
                      key={`l2-${word}-${index}`}
                      className="
                        -mb-1 inline-block overflow-hidden pt-0.5 pb-1 align-top
                      "
                    >
                      <span
                        ref={(el) => {
                          if (el) {
                            line2WordsRef.current[index] = el;
                          }
                        }}
                        className="inline-block opacity-0 will-change-transform"
                      >
                        {word}
                        {index < line2Words.length - 1 ? '\u00A0' : ''}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
          </div>

          {/* Lower: FLUID Illustration - Zero margin, zero padding, zero gap */}
          <figure className="
            relative h-[220px] w-full shrink-0 overflow-hidden border-t
            border-line bg-muted/20
            sm:h-[260px]
            lg:h-[290px]
          "
          >
            <div
              ref={imageWrapperRef}
              className="relative size-full opacity-0 will-change-transform"
            >
              <Image
                src={resolvedVisual.image.src}
                alt={resolvedVisual.image.alt}
                fill
                priority
                sizes="(min-width: 1280px) 880px, (min-width: 1024px) 68vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </figure>
        </div>

        {/* Right Shell (TARGET UTAMA): Expanding Shell wrapping description */}
        <div
          ref={rightShellRef}
          className="
            relative flex shrink-0 flex-col justify-between overflow-hidden
            bg-surface/50 transition-colors
            lg:h-full lg:w-[32%]
            dark:bg-surface/25
          "
        >
          {/* Upper Compartment: Initial Text sits at the bottom, matching Headline baseline */}
          <div className="
            flex flex-1 flex-col justify-end px-6 pt-16 pb-8
            sm:px-8 sm:pt-24 sm:pb-10
            lg:px-12 lg:pt-28 lg:pb-10
          "
          >
            <div
              ref={initialTextRef}
              className="w-full max-w-sm text-left will-change-transform"
            >
              <p
                ref={initialTextContentRef}
                className="
                  text-left text-sm/relaxed text-muted-foreground opacity-0
                  will-change-transform
                  sm:text-base/relaxed
                "
              >
                {resolvedHero.initialDescription
                  ?? 'Kenali Klinik Amanah Healthcare lebih dekat, dan temukan cara kami hadir untuk kesehatan Anda dan keluarga.'}
              </p>
            </div>
          </div>

          {/* Expanded Camouflaged Content: Dead-center of the expanding shell */}
          <div
            ref={expandedTextRef}
            className="
              pointer-events-none absolute inset-0 z-10 flex items-center
              justify-center px-6 opacity-0 will-change-transform
              sm:px-10
              lg:px-16
            "
          >
            {/* Mosaic pixel mesh texture: strictly scoped to the expandable layer */}
            <PixelMeshBackground className="z-0" />

            {/* Confetti strictly confined to this pixel background shell */}
            <HeroConfetti ref={confettiRef} className="z-20" />

            <div className="
              relative z-10 flex max-w-3xl flex-col items-center justify-center
              text-center
            "
            >
              {/* 3 Pixel Icons: Di atas teks, muncul satu-satu dari bawah ke atas saat full screen */}
              {icons.length > 0 && (
                <div
                  ref={iconsContainerRef}
                  className="
                    mb-6 flex items-center justify-center gap-4
                    sm:mb-8 sm:gap-6
                  "
                >
                  {icons.map((icon, index) => (
                    <div
                      key={icon.id}
                      ref={(el) => {
                        if (el) {
                          iconsRef.current[index] = el;
                        }
                      }}
                      className="opacity-0 will-change-transform"
                    >
                      <PixelIconBadge icon={icon} size={48} />
                    </div>
                  ))}
                </div>
              )}

              <p className="
                max-w-2xl text-center text-lg/relaxed font-medium
                text-foreground
                sm:text-xl/relaxed
                md:text-2xl/relaxed
                lg:max-w-3xl lg:text-3xl/[1.35]
              "
              >
                {resolvedHero.description}
              </p>
            </div>
          </div>

          {/* Lower: Downward Arrows with Continuous Game Glow */}
          <div
            ref={arrowContainerRef}
            className="
              flex h-[220px] shrink-0 items-center justify-start overflow-hidden
              border-t border-line px-6
              sm:h-[260px] sm:px-8
              lg:h-[290px] lg:pl-10
            "
          >
            <div ref={arrowInnerRef} className="opacity-0 will-change-transform">
              <DirectionalArrowIndicator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
