import { ArrowUpRightIcon, BadgeCheckIcon } from 'lucide-react';
import Image from 'next/image';
import { ViewportLine } from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import { facilities, facilityImage, watermark } from '../data';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';

const facilityBorderClassNames = [
  'border-b border-line md:border-r xl:border-b-0',
  'border-b border-line xl:border-r xl:border-b-0',
  'border-b border-line md:border-r md:border-b-0 xl:border-r',
];

export function FacilitiesSection() {
  return (
    <section
      id="fasilitas"
      className="bg-background"
    >
      <SectionContainer className="
        relative px-0 sm:px-0
      "
      >
        <div className="
          relative px-6 py-12
          md:px-10 md:py-16
        "
        >
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 hidden overflow-hidden
              md:block
            "
          >
            <Image
              src={watermark.src}
              alt=""
              width={547}
              height={547}
              className="
                absolute top-0 -right-14 h-auto w-[617px] max-w-none
                opacity-[0.045] brightness-0 dark:opacity-[0.08]
                dark:brightness-100
              "
              aria-hidden
            />
          </div>

          <div className="
          relative z-10 grid gap-10
          lg:grid-cols-[1fr_0.9fr] lg:items-center
        "
          >
            <div className="flex flex-col items-start gap-8">
              <PillLabel># Why Choose Us</PillLabel>
              <h2 className="
                max-w-2xl text-4xl/tight font-medium tracking-tight
                text-foreground
                md:text-6xl
              "
              >
                Fasilitas untuk Kenyamanan Anda
              </h2>
            </div>

            <div className="flex items-center gap-5 text-muted-foreground">
              <BadgeCheckIcon aria-hidden className="shrink-0" />
              <div className="flex flex-col gap-2">
                <p className="text-base italic">
                  Certified by the American Dental Association
                </p>
                <a
                  href="#kontak"
                  className="
                    inline-flex w-fit items-center gap-2 border-b
                    border-line pb-1 text-base font-semibold text-foreground
                    hover:border-foreground
                  "
                >
                  Schedule Your Visit
                  <ArrowUpRightIcon aria-hidden />
                </a>
              </div>
            </div>
          </div>
          <ViewportLine position="bottom" />
        </div>

        <div className="
          relative z-10 grid
          md:grid-cols-2
          xl:grid-cols-[1.05fr_1.05fr_1.05fr_1fr]
        "
        >
          {facilities.map((facility, index) => {
            return (
              <article
                key={facility.title}
                className={cn(
                  `               
                    flex min-h-[280px] flex-col items-start bg-card px-8 py-9
                    md:min-h-[320px]
                    xl:min-h-[344px] xl:px-9 xl:py-10
                  `,
                  index % 2 === 0 ? 'bg-background' : 'bg-card',
                  facilityBorderClassNames[index],
                )}
              >
                <span className="
                  inline-flex size-12 shrink-0 items-center justify-center
                "
                >
                  <Image
                    src={facility.icon.src}
                    alt={facility.icon.alt}
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="size-6 object-contain grayscale"
                  />
                </span>
                <div className="
                  mt-6 flex max-w-[249px] flex-col gap-4
                "
                >
                  <h3 className="text-xl/[1.3] font-semibold text-foreground">
                    {facility.title}
                  </h3>
                  <p className="text-base/[1.65] text-muted-foreground">
                    {facility.description}
                  </p>
                </div>
              </article>
            );
          })}

          <article className="
            relative min-h-[280px] overflow-hidden bg-card
            md:min-h-[320px]
            xl:min-h-[344px]
          "
          >
            <Image
              src={facilityImage.src}
              alt={facilityImage.alt}
              fill
              sizes="(min-width: 1280px) 313px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="
              absolute inset-0 bg-linear-to-t from-card via-card/65
              to-card/10
            "
            />
            <h3 className="
              absolute inset-x-8 bottom-10 max-w-[209px] text-xl/[1.35]
              font-semibold text-foreground
            "
            >
              Harga Terjangkau & Transparan
            </h3>
          </article>
        </div>
      </SectionContainer>
    </section>
  );
}
