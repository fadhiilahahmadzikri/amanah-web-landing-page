import { ViewportLine } from '@/components/healthcare';
import { services } from '../data';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';
import { ServicesCarousel } from './ServicesCarousel';

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="bg-background"
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          relative flex flex-col gap-8 px-6 pt-12 pb-8
          md:px-10 md:pt-16 md:pb-10
          md:flex-row md:items-end md:justify-between
        "
        >
          <div className="flex max-w-3xl flex-col items-start gap-8">
            <PillLabel># Services</PillLabel>
            <h2 className="
              text-4xl/tight font-medium tracking-tight text-foreground
              md:text-6xl
            "
            >
              Layanan Kesehatan untuk Anda dan Keluarga
            </h2>
          </div>

          <div
            className="
              hidden
              md:block
            "
            aria-hidden
          />
          <ViewportLine position="bottom" />
        </div>

        <div className="relative pt-8">
          <ServicesCarousel services={services} />
        </div>
      </SectionContainer>
    </section>
  );
}
