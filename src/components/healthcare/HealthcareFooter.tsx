import type { ReactNode } from 'react';
import {
  ArrowUpRightIcon,
  AtSignIcon,
  LinkIcon,
  MapPinIcon,
  Share2Icon,
  XIcon,
} from 'lucide-react';
import Image from 'next/image';
import { AppConfig } from '@/utils/AppConfig';
import { cn, getI18nPath } from '@/utils/Helpers';
import { AmanahLogo } from './AmanahLogo';
import {
  healthcareContactItems,
  healthcareFooter,
  healthcareNavigationItems,
} from './data';
import { getHealthcareHref } from './healthcareNavigation';
import { SectionContainer } from './SectionContainer';
import { ViewportLine } from './ViewportLine';

const socialIcons = [Share2Icon, XIcon, LinkIcon, AtSignIcon];

type HealthcareFooterProps = {
  locale?: string;
};

type FooterPanelProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

type FooterRowProps = {
  children: ReactNode;
  className?: string;
};

const mobilePanelDividerClassName = 'max-md:border-b max-md:border-line';

function FooterRow({ children, className }: FooterRowProps) {
  return (
    <div className={cn('relative grid', className)}>
      {children}
      <ViewportLine position="bottom" />
    </div>
  );
}

function FooterPanel({ children, className, label }: FooterPanelProps) {
  return (
    <section className={cn('bg-background p-5 md:p-6', className)}>
      <p className="
        mb-5 text-xs font-semibold tracking-[0.16em] text-muted-foreground
        uppercase
      "
      >
        {label}
      </p>
      {children}
    </section>
  );
}

export function HealthcareFooter({
  locale = AppConfig.i18n.defaultLocale,
}: HealthcareFooterProps) {
  const phone = healthcareContactItems[1];
  const email = healthcareContactItems[0];

  return (
    <footer className="bg-background pb-6">
      <SectionContainer className="relative border-x border-line px-0 sm:px-0">
        <FooterRow className="md:grid-cols-4">
          <FooterPanel
            label="Klinik"
            className={cn(
              mobilePanelDividerClassName,
              'md:col-span-2 md:border-r',
            )}
          >
            <div className="flex flex-col gap-8">
              <AmanahLogo locale={locale} />
              <address className="
                max-w-2xl text-base/relaxed text-muted-foreground not-italic
                md:text-lg/relaxed
              "
              >
                {healthcareFooter.address}
              </address>
            </div>
          </FooterPanel>

          <FooterPanel
            label="Kontak"
            className={cn(mobilePanelDividerClassName, 'md:border-r')}
          >
            <p className="mb-6 text-xl/relaxed font-medium text-foreground">
              {healthcareFooter.cardText}
            </p>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              {phone && (
                <a
                  href={phone.href}
                  className="
                    w-fit border-b border-line pb-0.5 transition-colors
                    hover:border-foreground/50
                  "
                >
                  {phone.value}
                </a>
              )}
              {email && (
                <a
                  href={email.href}
                  className="
                    wrap-break-word w-fit border-b border-line pb-0.5
                    transition-colors hover:border-foreground/50
                  "
                >
                  {email.value}
                </a>
              )}
            </div>
          </FooterPanel>

          <FooterPanel label="Sosial">
            <div className="flex flex-wrap gap-2">
              {healthcareFooter.socialLinks.map((label, index) => {
                const Icon = socialIcons[index] || AtSignIcon;

                return (
                  <a
                    key={label}
                    href={getI18nPath('/', locale)}
                    className="
                      inline-flex size-10 items-center justify-center rounded-xl
                      border border-line text-muted-foreground transition-colors
                      hover:bg-accent hover:text-foreground
                    "
                    aria-label={label}
                  >
                    <Icon aria-hidden />
                  </a>
                );
              })}
            </div>
          </FooterPanel>
        </FooterRow>

        <FooterRow className="md:grid-cols-4">
          <FooterPanel
            label="Navigasi"
            className={cn(
              mobilePanelDividerClassName,
              'md:col-span-2 md:border-r',
            )}
          >
            <nav
              aria-label="Navigasi footer"
              className="grid grid-cols-2 gap-x-8 gap-y-4 text-base font-medium"
            >
              {healthcareNavigationItems.map(item => (
                <a
                  key={`${item.path}${item.hash ?? ''}`}
                  href={getHealthcareHref(item, locale)}
                  className="
                    w-fit border-b border-line pb-0.5 text-muted-foreground
                    transition-colors hover:border-foreground/50
                    hover:text-foreground
                  "
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </FooterPanel>

          <FooterPanel label="Lokasi" className="md:col-span-2">
            <div className="
              grid gap-5
              sm:grid-cols-[180px_1fr] sm:items-start
            "
            >
              <div className="overflow-hidden bg-muted">
                <Image
                  src={healthcareFooter.map.src}
                  alt={healthcareFooter.map.alt}
                  width={360}
                  height={202}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-5">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon aria-hidden className="size-4 shrink-0" />
                  {healthcareFooter.location}
                </p>
                <a
                  href="https://maps.google.com/?q=Jl.%20Manggis%20No.6%2C%20Condongcatur"
                  className="
                    inline-flex h-10 items-center gap-2 rounded-xl border
                    border-line px-3 text-sm font-semibold transition-colors
                    hover:bg-accent
                  "
                >
                  Petunjuk Arah
                  <ArrowUpRightIcon aria-hidden className="size-4" />
                </a>
              </div>
            </div>
          </FooterPanel>
        </FooterRow>

        <div className="
          relative flex flex-col gap-2 px-5 py-4 text-xs text-muted-foreground
          sm:flex-row sm:items-center sm:justify-between
          md:px-6
        "
        >
          <p>© 2026 Klinik Amanah Healthcare. All Rights Reserved.</p>
          <a
            href={getI18nPath('/', locale)}
            className="
              w-fit transition-colors hover:text-foreground
            "
          >
            amanah.healthcare
          </a>
          <ViewportLine position="bottom" />
        </div>
      </SectionContainer>
    </footer>
  );
}
