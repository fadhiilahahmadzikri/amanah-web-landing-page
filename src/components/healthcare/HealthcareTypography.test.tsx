import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import {
  AmanahScriptText,
  ArrowCtaButton,
  HealthcareEyebrow,
  HealthcareHeading,
  HealthcareText,
} from './index';

describe('HealthcareTypography', () => {
  it('renders semantic heading, paragraph, and label roles with stable typography classes', async () => {
    await render(
      <section>
        <HealthcareHeading as="h1" size="hero">
          Klinik Amanah Healthcare
        </HealthcareHeading>
        <HealthcareText size="lead">
          Pelayanan kesehatan profesional untuk keluarga.
        </HealthcareText>
        <HealthcareEyebrow>
          Bersama kami
        </HealthcareEyebrow>
      </section>,
    );

    const heading = page.getByRole('heading', {
      level: 1,
      name: 'Klinik Amanah Healthcare',
    });
    const lead = page.getByText('Pelayanan kesehatan profesional untuk keluarga.');
    const eyebrow = page.getByText('Bersama kami');

    await expect.element(heading).toHaveClass(/amanah-type-hero/);
    await expect.element(lead).toHaveClass(/amanah-type-lead/);
    await expect.element(eyebrow).toHaveClass(/amanah-type-eyebrow/);
  });

  it('renders script text with the default accent typography role', async () => {
    await render(
      <AmanahScriptText>
        Janji Temu
      </AmanahScriptText>,
    );

    const scriptText = page.getByText('Janji Temu');

    await expect.element(scriptText).toHaveClass(/amanah-type-script-accent/);
  });

  it('renders compact headings for dense cards', async () => {
    await render(
      <HealthcareHeading as="h3" size="compact">
        Imunisasi
      </HealthcareHeading>,
    );

    const heading = page.getByRole('heading', {
      level: 3,
      name: 'Imunisasi',
    });

    await expect.element(heading).toHaveClass(/amanah-type-compact-title/);
  });

  it('keeps typography roles and theme color classes together', async () => {
    await render(
      <section>
        <HealthcareHeading as="h1" size="hero" className="text-foreground">
          Amanah Healthcare
        </HealthcareHeading>
        <ArrowCtaButton href="/kontak">
          Buat Janji Temu
        </ArrowCtaButton>
      </section>,
    );

    const heading = page.getByRole('heading', {
      level: 1,
      name: 'Amanah Healthcare',
    });
    const appointmentLink = page.getByRole('link', {
      name: /Buat Janji Temu/,
    });

    await expect.element(heading).toHaveClass(/amanah-type-hero/);
    await expect.element(heading).toHaveClass(/text-foreground/);
    await expect.element(appointmentLink).toHaveClass(/amanah-type-small/);
    await expect.element(appointmentLink).toHaveClass(/text-primary-foreground/);
  });
});
