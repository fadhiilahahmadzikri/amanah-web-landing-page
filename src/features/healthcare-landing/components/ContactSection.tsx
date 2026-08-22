import Image from 'next/image';
import { ViewportLine } from '@/components/healthcare';
import { contactImage, contactItems } from '../data';
import { SectionContainer } from './SectionContainer';

export function ContactSection() {
  return (
    <section
      id="kontak"
      className="bg-background"
    >
      <SectionContainer className="px-0 sm:px-0">
        <div className="
          relative
          grid
          lg:grid-cols-[1fr_1.05fr]
        "
        >
          <div className="
            flex flex-col gap-8 border-b border-line bg-background px-6 py-12
            lg:border-r lg:border-b-0
            md:px-10 md:py-16
          "
          >
            <h2 className="
              text-5xl/tight font-medium tracking-tight text-foreground
              md:text-7xl
            "
            >
              Mari Terhubung
            </h2>
            <p className="
              max-w-xl text-lg/relaxed text-muted-foreground
              md:text-xl
            "
            >
              Punya pertanyaan atau ingin membuat janji kunjungan? Hubungi Klinik Amanah Healthcare. Tim kami siap membantu memberikan informasi mengenai layanan, jadwal dokter, dan kebutuhan kesehatan Anda.
            </p>
          </div>

          <div className="
            flex flex-col justify-center gap-8 bg-background px-6 py-12
            md:px-10 md:py-16
          "
          >
            {contactItems.map(item => (
              <div key={item.href} className="flex flex-col gap-3">
                <p className="text-base font-semibold text-muted-foreground">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="
                    w-fit border-b border-line pb-0.5 text-2xl font-bold
                    wrap-break-word text-foreground transition-colors
                    hover:border-foreground/50
                    md:text-3xl
                  "
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
          <ViewportLine position="bottom" />
        </div>

        <div className="relative">
          <div className="
            relative aspect-1256/580 overflow-hidden bg-muted
          "
          >
            <Image
              src={contactImage.src}
              alt={contactImage.alt}
              fill
              sizes="(min-width: 1320px) 1256px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
