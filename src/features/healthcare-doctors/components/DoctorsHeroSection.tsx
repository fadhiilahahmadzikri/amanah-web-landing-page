'use client';

import type { DoctorMarkerTone } from '../types';
import Image from 'next/image';
import { useState } from 'react';
import { SectionContainer } from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import {
  doctorsHero,
  doctorsHeroMarkers,
  doctorsTeam,
} from '../data';

const markerFocusClassNames: Record<DoctorMarkerTone, string> = {
  blue: 'focus-visible:ring-amanah-blue',
  cyan: 'focus-visible:ring-amanah-sky',
  green: 'focus-visible:ring-amanah-mint',
  lime: 'focus-visible:ring-amanah-mint',
};

export function DoctorsHeroSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const selectedMember = doctorsTeam.find(member => member.id === selectedMemberId);

  return (
    <section className="
      bg-background pt-16 pb-12
      md:py-20
    "
    >
      <SectionContainer className="max-w-[1400px]">
        <div className="
          rounded-4xl border border-border bg-background px-5 py-12
          md:px-12 md:py-14
        "
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="
              text-base font-bold tracking-normal text-amanah-navy uppercase
              md:text-lg
            "
            >
              {doctorsHero.eyebrow}
            </p>
            <h1 className="
              mt-3 text-4xl/[1.08] font-semibold text-amanah-navy
              md:text-5xl/[1.08]
            "
            >
              {doctorsHero.title}
            </h1>
            <p className="
              mx-auto mt-4 max-w-lg text-sm/[1.55] font-semibold
              text-amanah-navy
              md:text-base
            "
            >
              {doctorsHero.description}
            </p>
          </div>

          <div className="
            relative mx-auto mt-10 aspect-1301/560 min-h-[240px] overflow-hidden
            rounded-[1.75rem] border border-border bg-background
            shadow-amanah-card
          "
          >
            <Image
              src={doctorsHero.image.src}
              alt={doctorsHero.image.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1302px, calc(100vw - 40px)"
              className="object-cover object-center"
            />

            {doctorsHeroMarkers.map(marker => (
              <button
                key={marker.id}
                type="button"
                style={{ left: marker.left, top: marker.top }}
                className={cn(`
                  absolute size-10 -translate-1/2 rounded-full opacity-0
                  transition-opacity outline-none
                  focus-visible:opacity-100 focus-visible:ring-4
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                `, markerFocusClassNames[marker.tone])}
                aria-label={`Lihat detail ${doctorsTeam.find(member => member.id === marker.memberId)?.name ?? 'dokter'}`}
                onClick={() => setSelectedMemberId(marker.memberId)}
              />
            ))}

            <div className="
              absolute bottom-3 left-4 max-w-[330px] rounded-full bg-background
              px-4 py-2 text-[10px] font-bold text-amanah-navy shadow-sm
              md:bottom-4 md:left-5 md:text-xs
            "
            >
              {doctorsHero.helperText}
            </div>

            {selectedMember && (
              <div className="
                absolute right-4 bottom-16 hidden max-w-xs rounded-2xl
                bg-background/95 p-4 text-left text-amanah-navy
                shadow-amanah-card
                md:block
              "
              >
                <p className="text-base font-bold">{selectedMember.name}</p>
                <p className="mt-1 font-amanah-script text-lg text-amanah-muted">
                  {selectedMember.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
