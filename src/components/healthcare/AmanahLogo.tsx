import Image from 'next/image';
import { AppConfig } from '@/utils/AppConfig';
import { cn, getI18nPath } from '@/utils/Helpers';
import { healthcareBrand } from './data';

type AmanahLogoProps = {
  className?: string;
  locale?: string;
  markClassName?: string;
  textClassName?: string;
};

export function AmanahLogo({
  className,
  locale = AppConfig.i18n.defaultLocale,
  markClassName,
  textClassName,
}: AmanahLogoProps) {
  return (
    <a
      className={cn('inline-flex items-center gap-3', className)}
      href={getI18nPath('/', locale)}
    >
      <Image
        src={healthcareBrand.logo.src}
        alt={healthcareBrand.logo.alt}
        width={48}
        height={48}
        className={cn(`
          size-10 rounded-full object-contain
          md:size-11
        `, markClassName)}
        priority
      />
      <span className={cn(`
        text-2xl font-medium text-amanah-navy
        md:text-3xl
      `, textClassName)}
      >
        {healthcareBrand.name}
      </span>
    </a>
  );
}
