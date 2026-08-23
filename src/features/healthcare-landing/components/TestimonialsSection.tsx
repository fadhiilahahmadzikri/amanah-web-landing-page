'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { testimonials } from '../data';
import { SectionContainer } from './SectionContainer';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const activeTestimonial = testimonials.items[1];

  useGSAP(
    () => {
      if (quoteMarkRef.current) {
        gsap.to(quoteMarkRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      const panels = sectionRef.current?.querySelectorAll('[data-testimonial-panel]');
      if (panels && panels.length > 0) {
        gsap.fromTo(
          panels,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (avatarRef.current) {
        gsap.fromTo(
          avatarRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-background"
    >
      <SectionContainer className="
        grid px-0 sm:px-0
        lg:grid-cols-[0.9fr_1.1fr_1.8fr]
      "
      >
        <aside
          data-testimonial-panel
          className="
            flex min-h-96 flex-col justify-between border-b border-line
            bg-background p-8 text-foreground
            lg:border-r lg:border-b-0
            md:p-10
          "
        >
          <div className="flex flex-col items-start gap-10">
            <span className="
              inline-flex rounded-none border border-line bg-background px-3
              py-1.5 text-xs font-semibold tracking-[0.16em]
              text-muted-foreground
              uppercase
            "
            >
              # Kisah Pasien
            </span>
            <blockquote className="text-2xl/relaxed">
              {testimonials.featured.quote}
            </blockquote>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xl">
              {testimonials.featured.name}
            </p>
            <p className="text-lg text-muted-foreground">
              {testimonials.featured.role}
            </p>
          </div>
        </aside>

        <div
          data-testimonial-panel
          className="
            relative min-h-96 overflow-hidden border-b border-line bg-muted
            lg:border-r lg:border-b-0
          "
        >
          <Image
            src={testimonials.featured.image.src}
            alt={testimonials.featured.image.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover"
          />
        </div>

        {activeTestimonial && (
          <article
            data-testimonial-panel
            className="
              relative flex flex-col gap-10 bg-background p-8
              md:p-10
            "
          >
            <div
              ref={quoteMarkRef}
              aria-hidden
              className="text-9xl leading-none font-bold text-foreground/10 will-change-transform"
            >
              ”
            </div>

            <blockquote className="
              max-w-2xl font-amanah-script text-3xl/relaxed text-foreground
              md:text-4xl/[1.25]
            "
            >
              {activeTestimonial.quote}
            </blockquote>

            <div className="flex items-center gap-5">
              <div ref={avatarRef} className="size-16 shrink-0">
                <Image
                  src={activeTestimonial.avatar.src}
                  alt={activeTestimonial.avatar.alt}
                  width={60}
                  height={60}
                  className="size-16 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-semibold text-foreground">
                  {activeTestimonial.name}
                </p>
                <p className="text-lg font-medium text-muted-foreground">
                  {activeTestimonial.role}
                </p>
              </div>
            </div>
          </article>
        )}
      </SectionContainer>
    </section>
  );
}
