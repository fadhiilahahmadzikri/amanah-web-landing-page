import type { HealthcareTeamMember } from '../types';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

type TeamCardProps = {
  member: HealthcareTeamMember;
  priority?: boolean;
};

export function TeamCard({ member, priority = false }: TeamCardProps) {
  const showSocials = member.showSocials ?? true;

  return (
    <article className="
      flex h-full min-h-[420px] flex-col rounded-3xl border border-border
      bg-muted p-6 text-amanah-navy
    "
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
          mt-3 font-amanah-script text-base/[1.1] text-amanah-muted
          md:text-lg
        "
        >
          {member.role}
        </p>
      </div>

      <div className="
        relative mt-auto aspect-square overflow-hidden rounded-2xl bg-background
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
                inline-flex size-8 items-center justify-center rounded-full
                bg-amanah-navy text-background transition-transform
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
                inline-flex size-8 items-center justify-center rounded-full
                bg-amanah-navy text-background transition-transform
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
