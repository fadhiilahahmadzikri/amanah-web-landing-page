import type { AssetImage } from '@/components/healthcare/types';

export type PixelFeatureIcon = {
  alt: string;
  id: string;
  name: string;
  src: string;
};

export type AboutHeroData = {
  description: string;
  headline: string;
  icons?: PixelFeatureIcon[];
  initialDescription?: string;
};

export type AboutVisualBandData = {
  image: AssetImage;
};

export type VisionMissionItem = {
  description: string;
  icon?: PixelFeatureIcon;
  title: string;
};

export type AboutVisionMissionData = {
  mission: VisionMissionItem;
  vision: VisionMissionItem;
};

export type EditorialStoryData = {
  description: string;
  id: string;
  image: AssetImage;
  imagePosition: 'left' | 'right';
  title: string;
};
