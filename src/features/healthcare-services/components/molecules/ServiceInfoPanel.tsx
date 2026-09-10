import type { ReactNode } from 'react';
import {
  AmanahScriptText,
  HealthcareHeading,
  HealthcareText,
} from '@/components/healthcare';
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
          <AmanahScriptText
            className="inline-block text-foreground"
          >
            {eyebrow}
          </AmanahScriptText>
        </div>

        <div className="
          -mb-3 overflow-hidden pb-3
          md:-mb-4 md:pb-4
        "
        >
          <HealthcareHeading
            as="h3"
            size="subsection"
            className="text-foreground"
          >
            {title}
          </HealthcareHeading>
        </div>

        <HealthcareText
          size="body"
          className="
            mt-4 max-w-md text-muted-foreground
            sm:mt-5
          "
        >
          {description}
        </HealthcareText>

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
