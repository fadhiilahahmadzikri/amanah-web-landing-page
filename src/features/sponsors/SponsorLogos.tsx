import { useTranslations } from 'next-intl';
import { LogoCloud } from '@/features/landing/LogoCloud';

const sponsorLinks = [
  {
    href: 'https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate',
    label: 'Clerk',
  },
  {
    href: 'https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo',
    label: 'Sentry',
  },
  {
    href: 'https://l.crowdin.com/next-js',
    label: 'Crowdin',
  },
  {
    href: 'https://launch.arcjet.com/Q6eLbRE',
    label: 'Arcjet',
  },
  {
    href: 'https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025',
    label: 'CodeRabbit',
  },
  {
    href: 'https://nextjs-boilerplate.com/pro-saas-starter-kit',
    label: 'Next.js SaaS Boilerplate',
  },
] as const;

export const SponsorLogos = () => {
  const t = useTranslations('SponsorLogos');

  return (
    <LogoCloud text={t('sponsored_by')}>
      {sponsorLinks.map(sponsor => (
        <a
          key={sponsor.label}
          href={sponsor.href}
          target="_blank"
          rel="noopener"
          className="
            rounded-md border border-border px-3 py-2 text-center text-sm
            font-semibold text-foreground transition-colors
            hover:bg-accent
          "
        >
          {sponsor.label}
        </a>
      ))}
    </LogoCloud>
  );
};
