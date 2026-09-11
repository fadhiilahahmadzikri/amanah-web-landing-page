import type { AssetImage } from '@/components/healthcare';

export type HealthcareTeamMember = {
  id: string;
  image: AssetImage;
  name: string;
  role: string;
  showSocials?: boolean;
  socials?: {
    instagram?: string;
    linkedin?: string;
  };
  instagramUrl?: string;
  linkedinUrl?: string;
};
