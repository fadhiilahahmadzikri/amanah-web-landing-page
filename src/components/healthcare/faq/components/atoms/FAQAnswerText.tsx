import type { ReactNode } from 'react';
import { cn } from '@/utils/Helpers';
import { HealthcareText } from '../../../HealthcareTypography';

type FAQAnswerTextProps = {
  children: ReactNode;
  className?: string;
};

export function FAQAnswerText({ children, className }: FAQAnswerTextProps) {
  return (
    <HealthcareText
      size="body"
      className={cn('max-w-3xl text-muted-foreground', className)}
    >
      {children}
    </HealthcareText>
  );
}
