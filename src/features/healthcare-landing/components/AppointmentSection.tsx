import Image from 'next/image';
import { appointment, watermark } from '../data';
import { ArrowCtaButton } from './ArrowCtaButton';
import { PillLabel } from './PillLabel';
import { SectionContainer } from './SectionContainer';

export function AppointmentSection() {
  return (
    <section
      id="dokter"
      className="
        bg-background py-10
        md:py-16
      "
    >
      <SectionContainer className="
        relative isolate rounded-3xl bg-amanah-navy px-6 py-16
        md:p-24
      "
      >
        <Image
          src={watermark.src}
          alt=""
          width={547}
          height={547}
          className="
            pointer-events-none absolute top-60 -left-44 z-0 hidden h-auto
            w-[760px] max-w-none opacity-[0.06]
            md:block
            xl:w-[808px]
          "
          aria-hidden
        />

        <div className="
          relative z-10 grid gap-12
          lg:grid-cols-2 lg:items-center
        "
        >
          <div className="
            flex max-w-xl flex-col items-start gap-9 text-background
          "
          >
            <PillLabel>{appointment.eyebrow}</PillLabel>
            <h2 className="
              text-4xl/tight font-light
              md:text-6xl
            "
            >
              {appointment.title}
            </h2>
            <p className="
              text-lg/relaxed text-background/75
              md:text-xl
            "
            >
              {appointment.description}
            </p>
            <ArrowCtaButton href="#kontak" treatment="secondary">
              Buat Janji Temu
            </ArrowCtaButton>
          </div>

          <div className="
            relative aspect-621/605 overflow-hidden rounded-[1.25rem]
            bg-background
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
