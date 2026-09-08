import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/utils/Helpers';

type ServiceContextItemProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

export function ServiceContextItem({
  label,
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
          group flex w-full items-center justify-between gap-3 px-4 py-3
          text-left text-xs font-semibold tracking-tight transition-all
          duration-300 select-none
          focus-visible:ring-2 focus-visible:ring-primary
          focus-visible:ring-offset-1 focus-visible:outline-none
          md:text-sm
        `,
        isActive
          ? `
            bg-primary text-primary-foreground shadow-xs
            dark:bg-amanah-blue dark:text-white
          `
          : `
            bg-background/80 text-muted-foreground
            hover:bg-accent hover:text-foreground
            dark:bg-card/70 dark:text-muted-foreground
            dark:hover:bg-accent dark:hover:text-foreground
          `,
        className,
      )}
    >
      <span className="truncate">{label}</span>
      <ArrowRightIcon
        className={cn(
          'size-3.5 shrink-0 transition-transform duration-300',
          isActive
            ? 'translate-x-0 opacity-100'
            : `
              -translate-x-1 opacity-0
              group-hover:translate-x-0 group-hover:opacity-60
            `,
        )}
        aria-hidden="true"
      />
    </button>
  );
}
