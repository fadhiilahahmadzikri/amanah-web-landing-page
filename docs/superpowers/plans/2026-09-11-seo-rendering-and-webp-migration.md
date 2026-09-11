# Rendering-Level SEO Hardening & Zero-Degradation WebP Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Klinik Amanah Healthcare web application into a search-engine-optimized, high-performance platform by implementing a zero-runtime-overhead WebP asset pipeline with reference rewiring, complete Metadata API coverage, dynamic sitemap and robots, MedicalClinic Schema.org structured data, and Core Web Vitals optimizations.

**Architecture:** 
1. Build a reusable, agnostic TypeScript CLI tool (`scripts/tools/image-pipeline.ts`) using `sharp` supporting single file, multi-file, directory, watch mode, reference rewiring across `src/`, and dry-run safety gates.
2. Execute lossless/near-lossless WebP conversion for all ~44 raster assets under `public/assets/images/`, rewiring all references across TypeScript data files, components, and tests (`data.test.ts`).
3. Harden Next.js App Router SEO: complete `metadataBase`, global metadata, per-route `generateMetadata` with canonicals, dynamic `sitemap.ts` (all 7 marketing routes × locales), hardened `robots.ts`, Schema.org `MedicalClinic` JSON-LD, and Next.js Image Optimization config (`formats: ['image/avif', 'image/webp']`).
4. Validate with strict verification gate (`bun run check:types`, `bun run test --project unit`, `bun run build:next`), then safely prune obsolete rasters.

**Tech Stack:** Next.js 16.2.9 (Turbopack, App Router, SSG), React 19, TypeScript 6, Sharp 0.34.5, Bun 1.3.14, Schema.org JSON-LD.

**Spec:** User Directive: "Next.js SEO Rendering & Zero-Degradation WebP Migration — Agent Directive".

## Global Constraints

- Never convert or alter `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, or `apple-touch-icon.png`.
- Never convert SVGs in `public/assets/svg/` to rasters.
- Never delete source raster files until all references are rewired and `bun run build:next` succeeds with exit code 0.
- Preserve alpha transparency, dimensions, and visual fidelity on all images without aggressive downscaling.
- Keep "Server Trunk, Client Leaf" architecture; all marketing routes remain SSG (`●`).
- Use `bun` as the package manager and runtime runner.
- Maintain atomic design token hierarchy, strict typing, and zero lint/type errors.

---

## File Structure

```
amanahlandingpage/
├── scripts/
│   └── tools/
│       └── image-pipeline.ts                        # Reusable CLI image conversion & reference rewiring tool
├── public/
│   └── assets/
│       └── images/                                  # Converted .webp files alongside originals until gate
├── src/
│   ├── app/
│   │   ├── robots.ts                                # Hardened dynamic robots configuration
│   │   ├── sitemap.ts                               # Dynamic sitemap with all marketing routes & hreflang
│   │   └── [locale]/
│   │       ├── layout.tsx                           # Global metadataBase, title template, OG, Twitter, canonical
│   │       └── (marketing)/
│   │           ├── page.tsx                         # Home metadata & canonical
│   │           ├── tentang-kami/page.tsx            # About metadata & canonical
│   │           ├── layanan/page.tsx                 # Services metadata & canonical
│   │           ├── fasilitas/page.tsx               # Facilities metadata & canonical
│   │           ├── testimoni/page.tsx               # Testimonials metadata & canonical
│   │           ├── ulasan/page.tsx                  # Reviews metadata & canonical
│   │           └── kontak/page.tsx                  # Contact metadata & canonical
│   ├── components/
│   │   └── healthcare/
│   │       ├── MedicalClinicJsonLd.tsx              # Top-level Schema.org MedicalClinic structured data
│   │       └── index.ts                             # Export MedicalClinicJsonLd
│   ├── features/
│   │   ├── healthcare-about/data.ts                 # Rewired image paths
│   │   ├── healthcare-about/components/...          # Rewired image paths
│   │   ├── healthcare-landing/data.ts               # Rewired image paths
│   │   ├── healthcare-landing/components/...        # Rewired image paths & LCP priority
│   │   ├── healthcare-services/data.ts              # Rewired image paths
│   │   ├── healthcare-services/data.test.ts         # Updated test expectations for .webp
│   │   ├── healthcare-testimonials/data.ts          # Rewired video poster paths
│   │   └── ui/gallery-hover-carousel.tsx            # Rewired image paths
└── next.config.ts                                   # Image optimization formats config
```

---

### Task 1: Agnostic Image Pipeline CLI Tool

**Files:**
- Create: `scripts/tools/image-pipeline.ts`

**Interfaces:**
- Consumes: `sharp`, `node:fs`, `node:path`, `node:util`
- Produces: CLI script executed via `bun scripts/tools/image-pipeline.ts` with options:
  - `--file <path>`: Convert a single image
  - `--files <path1,path2...>`: Convert multiple images
  - `--dir <directory>`: Recursively convert all rasters in directory
  - `--watch`: Watch directory for new/modified rasters
  - `--replace-refs`: Scan and replace image paths in `src/` to `.webp`
  - `--dry-run`: Preview actions without mutating files
  - `--clean-source`: Prune source rasters after confirmation
  - `--quality <number>`: WebP quality setting (default 88)

- [ ] **Step 1: Write `scripts/tools/image-pipeline.ts`**
  Implement the pipeline with:
  - Exclusion list: `favicon.ico`, `apple-touch-icon.png`, `favicon-16x16.png`, `favicon-32x32.png`, `.svg`.
  - Smart decision matrix:
    - Transparent PNGs: `sharp.webp({ lossless: true, effort: 6 })` or `sharp.webp({ quality: 90, effort: 6, alphaQuality: 100 })` preserving full alpha.
    - JPG / Continuous tone: `sharp.webp({ quality: 88, effort: 6, smartSubsample: true })`.
  - Dimension preservation (no downscaling unless flagged).
  - ICC profile and metadata retention (`withMetadata()`).
  - Reference scanner using regex across `.ts`, `.tsx`, `.css`, `.json`, `.md`.
  - Detailed report generator (original bytes, new bytes, bytes saved, % reduction).

- [ ] **Step 2: Test script with dry-run on a single file**
  Run: `bun scripts/tools/image-pipeline.ts --file public/assets/images/asset_kb.jpg --dry-run`
  Expected: Outputs conversion preview, size comparison, and reference match count without creating files.

- [ ] **Step 3: Test single file conversion without reference rewrite**
  Run: `bun scripts/tools/image-pipeline.ts --file public/assets/images/asset_kb.jpg`
  Expected: Generates `public/assets/images/asset_kb.webp` cleanly with smaller size and valid format.

- [ ] **Step 4: Verify generated WebP integrity using sharp**
  Run: `bun -e "const s = require('sharp')('public/assets/images/asset_kb.webp'); s.metadata().then(console.log);"`
  Expected: Valid metadata: format 'webp', matching original width & height.

- [ ] **Step 5: Clean up single test file**
  Run: `rm public/assets/images/asset_kb.webp`

- [ ] **Step 6: Commit pipeline tool**
  ```bash
  git add scripts/tools/image-pipeline.ts
  git commit -m "feat(tools): add reusable agnostic webp image pipeline and reference rewiring tool"
  ```

---

### Task 2: Execute WebP Migration on Active Image Assets & Rewire References

**Files:**
- Converted Assets: `public/assets/images/**/*.webp`
- Rewired Code:
  - `src/features/healthcare-about/data.ts`
  - `src/features/healthcare-about/components/organisms/StackedBlocksSection.tsx`
  - `src/features/healthcare-landing/data.ts`
  - `src/features/healthcare-landing/components/ProfessionalDoctorsSection.tsx`
  - `src/features/healthcare-services/data.ts`
  - `src/features/healthcare-services/data.test.ts`
  - `src/features/healthcare-testimonials/data.ts`
  - `src/components/ui/gallery-hover-carousel.tsx`
  - `src/components/healthcare/data.ts`

**Interfaces:**
- Consumes: `scripts/tools/image-pipeline.ts`, raster assets in `public/assets/images/`
- Produces: WebP versions of all ~44 active images, updated references throughout `src/`

- [ ] **Step 1: Run image pipeline in dry-run with reference replacement preview**
  Run: `bun scripts/tools/image-pipeline.ts --dir public/assets/images --replace-refs --dry-run`
  Expected: Lists all 44 converted files and every occurrence in `src/` to be rewired.

- [ ] **Step 2: Run image pipeline to generate WebP files and rewrite references**
  Run: `bun scripts/tools/image-pipeline.ts --dir public/assets/images --replace-refs`
  Expected:
  - All `.jpg`, `.jpeg`, `.png` in `public/assets/images/` (and subfolders `about-blocks`, `dokumentasi`) have sibling `.webp` files.
  - All references in `src/` updated to `.webp`.
  - Exclusions verified: `apple-touch-icon.png`, `favicon-*.png`, `favicon.ico`, `svg/*` remained untouched.

- [ ] **Step 3: Update `src/features/healthcare-services/data.test.ts`**
  Ensure test expectation matches `.webp`:
  ```ts
  expect(servicesHeroData.image.src).toBe('/assets/images/asset_hero_sec_service.webp');
  ```

- [ ] **Step 4: Run unit tests and type checks**
  Run: `bun run test --project unit`
  Run: `bun run check:types`
  Expected: All unit tests pass, zero TypeScript errors.

- [ ] **Step 5: Verify with Next.js build**
  Run: `bun run build:next`
  Expected: Build succeeds with exit code 0.

- [ ] **Step 6: Commit WebP migration and rewired references (keeping original rasters intact)**
  ```bash
  git add public/assets/images src/
  git commit -m "feat(assets): migrate active raster images to webp and rewire codebase references"
  ```

---

### Task 3: Next.js Configuration & Rendering SEO Hardening

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: Next.js Metadata API, `next-intl` routing, `getBaseUrl()`
- Produces:
  - Next.js image optimization configured with `['image/avif', 'image/webp']`
  - Root metadataBase, title template, canonical, openGraph, twitter, and robots directives
  - Dynamic `sitemap.ts` encompassing all 7 marketing routes with multi-locale alternates
  - Hardened `robots.ts`

- [ ] **Step 1: Configure `next.config.ts` image formats**
  Add `formats: ['image/avif', 'image/webp']` to `baseConfig.images`:
  ```ts
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [ ... ],
  }
  ```

- [ ] **Step 2: Harden `src/app/robots.ts`**
  Update `robots.ts` to provide complete crawling rules:
  ```ts
  import type { MetadataRoute } from 'next';
  import { getBaseUrl } from '@/utils/Helpers';

  export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseUrl();
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/dashboard/', '/monitoring/', '/api/'],
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl,
    };
  }
  ```

- [ ] **Step 3: Dynamically expand `src/app/sitemap.ts`**
  Update `sitemap.ts` to include all 7 canonical marketing routes across all locales with change frequencies and priorities:
  ```ts
  import type { MetadataRoute } from 'next';
  import { routing } from '@/libs/I18nRouting';
  import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

  const marketingRoutes: Array<{
    path: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }> = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/tentang-kami', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/layanan', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/fasilitas', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/testimoni', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/ulasan', changeFrequency: 'daily', priority: 0.9 },
    { path: '/kontak', changeFrequency: 'monthly', priority: 0.8 },
  ];

  export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getBaseUrl();

    return marketingRoutes.flatMap(route =>
      routing.locales.map(locale => ({
        url: `${baseUrl}${getI18nPath(route.path, locale)}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: locale === routing.defaultLocale ? route.priority : route.priority * 0.9,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(l => [l, `${baseUrl}${getI18nPath(route.path, l)}`]),
          ),
        },
      })),
    );
  }
  ```

- [ ] **Step 4: Configure comprehensive Root Metadata in `src/app/[locale]/layout.tsx`**
  Configure `metadataBase: new URL(getBaseUrl())`, title template, description, keywords, OpenGraph with PNG fallback for social scraper compatibility, Twitter card, robots rules, and alternate languages.

- [ ] **Step 5: Run type checks and build to verify SEO routes**
  Run: `bun run check:types`
  Run: `bun run build:next`
  Expected: Both `/robots.txt` and `/sitemap.xml` build statically (`○`), zero TypeScript errors.

- [ ] **Step 6: Commit Next.js SEO configuration**
  ```bash
  git add next.config.ts src/app/robots.ts src/app/sitemap.ts src/app/[locale]/layout.tsx
  git commit -m "feat(seo): configure dynamic sitemap, hardened robots, root metadataBase, and image formats"
  ```

---

### Task 4: Structured Data (Schema.org MedicalClinic) & Route Metadata Completion

**Files:**
- Create: `src/components/healthcare/MedicalClinicJsonLd.tsx`
- Modify: `src/components/healthcare/index.ts`
- Modify: `src/components/healthcare/HealthcareShell.tsx`
- Modify: `src/app/[locale]/(marketing)/page.tsx`
- Modify: `src/app/[locale]/(marketing)/tentang-kami/page.tsx`
- Modify: `src/app/[locale]/(marketing)/layanan/page.tsx`
- Modify: `src/app/[locale]/(marketing)/fasilitas/page.tsx`
- Modify: `src/app/[locale]/(marketing)/testimoni/page.tsx`
- Modify: `src/app/[locale]/(marketing)/ulasan/page.tsx`
- Modify: `src/app/[locale]/(marketing)/kontak/page.tsx`

**Interfaces:**
- Consumes: Schema.org `MedicalClinic` specification
- Produces: Valid JSON-LD `<script type="application/ld+json">` embedded in the Server Component shell, per-page canonical tags and OpenGraph configurations

- [ ] **Step 1: Create `src/components/healthcare/MedicalClinicJsonLd.tsx`**
  Implement standard Schema.org `MedicalClinic` schema with:
  - `@context`: `https://schema.org`
  - `@type`: `MedicalClinic`
  - `name`: "Klinik Pratama Amanah"
  - `legalName`: "Klinik Pratama Amanah Healthcare"
  - `url`: `getBaseUrl()`
  - `logo`: `${baseUrl}/assets/images/logo_healthcare_1_7a4161db.webp`
  - `image`: `${baseUrl}/assets/images/amanah-building-front.webp`
  - `telephone`: "+6281234567890" (or configured contact)
  - `address`: PostalAddress (Condongcatur, Sleman, D.I. Yogyakarta 55283)
  - `geo`: GeoCoordinates (-7.7618, 110.4082)
  - `openingHoursSpecification`: 24/7 for persalinan & clinic hours
  - `medicalSpecialty`: `["Obstetric", "Pediatric", "PrimaryCare"]`
  - Safe HTML escaping (`replaceAll('<', '\\u003c')`).

- [ ] **Step 2: Embed `MedicalClinicJsonLd` in `HealthcareShell.tsx`**
  Ensure it renders server-side in the HTML response without any client runtime overhead.

- [ ] **Step 3: Complete per-page `generateMetadata` with canonicals & OpenGraph**
  For each route (`/`, `/tentang-kami`, `/layanan`, `/fasilitas`, `/testimoni`, `/ulasan`, `/kontak`):
  - Add explicit canonical URL:
    ```ts
    alternates: {
      canonical: getI18nPath('/route-name', locale),
    }
    ```
  - Add specific `openGraph` title, description, and url.

- [ ] **Step 4: LCP & Core Web Vitals audit per route**
  - Verify `priority` on above-the-fold hero images:
    - `/` (Home): `HeroSection.tsx` (verified `priority={true}`).
    - `/tentang-kami`: `AboutHeroSection.tsx` (verified `priority={true}`).
    - `/layanan`: `HeroCurvedVisual.tsx` (verified `priority={true}`).
    - `/kontak`: ensure `ContactSection.tsx` sets `priority={true}` on `contactImage`.

- [ ] **Step 5: Run tests and build**
  Run: `bun run test --project unit`
  Run: `bun run check:types`
  Run: `bun run build:next`
  Expected: All checks pass cleanly.

- [ ] **Step 6: Commit structured data and route metadata**
  ```bash
  git add src/
  git commit -m "feat(seo): implement Schema.org MedicalClinic JSON-LD, canonical tags, and LCP priority"
  ```

---

### Task 5: Final Validation Gate & Obsolete Raster Cleanup

**Files:**
- Cleaned: Delete obsolete converted `.jpg`, `.jpeg`, `.png` in `public/assets/images/`
- Preserved: Excluded assets (`apple-touch-icon.png`, `favicon-*.png`, `favicon.ico`, `svg/*`, `previews/*`)

- [ ] **Step 1: Grep codebase to ensure zero lingering references to converted rasters**
  Run grep search across `src/` for any unconverted raster paths in `public/assets/images/`.
  Expected: No occurrences of the old `.jpg` / `.png` extensions for the converted images.

- [ ] **Step 2: Execute safe cleanup with the image pipeline tool**
  Run: `bun scripts/tools/image-pipeline.ts --dir public/assets/images --clean-source`
  Expected:
  - Deletes only the source `.jpg`, `.jpeg`, `.png` files that have a verified sibling `.webp`.
  - Excluded files (`favicon*`, `apple-touch-icon.png`, SVGs) are preserved.

- [ ] **Step 3: Run full validation suite**
  Run: `bun run check:types`
  Run: `bun run test --project unit`
  Run: `bun run build:next`
  Expected: Build succeeds with exit code 0; all 24 static pages generated without broken images or missing assets.

- [ ] **Step 4: Verify git status and commit final cleanup**
  ```bash
  git add -A
  git commit -m "chore(assets): purge obsolete raster sources after successful webp validation gate"
  ```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-11-seo-rendering-and-webp-migration.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
