import type { MetadataRoute } from 'next';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

const marketingRoutes: Array<{
  path: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/tentang-kami', changeFrequency: 'monthly', priority: 0.85 },
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
      priority: locale === routing.defaultLocale ? route.priority : Number((route.priority * 0.9).toFixed(2)),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(l => [l, `${baseUrl}${getI18nPath(route.path, l)}`]),
        ),
      },
    })),
  );
}
