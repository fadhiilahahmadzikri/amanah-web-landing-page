import { navigationItems } from '../data';
import { AmanahLogo } from './AmanahLogo';
import { ArrowCtaButton } from './ArrowCtaButton';
import { SectionContainer } from './SectionContainer';

export function HealthcareHeader() {
  return (
    <header className="bg-background py-4">
      <SectionContainer className="flex h-16 items-center justify-between gap-6">
        <AmanahLogo />

        <nav
          aria-label="Navigasi utama"
          className="
            hidden items-center gap-2
            lg:flex
          "
        >
          {navigationItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="
                rounded-full px-5 py-3 text-base font-semibold text-amanah-navy
                transition-colors
                hover:bg-accent
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ArrowCtaButton
          href="#kontak"
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
          {navigationItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-accent px-3 py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </SectionContainer>
    </header>
  );
}
