import type { ContentData, ContentDataService } from './types'
import productPcEn from '@/assets/images/img-product-en-pc.svg'
import productSpEn from '@/assets/images/img-product-en-sp.svg'

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
      'THE NORTH FACE MATERNITY+ is a product line created to enjoy challenges and changes that come with life.​',
      'It lightens the load for those raising children, regardless of gender, and encourages enjoying the growth and transformation of children while providing long-loved wear.​',
      'MATERNITY+ is a category that fulfills EXPLORATION for families experiencing pregnancy, childbirth, and child-rearing — supporting parenting beyond gender boundaries.',
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
      pc: productPcEn,
      sp: productSpEn,
    },
    description: [
      'During pregnancy, both mind and body go through many changes.',
      'Whether during pregnancy, outings with your child after birth, or time alone —',
      'MATERNITY+ offers a wide range of items suitable for various scenes.',
    ],
  },
  collection: {
    label: 'MATERNITY+',
  },
  footer: {
    disclaimer:
      '*Contents, details, and product prices are subject to change without notice.',
    ariaLabel: 'Site footer',
  },
}

export const contentDataEn: ContentDataService = {
  getContent: () => contentEn,
}
