import type { AssetImage } from '@/components/healthcare';

export type HealthcareTeamMember = {
  id: string;
  image: AssetImage;
  name: string;
  role: string;
  showSocials?: boolean;
};
