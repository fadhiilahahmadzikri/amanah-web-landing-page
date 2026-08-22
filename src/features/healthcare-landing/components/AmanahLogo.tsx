import Image from 'next/image';
import { cn } from '@/utils/Helpers';
import { brand } from '../data';

type AmanahLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export function AmanahLogo({
  className,
  markClassName,
  textClassName,
}: AmanahLogoProps) {
  return (
    <a className={cn('inline-flex items-center gap-3', className)} href="#beranda">
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
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
        {brand.name}
      </span>
    </a>
  );
}
