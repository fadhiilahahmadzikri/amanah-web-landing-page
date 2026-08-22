import Image from 'next/image';
import { testimonials } from '../data';
import { SectionContainer } from './SectionContainer';

export function TestimonialsSection() {
  const activeTestimonial = testimonials.items[1];

  return (
    <section className="
      bg-background
    "
    >
      <SectionContainer className="
        grid px-0 sm:px-0
        lg:grid-cols-[0.9fr_1.1fr_1.8fr]
      "
      >
        <aside className="
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

        <div className="
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
          <article className="
            relative flex flex-col gap-10 bg-background p-8
            md:p-10
          "
          >
            <div
              aria-hidden
              className="text-9xl leading-none font-bold text-foreground/10"
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
              <Image
                src={activeTestimonial.avatar.src}
                alt={activeTestimonial.avatar.alt}
                width={60}
                height={60}
                className="size-16 rounded-full object-cover"
              />
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
