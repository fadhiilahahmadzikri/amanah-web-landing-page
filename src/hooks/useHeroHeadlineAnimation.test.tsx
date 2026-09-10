import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import {
  HeroHeadlineWords,
  parseHeadlineWords,
  parseTwoLineHeadline,
  useHeroHeadlineAnimation,
} from './useHeroHeadlineAnimation';

const mockFromTo = vi.fn();
const mockTo = vi.fn();
const mockSet = vi.fn();

vi.mock('gsap', () => ({
  default: {
    set: (...args: unknown[]) => mockSet(...args),
    timeline: () => ({
      fromTo: (...args: unknown[]) => mockFromTo(...args),
      to: (...args: unknown[]) => mockTo(...args),
    }),
  },
}));

describe('parseHeadlineWords', () => {
  it('splits sentence into words', () => {
    const words = parseHeadlineWords('Sehat Lebih Baik,');
    expect(words).toEqual(['Sehat', 'Lebih', 'Baik,']);
  });

  it('handles multiple spaces properly', () => {
    const words = parseHeadlineWords('  Amanah    Healthcare  ');
    expect(words).toEqual(['Amanah', 'Healthcare']);
  });
});

describe('parseTwoLineHeadline', () => {
  it('splits on " dan " when present', () => {
    const res = parseTwoLineHeadline('Sehat Lebih Mudah, Nyaman, dan Terpercaya Bersama Kami.');
    expect(res.line1Words).toEqual(['Sehat', 'Lebih', 'Mudah,', 'Nyaman,']);
    expect(res.line2Words).toEqual(['dan', 'Terpercaya', 'Bersama', 'Kami.']);
  });

  it('splits equally when no " dan " is present', () => {
    const res = parseTwoLineHeadline('Satu Dua Tiga Empat');
    expect(res.line1Words).toEqual(['Satu', 'Dua']);
    expect(res.line2Words).toEqual(['Tiga', 'Empat']);
  });
});

describe('HeroHeadlineWords component', () => {
  it('renders words and registers ref callback', async () => {
    const words = ['Klinik', 'Amanah'];
    const refs: (HTMLSpanElement | null)[] = [];

    await render(
      <div>
        <HeroHeadlineWords
          words={words}
          onRef={(index, el) => {
            refs[index] = el;
          }}
        />
      </div>,
    );

    expect(refs).toHaveLength(2);
    expect(refs[0]?.textContent?.trim()).toBe('Klinik');
    expect(refs[1]?.textContent?.trim()).toBe('Amanah');
  });
});

describe('useHeroHeadlineAnimation', () => {
  function TestHeadline() {
    const headline = useHeroHeadlineAnimation({
      line1Text: 'Line 1',
      line2Text: 'Line 2',
    });

    React.useEffect(() => {
      const tl = {
        fromTo: mockFromTo,
        to: mockTo,
      } as unknown as gsap.core.Timeline;
      headline.addToTimeline(tl, 0);
    }, [headline]);

    return (
      <div>
        <span ref={headline.line1WrapperRef}>
          <HeroHeadlineWords
            words={headline.line1Words}
            onRef={(i, el) => {
              headline.line1WordsRef.current[i] = el;
            }}
          />
        </span>
        <span ref={headline.line2WrapperRef}>
          <HeroHeadlineWords
            words={headline.line2Words}
            onRef={(i, el) => {
              headline.line2WordsRef.current[i] = el;
            }}
          />
        </span>
      </div>
    );
  }

  it('mounts without throwing and sets initial GSAP position', async () => {
    await render(<TestHeadline />);
    expect(mockSet).toHaveBeenCalled();
  });
});
