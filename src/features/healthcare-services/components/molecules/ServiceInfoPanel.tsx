import type { ReactNode } from 'react';
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
      <div className="flex flex-col items-start">
        <div className="-mb-2 overflow-hidden pb-2">
          <p className="
            inline-block font-amanah-script text-3xl text-foreground
            md:text-4xl
          "
          >
            {eyebrow}
          </p>
        </div>

        <h3
          className="
            mt-1 text-2xl font-semibold tracking-tight text-foreground
            sm:text-3xl
            lg:text-[28px] lg:leading-tight
            xl:text-4xl
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-4 max-w-md text-sm/relaxed text-muted-foreground
            sm:mt-5 sm:text-base/relaxed
          "
        >
          {description}
        </p>

        {actionSlot && (
          <div className="
            mt-4
            sm:mt-5
          "
          >
            {actionSlot}
          </div>
        )}
      </div>

      {footerSlot && <div className="mt-6 border-t border-line/60 pt-6">{footerSlot}</div>}
    </div>
  );
}
