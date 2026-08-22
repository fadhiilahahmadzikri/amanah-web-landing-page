import Image from 'next/image';
import { testimonials } from '../data';
import { SectionContainer } from './SectionContainer';

export function TestimonialsSection() {
  const activeTestimonial = testimonials.items[1];

  return (
    <section className="
      bg-background py-16
      md:py-24
    "
    >
      <SectionContainer className="
        grid gap-10
        lg:grid-cols-[0.9fr_1.1fr_1.8fr] lg:items-center
      "
      >
        <aside className="
          flex min-h-96 flex-col justify-between rounded-[1.25rem]
          bg-amanah-navy p-8 text-background
          md:p-10
        "
        >
          <div className="flex flex-col items-start gap-10">
            <span className="
              inline-flex rounded-full bg-background px-6 py-3 text-sm font-bold
              text-amanah-navy uppercase
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
            <p className="text-lg text-background/75">
              {testimonials.featured.role}
            </p>
          </div>
        </aside>

        <div className="
          relative min-h-96 overflow-hidden rounded-[1.25rem] bg-muted
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
          <article className="
            flex flex-col gap-12
            lg:pl-8
          "
          >
            <div
              aria-hidden
              className="text-9xl leading-none font-bold text-amanah-blue/20"
            >
              ”
            </div>

            <blockquote className="
              font-amanah-script text-3xl/relaxed text-amanah-navy
              md:text-4xl
            "
            >
              {activeTestimonial.quote}
            </blockquote>

            <div className="h-px bg-border" />

            <div className="flex items-center gap-5">
              <Image
                src={activeTestimonial.avatar.src}
                alt={activeTestimonial.avatar.alt}
                width={60}
                height={60}
                className="size-16 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-semibold text-amanah-navy">
                  {activeTestimonial.name}
                </p>
                <p className="text-lg font-medium text-amanah-muted">
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
