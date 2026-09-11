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
    default: 'Klinik Pratama Amanah Healthcare - Layanan Kesehatan Keluarga',
    template: '%s | Klinik Amanah Healthcare',
  },
  description:
    'Klinik Pratama Amanah Healthcare menyediakan layanan dokter umum, kebidanan & persalinan 24 jam, imunisasi, dan khitan di Condongcatur, Sleman, Yogyakarta.',
  keywords: [
    'klinik amanah',
    'klinik pratama amanah',
    'klinik sleman',
    'klinik condongcatur',
    'persalinan 24 jam jogja',
    'khitan modern yogyakarta',
    'dokter umum jogja',
    'imunisasi anak sleman',
  ],
  authors: [{ name: 'Klinik Pratama Amanah Healthcare' }],
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
    url: getBaseUrl(),
    siteName: 'Klinik Amanah Healthcare',
    title: 'Klinik Pratama Amanah Healthcare - Layanan Kesehatan Keluarga',
    description:
      'Pelayanan kesehatan profesional, ramah, dan terpercaya untuk Anda dan keluarga di Yogyakarta.',
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'Klinik Pratama Amanah Healthcare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klinik Pratama Amanah Healthcare',
    description:
      'Pelayanan kesehatan profesional, ramah, dan terpercaya untuk Anda dan keluarga di Yogyakarta.',
    images: ['/apple-touch-icon.png'],
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
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
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
