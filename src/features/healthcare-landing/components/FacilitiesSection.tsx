import { ArrowUpRightIcon, BadgeCheckIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/Helpers';
import { facilities, facilityImage, watermark } from '../data';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';

export function FacilitiesSection() {
  return (
    <section
      id="fasilitas"
      className="
        bg-background py-10
        md:py-16
      "
    >
      <SectionContainer className="
        relative overflow-hidden rounded-3xl bg-amanah-navy px-6 py-16
        md:p-24
      "
      >
        <Image
          src={watermark.src}
          alt=""
          width={547}
          height={547}
          className="
            pointer-events-none absolute top-2 -right-18 hidden h-auto w-[617px]
            max-w-none opacity-[0.06]
            md:block
          "
          aria-hidden
        />

        <div className="
          relative z-10 grid gap-10
          lg:grid-cols-[1fr_0.9fr] lg:items-center
        "
        >
          <div className="flex flex-col items-start gap-8">
            <PillLabel># Why Choose Us</PillLabel>
            <h2 className="
              max-w-2xl text-4xl/tight font-light text-background
              md:text-6xl
            "
            >
              Fasilitas untuk Kenyamanan Anda
            </h2>
          </div>

          <div className="flex items-center gap-5 text-background">
            <BadgeCheckIcon aria-hidden className="shrink-0" />
            <div className="flex flex-col gap-2">
              <p className="text-lg text-background/85 italic">
                Certified by the American Dental Association
              </p>
              <a
                href="#kontak"
                className="
                  inline-flex w-fit items-center gap-2 border-b
                  border-background/55 pb-1 text-lg font-semibold
                  hover:border-background
                "
              >
                Schedule Your Visit
                <ArrowUpRightIcon aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="
          relative z-10 mt-10 grid overflow-hidden rounded-2xl bg-card
          shadow-amanah-card
          md:mt-14 md:grid-cols-2
          xl:grid-cols-[1.05fr_1.05fr_1.05fr_1fr]
        "
        >
          {facilities.map((facility, index) => {
            return (
              <article
                key={facility.title}
                className={cn(
                  `
                    flex min-h-[320px] flex-col items-start bg-card px-8 py-10
                    md:min-h-[360px]
                    xl:min-h-[408px] xl:px-10 xl:py-[55px]
                  `,
                  index % 2 === 0 ? 'bg-muted' : 'bg-card',
                )}
              >
                <span className="
                  inline-flex size-[65px] shrink-0 items-center justify-center
                  rounded-full bg-amanah-icon-soft
                "
                >
                  <Image
                    src={facility.icon.src}
                    alt={facility.icon.alt}
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="size-6 object-contain"
                  />
                </span>
                <div className="
                  mt-5 flex max-w-[249px] flex-col gap-5
                  xl:mt-7
                "
                >
                  <h3 className="text-xl/[1.4] font-semibold text-amanah-navy">
                    {facility.title}
                  </h3>
                  <p className="text-base/[1.6] text-amanah-navy">
                    {facility.description}
                  </p>
                </div>
              </article>
            );
          })}

          <article className="
            relative min-h-[320px] overflow-hidden bg-card
            md:min-h-[360px]
            xl:min-h-[408px]
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
              absolute inset-0 bg-linear-to-t from-card/95 via-card/45
              to-transparent
            "
            />
            <h3 className="
              absolute inset-x-8 bottom-10 max-w-[209px] text-xl/[1.35]
              font-semibold text-amanah-navy
              xl:bottom-[55px] xl:left-[30px]
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
