import type { Product, ProductDataService } from './types'

// Import collection item 01 images
import cl__item01_01 from '@/assets/images/cl__item01-01.jpg'
import cl__item01_02 from '@/assets/images/cl__item01-02.jpg'
import cl__item01_03 from '@/assets/images/cl__item01-03.jpg'
import cl__item01_04 from '@/assets/images/cl__item01-04.jpg'
import cl__item01_05 from '@/assets/images/cl__item01-05.jpg'
import cl__item01_06 from '@/assets/images/cl__item01-06.jpg'

// Import collection item 02 images
import cl__item02_01 from '@/assets/images/cl__item02-01.jpg'
import cl__item02_02 from '@/assets/images/cl__item02-02.jpg'
import cl__item02_03 from '@/assets/images/cl__item02-03.jpg'
import cl__item02_04 from '@/assets/images/cl__item02-04.jpg'
import cl__item02_05 from '@/assets/images/cl__item02-05.jpg'
import cl__item02_06 from '@/assets/images/cl__item02-06.jpg'

// Import collection item 03 images
import cl__item03_01 from '@/assets/images/cl__item03-01.jpg'
import cl__item03_02 from '@/assets/images/cl__item03-02.jpg'
import cl__item03_03 from '@/assets/images/cl__item03-03.jpg'
import cl__item03_04 from '@/assets/images/cl__item03-04.jpg'
import cl__item03_05 from '@/assets/images/cl__item03-05.jpg'
import cl__item03_06 from '@/assets/images/cl__item03-06.jpg'

// Import collection item 04 images
import cl__item04_01 from '@/assets/images/cl__item04-01.jpg'
import cl__item04_02 from '@/assets/images/cl__item04-02.jpg'
import cl__item04_03 from '@/assets/images/cl__item04-03.jpg'
import cl__item04_04 from '@/assets/images/cl__item04-04.jpg'
import cl__item04_05 from '@/assets/images/cl__item04-05.jpg'
import cl__item04_06 from '@/assets/images/cl__item04-06.jpg'

// Import collection item 05 images
import cl__item05_01 from '@/assets/images/cl__item05-01.jpg'
import cl__item05_02 from '@/assets/images/cl__item05-02.jpg'
import cl__item05_03 from '@/assets/images/cl__item05-03.jpg'
import cl__item05_04 from '@/assets/images/cl__item05-04.jpg'
import cl__item05_05 from '@/assets/images/cl__item05-05.jpg'
import cl__item05_06 from '@/assets/images/cl__item05-06.jpg'

// Import collection item 06 images
import cl__item06_01 from '@/assets/images/cl__item06-01.jpg'
import cl__item06_02 from '@/assets/images/cl__item06-02.jpg'
import cl__item06_03 from '@/assets/images/cl__item06-03.jpg'
import cl__item06_04 from '@/assets/images/cl__item06-04.jpg'

// Import collection item 07 images
import cl__item07_01 from '@/assets/images/cl__item07-01.jpg'
import cl__item07_02 from '@/assets/images/cl__item07-02.jpg'
import cl__item07_03 from '@/assets/images/cl__item07-03.jpg'
import cl__item07_04 from '@/assets/images/cl__item07-04.jpg'

// Import blanket images
import blanket01 from '@/assets/images/img-blanket-1.jpg'
import blanket02 from '@/assets/images/img-blanket-2.jpg'
import blanket03 from '@/assets/images/img-blanket-3.jpg'

const mainProducts: Product[] = [
  {
    headline: 'UNISEX',
    modelNumber: 'NYM82510',
    title: 'CR Move Insulation Jacket',
    copy: 'Unisex Insulated Jacket for Babywearing',
    description:
      'This jacket can be worn over your child when using the detachable baby cover (dakker) attached to the front. The baby cover can also be used on its own, with a fleece lining that feels soft and gentle against the child’s skin. As the child grows, the cover can be removed, allowing the jacket to be worn independently.',
    price: '¥44,000 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NYM82510',
    images: [
      {
        src: cl__item01_01,
        alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 1',
      },
      {
        src: cl__item01_02,
        alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 2',
      },
      {
        src: cl__item01_03,
        alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 3',
      },
      {
        src: cl__item01_04,
        alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 4',
      },
      {
        src: cl__item01_05,
        alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 5',
      },
      {
        src: cl__item01_06,
        alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 6',
      },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NYM82501',
    title: 'Maternity Insulation Coat',
    copy: 'Insulated Long Coat with Adjustable Width',
    description:
      'Featuring a roomy silhouette and adjustable snap buttons, this coat can be comfortably worn throughout pregnancy as the belly grows, and even long after as your child grows. After childbirth, it can be worn over your baby while carrying them, with a 2-way design at the neckline that can be changed to a V-neck to allow space for the child’s face.',
    price: '¥41,800 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NYM82501',
    images: [
      {
        src: cl__item02_01,
        alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 1',
      },
      {
        src: cl__item02_02,
        alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 2',
      },
      {
        src: cl__item02_03,
        alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 3',
      },
      {
        src: cl__item02_04,
        alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 4',
      },
      {
        src: cl__item02_05,
        alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 5',
      },
      {
        src: cl__item02_06,
        alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 6',
      },
    ],
  },
  {
    headline: 'UNISEX',
    modelNumber: 'NPM62510',
    title: 'CR Storage Jacket',
    copy: 'Babywearing-Compatible Jacket with Exceptional Storage for Hands-Free Outings',
    description:
      'Inspired by real feedback from fathers who said, “I want to carry as little as possible,” this jacket is equipped with 10 pockets for superior storage. By attaching the baby cover (dakker) to the front, it accommodates babywearing, while removing the cover transforms it into a waterproof jacket with ample storage capacity. The outer material is made of GORE-TEX for reliable protection.',
    price: '¥66,000 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NPM62510',
    images: [
      {
        src: cl__item03_01,
        alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 1',
      },
      {
        src: cl__item03_02,
        alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 2',
      },
      {
        src: cl__item03_03,
        alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 3',
      },
      {
        src: cl__item03_04,
        alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 4',
      },
      {
        src: cl__item03_05,
        alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 5',
      },
      {
        src: cl__item03_06,
        alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 6',
      },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NDM92501',
    title: 'Maternity Down Coat',
    copy: 'Down Coat for Wearing Together with Your Baby During and After Pregnancy',
    description:
      'This highly insulated down jacket is filled with KODENSHI® down inside a soft-touch GORE-TEX WINDSTOPPER® shell that offers excellent windproof and water-repellent performance. Designed for long-term use—from pregnancy when the belly grows, through to after childbirth as your child grows. By attaching the baby carrier cover, it can be worn while carrying your baby, and the cover can also be used independently with a stroller or baby carrier.',
    price: '¥93,500 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NDM92501',
    images: [
      {
        src: cl__item04_01,
        alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 1',
      },
      {
        src: cl__item04_02,
        alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 2',
      },
      {
        src: cl__item04_03,
        alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 3',
      },
      {
        src: cl__item04_04,
        alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 4',
      },
      {
        src: cl__item04_05,
        alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 5',
      },
      {
        src: cl__item04_06,
        alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 6',
      },
    ],
  },
  {
    headline: 'UNISEX',
    modelNumber: 'NTM62510',
    title: 'CR Sweat Crew',
    copy: 'Stain-Resistant Sweatshirt Designed for Easy Wear with a Baby Carrier',
    description:
      'The pockets placed on the sleeves and back are designed for convenient use even while wearing a baby carrier. The back pocket can be accessed from either side, and by opening the zippers along both sides, the sweatshirt reduces interference with the hip belt of the baby carrier.',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NTM62510',
    images: [
      {
        src: cl__item05_01,
        alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 1',
      },
      {
        src: cl__item05_02,
        alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 2',
      },
      {
        src: cl__item05_03,
        alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 3',
      },
      {
        src: cl__item05_04,
        alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 4',
      },
      {
        src: cl__item05_05,
        alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 5',
      },
      {
        src: cl__item05_06,
        alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 6',
      },
    ],
  },
]

const additionalProducts: Product[] = [
  {
    headline: 'UNISEX',
    modelNumber: 'NTM82511',
    title: 'CR L/S Message Tee',
    copy: 'Long-Sleeve Graphic T-Shirt Designed to Raise Awareness of SRHR',
    description:
      'Long-Sleeve Graphic T-Shirt Designed to Raise Awareness of SRHR',
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
    modelNumber: 'NBM32203',
    title: 'Maternity Long Pant',
    copy: 'Maternity Pants Designed for Long-Term Wear from Pregnancy to Postpartum',
    description:
      'Maternity Pants Designed for Long-Term Wear from Pregnancy to Postpartum',
    price: '¥16,500 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NBM32203',
    images: [{ src: cl__item06_01, alt: 'Maternity Long Pant Image 1' }],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NLM72501',
    title: 'Maternity Micro Fleece One Piece',
    copy: 'Lightweight, Warm, and Easy-Care Fleece Dress Designed for Nursing',
    description:
      'Lightweight, Warm, and Easy-Care Fleece Dress Designed for Nursing',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NLM72501',
    images: [
      { src: cl__item07_01, alt: 'Maternity Micro Fleece One Piece Image 1' },
      { src: cl__item07_02, alt: 'Maternity Micro Fleece One Piece Image 2' },
      { src: cl__item07_03, alt: 'Maternity Micro Fleece One Piece Image 3' },
      { src: cl__item07_04, alt: 'Maternity Micro Fleece One Piece Image 4' },
    ],
  },
]

const babyBlankets: Product[] = [
  {
    headline: 'BABY',
    modelNumber: 'NNB72501',
    title: 'Baby Shell Blanket',
    copy: 'The outer fabric is made of lightweight nylon with a water-repellent finish, while the insulation uses “V-MOTION ECO,” which offers excellent warmth and loft.',
    description:
      'The outer fabric is made of lightweight nylon with a water-repellent finish, while the insulation uses “V-MOTION ECO,” which offers excellent warmth and loft.',
    price: '¥14,300 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72501',
    images: [{ src: blanket01, alt: 'Baby Shell Blanket' }],
  },
  {
    headline: 'BABY',
    modelNumber: 'NNB72502',
    title: 'Baby Fleece Lining Blanket',
    copy: 'Wrap children in a lightweight, soft, and comfortable microfleece material.',
    description:
      'Wrap children in a lightweight, soft, and comfortable microfleece material.',
    price: '¥9,900 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72502',
    images: [{ src: blanket02, alt: 'Baby Fleece Lining Blanket' }],
  },
  {
    headline: 'BABY',
    modelNumber: 'NNB72510',
    title: 'Baby Fleece Lining Blanket',
    copy: 'This season’s limited edition baby stroller cover with padding, featuring a graph check pattern, compatible with baby carriers and strollers.',
    description:
      'This season’s limited edition baby stroller cover with padding, featuring a graph check pattern, compatible with baby carriers and strollers.',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72510',
    images: [{ src: blanket03, alt: 'Baby Fleece Lining Blanket' }],
  },
]

export const productDataEn: ProductDataService = {
  getMainProducts: () => mainProducts,
  getAdditionalProducts: () => additionalProducts,
  getBabyBlankets: () => babyBlankets,
}
