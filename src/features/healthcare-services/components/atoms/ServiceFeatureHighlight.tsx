import { CheckIcon } from 'lucide-react';
import { cn } from '@/utils/Helpers';

type ServiceFeatureHighlightProps = {
  title: string;
  primaryText?: string;
  secondaryText?: string;
  className?: string;
};

export function ServiceFeatureHighlight({
  title,
  primaryText,
  secondaryText,
  className,
}: ServiceFeatureHighlightProps) {
  // If primary and secondary are not explicitly provided, split gracefully
  let line1 = primaryText;
  let line2 = secondaryText;

  if (!line1) {
    if (title.includes(' dan ')) {
      const parts = title.split(' dan ');
      line1 = parts[0];
      line2 = `dan ${parts[1]}`;
    } else if (title.includes(' ')) {
      const words = title.split(' ');
      if (words.length >= 3) {
        line1 = `${words[0]} ${words[1]}`;
        line2 = words.slice(2).join(' ');
      } else {
        line1 = words[0];
        line2 = words[1];
      }
    } else {
      line1 = title;
    }
  }

  return (
    <div
      className={cn(
        `
          flex min-w-0 flex-1 items-center gap-2
          sm:gap-2.5
        `,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="
          flex size-5.5 shrink-0 items-center justify-center rounded-full
          bg-amanah-blue text-white shadow-2xs
          sm:size-6
          dark:bg-amanah-blue dark:text-white
        "
      >
        <CheckIcon className="
          size-3 stroke-[2.8]
          sm:size-3.5
        "
        />
      </span>
      <div className="flex min-w-0 flex-col text-left">
        <span className="
          truncate amanah-type-caption font-semibold text-foreground
        "
        >
          {line1}
        </span>
        {line2 && (
          <span className="
            truncate amanah-type-caption font-medium text-muted-foreground
          "
          >
            {line2}
          </span>
        )}
      </div>
    </div>
  );
}
