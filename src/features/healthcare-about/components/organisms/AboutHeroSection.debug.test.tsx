import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { AboutHeroSection } from './AboutHeroSection';

describe('AboutHeroSection render debug', () => {
  it('checks AboutHeroSection headline after render', async () => {
    await render(<AboutHeroSection />);

    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    const spans = h1?.querySelectorAll('span');
    console.log('AboutHero Total spans in H1:', spans?.length);

    await new Promise(resolve => setTimeout(resolve, 2500));
    spans?.forEach((s, i) => {
      console.log(`AboutHero AFTER span[${i}]: opacity=${window.getComputedStyle(s).opacity} transform=${s.style.transform}`);
    });
  });
});
