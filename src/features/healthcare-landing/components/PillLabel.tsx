import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/Helpers';

type PillLabelProps = {
  children: ReactNode;
  className?: string;
};

export function PillLabel({ children, className }: PillLabelProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(`
        rounded-none border border-line bg-amanah-soft/60 px-3 py-1.5 text-xs
        font-semibold tracking-[0.16em] text-primary uppercase
        dark:bg-amanah-soft/20
      `, className)}
    >
      {children}
    </Badge>
  );
}
