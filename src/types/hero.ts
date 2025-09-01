export interface HeroImage {
  src: string;
  alt: string;
  srcset?: string;
  sizes?: string;
}

export interface HeroNavItem {
  label: string;
  href: string;
}

export interface HeroProps {
  image: HeroImage;
  navigation?: HeroNavItem[];
}
