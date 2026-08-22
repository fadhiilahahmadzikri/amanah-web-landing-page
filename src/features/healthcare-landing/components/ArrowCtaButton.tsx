import type { ReactNode } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/Helpers';

type ArrowCtaButtonProps = {
  children: ReactNode;
  href: string;
  treatment?: 'primary' | 'secondary';
  className?: string;
};

export function ArrowCtaButton({
  children,
  href,
  treatment = 'primary',
  className,
}: ArrowCtaButtonProps) {
  const buttonVariant = treatment === 'primary' ? 'default' : 'secondary';
  const iconClassName = treatment === 'primary'
    ? 'bg-secondary text-secondary-foreground'
    : 'bg-primary text-primary-foreground';

  return (
    <Button
      asChild
      size="lg"
      variant={buttonVariant}
      className={cn(`
        h-12 rounded-full px-5 pr-1.5 text-sm font-semibold
        md:h-14 md:px-7 md:pr-2 md:text-base
      `, className)}
    >
      <a href={href}>
        <span>{children}</span>
        <span className={cn(`
          inline-flex size-9 items-center justify-center rounded-full
          md:size-11
        `, iconClassName)}
        >
          <ArrowUpRightIcon data-icon="inline-end" />
        </span>
      </a>
    </Button>
  );
}
