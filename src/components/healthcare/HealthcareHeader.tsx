'use client';

import { useEffect, useState } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { cn, getI18nPath } from '@/utils/Helpers';
import { AmanahLogo } from './AmanahLogo';
import { ArrowCtaButton } from './ArrowCtaButton';
import { healthcareNavigationItems } from './data';
import { getHealthcareHref } from './healthcareNavigation';
import { SectionContainer } from './SectionContainer';

type HealthcareHeaderProps = {
  activePath?: string;
  locale?: string;
};

function getNavigationActiveValue(item: { hash?: string; path: string }) {
  return item.hash ?? item.path;
}

export function HealthcareHeader({
  activePath = '/',
  locale = AppConfig.i18n.defaultLocale,
}: HealthcareHeaderProps) {
  const [activeValue, setActiveValue] = useState(activePath);

  useEffect(() => {
    const syncActiveValue = () => {
      setActiveValue(window.location.hash || activePath);
    };

    const syncTimer = window.setTimeout(syncActiveValue, 0);
    window.addEventListener('hashchange', syncActiveValue);

    return () => {
      window.clearTimeout(syncTimer);
      window.removeEventListener('hashchange', syncActiveValue);
    };
  }, [activePath]);

  return (
    <header className="bg-background py-4">
      <SectionContainer className="flex h-16 items-center justify-between gap-6">
        <AmanahLogo locale={locale} />

        <nav
          aria-label="Navigasi utama"
          className="
            hidden items-center gap-2
            lg:flex
          "
        >
          {healthcareNavigationItems.map((item) => {
            const itemActiveValue = getNavigationActiveValue(item);
            const isActive = itemActiveValue === activeValue;

            return (
              <a
                key={`${item.path}${item.hash ?? ''}`}
                href={getHealthcareHref(item, locale)}
                aria-current={isActive ? (item.hash ? 'location' : 'page') : undefined}
                onClick={() => setActiveValue(itemActiveValue)}
                className={cn(`
                  rounded-full px-5 py-3 text-base font-semibold
                  text-amanah-navy transition-colors
                  hover:bg-accent
                `, isActive && 'bg-accent')}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <ArrowCtaButton
          href={getI18nPath('/sign-in', locale)}
          className="
            hidden
            md:inline-flex
          "
        >
          Masuk
        </ArrowCtaButton>
      </SectionContainer>

      <SectionContainer className="
        pt-3
        lg:hidden
      "
      >
        <nav
          aria-label="Navigasi utama mobile"
          className="
            grid grid-cols-3 gap-2 text-center text-sm font-semibold
            text-amanah-navy
          "
        >
          {healthcareNavigationItems.map((item) => {
            const itemActiveValue = getNavigationActiveValue(item);
            const isActive = itemActiveValue === activeValue;

            return (
              <a
                key={`${item.path}${item.hash ?? ''}`}
                href={getHealthcareHref(item, locale)}
                aria-current={isActive ? (item.hash ? 'location' : 'page') : undefined}
                onClick={() => setActiveValue(itemActiveValue)}
                className={cn(`
                  rounded-full bg-accent px-3 py-2 transition-colors
                  hover:bg-muted
                `, isActive && 'bg-amanah-navy text-background')}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </SectionContainer>
    </header>
  );
}
