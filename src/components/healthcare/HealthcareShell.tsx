import type { ReactNode } from 'react';
import { HealthcareChatFab } from './HealthcareChatFab';
import { HealthcareFooter } from './HealthcareFooter';
import { HealthcareHeader } from './HealthcareHeader';
import { TechnicalDivider } from './TechnicalDivider';

type HealthcareShellProps = {
  activePath: string;
  children: ReactNode;
  locale?: string;
};

export function HealthcareShell({
  activePath,
  children,
  locale,
}: HealthcareShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader activePath={activePath} locale={locale} />
      <main className="mx-auto max-w-[1300px] border-x-2 border-line">
        {children}
      </main>
      <div className="mx-auto max-w-[1300px] border-x-2 border-line">
        <TechnicalDivider />
      </div>
      <HealthcareChatFab />
      <HealthcareFooter locale={locale} />
    </div>
  );
}
