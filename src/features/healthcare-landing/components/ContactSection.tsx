import { MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { contactImage, contactItems } from '../data';
import { SectionContainer } from './SectionContainer';

export function ContactSection() {
  return (
    <section
      id="kontak"
      className="
        bg-background py-16
        md:py-24
      "
    >
      <SectionContainer>
        <div className="
          grid gap-12
          lg:grid-cols-[1fr_1.05fr]
        "
        >
          <div className="flex flex-col gap-8">
            <h2 className="
              text-5xl/tight font-light text-amanah-navy
              md:text-7xl
            "
            >
              Mari Terhubung
            </h2>
            <p className="
              max-w-xl text-lg/relaxed text-amanah-navy
              md:text-xl
            "
            >
              Punya pertanyaan atau ingin membuat janji kunjungan? Hubungi Klinik Amanah Healthcare. Tim kami siap membantu memberikan informasi mengenai layanan, jadwal dokter, dan kebutuhan kesehatan Anda.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {contactItems.map((item, index) => (
              <div key={item.href} className="flex flex-col gap-3">
                {index > 0 && <Separator />}
                <p className="text-base font-semibold text-amanah-muted">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="
                    text-2xl font-bold wrap-break-word text-amanah-navy
                    underline-offset-4
                    hover:underline
                    md:text-3xl
                  "
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="
          relative mt-20 aspect-1256/580 overflow-hidden rounded-3xl bg-muted
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

        <a
          href="https://wa.me/6281392456664"
          className="
            mt-10 ml-auto flex size-14 items-center justify-center rounded-full
            bg-amanah-navy text-background shadow-amanah-card transition-colors
            hover:bg-primary/90
          "
          aria-label="Hubungi Amanah Healthcare via WhatsApp"
        >
          <MessageCircleIcon aria-hidden />
        </a>
      </SectionContainer>
    </section>
  );
}
