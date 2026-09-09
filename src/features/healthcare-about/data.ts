import type {
  AboutHeroData,
  AboutVisionMissionData,
  AboutVisualBandData,
  EditorialStoryData,
  PixelFeatureIcon,
} from './types';

export const aboutPixelIcons: PixelFeatureIcon[] = [
  {
    alt: 'Ikon kotak P3K pixel art',
    id: 'pixel-kotak-p3k',
    name: 'Kotak P3K',
    src: '/assets/svg/kotak-p3k-pixel.svg',
  },
  {
    alt: 'Ikon kapsul obat medis pixel art',
    id: 'pixel-obat',
    name: 'Kapsul Medis',
    src: '/assets/svg/obat-pixel.svg',
  },
  {
    alt: 'Ikon bunga herbal pixel art',
    id: 'pixel-bunga-herbal',
    name: 'Bunga Herbal',
    src: '/assets/svg/bunga-herbal-pixel.svg',
  },
];

export const aboutHeroData: AboutHeroData = {
  headline: 'Sehat Lebih Mudah, Nyaman, dan Terpercaya Bersama Kami.',
  icons: aboutPixelIcons,
  initialDescription:
    'Kenali Klinik Amanah Healthcare lebih dekat, dan temukan cara kami hadir untuk kesehatan Anda dan keluarga.',
  description:
    'Kami berkomitmen memberikan pengalaman pelayanan kesehatan yang mudah dipahami dan dekat dengan kebutuhan setiap pasien.',
};

export const aboutVisualBandData: AboutVisualBandData = {
  image: {
    src: '/assets/images/about-hero-doctor.jpg',
    alt: 'Dokter profesional Klinik Amanah Pratama Healthcare tersenyum ramah siap melayani keluarga Anda',
  },
};

export const aboutVisionMissionData: AboutVisionMissionData = {
  vision: {
    title: 'Visi',
    description:
      'Menghadirkan pelayanan kesehatan yang ramah, profesional, mudah diakses, dan terpercaya, serta terus berkomitmen meningkatkan kualitas kesehatan masyarakat.',
    icon: {
      alt: 'Ikon hati medis pixel art',
      id: 'pixel-visi-hati',
      name: 'Hati Sehat',
      src: '/assets/svg/hati-sehat-pixel.svg',
    },
  },
  mission: {
    title: 'Misi',
    description:
      'Memberikan pelayanan kesehatan yang profesional, ramah, dan berkualitas, membangun kepercayaan melalui komunikasi yang baik, serta terus meningkatkan kualitas pelayanan dan kompetensi tenaga kesehatan.',
    icon: {
      alt: 'Ikon stetoskop medis pixel art',
      id: 'pixel-misi-stetoskop',
      name: 'Stetoskop Medis',
      src: '/assets/svg/stetoskop-pixel.svg',
    },
  },
};

export const aboutEditorialStories: EditorialStoryData[] = [
  {
    id: 'editorial-story-approach',
    title: 'Hadir lebih dekat untuk kesehatan keluarga.',
    description:
      'Klinik Amanah Pratama Healthcare hadir sebagai mitra kesehatan keluarga yang memberikan pelayanan dengan pendekatan yang ramah, profesional, dan mudah dipahami. Kami ingin menciptakan suasana pelayanan yang nyaman sehingga setiap pasien dapat merasa didengar, dipahami, dan mendapatkan perhatian yang sesuai dengan kebutuhannya.',
    image: {
      src: '/assets/images/asset-index-1.jpg',
      alt: 'Konsultasi medis dan pelayanan penuh perhatian tenaga kesehatan Klinik Amanah Pratama Healthcare',
    },
    imagePosition: 'left',
  },
  {
    id: 'editorial-story-personalized',
    title: 'Setiap keluarga punya kebutuhan yang berbeda.',
    description:
      'Kami memahami bahwa setiap keluarga memiliki kebutuhan, kondisi, dan perjalanan kesehatan yang berbeda. Karena itu, pelayanan kami dirancang untuk memberikan perhatian secara personal, dengan proses yang mudah dipahami dan suasana yang nyaman. Kami ingin menjadi bagian dari perjalanan kesehatan keluarga melalui pelayanan yang ramah, profesional, dan penuh kepedulian.',
    image: {
      src: '/assets/images/asset-index-2.jpg',
      alt: 'Pelayanan kesehatan yang berorientasi pada kenyamanan pasien dan keluarga di Klinik Amanah Pratama Healthcare',
    },
    imagePosition: 'right',
  },
];
