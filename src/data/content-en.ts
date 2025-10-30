import type { ContentData, ContentDataService } from './types';

const contentEn: ContentData = {
  meta: {
    title: 'THE NORTH FACE Maternity+ 2025FW',
    description: 'THE NORTH FACE Maternity+ 2025 Fall/Winter Collection',
    lang: 'en',
  },
  hero: {
    imageAlt: 'THE NORTH FACE Maternity+ 2025FW - Warm family moments',
  },
  intro: {
    sealImageSrc: '/images/img-seal-02.png',
    sealImageAlt: 'A heart beat, echoing into the wild.',
  },
  gallery: {
    description: [
      'THE NORTH FACE MATERNITY+ is a line of items designed to embrace challenges and changes with joy.',
      'Reducing the burden on caregivers regardless of gender, enjoying changes as children grow,',
      'and offering clothing that can be cherished for a long time.',
      'MATERNITY+ supports caregivers regardless of gender as a category that enables EXPLORATION',
      'for families experiencing pregnancy, childbirth, and child-rearing.',
    ],
    imageAlts: [
      'THE NORTH FACE MATERNITY+ Style 1',
      'THE NORTH FACE MATERNITY+ Style 2',
      'THE NORTH FACE MATERNITY+ Style 3',
      'THE NORTH FACE MATERNITY+ Style 4',
      'THE NORTH FACE MATERNITY+ Style 5',
      'THE NORTH FACE MATERNITY+ Style 6',
    ],
  },
  productLines: {
    imageSrc: {
      pc: '/images/img-product-pc-en.svg',
      sp: '/images/img-product-sp-en.svg',
    },
    description: 'The pregnancy period brings significant physical and mental changes. Whether during pregnancy, going out with your baby after birth, or using alone. MATERNITY+ offers items with high expandability to accommodate various scenes.',
  },
  collection: {
    label: 'MATERNITY+',
  },
  footer: {
    disclaimer: '*Contents, details, and product prices are subject to change without notice.',
    ariaLabel: 'Site footer',
  },
};

export const contentDataEn: ContentDataService = {
  getContent: () => contentEn,
};