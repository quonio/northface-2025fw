import type { ImageMetadata } from 'astro';

export interface Product {
  headline: 'UNISEX' | 'WOMENS' | 'BABY';
  modelNumber: string;
  title: string;
  copy: string;
  description: string;
  price: string;
  link: string;
  images: Array<{
    src: ImageMetadata;
    alt: string;
  }>;
}

export interface ProductDataService {
  getMainProducts(): Product[];
  getAdditionalProducts(): Product[];
  getBabyBlankets(): Product[];
}

export interface ContentData {
  meta: {
    title: string;
    description: string;
    lang: string;
  };
  hero: {
    imageAlt: string;
  };
  intro: {
    sealImageSrc: string;
    sealImageAlt: string;
  };
  gallery: {
    description: string[];
    imageAlts: string[];
  };
  productLines: {
    imageSrc: {
      pc: ImageMetadata;
      sp: ImageMetadata;
    };
    description: string | string[];
  };
  collection: {
    label: string;
  };
  footer: {
    disclaimer: string;
    ariaLabel: string;
  };
}

export interface ContentDataService {
  getContent(): ContentData;
}