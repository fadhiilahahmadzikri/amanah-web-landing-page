import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const globalCss = readFileSync('src/styles/global.css', 'utf8');

function getRootTypographyToken(tokenName: string) {
  const rootBlock = globalCss.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const tokenMatch = rootBlock.match(new RegExp(`${tokenName}:\\s*([^;]+);`));

  return tokenMatch?.[1]?.trim();
}

describe('healthcare typography tokens', () => {
  it('keeps phone hero typography compact enough for long script headlines', () => {
    expect(getRootTypographyToken('--amanah-type-hero')).toBe('2.25rem');
    expect(getRootTypographyToken('--amanah-type-script-hero')).toBe('2.625rem');
  });
});
