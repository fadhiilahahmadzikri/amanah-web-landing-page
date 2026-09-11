import type { Metadata } from 'next';

export const defaultOgImages = [
  {
    url: '/opengraph-image.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'Klinik Pratama Amanah Healthcare - Klinik Persalinan dan Umum Yogyakarta',
  },
  {
    url: '/assets/images/amanah-pratama-healthcare.png',
    width: 1804,
    height: 872,
    type: 'image/png',
    alt: 'Klinik Pratama Amanah Healthcare Yogyakarta',
  },
];

export const defaultTwitterCard: Metadata['twitter'] = {
  card: 'summary_large_image',
  images: ['/twitter-image.png'],
};
