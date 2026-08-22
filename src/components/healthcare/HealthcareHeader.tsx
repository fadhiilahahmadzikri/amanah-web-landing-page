'use client';

import { useEffect, useState } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { cn, getI18nPath } from '@/utils/Helpers';
import { AmanahLogo } from './AmanahLogo';
import { healthcareNavigationItems } from './data';
import { getHealthcareHref } from './healthcareNavigation';
import { SectionContainer } from './SectionContainer';
import { ThemeToggle } from './ThemeToggle';
import { ViewportLine } from './ViewportLine';

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
    <header className="
      sticky top-0 z-50 max-w-screen overflow-x-clip bg-background
    "
    >
      <SectionContainer className="
        relative flex h-14 items-center overflow-visible border-x border-line
        px-0 sm:px-0
      "
      >
        <ViewportLine position="top" />
        <ViewportLine position="bottom" />

        <div className="flex min-w-0 flex-1 items-center px-3">
          <AmanahLogo
            locale={locale}
            className="min-w-0"
          />
        </div>

        <nav
          aria-label="Navigasi utama"
          className="
            hidden h-full items-center border-l border-line
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
                  inline-flex h-full items-center px-4 text-sm font-medium
                  text-muted-foreground transition-colors
                  hover:text-foreground
                  xl:px-5
                `, isActive && 'text-foreground')}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex h-full items-center">
          <div className="flex h-full items-center border-l border-line px-1.5">
            <ThemeToggle />
          </div>
          <a
            href={getI18nPath('/sign-in', locale)}
            className="
              hidden h-full items-center border-l border-line px-4 text-sm
              font-medium text-muted-foreground transition-colors
              hover:text-foreground
              sm:inline-flex
            "
          >
            Masuk
          </a>
        </div>
      </SectionContainer>

      <SectionContainer className="
        border-x border-b border-line px-2 sm:px-2
        lg:hidden
      "
      >
        <nav
          aria-label="Navigasi utama mobile"
          className="
            flex gap-1 overflow-x-auto py-2 text-sm font-medium
            [&::-webkit-scrollbar]:hidden
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
                  inline-flex h-9 shrink-0 items-center px-3 text-muted-foreground
                  transition-colors
                  hover:text-foreground
                `, isActive && 'text-foreground')}
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
