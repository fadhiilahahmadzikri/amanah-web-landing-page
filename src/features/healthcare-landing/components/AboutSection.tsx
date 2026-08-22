import { aboutSlides } from '../data';
import { AboutCarousel } from './AboutCarousel';
import { SectionContainer } from './SectionContainer';

export function AboutSection() {
  return (
    <section
      id="tentang-kami"
      className="
        overflow-hidden bg-background
      "
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          overflow-hidden bg-card pt-12
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
              font-amanah-script text-3xl text-foreground
              md:text-4xl
            "
            >
              Tentang Kami
            </p>
            <h2 className="
              text-4xl/tight font-medium tracking-tight text-foreground
              md:text-6xl
            "
            >
              Kenali Klinik Amanah
            </h2>
            <p className="
              max-w-2xl text-base/relaxed text-muted-foreground
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
