import type { Product, ProductDataService } from './types';

// Import collection item 01 images
import cl__item01_01 from '@/assets/images/cl__item01-01.jpg';
import cl__item01_02 from '@/assets/images/cl__item01-02.jpg';
import cl__item01_03 from '@/assets/images/cl__item01-03.jpg';
import cl__item01_04 from '@/assets/images/cl__item01-04.jpg';
import cl__item01_05 from '@/assets/images/cl__item01-05.jpg';
import cl__item01_06 from '@/assets/images/cl__item01-06.jpg';

// Import collection item 02 images
import cl__item02_01 from '@/assets/images/cl__item02-01.jpg';
import cl__item02_02 from '@/assets/images/cl__item02-02.jpg';
import cl__item02_03 from '@/assets/images/cl__item02-03.jpg';
import cl__item02_04 from '@/assets/images/cl__item02-04.jpg';
import cl__item02_05 from '@/assets/images/cl__item02-05.jpg';
import cl__item02_06 from '@/assets/images/cl__item02-06.jpg';

// Import collection item 03 images
import cl__item03_01 from '@/assets/images/cl__item03-01.jpg';
import cl__item03_02 from '@/assets/images/cl__item03-02.jpg';
import cl__item03_03 from '@/assets/images/cl__item03-03.jpg';
import cl__item03_04 from '@/assets/images/cl__item03-04.jpg';
import cl__item03_05 from '@/assets/images/cl__item03-05.jpg';
import cl__item03_06 from '@/assets/images/cl__item03-06.jpg';

// Import collection item 04 images
import cl__item04_01 from '@/assets/images/cl__item04-01.jpg';
import cl__item04_02 from '@/assets/images/cl__item04-02.jpg';
import cl__item04_03 from '@/assets/images/cl__item04-03.jpg';
import cl__item04_04 from '@/assets/images/cl__item04-04.jpg';
import cl__item04_05 from '@/assets/images/cl__item04-05.jpg';
import cl__item04_06 from '@/assets/images/cl__item04-06.jpg';

// Import collection item 05 images
import cl__item05_01 from '@/assets/images/cl__item05-01.jpg';
import cl__item05_02 from '@/assets/images/cl__item05-02.jpg';
import cl__item05_03 from '@/assets/images/cl__item05-03.jpg';
import cl__item05_04 from '@/assets/images/cl__item05-04.jpg';
import cl__item05_05 from '@/assets/images/cl__item05-05.jpg';
import cl__item05_06 from '@/assets/images/cl__item05-06.jpg';

// Import collection item 06 images
import cl__item06_01 from '@/assets/images/cl__item06-01.jpg';
import cl__item06_02 from '@/assets/images/cl__item06-02.jpg';
import cl__item06_03 from '@/assets/images/cl__item06-03.jpg';
import cl__item06_04 from '@/assets/images/cl__item06-04.jpg';

// Import collection item 07 images
import cl__item07_01 from '@/assets/images/cl__item07-01.jpg';
import cl__item07_02 from '@/assets/images/cl__item07-02.jpg';
import cl__item07_03 from '@/assets/images/cl__item07-03.jpg';
import cl__item07_04 from '@/assets/images/cl__item07-04.jpg';

// Import blanket images
import blanket01 from '@/assets/images/img-blanket-1.jpg';
import blanket02 from '@/assets/images/img-blanket-2.jpg';
import blanket03 from '@/assets/images/img-blanket-3.jpg';

const mainProducts: Product[] = [
  {
    headline: 'UNISEX',
    modelNumber: 'NYM82510',
    title: 'CR Move Insulation Jacket',
    copy: 'Unisex insulated jacket with baby-carrying capability',
    description:
      'A jacket that allows you to wear it over your baby by attaching a baby cover (ducker) to the front. The baby cover can be used independently, with a comfortable fleece material on the inside for your baby\'s skin. After your child grows, you can remove the ducker and wear the jacket alone. Available in 3 colors.',
    price: '¥44,000 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NYM82510',
    images: [
      { src: cl__item01_01, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 1' },
      { src: cl__item01_02, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 2' },
      { src: cl__item01_03, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 3' },
      { src: cl__item01_04, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 4' },
      { src: cl__item01_05, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 5' },
      { src: cl__item01_06, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 6' },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NYM82501',
    title: 'Maternity Insulation Coat',
    copy: 'Insulated long coat with adjustable width',
    description:
      'With a relaxed silhouette and dot button adjustments, this coat can be worn throughout pregnancy and after your child grows. After childbirth, you can wear it over your baby when carrying, with a 2-way collar design that can change to V-neck for your baby\'s face. Available in 2 colors.',
    price: '¥41,800 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NYM82501',
    images: [
      { src: cl__item02_01, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 1' },
      { src: cl__item02_02, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 2' },
      { src: cl__item02_03, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 3' },
      { src: cl__item02_04, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 4' },
      { src: cl__item02_05, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 5' },
      { src: cl__item02_06, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 6' },
    ],
  },
  {
    headline: 'UNISEX',
    modelNumber: 'NPM62510',
    title: 'CR Storage Jacket',
    copy: 'Baby-carrying jacket with excellent storage for hands-free outings',
    description:
      'Born from fathers\' voices saying "I don\'t want to carry a bag," this jacket features 10 pockets. Baby-carrying capability with front ducker attachment. Without the cover, it serves as a waterproof jacket with storage. Made with GORE-TEX fabric. Available in 2 colors.',
    price: '¥66,000 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NPM62510',
    images: [
      { src: cl__item03_01, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 1' },
      { src: cl__item03_02, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 2' },
      { src: cl__item03_03, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 3' },
      { src: cl__item03_04, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 4' },
      { src: cl__item03_05, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 5' },
      { src: cl__item03_06, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 6' },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NDM92501',
    title: 'Maternity Down Coat',
    copy: 'Down coat for pregnancy and baby-carrying',
    description:
      'Excellent warmth with GORE-TEX WINDSTOPPER® and Kodenshi® down filling. Wearable throughout pregnancy and after your child grows. Connect the baby carrier cover to wear while carrying, or attach independently to strollers and carriers. Available in 2 colors.',
    price: '¥93,500 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NDM92501',
    images: [
      { src: cl__item04_01, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 1' },
      { src: cl__item04_02, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 2' },
      { src: cl__item04_03, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 3' },
      { src: cl__item04_04, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 4' },
      { src: cl__item04_05, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 5' },
      { src: cl__item04_06, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 6' },
    ],
  },
  {
    headline: 'UNISEX',
    modelNumber: 'NTM62510',
    title: 'CR Sweat Crew',
    copy: 'Sweatshirt with food stain resistance, easy to wear with baby carriers',
    description:
      'Pockets on sleeves and back are positioned for easy use with baby carriers. Back pocket accessible from both sides, and side zippers minimize interference with carrier hip belts. Available in 3 colors.',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NTM62510',
    images: [
      { src: cl__item05_01, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 1' },
      { src: cl__item05_02, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 2' },
      { src: cl__item05_03, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 3' },
      { src: cl__item05_04, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 4' },
      { src: cl__item05_05, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 5' },
      { src: cl__item05_06, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 6' },
    ],
  },
];

const additionalProducts: Product[] = [
  {
    headline: 'UNISEX',
    modelNumber: 'NTM82511',
    title: 'CR L/S Message Tee',
    copy: 'Long-sleeve graphic tee promoting SRHR awareness',
    description: 'Long-sleeve graphic tee promoting SRHR awareness',
    price: '¥7,700 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NTM82511',
    images: [
      { src: cl__item06_01, alt: 'CR L/S Message Tee Image 1' },
      { src: cl__item06_02, alt: 'CR L/S Message Tee Image 2' },
      { src: cl__item06_03, alt: 'CR L/S Message Tee Image 3' },
      { src: cl__item06_04, alt: 'CR L/S Message Tee Image 4' },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NLM72501',
    title: 'Maternity Micro Fleece One Piece',
    copy: 'Light, warm, easy-care fleece dress with nursing access',
    description: 'Light, warm, easy-care fleece dress with nursing access',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NLM72501',
    images: [
      { src: cl__item07_01, alt: 'Maternity Micro Fleece One Piece Image 1' },
      { src: cl__item07_02, alt: 'Maternity Micro Fleece One Piece Image 2' },
      { src: cl__item07_03, alt: 'Maternity Micro Fleece One Piece Image 3' },
      { src: cl__item07_04, alt: 'Maternity Micro Fleece One Piece Image 4' },
    ],
  },
];

const babyBlankets: Product[] = [
  {
    headline: 'BABY',
    modelNumber: 'NNB72501',
    title: 'Baby Shell Blanket',
    copy: 'Insulated cover attachable to carriers and strollers, convenient for carrying',
    description: 'Insulated cover attachable to carriers and strollers, convenient for carrying',
    price: '¥14,300 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72501',
    images: [
      { src: blanket01, alt: 'Baby Shell Blanket' },
    ],
  },
  {
    headline: 'BABY',
    modelNumber: 'NNB72502',
    title: 'Baby Fleece Lining Blanket',
    copy: 'Fleece insulation cover. Can be used alone or connected with Baby Shell Blanket (NNB72501 / NNB72510) for enhanced warmth through layering.',
    description: 'Fleece insulation cover. Can be used alone or connected with Baby Shell Blanket (NNB72501 / NNB72510) for enhanced warmth through layering.',
    price: '¥9,900 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72502',
    images: [
      { src: blanket02, alt: 'Baby Fleece Lining Blanket' },
    ],
  },
  {
    headline: 'BABY',
    modelNumber: 'NNB72510',
    title: 'Baby Fleece Lining Blanket',
    copy: 'All-over print insulated cover attachable to carriers and strollers, convenient for carrying',
    description: 'All-over print insulated cover attachable to carriers and strollers, convenient for carrying',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72510',
    images: [
      { src: blanket03, alt: 'Baby Fleece Lining Blanket' },
    ],
  },
];

export const productDataEn: ProductDataService = {
  getMainProducts: () => mainProducts,
  getAdditionalProducts: () => additionalProducts,
  getBabyBlankets: () => babyBlankets,
};