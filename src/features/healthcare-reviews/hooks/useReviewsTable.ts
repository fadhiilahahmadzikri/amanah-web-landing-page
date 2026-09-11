'use client';

import type {
  ColumnFiltersState,
  FilterFn,
  SortingState,
} from '@tanstack/react-table';
import type { HealthcareReview } from '../types';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export type RatingSortOption = 'default' | 'rating-asc' | 'rating-desc';
export type ResponseFilterOption = 'all' | 'responded' | 'unresponded';
export type PhotosFilterOption = 'all' | 'with-photos' | 'without-photos';

export function matchGlobalQuery(
  review: HealthcareReview,
  filterValue: string,
): boolean {
  if (!filterValue) {
    return true;
  }
  const query = filterValue.toLowerCase().trim();
  const name = (review.author?.name ?? '').toLowerCase();
  const text = (review.text ?? '').toLowerCase();
  const badge = (review.author?.badge ?? '').toLowerCase();

  return name.includes(query) || text.includes(query) || badge.includes(query);
}

export function matchResponseFilter(
  review: HealthcareReview,
  filterValue: ResponseFilterOption,
): boolean {
  if (filterValue === 'all') {
    return true;
  }
  const hasResponse = Boolean(review.ownerResponse);
  return filterValue === 'responded' ? hasResponse : !hasResponse;
}

export function matchPhotosFilter(
  review: HealthcareReview,
  filterValue: PhotosFilterOption,
): boolean {
  if (filterValue === 'all') {
    return true;
  }
  const hasPhotos = (review.photosCount ?? 0) > 0;
  return filterValue === 'with-photos' ? hasPhotos : !hasPhotos;
}

const columnHelper = createColumnHelper<HealthcareReview>();

const globalFilterFn: FilterFn<HealthcareReview> = (
  row,
  _columnId,
  filterValue: string,
) => {
  return matchGlobalQuery(row.original, filterValue);
};

export function useReviewsTable(reviews: HealthcareReview[]) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // State abstractions for clean UI consumption
  const [ratingSort, setRatingSortState] = useState<RatingSortOption>('default');
  const [responseFilter, setResponseFilterState] = useState<ResponseFilterOption>('all');
  const [photosFilter, setPhotosFilterState] = useState<PhotosFilterOption>('all');

  const columns = useMemo(
    () => [
      columnHelper.accessor('rating', {
        id: 'rating',
        header: 'Rating',
      }),
      columnHelper.accessor(row => Boolean(row.ownerResponse), {
        id: 'ownerResponse',
        header: 'Tanggapan',
        filterFn: (row, _id, filterValue: ResponseFilterOption) => {
          return matchResponseFilter(row.original, filterValue);
        },
      }),
      columnHelper.accessor(row => (row.photosCount ?? 0) > 0, {
        id: 'photos',
        header: 'Foto',
        filterFn: (row, _id, filterValue: PhotosFilterOption) => {
          return matchPhotosFilter(row.original, filterValue);
        },
      }),
      columnHelper.accessor(row => row.author.name, {
        id: 'author',
        header: 'Penulis',
      }),
      columnHelper.accessor(row => row.text ?? '', {
        id: 'text',
        header: 'Ulasan',
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: reviews,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const setRatingSort = (option: RatingSortOption) => {
    setRatingSortState(option);
    if (option === 'rating-desc') {
      setSorting([{ id: 'rating', desc: true }]);
    } else if (option === 'rating-asc') {
      setSorting([{ id: 'rating', desc: false }]);
    } else {
      setSorting([]);
    }
  };

  const setResponseFilter = (option: ResponseFilterOption) => {
    setResponseFilterState(option);
    setColumnFilters(prev => {
      const remaining = prev.filter(f => f.id !== 'ownerResponse');
      if (option === 'all') {
        return remaining;
      }
      return [...remaining, { id: 'ownerResponse', value: option }];
    });
  };

  const setPhotosFilter = (option: PhotosFilterOption) => {
    setPhotosFilterState(option);
    setColumnFilters(prev => {
      const remaining = prev.filter(f => f.id !== 'photos');
      if (option === 'all') {
        return remaining;
      }
      return [...remaining, { id: 'photos', value: option }];
    });
  };

  const resetFilters = () => {
    setGlobalFilter('');
    setRatingSortState('default');
    setResponseFilterState('all');
    setPhotosFilterState('all');
    setSorting([]);
    setColumnFilters([]);
  };

  const isFiltered = Boolean(
    globalFilter.trim()
    || ratingSort !== 'default'
    || responseFilter !== 'all'
    || photosFilter !== 'all',
  );

  const rows = table.getRowModel().rows;
  const filteredReviews = useMemo(() => rows.map(r => r.original), [rows]);

  return {
    table,
    reviews: filteredReviews,
    totalCount: reviews.length,
    filteredCount: rows.length,
    isFiltered,
    searchQuery: globalFilter,
    setSearchQuery: setGlobalFilter,
    ratingSort,
    setRatingSort,
    responseFilter,
    setResponseFilter,
    photosFilter,
    setPhotosFilter,
    resetFilters,
  };
}
