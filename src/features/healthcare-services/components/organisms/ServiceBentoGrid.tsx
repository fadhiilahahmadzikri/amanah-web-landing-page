import type { ServiceCardItem } from '../../types';
import { cn } from '@/utils/Helpers';
import { ServiceBentoCard } from '../molecules/ServiceBentoCard';

type ServiceBentoGridProps = {
  items: ServiceCardItem[];
  className?: string;
};

export function ServiceBentoGrid({ items, className }: ServiceBentoGridProps) {
  return (
    <div
      className={cn(
        `
          grid grid-cols-12 gap-3
          sm:gap-4
        `,
        className,
      )}
    >
      {items.map(item => (
        <ServiceBentoCard key={item.id} item={item} />
      ))}
    </div>
  );
}
