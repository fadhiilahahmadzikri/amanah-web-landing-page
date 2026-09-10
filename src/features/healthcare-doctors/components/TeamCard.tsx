import type { CSSProperties } from 'react';
import type { HealthcareTeamMember } from '../types';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AmanahScriptText,
  HealthcareHeading,
} from '@/components/healthcare';
import { cn } from '@/utils/Helpers';

type TeamCardProps = {
  className?: string;
  member: HealthcareTeamMember;
  priority?: boolean;
  showRightRail?: boolean;
};

const hatchedRailStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      135deg,
      var(--line) 0 1.5px,
      transparent 1.5px 8px
    )
  `,
} satisfies CSSProperties;

export function TeamCard({
  className,
  member,
  priority = false,
  showRightRail = false,
}: TeamCardProps) {
  const showSocials = member.showSocials ?? true;

  return (
    <article
      className={cn(
        `
          relative flex h-full flex-col overflow-hidden bg-background pl-2.5
          text-foreground
          sm:pl-6
          md:pl-8
        `,
        showRightRail
        && `
          border-r border-line pr-2.5
          sm:pr-6
          md:pr-8
        `,
        className,
      )}
    >
      <span
        aria-hidden
        className="
          absolute inset-y-0 left-0 z-10 w-2.5 border-r border-line opacity-70
          sm:w-6
          md:w-8
        "
        style={hatchedRailStyle}
      />
      {showRightRail && (
        <span
          aria-hidden
          className="
            absolute inset-y-0 right-0 z-10 w-2.5 border-l border-line opacity-70
            sm:w-6
            md:w-8
          "
          style={hatchedRailStyle}
        />
      )}

      <div className="
        relative px-3.5 py-3
        min-[380px]:px-4
        sm:px-5 sm:pt-6 sm:pb-5
        md:px-8 md:pt-8 md:pb-6
      "
      >
        <HealthcareHeading
          as="h3"
          size="card"
          className="
            line-clamp-2 max-w-72 font-extrabold leading-snug
            text-sm
            min-[380px]:text-base
            md:amanah-type-card-title
          "
        >
          {member.name}
        </HealthcareHeading>
        <AmanahScriptText
          size="inherit"
          className="
            mt-1 line-clamp-2 text-base font-medium text-amanah-muted
            min-[380px]:text-lg
            sm:mt-2 sm:text-xl
            md:text-2xl
          "
        >
          {member.role}
        </AmanahScriptText>
      </div>

      <div
        className="
          relative min-h-[150px] w-full flex-1 overflow-hidden bg-background
          min-[380px]:min-h-[175px]
          sm:min-h-[340px]
          md:min-h-[360px]
        "
      >
        <Image
          src={member.image.src}
          alt={member.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1200px) 292px, (min-width: 860px) 33vw, 50vw"
          className="object-contain object-bottom"
        />

        {showSocials && (
          <div className="
            absolute right-1.5 bottom-1.5 flex gap-1
            sm:right-3 sm:bottom-3 sm:gap-2
          "
          >
            <Link
              href="/kontak"
              aria-label={`LinkedIn ${member.name}`}
              className="
                inline-flex size-6 items-center justify-center rounded-md
                bg-primary text-primary-foreground transition-transform
                hover:scale-105
                sm:size-8 sm:rounded-lg
              "
            >
              <span
                aria-hidden
                className="text-[10px] font-extrabold sm:amanah-type-caption"
              >
                in
              </span>
            </Link>
            <Link
              href="/kontak"
              aria-label={`X ${member.name}`}
              className="
                inline-flex size-6 items-center justify-center rounded-md
                bg-primary text-primary-foreground transition-transform
                hover:scale-105
                sm:size-8 sm:rounded-lg
              "
            >
              <XIcon aria-hidden className="size-3 sm:size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
