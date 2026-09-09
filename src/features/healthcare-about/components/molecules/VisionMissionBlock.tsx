import type { PixelFeatureIcon } from '../../types';
import { cn } from '@/utils/Helpers';
import { DecorativeMarker } from '../atoms/DecorativeMarker';
import { PixelIconBadge } from '../atoms/PixelIconBadge';

type VisionMissionBlockProps = {
  className?: string;
  description: string;
  icon?: PixelFeatureIcon;
  title: string;
};

export function VisionMissionBlock({
  className,
  description,
  icon,
  title,
}: VisionMissionBlockProps) {
  return (
    <article
      className={cn(
        `
          flex h-full flex-col justify-start p-6
          sm:p-10
          lg:p-12
        `,
        className,
      )}
    >
      <div className="flex flex-col items-start gap-4">
        <div data-vm-icon className="will-change-transform">
          {icon
            ? (
                <PixelIconBadge icon={icon} size={32} />
              )
            : (
                <DecorativeMarker />
              )}
        </div>
        <div className="-mb-2 overflow-hidden pb-2">
          <h2
            data-mask-text
            className="
              inline-block text-2xl font-medium tracking-tight text-foreground
              will-change-transform
              sm:text-3xl
            "
          >
            {title}
          </h2>
        </div>
      </div>
      <div className="-mb-2 overflow-hidden pb-2">
        <p
          data-mask-text
          className="
            mt-5 inline-block max-w-lg text-sm/relaxed text-muted-foreground
            will-change-transform
            sm:text-base/relaxed
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}
