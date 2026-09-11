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
  { label: 'Ulasan', path: '/ulasan' },
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
    href: 'https://instagram.com/amanahhealthcare?utm_medium=copy_link',
  },
] satisfies HealthcareContactItem[];

export const healthcareFooter = {
  address: 'Jl. Anyelir 1 No.243, Perumnas Condong Catur, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281',
  location: 'Klinik Amanah HealthCare (Persalinan 24 Jam)',
  map: {
    src: '/assets/images/image_1_bfb9b6d3.png',
    alt: 'Peta lokasi Klinik Amanah Healthcare',
    href: 'https://www.google.com/maps/search/?api=1&query=Klinik%20Amanah%20HealthCare%20(Persalinan%2024%20Jam)%20Jl.%20Anyelir%201%20No.243%20Condongcatur%20Sleman%2055281',
  },
  plusCode: '6CV5+HC Condongcatur, Kabupaten Sleman, Daerah Istimewa Yogyakarta',
  socialLinks: [
    {
      label: 'Instagram Amanah Healthcare',
      href: 'https://instagram.com/amanahhealthcare?utm_medium=copy_link',
    },
  ],
} satisfies HealthcareFooterData;
