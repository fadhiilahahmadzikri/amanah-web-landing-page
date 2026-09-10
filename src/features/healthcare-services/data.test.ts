import { describe, expect, it } from 'vitest';
import {
  facilitiesSectionData,
  generalPractitionerSection,
  midwiferySection,
  servicesHeroData,
} from './data';

describe('healthcare-services data', () => {
  it('hero data contains correct metadata and 3 highlights', () => {
    expect(servicesHeroData.eyebrow).toBe('Fasilitas & Layanan');
    expect(servicesHeroData.title).toBe('Mendukung Kesehatan Anda Sepenuhnya');
    expect(servicesHeroData.highlights).toHaveLength(3);
    expect(servicesHeroData.image.src).toBe('/assets/images/asset_hero_sec_service.jpg');
  });

  it('facilities section data contains correct metadata and 4 facility items', () => {
    expect(facilitiesSectionData.eyebrow).toBe('Fasilitas');
    expect(facilitiesSectionData.title).toBe('Ruang Nyaman untuk Anda dan Keluarga');
    expect(facilitiesSectionData.items).toHaveLength(4);
    expect(facilitiesSectionData.items[0]?.title).toBe('Apotek');
    expect(facilitiesSectionData.items[1]?.title).toBe('Ruang Persalinan 24 Jam');
    expect(facilitiesSectionData.items[2]?.title).toBe('Ruang Tunggu Nyaman');
    expect(facilitiesSectionData.items[3]?.title).toBe('Baby Care Center');
    expect(facilitiesSectionData.items.some(item => item.title.includes('USG'))).toBe(false);
  });

  it('general practitioner section contains 9 bento service cards', () => {
    expect(generalPractitionerSection.id).toBe('pelayanan-umum');
    expect(generalPractitionerSection.contextKey).toBe('general-practitioner');
    expect(generalPractitionerSection.indicatorLabel).toBe('Dokter umum');
    expect(generalPractitionerSection.layout).toBe('bento-left');
    expect(generalPractitionerSection.services).toHaveLength(9);
  });

  it('midwifery section contains 8 bento service cards', () => {
    expect(midwiferySection.id).toBe('layanan-ibu-dan-anak');
    expect(midwiferySection.contextKey).toBe('midwifery');
    expect(midwiferySection.indicatorLabel).toBe('Bidan');
    expect(midwiferySection.layout).toBe('bento-right');
    expect(midwiferySection.services).toHaveLength(8);
  });
});
