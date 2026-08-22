import {
  AtSignIcon,
  LinkIcon,
  MapPinIcon,
  Share2Icon,
  XIcon,
} from 'lucide-react';
import Image from 'next/image';
import { contactItems, footer, navigationItems } from '../data';
import { AmanahLogo } from './AmanahLogo';
import { ArrowCtaButton } from './ArrowCtaButton';
import { SectionContainer } from './SectionContainer';

const socialIcons = [Share2Icon, XIcon, LinkIcon, AtSignIcon];

export function HealthcareFooter() {
  const phone = contactItems[1];
  const email = contactItems[0];

  return (
    <footer className="bg-background px-5 pb-5">
      <SectionContainer className="
        rounded-3xl bg-amanah-navy px-6 py-16 text-background
        md:px-24
      "
      >
        <div className="
          grid gap-12
          lg:grid-cols-[1.05fr_1fr_1fr_0.85fr]
        "
        >
          <div className="flex flex-col gap-14">
            <AmanahLogo
              textClassName="text-background"
              markClassName="bg-background"
            />
            <address className="
              max-w-xs text-xl/relaxed text-background/90 not-italic
            "
            >
              {footer.address}
            </address>
            <p className="text-lg/relaxed text-background/65">
              © 2026,
              {' '}
              <a href="#beranda" className="underline underline-offset-4">
                Klinik Amanah Healthcare.
              </a>
              <br />
              All Rights Reserved.
            </p>
          </div>

          <div className="
            self-start rounded-[1.25rem] bg-background p-9 text-amanah-navy
          "
          >
            <p className="mb-10 text-2xl/relaxed">
              {footer.cardText}
            </p>
            {phone && (
              <a
                href={phone.href}
                className="
                  block text-lg font-bold underline-offset-4
                  hover:underline
                "
              >
                {phone.value}
              </a>
            )}
            {email && (
              <a
                href={email.href}
                className="
                  mt-5 block text-base font-semibold wrap-break-word underline
                "
              >
                {email.value}
              </a>
            )}
          </div>

          <div className="flex flex-col gap-9">
            <h2 className="text-2xl font-semibold text-background/65">
              Quick Links
            </h2>
            <nav
              aria-label="Navigasi footer"
              className="grid grid-cols-2 gap-6 text-xl"
            >
              {navigationItems.map(item => (
                <a key={item.href} href={item.href} className="hover:underline">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-background/65">
              Lokasi Kami
            </h2>
            <p className="flex items-center gap-2 text-sm text-background/75">
              <MapPinIcon aria-hidden />
              {footer.location}
            </p>
            <div className="overflow-hidden rounded-md bg-background">
              <Image
                src={footer.map.src}
                alt={footer.map.alt}
                width={196}
                height={110}
                className="h-auto w-full object-cover"
              />
            </div>
            <ArrowCtaButton
              href="https://maps.google.com/?q=Jl.%20Manggis%20No.6%2C%20Condongcatur"
              treatment="secondary"
              className="h-11 px-5 pr-2 text-sm"
            >
              Petunjuk Arah
            </ArrowCtaButton>
          </div>
        </div>

        <div className="mt-14 flex justify-end gap-4">
          {footer.socialLinks.map((label, index) => {
            const Icon = socialIcons[index] || AtSignIcon;

            return (
              <a
                key={label}
                href="#kontak"
                className="
                  inline-flex size-12 items-center justify-center rounded-full
                  border border-background/15 text-background/85
                  transition-colors
                  hover:bg-background/10
                "
                aria-label={label}
              >
                <Icon aria-hidden />
              </a>
            );
          })}
        </div>
      </SectionContainer>
    </footer>
  );
}
