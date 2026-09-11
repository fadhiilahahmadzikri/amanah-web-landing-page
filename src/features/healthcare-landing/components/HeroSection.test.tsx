import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { HeroSection } from './HeroSection';

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

describe('HeroSection', () => {
  it('renders a mobile-first stack with copy, single image panel, and horizontal metrics rail', async () => {
    await render(<HeroSection />);

    const mobileStack = document.querySelector('[data-hero-mobile-stack]');
    const copy = document.querySelector('[data-hero-copy]');
    const mediaPanel = document.querySelector('[data-hero-media-panel]');
    const metricsRail = document.querySelector('[data-hero-mobile-metrics-rail]');

    expect(mobileStack).not.toBeNull();
    expect(copy).not.toBeNull();
    expect(mediaPanel).not.toBeNull();
    expect(metricsRail).not.toBeNull();
    expect(mobileStack?.children[0]).toBe(copy);
    expect(mobileStack?.children[1]).toBe(mediaPanel);
    expect(mobileStack?.children[2]).toBe(metricsRail);
    expect(mediaPanel).toHaveClass(/opacity-0/);
    expect(metricsRail).toHaveClass(/opacity-0/);
    expect(metricsRail).toHaveClass(/grid-cols-3/);

    await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Klinik Persalinan dan Umum/i,
    );
  });
});
