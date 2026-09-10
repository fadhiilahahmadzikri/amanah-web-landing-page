import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { PixelIcon } from './PixelIcon';
import { getPixelIcon, pixelIconNames } from './pixelIconData';

describe('PixelIcon', () => {
  it('loads catalog dataset with 132 icons', () => {
    expect(pixelIconNames.length).toBe(132);
    expect(getPixelIcon('sakura')).toBeDefined();
    expect(getPixelIcon('p3k')).toBeDefined();
    expect(getPixelIcon('beaker')).toBeDefined();
  });

  it('renders raw crisp SVG with authentic pixel colors', async () => {
    await render(
      <PixelIcon name="sakura" size={48} />,
    );

    const svg = document.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('48');
    expect(svg?.getAttribute('shape-rendering')).toBe('crispEdges');
    // Ensure rects exist inside svg
    const rects = svg?.querySelectorAll('rect');
    expect(rects && rects.length > 0).toBe(true);
  });

  it('renders with badge wrapper variant when withWrapper is true', async () => {
    await render(
      <PixelIcon
        name="bunga-matahari"
        size={32}
        withWrapper={true}
        wrapperVariant="badge"
        wrapperClassName="custom-wrapper"
      />,
    );

    const wrapper = document.querySelector('.custom-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.classList.contains('rounded-xl')).toBe(true);
  });

  it('renders with card wrapper variant', async () => {
    await render(
      <PixelIcon
        name="mawar"
        withWrapper={true}
        wrapperVariant="card"
      />,
    );

    const wrapper = document.querySelector('.rounded-2xl');
    expect(wrapper).not.toBeNull();
  });

  it('supports accessible title and aria-label', async () => {
    await render(
      <PixelIcon
        name="p3k"
        title="Kotak P3K Medis"
      />,
    );

    await expect.element(page.getByLabelText('Kotak P3K Medis')).toBeVisible();
  });

  it('supports responsive sizing when size is "responsive"', async () => {
    await render(
      <PixelIcon name="sakura" size="responsive" svgClassName="size-10 md:size-8" />,
    );

    const svg = document.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBeNull();
    expect(svg?.getAttribute('height')).toBeNull();
    expect(svg?.classList.contains('size-10')).toBe(true);
  });

  it('renders fallback when name is invalid', async () => {
    await render(
      // @ts-expect-error test invalid icon name
      <PixelIcon name="unknown-icon" fallback={<span data-testid="fallback">N/A</span>} />,
    );

    await expect.element(page.getByTestId('fallback')).toBeVisible();
  });
});
