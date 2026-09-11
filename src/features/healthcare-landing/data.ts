import type {
  AssetImage,
  ContactItem,
  DocumentationMoment,
  FacilityItem,
  NavigationItem,
  ServiceItem,
  TestimonialItem,
} from './types';
import { BadgeCheckIcon } from 'lucide-react';

export const brand = {
  name: 'Amanah',
  logo: {
    src: '/assets/images/logo_healthcare_1_7a4161db.png',
    alt: 'Logo Amanah Healthcare',
  } satisfies AssetImage,
};

export const navigationItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Fasilitas & Layanan', href: '/fasilitas' },
  { label: 'Testimoni', href: '/testimoni' },
  { label: 'Ulasan', href: '/ulasan' },
  { label: 'Kontak', href: '/kontak' },
] satisfies NavigationItem[];

export const hero = {
  eyebrow: 'Bersama kami',
  title: 'Sehat Lebih Baik, Bersama Klinik',
  scriptTitle: 'Amanah Healthcare',
  image: {
    src: '/assets/images/amanah-building-front.jpg',
    alt: 'Dokter mendampingi pasien di ruang perawatan Klinik Amanah',
  } satisfies AssetImage,
};

export const watermark = {
  src: '/assets/svg/Vector.svg',
  alt: '',
} satisfies AssetImage;

export const trustHighlights = {
  service: {
    eyebrow: 'Pelayanan Kesehatan',
    title: 'Layanan Lengkap untuk kesehatan keluarga',
    cta: 'Lihat Layanan',
    ctaIcon: {
      src: '/assets/svg/Image__arrow-02__2049_4916.svg',
      alt: '',
    } satisfies AssetImage,
  },
  patientCount: {
    label: 'Pasien Terlayani',
    value: '5,000+',
    icon: {
      src: '/assets/svg/Vector_2049_4921.svg',
      alt: '',
    } satisfies AssetImage,
    image: {
      src: '/assets/images/ChatGPT_Image_Aug_14__2026__08_21_37_PM_1_eb18f970.png',
      alt: 'Ilustrasi perlengkapan medis Amanah Healthcare',
    } satisfies AssetImage,
  },
  community: {
    title: 'Bergabung Bersama Kami',
    description: 'Dipercaya oleh ribuan pasien',
    avatars: [
      {
        src: 'https://i.pravatar.cc/112?img=32',
        alt: 'Avatar pasien Amanah Healthcare',
      },
      {
        src: 'https://i.pravatar.cc/112?img=47',
        alt: 'Avatar pasien Amanah Healthcare',
      },
      {
        src: 'https://i.pravatar.cc/112?img=56',
        alt: 'Avatar pasien Amanah Healthcare',
      },
    ] satisfies AssetImage[],
  },
  quote: {
    text: '“pelayanan ramah, sangat informatif. merasa aman dan nyaman periksa disini”',
    author: '— Elza Amelia',
    icon: {
      src: '/assets/svg/Vector_2049_4946.svg',
      alt: '',
    } satisfies AssetImage,
  },
};

export const facilities = [
  {
    title: 'Spesialis Persalinan',
    description:
      'Ditangani dokter kandungan (SpOG), didukung fasilitas USG dan pemeriksaan laboratorium.',
    pixelIcon: 'sakura',
    icon: {
      src: '/assets/svg/icon-spesialis-persalinan.svg',
      alt: 'Ikon Spesialis Persalinan Klinik Amanah',
    },
    image: {
      src: '/assets/images/asset-index-6.jpg',
      alt: 'Layanan Spesialis Persalinan Klinik Amanah',
    },
  },
  {
    title: 'Khitan Laser Anak',
    description: 'Metode laser, ditangani langsung oleh tenaga medis klinik.',
    pixelIcon: 'bunga-matahari',
    icon: {
      src: '/assets/svg/icon-khitan-laser.svg',
      alt: 'Ikon Layanan Khitan Laser Anak',
    },
    image: {
      src: '/assets/images/asset-index-7.jpg',
      alt: 'Layanan Khitan Laser Anak Klinik Amanah',
    },
  },
  {
    title: 'Persalinan 24 Jam',
    description:
      'Siaga penuh untuk persalinan normal, kapan pun Anda membutuhkan.',
    pixelIcon: 'teratai',
    icon: {
      src: '/assets/svg/icon-persalinan-24jam.svg',
      alt: 'Ikon Layanan Persalinan 24 Jam Siaga Penuh',
    },
    image: {
      src: '/assets/images/asset-index-8.jpg',
      alt: 'Layanan Persalinan 24 Jam Siaga Penuh',
    },
  },
  {
    title: 'Terima BPJS & Umum',
    description:
      'Melayani pasien BPJS Kesehatan maupun non-BPJS, proses administrasi mudah.',
    pixelIcon: 'melati',
    icon: {
      src: '/assets/svg/icon-terima-bpjs.svg',
      alt: 'Ikon Pelayanan Pasien BPJS dan Umum',
    },
    image: {
      src: '/assets/images/asset-index-9.jpg',
      alt: 'Pelayanan Pasien BPJS dan Umum Klinik Amanah',
    },
  },
] satisfies FacilityItem[];

export const services = [
  {
    title: 'Persalinan full bonus',
    image: {
      src: '/assets/images/Container_cbf59344.png',
      alt: 'Poster layanan persalinan full bonus di Amanah Healthcare',
    },
  },
  {
    title: 'Liburan khitan',
    image: {
      src: '/assets/images/Container_b3d9c1ee.png',
      alt: 'Poster layanan khitan aman dan senang',
    },
  },
  {
    title: 'Jadwal imunisasi',
    image: {
      src: '/assets/images/Container_58d108e1.png',
      alt: 'Poster jadwal imunisasi Amanah Healthcare',
    },
  },
  {
    title: 'USG spesialis kandungan',
    image: {
      src: '/assets/images/Container_65c14397.png',
      alt: 'Poster layanan USG spesialis kandungan',
    },
  },
  {
    title: 'Paket pemeriksaan kesehatan',
    image: {
      src: '/assets/images/Container_bc4ce079.png',
      alt: 'Poster layanan pemeriksaan kesehatan',
    },
  },
  {
    title: 'Konsultasi kesehatan keluarga',
    image: {
      src: '/assets/images/Container_6133502d.png',
      alt: 'Poster konsultasi kesehatan keluarga',
    },
  },
] satisfies ServiceItem[];

export const appointment = {
  eyebrow: 'Janji Temu',
  title: 'Jadwalkan Kunjungan Anda',
  description: 'Pilih layanan dan jadwal yang sesuai dengan kebutuhan Anda. Buat janji dengan mudah dan dapatkan pelayanan kesehatan terbaik di Klinik Amanah.',
  image: {
    src: '/assets/images/asset-jadwalkan-kunjungan.jpg',
    alt: 'Tim dokter Amanah Healthcare siap melayani pasien',
  } satisfies AssetImage,
};

export const testimonials = {
  featured: {
    quote: 'Pelayanan yang ramah dan membuat saya merasa nyaman selama berobat di Klinik Amanah.',
    name: 'Pasien Klinik Amanah',
    role: 'Pasien',
    image: {
      src: '/assets/images/Image__Whitening__53bfb490.png',
      alt: 'Pasien tersenyum setelah mendapatkan pelayanan di Klinik Amanah',
    } satisfies AssetImage,
  },
  items: [
    {
      quote: 'Amazing experience! The team is caring, gentle, and professional. My smile has never looked better, highly recommend their dental care services.',
      name: 'Juairiya',
      role: 'Medical Assistant',
      avatar: {
        src: '/assets/images/Image__service-small-3__b76673af.png',
        alt: 'Juairiya',
      },
    },
    {
      quote: 'Konsultasinya jelas, prosesnya nyaman, hasilnya terasa lebih rapi.',
      name: 'Cooper, Kristin',
      role: 'Medical Assistant',
      avatar: {
        src: '/assets/images/Image__tisti-3__be471b16.png',
        alt: 'Cooper, Kristin',
      },
    },
  ] satisfies TestimonialItem[],
};

export const documentationMoments = [
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-1.png',
    alt: 'Momen kebersamaan keluarga pasien dan tenaga medis Klinik Amanah',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-2.png',
    alt: 'Pemeriksaan kesehatan penuh senyum di Klinik Amanah',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-3.png',
    alt: 'Pelayanan konsultasi hangat dokter dan pasien',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-4.png',
    alt: 'Pelayanan kesehatan ibu dan anak penuh perhatian',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-5.png',
    alt: 'Pendampingan tumbuh kembang balita dengan penuh kasih',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-6.png',
    alt: 'Pemeriksaan tensi dan deteksi dini oleh tim medis',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-7.png',
    alt: 'Konsultasi ramah dengan tenaga kesehatan Amanah',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-8.png',
    alt: 'Pemeriksaan kesehatan keluarga dengan nyaman dan tenang',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-9.png',
    alt: 'Edukasi dan penyuluhan kesehatan untuk pasien',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-10.png',
    alt: 'Pelayanan kebidanan dan perawatan ibu ramah',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-11.png',
    alt: 'Momen bahagia pasien bersama dokter klinik',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-12.png',
    alt: 'Suasana ruang tunggu dan periksa yang nyaman',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-13.png',
    alt: 'Pelayanan ramah untuk seluruh anggota keluarga',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-14.png',
    alt: 'Pemeriksaan menyeluruh dengan peralatan higienis',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-15.png',
    alt: 'Dokumentasi senyum kepuasan pasien setelah berobat',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-16.png',
    alt: 'Perawatan medis profesional dengan sentuhan kekeluargaan',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-17.png',
    alt: 'Pemberian obat dan edukasi pola hidup sehat',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-18.png',
    alt: 'Pemeriksaan berkala ibu hamil dan janin',
  },
  {
    imgUrl: '/assets/images/dokumentasi/dokumentasi-19.png',
    alt: 'Dedikasi tim medis Klinik Amanah untuk kesehatan bersama',
  },
] satisfies DocumentationMoment[];

export const contactItems = [
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
    href: 'https://www.instagram.com/amanahhealthcare?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
  },
] satisfies ContactItem[];

export const contactImage = {
  src: '/assets/images/kontak.png',
  alt: 'Dokter Amanah Healthcare menerima panggilan konsultasi',
} satisfies AssetImage;

export const footer = {
  address: 'Jl. Anyelir 1 No.243, Perumnas Condong Catur, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281',
  location: 'Klinik Amanah HealthCare (Persalinan 24 Jam)',
  map: {
    src: '/assets/images/lokasi.png',
    alt: 'Peta lokasi Klinik Amanah Healthcare',
  } satisfies AssetImage,
  socialLinks: [
    'Instagram Amanah Healthcare',
    'TikTok Amanah Healthcare',
    'Facebook Amanah Healthcare',
  ],
  certificationIcon: BadgeCheckIcon,
};
