import { describe, expect, it } from 'vitest';
import {
  createHealthcareFAQJsonLd,
  getHealthcareFAQItems,
} from './data';

describe('healthcare FAQ data', () => {
  it('returns common and page-specific questions for facilities pages', () => {
    const items = getHealthcareFAQItems('/fasilitas');

    expect(items.some(item => item.id === 'alamat-klinik-amanah')).toBe(true);
    expect(items.some(item => item.id === 'dokter-umum-layanan')).toBe(true);
    expect(items.some(item => item.id === 'layanan-bidan')).toBe(true);
    expect(items.some(item => item.id === 'tentang-komitmen')).toBe(false);
  });

  it('normalizes layanan route to facilities FAQ content', () => {
    const items = getHealthcareFAQItems('/layanan');

    expect(items.some(item => item.id === 'dokter-umum-layanan')).toBe(true);
  });

  it('creates FAQPage structured data from visible questions', () => {
    const items = getHealthcareFAQItems('/kontak');
    const schema = createHealthcareFAQJsonLd({
      activePath: '/kontak',
      items,
      locale: 'en',
    });

    expect(schema['@type']).toBe('FAQPage');
    expect(schema['@id']).toContain('/kontak#faq');
    expect(schema.mainEntity).toHaveLength(items.length);
    expect(schema.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      'acceptedAnswer': {
        '@type': 'Answer',
      },
    });
  });
});
