import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Caveat, Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl } from '@/utils/Helpers';
import '@/styles/global.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
});

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
});

const themeInitializer = `
(() => {
  try {
    const storageKey = 'amanah-theme';
    const savedTheme = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', isDark);
  } catch {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Klinik Pratama Amanah Healthcare - Klinik Persalinan dan Umum Yogyakarta',
    template: '%s | Klinik Pratama Amanah Healthcare',
  },
  description:
    'Klinik Pratama Amanah Healthcare menyediakan layanan dokter umum, kebidanan & persalinan 24 jam, imunisasi anak, dan khitan di Condongcatur, Sleman, Yogyakarta.',
  keywords: [
    'klinik amanah',
    'klinik pratama amanah',
    'klinik pratama amanah healthcare',
    'klinik persalinan yogyakarta',
    'klinik bersalin sleman',
    'persalinan 24 jam jogja',
    'dokter umum condongcatur',
    'dokter umum sleman',
    'dokter umum jogja',
    'bidan 24 jam sleman',
    'khitan modern yogyakarta',
    'sunat anak yogyakarta',
    'imunisasi anak sleman',
    'pemeriksaan kehamilan jogja',
    'klinik bpjs condongcatur',
  ],
  authors: [{ name: 'Klinik Pratama Amanah Healthcare', url: getBaseUrl() }],
  creator: 'Klinik Pratama Amanah Healthcare',
  publisher: 'Klinik Pratama Amanah Healthcare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Klinik Pratama Amanah Healthcare',
    title: 'Klinik Pratama Amanah Healthcare - Klinik Persalinan dan Umum Yogyakarta',
    description:
      'Layanan dokter umum, kebidanan & persalinan 24 jam, imunisasi, dan khitan anak ramah trauma di Condongcatur, Sleman, Yogyakarta.',
    images: [
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
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klinik Pratama Amanah Healthcare - Klinik Persalinan dan Umum Yogyakarta',
    description:
      'Layanan dokter umum, kebidanan & persalinan 24 jam, imunisasi, dan khitan anak ramah trauma di Condongcatur, Sleman, Yogyakarta.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
      'en-US': '/en',
    },
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializer }}
        />
      </head>
      <body className={`
        ${plusJakartaSans.variable}
        ${caveat.variable}
        ${lora.variable}
        font-sans
      `}
      >
        <NextIntlClientProvider>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
