import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { StackedBlocksSection } from './StackedBlocksSection';

describe('StackedBlocksSection', () => {
  it('renders section title, 3 header pixel icons, and alternating mobile cards', async () => {
    await render(<StackedBlocksSection />);

    // 1. Heading is rendered
    const heading = page.getByRole('heading', { name: 'Prinsip klinik amanah healthcare' });
    await expect.element(heading).toBeInTheDocument();

    // 2. 3 Header Pixel Icons are present in the DOM
    const headerIcons = document.querySelectorAll('[data-header-icon]');
    expect(headerIcons.length).toBe(3);

    // 3. Mobile Principle Cards are rendered for all 6 principles
    const mobileCards = document.querySelectorAll('[data-mobile-principle]');
    expect(mobileCards.length).toBe(6);

    const expectedTitles = ['Ramah', 'Profesional', 'Cepat', 'Aman', 'Terpercaya', 'Peduli'];

    mobileCards.forEach((card, index) => {
      // Check alternating layout class: even index is flex-row, odd index is flex-row-reverse
      if (index % 2 === 0) {
        expect(card.classList.contains('flex-row')).toBe(true);
      } else {
        expect(card.classList.contains('flex-row-reverse')).toBe(true);
      }

      // Check title is present
      const titleElement = card.querySelector('h3');
      expect(titleElement?.textContent?.trim()).toBe(expectedTitles[index]);
    });
  });
});
