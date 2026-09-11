import type { HealthcareReview } from '../../types';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { ReviewsGrid } from './ReviewsGrid';

vi.mock('@gsap/react', () => ({
  useGSAP: () => {},
}));

vi.mock('gsap', () => ({
  default: {
    fromTo: () => {},
    registerPlugin: () => {},
    set: () => {},
    timeline: () => ({
      fromTo: () => {},
    }),
    to: () => {},
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    batch: () => {},
  },
}));

const mockReviews: HealthcareReview[] = [
  {
    author: {
      avatar: {
        alt: 'Foto profil Siti',
        caption: 'Reviewer Google Maps',
        id: '1-avatar',
        src: 'https://example.com/avatar1.jpg',
        title: 'Siti Rahma',
      },
      badge: 'Local Guide',
      initials: 'SR',
      name: 'Siti Rahma',
      url: 'https://maps.google.com/?cid=1',
    },
    id: 'rev-1',
    index: 1,
    likes: 3,
    ownerResponse: {
      date: '2 minggu lalu',
      text: 'Terima kasih atas kunjungannya, Bu Siti.',
    },
    photos: [
      {
        alt: 'Foto ulasan 1',
        caption: 'Ruang tunggu',
        id: 'rev-1-photo-1',
        src: 'https://example.com/photo1.jpg',
        title: 'Ruang tunggu',
      },
    ],
    photosCount: 1,
    rating: 5,
    raw: {} as any,
    relativeDate: '1 bulan lalu',
    text: 'Pelayanan ramah dan dokternya sangat komunikatif.',
  },
  {
    author: {
      avatar: {
        alt: 'Foto profil Budi',
        caption: 'Reviewer Google Maps',
        id: '2-avatar',
        src: 'https://example.com/avatar2.jpg',
        title: 'Budi Santoso',
      },
      badge: null,
      initials: 'BS',
      name: 'Budi Santoso',
      url: 'https://maps.google.com/?cid=2',
    },
    id: 'rev-2',
    index: 2,
    likes: 0,
    ownerResponse: null,
    photos: [],
    photosCount: 0,
    rating: 5,
    raw: {} as any,
    relativeDate: '2 bulan lalu',
    text: 'Klinik bersih dan nyaman untuk keluarga.',
  },
];

describe('ReviewsGrid', () => {
  it('renders hero section with SectionHeader, mask-text, pixel background, and review cards', async () => {
    const handleImageOpen = vi.fn();

    await render(
      <ReviewsGrid
        reviews={mockReviews}
        onImageOpen={handleImageOpen}
      />,
    );

    // 1. Pixel background is rendered
    const pixelBg = document.querySelector('[data-pixel-background]');

    expect(pixelBg).not.toBeNull();

    // 2. SectionHeader is rendered with mask text attributes
    const header = document.querySelector('[data-reviews-reveal]');

    expect(header).not.toBeNull();

    const maskLines = document.querySelectorAll('[data-mask-text]');

    expect(maskLines.length).toBeGreaterThanOrEqual(3);

    // 3. Eyebrow, heading, and description are in the document
    await expect.element(page.getByText('Ulasan Pasien')).toBeInTheDocument();
    await expect.element(page.getByRole('heading', { level: 1, name: /Mereka yang Telah Mempercayai Klinik Pratama Amanah Healthcare/i })).toBeInTheDocument();

    // 4. Review cards are rendered in grid
    const cardsGrid = document.querySelector('[data-reviews-grid]');

    expect(cardsGrid).not.toBeNull();

    const reviewCards = document.querySelectorAll('[data-review-card]');

    expect(reviewCards.length).toBe(2);

    // 5. Check content of first card
    await expect.element(page.getByText('Siti Rahma', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pelayanan ramah dan dokternya sangat komunikatif.')).toBeInTheDocument();

    // 6. Check interaction with Detail button to open dialog
    const detailButton = page.getByRole('button', { name: /Buka detail ulasan dari Siti Rahma/i });
    await detailButton.click();

    // Dialog should open
    await expect.element(page.getByText('Respons Klinik Amanah')).toBeInTheDocument();
  });
});
