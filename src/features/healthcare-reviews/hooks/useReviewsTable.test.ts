import type { HealthcareReview } from '../types';
import { describe, expect, it } from 'vitest';
import {
  matchGlobalQuery,
  matchPhotosFilter,
  matchResponseFilter,
} from './useReviewsTable';

const mockReviews: HealthcareReview[] = [
  {
    id: 'rev-1',
    index: 0,
    rating: 5,
    text: 'Pelayanan dokter dan bidan sangat ramah sekali',
    relativeDate: 'sebulan lalu',
    likes: 2,
    photosCount: 2,
    photos: [{ id: 'p1', src: '/p1.jpg', alt: 'img1', caption: 'c1', title: 't1' }],
    ownerResponse: {
      date: 'sebulan lalu',
      text: 'Terima kasih atas kepercayaannya!',
    },
    author: {
      name: 'Anida Okta',
      initials: 'AO',
      badge: 'Local Guide',
      url: 'https://example.com/ao',
      avatar: { id: 'a1', src: '/a1.jpg', alt: 'avatar', caption: '', title: '' },
    },
    raw: {} as any,
  },
  {
    id: 'rev-2',
    index: 1,
    rating: 3,
    text: 'Cukup baik tapi antrian agak ramai',
    relativeDate: '2 bulan lalu',
    likes: 0,
    photosCount: 0,
    photos: [],
    ownerResponse: null,
    author: {
      name: 'Budi Santoso',
      initials: 'BS',
      badge: null,
      url: 'https://example.com/bs',
      avatar: { id: 'a2', src: '/a2.jpg', alt: 'avatar', caption: '', title: '' },
    },
    raw: {} as any,
  },
  {
    id: 'rev-3',
    index: 2,
    rating: 4,
    text: 'USG kehamilan sangat jelas dan terjangkau',
    relativeDate: '3 bulan lalu',
    likes: 1,
    photosCount: 1,
    photos: [{ id: 'p3', src: '/p3.jpg', alt: 'img3', caption: 'c3', title: 't3' }],
    ownerResponse: null,
    author: {
      name: 'Citra Kirana',
      initials: 'CK',
      badge: 'Local Guide',
      url: 'https://example.com/ck',
      avatar: { id: 'a3', src: '/a3.jpg', alt: 'avatar', caption: '', title: '' },
    },
    raw: {} as any,
  },
];

describe('useReviewsTable logic', () => {
  describe('matchGlobalQuery', () => {
    it('returns true when query is empty', () => {
      expect(matchGlobalQuery(mockReviews[0]!, '')).toBe(true);
    });

    it('matches author name case-insensitively', () => {
      expect(matchGlobalQuery(mockReviews[0]!, 'anida')).toBe(true);
      expect(matchGlobalQuery(mockReviews[1]!, 'anida')).toBe(false);
    });

    it('matches review text', () => {
      expect(matchGlobalQuery(mockReviews[2]!, 'USG')).toBe(true);
      expect(matchGlobalQuery(mockReviews[0]!, 'USG')).toBe(false);
    });

    it('matches author badge', () => {
      expect(matchGlobalQuery(mockReviews[0]!, 'Local Guide')).toBe(true);
      expect(matchGlobalQuery(mockReviews[1]!, 'Local Guide')).toBe(false);
    });
  });

  describe('matchResponseFilter', () => {
    it('returns true for "all"', () => {
      expect(matchResponseFilter(mockReviews[0]!, 'all')).toBe(true);
      expect(matchResponseFilter(mockReviews[1]!, 'all')).toBe(true);
    });

    it('correctly filters "responded"', () => {
      expect(matchResponseFilter(mockReviews[0]!, 'responded')).toBe(true);
      expect(matchResponseFilter(mockReviews[1]!, 'responded')).toBe(false);
    });

    it('correctly filters "unresponded"', () => {
      expect(matchResponseFilter(mockReviews[0]!, 'unresponded')).toBe(false);
      expect(matchResponseFilter(mockReviews[1]!, 'unresponded')).toBe(true);
    });
  });

  describe('matchPhotosFilter', () => {
    it('returns true for "all"', () => {
      expect(matchPhotosFilter(mockReviews[0]!, 'all')).toBe(true);
      expect(matchPhotosFilter(mockReviews[1]!, 'all')).toBe(true);
    });

    it('correctly filters "with-photos"', () => {
      expect(matchPhotosFilter(mockReviews[0]!, 'with-photos')).toBe(true);
      expect(matchPhotosFilter(mockReviews[1]!, 'with-photos')).toBe(false);
    });

    it('correctly filters "without-photos"', () => {
      expect(matchPhotosFilter(mockReviews[0]!, 'without-photos')).toBe(false);
      expect(matchPhotosFilter(mockReviews[1]!, 'without-photos')).toBe(true);
    });
  });
});
