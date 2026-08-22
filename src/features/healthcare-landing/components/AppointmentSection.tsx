import Image from 'next/image';
import { appointment, watermark } from '../data';
import { ArrowCtaButton } from './ArrowCtaButton';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';

export function AppointmentSection() {
  return (
    <section
      id="dokter"
      className="bg-background"
    >
      <SectionContainer className="
        relative isolate overflow-hidden px-0 sm:px-0
      "
      >
        <div className="
          relative z-10 grid
          lg:grid-cols-2
        "
        >
          <div className="
            relative flex min-h-[520px] flex-col items-start justify-center
            gap-8 overflow-hidden bg-background px-6 py-12 text-foreground
            md:px-10 md:py-16
          "
          >
            <Image
              src={watermark.src}
              alt=""
              width={547}
              height={547}
              className="
                pointer-events-none absolute top-24 -left-44 hidden h-auto
                w-[760px] max-w-none opacity-[0.045] brightness-0
                dark:opacity-[0.08] dark:brightness-100 md:block
                xl:w-[808px]
              "
              aria-hidden
            />

            <div className="relative z-10 flex max-w-xl flex-col items-start gap-8">
              <PillLabel>{appointment.eyebrow}</PillLabel>
              <h2 className="
                text-4xl/tight font-medium tracking-tight
                md:text-6xl
              "
              >
                {appointment.title}
              </h2>
              <p className="
                text-lg/relaxed text-muted-foreground
                md:text-xl
              "
              >
                {appointment.description}
              </p>
              <ArrowCtaButton href="#kontak">
                Buat Janji Temu
              </ArrowCtaButton>
            </div>
          </div>

          <div className="
            relative min-h-[420px] overflow-hidden border-t border-line
            bg-background
            lg:min-h-[560px] lg:border-t-0 lg:border-l
          "
          >
            <Image
              src={appointment.image.src}
              alt={appointment.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
