'use client';

import type { ServiceCategoryContext } from '../types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { SectionContainer } from '@/components/healthcare';
import { cn } from '@/utils/Helpers';
import {
  generalPractitionerSection,
  midwiferySection,
} from '../data';
import { ServiceStickyIndicator } from './molecules/ServiceStickyIndicator';
import { ServiceCategoryBlock } from './organisms/ServiceCategoryBlock';

gsap.registerPlugin(ScrollTrigger);

type ServicesExperienceProps = {
  className?: string;
};

export function ServicesExperience({ className }: ServicesExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeContext, setActiveContext] = useState<ServiceCategoryContext>('general-practitioner');

  useGSAP(
    () => {
      const generalEl = document.getElementById(generalPractitionerSection.id);
      const midwiferyEl = document.getElementById(midwiferySection.id);

      if (!generalEl || !midwiferyEl) {
        return;
      }

      ScrollTrigger.create({
        trigger: generalEl,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveContext('general-practitioner'),
        onEnterBack: () => setActiveContext('general-practitioner'),
      });

      ScrollTrigger.create({
        trigger: midwiferyEl,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveContext('midwifery'),
        onEnterBack: () => setActiveContext('midwifery'),
      });
    },
    { scope: containerRef },
  );

  const handleSelectContext = (context: ServiceCategoryContext) => {
    setActiveContext(context);
    const targetId = context === 'general-practitioner'
      ? generalPractitionerSection.id
      : midwiferySection.id;

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative bg-background', className)}
    >
      <SectionContainer className="
        px-0
        sm:px-0
      "
      >
        <div className="
          flex flex-col
          lg:flex-row lg:items-stretch
        "
        >
          {/* Left Column: Dedicated panel for Dokter Umum & Bidan indicator */}
          <aside
            className="
              shrink-0 border-b border-line bg-background p-4
              lg:w-[220px] lg:border-r lg:border-b-0 lg:p-6
              xl:w-[240px]
            "
          >
            <div className="sticky top-20 z-20">
              <ServiceStickyIndicator
                activeContext={activeContext}
                onSelectContext={handleSelectContext}
                className="w-full"
              />
            </div>
          </aside>

          {/* Right Column: Independent sections for the service content */}
          <div className="min-w-0 flex-1 divide-y divide-line">
            {/* Block 1: Pelayanan Dokter Umum */}
            <div className="
              p-4
              sm:p-6
              lg:p-8
              xl:p-10
            "
            >
              <ServiceCategoryBlock section={generalPractitionerSection} />
            </div>

            {/* Block 2: Layanan Kesehatan Ibu dan Anak */}
            <div className="
              p-4
              sm:p-6
              lg:p-8
              xl:p-10
            "
            >
              <ServiceCategoryBlock section={midwiferySection} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
