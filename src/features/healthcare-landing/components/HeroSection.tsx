import Image from 'next/image';
import { hero } from '../data';
import { ArrowCtaButton } from './ArrowCtaButton';
import { SectionContainer } from './SectionContainer';

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="
        px-0 pb-0
        md:px-5
      "
    >
      <div className="
        relative mx-auto min-h-[560px] max-w-[1501px] overflow-hidden
        rounded-b-4xl
        md:min-h-[720px] md:rounded-4xl
      "
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          sizes="(min-width: 1540px) 1501px, 100vw"
          className="
            object-cover object-[62%_center]
            md:object-center
          "
          priority
        />
        <div className="
          absolute inset-0 bg-linear-to-r from-background/95 via-background/65
          to-background/10
        "
        />

        <SectionContainer className="
          relative flex min-h-[560px] items-center
          md:min-h-[720px]
        "
        >
          <div className="
            max-w-[720px]
            max-sm:pt-10
          "
          >
            <p className="
              mb-8 inline-flex rounded-full bg-background/80 px-5 py-2.5 text-xs
              font-bold tracking-[0.22em] text-amanah-navy uppercase shadow-sm
              md:mb-12 md:px-6 md:py-3 md:text-sm
            "
            >
              {hero.eyebrow}
            </p>

            <h1 className="
              flex flex-col gap-2 text-4xl leading-[1.08] font-medium
              text-amanah-navy
              sm:text-5xl
              md:text-7xl md:font-medium
            "
            >
              <span>{hero.title}</span>
              <span className="
                font-amanah-script text-5xl leading-none
                sm:text-6xl
                md:text-7xl
              "
              >
                {hero.scriptTitle}
              </span>
            </h1>

            <ArrowCtaButton
              href="#kontak"
              className="
                mt-10
                md:mt-14
              "
            >
              Buat Janji Temu
            </ArrowCtaButton>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}
