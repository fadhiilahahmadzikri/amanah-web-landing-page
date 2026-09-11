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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
          w-full rounded-none border border-line bg-card/80 p-3
          shadow-xs backdrop-blur-xs
          sm:p-4
          md:p-5
        `,
        className,
      )}
    >
      {/* Search Bar (Fluid on mobile, fixed on desktop) & Filters (Icon-based on mobile, Hug text on desktop) */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        {/* SISI KIRI / BARIS 1 (Mobile): Search Bar Fluid */}
        <div className="relative w-full md:w-80 md:shrink-0">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
          />
          <Input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Cari ulasan, nama pasien, kata kunci..."
            className="h-10 w-full pl-9.5 pr-8 text-xs sm:text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Hapus pencarian"
              className="
                absolute right-2.5 inline-flex size-5 items-center justify-center
                cursor-pointer text-muted-foreground hover:text-foreground
              "
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* SISI KANAN / BARIS 2 (Mobile): Tombol Filter Murni Berbasis Ikon di Mobile, Hug di Web */}
        <div className="flex items-center gap-2 md:flex-wrap md:gap-2.5">
          {/* 1. Rating Sorter */}
          <Select
            value={ratingSort}
            onValueChange={val => onRatingSortChange(val as RatingSortOption)}
          >
            <SelectTrigger
              aria-label="Urutkan rating"
              title="Urutkan Rating"
              className={cn(
                `
                  relative size-10 shrink-0 p-0 justify-center
                  [&>[data-slot=select-icon]]:hidden
                  md:h-10 md:w-auto md:min-w-fit md:px-3 md:py-2 md:justify-between
                  md:[&>[data-slot=select-icon]]:inline-flex md:[&>[data-slot=select-icon]]:ml-2
                  cursor-pointer whitespace-nowrap
                `,
                ratingSort !== 'default'
                  && 'border-primary bg-primary/10 text-primary font-semibold',
              )}
            >
              <div className="flex items-center gap-2">
                <ArrowDownUp className="size-4 shrink-0" />
                <span className="hidden md:inline">
                  <SelectValue placeholder="Urutkan Rating" />
                </span>
              </div>
              {ratingSort !== 'default' && (
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary md:hidden"
                />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Urutan Default</SelectItem>
              <SelectItem value="rating-desc">Rating Tertinggi (5 ★)</SelectItem>
              <SelectItem value="rating-asc">Rating Terendah</SelectItem>
            </SelectContent>
          </Select>

          {/* 2. Tanggapan Klinik Filter */}
          <Select
            value={responseFilter}
            onValueChange={val => onResponseFilterChange(val as ResponseFilterOption)}
          >
            <SelectTrigger
              aria-label="Filter respon klinik"
              title="Tanggapan Klinik"
              className={cn(
                `
                  relative size-10 shrink-0 p-0 justify-center
                  [&>[data-slot=select-icon]]:hidden
                  md:h-10 md:w-auto md:min-w-fit md:px-3 md:py-2 md:justify-between
                  md:[&>[data-slot=select-icon]]:inline-flex md:[&>[data-slot=select-icon]]:ml-2
                  cursor-pointer whitespace-nowrap
                `,
                responseFilter !== 'all'
                  && 'border-primary bg-primary/10 text-primary font-semibold',
              )}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="size-4 shrink-0" />
                <span className="hidden md:inline">
                  <SelectValue placeholder="Tanggapan Klinik" />
                </span>
              </div>
              {responseFilter !== 'all' && (
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary md:hidden"
                />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tanggapan</SelectItem>
              <SelectItem value="responded">Dijawab Klinik</SelectItem>
              <SelectItem value="unresponded">Belum Dijawab</SelectItem>
            </SelectContent>
          </Select>

          {/* 3. Lampiran Foto Bukti Filter */}
          <Select
            value={photosFilter}
            onValueChange={val => onPhotosFilterChange(val as PhotosFilterOption)}
          >
            <SelectTrigger
              aria-label="Filter foto bukti ulasan"
              title="Foto Bukti Ulasan"
              className={cn(
                `
                  relative size-10 shrink-0 p-0 justify-center
                  [&>[data-slot=select-icon]]:hidden
                  md:h-10 md:w-auto md:min-w-fit md:px-3 md:py-2 md:justify-between
                  md:[&>[data-slot=select-icon]]:inline-flex md:[&>[data-slot=select-icon]]:ml-2
                  cursor-pointer whitespace-nowrap
                `,
                photosFilter !== 'all'
                  && 'border-primary bg-primary/10 text-primary font-semibold',
              )}
            >
              <div className="flex items-center gap-2">
                <Camera className="size-4 shrink-0" />
                <span className="hidden md:inline">
                  <SelectValue placeholder="Foto Bukti" />
                </span>
              </div>
              {photosFilter !== 'all' && (
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary md:hidden"
                />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Ulasan</SelectItem>
              <SelectItem value="with-photos">Ada Foto Bukti</SelectItem>
              <SelectItem value="without-photos">Tanpa Foto</SelectItem>
            </SelectContent>
          </Select>

          {/* 4. Tombol Reset Filter */}
          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              aria-label="Reset semua filter"
              title="Reset Semua Filter"
              onClick={onResetFilters}
              className="
                size-10 shrink-0 p-0 rounded-none border-line text-xs font-medium cursor-pointer
                hover:bg-muted md:h-10 md:w-auto md:px-3 md:py-2 md:gap-1.5
              "
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden md:inline">Reset</span>
            </Button>
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
