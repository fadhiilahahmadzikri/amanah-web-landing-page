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
    src: '/assets/images/Container_512fdd4a.png',
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
    eyebrow: 'Profil & Komitmen',
    title: 'Layanan Medis Modern & Tepercaya',
    description: 'Amanah Healthcare merupakan rumah sakit umum swasta di Sleman, Yogyakarta yang mengutamakan keselamatan pasien (patient safety) dan kenyamanan bagi seluruh keluarga.',
    image: {
      src: '/assets/images/Image__Healthcare_Infrastructure__b4e61fb2.png',
      alt: 'Fasilitas dan infrastruktur modern Amanah Healthcare',
    },
  },
  {
    eyebrow: 'Transformasi Mutu',
    title: 'Peningkatan Standar Layanan Medis',
    description: 'Kami terus melakukan pembenahan infrastruktur, peningkatan standar mutu pelayanan, dan pengembangan kompetensi tenaga kesehatan untuk menjawab kebutuhan masyarakat.',
    image: {
      src: '/assets/images/Container_512fdd4a.png',
      alt: 'Pengembangan mutu dan fasilitas medis berkelanjutan',
    },
  },
  {
    eyebrow: 'Layanan Utama',
    title: 'IGD 24 Jam & Rawat Inap Terpadu',
    description: 'Siap siaga 24 jam dengan instalasi gawat darurat, poliklinik spesialis, kamar operasi, dan fasilitas rawat inap yang nyaman didukung tim medis yang ramah dan sigap.',
    image: {
      src: '/assets/images/Image__Healthcare_and_Medical_Specialists_Consulting__12d9eb1f.png',
      alt: 'Layanan IGD dan poliklinik spesialis Amanah Healthcare',
    },
  },
  {
    eyebrow: 'Diagnostik Medis',
    title: 'Laboratorium & Radiologi Lengkap',
    description: 'Didukung fasilitas radiologi modern, laboratorium klinik terpadu, serta farmasi lengkap untuk memberikan hasil pemeriksaan yang akurat dan perencanaan terapi tepat.',
    image: {
      src: '/assets/images/Image__Biotechnology_Lab_Research__e8228306.png',
      alt: 'Laboratorium dan sarana diagnostik modern',
    },
  },
  {
    eyebrow: 'Layanan Unggulan',
    title: 'Fisioterapi & Tumbuh Kembang Anak',
    description: 'Hadir dengan layanan rehabilitasi medis & fisioterapi, klinik stimulasi tumbuh kembang anak komprehensif, serta unit hemodialisa dengan pengawasan dokter spesialis.',
    image: {
      src: '/assets/images/Image__Precision_Oncology_Therapy__179c5740.png',
      alt: 'Peralatan terapi dan layanan unggulan Amanah Healthcare',
    },
  },
  {
    eyebrow: 'Budaya Kerja',
    title: 'Solusi JITU Kesehatan Keluarga',
    description: 'Berlandaskan nilai Janji Ibadah Tuk Umat (JITU) dan budaya Ramah, Santun, Cerdas, serta Cekatan. Kami melayani dengan ketulusan hati sebagai mitra kesehatan terpercaya.',
    image: {
      src: '/assets/images/Container_7f4d0544.png',
      alt: 'Tenaga medis melayani dengan budaya ramah dan cekatan',
    },
  },
  {
    eyebrow: 'Visi Utama',
    title: 'Rumah Sakit Pilihan Masyarakat',
    description: 'Bertekad menjadi rumah sakit rujukan utama bagi masyarakat Yogyakarta dan sekitarnya melalui pelayanan yang profesional, terjangkau, humanis, dan berstandar tinggi.',
    image: {
      src: '/assets/images/Image__Appointment__f812337e.png',
      alt: 'Visi pelayanan kesehatan prima Amanah Healthcare',
    },
  },
  {
    eyebrow: 'Misi Pelayanan',
    title: 'Pelayanan Kesehatan Menyeluruh',
    description: 'Menjangkau masyarakat luas melalui layanan preventif, promotif, kuratif, dan rehabilitatif dengan komitmen penuh pada kepuasan pasien dan disiplin kerja tinggi.',
    image: {
      src: '/assets/images/Image__Healthcare_Infrastructure__b4e61fb2.png',
      alt: 'Komitmen misi pelayanan kesehatan menyeluruh',
    },
  },
] satisfies AboutSlide[];

export const facilities = [
  {
    title: 'Ruang Tunggu',
    description: 'Area tunggu bersih dan nyaman untuk pasien serta keluarga selama kunjungan.',
    icon: {
      src: '/assets/svg/Image__Choose-Icon-1__2049_5039.svg',
      alt: '',
    },
  },
  {
    title: 'Pemeriksaan',
    description: 'Ruang periksa tertata rapi untuk konsultasi dan tindakan kesehatan dasar.',
    icon: {
      src: '/assets/svg/Image__Choose-Icon-2__2049_5050.svg',
      alt: '',
    },
  },
  {
    title: 'Apotek',
    description: 'Obat pasien tersedia sesuai resep, dengan arahan penggunaan yang jelas.',
    icon: {
      src: '/assets/svg/Image__Choose-Icon-3__2049_5065.svg',
      alt: '',
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
    src: '/assets/images/Image__Appointment__f812337e.png',
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
