import type { ReactNode } from 'react';
import { PillLabel } from '@/features/healthcare-landing/components/PillLabel';
import { cn } from '@/utils/Helpers';

type ServiceInfoPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  actionSlot?: ReactNode;
  footerSlot?: ReactNode;
};

export function ServiceInfoPanel({
  eyebrow,
  title,
  description,
  className,
  actionSlot,
  footerSlot,
}: ServiceInfoPanelProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col justify-center py-2',
        className,
      )}
    >
      <div className="
        flex flex-col items-start gap-4
        sm:gap-5
      "
      >
        <PillLabel>{eyebrow}</PillLabel>

        <h3
          className="
            text-2xl font-semibold tracking-tight text-foreground
            sm:text-3xl
            lg:text-[28px] lg:leading-tight
            xl:text-4xl
          "
        >
          {title}
        </h3>

        <p
          className="
            max-w-md text-sm/relaxed text-muted-foreground
            sm:text-base/relaxed
          "
        >
          {description}
        </p>

        {actionSlot && <div className="mt-2">{actionSlot}</div>}
      </div>

      {footerSlot && <div className="mt-6 border-t border-line/60 pt-6">{footerSlot}</div>}
    </div>
  );
}
