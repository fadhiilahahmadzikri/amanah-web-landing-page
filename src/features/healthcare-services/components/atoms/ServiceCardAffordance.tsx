import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/utils/Helpers';

type ServiceCardAffordanceProps = {
  className?: string;
  ariaLabel?: string;
};

export function ServiceCardAffordance({
  className,
  ariaLabel = 'Lihat detail layanan',
}: ServiceCardAffordanceProps) {
  return (
    <span
      aria-label={ariaLabel}
      className={cn(
        `
          inline-flex size-8 shrink-0 items-center justify-center rounded-full
          border border-white/30 bg-white/15 text-foreground
          shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]
          backdrop-blur-xl transition-all duration-300
          group-hover:scale-105 group-hover:border-white/50
          group-hover:bg-white/30
          group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)]
          sm:size-9
          dark:border-white/20 dark:bg-white/10 dark:text-white
        `,
        className,
      )}
    >
      <ArrowRightIcon
        className="
          size-4 transition-transform duration-300
          group-hover:translate-x-0.5
        "
        aria-hidden="true"
      />
    </span>
  );
}
