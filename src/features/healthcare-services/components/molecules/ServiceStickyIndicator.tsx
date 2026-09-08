import type { ServiceCategoryContext } from '../../types';
import { cn } from '@/utils/Helpers';
import { ServiceContextItem } from '../atoms/ServiceContextItem';

type ServiceStickyIndicatorProps = {
  activeContext: ServiceCategoryContext;
  onSelectContext: (context: ServiceCategoryContext) => void;
  className?: string;
};

export function ServiceStickyIndicator({
  activeContext,
  onSelectContext,
  className,
}: ServiceStickyIndicatorProps) {
  return (
    <nav
      aria-label="Konteks Layanan"
      className={cn(
        `
          grid w-full grid-cols-2 divide-x divide-line border-line bg-background
          lg:flex lg:flex-col lg:divide-x-0 lg:divide-y lg:border-b
        `,
        className,
      )}
    >
      <ServiceContextItem
        stepNumber="01"
        label="Dokter umum"
        sublabel="Pelayanan Dasar"
        isActive={activeContext === 'general-practitioner'}
        onClick={() => onSelectContext('general-practitioner')}
      />
      <ServiceContextItem
        stepNumber="02"
        label="Pelayanan Bidan"
        sublabel="Kesehatan Ibu & Anak"
        isActive={activeContext === 'midwifery'}
        onClick={() => onSelectContext('midwifery')}
      />
    </nav>
  );
}
