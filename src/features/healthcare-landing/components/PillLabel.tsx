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
        rounded-full border border-border px-5 py-2 text-sm font-bold
        text-amanah-navy uppercase
      `, className)}
    >
      {children}
    </Badge>
  );
}
