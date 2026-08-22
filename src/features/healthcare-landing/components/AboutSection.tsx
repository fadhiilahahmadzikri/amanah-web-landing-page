import { aboutSlides } from '../data';
import { AboutCarousel } from './AboutCarousel';
import { SectionContainer } from './SectionContainer';

export function AboutSection() {
  return (
    <section
      id="tentang-kami"
      className="
        overflow-hidden bg-background py-10
        md:py-16
      "
    >
      <SectionContainer>
        <div className="
          overflow-hidden rounded-4xl border border-border/70 bg-background
          pt-12 shadow-sm
          md:pt-20
        "
        >
          <div
            className="
              mx-auto flex max-w-3xl flex-col items-center gap-4 px-6
              text-center
            "
          >
            <p className="
              font-amanah-script text-3xl text-amanah-navy
              md:text-4xl
            "
            >
              Tentang Kami
            </p>
            <h2 className="
              text-4xl/tight font-medium text-amanah-navy
              md:text-6xl
            "
            >
              Kenali Klinik Amanah
            </h2>
            <p className="
              max-w-2xl text-base/relaxed text-amanah-navy
              md:text-lg/relaxed
            "
            >
              Memberikan pelayanan kesehatan yang profesional, nyaman, dan terpercaya untuk Anda dan keluarga.
            </p>
          </div>

          <AboutCarousel slides={aboutSlides} />
        </div>
      </SectionContainer>
    </section>
  );
}
