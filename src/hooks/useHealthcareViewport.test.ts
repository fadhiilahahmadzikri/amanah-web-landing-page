import { describe, expect, it } from 'vitest';
import { getHealthcareViewportRange } from './useHealthcareViewport';

describe('getHealthcareViewportRange', () => {
  it.each([
    [320, 'compactMobile'],
    [444, 'mobile'],
    [640, 'largeMobile'],
    [768, 'tablet'],
    [1024, 'desktop'],
  ] as const)('maps %ipx to %s', (width, range) => {
    expect(getHealthcareViewportRange(width)).toBe(range);
  });
});
