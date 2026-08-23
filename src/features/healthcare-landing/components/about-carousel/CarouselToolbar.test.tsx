import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { CarouselToolbar } from './CarouselToolbar';

describe('CarouselToolbar', () => {
  it('renders previous/next buttons and indicators for all slides', async () => {
    const handleNext = vi.fn();
    const handlePrevious = vi.fn();
    const handleSelectSlide = vi.fn();

    await render(
      <CarouselToolbar
        currentIndex={2}
        totalSlides={5}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSelectSlide={handleSelectSlide}
      />,
    );

    const prevButton = page.getByRole('button', { name: 'Previous Slide' });
    const nextButton = page.getByRole('button', { name: 'Next Slide' });
    const thirdIndicator = page.getByRole('button', { name: 'Go to slide 3' });

    await expect.element(prevButton).toBeInTheDocument();
    await expect.element(nextButton).toBeInTheDocument();
    await expect.element(thirdIndicator).toBeInTheDocument();

    await prevButton.click();
    expect(handlePrevious).toHaveBeenCalledTimes(1);

    await nextButton.click();
    expect(handleNext).toHaveBeenCalledTimes(1);

    await thirdIndicator.click();
    expect(handleSelectSlide).toHaveBeenCalledWith(2);
  });
});
