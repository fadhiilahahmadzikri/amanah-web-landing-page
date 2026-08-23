import { describe, expect, it } from 'vitest';
import {
  getDeckSlot,
  getInitialIndex,
  getOffset,
  getWrappedIndex,
} from './carouselGeometry';

describe('carouselGeometry', () => {
  it('calculates wrapped indices correctly', () => {
    expect(getWrappedIndex(0, 5)).toBe(0);
    expect(getWrappedIndex(4, 5)).toBe(4);
    expect(getWrappedIndex(5, 5)).toBe(0);
    expect(getWrappedIndex(-1, 5)).toBe(4);
    expect(getWrappedIndex(-6, 5)).toBe(4);
    expect(getWrappedIndex(0, 0)).toBe(0);
  });

  it('calculates initial index bounded by item count', () => {
    expect(getInitialIndex(5)).toBe(2);
    expect(getInitialIndex(2)).toBe(1);
    expect(getInitialIndex(1)).toBe(0);
    expect(getInitialIndex(0)).toBe(0);
  });

  it('calculates circular shortest offsets correctly', () => {
    expect(getOffset(2, 2, 5)).toBe(0);
    expect(getOffset(1, 2, 5)).toBe(-1);
    expect(getOffset(3, 2, 5)).toBe(1);
    expect(getOffset(0, 2, 5)).toBe(-2);
    expect(getOffset(4, 2, 5)).toBe(2);
    expect(getOffset(0, 4, 5)).toBe(1);
    expect(getOffset(4, 0, 5)).toBe(-1);
  });

  it('returns slot properties for center, adjacent, and hidden cards', () => {
    const centerSlot = getDeckSlot(2, 2, 5);
    expect(centerSlot.scale).toBe(1);
    expect(centerSlot.zIndex).toBe(30);
    expect(centerSlot.xPercent).toBe(0);
    expect(centerSlot.filter).toBe('blur(0px) brightness(1)');
    expect(centerSlot.pointerEvents).toBe('auto');

    const leftSlot = getDeckSlot(1, 2, 5);
    expect(leftSlot.scale).toBe(0.84);
    expect(leftSlot.zIndex).toBe(20);
    expect(leftSlot.xPercent).toBe(-65);
    expect(leftSlot.filter).toBe('blur(2px) brightness(0.65)');
    expect(leftSlot.pointerEvents).toBe('auto');

    const rightSlot = getDeckSlot(3, 2, 5);
    expect(rightSlot.scale).toBe(0.84);
    expect(rightSlot.zIndex).toBe(20);
    expect(rightSlot.xPercent).toBe(65);
    expect(rightSlot.filter).toBe('blur(2px) brightness(0.65)');
    expect(rightSlot.pointerEvents).toBe('auto');

    const hiddenFarLeft = getDeckSlot(0, 2, 5);
    expect(hiddenFarLeft.opacity).toBe(0);
    expect(hiddenFarLeft.pointerEvents).toBe('none');
    expect(hiddenFarLeft.zIndex).toBe(10);
  });
});
