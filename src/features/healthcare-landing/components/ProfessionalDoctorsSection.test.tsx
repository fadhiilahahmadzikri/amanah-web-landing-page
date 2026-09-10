import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { ProfessionalDoctorsSection } from './ProfessionalDoctorsSection';

vi.mock('@gsap/react', () => ({
  useGSAP: () => {},
}));

vi.mock('gsap', () => ({
  default: {
    registerPlugin: () => {},
    timeline: () => ({
      fromTo: () => {},
    }),
    to: () => {},
    fromTo: () => {},
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: function Link({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  },
}));

describe('ProfessionalDoctorsSection', () => {
  it('renders both doctors side-by-side in a 2-column grid', async () => {
    await render(<ProfessionalDoctorsSection />);

    const grid = document.querySelector('.grid-cols-2');
    expect(grid).not.toBeNull();

    const cards = grid?.querySelectorAll('article');
    expect(cards?.length).toBe(2);

    await expect.element(page.getByRole('heading', { level: 3, name: /dr\. Ika Fentiningrum/i })).toBeVisible();
    await expect.element(page.getByRole('heading', { level: 3, name: /Nur Hidayatun/i })).toBeVisible();
  });
});
