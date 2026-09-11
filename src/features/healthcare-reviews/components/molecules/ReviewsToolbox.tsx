'use client';

import type {
  PhotosFilterOption,
  RatingSortOption,
  ResponseFilterOption,
} from '../../hooks/useReviewsTable';
import {
  ArrowDownUp,
  Camera,
  MessageCircle,
  RotateCcw,
  Search,
  Star,
  X,
} from 'lucide-react';
import { cn } from '@/utils/Helpers';

type ReviewsToolboxProps = {
  className?: string;
  filteredCount: number;
  isFiltered: boolean;
  onPhotosFilterChange: (option: PhotosFilterOption) => void;
  onRatingSortChange: (option: RatingSortOption) => void;
  onResetFilters: () => void;
  onResponseFilterChange: (option: ResponseFilterOption) => void;
  onSearchChange: (query: string) => void;
  photosFilter: PhotosFilterOption;
  ratingSort: RatingSortOption;
  responseFilter: ResponseFilterOption;
  searchQuery: string;
  totalCount: number;
};

export function ReviewsToolbox({
  className,
  filteredCount,
  isFiltered,
  onPhotosFilterChange,
  onRatingSortChange,
  onResetFilters,
  onResponseFilterChange,
  onSearchChange,
  photosFilter,
  ratingSort,
  responseFilter,
  searchQuery,
  totalCount,
}: ReviewsToolboxProps) {
  return (
    <div
      className={cn(
        `
          w-full rounded-none border border-line bg-card/80 p-3.5
          shadow-xs backdrop-blur-xs
          sm:p-4
          md:p-5
        `,
        className,
      )}
    >
      {/* Top Bar: Search on Left, Filter Controls on Right */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* SISI KIRI: Search Bar Minimalis */}
        <div className="relative flex flex-1 items-center max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Cari pasien, pengalaman, atau kata kunci..."
            className="
              h-10 w-full rounded-none border border-line bg-background/90
              pl-9.5 pr-8 text-xs text-foreground placeholder:text-muted-foreground
              transition-colors
              focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary
              sm:text-sm
            "
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Hapus pencarian"
              className="
                absolute right-2.5 inline-flex size-5 items-center justify-center
                rounded-none text-muted-foreground hover:text-foreground
              "
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* SISI KANAN: Toolbox Filters & Sort Selects */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Rating Sorter */}
          <div className="relative inline-flex items-center">
            <ArrowDownUp
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground"
            />
            <select
              value={ratingSort}
              onChange={e => onRatingSortChange(e.target.value as RatingSortOption)}
              aria-label="Urutkan rating"
              className="
                h-10 appearance-none rounded-none border border-line
                bg-background/90 pl-8 pr-7 text-xs font-medium text-foreground
                transition-colors cursor-pointer
                hover:border-foreground/40
                focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary
                sm:text-xs
              "
            >
              <option value="default">Urutan Default</option>
              <option value="rating-desc">Rating Tertinggi (5 ★)</option>
              <option value="rating-asc">Rating Terendah</option>
            </select>
          </div>

          {/* Tanggapan Klinik Filter */}
          <div className="relative inline-flex items-center">
            <MessageCircle
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground"
            />
            <select
              value={responseFilter}
              onChange={e => onResponseFilterChange(e.target.value as ResponseFilterOption)}
              aria-label="Filter respon klinik"
              className="
                h-10 appearance-none rounded-none border border-line
                bg-background/90 pl-8 pr-7 text-xs font-medium text-foreground
                transition-colors cursor-pointer
                hover:border-foreground/40
                focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary
                sm:text-xs
              "
            >
              <option value="all">Semua Tanggapan</option>
              <option value="responded">Dijawab Klinik</option>
              <option value="unresponded">Belum Dijawab</option>
            </select>
          </div>

          {/* Lampiran Foto Bukti Filter */}
          <div className="relative inline-flex items-center">
            <Camera
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground"
            />
            <select
              value={photosFilter}
              onChange={e => onPhotosFilterChange(e.target.value as PhotosFilterOption)}
              aria-label="Filter foto ulasan"
              className="
                h-10 appearance-none rounded-none border border-line
                bg-background/90 pl-8 pr-7 text-xs font-medium text-foreground
                transition-colors cursor-pointer
                hover:border-foreground/40
                focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary
                sm:text-xs
              "
            >
              <option value="all">Semua Ulasan</option>
              <option value="with-photos">Ada Foto Bukti</option>
              <option value="without-photos">Tanpa Foto</option>
            </select>
          </div>

          {/* Tombol Reset Filter */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="
                inline-flex h-10 items-center gap-1.5 rounded-none border border-line
                bg-muted/60 px-3 text-xs font-medium text-muted-foreground
                transition-colors hover:bg-muted hover:text-foreground
              "
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Info Status Bar: Menampilkan Count & Filter Aktif */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-2.5 text-[11px] text-muted-foreground sm:text-xs">
        <div className="flex items-center gap-2">
          <span>
            Menampilkan
            {' '}
            <strong className="font-semibold text-foreground">{filteredCount}</strong>
            {' '}
            dari
            {' '}
            {totalCount}
            {' '}
            ulasan
          </span>
          {isFiltered && (
            <span className="inline-flex items-center rounded-none bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              Filter Aktif
            </span>
          )}
        </div>

        {/* Quick pill tag indicators */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ratingSort !== 'default' && (
            <span className="inline-flex items-center gap-1 rounded-none border border-line bg-background px-2 py-0.5 text-[10px] text-foreground">
              <Star className="size-2.5 text-amber-500 fill-amber-500" />
              {ratingSort === 'rating-desc' ? 'Rating 5→1' : 'Rating 1→5'}
            </span>
          )}
          {responseFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 rounded-none border border-line bg-background px-2 py-0.5 text-[10px] text-foreground">
              <MessageCircle className="size-2.5 text-amanah-blue" />
              {responseFilter === 'responded' ? 'Dijawab' : 'Belum Dijawab'}
            </span>
          )}
          {photosFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 rounded-none border border-line bg-background px-2 py-0.5 text-[10px] text-foreground">
              <Camera className="size-2.5 text-amanah-mint" />
              {photosFilter === 'with-photos' ? 'Ada Foto' : 'Tanpa Foto'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
