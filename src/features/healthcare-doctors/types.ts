import type { AssetImage } from '@/components/healthcare';

export type DoctorMarkerTone = 'neutral';

export type DoctorHeroMarker = {
  id: string;
  left: `${number}%`;
  memberId: string;
  tone: DoctorMarkerTone;
  top: `${number}%`;
};

export type HealthcareTeamMember = {
  id: string;
  image: AssetImage;
  name: string;
  role: string;
  showSocials?: boolean;
};

export type HealthcareTeamSection = {
  description: string;
  eyebrow: string;
  id: string;
  members: HealthcareTeamMember[];
  title: string;
};
