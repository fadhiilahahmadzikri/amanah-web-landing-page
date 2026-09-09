import { cn } from '@/utils/Helpers';

type EditorialStoryContentProps = {
  className?: string;
  description: string;
  title: string;
};

export function EditorialStoryContent({
  className,
  description,
  title,
}: EditorialStoryContentProps) {
  return (
    <div
      className={cn(
        `
          flex flex-col justify-center p-6
          sm:p-10
          lg:p-14
        `,
        className,
      )}
    >
      <div className="max-w-xl">
        <div className="-mb-2 overflow-hidden pb-2">
          <h2
            data-mask-text
            className="
              inline-block text-2xl font-medium tracking-tight text-foreground
              will-change-transform
              sm:text-3xl
              lg:text-4xl/tight
            "
          >
            {title}
          </h2>
        </div>
        <div className="-mb-2 overflow-hidden pb-2">
          <p
            data-mask-text
            className="
              mt-5 inline-block text-sm/relaxed text-muted-foreground
              will-change-transform
              sm:mt-6 sm:text-base/relaxed
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
