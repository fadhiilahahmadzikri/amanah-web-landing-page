import Image from 'next/image';
import { trustHighlights } from '../data';
import { SectionContainer } from './SectionContainer';

export function TrustHighlights() {
  return (
    <section
      aria-label="Ringkasan pelayanan Klinik Amanah"
      className="
        relative z-10 mt-6 pb-16
        md:-mt-20 md:pb-24
      "
    >
      <SectionContainer className="
        grid max-w-[1340px] gap-5
        min-[1400px]:grid-cols-[650px_304px_297px] min-[1400px]:gap-[25px]
        lg:grid-cols-[minmax(0,2.14fr)_minmax(0,1fr)_minmax(0,0.98fr)]
      "
      >
        <div className="
          grid gap-5 rounded-2xl bg-card p-[18px] shadow-amanah-glow
          min-[1400px]:grid-cols-[241px_361px]
          sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-center
          lg:pr-[18px] lg:pl-[30px]
        "
        >
          <div className="
            flex min-h-[149px] flex-col items-start justify-between gap-10
          "
          >
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-xl font-medium text-amanah-navy">
                {trustHighlights.service.eyebrow}
              </h2>
              <p className="max-w-[203px] text-[15px]/[22px] text-amanah-navy">
                {trustHighlights.service.title}
              </p>
            </div>

            <a
              href="#layanan"
              className="
                inline-flex items-center gap-[10px] text-[15px]/[22px]
                font-semibold text-amanah-navy underline-offset-4
                hover:underline
              "
            >
              {trustHighlights.service.cta}
              <Image
                src={trustHighlights.service.ctaIcon.src}
                alt={trustHighlights.service.ctaIcon.alt}
                width={13}
                height={13}
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="
            grid gap-5
            min-[1400px]:grid-cols-[163px_178px]
            sm:grid-cols-2
          "
          >
            <div className="
              flex min-h-[205px] flex-col justify-center gap-[15px] rounded-2xl
              bg-background px-6 py-7 shadow-sm
            "
            >
              <Image
                src={trustHighlights.patientCount.icon.src}
                alt={trustHighlights.patientCount.icon.alt}
                width={20}
                height={20}
                aria-hidden="true"
                className="size-5 object-contain"
              />
              <div className="flex flex-col gap-[15px] pt-2">
                <p className="text-[15px]/[22px] text-amanah-navy">
                  {trustHighlights.patientCount.label}
                </p>
                <strong className="text-2xl font-bold text-amanah-navy">
                  {trustHighlights.patientCount.value}
                </strong>
              </div>
            </div>

            <div className="
              flex min-h-[203px] items-center justify-center overflow-hidden
              rounded-2xl bg-linear-to-r from-amanah-sky from-50% to-background
              to-50% px-6 py-7
            "
            >
              <Image
                src={trustHighlights.patientCount.image.src}
                alt={trustHighlights.patientCount.image.alt}
                width={178}
                height={147}
                className="h-auto w-full max-w-[178px] object-contain"
              />
            </div>
          </div>
        </div>

        <div className="
          flex min-h-[241px] flex-col justify-center gap-8 rounded-2xl bg-card
          px-8 py-10 shadow-amanah-card
          md:px-[38px] md:py-[45px]
        "
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-[17px]/[25px] font-medium text-amanah-navy">
              {trustHighlights.community.title}
            </h2>
            <p className="text-[17px]/[25px] text-amanah-navy">
              {trustHighlights.community.description}
            </p>
          </div>
          <div className="flex">
            {trustHighlights.community.avatars.map((avatar, index) => (
              <Image
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                width={56}
                height={56}
                className="
                  size-14 rounded-full border-4 border-background object-cover
                "
                style={{ marginLeft: index === 0 ? 0 : -16 }}
              />
            ))}
          </div>
        </div>

        <div className="
          flex min-h-[241px] flex-col justify-center gap-5 rounded-2xl bg-card
          p-8 shadow-amanah-card
        "
        >
          <Image
            src={trustHighlights.quote.icon.src}
            alt={trustHighlights.quote.icon.alt}
            width={20}
            height={20}
            aria-hidden="true"
            className="size-5 object-contain"
          />
          <blockquote className="
            text-[17px]/[25px] font-medium text-amanah-navy italic
          "
          >
            {trustHighlights.quote.text}
          </blockquote>
          <p className="text-[15px]/[23px] text-amanah-muted">
            {trustHighlights.quote.author}
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
