import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ServiceStickyIndicator } from './ServiceStickyIndicator';

function getElementByTestId(testId: string) {
  const element = document.querySelector<HTMLElement>(`[data-testid="${testId}"]`);
  if (!element) {
    throw new Error(`Missing element with data-testid="${testId}"`);
  }
  return element;
}

function createTouch(target: EventTarget, clientX: number) {
  return new Touch({
    clientX,
    clientY: 0,
    identifier: clientX,
    target,
  });
}

function dispatchSwipe(element: HTMLElement, startX: number, endX: number) {
  element.dispatchEvent(
    new TouchEvent('touchstart', {
      bubbles: true,
      touches: [createTouch(element, startX)],
    }),
  );

  element.dispatchEvent(
    new TouchEvent('touchend', {
      bubbles: true,
      changedTouches: [createTouch(element, endX)],
    }),
  );
}

describe('ServiceStickyIndicator', () => {
  it('renders track at 0% when activeContext is general-practitioner', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="general-practitioner"
        onSelectContext={handleSelect}
      />,
    );

    const track = getElementByTestId('mobile-slot-track');

    expect(track.style.transform).toBe('translateX(0%)');
    expect(getElementByTestId('mobile-slot-midwifery')).toHaveAttribute(
      'aria-hidden',
      'true',
    );

    expect(getElementByTestId('mobile-general-button')).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(document.body.textContent).not.toContain('01');
    expect(document.body.textContent).not.toContain('02');
  });

  it('renders track at -100% when activeContext is midwifery', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="midwifery"
        onSelectContext={handleSelect}
      />,
    );

    const track = getElementByTestId('mobile-slot-track');

    expect(track.style.transform).toBe('translateX(-100%)');
    expect(getElementByTestId('mobile-slot-general')).toHaveAttribute(
      'aria-hidden',
      'true',
    );

    expect(getElementByTestId('mobile-midwifery-button')).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('does not render secondary quick switch buttons on mobile', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="general-practitioner"
        onSelectContext={handleSelect}
      />,
    );

    expect(document.querySelector('[data-testid="mobile-switch-midwifery"]')).toBeNull();
    expect(document.querySelector('[data-testid="mobile-switch-general"]')).toBeNull();
    expect(document.body.textContent).not.toContain('BidanDokter');
  });

  it('calls onSelectContext with midwifery when swiped left', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="general-practitioner"
        onSelectContext={handleSelect}
      />,
    );

    dispatchSwipe(getElementByTestId('mobile-slot-shell'), 200, 120);

    expect(handleSelect).toHaveBeenCalledWith('midwifery');
  });

  it('calls onSelectContext with general-practitioner when swiped right', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="midwifery"
        onSelectContext={handleSelect}
      />,
    );

    dispatchSwipe(getElementByTestId('mobile-slot-shell'), 120, 200);

    expect(handleSelect).toHaveBeenCalledWith('general-practitioner');
  });

  it('calls onSelectContext with midwifery when active general mobile button is clicked', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="general-practitioner"
        onSelectContext={handleSelect}
      />,
    );

    getElementByTestId('mobile-general-button').click();

    expect(handleSelect).toHaveBeenCalledWith('midwifery');
  });

  it('calls onSelectContext with general-practitioner when active midwifery mobile button is clicked', async () => {
    const handleSelect = vi.fn();
    await render(
      <ServiceStickyIndicator
        activeContext="midwifery"
        onSelectContext={handleSelect}
      />,
    );

    getElementByTestId('mobile-midwifery-button').click();

    expect(handleSelect).toHaveBeenCalledWith('general-practitioner');
  });
});
