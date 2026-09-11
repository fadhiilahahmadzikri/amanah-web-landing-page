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
          w-full rounded-none border border-line bg-card/80 p-3.5
          shadow-xs backdrop-blur-xs
          sm:p-4
          md:p-5
        `,
        className,
      )}
    >
      {/* Top Bar: Search on Left, Shadcn Select Controls on Right */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* SISI KIRI: Search Bar Minimalis dengan Shadcn Input */}
        <div className="relative flex flex-1 items-center max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
          />
          <Input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Cari pasien, pengalaman, atau kata kunci..."
            className="pl-9.5 pr-8"
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

        {/* SISI KANAN: Shadcn UI Native Selects & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Rating Sorter */}
          <Select
            value={ratingSort}
            onValueChange={val => onRatingSortChange(val as RatingSortOption)}
          >
            <SelectTrigger aria-label="Urutkan rating" className="w-[185px]">
              <div className="flex items-center gap-2 truncate">
                <ArrowDownUp className="size-3.5 text-muted-foreground" />
                <SelectValue placeholder="Urutkan Rating" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Urutan Default</SelectItem>
              <SelectItem value="rating-desc">Rating Tertinggi (5 ★)</SelectItem>
              <SelectItem value="rating-asc">Rating Terendah</SelectItem>
            </SelectContent>
          </Select>

          {/* Tanggapan Klinik Filter */}
          <Select
            value={responseFilter}
            onValueChange={val => onResponseFilterChange(val as ResponseFilterOption)}
          >
            <SelectTrigger aria-label="Filter respon klinik" className="w-[175px]">
              <div className="flex items-center gap-2 truncate">
                <MessageCircle className="size-3.5 text-muted-foreground" />
                <SelectValue placeholder="Tanggapan Klinik" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tanggapan</SelectItem>
              <SelectItem value="responded">Dijawab Klinik</SelectItem>
              <SelectItem value="unresponded">Belum Dijawab</SelectItem>
            </SelectContent>
          </Select>

          {/* Lampiran Foto Bukti Filter */}
          <Select
            value={photosFilter}
            onValueChange={val => onPhotosFilterChange(val as PhotosFilterOption)}
          >
            <SelectTrigger aria-label="Filter foto ulasan" className="w-[160px]">
              <div className="flex items-center gap-2 truncate">
                <Camera className="size-3.5 text-muted-foreground" />
                <SelectValue placeholder="Foto Bukti" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Ulasan</SelectItem>
              <SelectItem value="with-photos">Ada Foto Bukti</SelectItem>
              <SelectItem value="without-photos">Tanpa Foto</SelectItem>
            </SelectContent>
          </Select>

          {/* Tombol Reset Filter via Shadcn Button */}
          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onResetFilters}
              className="h-10 rounded-none border-line text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
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
