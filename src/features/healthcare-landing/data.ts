import type {
  AboutSlide,
  AssetImage,
  ContactItem,
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
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang-kami' },
  { label: 'Fasilitas', href: '#fasilitas' },
  { label: 'Dokter', href: '#dokter' },
  { label: 'Kontak', href: '#kontak' },
  { label: 'Layanan', href: '#layanan' },
] satisfies NavigationItem[];

export const hero = {
  eyebrow: 'Bersama kami',
  title: 'Sehat Lebih Baik, Bersama Klinik',
  scriptTitle: 'Amanah Healthcare',
  image: {
    src: '/assets/images/hero-bg-image.png',
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
        src: '/assets/images/Image__clint-1__5409f0a5.png',
        alt: 'Pasien Amanah Healthcare',
      },
      {
        src: '/assets/images/Image__clint-2__4fb72324.png',
        alt: 'Pasien Amanah Healthcare',
      },
      {
        src: '/assets/images/Image__clint-3__92ee8626.png',
        alt: 'Pasien Amanah Healthcare',
      },
    ] satisfies AssetImage[],
  },
  quote: {
    text: '“Best dentist experience ever! Friendly staff and pain-free visits.”',
    author: '— dr. Ika Fenti',
    icon: {
      src: '/assets/svg/Vector_2049_4946.svg',
      alt: '',
    } satisfies AssetImage,
  },
};

export const aboutSlides = [
  {
    eyebrow: 'Cara Kami Melayani',
    title: 'Ramah, Nyaman, dan Mengayomi',
    description: 'Setiap pasien kami perlakukan seperti keluarga sendiri, mulai dari pendaftaran hingga konsultasi dengan dokter. Kebersihan klinik dijaga ketat agar Anda tetap nyaman selama berkunjung.',
    image: {
      src: '/assets/images/asset-index-1.jpg',
      alt: 'Cara Kami Melayani - Ramah, Nyaman, dan Mengayomi',
    },
  },
  {
    eyebrow: 'Tujuan Kami',
    title: 'Menjadi Pilihan Utama Warga Sleman',
    description: 'Kami ingin menjadi tempat berobat yang paling Anda percaya — mulai dari pemeriksaan kesehatan umum, konsultasi KB, hingga layanan ibu dan anak, semua ditangani dengan cepat dan tepat.',
    image: {
      src: '/assets/images/asset-index-2.jpg',
      alt: 'Tujuan Kami - Menjadi Pilihan Utama Warga Sleman',
    },
  },
  {
    eyebrow: 'Cakupan Pelayanan',
    title: 'Melayani Pasien BPJS dan Umum',
    description: 'Soal biaya, Anda tidak perlu khawatir. Klinik Amanah resmi melayani pasien BPJS Kesehatan maupun umum, dengan proses administrasi yang cepat dan tidak berbelit.',
    image: {
      src: '/assets/images/asset-index-3.jpg',
      alt: 'Cakupan Pelayanan - Melayani Pasien BPJS dan Umum',
    },
  },
  {
    eyebrow: 'Fasilitas & Layanan',
    title: 'Persalinan 24 Jam & Beragam Fasilitas',
    description: 'Layanan persalinan normal kami siagakan 24 jam penuh. Klinik ini juga dilengkapi USG kandungan, pemeriksaan laboratorium, khitan laser, serta jadwal vaksinasi rutin untuk bayi dan anak.',
    image: {
      src: '/assets/images/asset-index-4.jpg',
      alt: 'Fasilitas & Layanan - Persalinan 24 Jam & Beragam Fasilitas',
    },
  },
  {
    eyebrow: 'Profil Klinik',
    title: 'Klinik Kesehatan Keluarga di Condongcatur',
    description: 'Klinik Pratama Amanah berlokasi di Jalan Anyelir, Perumnas Condongcatur, Sleman, melayani pemeriksaan dokter umum, konsultasi kandungan, dan kebidanan untuk kebutuhan kesehatan harian keluarga Anda.',
    image: {
      src: '/assets/images/asset-index-5.png',
      alt: 'Profil Klinik - Klinik Kesehatan Keluarga di Condongcatur',
    },
  },
] satisfies AboutSlide[];

export const facilities = [
  {
    title: 'Spesialis Persalinan',
    description:
      'Ditangani dokter kandungan (SpOG), didukung fasilitas USG dan pemeriksaan laboratorium.',
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

export const facilityImage = {
  src: '/assets/images/Container_7f4d0544.png',
  alt: 'Pelayanan imunisasi keluarga di Klinik Amanah',
} satisfies AssetImage;

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
    src: '/assets/images/image-bg-janjitemu.jpg',
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
    href: 'https://instagram.com/amanahhealthcare',
  },
] satisfies ContactItem[];

export const contactImage = {
  src: '/assets/images/Image__Healthcare_and_Medical_Specialists_Consulting__12d9eb1f.png',
  alt: 'Dokter Amanah Healthcare menerima panggilan konsultasi',
} satisfies AssetImage;

export const footer = {
  address: 'Jl. Anyelir 1 No.243, Perumnas Condong Catur Condongcatur, Kec. Depok, Kab. Sleman Daerah Istimewa Yogyakarta 55281',
  location: 'Jl. Manggis No.6, Condongcatur',
  cardText: 'Pelayanan kesehatan terpercaya, mudah dijangkau untuk anda dan keluarga',
  map: {
    src: '/assets/images/image_1_bfb9b6d3.png',
    alt: 'Peta lokasi Klinik Amanah Healthcare',
  } satisfies AssetImage,
  socialLinks: ['Facebook', 'X', 'LinkedIn', 'Pinterest'],
  certificationIcon: BadgeCheckIcon,
};
