import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { HeroSection } from './HeroSection';

describe('HeroSection real render debug', () => {
  it('inspects DOM and headline elements after render', async () => {
    await render(<HeroSection />);

    const h1 = document.querySelector('h1');
    console.log('H1 innerHTML:', h1?.innerHTML);

    const spans = h1?.querySelectorAll('span');
    console.log('Total spans in H1:', spans?.length);
    spans?.forEach((s, i) => {
      console.log(`span[${i}]: class="${s.className}" style="${s.style.cssText}" text="${s.textContent}"`);
    });

    await new Promise(resolve => setTimeout(resolve, 2500));

    console.log('--- AFTER 2500ms ---');
    spans?.forEach((s, i) => {
      console.log(`AFTER span[${i}]: opacity=${window.getComputedStyle(s).opacity} transform=${s.style.transform}`);
    });
    expect(h1).not.toBeNull();
  });
});
