import type { LucideIcon } from 'lucide-react';

export type AssetImage = {
  alt: string;
  src: string;
};

export type HealthcareNavigationItem = {
  hash?: string;
  label: string;
  path: string;
};

export type HealthcareContactItem = {
  href: string;
  label: string;
  value: string;
};

export type HealthcareFooterData = {
  address: string;
  location: string;
  map: AssetImage;
  socialLinks: string[];
};

export type HealthcareSocialIcon = LucideIcon;
