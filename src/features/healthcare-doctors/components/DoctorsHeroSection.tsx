'use client';

import type { DoctorMarkerTone } from '../types';
import Image from 'next/image';
import { useState } from 'react';
import {
  AmanahScriptText,
  BlueprintMark,
  SectionContainer,
} from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import {
  doctorsHero,
  doctorsHeroMarkers,
  doctorsTeam,
} from '../data';

const markerFocusClassNames: Record<DoctorMarkerTone, string> = {
  blue: 'border-amanah-blue/60 bg-amanah-blue/30 focus-visible:ring-amanah-blue hover:border-amanah-blue',
  cyan: 'border-amanah-sky/60 bg-amanah-sky/30 focus-visible:ring-amanah-sky hover:border-amanah-sky',
  green: 'border-amanah-mint/60 bg-amanah-mint/30 focus-visible:ring-amanah-mint hover:border-amanah-mint',
  lime: 'border-amanah-mint/60 bg-amanah-mint/30 focus-visible:ring-amanah-mint hover:border-amanah-mint',
  neutral: 'border-foreground/30 bg-background/70 focus-visible:ring-ring hover:border-foreground',
};

export function DoctorsHeroSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const selectedMember = doctorsTeam.find(member => member.id === selectedMemberId);

  return (
    <section className="bg-background">
      <SectionContainer className="
        px-0
        sm:px-0
      "
      >
        <div className="
          relative overflow-hidden px-4 py-12
          md:px-10 md:py-16
        "
        >
          <BlueprintMark
            patternId="amanah-doctors-hero-blueprint"
            className="absolute inset-x-0 top-0 min-h-[360px] opacity-70"
            figureLabel="Fig. 2."
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="-mb-2 overflow-hidden pb-2">
              <AmanahScriptText
                className="
                  inline-block text-3xl/[1.05] font-semibold text-foreground
                  md:text-4xl/[1.05]
                "
              >
                {doctorsHero.eyebrow}
              </AmanahScriptText>
            </div>
            <div className="
              -mb-3 overflow-hidden pb-3
              md:-mb-4 md:pb-4
            "
            >
              <h1 className="
                inline-block text-4xl/[1.08] font-medium tracking-tight
                text-foreground
                md:text-5xl/[1.08]
              "
              >
                {doctorsHero.title}
              </h1>
            </div>
            <div className="
              mt-4 -mb-2 overflow-hidden pb-2
              sm:mt-5
            "
            >
              <p className="
                mx-auto inline-block max-w-lg text-sm/[1.65] font-medium
                text-muted-foreground
                md:text-base
              "
              >
                {doctorsHero.description}
              </p>
            </div>
          </div>

          <div className="
            relative mx-auto mt-10 aspect-1301/560 min-h-[240px] overflow-hidden
            border border-line bg-muted
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
                  absolute size-5 -translate-1/2 rounded-lg border opacity-80
                  shadow-xs backdrop-blur-sm
                  transition-[border-color,opacity,transform] outline-none
                  hover:scale-110 hover:opacity-100
                  focus-visible:opacity-100 focus-visible:ring-2
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                `, markerFocusClassNames[marker.tone])}
                aria-label={`Lihat detail ${doctorsTeam.find(member => member.id === marker.memberId)?.name ?? 'dokter'}`}
                onClick={() => setSelectedMemberId(marker.memberId)}
              />
            ))}

            <div className="
              absolute bottom-3 left-4 max-w-[330px] border border-line
              bg-background/90 px-4 py-2 text-[10px] font-semibold
              text-muted-foreground backdrop-blur-sm
              md:bottom-4 md:left-5 md:text-xs
            "
            >
              {doctorsHero.helperText}
            </div>

            {selectedMember && (
              <div className="
                absolute right-4 bottom-16 hidden max-w-xs border border-line
                bg-background/95 p-4 text-left text-foreground backdrop-blur-sm
                md:block
              "
              >
                <p className="text-base font-semibold">{selectedMember.name}</p>
                <AmanahScriptText className="mt-1 text-lg text-amanah-muted">
                  {selectedMember.role}
                </AmanahScriptText>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
