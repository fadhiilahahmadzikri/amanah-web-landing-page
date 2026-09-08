import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/utils/Helpers';

type ServiceContextItemProps = {
  label: string;
  stepNumber?: string;
  sublabel?: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

export function ServiceContextItem({
  label,
  stepNumber,
  sublabel,
  isActive,
  onClick,
  className,
}: ServiceContextItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        `
          group relative flex w-full cursor-pointer items-center justify-between
          gap-3 px-4 py-3.5 text-left text-xs font-semibold tracking-tight
          transition-all duration-300 select-none
          focus-visible:ring-2 focus-visible:ring-primary
          focus-visible:ring-offset-1 focus-visible:outline-none
          sm:px-5 sm:py-4
          md:text-sm
        `,
        isActive
          ? `
            bg-primary text-primary-foreground shadow-xs
            dark:bg-amanah-blue dark:text-white
          `
          : `
            bg-background text-muted-foreground
            hover:bg-accent/60 hover:text-foreground
            dark:bg-card/40 dark:text-muted-foreground
            dark:hover:bg-accent/40 dark:hover:text-foreground
          `,
        className,
      )}
    >
      {/* Active Accent Rail (Left line on desktop, bottom line on mobile) */}
      <span
        aria-hidden
        className={cn(
          `
            pointer-events-none absolute transition-all duration-300 ease-out
            max-lg:inset-x-0 max-lg:bottom-0 max-lg:h-0.5
            lg:inset-y-0 lg:left-0 lg:w-1
          `,
          isActive
            ? `
              bg-amanah-sky opacity-100
              dark:bg-white
            `
            : 'opacity-0',
        )}
      />

      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          {stepNumber && (
            <span
              className={cn(
                `
                  font-mono text-[11px] font-normal transition-colors
                  duration-300
                `,
                isActive
                  ? `
                    text-primary-foreground/70
                    dark:text-white/70
                  `
                  : 'text-muted-foreground/60',
              )}
            >
              {stepNumber}
            </span>
          )}
          <span className="
            truncate text-xs font-semibold
            md:text-sm
          "
          >
            {label}
          </span>
        </div>

        {sublabel && (
          <span
            className={cn(
              'truncate text-[11px] font-normal transition-colors duration-300',
              isActive
                ? `
                  text-primary-foreground/80
                  dark:text-white/80
                `
                : 'text-muted-foreground/70',
            )}
          >
            {sublabel}
          </span>
        )}
      </div>

      <ArrowRightIcon
        className={cn(
          'size-4 shrink-0 transition-all duration-300 ease-out',
          isActive
            ? 'translate-x-0 opacity-100'
            : `
              -translate-x-1.5 opacity-0
              group-hover:translate-x-0 group-hover:opacity-60
            `,
        )}
        aria-hidden="true"
      />
    </button>
  );
}
