import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders eyebrow, title, and description with center alignment by default', async () => {
    await render(
      <SectionHeader
        eyebrow="Kenali Dokter Kami"
        title="Hangat Mendampingi, Sepenuh Hati."
        description="Dokter Klinik Amanah Healthcare berkomitmen..."
      />,
    );

    await expect.element(page.getByText('Kenali Dokter Kami')).toBeVisible();
    await expect.element(page.getByRole('heading', { level: 2, name: /Hangat Mendampingi/i })).toBeVisible();
    await expect.element(page.getByText(/Dokter Klinik Amanah/i)).toBeVisible();

    const root = document.querySelector('.items-center.text-center');
    expect(root).not.toBeNull();
  });

  it('renders left-aligned when align="left"', async () => {
    await render(
      <SectionHeader
        align="left"
        eyebrow="Why Choose Us"
        title="Langkah Pertama, Untuk Keluarga"
      />,
    );

    const root = document.querySelector('.items-start.text-left');
    expect(root).not.toBeNull();
    await expect.element(page.getByText('Why Choose Us')).toBeVisible();
  });

  it('renders custom ReactNode in eyebrow slot (e.g. SVG icons)', async () => {
    await render(
      <SectionHeader
        eyebrow={<div data-testid="custom-svg-icons">SVG Icons</div>}
        title="Khitan Nyaman, Anak Tenang."
      />,
    );

    await expect.element(page.getByTestId('custom-svg-icons')).toBeVisible();
    await expect.element(page.getByRole('heading', { level: 2, name: /Khitan Nyaman/i })).toBeVisible();
  });

  it('includes data-mask-text when maskAnimation is true (default)', async () => {
    await render(
      <SectionHeader
        eyebrow="Amanah"
        title="Judul Utama"
        description="Deskripsi"
      />,
    );

    const maskElements = document.querySelectorAll('[data-mask-text]');
    expect(maskElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders actionSlot and custom children', async () => {
    await render(
      <SectionHeader
        title="Judul"
        actionSlot={<button type="button">CTA Action</button>}
      >
        <span data-testid="custom-child">Extra Content</span>
      </SectionHeader>,
    );

    await expect.element(page.getByRole('button', { name: 'CTA Action' })).toBeVisible();
    await expect.element(page.getByTestId('custom-child')).toBeVisible();
  });

  it('supports custom headingAs level', async () => {
    await render(
      <SectionHeader
        headingAs="h3"
        title="Sub Header Level 3"
      />,
    );

    await expect.element(page.getByRole('heading', { level: 3, name: 'Sub Header Level 3' })).toBeVisible();
  });

  it('omits data-mask-text when maskAnimation is false', async () => {
    await render(
      <SectionHeader
        maskAnimation={false}
        eyebrow="No Animation Eyebrow"
        title="No Animation Title"
        description="No Animation Description"
      />,
    );

    const maskElements = document.querySelectorAll('[data-mask-text]');
    expect(maskElements.length).toBe(0);
  });
});
