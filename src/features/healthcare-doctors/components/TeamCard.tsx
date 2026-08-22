import type { HealthcareTeamMember } from '../types';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/Helpers';

type TeamCardProps = {
  className?: string;
  member: HealthcareTeamMember;
  priority?: boolean;
};

export function TeamCard({
  className,
  member,
  priority = false,
}: TeamCardProps) {
  const showSocials = member.showSocials ?? true;

  return (
    <article
      className={cn(`
        flex h-full min-h-[420px] flex-col bg-background p-6 text-foreground
        md:p-8
      `, className)}
    >
      <div className="min-h-23">
        <h3 className="
          max-w-52 text-2xl/[1.05] font-extrabold
          md:text-[28px]
        "
        >
          {member.name}
        </h3>
        <p className="
          mt-3 font-amanah-script text-base/[1.1] text-muted-foreground
          md:text-lg
        "
        >
          {member.role}
        </p>
      </div>

      <div className="
        relative mt-auto aspect-square overflow-hidden bg-background
      "
      >
        <Image
          src={member.image.src}
          alt={member.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 282px, (min-width: 768px) 45vw, calc(100vw - 88px)"
          className="object-cover object-top"
        />

        {showSocials && (
          <div className="absolute right-3 bottom-3 flex gap-2">
            <a
              href="#kontak"
              aria-label={`LinkedIn ${member.name}`}
              className="
                inline-flex size-8 items-center justify-center rounded-lg
                bg-primary text-primary-foreground transition-transform
                hover:scale-105
              "
            >
              <span
                aria-hidden
                className="text-[10px] leading-none font-extrabold"
              >
                in
              </span>
            </a>
            <a
              href="#kontak"
              aria-label={`X ${member.name}`}
              className="
                inline-flex size-8 items-center justify-center rounded-lg
                bg-primary text-primary-foreground transition-transform
                hover:scale-105
              "
            >
              <XIcon aria-hidden className="size-3.5" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
