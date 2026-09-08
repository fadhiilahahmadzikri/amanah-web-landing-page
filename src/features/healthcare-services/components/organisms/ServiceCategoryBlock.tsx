import type { ServiceCategorySection } from '../../types';
import { cn } from '@/utils/Helpers';
import { ServiceInfoPanel } from '../molecules/ServiceInfoPanel';
import { ServiceBentoGrid } from './ServiceBentoGrid';

type ServiceCategoryBlockProps = {
  section: ServiceCategorySection;
  className?: string;
};

export function ServiceCategoryBlock({
  section,
  className,
}: ServiceCategoryBlockProps) {
  const isBentoLeft = section.layout === 'bento-left';

  return (
    <div
      id={section.id}
      data-service-section={section.contextKey}
      className={cn(`
        scroll-mt-24 py-6
        md:py-8
        lg:py-10
      `, className)}
    >
      <div className="
        grid grid-cols-1 gap-6
        lg:grid-cols-12 lg:items-start lg:gap-6
        xl:gap-8
      "
      >
        {/* Bento Grid Slot */}
        <div
          className={cn(
            'lg:col-span-8',
            isBentoLeft
              ? `
                order-2
                lg:order-1
              `
              : `
                order-2
                lg:order-2
              `,
          )}
        >
          <ServiceBentoGrid items={section.services} />
        </div>

        {/* Informational Panel Slot */}
        <div
          className={cn(
            'lg:sticky lg:top-28 lg:col-span-4',
            isBentoLeft
              ? `
                order-1
                lg:order-2
              `
              : `
                order-1
                lg:order-1
              `,
          )}
        >
          <ServiceInfoPanel
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />
        </div>
      </div>
    </div>
  );
}
