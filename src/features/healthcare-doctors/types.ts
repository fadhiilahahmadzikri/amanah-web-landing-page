import type { AssetImage } from '@/components/healthcare';

export type HealthcareSocials = {
  instagram?: string;
  linkedin?: string;
};

export type HealthcareTeamMember = {
  id: string;
  image: AssetImage;
  name: string;
  role: string;
  showSocials?: boolean;
  socials?: HealthcareSocials;
  instagramUrl?: string;
  linkedinUrl?: string;
};
