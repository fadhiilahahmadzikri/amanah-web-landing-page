import { services } from '../data';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';
import { ServicesCarousel } from './ServicesCarousel';

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="
        bg-background py-16
        md:py-24
      "
    >
      <SectionContainer>
        <div className="
          mb-16 flex flex-col gap-8
          md:flex-row md:items-end md:justify-between
        "
        >
          <div className="flex max-w-3xl flex-col items-start gap-8">
            <PillLabel># Services</PillLabel>
            <h2 className="
              text-4xl/tight font-light text-amanah-navy
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
        </div>

        <ServicesCarousel services={services} />
      </SectionContainer>
    </section>
  );
}
