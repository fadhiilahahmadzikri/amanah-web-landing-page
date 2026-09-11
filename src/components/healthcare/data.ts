import type {
  AssetImage,
  HealthcareContactItem,
  HealthcareFooterData,
  HealthcareNavigationItem,
} from './types';

export const healthcareBrand = {
  name: 'Amanah',
  logo: {
    src: '/assets/images/logo_healthcare_1_7a4161db.png',
    alt: 'Logo Amanah Healthcare',
  } satisfies AssetImage,
};

export const healthcareNavigationItems: HealthcareNavigationItem[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang-kami' },
  { label: 'Fasilitas & Layanan', path: '/fasilitas' },
  { label: 'Kontak', path: '/kontak' },
];

export const healthcareContactItems = [
  {
    label: 'Email address',
    value: 'klinikamanahhealthcare@gmail.com',
    href: 'mailto:klinikamanahhealthcare@gmail.com',
  },
  {
    label: 'Phone Number',
    value: '+62 813-9245-6664',
    href: 'tel:+6281392456664',
  },
  {
    label: 'Lets connect',
    value: '@amanahhealthcare',
    href: 'https://instagram.com/amanahhealthcare',
  },
] satisfies HealthcareContactItem[];

export const healthcareFooter = {
  address: 'Jl. Anyelir 1 No.243, Perumnas Condong Catur Condongcatur, Kec. Depok, Kab. Sleman Daerah Istimewa Yogyakarta 55281',
  location: 'Jl. Manggis No.6, Condongcatur',
  map: {
    src: '/assets/images/image_1_bfb9b6d3.png',
    alt: 'Peta lokasi Klinik Amanah Healthcare',
  },
  socialLinks: ['Facebook', 'X', 'LinkedIn', 'Pinterest'],
} satisfies HealthcareFooterData;
