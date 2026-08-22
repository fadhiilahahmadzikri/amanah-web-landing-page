import Image from 'next/image';
import { ViewportLine } from '@/components/healthcare';
import { hero } from '../data';
import { ArrowCtaButton } from './ArrowCtaButton';
import { SectionContainer } from './SectionContainer';

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative bg-background"
    >
      <div className="
        relative min-h-[600px] overflow-hidden
        md:min-h-[720px]
      "
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          sizes="(min-width: 1300px) 1300px, 100vw"
          className="
            object-cover object-[62%_center]
            md:object-center
          "
          priority
        />
        <div className="
          absolute inset-0 bg-linear-to-r from-background via-background/88
          to-background/20
        "
        />

        <SectionContainer className="
          relative flex min-h-[600px] items-center px-4
          md:min-h-[720px] md:px-10
        "
        >
          <div className="
            max-w-[760px]
            max-sm:pt-10
          "
          >
            <p className="
              mb-7 inline-flex rounded-none border border-line bg-background/80
              px-3 py-1.5 text-xs font-semibold tracking-[0.16em]
              text-muted-foreground uppercase backdrop-blur
              md:mb-10
            "
            >
              {hero.eyebrow}
            </p>

            <h1 className="
              flex flex-col gap-2 text-4xl leading-[1.04] font-medium
              tracking-tight text-foreground
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
                mt-8
                md:mt-10
              "
            >
              Buat Janji Temu
            </ArrowCtaButton>

            <div className="
              mt-10 grid max-w-2xl border-y border-line text-xs
              text-muted-foreground
              sm:grid-cols-3
            "
            >
              {['Klinik keluarga', 'Yogyakarta', '5,000+ pasien'].map(item => (
                <span
                  key={item}
                  className="
                    border-line py-3 font-medium uppercase tracking-[0.14em]
                    sm:border-r sm:px-4
                    sm:first:pl-0 sm:last:border-r-0
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
      <ViewportLine position="bottom" />
    </section>
  );
}
