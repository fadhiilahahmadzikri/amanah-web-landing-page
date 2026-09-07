export type AssetImage = {
  src: string;
  alt: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type FacilityItem = {
  title: string;
  description: string;
  icon: AssetImage;
  image: AssetImage;
};

export type AboutSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: AssetImage;
};

export type ServiceItem = {
  title: string;
  image: AssetImage;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatar: AssetImage;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
};
