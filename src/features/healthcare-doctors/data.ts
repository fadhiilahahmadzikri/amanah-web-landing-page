import type {
  DoctorHeroMarker,
  HealthcareTeamMember,
  HealthcareTeamSection,
} from './types';

const sharedMidwifeImage = {
  src: '/assets/images/Image__Martha_Suwanti__cf83c009.png',
  alt: 'Bidan Amanah Healthcare tersenyum mengenakan jas putih',
};

export const doctorsHero = {
  eyebrow: 'Klinik Amanah Healthcare',
  title: 'Kenali Klinik Amanah',
  description: 'Memberikan pelayanan kesehatan yang profesional, nyaman, dan terpercaya untuk Anda dan keluarga.',
  image: {
    src: '/assets/images/Container_107bc445.png',
    alt: 'Tim dokter dan tenaga kesehatan Amanah Healthcare',
  },
  helperText: 'Click on any pin marker to view team doctor details',
};

export const doctorsTeam = [
  {
    id: 'bhagaskara-yudha',
    name: 'Bhagaskara Yudha',
    role: 'Founder & Lead Doctor',
    image: {
      src: '/assets/images/Image__Bhagaskara_Yudha__a6676277.png',
      alt: 'Bhagaskara Yudha',
    },
  },
  {
    id: 'martha-suwanti',
    name: 'Martha Suwanti',
    role: 'Co-Founder & Surgeon',
    image: {
      src: '/assets/images/Image__Martha_Suwanti__cf83c009.png',
      alt: 'Martha Suwanti',
    },
  },
  {
    id: 'srikandi-wulandari',
    name: 'Srikandi Wulandari',
    role: 'VP of Tech & Research',
    image: {
      src: '/assets/images/Image__Srikandi_Wulandari__f433cdb0.png',
      alt: 'Srikandi Wulandari',
    },
  },
  {
    id: 'tri-mulyanto',
    name: 'Tri Mulyanto',
    role: 'VP of Patient Care',
    image: {
      src: '/assets/images/Image__Tri_Mulyanto__0c8cf0ae.png',
      alt: 'Tri Mulyanto',
    },
  },
  {
    id: 'aris-setiawan',
    name: 'Dr. Aris Setiawan',
    role: 'Head of Cardiology',
    image: {
      src: '/assets/images/Image__Dr__Aris_Setiawan__6dffa2e1.png',
      alt: 'Dr. Aris Setiawan',
    },
  },
  {
    id: 'maya-putri',
    name: 'Dr. Maya Putri',
    role: 'Pediatric Director',
    image: {
      src: '/assets/images/Image__Dr__Maya_Putri__4f3fb4e6.png',
      alt: 'Dr. Maya Putri',
    },
  },
  {
    id: 'hendra-wijaya',
    name: 'Dr. Hendra Wijaya',
    role: 'Neurology Specialist',
    image: {
      src: '/assets/images/Image__Dr__Hendra_Wijaya__e60e247e.png',
      alt: 'Dr. Hendra Wijaya',
    },
  },
  {
    id: 'nina-amelia',
    name: 'Dr. Nina Amelia',
    role: 'Emergency Medicine Lead',
    image: {
      src: '/assets/images/Image__Dr__Nina_Amelia__f3a9a0f7.png',
      alt: 'Dr. Nina Amelia',
    },
  },
] satisfies HealthcareTeamMember[];

export const midwifeTeam = [
  {
    id: 'sarah-amalia',
    name: 'Bidan Sarah Amalia',
    role: 'Head of Maternity',
    image: sharedMidwifeImage,
    showSocials: false,
  },
  {
    id: 'siti-rahmawati',
    name: 'Bidan Siti Rahmawati',
    role: 'Clinical Midwife Lead',
    image: sharedMidwifeImage,
  },
  {
    id: 'dewi-lestari',
    name: 'Bidan Dewi Lestari',
    role: 'Perinatal Care Lead',
    image: sharedMidwifeImage,
  },
  {
    id: 'anita-wijaya',
    name: 'Bidan Anita Wijaya',
    role: 'Neonatal Specialist',
    image: sharedMidwifeImage,
  },
  {
    id: 'nurul-hidayah',
    name: 'Bidan Nurul Hidayah',
    role: 'Postpartum Recovery',
    image: sharedMidwifeImage,
  },
  {
    id: 'rina-astuti',
    name: 'Bidan Rina Astuti',
    role: 'Family Planning Lead',
    image: sharedMidwifeImage,
  },
  {
    id: 'kartika-sari',
    name: 'Bidan Kartika Sari',
    role: 'Gentle Birth Consultant',
    image: sharedMidwifeImage,
    showSocials: false,
  },
  {
    id: 'dian-permata',
    name: 'Bidan Dian Permata',
    role: 'Community Care Director',
    image: sharedMidwifeImage,
  },
] satisfies HealthcareTeamMember[];

export const doctorsHeroMarkers = [
  {
    id: 'marker-bhagaskara',
    memberId: 'bhagaskara-yudha',
    left: '6.2%',
    top: '48%',
    tone: 'blue',
  },
  {
    id: 'marker-martha',
    memberId: 'martha-suwanti',
    left: '32.7%',
    top: '24%',
    tone: 'cyan',
  },
  {
    id: 'marker-srikandi',
    memberId: 'srikandi-wulandari',
    left: '43.4%',
    top: '45%',
    tone: 'green',
  },
  {
    id: 'marker-maya',
    memberId: 'maya-putri',
    left: '45.4%',
    top: '57%',
    tone: 'green',
  },
  {
    id: 'marker-hendra',
    memberId: 'hendra-wijaya',
    left: '59.4%',
    top: '36%',
    tone: 'green',
  },
  {
    id: 'marker-nina',
    memberId: 'nina-amelia',
    left: '78.6%',
    top: '34%',
    tone: 'lime',
  },
] satisfies DoctorHeroMarker[];

export const doctorSections = [
  {
    id: 'dokter',
    eyebrow: 'Kenali Dokter Kami',
    title: 'Profesional. Peduli. Terpercaya.',
    description: 'Didukung oleh dokter dan tenaga kesehatan yang berdedikasi, Klinik Amanah Healthcare berkomitmen memberikan pelayanan kesehatan yang berkualitas, nyaman, dan terpercaya bagi Anda dan keluarga.',
    members: doctorsTeam,
  },
  {
    id: 'bidan',
    eyebrow: 'Kenali Bidan Kami',
    title: 'Hangat Mendampingi, Sepenuh Hati.',
    description: 'Bidan Klinik Amanah Healthcare berkomitmen memberikan pendampingan yang nyaman dan terpercaya bagi ibu dan keluarga, mulai dari kehamilan, persalinan, hingga masa pascamelahirkan.',
    members: midwifeTeam,
  },
] satisfies HealthcareTeamSection[];
