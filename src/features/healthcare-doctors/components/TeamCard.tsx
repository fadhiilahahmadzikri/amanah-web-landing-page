import type { CSSProperties } from 'react';
import type { HealthcareTeamMember } from '../types';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AmanahScriptText } from '@/components/healthcare';
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
          relative flex h-full flex-col overflow-hidden bg-background pl-3
          text-foreground
          min-[420px]:pl-4
          sm:pl-6
          md:pl-8
        `,
        showRightRail
        && `
          border-r border-line pr-3
          min-[420px]:pr-4
          sm:pr-6
          md:pr-8
        `,
        className,
      )}
    >
      <span
        aria-hidden
        className="
          absolute inset-y-0 left-0 z-10 w-3 border-r border-line opacity-70
          min-[420px]:w-4
          sm:w-6
          md:w-8
        "
        style={hatchedRailStyle}
      />
      {showRightRail && (
        <span
          aria-hidden
          className="
            absolute inset-y-0 right-0 z-10 w-3 border-l border-line opacity-70
            min-[420px]:w-4
            sm:w-6
            md:w-8
          "
          style={hatchedRailStyle}
        />
      )}

      <div className="
        relative px-2.5 py-3
        min-[420px]:px-3 min-[420px]:py-4
        sm:px-5 sm:pt-6 sm:pb-5
        md:px-8 md:pt-8 md:pb-6
      "
      >
        <h3 className="
          line-clamp-3 max-w-72 text-base/[1.05] font-extrabold
          min-[420px]:text-lg/[1.05]
          sm:text-2xl/[1.05]
          md:text-[28px]
        "
        >
          {member.name}
        </h3>
        <AmanahScriptText
          className="
            mt-2 line-clamp-2 text-xs/[1.15] text-amanah-muted
            min-[420px]:text-sm/[1.15]
            sm:mt-3 sm:text-base/[1.1]
            md:text-lg
          "
        >
          {member.role}
        </AmanahScriptText>
      </div>

      <div
        className="
          relative min-h-[260px] w-full flex-1 overflow-hidden bg-background
          min-[420px]:min-h-[300px]
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
            absolute right-2 bottom-2 flex gap-1.5
            sm:right-3 sm:bottom-3 sm:gap-2
          "
          >
            <Link
              href="/kontak"
              aria-label={`LinkedIn ${member.name}`}
              className="
                inline-flex size-7 items-center justify-center rounded-lg
                bg-primary text-primary-foreground transition-transform
                hover:scale-105
                sm:size-8
              "
            >
              <span
                aria-hidden
                className="text-[10px] leading-none font-extrabold"
              >
                in
              </span>
            </Link>
            <Link
              href="/kontak"
              aria-label={`X ${member.name}`}
              className="
                inline-flex size-7 items-center justify-center rounded-lg
                bg-primary text-primary-foreground transition-transform
                hover:scale-105
                sm:size-8
              "
            >
              <XIcon aria-hidden className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
