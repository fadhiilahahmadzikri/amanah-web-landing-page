import { describe, expect, it } from 'vitest';
import {
  generalPractitionerSection,
  midwiferySection,
  servicesHeroData,
} from './data';

describe('healthcare-services data', () => {
  it('hero data contains correct metadata and 3 highlights', () => {
    expect(servicesHeroData.eyebrow).toBe('LAYANAN');
    expect(servicesHeroData.title).toBe('Layanan Kesehatan untuk Anda dan Keluarga');
    expect(servicesHeroData.highlights).toHaveLength(3);
    expect(servicesHeroData.image.src).toBe('/assets/images/asset_hero_sec_service.jpg');
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
